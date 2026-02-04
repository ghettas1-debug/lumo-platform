'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { tokens } from '@/tokens/design-tokens';
import { 
  BookOpen,
  GraduationCap,
  Award,
  Code,
  Users,
  Building,
  Briefcase,
  DollarSign,
  TrendingUp,
  FileText,
  HelpCircle,
  User,
  LogIn,
  UserPlus,
  Search,
  ShoppingCart,
  Globe,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
  Play,
  Star,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const categoryCards = [
    {
      id: 'web-dev',
      title: 'تطوير الويب',
      description: 'HTML, CSS, JavaScript, React',
      icon: Code,
      color: 'blue',
      href: '/courses/web-development',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'business',
      title: 'إدارة الأعمال',
      description: 'قيادة، إدارة، استراتيجية',
      icon: Briefcase,
      color: 'green',
      href: '/courses/business',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'ai',
      title: 'الذكاء الاصطناعي',
      description: 'Machine Learning, Deep Learning',
      icon: Award,
      color: 'purple',
      href: '/courses/ai',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'all-courses',
      title: 'جميع الدورات',
      description: 'استكشف 6000+ دورة',
      icon: BookOpen,
      color: 'gradient',
      href: '/courses',
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
    },
  ];

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Enhanced Background with Animated Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Animated Background Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-400 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <GraduationCap className="w-10 h-10 text-blue-600" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Award className="w-8 h-8 text-purple-600" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="text-right space-y-8">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>جديد: دورات الذكاء الاصطناعي</span>
              <ArrowLeft className="w-4 h-4" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight"
            >
              ابدأ رحلتك في
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                التعلم الاحترافي
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl"
            >
              انضم إلى أكثر من 50 مليون طالب حول العالم وتعلم من أفضل المدربين المعتمدين في مختلف المجالات التقنية والإدارية
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg"
                leftIcon={<UserPlus className="w-5 h-5" />}
              >
                ابدأ التعلم مجاناً
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 px-8 py-4 text-lg bg-white/80 backdrop-blur-sm"
                leftIcon={<Play className="w-5 h-5" />}
              >
                شاهد تجربة المنصة
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>لا توجد رسوم خفية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>إلغاء الاشتراك في أي وقت</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Category Cards */}
          <motion.div variants={itemVariants} className="relative">
            <div className="grid grid-cols-2 gap-6">
              {categoryCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <Link href={card.href} className="block">
                      <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                        {/* Gradient Background on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        
                        {/* Icon Container */}
                        <div className={`relative w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Content */}
                        <h3 className="relative font-bold text-gray-900 text-lg mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                          {card.title}
                        </h3>
                        <p className="relative text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                          {card.description}
                        </p>
                        
                        {/* Arrow Indicator */}
                        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Floating Stats Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold">4.8</span>
                <span className="text-sm opacity-90">تقييم</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '6000+', label: 'دورة تدريبية', color: 'blue' },
            { number: '50M+', label: 'طالب حول العالم', color: 'purple' },
            { number: '4.8', label: 'تقييم متوسط', color: 'green' },
            { number: '98%', label: 'رضا الطلاب', color: 'orange' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg"
            >
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-400 text-transparent bg-clip-text mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
