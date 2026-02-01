'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Target, Briefcase, TrendingUp, Clock, Award } from 'lucide-react';

export default function LearningPaths() {
  const paths = [
    {
      title: 'أريد التقديم على وظيفة',
      description: 'ابحث عن وظائف تناسب مهاراتك وابدأ مسيرتك المهنية',
      icon: Target,
      color: 'blue',
      href: '/recruitment',
      features: ['مطابقة الوظائف', 'نصائح السيرة الذاتية', 'تحضير المقابلات']
    },
    {
      title: 'أريد العثور على مهنة جديدة',
      description: 'اكتشف مسارات مهنية جديدة وطور المهارات المطلوبة',
      icon: Briefcase,
      color: 'green',
      href: '/career-ready-plan',
      features: ['تقييم المهارات', 'خطط مسار مهني', 'دورات مخصصة']
    },
    {
      title: 'أريد تطوير مهاراتي في مسيرتي الحالية',
      description: 'تقدم في مسيرتك الحالية من خلال تعلم مهارات جديدة',
      icon: TrendingUp,
      color: 'purple',
      href: '/career-ready-plan',
      features: ['تطوير المهارات', 'شهادات متقدمة', 'نمو مهني']
    }
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600'
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            غير متأكد من أين تبدأ؟
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            أجب عن بعض الأسئلة القصيرة وسنقدم لك خطة مهنية جاهزة!
          </p>
        </div>

        {/* Learning Paths */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <div
                key={path.title}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className={`p-6 ${colorClasses[path.color]} text-white`}>
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                  <p className="text-white text-opacity-90">{path.description}</p>
                </div>

                {/* Features */}
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {path.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={path.href}
                    className={`inline-flex items-center justify-center w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${colorClasses[path.color]} text-white hover:opacity-90 group-hover:scale-105`}
                  >
                    ابدأ الآن
                    <ArrowRight className="mr-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                تمكين نفسك مجاناً
              </h3>
              <p className="text-gray-600 mb-6">
                مع لumo، يمكنك الوصول إلى آلاف الدورات المجانية واكتساب المهارات التي تحتاجها للنجاح في مسيرتك المهنية. تعلم بالسرعة التي تناسبك واحصل على شهادات معترف بها.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">تعلم بمرونة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">شهادات معتمدة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">أهداف مهنية</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">ابدأ رحلتك اليوم</h4>
                  <p className="text-gray-600">انضم إلى ملايين المتعلمين حول العالم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
