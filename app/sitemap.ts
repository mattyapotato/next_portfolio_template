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

import { MetadataRoute } from 'next';
import type { MicroCMSDate, MicroCMSImage, MicroCMSQueries } from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';

interface Article {
  id: string;
  date: MicroCMSDate;
  title: string;
  description?: string;
  image?: MicroCMSImage;
  url: string;
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || ''
});

async function getWorks(queries?: MicroCMSQueries) {
  const listData = await client.getList<Article>({
    endpoint: 'blogs',
    queries
  });

  return listData;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = 'https://www.tyap.me';
  const { contents } = await getWorks();
  const lastModified = new Date();

  const staticPaths = [{
    url: baseURL,
    lastModified
  },
  {
    url: `${baseURL}/portfolio`,
    lastModified
  },
  {
    url: `${baseURL}/$blogs`,
    lastModified
  },
  {
    url: `${baseURL}/contact`,
    lastModified
  },
  {
    url: `${baseURL}/privacy`,
    lastModified
  },
  {
    url: `${baseURL}/pgp`,
    lastModified
  },
  ];

  const dynamicPaths = contents.map(({ id }) => {
    return {
      url: `${baseURL}/${id}`,
      lastModified
    };
  });

  return [...staticPaths, ...dynamicPaths];
}