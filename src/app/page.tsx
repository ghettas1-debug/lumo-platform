"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/landing/Hero';
import Footer from '@/components/landing/Footer';
import Card from '@/components/ui/Card';
import StatsSection from '@/components/landing/StatsSection';
import CourseCard from '@/components/shared/CourseCard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Ø§Ù„ÙƒÙ„');

  const categories = ['Ø§Ù„ÙƒÙ„', 'Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', 'Ø§Ù„ØªØµÙ…ÙŠÙ…', 'Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª', 'Ø§Ù„Ø±ÙŠØ§Ø¯Ø©'];

  const courses = [
    { id: 1, category: 'Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', title: 'Ø§Ø­ØªØ±Ø§Ù Python 2026', instructor: 'Ø£Ø­Ù…Ø¯ Ù…Ø­Ù…ÙˆØ¯', rating: 4.9, students: 12500, image: 'bg-blue-500', price: 'Ù…Ø¬Ø§Ù†ÙŠ' },
    { id: 2, category: 'Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', title: 'Next.js Ø§Ù„Ù…ØªÙ‚Ø¯Ù…', instructor: 'Ø³Ø§Ø±Ø© Ø¹Ù„ÙŠ', rating: 4.8, students: 8900, image: 'bg-purple-500', price: 'Ù…Ø¬Ø§Ù†ÙŠ' },
    { id: 3, category: 'Ø§Ù„ØªØµÙ…ÙŠÙ…', title: 'ØªØµÙ…ÙŠÙ… UI/UX Ø§Ø­ØªØ±Ø§ÙÙŠ', instructor: 'Ù…Ø­Ù…Ø¯ Ø³Ø§Ù„Ù…', rating: 4.7, students: 7600, image: 'bg-pink-500', price: 'Ù…Ø¬Ø§Ù†ÙŠ' },
    { id: 4, category: 'Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', title: 'React Ù…Ù† Ø§Ù„ØµÙØ±', instructor: 'Ù„ÙŠÙ„Ù‰ Ø£Ø­Ù…Ø¯', rating: 4.9, students: 14200, image: 'bg-green-500', price: 'Ù…Ø¬Ø§Ù†ÙŠ' },
  ];

  // Ù…Ù†Ø·Ù‚ Ø§Ù„ØªØµÙÙŠØ© Ø§Ù„Ø°ÙƒÙŠ
  const filteredCourses = activeTab === 'Ø§Ù„ÙƒÙ„' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <main className="min-h-screen bg-white selection:bg-blue-100">
      <Hero />
      <StatsSection />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Ø§Ø³ØªÙƒØ´Ù Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ù…Ù…ÙŠØ²Ø©</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-bold">Ø£ÙØ¶Ù„ Ø¯ÙˆØ±Ø§Øª ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ù…ØµÙ…Ù…Ø© Ù…Ù† Ù‚Ø¨Ù„ Ø®Ø¨Ø±Ø§Ø¡ ÙÙŠ Ù…Ø¬Ø§Ù„Ù‡Ù…</p>
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
                    <h3 className="text-lg font-bold">ØªØ¬Ø±Ø¨Ø© Ø§Ù„ÙƒØ§Ø±Ø¯ Ø§Ù„Ø¬Ø¯ÙŠØ¯</h3>
                    <p className="text-gray-600">Ù‡Ø°Ø§ ÙƒØ§Ø±Ø¯ Ù…Ø®ØµØµ Ù…Ù† Ù†Ø¸Ø§Ù… Ø§Ù„ØªØµÙ…ÙŠÙ…</p>
                  </Card>
                ) : (
                  <CourseCard key={course.id} {...course} />
                )
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400 font-bold text-xl">Ù‚Ø±ÙŠØ¨Ø§Ù‹.. Ø¯ÙˆØ±Ø§Øª Ø¬Ø¯ÙŠØ¯Ø© ÙÙŠ Ù‡Ø°Ø§ Ø§Ù„Ù‚Ø³Ù…</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-center rounded-[3rem] mx-6 mb-12 shadow-2xl">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ù‡Ù„ Ø£Ù†Øª Ù…Ø³ØªØ¹Ø¯ Ù„Ø¨Ø¯Ø¡ Ø±Ø­Ù„ØªÙƒØŸ</h2>
          <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-xl cursor-pointer">
            Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù† Ù…Ø¬Ø§Ù†Ø§Ù‹ <ArrowRight size={24} />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
