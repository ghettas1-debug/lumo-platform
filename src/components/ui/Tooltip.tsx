'use client';

import { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group inline-flex">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
        {content}
      </div>
    </div>
  );
}
