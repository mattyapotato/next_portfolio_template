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

"use client";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from 'lucide-react';

const Notification = () => {
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    setShowToast(false);
  };

  const t = useTranslations('Layout');

  return (
    showToast && (
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <p className="text-sm font-medium flex-1 flex-wrap">
            {t('notice')}
          </p>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="ml-4"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default Notification;
