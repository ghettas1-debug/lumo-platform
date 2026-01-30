"use client";

import React, { useState } from 'react';
import { ArrowRight, Play, Brain, Bell, MessageSquare, TrendingUp, BarChart3, Award, Search, Target, Users, Settings, Sparkles, Smartphone, BookOpen, PlayCircle, Lock, Globe, Zap } from 'lucide-react';
import Hero from '@/components/landing/Hero';
import Footer from '@/components/landing/Footer';
import { Card } from '@/components/ui/Card';
import StatsSection from '@/components/landing/StatsSection';
import CourseCard from '@/components/shared/CourseCard';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('الكل');

  const categories = ['الكل', 'البرمجة', 'التصميم', 'البيانات', 'الريادة'];

  const courses = [
    { id: 1, category: 'البرمجة', title: 'احتراف Python 2026', instructor: 'أحمد محمود', rating: 4.9, students: 12500, image: 'bg-blue-500', price: 'مجاني' },
    { id: 2, category: 'البرمجة', title: 'Next.js المتقدم', instructor: 'سارة علي', rating: 4.8, students: 8900, image: 'bg-purple-500', price: 'مجاني' },
    { id: 3, category: 'التصميم', title: 'تصميم UI/UX احترافي', instructor: 'محمد سالم', rating: 4.7, students: 7600, image: 'bg-pink-500', price: 'مجاني' },
    { id: 4, category: 'البرمجة', title: 'React من الصفر', instructor: 'ليلى أحمد', rating: 4.9, students: 14200, image: 'bg-green-500', price: 'مجاني' },
  ];

  const features = [
    {
      icon: Play,
      title: 'قائمة التشغيل',
      description: 'أنشئ وحفظ فيديوهاتك المفضلة في قوائم تشغيل مخصصة',
      href: '/playlist',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Brain,
      title: 'التحكم الصوتي',
      description: 'نظام تحكم صوتي متقدم مع أوامر عربية ودعم كامل للوصول',
      href: '/voice-navigation',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Bell,
      title: 'التحليلات المتقدمة',
      description: 'نظام تحليلات شامل مع خرائط حرارية وإحصائيات تفاعلية',
      href: '/analytics',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: MessageSquare,
      title: 'التعاون الجماعي',
      description: 'غرف دراسية تفاعلية مع مكالمات فيديو ودردشة جماعية',
      href: '/collaboration',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'المختبرات الافتراضية',
      description: 'تجارب علمية تفاعلية مع محاكاة افتراضية وأدوات متقدمة',
      href: '/labs',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: BarChart3,
      title: 'دعم PWA',
      description: 'دعم كامل لعدم الاتصال مع تثبيت التطبيق ومزامنة تلقائية',
      href: '/pwa',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Award,
      title: 'تتبع التقدم',
      description: 'نظام شامل لمتابعة التقدم مع إحصائيات مفصلة وشهادات',
      href: '/progress',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      icon: Search,
      title: 'غرف الدراسة',
      description: 'إنشاء والانضمام لغرف دراسية مع إدارة المشاركين',
      href: '/study-rooms',
      color: 'from-gray-600 to-gray-800'
    }
  ];

  const platformFeatures = [
    {
      icon: BookOpen,
      title: 'مشغل الفيديو',
      description: 'مشغل فيديو متقدم مع ملاحظات وإشارات مرجعية وتحكم في السرعة',
      href: '/course-player',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Target,
      title: 'الاختبارات التفاعلية',
      description: 'اختبارات متقدمة بأنواع متعددة من الأسئلة وتغذية راجعة فورية',
      href: '/quiz',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'ملعب الأكواد',
      description: 'بيئة برمجة تفاعلية مع محرر أكواد وتنفيذ مباشر',
      href: '/demo',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: PlayCircle,
      title: 'التوصيات الذكية',
      description: 'نظام ذكي يعتمد على AI لتقديم توصيات محتوى مخصصة',
      href: '/analytics',
      color: 'from-slate-600 to-gray-800'
    },
    {
      icon: Award,
      title: 'نظام الألعاب',
      description: 'نقاط وشارات ومستويات وسلسلة انتصارات لتحفيز التعلم',
      href: '/leaderboard',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      icon: Settings,
      title: 'لوحة التحكم',
      description: 'لوحة تحكم شخصية تتكيف مع سلوك المستخدم وتفضيلاته',
      href: '/dashboard',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Smartphone,
      title: 'تجربة الجوال',
      description: 'واجهة مهيأة بالكامل للجوال مع إيماءات اللمس',
      href: '/mobile-experience',
      color: 'from-sky-500 to-blue-600'
    },
    {
      icon: Sparkles,
      title: 'ميزات AI',
      description: 'مساعد ذكاء اصطناعي وتوصيات محتوى وتحليلات متقدمة',
      href: '/adaptive-learning',
      color: 'from-fuchsia-500 to-purple-600'
    },
    {
      icon: Brain,
      title: 'الدعم الفني',
      description: 'دعم فني متقدم مع مركز مساعدة وتذاكر دعم',
      href: '/help',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Lock,
      title: 'الأمان والخصوصية',
      description: 'إعدادات أمان متقدمة وحماية بيانات المستخدمين',
      href: '/settings',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Globe,
      title: 'التدويل',
      description: 'دعم 10 لغات مع RTL/LTR واكتشاف تلقائي للغة',
      href: '/settings',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'تحسين الأداء',
      description: 'تحسينات متقدمة للأداء مع تقسيم الكود والتخزين المؤقت',
      href: '/pwa',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  // منطق التصفية الذكية
  const filteredCourses = activeTab === 'الكل' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <main className="min-h-screen bg-white selection:bg-blue-100">
      <Hero />
      <StatsSection />

      {/* قسم الميزات الرئيسية */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">ميزات Lumo التعليمية</h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto font-bold">اكتشف جميع الأدوات والميزات المتقدمة التي تجعل من Lumo المنصة التعليمية الأفضل</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link 
                  key={index}
                  href={feature.href}
                  className="group block"
                >
                  <Card className="p-6 h-full hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105 cursor-pointer bg-white">
                    <div className={`w-16 h-16 bg-linear-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                      <span>استكشف الآن</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* قسم ميزات المنصة العالمية */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">ميزات المنصة العالمية</h2>
              <p className="text-gray-500 text-lg max-w-3xl font-bold">واجهات احترافية وتجارب تعلم متقدمة مثل المنصات العالمية.</p>
            </div>
            <Link
              href="/platform-guide"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-900 text-white font-bold hover:scale-105 transition-all"
            >
              دليل المنصة <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  href={feature.href}
                  className="group block"
                >
                  <Card className="p-6 h-full hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105 cursor-pointer bg-white">
                    <div className={`w-16 h-16 bg-linear-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                      <span>افتح الميزة</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">اكتشف الدورات المميزة</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-bold">أفضل دورات تعليمية مصممة من قبل خبراء في مجالهم</p>
          </div>

          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-3 rounded-full font-bold transition-all cursor-pointer ${
                  activeTab === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                index === 0 ? (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="text-lg font-bold">تجربة الكارد الجديد</h3>
                      <p className="text-gray-600">هذا كارد مخصص من نظام التصميم</p>
                    </Card>
                  </Link>
                ) : (
                  <CourseCard key={course.id} {...course} />
                )
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400 font-bold text-xl">قريباً.. دورات جديدة في هذا القسم</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-center rounded-[3rem] mx-6 mb-12 shadow-2xl">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-6">هل أنت مستعد لبدء رحلتك؟</h2>
          <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-xl cursor-pointer">
            ابدأ الآن مجاناً <ArrowRight size={24} />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
