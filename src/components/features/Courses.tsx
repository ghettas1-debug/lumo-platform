'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, Users, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Format number function to avoid hydration issues
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const courses = [
  {
    id: 1,
    title: 'تطوير الويب المتقدم',
    instructor: 'أحمد محمد',
    rating: 4.9,
    students: 12500,
    duration: '8 أسابيع',
    level: 'متقدم',
    price: 'مجاني',
    image: 'bg-blue-500',
    category: 'برمجة'
  },
  {
    id: 2,
    title: 'تصميم واجهة المستخدم',
    instructor: 'سارة أحمد',
    rating: 4.8,
    students: 8900,
    duration: '6 أسابيع',
    level: 'متوسط',
    price: 'مجاني',
    image: 'bg-purple-500',
    category: 'تصميم'
  },
  {
    id: 3,
    title: 'تحليل البيانات',
    instructor: 'محمد علي',
    rating: 4.7,
    students: 7600,
    duration: '10 أسابيع',
    level: 'متقدم',
    price: 'مجاني',
    image: 'bg-green-500',
    category: 'بيانات'
  },
  {
    id: 4,
    title: 'التسويق الرقمي',
    instructor: 'فاطمة سالم',
    rating: 4.9,
    students: 14200,
    duration: '4 أسابيع',
    level: 'مبتدئ',
    price: 'مجاني',
    image: 'bg-orange-500',
    category: 'تسويق'
  }
];

const categories = ['الكل', 'برمجة', 'تصميم', 'بيانات', 'تسويق'];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredCourses = activeCategory === 'الكل' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Play className="w-4 h-4" />
            دورات مميزة
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            ابدأ التعلم الآن
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر من بين آلاف الدورات المصممة بواسطة خبراء في مجالهم
          </p>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card variant="elevated" hover={true} interactive={true} className="h-full">
                {/* Course Image */}
                <div className={`aspect-video ${course.image} rounded-2xl mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                    {course.level}
                  </div>
                </div>

                {/* Course Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {course.instructor}
                    </p>
                  </div>

                  {/* Rating and Students */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(course.students)}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-green-600">
                      {course.price}
                    </span>
                    <Button size="sm" variant="outline">
                      ابدأ الآن
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/courses">
            <Button size="lg" variant="outline">
              استكشف جميع الدورات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
