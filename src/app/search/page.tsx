"use client";

import { useState, useEffect, useCallback } from 'react';
import { Search, Clock, Star, Users, BookOpen, Filter, Award } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Array<{id: number, title: string, description: string, instructor: string, rating: number, students: number, price: number, image: string, category: string, level: string, duration: number, certificate: boolean, language: string, lastUpdated: string, tags: string[]}>>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters state
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    price: 'all',
    duration: 'all',
    rating: 'all',
    language: 'all',
    certificate: 'all',
    sortBy: 'relevance'
  });

  const categories = [
    { id: 'all', name: 'جميع الفئات', icon: BookOpen },
    { id: 'programming', name: 'البرمجة', icon: '💻' },
    { id: 'design', name: 'التصميم', icon: '🎨' },
    { id: 'data', name: 'البيانات', icon: '📊' },
    { id: 'marketing', name: 'التسويق', icon: '📱' },
    { id: 'business', name: 'الأعمال', icon: '💼' },
    { id: 'photography', name: 'التصوير', icon: '📷' },
    { id: 'music', name: 'الموسيقى', icon: '🎵' }
  ];

  const levels = [
    { id: 'all', name: 'جميع المستويات' },
    { id: 'beginner', name: 'مبتدئ' },
    { id: 'intermediate', name: 'متوسط' },
    { id: 'advanced', name: 'متقدم' },
    { id: 'expert', name: 'خبير' }
  ];

  const priceRanges = [
    { id: 'all', name: 'جميع الأسعار' },
    { id: 'free', name: 'مجاني' },
    { id: 'paid', name: 'مدفوع' },
    { id: '0-25', name: 'أقل من $25' },
    { id: '25-50', name: '$25 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100+', name: 'أكثر من $100' }
  ];

  const sortOptions = [
    { id: 'relevance', name: 'الأكثر صلة' },
    { id: 'popular', name: 'الأكثر شعبية' },
    { id: 'rating', name: 'الأعلى تقييماً' },
    { id: 'newest', name: 'الأحدث' },
    { id: 'price-low', name: 'الأقل سعراً' },
    { id: 'price-high', name: 'الأعلى سعراً' }
  ];

  // Mock search results
  const mockResults = [
    {
      id: 1,
      title: 'احتراف Python 2026 من الصفر إلى الاحتراف',
      description: 'دورة شاملة لتعلم برمجة بايثون من الأساسيات المتقدمة مع مشاريع عملية',
      instructor: 'أحمد محمود',
      category: 'programming',
      level: 'intermediate',
      price: 0,
      rating: 4.9,
      students: 15420,
      duration: 18,
      image: 'bg-blue-500',
      certificate: true,
      language: 'العربية',
      lastUpdated: '2024-01-15',
      tags: ['Python', 'برمجة', 'Web Development', 'Data Science']
    },
    {
      id: 2,
      title: 'تطوير تطبيقات الويب مع React و Next.js',
      description: 'تعلم بناء تطبيقات ويب حديثة باستخدام React و Next.js مع أفضل الممارسات',
      instructor: 'سارة علي',
      category: 'programming',
      level: 'advanced',
      price: 49.99,
      rating: 4.8,
      students: 8930,
      duration: 24,
      image: 'bg-purple-500',
      certificate: true,
      language: 'العربية',
      lastUpdated: '2024-01-10',
      tags: ['React', 'Next.js', 'JavaScript', 'Frontend']
    },
    {
      id: 3,
      title: 'تصميم UI/UX احترافي مع Figma',
      description: 'دورة متقدمة في تصميم واجهات المستخدم وتجربة المستخدم باستخدام Figma',
      instructor: 'محمد سالم',
      category: 'design',
      level: 'intermediate',
      price: 39.99,
      rating: 4.7,
      students: 6750,
      duration: 15,
      image: 'bg-pink-500',
      certificate: true,
      language: 'العربية',
      lastUpdated: '2024-01-08',
      tags: ['Figma', 'UI Design', 'UX Design', 'Prototyping']
    },
    {
      id: 4,
      title: 'تحليل البيانات مع Python و Pandas',
      description: 'تعلم تحليل البيانات واستخلاص الرؤى باستخدام Python ومكتبة Pandas',
      instructor: 'ليلى أحمد',
      category: 'data',
      level: 'beginner',
      price: 0,
      rating: 4.6,
      students: 12300,
      duration: 12,
      image: 'bg-green-500',
      certificate: false,
      language: 'العربية',
      lastUpdated: '2024-01-12',
      tags: ['Python', 'Data Analysis', 'Pandas', 'Statistics']
    }
  ];

  // Search function
  const performSearch = useCallback(async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter results based on search query and filters
    let filteredResults = mockResults.filter(course => {
      const matchesSearch = !searchQuery || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = filters.category === 'all' || course.category === filters.category;
      const matchesLevel = filters.level === 'all' || course.level === filters.level;
      const matchesPrice = filters.price === 'all' || 
        (filters.price === 'free' && course.price === 0) ||
        (filters.price === 'paid' && course.price > 0);
      const matchesRating = filters.rating === 'all' || course.rating >= parseFloat(filters.rating);
      const matchesCertificate = filters.certificate === 'all' || 
        (filters.certificate === 'yes' && course.certificate) ||
        (filters.certificate === 'no' && !course.certificate);
      
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesRating && matchesCertificate;
    });
    
    // Sort results
    filteredResults.sort((a, b) => {
      switch (filters.sortBy) {
        case 'popular':
          return b.students - a.students;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });
    
    setResults(filteredResults);
    setLoading(false);
  }, [searchQuery, filters]);

  useEffect(() => {
    if (searchQuery || filters.category !== 'all' || filters.level !== 'all') {
      performSearch();
    } else {
      setResults([]);
    }
  }, [searchQuery, filters, performSearch]);

  const clearFilters = () => {
    setFilters({
      category: 'all',
      level: 'all',
      price: 'all',
      duration: 'all',
      rating: 'all',
      language: 'all',
      certificate: 'all',
      sortBy: 'relevance'
    });
  };

  const activeFiltersCount = Object.values(filters).filter(val => val !== 'all').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-center mb-8">ابحث عن دورات</h1>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center">
                <div className="p-4">
                  <Search className="text-gray-400" size={24} />
                </div>
                <input
                  type="text"
                  placeholder="ابحث عن دورات، مدربين، أو مهارات..."
                  className="flex-1 p-4 text-gray-900 text-lg outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="rounded-xl m-1"
                  onClick={performSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'بحث'
                  )}
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              {['Python', 'React', 'UI/UX', 'Data Science', 'JavaScript'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Filter size={20} />
                  <h2 className="text-lg font-bold">الفلاتر</h2>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    مسح الكل
                  </button>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={16} className="ml-2" />
                  الفلاتر ({activeFiltersCount})
                </Button>
              </div>

              {/* Filter Options */}
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">الفئة</h3>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Level */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">المستوى</h3>
                  <select
                    value={filters.level}
                    onChange={(e) => setFilters({...filters, level: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {levels.map(level => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">السعر</h3>
                  <select
                    value={filters.price}
                    onChange={(e) => setFilters({...filters, price: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {priceRanges.map(range => (
                      <option key={range.id} value={range.id}>{range.name}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">التقييم الأدنى</h3>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="all">جميع التقييمات</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.0">4.0+</option>
                    <option value="3.5">3.5+</option>
                    <option value="3.0">3.0+</option>
                  </select>
                </div>

                {/* Certificate */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">شهادة</h3>
                  <select
                    value={filters.certificate}
                    onChange={(e) => setFilters({...filters, certificate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="all">الكل</option>
                    <option value="yes">متوفر</option>
                    <option value="no">غير متوفر</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">ترتيب حسب</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `نتائج البحث عن "${searchQuery}"` : 'جميع الدورات'}
                </h2>
                <p className="text-gray-500">
                  {loading ? 'جاري البحث...' : `${results.length} نتيجة`}
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-2">
                <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <BookOpen size={20} />
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                  <Users size={20} />
                </button>
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((course) => (
                  <Card key={course.id} className="hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <div className={`h-48 ${course.image} rounded-t-lg`}></div>
                      {course.price === 0 && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          مجاني
                        </div>
                      )}
                      {course.certificate && (
                        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          <Award size={12} className="inline ml-1" />
                          شهادة
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500" size={14} fill="currentColor" />
                          <span className="font-bold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{course.duration} ساعة</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {course.price === 0 ? (
                            <span className="text-lg font-bold text-green-600">مجاني</span>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">${course.price}</span>
                          )}
                        </div>
                        <Button variant="primary" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : searchQuery ? (
              <Card className="text-center py-16">
                <div className="text-gray-400 mb-4 text-6xl">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">لم نعثر على نتائج</h3>
                <p className="text-gray-500 mb-6">
                  جرب تغيير كلمات البحث أو تعديل الفلاتر
                </p>
                <Button onClick={() => setSearchQuery('')}>
                  مسح البحث
                </Button>
              </Card>
            ) : (
              <Card className="text-center py-16">
                <Search className="text-gray-400 mx-auto mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">ابدأ البحث عن دورات</h3>
                <p className="text-gray-500">
                  استخدم شريط البحث أعلاه للعثور على الدورات التي تناسبك
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
