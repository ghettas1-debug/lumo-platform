'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen,
  GraduationCap,
  Award,
  Users,
  Briefcase,
  Code,
  Palette,
  Camera,
  Music,
  Heart,
  TrendingUp,
  ChevronRight,
  Star,
  Building,
  HelpCircle,
  Settings,
  ShoppingCart,
  Shield,
  Headphones,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Rocket
} from 'lucide-react';
import { tokens } from '@/tokens/design-tokens';

interface QuickLinksProps {
  className?: string;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ className }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const categories = [
    {
      id: 'development',
      title: 'تطوير البرمجيات',
      description: 'تطوير الويب، الموبايل، والألعاب',
      icon: Code,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      links: [
        { title: 'تطوير الويب', href: '/courses/web-development', count: 245, trending: true },
        { title: 'تطبيقات الموبايل', href: '/courses/mobile-development', count: 189 },
        { title: 'تطوير الألعاب', href: '/courses/game-development', count: 67 },
        { title: 'DevOps', href: '/courses/devops', count: 134 },
        { title: 'قواعد البيانات', href: '/courses/databases', count: 98 },
        { title: 'أمن المعلومات', href: '/courses/cybersecurity', count: 156, trending: true }
      ],
      totalCourses: 889
    },
    {
      id: 'business',
      title: 'الأعمال والإدارة',
      description: 'إدارة، تسويق، وريادة الأعمال',
      icon: Briefcase,
      color: 'green',
      gradient: 'from-emerald-500 to-teal-500',
      links: [
        { title: 'إدارة الأعمال', href: '/courses/business-administration', count: 203 },
        { title: 'التسويق الرقمي', href: '/courses/digital-marketing', count: 178, trending: true },
        { title: 'المالية والمحاسبة', href: '/courses/finance', count: 145 },
        { title: 'ريادة الأعمال', href: '/courses/entrepreneurship', count: 89 },
        { title: 'الموارد البشرية', href: '/courses/human-resources', count: 76 },
        { title: 'إدارة المشاريع', href: '/courses/project-management', count: 124 }
      ],
      totalCourses: 815
    },
    {
      id: 'design',
      title: 'التصميم والإبداع',
      description: 'تصميم جرافيكي، UI/UX، ورسوم متحركة',
      icon: Palette,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      links: [
        { title: 'تصميم UI/UX', href: '/courses/ui-ux-design', count: 167, trending: true },
        { title: 'التصميم الجرافيكي', href: '/courses/graphic-design', count: 234 },
        { title: 'الرسوم المتحركة', href: '/courses/animation', count: 45 },
        { title: 'تصميم ثلاثي الأبعاد', href: '/courses/3d-design', count: 78 },
        { title: 'التصوير الفوتوغرافي', href: '/courses/photography', count: 156 },
        { title: 'مونتاج الفيديو', href: '/courses/video-editing', count: 89 }
      ],
      totalCourses: 769
    },
    {
      id: 'technology',
      title: 'التكنولوجيا الحديثة',
      description: 'ذكاء اصطناعي، تحليل بيانات، وإنترنت الأشياء',
      icon: TrendingUp,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      links: [
        { title: 'الذكاء الاصطناعي', href: '/courses/artificial-intelligence', count: 198, trending: true },
        { title: 'تعلم الآلة', href: '/courses/machine-learning', count: 143, trending: true },
        { title: 'تحليل البيانات', href: '/courses/data-science', count: 267, trending: true },
        { title: 'إنترنت الأشياء', href: '/courses/iot', count: 56 },
        { title: 'البلوك تشين', href: '/courses/blockchain', count: 34 },
        { title: 'الواقع الافتراضي', href: '/courses/virtual-reality', count: 29 }
      ],
      totalCourses: 727
    },
    {
      id: 'personal',
      title: 'التطوير الشخصي',
      description: 'مهارات شخصية، لغات، وصحة',
      icon: Heart,
      color: 'red',
      gradient: 'from-red-500 to-pink-500',
      links: [
        { title: 'تطوير الذات', href: '/courses/personal-development', count: 189 },
        { title: 'المهارات اللغوية', href: '/courses/language-skills', count: 234, trending: true },
        { title: 'الصحة واللياقة', href: '/courses/health-fitness', count: 67 },
        { title: 'التأمل واليقظة', href: '/courses/mindfulness', count: 45 },
        { title: 'إدارة الوقت', href: '/courses/time-management', count: 123 },
        { title: 'المهارات الاجتماعية', href: '/courses/social-skills', count: 98 }
      ],
      totalCourses: 756
    },
    {
      id: 'academic',
      title: 'الدراسات الأكاديمية',
      description: 'رياضيات، علوم، ودراسات إنسانية',
      icon: GraduationCap,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-500',
      links: [
        { title: 'الرياضيات', href: '/courses/mathematics', count: 145 },
        { title: 'الفيزياء', href: '/courses/physics', count: 89 },
        { title: 'الكيمياء', href: '/courses/chemistry', count: 67 },
        { title: 'الأحياء', href: '/courses/biology', count: 78 },
        { title: 'التاريخ', href: '/courses/history', count: 123 },
        { title: 'الأدب والكتابة', href: '/courses/literature', count: 156 }
      ],
      totalCourses: 658
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className={`py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Enhanced Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>فئات الدورات الأكثر طلباً</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            استكشف 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              فئات الدورات
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اختر من بين أكثر من 6000+ دورة في 6 فئات رئيسية وابدأ رحلتك التعليمية اليوم مع أفضل المدربين المعتمدين
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">6000+ دورة</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">50M+ طالب</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">1000+ مدرب</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Enhanced Category Header */}
                  <div className={`relative p-8 bg-gradient-to-br ${category.gradient} overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-xl" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-lg" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-white/90 text-sm font-medium mb-1">
                            {category.totalCourses} دورة
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-300 fill-current" />
                            <span className="text-white text-sm font-medium">4.8</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Category Links */}
                  <div className="p-6">
                    <div className="space-y-2">
                      {category.links.slice(0, 4).map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group/link"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center opacity-0 group-hover/link:opacity-100 transition-opacity`}>
                              <ChevronRight className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-700 group-hover/link:text-gray-900 block">
                                {link.title}
                              </span>
                              {link.trending && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Zap className="w-3 h-3 text-orange-500" />
                                  <span className="text-xs text-orange-600">رائج</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium">
                              {link.count}
                            </span>
                            {link.trending && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Enhanced View All Link */}
                    <Link
                      href={`/courses?category=${category.id}`}
                      className={`flex items-center justify-center gap-2 mt-6 p-4 rounded-xl bg-gradient-to-r ${category.gradient} text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      <Rocket className="w-4 h-4" />
                      <span>عرض جميع الدورات</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                {/* Floating Badge */}
                {category.id === 'technology' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  >
                    جديد
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1">
            <div className="bg-white rounded-3xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    لم تجد ما تبحث عنه؟
                  </h3>
                  <p className="text-gray-600">
                    استكشف جميع الدورات المتاحة وابحث عن المجال المثالي لك
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>استكشف جميع الدورات</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickLinks;
