/* Nextjs Portfolio Template
   This program is a template designed for creating static portfolios using Next.js.
   Copyright (C) 2024 tyaP

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.

   For questions or support, please contact me at:
   Email: hi@tyap.me
   Website: https://www.tyap.me/
   Repository: https://github.com/mattyapotato/next_portfolio_template
*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fetch from 'node-fetch';
import crypto from 'crypto';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import HTMLescape from '@/libs/HTMLescape';

interface EnvironmentVariables {
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  DISCORD_WEBHOOK_URL: string;
  SES_SOURCE_EMAIL: string;
}

const env = process.env as unknown as EnvironmentVariables;
if (!env.AWS_REGION || !env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWSの環境変数が設定されていません。");
}
if (!env.TURNSTILE_SECRET_KEY) {
  throw new Error("Turnstileシークレットキーが設定されていません。");
}
if (!env.DISCORD_WEBHOOK_URL) {
  throw new Error("Discord WebhookのURLが設定されていません。");
}
if (!env.SES_SOURCE_EMAIL) {
  throw new Error("SESの送信元メールアドレスが設定されていません。");
}

const sesClient = new SESClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const validateInput = (name: string, email: string, organization: string | undefined, message: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name.length > 32) {
    return 'Name must be 32 characters or less.';
  }
  if (!emailRegex.test(email)) {
    return 'Invalid email address.';
  }
  if (organization && organization.length > 64) {
    return 'Organization name must be 64 characters or less.';
  }
  if (message.length > 1500) {
    return 'Message must be 1500 characters or less.';
  }
  return null;
};

const applyZeroWidthSpace = (text: string): string => {
  return text.replace(/(:|\.)(?=\S)/g, '$1\u200B');
};

const generateInquiryCode = (): string => {
  const randomBytes = crypto.randomBytes(4);
  return parseInt(randomBytes.toString('hex'), 16).toString(36).toUpperCase().padStart(8, '0');
};

const getLanguageFromRequest = (request: NextRequest): 'en' | 'ja' => {
  const cookieLang = request.cookies.get('lang')?.value;
  if (cookieLang === 'ja' || cookieLang === 'en') return cookieLang;
  const acceptLang = request.headers.get('accept-language') || 'ja';
  return acceptLang.startsWith('ja') ? 'ja' : 'en';
};

const sendEmail = async (emailParams: any) => {
  const command = new SendEmailCommand(emailParams);
  try {
    await sesClient.send(command);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

interface RequestBody {
  name: string;
  email: string;
  organization?: string;
  message: string;
  turnstileToken: string;
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, organization, message, turnstileToken } = await request.json() as RequestBody;

    const validationError = validateInput(name, email, organization, message);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    };

    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    });

    const turnstileData = await turnstileResponse.json() as { success: boolean };
    if (!turnstileResponse.ok || !turnstileData.success) {
      return NextResponse.json({ error: 'Failed to verify Turnstile token.' }, { status: 400 });
    };

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const language = request.headers.get('accept-language') || 'Unknown';
    const timestamp = new Date().toISOString();

    const inquiryCode = generateInquiryCode();

    const webhookPayload = {
      content: '@everyone',
      embeds: [{
        title: '新しいお問い合わせ',
        fields: [
          { name: 'お問い合わコード', value: inquiryCode, inline: true },
          { name: '名前', value: applyZeroWidthSpace(name), inline: true },
          { name: 'メールアドレス', value: applyZeroWidthSpace(email) },
          { name: '企業・組織名', value: applyZeroWidthSpace(organization || 'None') },
          { name: 'お問い合わせ内容', value: applyZeroWidthSpace(message) },
          { name: 'ユーザーエージェント', value: userAgent },
          { name: '言語', value: language },
          { name: 'IPアドレス', value: ipAddress },
          { name: 'タイムスタンプ', value: timestamp }
        ],
        color: 0x00ff00,
      }]
    };
    const webhookResponse = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    });
    if (!webhookResponse.ok) {
      throw new Error(`Discord Webhook送信エラー: ${webhookResponse.statusText}`);
    }

    const userLang = getLanguageFromRequest(request);

    const emailContentHtml = userLang === 'ja'
      ? `<div style="font-family: 'Zen Maru Gothic', Arial, sans-serif; color: #333; border: 1px solid #e0e0e0; border-radius: 20px; padding: 10px; margin: 5px;">
       <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400&display=swap" rel="stylesheet">
       <div style="text-align: center; padding-bottom: 10px;">
         <a href="https://www.tyap.me?source=contact-auto-reply-mail" style="text-decoration: none;">
           <img src="https://www.tyap.me/tyap_icon.jpg?source=contact-auto-reply-mail" alt="tyaP Icon" style="border-radius: 50%; width: 70px; height: 70px;">
         </a>
       </div>
       <p>${HTMLescape(name)} 様</p>
       <p>この度はtyaPへお問い合わせいただき、誠にありがとうございます。以下の内容でお問い合わせを受け付けました。</p>
       <div style="border: 1px solid #e0e0e0; border-radius: 20px; padding: 10px; margin: 25px 0;">
         <p><strong>お問い合わせコード:</strong> ${inquiryCode}</p>
         <p><strong>お名前:</strong> ${HTMLescape(name)}</p>
         <p><strong>メールアドレス:</strong> ${HTMLescape(email)}</p>
         <p><strong>組織・企業名:</strong> ${HTMLescape(organization) || 'なし'}</p>
         <p><strong>お問い合わせ内容:</strong><br>${HTMLescape(message).replace(/\n/g, '<br />')}</p>
       </div>
       <p>いただいた内容については確認させていただきますが、必ずしも返信を保証するものではありませんので、ご了承ください。</p>
       <p>ご不明な点がございましたら、このメールに返信するか、<a href="https://www.tyap.me/contact?source=contact-auto-reply-mail" style="text-decoration: none;">お問い合わせフォーム</a>をご利用ください。</p>
       <p>必要に応じて、こちらの<a href="https://www.tyap.me/pgp?source=contact-auto-reply-mail" style="text-decoration: none;">PGP公開鍵</a>をご利用いただけます。</p>
       <p>このメールは宛先の方のみに送信されたものであり、もし誤って受信された場合は、このメールを直ちに破棄し、第三者に内容を漏らさないようお願いします。</p>
       <p>今後ともどうぞよろしくお願いいたします。</p>
       <p>tyaP</p>
     </div>`
      : `<div style="font-family: 'Zen Maru Gothic', Arial, sans-serif; color: #333; border: 1px solid #e0e0e0; border-radius: 20px; padding: 10px; margin: 5px;">
       <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400&display=swap" rel="stylesheet">
       <div style="text-align: center; padding-bottom: 10px;">
         <a href="https://www.tyap.me?source=contact-auto-reply-mail" style="text-decoration: none;">
           <img src="https://www.tyap.me/tyap_icon.jpg?source=contact-auto-reply-mail" alt="tyaP Icon" style="border-radius: 50%; width: 70px; height: 70px;">
         </a>
       </div>
       <p>Dear ${HTMLescape(name)},</p>
       <p>Thank you for contacting tyaP. We have received your inquiry with the following details:</p>
       <div style="border: 1px solid #e0e0e0; border-radius: 20px; padding: 10px; margin: 25px 0;">
         <p><strong>Inquiry Code:</strong> ${inquiryCode}</p>
         <p><strong>Name:</strong> ${HTMLescape(name)}</p>
         <p><strong>Email:</strong> ${HTMLescape(email)}</p>
         <p><strong>Organization:</strong> ${HTMLescape(organization) || 'None'}</p>
         <p><strong>Message:</strong><br>${HTMLescape(message).replace(/\n/g, '<br />')}</p>
       </div>
       <p>Please note that while we will review your inquiry, a response is not guaranteed.</p>
       <p>If you have any further questions, feel free to reply to this email or use our <a href="https://www.tyap.me/contact?source=contact-auto-reply-mail" style="text-decoration: none;">contact form</a>.</p>
       <p>You may also use this <a href="https://www.tyap.me/pgp?source=contact-auto-reply-mail" style="text-decoration: none;">PGP public key</a> if needed for secure communication.</p>
       <p>This email is intended only for the recipient. If you are not the intended recipient, please delete this email immediately and do not share its contents with anyone else.</p>
       <p>Best regards,</p>
       <p>tyaP</p>
     </div>`;

    const emailParams = {
      Source: env.SES_SOURCE_EMAIL,
      ReplyToAddresses: [
        'hi@tyap.me'
      ],
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: {
          Data: userLang === 'ja' ? 'お問い合わせを受け付けました - tyaP' : 'Inquiry Received - tyaP',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: emailContentHtml,
            Charset: 'UTF-8',
          },
        },
      },
    };

    await sendEmail(emailParams);

    return NextResponse.json({ message: 'Inquiry submitted successfully.', inquiryCode });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry. Please try again later.' }, { status: 500 });
  }
};
