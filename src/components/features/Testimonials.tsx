'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مطور ويب',
      location: 'القاهرة، مصر',
      content: 'لقد غيرت لumo حياتي المهنية تماماً. بدأت كشخص مبتدئ والآن أعمل كمطور ويب محترف بفضل الدورات المجانية والشهادات المعتمدة.',
      rating: 5,
      avatar: 'أم'
    },
    {
      name: 'فاطمة الزهراء',
      role: 'مديرة تسويق',
      location: 'الدار البيضاء، المغرب',
      content: 'منصة رائعة جداً! تعلمت مهارات التسويق الرقمي وحصلت على وظيفة أحلامي في أقل من 6 أشهر. شكراً لفريق لumo.',
      rating: 5,
      avatar: 'فز'
    },
    {
      name: 'خالد الهاشمي',
      role: 'رائد أعمال',
      location: 'دبي، الإمارات',
      content: 'الدورات في إدارة الأعمال ساعدتني على إطلاق شركتي الناشئة بنجاح. المحتوى عالي الجودة والمدربون محترفون جداً.',
      rating: 5,
      avatar: 'خح'
    },
    {
      name: 'نورا السعيد',
      role: 'مصممة جرافيك',
      location: 'عمان، الأردن',
      content: 'أوصي بشدة بمنصة لumo لكل من يريد تطوير مهاراته. الدورات منظمة بشكل ممتاز والشهادات معترف بها في سوق العمل.',
      rating: 5,
      avatar: 'نس'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ماذا يقول <span className="text-blue-600">خريجونا</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            انضم إلى ملايين المتعلمين الذين غيروا حياتهم المهنية مع لumo
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 animate-fade-in border-2 border-blue-300 hover:border-blue-400 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -right-2 w-8 h-8 text-blue-400 drop-shadow-lg" />
                <p className="text-gray-700 leading-relaxed relative z-10">
                  {testimonial.content}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white text-center border-4 border-blue-400 shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">
            انضم إلى 50+ مليون متعلم حول العالم
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            تمكين نفسك بالمعرفة وابدأ رحلتك التعليمية اليوم مع منصة التعلم المجانية الرائدة في العالم
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">50M+</div>
              <div className="text-blue-100">متعلم</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15M+</div>
              <div className="text-blue-100">خريج</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">193</div>
              <div className="text-blue-100">دولة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">6000+</div>
              <div className="text-blue-100">دورة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
