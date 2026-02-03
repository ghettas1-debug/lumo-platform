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
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
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
                className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in border-2 border-blue-300 hover:border-blue-400 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className={`p-6 ${colorClasses[path.color]} text-white relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-white/10 opacity-20"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border-2 border-white/30 shadow-lg">
                      <Icon className="w-7 h-7 text-white drop-shadow-sm" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-sm">{path.title}</h3>
                    <p className="text-white/95 text-sm drop-shadow-sm">{path.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                  <ul className="space-y-3 mb-6">
                    {path.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700 group">
                        <div className={`w-3 h-3 rounded-full mr-3 transition-all duration-300 group-hover:scale-110 ${
                          path.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-200' : 
                          path.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-200' : 
                          'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-200'
                        } shadow-sm`}></div>
                        <span className="font-medium group-hover:text-gray-900 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={path.href}
                    className={`inline-flex items-center justify-center w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${colorClasses[path.color]} text-white hover:opacity-90 group-hover:scale-105 border-2 border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl relative overflow-hidden`}
                  >
                    {/* Button Background Pattern */}
                    <div className="absolute inset-0 bg-white/10 opacity-20"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-8 -mt-8"></div>
                    
                    <span className="relative z-10 flex items-center">
                      ابدأ الآن
                      <ArrowRight className="mr-2 w-5 h-5" />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg border-2 border-blue-300 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-white/10 opacity-20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative">
                  <span className="relative z-10">تمكين نفسك مجاناً</span>
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  مع لumo، يمكنك الوصول إلى آلاف الدورات المجانية واكتساب المهارات التي تحتاجها للنجاح في مسيرتك المهنية. تعلم بالسرعة التي تناسبك واحصل على شهادات معترف بها.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">تعلم بمرونة</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">شهادات معتمدة</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">أهداف مهنية</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center border-2 border-blue-300 shadow-lg relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-white/20 opacity-30"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                  
                  <div className="text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg relative">
                      {/* Icon Background Pattern */}
                      <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                      <Award className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 relative z-10">ابدأ رحلتك اليوم</h4>
                    <p className="text-gray-600 relative z-10">انضم إلى ملايين المتعلمين حول العالم</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
