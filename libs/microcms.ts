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

import { blog } from "@/types/blog";
import { page } from "@/types/page";
import { MicroCMSQueries, createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) throw new Error("MICROCMS_SERVICE_DOMAIN is required");
if (!process.env.MICROCMS_API_KEY) throw new Error("MICROCMS_API_KEY is required");

export const microCMSClient = createClient({
	serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: process.env.MICROCMS_API_KEY,
});

export async function getBlogs(queries?: MicroCMSQueries) {
	const blogs = await microCMSClient.getList<blog>({
		customRequestInit: {
			next: {
				revalidate: 0,
			},
		},
		endpoint: "blogs",
		queries: { limit: 12, orders: '-publishedAt' },
	});
	return blogs;
}

export async function getBlogsDetail(contentId: string, queries?: MicroCMSQueries) {
	const blogsDetail = await microCMSClient.getListDetail<blog>({
		customRequestInit: {
			next: {
				revalidate: 0,
			},
		},
		endpoint: "blogs",
		contentId,
		queries,
	});
	return blogsDetail;
}

export async function getPagesDetail(contentId: string, queries?: MicroCMSQueries) {
	const pagesDetail = await microCMSClient.getListDetail<page>({
		customRequestInit: {
			next: {
				revalidate: 0,
			},
		},
		endpoint: "pages",
		contentId,
		queries,
	});
	return pagesDetail;
}
//READ https://blog.microcms.io/nextjs13-microcms-rsc/