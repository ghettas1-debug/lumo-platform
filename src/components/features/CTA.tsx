'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="py-20 bg-linear-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-8">
            <Star className="w-4 h-4" />
            انضم إلى مجتمعنا
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            هل أنت جاهز لبدء رحلتك التعليمية؟
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            انضم إلى آلاف المتعلمين الذين يطورون مهاراتهم ويحققون أهدافهم المهنية مع Lumo. 
            ابدأ اليوم واستفد من أفضل المحتوى التعليمي.
          </p>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-lg mb-4 italic">
              "Lumo غيرت طريقة تعلمي تماماً. الدورات عملية والمدربون محترفون. أنصح بها بشدة!"
            </p>
            <p className="text-sm text-gray-300">
              - أحمد محمد، مطور ويب
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                ابدأ مجاناً
                <ArrowRight className="mr-2" size={20} />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto">
                جولة تجريبية
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                لا حاجة لبطاقة ائتمانية
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                إلغاء الاشتراك في أي وقت
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                دعم 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
