'use client';

import React, { useState, useMemo, useCallback, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  Heart, 
  Share2, 
  Download,
  Eye,
  ChevronRight,
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  X,
  Filter,
  Grid3X3,
  List,
  Search,
  SlidersHorizontal
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

// Memoized course card component
const CourseCard = memo(({ 
  course, 
  isSaved, 
  onSave, 
  onShare, 
  onPreview, 
  getLevelColor, 
  variant 
}: {
  course: Course;
  isSaved: boolean;
  onSave: (courseId: string) => void;
  onShare: (course: Course) => void;
  onPreview: (courseId: string) => void;
  getLevelColor: (level: string) => string;
  variant: 'default' | 'featured' | 'compact';
}) => {
  const handleSaveClick = useCallback(() => {
    onSave(course.id);
  }, [course.id, onSave]);

  const handleShareClick = useCallback(() => {
    onShare(course);
  }, [course, onShare]);

  const handlePreviewClick = useCallback(() => {
    onPreview(course.id);
  }, [course.id, onPreview]);

  // Default variant
  return (
    <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-blue-300 hover:border-blue-400 hover:-translate-y-1">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <button
          onClick={handlePreviewClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label={`Preview ${course.title}`}
        >
          <Play className="w-5 h-5 text-gray-800 ml-1" />
        </button>
        
        {/* Level Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
          {course.level}
        </div>
        
        {/* Save Button */}
        <button
          onClick={handleSaveClick}
          className="absolute top-2 left-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label={`Save ${course.title}`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {course.category}
          </Badge>
          {course.isNew && (
            <Badge variant="destructive" className="text-xs">
              جديد
            </Badge>
          )}
          {course.isBestseller && (
            <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
              الأكثر مبيعاً
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-6 h-6 rounded-full"
            loading="lazy"
          />
          <span className="text-sm text-gray-700">{course.instructor}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-sm text-gray-500">({course.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{course.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Duration & Level */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{course.level}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">
              ${course.price}
            </span>
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="text-sm text-gray-500 line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
          {course.originalPrice && course.originalPrice > course.price && (
            <Badge variant="destructive" className="text-xs">
              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% خصم
            </Badge>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              +{course.tags.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleShareClick}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-1" />
            مشاركة
          </Button>
          <Link href={`/courses/${course.id}`}>
            <Button size="sm" className="flex-1">
              <ChevronRight className="w-4 h-4 mr-1" />
              عرض التفاصيل
            </Button>
          </Link>
        </div>

        {/* Progress Bar (for enrolled courses) */}
        {course.isEnrolled && course.progress !== undefined && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">التقدم</span>
              <span className="text-xs font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default function InteractiveCourseCards({ 
  courses, 
  variant = 'default' 
}: InteractiveCourseCardsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [savedCourses, setSavedCourses] = useState<Set<string>>(new Set());
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Memoized handlers
  const handleSave = useCallback((courseId: string) => {
    setSavedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  }, []);

  const handleShare = useCallback((course: Course) => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.origin + `/courses/${course.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/courses/${course.id}`);
    }
  }, []);

  const handlePreview = useCallback((courseId: string) => {
    setShowPreview(courseId);
  }, []);

  // Memoized getLevelColor function
  const getLevelColor = useCallback((level: string) => {
    const colors = {
      'مبتدئ': 'bg-green-100 text-green-800 border-2 border-green-300',
      'متوسط': 'bg-blue-100 text-blue-800 border-2 border-blue-300',
      'متقدم': 'bg-purple-100 text-purple-800 border-2 border-purple-300'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-2 border-gray-300';
  }, []);

  // Memoized enhanced courses
  const enhancedCourses = useMemo(() => {
    return courses.map(course => ({
      ...course,
      reviews: Math.floor(Math.random() * 1000) + 100,
      instructorTitle: 'مدرب معتمد',
      isNew: Math.random() > 0.7,
      isBestseller: Math.random() > 0.8,
      isWishlisted: false
    }));
  }, [courses]);

  // Memoized sorted courses
  const sortedCourses = useMemo(() => {
    return [...enhancedCourses].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.students - a.students;
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
  }, [enhancedCourses, sortBy]);

  // Memoized filtered courses
  const filteredCourses = useMemo(() => {
    return filterCategory === 'all' 
      ? sortedCourses 
      : sortedCourses.filter(course => course.category === filterCategory);
  }, [sortedCourses, filterCategory]);

  // Memoized container variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);

  // Memoized item variants
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  // Memoized categories
  const categories = useMemo(() => {
    const cats = new Set(courses.map(course => course.category));
    return Array.from(cats);
  }, [courses]);

  return (
    <div ref={ref} className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            الدورات المتاحة
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4 mr-1" />
              شبكة
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-1" />
              قائمة
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">ترتيب حسب:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">الأكثر شعبية</option>
              <option value="newest">الأحدث</option>
              <option value="price-low">السعر الأقل</option>
              <option value="price-high">السعر الأعلى</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">الفئة:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">الكل الفئات</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن دورات..."
                className="pl-10 pr-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <CourseCard
              course={course}
              isSaved={savedCourses.has(course.id)}
              onSave={handleSave}
              onShare={handleShare}
              onPreview={handlePreview}
              getLevelColor={getLevelColor}
              variant={variant}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">معاينة الدورة</h3>
              <button
                onClick={() => setShowPreview(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg mb-4">
              {/* Video preview would go here */}
              <div className="flex items-center justify-center h-full">
                <Play className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(null)}
              >
                إغلاق
              </Button>
              <Link href={`/courses/${showPreview}`}>
                <Button>
                  عرض الدورة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
