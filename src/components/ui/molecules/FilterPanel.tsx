'use client';

import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp, Star, Clock, Users, DollarSign, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/atoms/Card';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

export interface FilterGroup {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'range';
  options: FilterOption[];
  icon?: React.ReactNode;
}

export interface FilterPanelProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string) => void;
  onClearAll: () => void;
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const FilterPanel = React.forwardRef<HTMLDivElement, FilterPanelProps>(
  ({
    filters,
    activeFilters,
    onFilterChange,
    onClearAll,
    className,
    isCollapsed = false,
    onToggleCollapse,
    ...props
  }, ref) => {
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
      new Set(filters.map(f => f.id))
    );

    const toggleGroup = (groupId: string) => {
      setExpandedGroups(prev => {
        const newSet = new Set(prev);
        if (newSet.has(groupId)) {
          newSet.delete(groupId);
        } else {
          newSet.add(groupId);
        }
        return newSet;
      });
    };

    const getActiveFilterCount = () => {
      return Object.values(activeFilters).reduce((total, values) => total + values.length, 0);
    };

    const renderFilterGroup = (group: FilterGroup) => {
      const isExpanded = expandedGroups.has(group.id);
      const activeValues = activeFilters[group.id] || [];

      if (group.type === 'checkbox') {
        return (
          <Card key={group.id} className="mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {group.icon}
                  <CardTitle className="text-sm font-semibold">{group.title}</CardTitle>
                  {activeValues.length > 0 && (
                    <Badge variant="secondary" size="sm">
                      {activeValues.length}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {group.options.map((option) => {
                    const isActive = activeValues.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className={cn(
                          'flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors',
                          isActive ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => onFilterChange(group.id, option.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className={cn(
                            'text-sm',
                            isActive ? 'text-blue-700 font-medium' : 'text-gray-700'
                          )}>
                            {option.label}
                          </span>
                        </div>
                        {option.count && (
                          <span className="text-xs text-gray-500">
                            {option.count}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      }

      if (group.type === 'radio') {
        return (
          <Card key={group.id} className="mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {group.icon}
                  <CardTitle className="text-sm font-semibold">{group.title}</CardTitle>
                  {activeValues.length > 0 && (
                    <Badge variant="secondary" size="sm">
                      {activeValues.length}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {group.options.map((option) => {
                    const isActive = activeValues.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className={cn(
                          'flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors',
                          isActive ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={group.id}
                            checked={isActive}
                            onChange={() => onFilterChange(group.id, option.id)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className={cn(
                            'text-sm',
                            isActive ? 'text-blue-700 font-medium' : 'text-gray-700'
                          )}>
                            {option.label}
                          </span>
                        </div>
                        {option.count && (
                          <span className="text-xs text-gray-500">
                            {option.count}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      }

      if (group.type === 'range') {
        return (
          <Card key={group.id} className="mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {group.icon}
                  <CardTitle className="text-sm font-semibold">{group.title}</CardTitle>
                  {activeValues.length > 0 && (
                    <Badge variant="secondary" size="sm">
                      {activeValues.length}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {group.options.map((option) => {
                    const isActive = activeValues.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => onFilterChange(group.id, option.id)}
                        className={cn(
                          'w-full p-3 rounded-lg border transition-colors text-right',
                          isActive
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{option.label}</span>
                          {option.count && (
                            <span className="text-xs text-gray-500">{option.count}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      }

      return null;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-xl border border-gray-200 transition-all duration-300',
          isCollapsed ? 'w-12' : 'w-80',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">الفلاتر</h3>
                {getActiveFilterCount() > 0 && (
                  <Badge variant="secondary" size="sm">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-2">
              {getActiveFilterCount() > 0 && !isCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearAll}
                  className="text-red-600 hover:text-red-700"
                >
                  مسح الكل
                </Button>
              )}
              
              {onToggleCollapse && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleCollapse}
                  className="p-1"
                >
                  {isCollapsed ? (
                    <ChevronLeft className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        {!isCollapsed && (
          <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filters.map(renderFilterGroup)}
          </div>
        )}

        {/* Collapsed State */}
        {isCollapsed && (
          <div className="p-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
              <Filter className="w-4 h-4 text-blue-600" />
            </div>
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" size="sm" className="mt-2 mx-auto block">
                {getActiveFilterCount()}
              </Badge>
            )}
          </div>
        )}
      </div>
    );
  }
);

FilterPanel.displayName = 'FilterPanel';

export { FilterPanel };
