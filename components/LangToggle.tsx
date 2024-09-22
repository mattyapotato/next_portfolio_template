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

"use client";

import { useEffect, useState } from 'react';
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleFlag } from 'react-circle-flags'
import Cookies from 'js-cookie';
import { Languages, Check } from 'lucide-react'; 

export const useLanguage = () => {
    const [lang, setLang] = useState<string>('en'); // デフォルト 英語

    useEffect(() => {
        const cookieLang = Cookies.get('lang') || 'en';
        setLang(cookieLang);
    }, []);

    const changeLanguage = (newLang: string) => {
        if (newLang != Cookies.get('lang')){
            setLang(newLang);
            Cookies.set('lang', newLang, { expires: 365 });
            window.location.reload();
        }
    };

    return { lang, changeLanguage };
};

export const LangToggle = () => {
    const { lang, changeLanguage } = useLanguage();
    const [mounted, setMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                    <Languages strokeWidth={1.5} />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                    <CircleFlag countryCode="gb" className="mr-2 h-4 w-4" />
                    <span>English</span>
                    {lang === 'en' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ja')}>
                    <CircleFlag countryCode="jp" className="mr-2 h-4 w-4" />                    
                    <span>日本語</span>
                    {lang === 'ja' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};