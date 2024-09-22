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

export default function formatDate(dateString: string | number | Date): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'invaild date';
    }

    const jstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // UTC+9

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return jstDate.toLocaleString('ja-JP', options)
        .replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1年$2月$3日')
        .replace(/(\d{2}):(\d{2})/, '$1時$2分');
}