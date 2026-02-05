'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen as CourseIcon, Play, Star, Users, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { PageErrorBoundary } from '@/components/error/PageErrorBoundary';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  price: number;
  originalPrice: number;
  image: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export default function PagePage() {
  const courses: Course[] = [
    {
      id: 1,
      title: 'Page للمبتدئين',
      description: 'تعلم Page من الصفر إلى الاحتراف',
      instructor: 'أحمد محمد',
      rating: 4.9,
      students: 45670,
      duration: '40 ساعة',
      level: 'مبتدئ',
      price: 0,
      originalPrice: 149.99,
      image: '/images/courses/page.jpg',
      tags: ['Page', 'Beginner', 'Course', 'Learning'],
      isNew: true,
      isBestseller: true
    },
    {
      id: 2,
      title: 'Page المتقدم',
      description: 'تعلم Page على مستوى متقدم',
      instructor: 'فاطمة علي',
      rating: 4.8,
      students: 34560,
      duration: '50 ساعة',
      level: 'متقدم',
      price: 0,
      originalPrice: 199.99,
      image: '/images/courses/page-advanced.jpg',
      tags: ['Page', 'Advanced', 'Expert', 'Professional']
    },
    {
      id: 3,
      title: 'Page العملي',
      description: 'مشاريع عملية في Page',
      instructor: 'محمد سالم',
      rating: 4.7,
      students: 23450,
      duration: '45 ساعة',
      level: 'متوسط',
      price: 0,
      originalPrice: 179.99,
      image: '/images/courses/page-practical.jpg',
      tags: ['Page', 'Practical', 'Projects', 'Hands-on']
    },
    {
      id: 4,
      title: 'Page الاحترافي',
      description: 'احترف Page مع أفضل المدربين',
      instructor: 'سارة خالد',
      rating: 4.6,
      students: 12340,
      duration: '60 ساعة',
      level: 'متقدم',
      price: 0,
      originalPrice: 249.99,
      image: '/images/courses/page-professional.jpg',
      tags: ['Page', 'Professional', 'Expert', 'Career'],
      isBestseller: true
    }
  ];

  const features = ["🎯 تطوير الذات","🎯 مهارات شخصية","🏆 شهادة معتمدة","👥 مجتمع متطورين","💬 دعم فني متخصص","🔄 تحديثات دورية"];

  return (
    <PageErrorBoundary pageName="Page" pagePath="/courses/personal-development">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <div className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Page
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                أتقن Page وابنِ مستقبلك المهني
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

        {/* Courses Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                دورات Page المميزة
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                اختر من بين مجموعة واسعة من الدورات التي تغطي جميع جوانب Page
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/courses/${course.id}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      {/* Course Image */}
                      <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <CourseIcon className="w-16 h-16 text-white" />
                        </div>
                        {course.isNew && (
                          <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                            جديد
                          </span>
                        )}
                        {course.isBestseller && (
                          <span className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                            الأكثر مبيعاً
                          </span>
                        )}
                      </div>

                      {/* Course Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Instructor */}
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-700">{course.instructor}</span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Price and Level */}
                        <div className="flex items-center justify-between">
                          <div>
                            {course.price === 0 ? (
                              <span className="text-green-600 font-bold">مجاني</span>
                            ) : (
                              <div>
                                <span className="text-gray-400 line-through text-sm">
                                  ${course.originalPrice}
                                </span>
                                <span className="text-blue-600 font-bold ml-2">
                                  ${course.price}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                            {course.level}
                          </span>
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
        <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                مستعد لتعلم Page؟
              </h2>
              <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
                انضم إلى آلاف الطلاب الذين أصبحوا محترفين في Page
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                استكشف جميع الدورات
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageErrorBoundary>
  );
}
