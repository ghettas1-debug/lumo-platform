'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Users, 
  Star, 
  Award, 
  Play, 
  Heart, 
  Bookmark, 
  Share2, 
  CheckCircle,
  TrendingUp,
  Globe,
  Calendar
} from 'lucide-react';
import { formatNumber } from '@/lib/formatNumber';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    provider: string;
    instructor: string;
    rating: number;
    reviews: number;
    students: number;
    duration: string;
    level: string;
    certificate: boolean;
    free: boolean;
    originalPrice?: number;
    currentPrice?: number;
    thumbnail: string;
    badge?: string;
    category: string;
    language: string;
    lastUpdated: string;
    progress?: number;
    enrolled?: boolean;
    wishlisted?: boolean;
  };
  interactive?: boolean;
  preview?: boolean;
  compact?: boolean;
}

const CourseCard = React.memo(function CourseCard({ 
  course, 
  interactive = true, 
  preview = true,
  compact = false
}: CourseCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(course.wishlisted || false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const levelColors = useMemo(() => ({
    'مبتدئ': 'bg-green-100 text-green-800',
    'متوسط': 'bg-blue-100 text-blue-800',
    'متقدم': 'bg-purple-100 text-purple-800',
    'خبير': 'bg-red-100 text-red-800'
  }), []);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  }, [isWishlisted]);

  const handleBookmark = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  }, [isBookmarked]);

  const handleShare = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigator.share?.({
      title: course.title,
      text: `شاهد هذه الدورة الرائعة: ${course.title}`,
      url: window.location.href
    });
  }, [course.title]);

  if (compact) {
    return (
      <Link href={`/courses/${course.id}`} className="block">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg border-2 border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden group hover:border-blue-400 hover:from-blue-100 hover:to-indigo-200">
          <div className="flex gap-4 p-4">
            {/* Thumbnail */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover rounded-lg"
              />
              {course.free && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  مجاني
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{course.provider}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                  <span>({formatNumber(course.reviews)})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{formatNumber(course.students)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${course.id}`} className="block">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border-2 border-blue-300 hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 hover:border-blue-400 hover:from-blue-100 hover:to-indigo-200">
        {/* Thumbnail Section */}
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Overlay Actions */}
            {interactive && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                  {preview && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPreview(true);
                      }}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Play className="w-5 h-5 ml-1" />
                    </button>
                  )}
                  
                  <button 
                    onClick={handleWishlist}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {course.badge && (
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                  {course.badge}
                </span>
              )}
              
              {course.free && (
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  مجاني
                </span>
              )}
              
              {course.enrolled && (
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  مسجل
                </span>
              )}
            </div>

            {/* Progress Bar */}
            {course.progress !== undefined && course.progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                <div className="flex items-center justify-between text-white text-sm mb-1">
                  <span>التقدم</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Category and Level */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
              {course.category}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${levelColors[course.level as keyof typeof levelColors]}`}>
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          {/* Provider and Instructor */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>{course.provider}</span>
            <span>•</span>
            <span>{course.instructor}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{course.rating}</span>
              <span>({formatNumber(course.reviews)})</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{formatNumber(course.students)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.certificate && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Award className="w-3 h-3" />
                <span>شهادة</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Globe className="w-3 h-3" />
              <span>{course.language}</span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>محدث {course.lastUpdated}</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {!course.free ? (
                <>
                  {course.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {course.originalPrice} ر.س
                    </span>
                  )}
                  <span className="text-xl font-bold text-gray-900">
                    {course.currentPrice} ر.س
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-green-600">مجاني</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={handleBookmark}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current text-blue-600' : ''}`} />
              </button>
              
              {course.enrolled ? (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  استكمال
                </button>
              ) : (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  {course.free ? 'سجل الآن' : 'اشترِ الآن'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold">معاينة الدورة</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-black">
              {/* Video preview would go here */}
              <div className="w-full h-full flex items-center justify-center text-white">
                <Play className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
});

export default CourseCard;
