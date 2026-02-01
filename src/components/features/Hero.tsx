'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star, Users, BookOpen, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-fade-in">
              <Star className="w-4 h-4 fill-current" />
              منصة التعلم المجانية الرائدة في العالم
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight animate-slide-up">
              دورات مجانية مع
              <span className="text-blue-600 block">شهادات ودبلومات</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
              تعلم من خبراء عالميين واستكشف أكثر من 6000 دورة مجانية. 
              انضم إلى 50 مليون متعلم وتمكين لمستقبلك المهني.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                  ابدأ التعلم مجاناً
                  <ArrowRight className="mr-2" size={20} />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Play className="mr-2" size={20} />
                  استكشف الدورات
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mb-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-5 h-5 text-blue-600" />
                <span>50+ مليون متعلم</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-5 h-5 text-blue-600" />
                <span>15+ مليون خريج</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>193 دولة</span>
              </div>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative animate-scale-in">
            <div className="relative z-10">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <div className="relative text-center text-white">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">تمكين نفسك مجاناً</h3>
                    <p className="text-blue-100 text-lg">ابدأ رحلتك التعليمية اليوم</p>
                  </div>
                </div>
                
                {/* Course Preview */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">تطوير الويب</h4>
                        <p className="text-xs text-gray-500">12 دورة</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">مجاني</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">إدارة الأعمال</h4>
                        <p className="text-xs text-gray-500">8 دورات</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">مجاني</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-2xl p-4 shadow-lg transform rotate-12 animate-float">
              <BookOpen className="w-8 h-8 text-yellow-900" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-2xl p-4 shadow-lg transform -rotate-12 animate-float" style={{animationDelay: '1s'}}>
              <Award className="w-8 h-8 text-green-900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
