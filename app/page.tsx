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

"use client"

import { useTranslations } from 'next-intl';
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from 'lucide-react';
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Hero from '@/components/Hero';

export default function Home() {
  const t = useTranslations('Home');
  const scrollToSectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollToSectionRef.current) {
      window.scrollTo({
        top: scrollToSectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Hero />
      <div ref={scrollToSectionRef}>
        <Skills />
        <Portfolio />
      </div>
    </div>

  );
}

{/* <motion.div
  className="cursor-pointer hidden md:block"
  onClick={handleScroll}
  animate={{ opacity: [1, 0, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
＞
  <ChevronDown className="h-14 w-14 text-primary" 
＜/motion.div＞
*/}