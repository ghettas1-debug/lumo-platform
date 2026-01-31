'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Star className="w-4 h-4" />
              منصة تعليمية عالمية
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              أنر طريقك
              <span className="text-blue-600 block">بالمعرفة</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              انضم إلى أكثر من 50,000 طالب واكتشف مهارات جديدة مع أفضل المدربين في العالم. 
              تعلم بالطريقة التي تناسبك وفي الوقت الذي يناسبك.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  ابدأ التعلم مجاناً
                  <ArrowRight className="mr-2" size={20} />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Play className="mr-2" size={20} />
                  استكشف الدورات
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">طالب</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-600">دورة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600">تقييم</div>
              </div>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="aspect-video bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">ابدأ رحلتك التعليمية</h3>
                    <p className="text-blue-100">اكتشف آلاف الدورات التفاعلية</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-2xl p-4 shadow-lg transform rotate-12">
              <BookOpen className="w-8 h-8 text-yellow-900" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-2xl p-4 shadow-lg transform -rotate-12">
              <Users className="w-8 h-8 text-green-900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
