'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star, Users, BookOpen, Award, Globe, Sparkles, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { icon: Users, value: '50M+', label: 'متعلم حول العالم' },
    { icon: BookOpen, value: '6K+', label: 'دورة تدريبية' },
    { icon: Award, value: '15M+', label: 'خريج معتمد' },
    { icon: Globe, value: '193', label: 'دولة' },
  ];

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: 'أهداف تعليمية واضحة',
      description: 'مناهج مصممة لتحقيق أهدافك المهنية'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'تقدم مستمر',
      description: 'تتبع تقدمك وتحسين مهاراتك بشكل مستمر'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'محتوى تفاعلي',
      description: 'تجارب تعليمية غامرة ومشاريع عملية'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              منصة التعلم المجانية الرائدة في العالم
              <Badge variant="new" size="sm" className="mr-2">جديد</Badge>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight animate-slide-up">
              دورات مجانية مع
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                شهادات ودبلومات
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up animate-delay-100">
              تعلم من خبراء عالميين واستكشف أكثر من 6000 دورة مجانية. 
              انضم إلى 50 مليون متعلم وتمكين لمستقبلك المهني.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up animate-delay-200">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  ابدأ التعلم مجاناً
                  <ArrowRight className="mr-2" size={20} />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300">
                  <Play className="mr-2" size={20} />
                  استكشف الدورات
                </Button>
              </Link>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-slide-up animate-delay-300">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 animate-slide-up animate-delay-400">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">{stat.value}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative animate-scale-in">
            {/* Main Card */}
            <div className="relative z-10">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 backdrop-blur-sm bg-white/90">
                {/* Video Section */}
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  
                  {/* Animated Background */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500"></div>
                  </div>
                  
                  <div className="relative text-center text-white z-10">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                      <Play className="w-10 h-10 ml-1" />
                    </button>
                    <h3 className="text-2xl font-bold mb-2">تمكين نفسك مجاناً</h3>
                    <p className="text-blue-100 text-lg">ابدأ رحلتك التعليمية اليوم</p>
                  </div>
                </div>
                
                {/* Course Previews */}
                <div className="mt-6 space-y-3">
                  {[
                    { title: 'تطوير الويب الكامل', courses: 12, icon: BookOpen, color: 'blue', progress: 75 },
                    { title: 'إدارة الأعمال', courses: 8, icon: Award, color: 'purple', progress: 60 },
                    { title: 'الذكاء الاصطناعي', courses: 15, icon: TrendingUp, color: 'green', progress: 45 }
                  ].map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                          <course.icon className={`w-5 h-5 text-${course.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{course.title}</h4>
                          <p className="text-xs text-gray-500">{course.courses} دورة</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-${course.color}-500 h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">مجاني</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="mt-6 text-center">
                  <Link href="/courses">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      استكشف جميع الدورات
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-lg transform rotate-12 animate-float">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-4 shadow-lg transform -rotate-12 animate-float animate-delay-1000">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-1/2 -right-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-3 shadow-lg transform rotate-45 animate-float animate-delay-500">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
