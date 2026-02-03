'use client';

import React, { useState, forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Play, Clock, Users, BookOpen, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/atoms/Card';
import { Badge } from '@/components/ui/atoms/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  price: number;
  originalPrice?: number;
  isBestseller?: boolean;
  isWishlisted?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
  onWishlist?: () => void;
  onEnroll?: () => void;
}

const CourseCard = forwardRef<HTMLDivElement, CourseCardProps>(({
  id,
  title,
  description,
  instructor,
  image,
  rating,
  students,
  duration,
  level,
  price,
  originalPrice,
  isBestseller = false,
  isWishlisted = false,
  variant = 'default',
  className,
  onWishlist,
  onEnroll,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
        )}
      />
    ));
  };

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-blue-100 text-blue-800',
      advanced: 'bg-purple-100 text-purple-800',
      expert: 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || colors.beginner;
  };

  if (variant === 'compact') {
    return (
      <Card ref={ref} className={cn('hover:scale-[1.02]', className || '')} hover="scale" {...props}>
        <div className="flex gap-4 p-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-lg"
            />
            {isBestseller && (
              <Badge variant="premium" size="sm" className="absolute top-2 right-2">
                الأكثر مبيعاً
              </Badge>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{students.toLocaleString()} طالب</span>
              <span className="text-gray-400">•</span>
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">${price} ريال</span>
                {originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {originalPrice} ريال
                  </span>
                )}
              </div>
              <button
                onClick={onWishlist}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                )}
              >
                <Heart className={cn('w-4 h-4', isWishlisted ? 'fill-current' : '')} />
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card ref={ref} className={cn('group overflow-hidden', className || '')} hover="lift" {...props}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={onEnroll}
          >
            <Play className="w-4 h-4 mr-2" />
            عرض الدورة
          </Button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isBestseller && (
            <Badge variant="premium" size="sm">
              الأكثر مبيعاً
            </Badge>
          )}
          <Badge variant="secondary" size="sm" className={getLevelColor(level)}>
            {level}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{students.toLocaleString()} طالب</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{instructor}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onWishlist}
            className={cn(
              'p-2 rounded-lg transition-colors',
              isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
            )}
          >
            <Heart className={cn('w-4 h-4', isWishlisted ? 'fill-current' : '')} />
          </button>
        </div>
        
        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {renderStars(rating)}
            <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-2">
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {originalPrice} ريال
              </span>
            )}
            <span className="text-xl font-bold text-gray-900">{price} ريال</span>
          </div>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            شهادة معتمدة
          </div>
          <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            <Users className="w-3 h-3" />
            مدى الحياة
          </div>
          <div className="flex items-center gap-1 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            تعلم بالسرعة
          </div>
        </div>
        
        {/* CTA */}
        <CardFooter className="flex gap-3">
          <Button
            className="flex-1"
            onClick={onEnroll}
            disabled={isHovered}
          >
            {isHovered ? 'جاري التسجيل...' : 'سجل الآن'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            معاينة
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
