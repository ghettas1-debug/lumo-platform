'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Clock, 
  Users, 
  Heart, 
  PlayCircle, 
  Award, 
  BookOpen,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';
import { useInView } from 'react-intersection-observer';

interface EnhancedCourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    instructorAvatar: string;
    instructorTitle?: string;
    rating: number;
    reviews: number;
    students: string;
    duration: string;
    level: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    tags: string[];
    isEnrolled?: boolean;
    progress?: number;
    isNew?: boolean;
    isBestseller?: boolean;
    isWishlisted?: boolean;
  };
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({ 
  course, 
  variant = 'default',
  className = ''
}) => {
  const [isWishlisted, setIsWishlisted] = useState(course.isWishlisted || false);
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'مبتدئ': 'from-green-400 to-green-600',
      'متوسط': 'from-blue-400 to-blue-600',
      'متقدم': 'from-purple-400 to-purple-600',
      'خبير': 'from-red-400 to-red-600'
    };
    return colors[level] || colors['مبتدئ'];
  };

  const cardVariants = {
    default: 'h-full',
    compact: 'h-80',
    featured: 'h-full max-w-md'
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-500 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (variant === 'compact') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-full">
          {/* Image Section */}
          <div className="relative w-1/3 overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-1">
              {course.isNew && (
                <Badge className="bg-green-500 text-white text-xs px-2 py-1">جديد</Badge>
              )}
              {course.isBestseller && (
                <Badge className="bg-orange-500 text-white text-xs px-2 py-1">الأكثر مبيعاً</Badge>
              )}
            </div>

            {/* Play Button Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                >
                  <Button className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full">
                    <PlayCircle className="w-6 h-6" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex-1">
              {/* Category and Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600">{course.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold">{course.rating}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                {course.title}
              </h3>

              {/* Instructor */}
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs text-gray-600">{course.instructor}</span>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{course.students}</span>
                </div>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                {course.originalPrice && (
                  <span className="text-xs text-gray-400 line-through block">
                    ${course.originalPrice}
                  </span>
                )}
                <span className="text-lg font-bold text-gray-900">
                  ${course.price}
                </span>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1"
              >
                انضم الآن
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden ${cardVariants[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {course.isNew && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              جديد
            </Badge>
          )}
          {course.isBestseller && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              الأكثر مبيعاً
            </Badge>
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`bg-gradient-to-r ${getLevelColor(course.level)} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg`}>
            {course.level}
          </Badge>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 group/btn"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600 group-hover/btn:text-red-500'
            }`}
          />
        </button>

        {/* Play Preview Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <Button className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300 hover:scale-105">
                <PlayCircle className="mr-2 w-5 h-5" />
                معاينة الدورة
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-600">{course.category}</span>
            {course.isEnrolled && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">ملتزم</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {renderStars(course.rating)}
            </div>
            <span className="text-sm font-semibold text-gray-900 ml-1">{course.rating}</span>
            <span className="text-sm text-gray-500">({course.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{course.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{course.tags.length - 3}
            </span>
          )}
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">{course.instructor}</div>
            {course.instructorTitle && (
              <div className="text-xs text-gray-500">{course.instructorTitle}</div>
            )}
          </div>
        </div>

        {/* Progress Bar (for enrolled courses) */}
        {course.isEnrolled && course.progress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>تقدمك</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.level}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="text-right">
              {course.originalPrice && (
                <span className="text-sm text-gray-400 line-through block">
                  ${course.originalPrice}
                </span>
              )}
              <span className="text-xl font-bold text-gray-900">
                ${course.price}
              </span>
            </div>

            {/* CTA Button */}
            {course.isEnrolled ? (
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                استكمل التعلم
                <ArrowRight className="mr-2 w-4 h-4" />
              </Button>
            ) : (
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                انضم الآن
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default EnhancedCourseCard;
