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
/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    domains: ["images.microcms-assets.io"],
  },
};

// PWA
const pwaConfig = withPWA({
  dest: "public",
});

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const finalConfig = withNextIntl({
  ...nextConfig,
  ...pwaConfig,
});

export default finalConfig;
