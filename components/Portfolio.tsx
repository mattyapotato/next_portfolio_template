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

import Link from "next/link"
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Button } from '@/components/ui/button'

const Portfolio = () => {
  const t = useTranslations('Portfolio')

  const projects = [
    {
      name: "tyaP.me",
      image: "/tyap-portfolio.png",
      description: t('tyap-me'),
      link: "/"
    },
    {
      name: "V0X.jp",
      image: "/v0x.png",
      description: t('v0x'),
      link: "https://v0x.jp"
    },
    {
      name: "Potalth",
      image: "/potalth.svg",
      description: t('potalth'),
      link: "https://potalth.com"
    },
    {
      name: "SHIMESABA",
      image: "/SHIMESABA.png",
      description: t('shimesaba'),
      link: "/"
    }
  ]

  return (
    <section className="py-3 md:py-6 bg-background scroll-snap-y-proximity scroll-smooth">
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('title')}</h2>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Link key={index} href={project.link} className="group" prefetch={false}>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="aspect-video w-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="relative mt-12">
            <div className="flex justify-center mt-5">
              <Button asChild>
                <Link href="https://www.resume.id/tyap/works">
                  {t('read-more')}
                </Link>
              </Button>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {t('password-notice')}
          </p>
        </div>
      </div>
    </section>
  )
};

export default Portfolio;