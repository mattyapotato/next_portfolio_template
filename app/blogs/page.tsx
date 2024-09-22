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

import { getBlogs } from "@/libs/microcms";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { useTranslations } from 'next-intl';
import { Metadata } from "next";
import formatDate from "@/libs/formatDate";

export const metadata: Metadata = {
    title: 'Blogs'
};

export default function BlogArticle() {
    const { contents } = use(getBlogs());
    function truncateText(text: string, num: number) {
        const cleanedText = text.replace(/<[^>]*>/g, '');
        if (cleanedText.length <= num) {
            return cleanedText;
        }

        return cleanedText.slice(0, num) + '...';
    }

    const t = useTranslations();
    return (
        <div className="flex-grow bg-muted py-3 md:py-6">
            <div className="flex-grow container mx-auto px-4 md:px-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            最新のブログ投稿
                        </h2>
                        <p className="text-muted-foreground">
                            直近12件の更新をご覧いただけます。
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contents.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.id}`}>
                                <div className="bg-background rounded-lg p-6 shadow-md">
                                    <Image
                                        src={blog.eyecatch?.url ?? "/placeholder.svg"}
                                        width={1200}
                                        height={630}
                                        alt="Blog Post Image"
                                        className="robject-contain rounded-lg object-cover w-full h-48"
                                    />
                                    <div className="space-y-2 mt-4">
                                        <h3 className="text-lg font-semibold">
                                            {truncateText(blog.title, 20)}
                                        </h3>
                                        <p className="text-muted-foreground line-clamp-2">
                                            {truncateText(blog.content, 60)}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-muted-foreground text-sm">
                                                {formatDate(blog.publishedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}