'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  separator?: React.ReactNode;
}

const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({ items, className, showHome = true, separator, ...props }, ref) => {
    const defaultSeparator = <ChevronLeft className="w-4 h-4 text-gray-400" />;

    return (
      <nav
        ref={ref}
        className={cn('flex items-center space-x-reverse space-x-2 text-sm', className || '')}
        aria-label="Breadcrumb"
        {...props}
      >
        {showHome && (
          <Link
            href="/"
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
        )}

        {showHome && items.length > 0 && (
          <span className="text-gray-400">{separator || defaultSeparator}</span>
        )}

        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href && !item.isActive ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'font-medium',
                  item.isActive ? 'text-gray-900' : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <span className="text-gray-400">{separator || defaultSeparator}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
