'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Play,
  Heart,
  ChevronDown,
  Sparkles,
  Zap,
  Target,
  Rocket,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';
import { tokens } from '@/tokens/design-tokens';

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
  isBestseller?: boolean;
  isNew?: boolean;
}

interface ProfessionalCoursesSectionProps {
  courses: Course[];
}

export default function ProfessionalCoursesSection({ courses }: ProfessionalCoursesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [sortBy, setSortBy] = useState('الأكثر شعبية');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Categories
  const categories = useMemo(() => {
    const cats = ['الكل', ...new Set(courses.map(course => course.category))];
    return cats;
  }, [courses]);

  // Sort options
  const sortOptions = ['الأكثر شعبية', 'الأحدث', 'الأعلى تقييماً', 'السعر: من الأقل إلى الأعلى', 'السعر: من الأعلى إلى الأقل'];

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'الكل' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'الأكثر شعبية':
          return b.students - a.students;
        case 'الأحدث':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'الأعلى تقييماً':
          return b.rating - a.rating;
        case 'السعر: من الأقل إلى الأعلى':
          return a.price - b.price;
        case 'السعر: من الأعلى إلى الأقل':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, searchQuery, selectedCategory, sortBy]);

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 bg-blue-100 rounded-2xl opacity-50"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 bg-purple-100 rounded-2xl opacity-50"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>دورات مميزة لك</span>
            <ArrowLeft className="w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            اكتشف أفضل الدورات التعليمية
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              من خبراء عالميين
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            انضم إلى آلاف الطلاب الذين يتعلمون من أفضل المدربين المعتمدين في مختلف المجالات التقنية والإدارية
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن دورات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-gray-50 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">تم العثور على</span>
            <span className="font-bold text-blue-600">{filteredAndSortedCourses.length}</span>
            <span>دورة</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <TrendingUp className="w-3 h-3 ml-1" />
              الأكثر شعبية
            </Badge>
          </div>
        </motion.div>

        {/* Courses Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedCategory}-${sortBy}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredAndSortedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/courses/${course.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200">
                    {/* Course Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-6 h-6 text-blue-600 ml-1" />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {course.isBestseller && (
                          <Badge className="bg-orange-500 text-white border-orange-500">
                            <TrendingUp className="w-3 h-3 ml-1" />
                            الأكثر مبيعاً
                          </Badge>
                        )}
                        {course.isNew && (
                          <Badge className="bg-green-500 text-white border-green-500">
                            <Sparkles className="w-3 h-3 ml-1" />
                            جديد
                          </Badge>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle wishlist
                        }}
                        className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors duration-200"
                      >
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
                      </button>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      {/* Category and Level */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {course.level}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                        {course.tags.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                            +{course.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Instructor */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {course.instructor.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{course.instructor}</p>
                          <p className="text-xs text-gray-500">مدرب معتمد</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{course.rating}</span>
                          <span className="text-gray-400">({Math.floor(course.students / 100)})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString('ar-SA')}</span>
                        </div>
                      </div>

                      {/* Progress (for enrolled courses) */}
                      {course.isEnrolled && course.progress && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">تقدمك</span>
                            <span className="font-medium text-blue-600">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {course.originalPrice && (
                            <span className="text-gray-400 line-through text-sm">
                              ${course.originalPrice}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-gray-900">
                            ${course.price}
                          </span>
                        </div>
                        
                        <Button
                          size="sm"
                          className={course.isEnrolled 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          }
                        >
                          {course.isEnrolled ? 'استكمل التعلم' : 'انضم الآن'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredAndSortedCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لم يتم العثور على دورات
            </h3>
            <p className="text-gray-600 mb-6">
              جرب تغيير معايير البحث أو استكشف الفئات الأخرى
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('الكل');
                setSortBy('الأكثر شعبية');
              }}
              variant="outline"
            >
              إعادة تعيين الفلاتر
            </Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredAndSortedCourses.length > 0 && filteredAndSortedCourses.length >= 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-600 transition-all duration-300"
            >
              عرض المزيد من الدورات
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
