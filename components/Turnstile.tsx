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

import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Turnstile: React.FC<{ onVerify: (token: string) => void }> = ({ onVerify }) => {
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const sitekey = process.env.TURNSTILE_SITE_KEY || '';

  useEffect(() => {
    let turnstileLoaded = false;

    const scriptExists = document.querySelector("#turnstile-script");

    const loadTurnstile = () => {
      if (!turnstileLoaded && turnstileRef.current && typeof window.turnstile !== "undefined") {
        window.turnstile.render(turnstileRef.current, {
          sitekey,
          callback: (token: string) => {
            onVerify(token);
          },
        });
        turnstileLoaded = true;
        setLoading(false);
      }
    };

    if (scriptExists) {
      loadTurnstile();
    } else {
      const script = document.createElement("script");
      script.id = "turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = loadTurnstile;
      document.body.appendChild(script);
    }

    return () => {
      if (turnstileRef.current && typeof window.turnstile !== "undefined") {
        window.turnstile.remove(turnstileRef.current);
      }
    };
  }, [onVerify, sitekey]);

  return (
    <div className="relative h-16 w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center border border-gray-300 rounded-lg">
          <div className="flex items-center justify-center h-12 space-x-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Turnstile 読み込み中...</p>
          </div>
        </div>
      )}
      <div ref={turnstileRef} className={`h-full ${loading ? "invisible" : "visible"}`}></div>
    </div>
  );
};

export default Turnstile;
