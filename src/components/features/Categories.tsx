'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Heart, Languages, Briefcase, Users, TrendingUp, ArrowLeft } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      name: 'تكنولوجيا المعلومات',
      icon: BookOpen,
      count: '1292',
      color: 'blue',
      href: '/courses/it',
      description: 'البرمجة، تطوير الويب، الشبكات، الأمن السيبراني'
    },
    {
      name: 'الصحة',
      icon: Heart,
      count: '1102',
      color: 'red',
      href: '/courses/health',
      description: 'الطب، التمريض، الصحة النفسية، اللياقة البدنية'
    },
    {
      name: 'اللغات',
      icon: Languages,
      count: '316',
      color: 'green',
      href: '/courses/language',
      description: 'الإنجليزية، الفرنسية، الإسبانية، العربية'
    },
    {
      name: 'الأعمال',
      icon: Briefcase,
      count: '1777',
      color: 'purple',
      href: '/courses/business',
      description: 'ريادة الأعمال، التسويق، المالية، المحاسبة'
    },
    {
      name: 'الإدارة',
      icon: Users,
      count: '1098',
      color: 'indigo',
      href: '/courses/management',
      description: 'إدارة المشاريع، الموارد البشرية، القيادة'
    },
    {
      name: 'التطوير الشخصي',
      icon: TrendingUp,
      count: '1350',
      color: 'yellow',
      href: '/courses/personal-development',
      description: 'مهارات التواصل، إدارة الوقت، الثقة بالنفس'
    }
  ];

  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200',
    red: 'bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border-2 border-red-200',
    green: 'bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-200',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-2 border-purple-200',
    indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 border-2 border-indigo-200',
    yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 border-2 border-yellow-200'
  };

  const iconColorClasses = {
    blue: 'text-blue-500 bg-blue-100',
    red: 'text-red-500 bg-red-100',
    green: 'text-green-500 bg-green-100',
    purple: 'text-purple-500 bg-purple-100',
    indigo: 'text-indigo-500 bg-indigo-100',
    yellow: 'text-yellow-500 bg-yellow-100'
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-4000"></div>
        
        {/* Moving Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-green-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-32 left-16 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-16 w-2 h-2 bg-green-500/30 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-20 right-32 w-3 h-3 bg-blue-500/30 rounded-full animate-bounce delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            استكشف <span className="text-blue-600">6000+ دورة مجانية</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تعلم من خبراء عالميين في مختلف المجالات واكتشف شغفك الحقيقي
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${colorClasses[category.color as keyof typeof colorClasses]} hover:shadow-lg hover:-translate-y-1 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${iconColorClasses[category.color as keyof typeof iconColorClasses]} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-500">
                    {category.count} دورة
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                  استكشف الدورات
                  <ArrowLeft className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
          >
            عرض جميع الفئات
            <ArrowLeft className="mr-2 w-5 h-5" />
          </Link>
        </div>
      </div>
      
      {/* Bottom Wave with Animation */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-gray-50 animate-pulse" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <path fill="currentColor" d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-white/80"></div>
      </div>
    </section>
  );
}
