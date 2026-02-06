'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Filter,
  Grid3X3,
  List,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';
import EnhancedCourseCard from '@/components/ui/molecules/EnhancedCourseCard';
import { useInView } from 'react-intersection-observer';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  isEnrolled?: boolean;
  progress?: number;
  lastAccessed?: string;
  certificateAvailable?: boolean;
}

interface InteractiveCourseCardsProps {
  courses: Course[];
  variant?: 'default' | 'featured' | 'compact';
}

export default function InteractiveCourseCards({ 
  courses, 
  variant = 'default' 
}: InteractiveCourseCardsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Enhanced course data with additional properties
  const enhancedCourses = courses.map(course => ({
    ...course,
    reviews: Math.floor(Math.random() * 1000) + 100,
    instructorTitle: 'مدرب معتمد',
    isNew: Math.random() > 0.7,
    isBestseller: Math.random() > 0.8,
    isWishlisted: false,
    students: course.students.toString()
  }));

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(enhancedCourses.map(course => course.category)))];

  // Sort courses
  const sortedCourses = [...enhancedCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return parseInt(b.students) - parseInt(a.students);
      case 'newest':
        return b.id.localeCompare(a.id);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Filter courses
  const filteredCourses = sortedCourses.filter(course => {
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getGridCols = () => {
    switch (variant) {
      case 'featured':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'compact':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div ref={ref} className="w-full">
      {/* Filters and Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن دورات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className={`${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-blue-600'
                }`}
              >
                {category === 'all' ? 'الكل' : category}
              </Button>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">الأكثر شعبية</option>
                <option value="newest">الأحدث</option>
                <option value="price-low">السعر: منخفض إلى مرتفع</option>
                <option value="price-high">السعر: مرتفع إلى منخفض</option>
              </select>
              <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          تم العثور على <span className="font-semibold text-gray-900">{filteredCourses.length}</span> دورة
        </p>
        {searchQuery && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="text-gray-600"
          >
            مسح البحث
          </Button>
        )}
      </div>

      {/* Courses Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`grid ${getGridCols()} gap-6`}
      >
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            variants={itemVariants}
            layout
          >
            <EnhancedCourseCard
              course={course}
              variant={viewMode === 'list' ? 'compact' : variant}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            لم يتم العثور على دورات
          </h3>
          <p className="text-gray-600 mb-4">
            جرب تغيير معايير البحث أو الفلترة
          </p>
          <Button
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('all');
              setSortBy('popular');
            }}
            variant="outline"
          >
            إعادة تعيين الفلاتر
          </Button>
        </motion.div>
      )}

      {/* Load More Button (if needed) */}
      {filteredCourses.length > 0 && filteredCourses.length >= 12 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            عرض المزيد من الدورات
          </Button>
        </div>
      )}
    </div>
  );
}
