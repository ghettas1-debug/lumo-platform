'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface PageNavigationProps {
  previous?: NavigationItem;
  next?: NavigationItem;
  related?: NavigationItem[];
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'grid';
  showLabels?: boolean;
}

const PageNavigation = React.forwardRef<HTMLDivElement, PageNavigationProps>(
  ({ previous, next, related = [], className, layout = 'horizontal', showLabels = true, ...props }, ref) => {
    if (layout === 'horizontal') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-between py-6 border-t border-gray-200', className)}
          {...props}
        >
          {/* Previous */}
          {previous && (
            <Link
              href={previous.href}
              className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
              <div className="text-right">
                {showLabels && (
                  <div className="text-xs text-gray-500 mb-1">السابق</div>
                )}
                <div className="font-medium">{previous.label}</div>
                {previous.description && (
                  <div className="text-sm text-gray-500">{previous.description}</div>
                )}
              </div>
            </Link>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Next */}
          {next && (
            <Link
              href={next.href}
              className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <div className="text-left">
                {showLabels && (
                  <div className="text-xs text-gray-500 mb-1">التالي</div>
                )}
                <div className="font-medium">{next.label}</div>
                {next.description && (
                  <div className="text-sm text-gray-500">{next.description}</div>
                )}
              </div>
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
            </Link>
          )}
        </div>
      );
    }

    if (layout === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn('space-y-4 py-6 border-t border-gray-200', className)}
          {...props}
        >
          {/* Previous */}
          {previous && (
            <Link
              href={previous.href}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              <div className="p-2 rounded-lg bg-gray-100">
                <ChevronRight className="w-5 h-5" />
              </div>
              <div className="text-right flex-1">
                {showLabels && (
                  <div className="text-xs text-gray-500 mb-1">السابق</div>
                )}
                <div className="font-medium">{previous.label}</div>
                {previous.description && (
                  <div className="text-sm text-gray-500">{previous.description}</div>
                )}
              </div>
            </Link>
          )}

          {/* Next */}
          {next && (
            <Link
              href={next.href}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              <div className="text-left flex-1">
                {showLabels && (
                  <div className="text-xs text-gray-500 mb-1">التالي</div>
                )}
                <div className="font-medium">{next.label}</div>
                {next.description && (
                  <div className="text-sm text-gray-500">{next.description}</div>
                )}
              </div>
              <div className="p-2 rounded-lg bg-gray-100">
                <ChevronLeft className="w-5 h-5" />
              </div>
            </Link>
          )}
        </div>
      );
    }

    if (layout === 'grid') {
      return (
        <div
          ref={ref}
          className={cn('py-6 border-t border-gray-200', className)}
          {...props}
        >
          {/* Previous and Next */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {previous && (
              <Link
                href={previous.href}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <div className="p-2 rounded-lg bg-gray-100">
                  <ChevronRight className="w-5 h-5" />
                </div>
                <div className="text-right flex-1">
                  {showLabels && (
                    <div className="text-xs text-gray-500 mb-1">السابق</div>
                  )}
                  <div className="font-medium">{previous.label}</div>
                  {previous.description && (
                    <div className="text-sm text-gray-500">{previous.description}</div>
                  )}
                </div>
              </Link>
            )}

            {next && (
              <Link
                href={next.href}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <div className="text-left flex-1">
                  {showLabels && (
                    <div className="text-xs text-gray-500 mb-1">التالي</div>
                  )}
                  <div className="font-medium">{next.label}</div>
                  {next.description && (
                    <div className="text-sm text-gray-500">{next.description}</div>
                  )}
                </div>
                <div className="p-2 rounded-lg bg-gray-100">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              </Link>
            )}
          </div>

          {/* Related Pages */}
          {related.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">صفحات ذات صلة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    {item.icon && (
                      <div className="p-2 rounded-lg bg-gray-100">
                        {item.icon}
                      </div>
                    )}
                    <div className="text-right flex-1">
                      <div className="font-medium text-sm">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500">{item.description}</div>
                      )}
                    </div>
                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  }
);

PageNavigation.displayName = 'PageNavigation';

export { PageNavigation };
