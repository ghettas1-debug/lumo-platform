'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, Users, BookOpen, Filter, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'course' | 'instructor' | 'category' | 'tag';
  url: string;
  description?: string;
  image?: string;
  category?: string;
  rating?: number;
  students?: number;
}

interface SearchFilters {
  category: string;
  level: string;
  price: string;
  duration: string;
  rating: string;
  language: string;
}

export default function AdvancedSearch({ 
  onSearch, 
  placeholder = "ابحث عن دورات، مدربين، أو مواضيع..." 
}: { 
  onSearch: (query: string, filters?: SearchFilters) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    level: '',
    price: '',
    duration: '',
    rating: '',
    language: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for suggestions
  const mockSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      title: 'تطوير الويب الكامل',
      type: 'course',
      url: '/courses/web-development',
      description: 'تعلم HTML, CSS, JavaScript من الصفر إلى الاحتراف',
      image: '/images/courses/web-dev.jpg',
      category: 'تطوير الويب',
      rating: 4.8,
      students: 15420
    },
    {
      id: '2',
      title: 'Python للمبتدئين',
      type: 'course',
      url: '/courses/python-beginner',
      description: 'دورة شاملة لتعلم بايثون من البداية',
      image: '/images/courses/python.jpg',
      category: 'برمجة',
      rating: 4.9,
      students: 12340
    },
    {
      id: '3',
      title: 'أحمد محمد',
      type: 'instructor',
      url: '/instructors/ahmed-mohammed',
      description: 'مدرب خبير في تطوير الويب',
      image: '/images/instructors/ahmed.jpg',
      rating: 4.7,
      students: 8900
    },
    {
      id: '4',
      title: 'تكنولوجيا المعلومات',
      type: 'category',
      url: '/categories/it',
      description: 'دورات في البرمجة والشبكات والأمن السيبراني',
      image: '/images/categories/it.jpg'
    }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchQuery: string) => {
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Handle search
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    saveRecentSearch(searchQuery);
    onSearch(searchQuery, filters);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setShowSuggestions(false);
    }, 500);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      // Filter suggestions based on query
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.description?.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    handleSearch(suggestion.title);
  };

  // Handle filter change
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(query);
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'instructor':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'category':
        return <Filter className="w-4 h-4 text-green-600" />;
      default:
        return <Search className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`ml-2 p-2 border rounded-lg transition-colors ${
              showFilters 
                ? 'border-blue-500 bg-blue-50 text-blue-600' 
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
          
          {/* Search Button */}
          <Button
            onClick={() => handleSearch(query)}
            disabled={!query.trim() || isSearching}
            className="ml-2"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">البحثات الأخيرة</h3>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  مسح
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
                  >
                    <Clock className="w-3 h-3 text-gray-400" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          <div className="p-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-3 group"
              >
                {suggestion.image && (
                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {getSuggestionIcon(suggestion.type)}
                    <div>
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                        {suggestion.title}
                      </div>
                      {suggestion.description && (
                        <div className="text-xs text-gray-500 truncate">
                          {suggestion.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {suggestion.category && (
                      <span>{suggestion.category}</span>
                    )}
                    {suggestion.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        {suggestion.rating}
                      </span>
                    )}
                    {suggestion.students && (
                      <span>{suggestion.students.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">تصفية البحث</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">الفئة</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع الفئات</option>
                <option value="web-development">تطوير الويب</option>
                <option value="mobile">تطوير الموبايل</option>
                <option value="data-science">علم البيانات</option>
                <option value="design">التصميم</option>
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">المستوى</label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع المستويات</option>
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">السعر</label>
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع الأسعار</option>
                <option value="free">مجاني</option>
                <option value="paid">مدفوع</option>
                <option value="0-50">0-50$</option>
                <option value="50-100">50-100$</option>
                <option value="100+">100$+</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">المدة</label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع المدد</option>
                <option value="short">أقل من 5 ساعات</option>
                <option value="medium">5-20 ساعة</option>
                <option value="long">أكثر من 20 ساعة</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">التقييم</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع التقييمات</option>
                <option value="4.5+">4.5+</option>
                <option value="4.0+">4.0+</option>
                <option value="3.5+">3.5+</option>
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">اللغة</label>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع اللغات</option>
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={() => setFilters({
                category: '',
                level: '',
                price: '',
                duration: '',
                rating: '',
                language: ''
              })}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              مسح التصفية
            </button>
            <Button
              onClick={() => {
                handleSearch(query);
                setShowFilters(false);
              }}
              size="sm"
            >
              تطبيق التصفية
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
