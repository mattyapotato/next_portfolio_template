/* Nextjs Portfolio Template
   This program is a template designed for creating dynamic portfolios using Next.js.
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

import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Notification  from "@/components/Notification";
import { ThemeProvider } from "@/components/ThemeProvider";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s - tyaP',
    default: "tyaP (ちゃぴー) - Front-end Engineer"
  },
  description: "tyaP's Portfolio Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="tyaP - ちゃぴー" />
        <meta property="og:url" content="https://www.tyap.me" />
        <meta property="og:image" content="https://www.tyap.me/tyap_icon.jpg" />
        <meta property="og:description" content="A Japanese Front-end Engineer who works with Next.js" />
        <script
          data-goatcounter="https://tyap.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        />
        <script
          defer
          src="https://analytics.tyap.me/script.js"
          data-website-id="6a29ab16-35ec-4146-a77f-5db7bcac3363"
        />
      </head>
      <body className={`bg-muted rounded-lg flex flex-col min-h-screen flex-grow word-break break-all overflow-wrap break-word leading-relaxed ${zenMaruGothic.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
          <NextTopLoader
            color="#ffb980"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px ##ffb980,0 0 5px #ffb980"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <Header />
            <Notification />
          <main className="flex-grow m-0">
            {children}
          </main>
          <Footer />
         </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
