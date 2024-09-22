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

import Link from "next/link";
import { Github, Twitter } from 'lucide-react';
import Image from "next/image";
import { useTranslations } from 'next-intl';

const Footer = () => {

  const t = useTranslations('Footer');

  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <Link className="flex items-center gap-2" href="/">
          <Image
            src="/favicon.ico"
            alt="tyap's icon"
            width={24}
            height={24}
            className="border-border"
          />
          <span className="text-lg font-bold">tyaP</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="https://x.com/tyap_me"
            className="text hover:text-primary transition-colors duration-300"
          >
            <Twitter className="h-6 w-6" strokeWidth={1.5} />
          </Link>
          <Link
            href="https://github.com/mattyapotato"
            className="text hover:text-primary transition-colors duration-300"
          >
            <Github className="h-6 w-6" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="text-sm text hover:text-primary transition-colors duration-300"
          >
            {t('privacy')}
          </Link>
          <Link
            href="/contact"
            className="text-sm text hover:text-primary transition-colors duration-300"
          >
            {t('contact')}
          </Link>
          <div className="hidden md:flex gap-4">
            <Link
              href="/pgp"
              className="text-sm text hover:text-primary transition-colors duration-300"
            >
              {t('pgp')}
            </Link>
            <Link
              href="https://status.tyap.me/"
              className="text-sm text hover:text-primary transition-colors duration-300"
            >
              {t('status')}
            </Link>
          </div>
        </div>
        <p className="text-xs flex justify-center text-muted-foreground">
          &copy; tyaP
        </p>
      </div>
    </footer>
  );
}

export default Footer;