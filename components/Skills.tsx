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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from 'next-intl';

const Skills = () => {
  const skills = {
    frontend: ["React", "Next.js", "CSS", "Tailwind CSS", "shadcn/ui", "TypeScript"],
    backend: ["Node.js", "Deno", "Express", "Python", "Mongo DB", "PostgreSQL"],
    other: ["Git", "Docker", "AWS", "Google Cloud", "UI/UX Design"]
  };

  const t = useTranslations('Skills');

  return (
    <section id="skills" className="py-12 md:py-16 bg-background scroll-snap-y-proximity scroll-smooth">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-2 mb-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="frontend">{t('front-end')}</TabsTrigger>
            <TabsTrigger value="backend">{t('back-end')}</TabsTrigger>
            <TabsTrigger value="other">{t('other')}</TabsTrigger>
          </TabsList>
          {Object.entries(skills).map(([category, skillList]) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {category === 'frontend' ? t('front-end') : category === 'backend' ? t('back-end') : t('other')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
