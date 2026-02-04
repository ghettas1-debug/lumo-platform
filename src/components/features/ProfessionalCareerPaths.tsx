'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Target,
  Briefcase,
  TrendingUp,
  Clock,
  Award,
  Rocket,
  Sparkles,
  Users,
  CheckCircle,
  ArrowLeft,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  href: string;
  features: string[];
  stats: {
    students: string;
    success: string;
    duration: string;
  };
  isPopular?: boolean;
  isNew?: boolean;
}

export default function ProfessionalCareerPaths() {
  const careerPaths: CareerPath[] = [
    {
      id: 'job-seeker',
      title: 'أريد التقديم على وظيفة',
      description: 'ابحث عن وظائف تناسب مهاراتك وابدأ مسيرتك المهنية',
      icon: Target,
      color: 'blue',
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      href: '/recruitment',
      features: ['مطابقة الوظائف', 'نصائح السيرة الذاتية', 'تحضير المقابلات', 'بناء الشبكة المهنية'],
      stats: {
        students: '15,000+',
        success: '94%',
        duration: '4-6 أسابيع'
      },
      isPopular: true
    },
    {
      id: 'career-change',
      title: 'أريد العثور على مهنة جديدة',
      description: 'اكتشف مسارات مهنية جديدة وطور المهارات المطلوبة',
      icon: Briefcase,
      color: 'green',
      gradient: 'from-emerald-600 via-green-500 to-teal-500',
      href: '/career-ready-plan',
      features: ['تقييم المهارات', 'خطط مسار مهني', 'دورات مخصصة', 'إرشاد مهني'],
      stats: {
        students: '8,500+',
        success: '89%',
        duration: '8-12 أسبوع'
      }
    },
    {
      id: 'skill-development',
      title: 'أريد تطوير مهاراتي في مسيرتي الحالية',
      description: 'تقدم في مسيرتك الحالية من خلال تعلم مهارات جديدة',
      icon: TrendingUp,
      color: 'purple',
      gradient: 'from-purple-600 via-violet-500 to-pink-500',
      href: '/career-development',
      features: ['تطوير المهارات', 'شهادات متقدمة', 'نمو مهني', 'ترقيات وظيفية'],
      stats: {
        students: '12,000+',
        success: '91%',
        duration: '6-8 أسابيع'
      },
      isNew: true
    }
  ];

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
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
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

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-32 right-16 w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center border border-white/20"
      >
        <Rocket className="w-8 h-8 text-blue-600" />
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-indigo-200/50 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>مسارات مهنية مخصصة</span>
            <ArrowLeft className="w-5 h-5" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
          >
            غير متأكد من أين تبدأ؟
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-2">
              أجب عن بعض الأسئلة القصيرة
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            سنقدم لك خطة مهنية جاهزة ومخصصة لاحتياجاتك وأهدافك المهنية مع دعم مستمر من خبراء عالميين
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium">تقييم مجاني للمهارات</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium">خطة تعلم مخصصة</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium">دعم مستمر 24/7</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Career Paths Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {careerPaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group"
              >
                <Link href={path.href} className="block">
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 border border-gray-100/50 overflow-hidden h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-0 group-hover:opacity-8 transition-opacity duration-700`} />
                    
                    <div className={`relative p-8 bg-gradient-to-br ${path.gradient} text-white overflow-hidden`}>
                      <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex gap-2 mb-4">
                          {path.isPopular && (
                            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm shadow-lg">
                              <Star className="w-3 h-3 ml-1" />
                              الأكثر شعبية
                            </Badge>
                          )}
                          {path.isNew && (
                            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm shadow-lg">
                              <Sparkles className="w-3 h-3 ml-1" />
                              جديد
                            </Badge>
                          )}
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border-2 border-white/30 shadow-xl"
                        >
                          <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-sm leading-tight">
                          {path.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {path.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-8">
                      <ul className="space-y-4 mb-8">
                        {path.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            whileHover={{ x: 5 }}
                            className="flex items-center text-gray-700"
                          >
                            <motion.div
                              whileHover={{ scale: 1.5 }}
                              className={`w-2 h-2 rounded-full ml-3 transition-all duration-300 bg-gradient-to-r ${path.gradient}`}
                            />
                            <span className="font-medium">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center bg-gray-50/50 rounded-xl p-3"
                        >
                          <div className={`text-lg font-bold bg-gradient-to-r ${path.gradient} text-transparent bg-clip-text mb-1`}>
                            {path.stats.students}
                          </div>
                          <div className="text-xs text-gray-500">طالب</div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center bg-gray-50/50 rounded-xl p-3"
                        >
                          <div className={`text-lg font-bold bg-gradient-to-r ${path.gradient} text-transparent bg-clip-text mb-1`}>
                            {path.stats.success}
                          </div>
                          <div className="text-xs text-gray-500">نجاح</div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center bg-gray-50/50 rounded-xl p-3"
                        >
                          <div className={`text-lg font-bold bg-gradient-to-r ${path.gradient} text-transparent bg-clip-text mb-1`}>
                            {path.stats.duration}
                          </div>
                          <div className="text-xs text-gray-500">مدة</div>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className={`w-full bg-gradient-to-r ${path.gradient} text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20 relative overflow-hidden group`}
                          size="lg"
                        >
                          <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          <span className="relative z-10 flex items-center">
                            ابدأ الآن
                            <ArrowLeft className="w-5 h-5 mr-2" />
                          </span>
                        </Button>
                      </motion.div>
                    </div>

                    {path.isPopular && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl shadow-xl border border-white/20"
                      >
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-bold text-sm">مفضل</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-indigo-100/50 via-white/50 to-purple-100/50 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-indigo-200/50 relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full -ml-24 -mb-24" />
          </div>
          
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    تمكين نفسك مجاناً
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                      انطلق نحو النجاح المهني
                    </span>
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    مع لumo، يمكنك الوصول إلى آلاف الدورات المجانية واكتساب المهارات التي تحتاجها للنجاح في مسيرتك المهنية.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="grid grid-cols-2 gap-4 mb-8"
                >
                  {[
                    { icon: Clock, title: 'تعلم بمرونة', desc: 'بالسرعة التي تناسبك', color: 'blue' },
                    { icon: Award, title: 'شهادات معتمدة', desc: 'معترف بها عالمياً', color: 'purple' },
                    { icon: Target, title: 'أهداف مهنية', desc: 'مخصصة لك', color: 'green' },
                    { icon: Users, title: 'مجتمع نشط', desc: 'دعم مستمر', color: 'orange' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/30 shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${
                          feature.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                          feature.color === 'purple' ? 'from-purple-500 to-pink-500' :
                          feature.color === 'green' ? 'from-emerald-500 to-teal-500' :
                          'from-orange-500 to-red-500'
                        } rounded-xl flex items-center justify-center`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center">
                      ابدأ رحلتك اليوم
                      <Rocket className="w-5 h-5 mr-2" />
                    </span>
                  </Button>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="aspect-square bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center border-2 border-indigo-200/50 shadow-2xl relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="text-center relative z-10 p-8">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl"
                    >
                      <Rocket className="w-12 h-12 text-white drop-shadow-lg" />
                    </motion.div>
                    
                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="text-2xl font-bold text-gray-900 mb-4"
                    >
                      انضم إلى ملايين المتعلمين
                    </motion.h4>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="text-gray-600 mb-6"
                    >
                      أكثر من 50 مليون طالب حول العالم يثقون في لumo
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      className="grid grid-cols-3 gap-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/30"
                      >
                        <div className="text-2xl font-bold text-blue-600">50M+</div>
                        <div className="text-xs text-gray-600">طالب</div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/30"
                      >
                        <div className="text-2xl font-bold text-purple-600">6K+</div>
                        <div className="text-xs text-gray-600">دورة</div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/30"
                      >
                        <div className="text-2xl font-bold text-indigo-600">98%</div>
                        <div className="text-xs text-gray-600">رضا</div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
