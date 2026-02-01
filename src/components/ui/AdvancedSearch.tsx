'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock, Star, Filter, ChevronDown } from 'lucide-react';

interface AdvancedSearchProps {
  placeholder?: string;
  suggestions?: boolean;
  filters?: boolean;
  autocomplete?: boolean;
  onSearch?: (query: string) => void;
}

export default function AdvancedSearch({ 
  placeholder = "ابحث عن 6000+ دورة في تكنولوجيا المعلومات، الصحة، الأعمال...",
  suggestions = true,
  filters = true,
  autocomplete = true,
  onSearch
}: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    level: '',
    duration: '',
    rating: ''
  });
  
  const searchRef = useRef<HTMLDivElement>(null);

  const popularSearches = [
    { text: 'تطوير الويب', icon: TrendingUp, count: '1,234' },
    { text: 'الذكاء الاصطناعي', icon: Star, count: '856' },
    { text: 'التسويق الرقمي', icon: TrendingUp, count: '623' },
    { text: 'إدارة المشاريع', icon: Clock, count: '445' }
  ];

  const suggestionsList = [
    'تطوير تطبيقات الموبايل',
    'تحليل البيانات',
    'الأمن السيبراني',
    'التصميم الجرافيكي',
    'لغة بايثون',
    'المحاسبة المالية'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsOpen(false);
    onSearch?.(searchQuery);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(e.target.value.length > 0);
            }}
            onFocus={() => setIsOpen(query.length > 0)}
            placeholder={placeholder}
            className="w-full bg-white border border-gray-300 rounded-full py-4 pr-12 pl-20 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
          />
          
          {/* Filters Button */}
          {filters && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          )}
          
          {/* Clear Button */}
          {query && (
            <button
              onClick={clearSearch}
              className="absolute left-14 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Dropdown */}
        {isOpen && (suggestions || autocomplete) && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden">
            {/* Popular Searches */}
            {suggestions && (
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">البحوث الشائعة</h3>
                <div className="space-y-2">
                  {popularSearches.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSearch(item.text)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-right"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{item.text}</span>
                        </div>
                        <span className="text-sm text-gray-500">{item.count} دورة</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Autocomplete Suggestions */}
            {autocomplete && query.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">اقتراحات</h3>
                <div className="space-y-2">
                  {suggestionsList
                    .filter(item => item.toLowerCase().includes(query.toLowerCase()))
                    .slice(0, 5)
                    .map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(item)}
                        className="w-full text-right p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-700">{item}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">فلترة النتائج</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <select 
                value={selectedFilters.category}
                onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">جميع الفئات</option>
                <option value="it">تكنولوجيا المعلومات</option>
                <option value="health">الصحة</option>
                <option value="business">الأعمال</option>
                <option value="language">اللغات</option>
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المستوى</label>
              <select 
                value={selectedFilters.level}
                onChange={(e) => setSelectedFilters({...selectedFilters, level: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">جميع المستويات</option>
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدة</label>
              <select 
                value={selectedFilters.duration}
                onChange={(e) => setSelectedFilters({...selectedFilters, duration: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">أي مدة</option>
                <option value="short">أقل من ساعتين</option>
                <option value="medium">2-5 ساعات</option>
                <option value="long">أكثر من 5 ساعات</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التقييم</label>
              <select 
                value={selectedFilters.rating}
                onChange={(e) => setSelectedFilters({...selectedFilters, rating: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">أي تقييم</option>
                <option value="4">4+ نجوم</option>
                <option value="4.5">4.5+ نجوم</option>
                <option value="5">5 نجوم</option>
              </select>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => {
                setSelectedFilters({ category: '', level: '', duration: '', rating: '' });
                setShowFilters(false);
              }}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              مسح الفلاتر
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              تطبيق الفلاتر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
