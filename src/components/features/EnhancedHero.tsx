'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  Sparkles,
  Trophy,
  Code,
  Palette,
  Target,
  Briefcase,
  Brain,
  ChevronRight,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';
import { useInView } from 'react-intersection-observer';

interface Category {
  id: number;
  name: string;
  description: string;
  courses: string;
  students: string;
  icon: any;
  color: string;
}

const EnhancedHero: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories: Category[] = [
    { id: 1, name: 'تطوير الويب', description: 'React, Node.js, Python', courses: '1250 دورة', students: '450K+ طالب', icon: Code, color: 'blue' },
    { id: 2, name: 'التصميم', description: 'UI/UX, Graphic Design', courses: '890 دورة', students: '320K+ طالب', icon: Palette, color: 'purple' },
    { id: 3, name: 'التسويق', description: 'Digital Marketing, SEO', courses: '670 دورة', students: '280K+ طالب', icon: Target, color: 'green' },
    { id: 4, name: 'الأعمال', description: 'Management, Finance', courses: '1100 دورة', students: '390K+ طالب', icon: Briefcase, color: 'orange' },
    { id: 5, name: 'الإبداع', description: 'Music, Video, Photography', courses: '450 دورة', students: '180K+ طالب', icon: Palette, color: 'pink' },
    { id: 6, name: 'التكنولوجيا', description: 'AI, Data Science, Cloud', courses: '980 دورة', students: '410K+ طالب', icon: Brain, color: 'indigo' }
  ];

  const stats = [
    { number: '50M+', label: 'طالب حول العالم', icon: Users, color: 'blue' },
    { number: '6000+', label: 'دورة تدريبية', icon: BookOpen, color: 'green' },
    { number: '500K+', label: 'شهادة معتمدة', icon: Award, color: 'purple' },
    { number: '180+', label: 'دولة', icon: Globe, color: 'orange' }
  ];

  const features = [
    { icon: Award, title: 'شهادات معتمدة عالمياً', description: 'معترف بها من أفضل الشركات' },
    { icon: Clock, title: 'تعلم بالسرعة التي تناسبك', description: 'وصول مدى الحياة للمحتوى' },
    { icon: Target, title: 'مسارات تعليمية مخصصة', description: 'مصممة لتحقيق أهدافك' },
    { icon: Shield, title: 'ضمان الرضا', description: 'استرجاع أموالك خلال 30 يوماً' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-400 to-blue-600',
      purple: 'from-purple-400 to-purple-600',
      green: 'from-green-400 to-green-600',
      orange: 'from-orange-400 to-orange-600',
      pink: 'from-pink-400 to-pink-600',
      indigo: 'from-indigo-400 to-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  const getCategoryBgColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-50 to-blue-100 border-blue-400',
      purple: 'from-purple-50 to-purple-100 border-purple-400',
      green: 'from-green-50 to-green-100 border-green-400',
      orange: 'from-orange-50 to-orange-100 border-orange-400',
      pink: 'from-pink-50 to-pink-100 border-pink-400',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-400'
    };
    return colors[color] || colors.blue;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 15)}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        {/* Top Announcement */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-8 py-4 text-base font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <Sparkles className="w-5 h-5 mr-3" />
            منصة التعلم الرائدة في العالم العربي
            <Trophy className="w-5 h-5 ml-3" />
          </Badge>
        </motion.div>

        {/* Main Hero Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-6xl mx-auto mb-20"
        >
          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight"
          >
            تعلم مهارات
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              المستقبل
            </span>
            مع خبراء عالميين
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-2xl md:text-3xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto font-medium"
          >
            انضم إلى أكثر من 
            <span className="text-blue-600 font-bold"> 50 مليون </span>
            طالب حول العالم
            <br />
            واحصل على شهادات معتمدة من أفضل الجامعات والشركات التقنية
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 group transform">
              ابدأ التعلم مجاناً
              <ArrowRight className="mr-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 text-gray-700 px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-50 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 group transform hover:scale-105">
              <Play className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              شاهد التجربة
            </Button>
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-right flex-1">
                  <div className="font-bold text-gray-900 text-base">{feature.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{feature.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Animated Stats */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-12 border border-gray-200 shadow-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <AnimatePresence mode="wait">
                {stats.map((stat, index) => (
                  currentStat === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="text-center group"
                    >
                      <div className="flex items-center justify-center mb-3">
                        <stat.icon className="w-8 h-8 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                        <span className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {stat.number}
                        </span>
                      </div>
                      <div className="text-base text-gray-700 font-medium">{stat.label}</div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Categories Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-gray-200/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <div className="text-center mb-10">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-3xl font-black text-gray-900 mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                اكتشف فئاتنا المميزة
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-lg text-gray-700 font-medium max-w-2xl mx-auto"
              >
                اختر المسار الذي يناسب أهدافك المهنية وابدأ رحلتك اليوم
              </motion.p>
            </div>
            
            {/* Enhanced Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                      activeCategory === category.id 
                        ? `bg-gradient-to-br ${getCategoryBgColor(category.color)} border-opacity-100 shadow-2xl transform scale-105` 
                        : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-102'
                    }`}
                    onMouseEnter={() => setActiveCategory(category.id)}
                    whileHover={{ scale: activeCategory === category.id ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background Pattern */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category.color)} opacity-5 rounded-2xl`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${getCategoryColor(category.color)} rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 ${activeCategory === category.id ? 'scale-110' : 'hover:scale-105'}`}>
                          <Icon className="w-7 h-7 text-white drop-shadow-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 text-lg">{category.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{category.description}</div>
                        </div>
                        {activeCategory === category.id && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-500 drop-shadow-sm" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Stats */}
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-700">{category.courses}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-700">{category.students}</span>
                        </div>
                      </div>
                      
                      {/* Hover Effect */}
                      {activeCategory !== category.id && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* CTA Section */}
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold group">
                استكشف جميع الفئات
                <ChevronRight className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 text-gray-50" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <motion.path
            fill="currentColor"
            d="M0,50 C360,100 720,0 1440,50 L1440,120 L0,120 Z"
            animate={{
              d: [
                "M0,50 C360,100 720,0 1440,50 L1440,120 L0,120 Z",
                "M0,70 C360,20 720,120 1440,70 L1440,120 L0,120 Z",
                "M0,50 C360,100 720,0 1440,50 L1440,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export default EnhancedHero;
