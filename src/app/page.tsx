"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/landing/Hero';
import Footer from '@/components/landing/Footer';
import Card from '@/components/ui/Card';
import StatsSection from '@/components/landing/StatsSection';
import CourseCard from '@/components/shared/CourseCard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('الكل');

  const categories = ['الكل', 'البرمجة', 'التصميم', 'البيانات', 'الريادة'];

  const courses = [
    { id: 1, category: 'البرمجة', title: 'احتراف Python 2026', instructor: 'أحمد محمود', rating: 4.9, students: 12500, image: 'bg-blue-500', price: 'مجاني' },
    { id: 2, category: 'البرمجة', title: 'Next.js المتقدم', instructor: 'سارة علي', rating: 4.8, students: 8900, image: 'bg-purple-500', price: 'مجاني' },
    { id: 3, category: 'التصميم', title: 'تصميم UI/UX احترافي', instructor: 'محمد سالم', rating: 4.7, students: 7600, image: 'bg-pink-500', price: 'مجاني' },
    { id: 4, category: 'البرمجة', title: 'React من الصفر', instructor: 'ليلى أحمد', rating: 4.9, students: 14200, image: 'bg-green-500', price: 'مجاني' },
  ];

  // منطق التصفية الذكي
  const filteredCourses = activeTab === 'الكل' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <main className="min-h-screen bg-white selection:bg-blue-100">
      <Hero />
      <StatsSection />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">استكشف الدورات المميزة</h2>
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
                  <Card key={course.id} className="p-4">
                    <h3 className="text-lg font-bold">تجربة الكارد الجديد</h3>
                    <p className="text-gray-600">هذا كارد مخصص من نظام التصميم</p>
                  </Card>
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