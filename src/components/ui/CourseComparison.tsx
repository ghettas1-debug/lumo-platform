'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ArrowRight, Star, Clock, Users, Award, CheckCircle, Play } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  level: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  tags: string[];
  language: string;
  certificate: boolean;
  isFree: boolean;
}

interface CourseComparisonProps {
  courses: Course[];
  onRemove?: (courseId: string) => void;
  className?: string;
}

export default function CourseComparison({ 
  courses, 
  onRemove, 
  className = "" 
}: CourseComparisonProps) {
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>(['overview', 'instructor', 'content', 'pricing']);

  const features = [
    { id: 'overview', name: 'نظرة عامة', icon: '📋' },
    { id: 'instructor', name: 'المدرب', icon: '👨‍🏫' },
    {id: 'content', name: 'المحتوى', icon: '📚' },
    { id: 'pricing', name: 'السعر', icon: '💰' },
    { id: 'requirements', name: 'المتطلبات', icon: '📋' },
    { id: 'certificate', name: 'الشهادة', icon: '🏆' },
    { id: 'support', name: 'الدعم', icon: '🤝' },
    { id: 'language', name: 'اللغة', icon: '🌐' }
  ];

  const toggleFeature = (featureId: string) => {
    setExpandedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const getFeatureValue = (course: Course, featureId: string) => {
    switch (featureId) {
      case 'overview':
        return (
          <div className="space-y-2">
            <div className="font-medium text-gray-900">{course.title}</div>
            <div className="text-sm text-gray-600">{course.description}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {course.level}
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {course.category}
              </span>
            </div>
          </div>
        );
      
      case 'instructor':
        return (
          <div className="space-y-2">
            <div className="font-medium text-gray-900">{course.instructor}</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
              <div className="text-xs text-gray-500">({course.reviews.toLocaleString()} تقييم)</div>
            </div>
          </div>
        );
      
      case 'content':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()} طالب</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{course.tags.length - 3}</span>
              )}
            </div>
          </div>
        );
      
      case 'pricing':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {course.isFree ? (
                <span className="text-lg font-bold text-green-600">مجاني</span>
              ) : (
                <>
                  <span className="text-lg font-bold text-gray-900">${course.price}</span>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                </>
              )}
            </div>
            {course.originalPrice && course.originalPrice > course.price && (
              <div className="text-xs text-green-600 font-medium">
                حفظ {Math.round((1 - course.price / course.originalPrice) * 100)}%
              </div>
            )}
          </div>
        );
      
      case 'requirements':
        return (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              {course.level === 'مبتدئ' ? 'لا توجد متطلبات مسبقة' : 'معرفة أساسية بالمجال'}
            </div>
          </div>
        );
      
      case 'certificate':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">
                {course.certificate ? 'شهادة معتمدة' : 'لا يوجد شهادة'}
              </span>
            </div>
          </div>
        );
      
      case 'support':
        return (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              دعم فني 24/7
            </div>
          </div>
        );
      
      case 'language':
        return (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              {course.language}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (courses.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-2xl">📊</div>
          </div>
          <p className="text-lg font-medium">لم يتم اختيار أي دورة للمقارنة</p>
          <p className="text-sm text-gray-400">اختر دورات للمقارنة من صفحة الدورات</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">مقارنة الدورات</h3>
            <p className="text-sm text-gray-600 mt-1">
              قارن بين {courses.length} دورة لاختيار الأنسب لك
            </p>
          </div>
          <button
            onClick={() => onRemove?.(courses[0]?.id)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Toggle */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                expandedFeatures.includes(feature.id)
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-1">{feature.icon}</span>
              {feature.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-medium text-gray-900">الميزة</th>
              {courses.map((course) => (
                <th key={course.id} className="text-center p-4">
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                      {course.title}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expandedFeatures.map((feature) => (
              <tr key={(feature as any).id} className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <span>{(feature as any).icon}</span>
                    {(feature as any).name}
                  </div>
                </td>
                {courses.map((course) => (
                  <td key={course.id} className="p-4 text-center">
                    {getFeatureValue(course, (feature as any).id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {courses.length} دورات للمقارنة
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onRemove?.(courses[0]?.id)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إزالة دورة
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              متابعة المقارنة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
