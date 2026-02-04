"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Star, Users, BookOpen, Play, Award, TrendingUp, Calendar, DollarSign, BarChart3, Grid3X3, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import EnhancedCourseCard from '@/components/ui/molecules/EnhancedCourseCard';
import { useInView } from 'react-intersection-observer';
import { PageErrorBoundary } from '@/components/error/PageErrorBoundary';

export function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedLevel, setSelectedLevel] = useState('الكل');
  const [selectedPrice, setSelectedPrice] = useState('الكل');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'popular' | 'price-low' | 'price-high'>('newest');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = ['الكل', 'البرمجة', 'التصميم', 'البيانات', 'الريادة', 'التسويق', 'إدارة الأعمال'];
  const levels = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];
  const prices = ['الكل', 'مجاني', 'مدفوع'];

  const courses = [
    {
      id: 1,
      title: 'احتراف Python 2026',
      instructor: 'أحمد محمود',
      instructorAvatar: '/images/instructors/ahmed.jpg',
      category: 'البرمجة',
      level: 'متوسط',
      price: 0,
      originalPrice: 99.99,
      rating: 4.9,
      students: 12500,
      duration: '40 ساعة',
      image: '/images/courses/python.jpg',
      description: 'تعلم Python من الصفر إلى الاحتراف مع مشاريع عملية',
      tags: ['Python', 'برمجة', 'AI', 'Data Science'],
      progress: 0,
      isNew: true,
      isBestseller: true
    },
    {
      id: 2,
      title: 'Next.js المتقدم',
      instructor: 'سارة علي',
      category: 'البرمجة',
      level: 'متقدم',
      price: 'مجاني',
      rating: 4.8,
      students: 8900,
      duration: '35 ساعة',
      image: 'bg-gradient-to-br from-purple-500 to-purple-600',
      description: 'تطوير تطبيقات ويب حديثة باستخدام Next.js',
      tags: ['Next.js', 'React', 'SSR', 'Static'],
      progress: 0
    },
    {
      id: 3,
      title: 'تصميم UI/UX احترافي',
      instructor: 'محمد سالم',
      category: 'التصميم',
      level: 'متوسط',
      price: 'مجاني',
      rating: 4.7,
      students: 7600,
      duration: '30 ساعة',
      image: 'bg-gradient-to-br from-pink-500 to-pink-600',
      description: 'تصميم واجهات مستخدم احترافية مع Figma',
      tags: ['UI/UX', 'Figma', 'Design', 'Prototype'],
      progress: 0
    },
    {
      id: 4,
      title: 'React من الصفر',
      instructor: 'ليلى أحمد',
      category: 'البرمجة',
      level: 'مبتدئ',
      price: 'مجاني',
      rating: 4.9,
      students: 14200,
      duration: '45 ساعة',
      image: 'bg-gradient-to-br from-green-500 to-green-600',
      description: 'تعلم React وتطوير تطبيقات تفاعلية',
      tags: ['React', 'JavaScript', 'Frontend', 'Web'],
      progress: 0
    },
    {
      id: 5,
      title: 'تحليل البيانات',
      instructor: 'خالد عبدالله',
      category: 'البيانات',
      level: 'متوسط',
      price: 'مدفوع',
      rating: 4.6,
      students: 5400,
      duration: '50 ساعة',
      image: 'bg-gradient-to-br from-orange-500 to-orange-600',
      description: 'تحليل البيانات باستخدام Python و SQL',
      tags: ['Data Analysis', 'Python', 'SQL', 'Statistics'],
      progress: 0
    },
    {
      id: 6,
      title: 'التسويق الرقمي',
      instructor: 'نورا سعيد',
      category: 'التسويق',
      level: 'مبتدئ',
      price: 'مجاني',
      rating: 4.5,
      students: 9800,
      duration: '25 ساعة',
      image: 'bg-gradient-to-br from-teal-500 to-teal-600',
      description: 'استراتيجيات التسويق الرقمي الحديثة',
      tags: ['Marketing', 'SEO', 'Social Media', 'Ads'],
      progress: 0
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'الكل' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'الكل' || course.level === selectedLevel;
    const matchesPrice = selectedPrice === 'الكل' || course.price === selectedPrice;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">جميع الدورات</h1>
              <p className="text-gray-600">اكتشف أكثر من 100 دورة في مختلف المجالات</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="ابحث عن دورة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={20} />
                <span>فلترة</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">الفئة:</span>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">المستوى:</span>
              <div className="flex gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedLevel === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">السعر:</span>
              <div className="flex gap-2">
                {prices.map((price) => (
                  <button
                    key={price}
                    onClick={() => setSelectedPrice(price)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPrice === price
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            تم العثور على <span className="font-bold text-blue-600">{filteredCourses.length}</span> دورة
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>ترتيب حسب الأحدث</option>
            <option>ترتيب حسب الأعلى تقييماً</option>
            <option>ترتيب حسب الأكثر شهرة</option>
            <option>ترتيب حسب الأقل سعراً</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                {/* Course Image */}
                <div className={`h-48 ${course.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs font-medium">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.price === 'مجاني' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {course.price}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2">{course.title}</h3>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Course Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {course.instructor.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700">{course.instructor}</span>
                    </div>
                    <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لم يتم العثور على دورات</h3>
            <p className="text-gray-600 mb-4">جرب تغيير معايير البحث أو الفلترة</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('الكل');
                setSelectedLevel('الكل');
                setSelectedPrice('الكل');
              }}
            >
              إعادة تعيين الفلاتر
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoursesPageWrapper() {
  return (
    <PageErrorBoundary pageName="صفحة الدورات" pagePath="/courses">
      <CoursesPage />
    </PageErrorBoundary>
  );
}
