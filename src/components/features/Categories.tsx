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
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    red: 'bg-red-50 hover:bg-red-100 border-red-200',
    green: 'bg-green-50 hover:bg-green-100 border-green-200',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    indigo: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
    yellow: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    indigo: 'text-indigo-600',
    yellow: 'text-yellow-600'
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
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
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${colorClasses[category.color]} hover:shadow-lg hover:-translate-y-1 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm`}>
                    <Icon className={`w-7 h-7 ${iconColorClasses[category.color]}`} />
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
    </section>
  );
}
