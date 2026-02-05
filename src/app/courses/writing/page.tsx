'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen as CourseIcon, Play, Star, Users, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { PageErrorBoundary } from '@/components/error/PageErrorBoundary';

export default function WritingPage() {
  const categories = [
    {
      title: 'الكتابة الإبداعية',
      href: '/courses/writing/creative-writing',
      description: 'تعلم فن الكتابة الإبداعية وتطوير المهارات',
      courses: 4,
      icon: '✍️'
    },
    {
      title: 'كتابة المحتوى',
      href: '/courses/writing/content-writing',
      description: 'تعلم كتابة المحتوى والتسويق الرقمي',
      courses: 4,
      icon: '📝'
    },
    {
      title: 'الكتابة التقنية',
      href: '/courses/writing/technical-writing',
      description: 'تعلم الكتابة التقنية والتوثيق التقني',
      courses: 4,
      icon: '📚'
    },
    {
      title: 'الكتابة الإعلانية',
      href: '/courses/writing/copywriting',
      description: 'تعلم الكتابة الإعلانية والتسويق والمبيعات',
      courses: 4,
      icon: '📢'
    },
    {
      title: 'الصحافة',
      href: '/courses/writing/journalism',
      description: 'تعلم الصحافة والصحافة الاستقصائية',
      courses: 4,
      icon: '📰'
    }
  ];

  const features = [
    '✍️ الكتابة الشاملة',
    '🎯 مهارات كتابية متقدمة',
    '🏆 شهادات معتمدة',
    '👥 مجتمع كتاب نشط',
    '💬 دعم فني متخصص',
    '🔄 تحديثات دورية'
  ];

  return (
    <PageErrorBoundary pageName="Writing" pagePath="/courses/writing">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                الكتابة
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                أتقن فن الكتابة وابنِ مسيرة احترافية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  ابدأ التعلم الآن
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Play className="w-5 h-5 mr-2" />
                  شاهد الدرس التجريبي
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-700">{feature}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                فئات الكتابة
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                اختر من بين فئات الكتابة المختلفة وابنِ مهاراتك
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={category.href}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      {/* Category Header */}
                      <div className="h-32 bg-gradient-to-r from-blue-400 to-cyan-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <span className="text-4xl">{category.icon}</span>
                        </div>
                      </div>

                      {/* Category Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {category.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {category.courses} دورة
                          </div>
                          <div className="text-sm text-blue-600 font-medium">
                            استكشف
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                مستعد لبدء مسيرة كتابية؟
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                انضم إلى آلاف الطلاب الذين أصبحوا كتاباً محترفين
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                استكشف جميع الفئات
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageErrorBoundary>
  );
}
