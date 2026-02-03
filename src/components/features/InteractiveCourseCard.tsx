'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';

interface InteractiveCourseCardProps {
  course: {
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
  };
  variant?: 'default' | 'featured' | 'compact';
}

export default function InteractiveCourseCard({ 
  course, 
  variant = 'default' 
}: InteractiveCourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: `/courses/${course.id}`
      });
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-blue-100 text-blue-800';
      case 'متقدم': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDefaultCard = () => (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
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
          onClick={() => setShowPreview(true)}
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
          onClick={handleSave}
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
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
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
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
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

  const renderFeaturedCard = () => (
    <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Featured Badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
          <TrendingUp className="w-3 h-3 mr-1" />
          مميز
        </Badge>
      </div>

      {/* Course Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Enhanced Play Button */}
        <button
          onClick={() => setShowPreview(true)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <Play className="w-7 h-7 text-gray-800 ml-1" />
        </button>
        
        {/* Quick Stats Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{course.students.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="p-6">
        {/* Category and Level */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-sm">
            {course.category}
          </Badge>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium text-gray-900">{course.instructor}</div>
            <div className="text-sm text-gray-500">مدرب معتمد</div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-sm font-medium">{course.duration}</div>
            <div className="text-xs text-gray-500">مدة</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-sm font-medium">12</div>
            <div className="text-xs text-gray-500">درس</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-sm font-medium">شهادة</div>
            <div className="text-xs text-gray-500">معتمدة</div>
          </div>
        </div>

        {/* Enhanced Price Section */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${course.price}
              </span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-lg text-gray-500 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            {course.originalPrice && course.originalPrice > course.price && (
              <div className="text-sm text-green-600 font-medium">
                حفظ {Math.round((1 - course.price / course.originalPrice) * 100)}%
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <Link href={`/courses/${course.id}`}>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                {course.isEnrolled ? 'متابعة' : 'اشترك الآن'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompactCard = () => (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2">
            <div className="text-white text-xs font-medium">
              {course.level}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-4 h-4 rounded-full"
            />
            <span className="text-xs text-gray-600">{course.instructor}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{course.students}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">${course.price}</span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-xs text-gray-500 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <Link href={`/courses/${course.id}`}>
              <Button size="sm" className="text-xs px-3 py-1">
                {course.isEnrolled ? 'متابعة' : 'اشترك'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {variant === 'featured' && renderFeaturedCard()}
      {variant === 'compact' && renderCompactCard()}
      {variant === 'default' && renderDefaultCard()}
      
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative h-96 bg-black">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setShowPreview(false)}
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
      )}
    </>
  );
}
