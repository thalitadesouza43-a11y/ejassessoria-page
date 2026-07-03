/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function Logo({ className = 'h-36' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Official Brand Logo Image */}
      <img
        src="https://i.postimg.cc/rsQy9pgd/EJ-Logo-Colorido-png.png"
        alt="Everton John Assessoria"
        referrerPolicy="no-referrer"
        className="w-auto h-36 max-w-full object-contain drop-shadow-[0_0_20px_rgba(15,163,78,0.3)] select-none pointer-events-none transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
