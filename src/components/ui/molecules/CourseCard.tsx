'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, BookOpen, Play, Award, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/atoms/Card';
import { Badge } from '@/components/ui/atoms/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar?: string;
  image: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  price: number;
  originalPrice?: number;
  category: string;
  tags?: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  progress?: number;
  isEnrolled?: boolean;
  isWishlisted?: boolean;
  onWishlist?: () => void;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(
  ({
    id,
    title,
    description,
    instructor,
    instructorAvatar,
    image,
    rating,
    reviews,
    students,
    duration,
    level,
    price,
    originalPrice,
    category,
    tags = [],
    isBestseller = false,
    isNew = false,
    isHot = false,
    progress = 0,
    isEnrolled = false,
    isWishlisted = false,
    onWishlist,
    className,
    variant = 'default',
    ...props
  }, ref) => {
    const getLevelColor = (level: string) => {
      switch (level) {
        case 'مبتدئ': return 'bg-green-100 text-green-800';
        case 'متوسط': return 'bg-yellow-100 text-yellow-800';
        case 'متقدم': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const renderStars = (rating: number) => {
      return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                'w-4 h-4',
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              )}
            />
          ))}
          <span className="text-sm font-medium text-gray-700 ml-1">
            {rating.toFixed(1)}
          </span>
        </div>
      );
    };

    if (variant === 'compact') {
      return (
        <Card ref={ref} className={cn('hover:scale-[1.02]', className)} hover="scale" {...props}>
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
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {instructor}
                  </p>
                </div>
                
                <button
                  onClick={onWishlist}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  )}
                >
                  <Heart className={cn('w-4 h-4', isWishlisted && 'fill-current')} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                {renderStars(rating)}
                <div className="flex items-center gap-2">
                  {originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {originalPrice} ريال
                    </span>
                  )}
                  <span className="font-bold text-blue-600">
                    {price} ريال
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={cn('group overflow-hidden', className)} hover="lift" {...props}>
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
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isBestseller && (
              <Badge variant="premium" size="sm">
                الأكثر مبيعاً
              </Badge>
            )}
            {isNew && (
              <Badge variant="new" size="sm">
                جديد
              </Badge>
            )}
            {isHot && (
              <Badge variant="hot" size="sm">
                رائج
              </Badge>
            )}
          </div>
          
          {/* Play Button */}
          <Link href={`/courses/${id}`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-5 h-5 text-blue-600 ml-1" />
              </div>
            </div>
          </Link>
          
          {/* Price Tag */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
              <div className="flex items-center gap-2">
                {originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    {originalPrice}
                  </span>
                )}
                <span className="font-bold text-blue-600">
                  {price} ريال
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {/* Category */}
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" size="sm">
              {category}
            </Badge>
            <Badge size="sm" className={getLevelColor(level)}>
              {level}
            </Badge>
          </div>

          {/* Title */}
          <Link href={`/courses/${id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              {title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            {instructorAvatar ? (
              <Image
                src={instructorAvatar}
                alt={instructor}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-3 h-3 text-gray-500" />
              </div>
            )}
            <span className="text-sm text-gray-700">{instructor}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating.toFixed(1)}</span>
                <span className="text-gray-500">({reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{students.toLocaleString('ar-SA')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            </div>
          </div>

          {/* Progress (for enrolled courses) */}
          {isEnrolled && progress > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">التقدم</span>
                <span className="font-medium text-blue-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" size="sm">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" size="sm">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <Link href={`/courses/${id}`}>
              <Button size="sm" className="flex-1">
                {isEnrolled ? 'متابعة التعلم' : 'عرض الدورة'}
              </Button>
            </Link>
            
            <button
              onClick={onWishlist}
              className={cn(
                'p-2 rounded-lg transition-colors ml-2',
                isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
              )}
            >
              <Heart className={cn('w-4 h-4', isWishlisted && 'fill-current')} />
            </button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

CourseCard.displayName = 'CourseCard';

export { CourseCard };
