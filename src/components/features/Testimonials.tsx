'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Play, ChevronLeft, ChevronRight, Heart, TrendingUp, Award, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { tokens } from '@/tokens/design-tokens';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'مطور ويب محترف',
      company: 'شركة التقنية المتقدمة',
      location: 'القاهرة، مصر',
      content: 'لقد غيرت لumo حياتي المهنية تماماً. بدأت كشخص مبتدئ والآن أعمل كمطور ويب محترف بفضل الدورات المجانية والشهادات المعتمدة. المحتوى عالي الجودة والمدربون متخصصون.',
      rating: 5,
      avatar: 'أم',
      course: 'تطوير الويب الكامل',
      achievement: 'حصل على وظيفة أحلامه',
      image: '/images/testimonials/ahmed.jpg',
      videoUrl: '/testimonials/ahmed-video.mp4',
      date: '2024',
      verified: true
    },
    {
      id: 2,
      name: 'فاطمة الزهراء',
      role: 'مديرة تسويق رقمي',
      company: 'وكالة الإبداع الرقمي',
      location: 'الدار البيضاء، المغرب',
      content: 'منصة رائعة جداً! تعلمت مهارات التسويق الرقمي وحصلت على وظيفة أحلامي في أقل من 6 أشهر. الدورات عملية والتطبيق مباشر على مشاريع حقيقية.',
      rating: 5,
      avatar: 'فز',
      course: 'التسويق الرقمي المتقدم',
      achievement: 'ترقية وظيفية بعد 3 أشهر',
      image: '/images/testimonials/fatima.jpg',
      videoUrl: '/testimonials/fatima-video.mp4',
      date: '2024',
      verified: true
    },
    {
      id: 3,
      name: 'خالد الهاشمي',
      role: 'رائد أعمال',
      company: 'شركة النجاح التقنية',
      location: 'دبي، الإمارات',
      content: 'الدورات في إدارة الأعمال ساعدتني على إطلاق شركتي الناشئة بنجاح. المحتوى عالي الجودة والمدربون محترفون جداً. أوصي بشدة لكل رائد أعمال.',
      rating: 5,
      avatar: 'خح',
      course: 'إدارة الأعمال للمبتدئين',
      achievement: 'أطلق شركة ناجحة',
      image: '/images/testimonials/khaled.jpg',
      videoUrl: '/testimonials/khaled-video.mp4',
      date: '2023',
      verified: true
    },
    {
      id: 4,
      name: 'نورا السعيد',
      role: 'مصممة جرافيك',
      company: 'استوديو التصميم المبدع',
      location: 'عمان، الأردن',
      content: 'أوصي بشدة بمنصة لumo لكل من يريد تطوير مهاراته. الدورات منظمة بشكل ممتاز والشهادات معترف بها في سوق العمل. تعلمت الكثير في وقت قياسي.',
      rating: 5,
      avatar: 'نس',
      course: 'التصميم الجرافيكي الاحترافي',
      achievement: 'زاد دخلها بنسبة 200%',
      image: '/images/testimonials/noura.jpg',
      videoUrl: '/testimonials/noura-video.mp4',
      date: '2024',
      verified: true
    },
    {
      id: 5,
      name: 'محمد العلي',
      role: 'محلل بيانات',
      company: 'شركة البيانات الذكية',
      location: 'الرياض، السعودية',
      content: 'دورات تحليل البيانات في لumo غيرت مسار حياتي المهني. من مهندس إلى محلل بيانات محترف في أقل من سنة. المحتوى شامل والتطبيق عملي.',
      rating: 5,
      avatar: 'مح',
      course: 'علم البيانات بايثون',
      achievement: 'غير مساره المهني بالكامل',
      image: '/images/testimonials/mohammed.jpg',
      videoUrl: '/testimonials/mohammed-video.mp4',
      date: '2023',
      verified: true
    },
    {
      id: 6,
      name: 'سارة أحمد',
      role: 'مطورة تطبيقات',
      company: 'شركة الموبايل التكنولوجية',
      location: 'الجزائر العاصمة',
      content: 'تعلمت تطوير تطبيقات الموبايل من الصفر وحصلت على وظيفة في شركة كبرى. الدورات تفاعلية والدعم الفني ممتاز. شكراً لفريق لumo.',
      rating: 5,
      avatar: 'سأ',
      course: 'تطوير تطبيقات iOS',
      achievement: 'حصلت على وظيفة في شهر',
      image: '/images/testimonials/sara.jpg',
      videoUrl: '/testimonials/sara-video.mp4',
      date: '2024',
      verified: true
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, isAutoPlaying]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>قصص نجاح حقيقية</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ماذا يقول 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              خريجونا
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            انضم إلى ملايين المتعلمين الذين غيروا حياتهم المهنية مع لumo وحققوا أحلامهم
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">50M+ خريج</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">193 دولة</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">4.9 تقييم</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div className="text-right md:order-1">
                    {/* Rating and Badge */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current ml-1" />
                        ))}
                      </div>
                      {testimonials[activeIndex].verified && (
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          <Award className="w-3 h-3" />
                          <span>موثق</span>
                        </div>
                      )}
                    </div>

                    {/* Quote */}
                    <div className="relative mb-8">
                      <Quote className="absolute -top-4 -right-4 w-12 h-12 text-blue-200" />
                      <p className="text-xl text-gray-700 leading-relaxed relative z-10">
                        {testimonials[activeIndex].content}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-lg text-gray-600 mb-2">
                        {testimonials[activeIndex].role}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonials[activeIndex].company} • {testimonials[activeIndex].location}
                      </p>
                    </div>

                    {/* Achievement */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {testimonials[activeIndex].achievement}
                          </p>
                          <p className="text-xs text-gray-600">
                            دورة: {testimonials[activeIndex].course}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-gray-500">
                      خريج {testimonials[activeIndex].date}
                    </p>
                  </div>

                  {/* Image/Video */}
                  <div className="relative md:order-2">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="w-full h-80 object-cover"
                      />
                      
                      {/* Video Play Button */}
                      <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-gray-900 ml-1" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 -translate-y-1/2 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all hover:scale-110 z-20"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 rotate-180" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 -translate-y-1/2 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all hover:scale-110 z-20"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
                isAutoPlaying ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  isAutoPlaying ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
              <span>{isAutoPlaying ? 'إيقاف التشغيل التلقائي' : 'تشغيل تلقائي'}</span>
            </button>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  انضم إلى 50+ مليون متعلم حول العالم
                </h3>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  تمكين نفسك بالمعرفة وابدأ رحلتك التعليمية اليوم مع منصة التعلم الرائدة في العالم
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    50M+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">متعلم</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    15M+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">خريج</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600 mb-2">
                    193
                  </div>
                  <div className="text-sm text-gray-600 font-medium">دولة</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">
                    6000+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">دورة</div>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  ابدأ رحلتك اليوم
                  <ChevronLeft className="mr-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
