'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  memo
} from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';

import {
  Play,
  Clock,
  Users,
  Star,
  Award,
  Heart,
  Share2,
  Eye,
  Grid3X3,
  List,
  Sparkles
} from 'lucide-react';

import { Button } from '../Button';
import { Badge } from '../ui/Badge';

/* ----------------------------------
   Types
----------------------------------- */

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  reviews?: number;
  students: number;
  duration: string;
  level: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isEnrolled?: boolean;
  progress?: number;
  lastAccessed?: string;
  certificateAvailable?: boolean;
}

interface InteractiveCourseCardsProps {
  courses: Course[];
  variant?: 'default' | 'featured' | 'compact';
}

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'featured' | 'compact';
}

/* ----------------------------------
   Animation Presets
----------------------------------- */

const containerVariants = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },

  visible: {
    opacity: 1,
    y: 0
  }
};

/* ----------------------------------
   Course Card
----------------------------------- */

const CourseCard = memo(
  ({ course, variant = 'default' }: CourseCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    /* Bookmark */

    const handleBookmark = useCallback(() => {
      setIsBookmarked(prev => !prev);
    }, []);

    /* Share */

    const handleShare = useCallback(() => {
      if (!navigator.share) {
        alert('المشاركة غير مدعومة في هذا المتصفح');
        return;
      }

      navigator.share({
        title: course.title,
        text: course.description,
        url: `${window.location.origin}/courses/${course.id}`
      });
    }, [course]);

    /* Compact Variant */

    if (variant === 'compact') {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 transition cursor-pointer"
        >
          <div className="flex gap-3 items-center">

            <div className="relative w-16 h-16">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="flex-1 min-w-0">

              <h3 className="font-semibold truncate">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600">
                {course.instructor}
              </p>

              <div className="flex items-center gap-1 mt-1">

                <Star className="w-4 h-4 text-yellow-400 fill-current" />

                <span className="text-sm font-medium">
                  {course.rating}
                </span>

                <span className="text-sm text-gray-500">
                  ({course.reviews || 0})
                </span>

              </div>

            </div>

            <Button size="sm" variant="outline">
              <Play className="w-4 h-4 mr-1" />
              عرض
            </Button>

          </div>
        </motion.div>
      );
    }

    /* Default Card */

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden group transition"
      >
        {/* Image */}

        <div className="relative h-48 overflow-hidden">

          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay */}

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute top-4 right-4 flex gap-2">

              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white"
                onClick={handleBookmark}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isBookmarked ? 'fill-current' : ''
                  }`}
                />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>

            </div>
          </div>

          {/* Badges */}

          <div className="absolute top-4 left-4 flex gap-2">

            <Badge variant="secondary" className="text-xs">
              {course.category}
            </Badge>

            {course.isNew && (
              <Badge variant="destructive" className="text-xs">
                جديد
              </Badge>
            )}

            {course.isBestseller && (
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                الأكثر مبيعاً
              </Badge>
            )}

          </div>

        </div>

        {/* Content */}

        <div className="p-6">

          <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition">
            {course.title}
          </h3>

          {/* Instructor */}

          <div className="flex items-center gap-2 mb-3">

            <div className="relative w-6 h-6">

              <Image
                src={course.instructorAvatar}
                alt={course.instructor}
                fill
                className="rounded-full object-cover"
              />

            </div>

            <span className="text-sm text-gray-700">
              {course.instructor}
            </span>

          </div>

          {/* Stats */}

          <div className="flex justify-between mb-3 text-sm">

            <div className="flex items-center gap-1">

              <Star className="w-4 h-4 text-yellow-400 fill-current" />

              <span>{course.rating}</span>

              <span className="text-gray-500">
                ({course.reviews || 0})
              </span>

            </div>

            <div className="flex items-center gap-1 text-gray-500">

              <Users className="w-4 h-4" />

              {course.students.toLocaleString()}

            </div>

          </div>

          {/* Meta */}

          <div className="flex gap-4 mb-4 text-sm text-gray-600">

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>

            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              {course.level}
            </div>

          </div>

          {/* Tags */}

          <div className="flex flex-wrap gap-1 mb-4">

            {course.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}

          </div>

          {/* Footer */}

          <div className="flex justify-between items-center">

            <div>

              {course.originalPrice && (
                <span className="text-sm text-gray-500 line-through mr-2">
                  ${course.originalPrice}
                </span>
              )}

              <span className="text-xl font-bold">
                ${course.price}
              </span>

            </div>

            <div className="flex gap-2">

              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                تفاصيل
              </Button>

              <Button size="sm">
                <Play className="w-4 h-4 mr-1" />
                ابدأ
              </Button>

            </div>

          </div>

        </div>

      </motion.div>
    );
  }
);

CourseCard.displayName = 'CourseCard';

/* ----------------------------------
   Main Component
----------------------------------- */

const InteractiveCourseCards = memo(
  ({ courses, variant = 'default' }: InteractiveCourseCardsProps) => {

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const [selectedCategory, setSelectedCategory] =
      useState('all');

    const [searchQuery, setSearchQuery] = useState('');

    const [sortBy, setSortBy] = useState<
      'popular' | 'rating' | 'price-low' | 'price-high'
    >('popular');

    /* Filter & Sort */

    const filteredCourses = useMemo(() => {

      let filtered = [...courses];

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(
          c => c.category === selectedCategory
        );
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();

        filtered = filtered.filter(
          c =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.tags.some(t => t.toLowerCase().includes(q))
        );
      }

      filtered.sort((a, b) => {
        switch (sortBy) {
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

      return filtered;

    }, [
      courses,
      selectedCategory,
      searchQuery,
      sortBy
    ]);

    /* Categories */

    const categories = useMemo(() => {
      return Array.from(
        new Set(courses.map(c => c.category))
      );
    }, [courses]);

    return (
      <div className="w-full">

        {/* Header */}

        <div className="mb-6">

          <div className="flex justify-between mb-4">

            <h2 className="text-2xl font-bold">
              الدورات المتاحة
            </h2>

            <div className="flex gap-2">

              <Button
                size="sm"
                variant={
                  viewMode === 'grid'
                    ? 'primary'
                    : 'outline'
                }
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4 mr-1" />
                شبكة
              </Button>

              <Button
                size="sm"
                variant={
                  viewMode === 'list'
                    ? 'primary'
                    : 'outline'
                }
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-1" />
                قائمة
              </Button>

            </div>

          </div>

          {/* Filters */}

          <div className="flex flex-wrap gap-4 items-center">

            <select
              value={selectedCategory}
              onChange={e =>
                setSelectedCategory(e.target.value)
              }
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">
                جميع الفئات
              </option>

              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="relative flex-1 max-w-md">

              <input
                value={searchQuery}
                onChange={e =>
                  setSearchQuery(e.target.value)
                }
                placeholder="ابحث عن دورة..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />

              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            </div>

            <select
              value={sortBy}
              onChange={e =>
                setSortBy(e.target.value as any)
              }
              className="px-4 py-2 border rounded-lg"
            >
              <option value="popular">
                الأكثر شعبية
              </option>

              <option value="rating">
                الأعلى تقييماً
              </option>

              <option value="price-low">
                السعر ↑
              </option>

              <option value="price-high">
                السعر ↓
              </option>

            </select>

          </div>

        </div>

        {/* Count */}

        <p className="mb-4 text-sm text-gray-600">
          تم العثور على {filteredCourses.length} دورة
        </p>

        {/* Grid */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >

          {filteredCourses.map(course => (

            <motion.div
              key={course.id}
              variants={itemVariants}
            >
              <CourseCard
                course={course}
                variant={variant}
              />
            </motion.div>

          ))}

        </motion.div>

        {/* Empty */}

        {filteredCourses.length === 0 && (

          <div className="text-center py-12">

            <p className="mb-4 text-gray-500">
              لا توجد نتائج
            </p>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('popular');
              }}
            >
              مسح الفلاتر
            </Button>

          </div>

        )}

      </div>
    );
  }
);

InteractiveCourseCards.displayName =
  'InteractiveCourseCards';

export default InteractiveCourseCards;
