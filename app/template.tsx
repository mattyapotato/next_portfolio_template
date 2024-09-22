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

"use client"
import { motion } from 'framer-motion'
import React from 'react'

const variants = {
    hidden: { opacity: 0},
    enter: { opacity: 1, scale: 1 },
    exit: { opacity: 0 }
}

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            className='site-wrapper'
            variants={variants}
            initial='hidden'
            animate='enter'
            exit='exit'
            transition={{
                type: 'spring',
                stiffness: 240,
                damping: 60,
                duration: 0.95,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    )
}
