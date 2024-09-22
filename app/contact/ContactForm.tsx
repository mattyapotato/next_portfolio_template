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

"use client";
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Turnstile from '@/components/Turnstile';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Loader2 } from 'lucide-react';
import HTMLescape from '@/libs/HTMLescape';

const COOKIE_EXPIRY = 1;

export default function ContactForm() {
    const t = useTranslations('ContactForm');
    const searchParams = useSearchParams();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [name, setName] = useState(() => loadFromCookies('name') || searchParams.get('name') || '');
    const [email, setEmail] = useState(() => loadFromCookies('email') || searchParams.get('email') || '');
    const [organization, setOrganization] = useState(() => loadFromCookies('organization') || searchParams.get('org') || '');
    const [message, setMessage] = useState(() => loadFromCookies('message') || searchParams.get('msg') || '');
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [showConsentError, setShowConsentError] = useState(false);
    const [showTurnstileError, setShowTurnstileError] = useState(false);
    const [submittedData, setSubmittedData] = useState<{
        name: string;
        email: string;
        organization: string;
        message: string;
        inquiryNumber: string;
    } | null>(null);

    function loadFromCookies(key: string) {
        return Cookies.get(key) || '';
    }

    function saveToCookies(key: string, value: string) {
        Cookies.set(key, value, { expires: COOKIE_EXPIRY, secure: true, sameSite: 'strict' });
    }

    const resetForm = () => {
        setName('');
        setEmail('');
        setOrganization('');
        setMessage('');
        setPrivacyAgreed(false);
        setTurnstileToken(null);
        setShowConsentError(false);
        setShowTurnstileError(false);
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('organization');
        Cookies.remove('message');
    };

    const handleError = () => {
        setFormStatus('error');
        setIsSubmitting(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setShowConsentError(!privacyAgreed);
        setShowTurnstileError(!turnstileToken);

        if (!privacyAgreed || !turnstileToken) {
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/send-contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    organization,
                    message,
                    turnstileToken
                }),
            });

            if (!response.ok) {
                throw new Error("ネットワークの応答が不正です。");
            }

            const data = await response.json();
            const inquiryNumber = data.inquiryNumber;

            setSubmittedData({
                name,
                email,
                organization,
                message,
                inquiryNumber
            });
            setFormStatus('success');
            resetForm();
        } catch (error) {
            handleError();
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        saveToCookies('name', name);
        saveToCookies('email', email);
        saveToCookies('organization', organization);
        saveToCookies('message', message);
    }, [name, email, organization, message]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const remainingNameChars = 32 - name.length;
    const remainingEmailChars = 32 - email.length;
    const remainingOrgChars = 64 - organization.length;
    const remainingMsgChars = 1500 - message.length;

    const isNameOverLimit = remainingNameChars < 0;
    const isEmailOverLimit = remainingEmailChars < 0;
    const isOrgOverLimit = remainingOrgChars < 0;
    const isMsgOverLimit = remainingMsgChars < 0;

    return (
        <section className="bg-muted py-3 md:py-6">
            <div className="container mx-auto px-4 md:px-6 max-w-[800px] word-wrap-break-word">
                <div className="mx-auto space-y-6">
                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
                        <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
                    </div>

                    {formStatus === 'idle' && (
                        <form onSubmit={handleSubmit} className="space-y-6 bg-background rounded-lg p-6 shadow-md">

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">
                                    {t('name')} <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value.slice(0, 33))}
                                    placeholder={t('name-exam')}
                                    required
                                    className={`mt-1 ${isNameOverLimit ? 'border-red-500' : ''}`}
                                />
                                {isNameOverLimit && <p className="text-red-500 text-sm mt-1">{t('name-limit-error')}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    {t('email')} <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value.slice(0, 33))}
                                    placeholder={t('email-exam')}
                                    required
                                    className={`mt-1 ${isEmailOverLimit ? 'border-red-500' : ''}`}
                                />
                                {isEmailOverLimit && <p className="text-red-500 text-sm mt-1">{t('email-limit-error')}</p>}
                            </div>

                            <div>
                                <label htmlFor="organization" className="block text-sm font-medium">
                                    {t('org')} <span className="text-sm font-normal text-muted-foreground">({t('any')})</span>
                                </label>
                                <Input
                                    id="organization"
                                    value={organization}
                                    onChange={(e) => setOrganization(e.target.value.slice(0, 65))}
                                    placeholder={t('org-exam')}
                                    className={`mt-1 ${isOrgOverLimit ? 'border-red-500' : ''}`}
                                />
                                {isOrgOverLimit && <p className="text-red-500 text-sm mt-1">{t('org-limit-error')}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium">
                                    {t('message')} <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    id="message"
                                    ref={textareaRef}
                                    value={message}
                                    onChange={(e) => {
                                        const newMessage = e.target.value;
                                        if (newMessage.length <= 1501) {
                                            setMessage(newMessage);
                                            const textarea = textareaRef.current;
                                            if (textarea) {
                                                textarea.style.height = 'auto';
                                                textarea.style.height = `${textarea.scrollHeight}px`;
                                            }
                                        }
                                    }}
                                    required
                                    className={`mt-1 resize-none overflow-hidden pre-wrap ${isMsgOverLimit ? 'border-red-500' : ''}`}
                                    rows={2}
                                />
                                {isMsgOverLimit && <p className="text-red-500 text-sm mt-1">{t('message-limit-error')}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={privacyAgreed}
                                        onCheckedChange={(checked: CheckedState) => setPrivacyAgreed(checked === true)}
                                        id="privacy"
                                    />
                                    <label htmlFor="privacy" className="text-sm">
                                        <Link href="/privacy" className="hover:text-muted link">
                                            {t('privacy')}
                                        </Link>{' '}
                                        {t('privacy-agree')} <span className="text-red-500">*</span>
                                    </label>
                                </label>
                                {showConsentError && !privacyAgreed && <p className="text-red-500 text-sm">{t('privacy-agreed-error')}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Turnstile onVerify={setTurnstileToken} />
                            </div>
                            {showTurnstileError && !turnstileToken && <p className="text-red-500 text-sm">{t('turnstile-error')}</p>}

                            <Button type="submit" disabled={isSubmitting || isNameOverLimit || isEmailOverLimit || isOrgOverLimit || isMsgOverLimit} className="w-full">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t('submitting')}
                                    </>
                                ) : (
                                    t('submit')
                                )}
                            </Button>

                            <p className="mt-2 text-sm text-muted-foreground">
                                <span className="text-red-500">*</span> {t('require-attention')}
                            </p>
                            <p className="text-sm text-muted-foreground">{t('sendcopy-attention')}</p>
                        </form>
                    )}

                    {formStatus === 'success' && submittedData && (
                        <div className="border bg-background p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold flex items-center">
                                <svg
                                    className="w-6 h-6 text-primary mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {t('submit-success')}
                            </h3>
                            <h5 className="font-semibold mt-4">{t('submit-thanks')}</h5>
                            <p>
                                {t('reply-attention')}<br />
                                <strong>{t('reply-about')}</strong><br />
                                hi＠tyap.me
                            </p>
                            <p className="mt-4">
                                {t('code')}: <strong>{submittedData.inquiryNumber}</strong>
                                <br />
                                {t('code-about')}
                            </p>
                            <div className="mt-4">
                                <h4 className="font-semibold">
                                    <strong>{t('sent-about')}</strong>
                                </h4>
                                <ul>
                                    <li>
                                        <strong>{t('name')}:</strong>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: HTMLescape(submittedData.name)
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <strong>{t('email')}:</strong>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: HTMLescape(submittedData.email)
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <strong>{t('org')}:</strong>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: HTMLescape(submittedData.organization || t('none'))
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <strong>{t('message')}:</strong><br />
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: HTMLescape(submittedData.message).replace(/\n/g, '<br />')
                                            }}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6 flex space-x-4 justify-end">
                                <Button onClick={() => setFormStatus('idle')}>
                                    {t('new-contact')}
                                </Button>
                                <Button variant="outline" onClick={() => setFormStatus('idle')}>
                                    <Link href="/">{t('return-home')}</Link>
                                </Button>
                            </div>
                        </div>
                    )}

                    {formStatus === 'error' && (
                        <div className="border bg-background p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold flex items-center">
                                <svg
                                    className="w-6 h-6 text-red-600 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {t('submit-err')}
                            </h3>
                            <p className="mt-4">{t('submit-err-about')}</p>
                            <div className="mt-6 flex space-x-4 justify-end">
                                <Button variant="outline" className="font-medium" onClick={() => setFormStatus('idle')}>
                                    {t('retry')}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
}//HTMLescape