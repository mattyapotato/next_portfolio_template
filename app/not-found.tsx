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
import { TriangleAlertIcon } from "@/components/ui/icons"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: '404'
}
export default function notFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-background">
      <div className="max-w-md mx-auto text-center space-y-4">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">404 - Page Not Found</h1>
        <p className="text-muted-foreground">お探しのページは、存在しません。</p>
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          ホームに戻る
        </Link>
      </div>
    </section>
  )
}