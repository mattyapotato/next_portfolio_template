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

import { useTranslations } from 'next-intl';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Twitter } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
    const t = useTranslations('Home');

    return (
        <section className="snap-start flex items-center justify-center py-3 md:py-6 bg-background">
            <div className="container mx-auto flex flex-col items-center gap-6 px-4 md:flex-row md:gap-12">
                <Image src="/tyap_icon.jpg" alt="tyaP's icon" width={300} height={300} className="rounded-full border-2 border-border" />
                <div className="space-y-4 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hi, I&apos;m tyaP</h1>
                    <p className="text-muted-foreground">
                        {t('about')}
                    </p>
                    <div className="flex justify-center gap-4 md:justify-start">
                        <Button asChild className="font-['Zen Maru Gothic'] rounded-full">
                            <Link href="/blogs" className="hover:text-black">{t('blog')}</Link>
                        </Button>
                        <Button asChild variant="outline" className="font-['Zen Maru Gothic'] rounded-full">
                            <Link href="/contact">{t('contact')}</Link>
                        </Button>
                    </div>
                    <div className="flex justify-center gap-4 md:justify-start">
                        <Link
                            href="https://x.com/tyap_me"
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                            prefetch={false}
                        >
                            <Twitter className="h-7 w-7" />
                        </Link>
                        <Link
                            href="https://github.com/mattyapotato"
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                            prefetch={false}
                        >
                            <Github className="h-7 w-7" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;