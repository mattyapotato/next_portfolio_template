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

"use client"
import Link from "next/link"
import { useTranslations } from 'next-intl';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon, HomeIcon, BriefcaseIcon, BookIcon, MailIcon, ShieldIcon } from "./ui/icons"
import { ModeToggle } from "./ThemeToggle"
import { LangToggle } from "./LangToggle"
import { useState } from "react";
import Image from "next/image";
import { LockKeyhole, Activity } from "lucide-react"

const Header = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const t = useTranslations('Header');

  return (
    <div className="flex flex-col sticky top-0">
      <header className="bg-background/50 backdrop-blur-md sticky top-0 z-50 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image
              src="/favicon.ico"
              alt="tyap's icon"
              width={24}
              height={24}
              className="border-border"
            />
            <span className="text-lg font-bold">tyaP</span>
          </Link>
          <nav className="hidden space-x-4 md:flex ml-auto h-full items-center">
            <Link
              href="/"
              className="text hover:text-foreground hover:text-primary"
              prefetch={false}
            >
              {t('home')}
            </Link>
            <Link
              href="/portfolio"
              className="text hover:text-foreground hover:text-primary"
              prefetch={false}
            >
              {t('portfolio')}
            </Link>
            <Link
              href="/blogs"
              className="text hover:text-foreground gap-2 hover:text-primary"
              prefetch={false}
            >
              {t('blog')}
            </Link>
            <ModeToggle />
            <LangToggle />
          </nav>
          <nav className="ml-auto mr-2 flex items-center gap-2 md:hidden">
            <ModeToggle />
            <LangToggle />
          </nav>
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden rounded-full">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text hover:text-foreground"
                  prefetch={false}
                  onClick={() => { setOpenSheet(false) }}
                >
                  <HomeIcon className="h-5 w-5" />
                  {t('home')}
                </Link>
                <Link
                  href="/portfolio"
                  className="flex items-center gap-4 px-2.5 text hover:text-foreground"
                  prefetch={false}
                  onClick={() => { setOpenSheet(false) }}
                >
                  <BriefcaseIcon className="h-5 w-5" />
                  {t('portfolio')}
                </Link>
                <Link href="/blogs" className="flex items-center gap-4 px-2.5 text hover:text-foreground" prefetch={false}
                  onClick={() => { setOpenSheet(false) }}
                >
                  <BookIcon className="h-5 w-5" />
                  {t('blog')}
                </Link>
                <Link
                  href="/pgp"
                  className="flex items-center gap-4 px-2.5 text hover:text-foreground"
                  prefetch={false}
                  onClick={() => { setOpenSheet(false) }}
                >
                  <LockKeyhole className="h-5 w-5" />
                  {t('pgp')}
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-4 px-2.5 text hover:text-foreground"
                  prefetch={false}
                  onClick={() => { setOpenSheet(false) }}
                >
                  <MailIcon className="h-5 w-5" />
                  {t('contact')}
                </Link>
                <Link
                  href="/privacy"
                  className="flex items-center gap-4 px-2.5 text hover:text-foreground"
                  prefetch={false}
                  onClick={() => { setOpenSheet(false) }}
                >
                  <ShieldIcon className="h-5 w-5" />
                  {t('privacy')}
                </Link>
                <Link
                  href="https://status.tyap.me/"
                  className="flex items-center gap-4 px-2.5 text hover:text-foreground"
                  prefetch={false}
                  onClick={() => { setOpenSheet(false) }}
                >
                  <Activity className="h-5 w-5" />
                  {t('status')}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  )
};

export default Header;