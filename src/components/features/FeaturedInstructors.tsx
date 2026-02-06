'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Star, 
  Users, 
  BookOpen, 
  Award,
  Play,
  ChevronRight,
  MessageCircle,
  Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/atoms/Badge';
import { Button } from '@/components/ui/Button';

const instructors = [
  {
    id: 1,
    name: 'د. أحمد محمد',
    title: 'خبير تطوير الويب',
    bio: '10+ سنوات خبرة في تطوير تطبيقات الويب الحديثة',
    image: '/images/instructors/ahmed.jpg',
    rating: 4.9,
    students: 15420,
    courses: 12,
    expertise: ['React', 'Node.js', 'TypeScript'],
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: 'أ. سارة أحمد',
    title: 'مصممة UI/UX محترفة',
    bio: 'متخصصة في تصميم تجارب المستخدم المبتكرة',
    image: '/images/instructors/sara.jpg',
    rating: 4.8,
    students: 8750,
    courses: 8,
    expertise: ['Figma', 'Adobe XD', 'Prototyping'],
    verified: true,
    featured: true
  },
  {
    id: 3,
    name: 'د. محمد علي',
    title: 'خبير الذكاء الاصطناعي',
    bio: 'باحث في مجال التعلم الآلي والذكاء الاصطناعي',
    image: '/images/instructors/mohammed.jpg',
    rating: 4.9,
    students: 12300,
    courses: 15,
    expertise: ['Python', 'Machine Learning', 'Deep Learning'],
    verified: true,
    featured: true
  },
  {
    id: 4,
    name: 'أ. فاطمة خالد',
    title: 'خبيرة التسويق الرقمي',
    bio: 'متخصصة في استراتيجيات التسويق الرقمي الحديث',
    image: '/images/instructors/fatima.jpg',
    rating: 4.7,
    students: 9200,
    courses: 10,
    expertise: ['SEO', 'Social Media', 'Analytics'],
    verified: true,
    featured: false
  }
];

export default function FeaturedInstructors() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            مدربونا المميزون
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            تعلم من أفضل الخبراء في المجال
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مدربونا معتمدون وذوو خبرة عالية في مجالاتهم، جاهزون لمساعدتك في تحقيق أهدافك التعليمية
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-sm border-2 border-blue-300 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                {/* Instructor Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Verified Badge */}
                  {instructor.verified && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-full border-2 border-white shadow-lg">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {instructor.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="success" className="text-xs">
                        مميز
                      </Badge>
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white to-blue-50 text-blue-600 p-3 rounded-full shadow-lg hover:scale-110 border-2 border-blue-300 hover:border-blue-400">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {instructor.name}
                      </h3>
                      <p className="text-sm text-gray-600">{instructor.title}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{instructor.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {instructor.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {instructor.expertise.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-2 border-blue-300">
                        {skill}
                      </Badge>
                    ))}
                    {instructor.expertise.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-2 border-blue-300">
                        +{instructor.expertise.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{instructor.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{instructor.courses} دورة</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      عرض الملف
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 border-2 border-blue-300 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              انضم إلى فريق المدربين المميزين
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              إذا كنت خبيراً في مجالك وترغب في مشاركة معرفتك مع الآلاف من الطلاب، فنحن نرحب بك في منصتنا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="md" className="gap-2">
                أصبح مدرباً
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="md" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
