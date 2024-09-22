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

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    const langCookie = req.cookies.get('lang')?.value;

    if (!(langCookie === 'ja' || langCookie === 'en')) {
        const acceptLanguageHeader = req.headers.get('accept-language') || '';
        const browserLang = acceptLanguageHeader.split(',')[0].split('-')[0].toLowerCase();

        const lang = browserLang === 'ja' ? 'ja' : 'en';
        const response = NextResponse.next();
        response.cookies.set('lang', lang, { path: '/', secure: true, sameSite: 'strict' });

        return response;
    }

    if (url.pathname.startsWith('/blog')) {
        url.pathname = url.pathname.replace(/^\/blog/, '/blogs');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/blog/:path*', '/'],
};
