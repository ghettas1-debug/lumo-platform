'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Quote, 
  Star, 
  TrendingUp, 
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase,
  ArrowRight,
  Sparkles,
  Heart,
  Video,
  Clock,
  DollarSign,
  Building
} from 'lucide-react';
import { Badge } from '@/components/ui/atoms/Badge';
import { Button } from '@/components/ui/Button';

interface SuccessStory {
  id: number;
  name: string;
  beforeTitle: string;
  afterTitle: string;
  beforeSalary: string;
  afterSalary: string;
  location: string;
  image: string;
  video: string;
  story: string;
  courses: string[];
  duration: string;
  achievement: string;
  rating: number;
  featured: boolean;
  company?: string;
  industry?: string;
}

export default function ProfessionalSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const successStories: SuccessStory[] = [
    {
      id: 1,
      name: 'محمد أحمد',
      beforeTitle: 'طالب جامعي',
      afterTitle: 'مطور Full Stack في شركة كبرى',
      beforeSalary: '0$',
      afterSalary: '85,000$',
      location: 'الرياض، السعودية',
      image: '/images/stories/mohammed.jpg',
      video: '/videos/stories/mohammed.mp4',
      story: 'بدأت رحلتي مع Lumo Platform وأنا طالب جامعي لا أعرف شيئاً عن البرمجة. بعد 6 أشهر من التعلم المكثف، حصلت على أول وظيفة كمطور.',
      courses: ['React المتقدم', 'Node.js من الصفر', 'قواعد البيانات'],
      duration: '6 أشهر',
      achievement: 'توظيف مباشر',
      rating: 5,
      featured: true,
      company: 'شركة تقنية كبرى',
      industry: 'تطوير البرمجيات'
    },
    {
      id: 2,
      name: 'سارة محمد',
      beforeTitle: 'ربة منزل',
      afterTitle: 'مصممة UI/UX مستقلة',
      beforeSalary: '0$',
      afterSalary: '45,000$',
      location: 'دبي، الإمارات',
      image: '/images/stories/sara.jpg',
      video: '/videos/stories/sara.mp4',
      story: 'كنت أبحث عن طريقة لاستغلال وقتي بشكل مفيد. اكتشفت شغفي بالتصميم من خلال دورات Lumo والآن أعمل كمستقلة.',
      courses: ['أساسيات التصميم', 'Figma احترافي', 'تصميم التطبيقات'],
      duration: '4 أشهر',
      achievement: 'مشروع خاص ناجح',
      rating: 5,
      featured: true,
      company: 'مستقلة',
      industry: 'التصميم'
    },
    {
      id: 3,
      name: 'أحمد علي',
      beforeTitle: 'موظف خدمة عملاء',
      afterTitle: 'خبير تسويق رقمي',
      beforeSalary: '18,000$',
      afterSalary: '65,000$',
      location: 'القاهرة، مصر',
      image: '/images/stories/ahmed.jpg',
      video: '/videos/stories/ahmed.mp4',
      story: 'كنت أبحث عن تغيير مساري المهني. دورات التسويق الرقمي في Lumo غيرت حياتي تماماً وانتقلت لمجال أحبه.',
      courses: ['التسويق الرقمي', 'SEO احترافي', 'إعلانات جوجل'],
      duration: '3 أشهر',
      achievement: 'ترقية وظيفية',
      rating: 5,
      featured: false,
      company: 'وكالة تسويق',
      industry: 'التسويق الرقمي'
    },
    {
      id: 4,
      name: 'فاطمة خالد',
      beforeTitle: 'خريجة جديدة',
      afterTitle: 'محللة بيانات',
      beforeSalary: '0$',
      afterSalary: '55,000$',
      location: 'عمان، الأردن',
      image: '/images/stories/fatima.jpg',
      video: '/videos/stories/fatima.mp4',
      story: 'بعد التخرج مباشرة، بدأت بتعلم تحليل البيانات من خلال Lumo. بعد 5 أشهر حصلت على وظيفة أحلامي.',
      courses: ['Python للتحليل', 'SQL متقدم', 'Power BI'],
      duration: '5 أشهر',
      achievement: 'أول وظيفة',
      rating: 5,
      featured: false,
      company: 'شركة استشارات',
      industry: 'تحليل البيانات'
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const story = successStories[currentStory];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-3" />
      </div>

      {/* Floating Element */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-32 right-16 w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center border border-white/20"
      >
        <Award className="w-8 h-8 text-amber-600" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-emerald-200/50 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>قصص نجاح حقيقية</span>
            <Heart className="w-5 h-5" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
          >
            نجاحات طلابنا الملهمة
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 mt-2">
              تعرف على كيف غيرت منصة Lumo حياة الآلاف
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            قصص واقعية لطلاب تحولت حياتهم المهنية من خلال التعلم المميز والدعم المستمر
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/30 shadow-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-1">50,000+</div>
              <div className="text-sm text-gray-600">قصة نجاح</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/30 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">معدل التوظيف</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/30 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-1">180%</div>
              <div className="text-sm text-gray-600">متوسط زيادة الراتب</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Story Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20"
        >
          {/* Video/Image Section */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="aspect-video bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 rounded-3xl overflow-hidden border-2 border-emerald-200/50 shadow-2xl">
              <AnimatePresence mode="wait">
                {playingVideo === story.id ? (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full bg-black flex items-center justify-center"
                  >
                    <div className="text-white text-center">
                      <Video className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">فيديو قصة النجاح</p>
                      <p className="text-sm text-gray-400 mt-2">قيد التحميل...</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10" />
                    <div className="text-center relative z-10 p-8">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-32 h-32 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-3xl border-4 border-white shadow-2xl"
                      >
                        <span className="text-3xl font-bold text-white drop-shadow-lg">
                          {story.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.name}</h3>
                      <p className="text-gray-600 font-medium">{story.afterTitle}</p>
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{story.location}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Play Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPlayingVideo(playingVideo === story.id ? null : story.id)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-gradient-to-br from-white/90 to-emerald-50/90 backdrop-blur-sm text-emerald-600 p-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-emerald-300/50 hover:border-emerald-400">
                <Play className="w-12 h-12" fill="currentColor" />
              </div>
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-emerald-200/50 hover:border-emerald-300"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-emerald-200/50 hover:border-emerald-300"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600" />
            </motion.button>

            {/* Story Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentStory === index 
                      ? 'bg-emerald-600 w-8' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Story Details */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            {/* Location and Duration */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">{story.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{story.duration}</span>
              </div>
            </div>

            {/* Name */}
            <motion.h3
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 mb-8"
            >
              {story.name}
            </motion.h3>
            
            {/* Before/After Comparison */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/30 shadow-xl"
            >
              <div className="grid grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2 font-medium">قبل</div>
                  <div className="bg-gray-100 rounded-2xl p-4 mb-3">
                    <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-bold text-lg text-gray-700">{story.beforeTitle}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <p className="font-bold text-xl text-gray-600">{story.beforeSalary}</p>
                  </div>
                </div>
                
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-xl">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-emerald-600 mt-2">تحول</p>
                </motion.div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2 font-medium">بعد</div>
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-4 mb-3 border border-emerald-200/50">
                    <Building className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="font-bold text-lg text-emerald-700">{story.afterTitle}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <p className="font-bold text-xl text-emerald-600">{story.afterSalary}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={itemVariants}
              className="relative mb-8"
            >
              <Quote className="absolute -top-2 -right-2 w-8 h-8 text-emerald-400/30" />
              <p className="text-xl text-gray-700 leading-relaxed pl-6 border-r-4 border-emerald-400">
                {story.story}
              </p>
            </motion.div>

            {/* Achievement */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{story.achievement}</p>
                {story.company && (
                  <p className="text-sm text-gray-600">{story.company} • {story.industry}</p>
                )}
              </div>
            </motion.div>

            {/* Courses */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <p className="text-sm font-medium text-gray-500 mb-3">الدورات التي أكملها:</p>
              <div className="flex flex-wrap gap-2">
                {story.courses.map((course, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-800 border-emerald-200/50"
                  >
                    {course}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Rating */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">({story.rating}/5) • تجربة استثنائية</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {successStories.map((successStory, index) => (
            <motion.div
              key={successStory.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setCurrentStory(index)}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all duration-500 border-2 border-emerald-200/50 hover:border-emerald-300 hover:shadow-2xl ${
                currentStory === index 
                  ? 'ring-4 ring-emerald-600 shadow-2xl scale-105' 
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg"
                >
                  <span className="text-sm font-bold text-white">
                    {successStory.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </motion.div>
                <div>
                  <h4 className="font-bold text-gray-900">{successStory.name}</h4>
                  <p className="text-sm text-gray-600">{successStory.afterTitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">الراتب:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {successStory.afterSalary}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">المدة:</span>
                  <span className="font-medium text-blue-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {successStory.duration}
                  </span>
                </div>
              </div>

              {successStory.featured && (
                <Badge className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-600">
                  <Star className="w-3 h-3 mr-1" />
                  مميز
                </Badge>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-white/10 transform translate-y-full" />
            
            <div className="relative z-10">
              <motion.h3
                variants={itemVariants}
                className="text-3xl font-bold mb-6"
              >
                كن القصة التالية للنجاح
              </motion.h3>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                انضم إلى آلاف الطلاب الذين حققوا نجاحاً باهراً من خلال منصتنا التعليمية وابدأ رحلتك المهنية اليوم
              </motion.p>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-50 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4"
                >
                  ابدأ رحلتك الآن
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
