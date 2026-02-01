'use client';

import React, { useState } from 'react';
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Clock, 
  Globe, 
  Award,
  Users,
  DollarSign,
  Filter,
  RotateCcw
} from 'lucide-react';

interface CourseFiltersProps {
  categories?: { id: string; name: string; count: number }[];
  levels?: string[];
  duration?: string[];
  rating?: number[];
  price?: string[];
  language?: string[];
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

export default function CourseFilters({
  categories = [
    { id: 'it', name: 'تكنولوجيا المعلومات', count: 1292 },
    { id: 'health', name: 'الصحة', count: 1102 },
    { id: 'business', name: 'الأعمال', count: 1777 },
    { id: 'language', name: 'اللغات', count: 316 },
    { id: 'management', name: 'الإدارة', count: 1098 },
    { id: 'personal-development', name: 'التطوير الشخصي', count: 1350 },
  ],
  levels = ['مبتدئ', 'متوسط', 'متقدم', 'خبير'],
  duration = ['أقل من ساعتين', '2-5 ساعات', '5-10 ساعات', 'أكثر من 10 ساعات'],
  rating = [4, 4.5, 5],
  price = ['مجاني', 'مدفوع'],
  language = ['العربية', 'الإنجليزية', 'الفرنسية', 'الإسبانية'],
  onFiltersChange,
  className = ''
}: CourseFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'level', 'price']);
  const [filters, setFilters] = useState({
    search: '',
    categories: [] as string[],
    level: '',
    duration: '',
    rating: 0,
    price: '',
    language: '',
    hasCertificate: false,
    sortBy: 'الأكثر شهرة'
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      categories: [] as string[],
      level: '',
      duration: '',
      rating: 0,
      price: '',
      language: '',
      hasCertificate: false,
      sortBy: 'الأكثر شهرة'
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count++;
    if (filters.level) count++;
    if (filters.duration) count++;
    if (filters.rating > 0) count++;
    if (filters.price) count++;
    if (filters.language) count++;
    if (filters.hasCertificate) count++;
    return count;
  };

  const FilterSection = ({ 
    id, 
    title, 
    children, 
    badge 
  }: { 
    id: string; 
    title: string; 
    children: React.ReactNode; 
    badge?: string | number 
  }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{title}</span>
          {badge && (
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {expandedSections.includes(id) ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      
      {expandedSections.includes(id) && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">الفلاتر</h2>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          
          {getActiveFiltersCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              مسح الكل
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="ابحث في الدورات..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Sections */}
      <div className="max-h-96 overflow-y-auto">
        {/* Categories */}
        <FilterSection 
          id="categories" 
          title="الفئات" 
          badge={filters.categories.length > 0 ? filters.categories.length : undefined}
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <label 
                key={category.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Level */}
        <FilterSection id="level" title="المستوى">
          <div className="space-y-2">
            {levels.map((level) => (
              <label 
                key={level}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="level"
                  checked={filters.level === level}
                  onChange={() => handleFilterChange('level', level)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Duration */}
        <FilterSection id="duration" title="المدة">
          <div className="space-y-2">
            {duration.map((duration) => (
              <label 
                key={duration}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="duration"
                  checked={filters.duration === duration}
                  onChange={() => handleFilterChange('duration', duration)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{duration}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection id="rating" title="التقييم">
          <div className="space-y-2">
            {rating.map((rating) => (
              <label 
                key={rating}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange('rating', rating)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-gray-700 mr-2">وأعلى</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price */}
        <FilterSection id="price" title="السعر">
          <div className="space-y-2">
            {price.map((price) => (
              <label 
                key={price}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === price}
                  onChange={() => handleFilterChange('price', price)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{price}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Language */}
        <FilterSection id="language" title="اللغة">
          <div className="space-y-2">
            {language.map((lang) => (
              <label 
                key={lang}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="language"
                  checked={filters.language === lang}
                  onChange={() => handleFilterChange('language', lang)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{lang}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Additional Options */}
        <FilterSection id="options" title="خيارات إضافية">
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasCertificate}
                onChange={(e) => handleFilterChange('hasCertificate', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">يحتوي على شهادة</span>
              </div>
            </label>
          </div>
        </FilterSection>

        {/* Sort By */}
        <FilterSection id="sort" title="ترتيب حسب">
          <div className="space-y-2">
            {['الأكثر شهرة', 'الأحدث', 'التقييم', 'المدة', 'السعر'].map((sort) => (
              <label 
                key={sort}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sortBy"
                  checked={filters.sortBy === sort}
                  onChange={() => handleFilterChange('sortBy', sort)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{sort}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
