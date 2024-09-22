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

import { Metadata } from "next"
import { getPagesDetail } from "@/libs/microcms"
import Link from "next/link"
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import formatDate from "@/libs/formatDate";

export const metadata: Metadata = {
    title: 'プライバシーに関する声明'
}

export default async function Page() {
    const page = await getPagesDetail("aq0kt4ou_t");
    if (!page) {
        return notFound();

    }

    return (
        <section className="bg-muted py-3 md:py-7">
            <div className="container mx-auto px-4 md:px-6 max-w-[800px] word-wrap-break-word">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {(await page).title}
                        </h2>
                        <p className="text-muted-foreground">
                            {formatDate((await page).createdAt)}
                        </p>
                        <div className="bg-background rounded-lg p-6 shadow-md">
                            <div className="space-y-4">
                                <div className="prose prose-lg text-muted-foreground">
                                    <div className="page">{parse((await page).content)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}