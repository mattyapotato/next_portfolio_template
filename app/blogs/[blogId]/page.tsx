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

import { getBlogs, getBlogsDetail } from "@/libs/microcms";
import Image from "next/image";
import { Metadata } from "next";
import notFound from "@/app/not-found";
import parse from "html-react-parser";
import { useTranslations } from 'next-intl';
import formatDate from "@/libs/formatDate";
export const dynamic = 'force-dynamic';
export const dynamicParams = false;


type Props = {
    params: { blogId: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const id = props.params.blogId;
    const blog = await getBlogsDetail(id);
    return {
        title: blog.title,
    };
}

export async function generateStaticParams() {
    const { contents } = await getBlogs();
    const paths = contents.map((blog: { id: any }) => {
        return {
            blog: blog.id,
        };
    });
    return paths;
}

export default async function Blog(props: Props) {
    const blog = await getBlogsDetail(props.params.blogId);
    if (!blog) {
        return notFound();

    }
    
    return (
        <section className="bg-muted py-3 md:py-6">
            <div className="container mx-auto px-4 md:px-6 max-w-[800px] word-wrap-break-word">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {(await blog).title}
                        </h2>
                        <p className="text-muted-foreground">
                            {formatDate((await blog).createdAt)}
                        </p>
                        <div className="bg-background rounded-lg p-6 shadow-md">
                            <div className="space-y-4">
                                <Image
                                    src={(await blog).eyecatch?.url ?? "/placeholder.svg"}
                                    width={1600}
                                    height={1200}
                                    alt="Blog Post Image"
                                    className="rounded-lg"
                                />
                                <div className="prose prose-lg text-muted-foreground">
                                    <div className="blog">{parse((await blog).content)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}