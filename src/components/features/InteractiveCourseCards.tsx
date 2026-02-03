'use client';

import React, { useState } from 'react';
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

  const handleSave = (courseId: string) => {
    setSavedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const handleShare = (course: Course) => {
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
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'مبتدئ': 'bg-green-100 text-green-800 border-2 border-green-300',
      'متوسط': 'bg-blue-100 text-blue-800 border-2 border-blue-300',
      'متقدم': 'bg-purple-100 text-purple-800 border-2 border-purple-300'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-2 border-gray-300';
  };

  // Enhanced course data with additional properties
  const enhancedCourses = courses.map(course => ({
    ...course,
    reviews: Math.floor(Math.random() * 1000) + 100,
    instructorTitle: 'مدرب معتمد',
    isNew: Math.random() > 0.7,
    isBestseller: Math.random() > 0.8,
    isWishlisted: false
  }));

  // Sort courses
  const sortedCourses = [...enhancedCourses].sort((a, b) => {
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

  // Filter courses
  const filteredCourses = filterCategory === 'all' 
    ? sortedCourses 
    : sortedCourses.filter(course => course.category === filterCategory);

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

  const renderCourseCard = (course: Course) => {
    const isSaved = savedCourses.has(course.id);
    
    // Default variant
    return (
      <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-blue-300 hover:border-blue-400 hover:-translate-y-1">
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button */}
          <button
            onClick={() => setShowPreview(course.id)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <Play className="w-5 h-5 text-gray-800 ml-1" />
          </button>
          
          {/* Level Badge */}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </div>
          
          {/* Save Button */}
          <button
            onClick={() => handleSave(course.id)}
            className="absolute top-2 left-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
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
            {course.isEnrolled && (
              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                مسجل
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

          {/* Tags */}
          {course.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-2 py-1 rounded border-2 border-blue-300"
                >
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{course.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">{course.instructor}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Progress (for enrolled courses) */}
          {course.isEnrolled && course.progress && (
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">التقدم</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 border-2 border-gray-400">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-300 border-2 border-blue-400"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${course.price}
                </span>
                {course.originalPrice && course.originalPrice > course.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
              {course.originalPrice && course.originalPrice > course.price && (
                <div className="text-xs text-green-600 font-medium">
                  حفظ {Math.round((1 - course.price / course.originalPrice) * 100)}%
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare(course)}
                className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 rounded-lg hover:from-blue-200 hover:to-blue-300 transition-all duration-300 border-2 border-blue-300 hover:border-blue-400"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <Link href={`/courses/${course.id}`}>
                <Button size="sm" className="text-xs">
                  {course.isEnrolled ? 'متابعة' : 'اشترك الآن'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Preview Modal
  const renderPreviewModal = () => {
    const course = courses.find(c => c.id === showPreview);
    if (!course) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="relative h-96 bg-black">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setShowPreview(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span>{course.students.toLocaleString()} طالب</span>
                </div>
              </div>
              <Link href={`/courses/${course.id}`}>
                <Button>
                  {course.isEnrolled ? 'متابعة الدورة' : 'اشترك الآن'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id}>
            {renderCourseCard(course)}
          </div>
        ))}
      </div>
      
      {/* Preview Modal */}
      {renderPreviewModal()}
    </>
  );
}
