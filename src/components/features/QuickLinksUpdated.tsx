'use client';

import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Code, 
  Briefcase, 
  Palette, 
  TrendingUp, 
  Heart, 
  GraduationCap,
  Music,
  Pen,
  Rocket,
  BookOpen,
  Sparkles,
  Target,
  Users,
  Award,
  Star,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

// Dynamic import for Zap to avoid HMR issues
const Zap = lazy(() => import('lucide-react').then(mod => ({ default: mod.Zap })));

interface CategoryLink {
  title: string;
  href: string;
  count: number;
  trending?: boolean;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  links: CategoryLink[];
  totalCourses: number;
}

const QuickLinksUpdated: React.FC<{ className?: string }> = ({ className = '' }) => {
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
      },
    },
  };

  const categories: Category[] = [
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
        { title: 'الحوسبة السحابية', href: '/courses/cloud-computing', count: 29 }
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
        { title: 'اللغات', href: '/courses/languages', count: 234, trending: true },
        { title: 'اللياقة البدنية', href: '/courses/fitness', count: 67 },
        { title: 'اليقظة الذهنية', href: '/courses/mindfulness', count: 45 },
        { title: 'التغذية الصحية', href: '/courses/nutrition', count: 98 },
        { title: 'الصحة النفسية', href: '/courses/mental-health', count: 123 }
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
        { title: 'الرياضيات', href: '/courses/academic/mathematics', count: 145 },
        { title: 'الفيزياء', href: '/courses/academic/physics', count: 89 },
        { title: 'الكيمياء', href: '/courses/academic/chemistry', count: 67 },
        { title: 'الأحياء', href: '/courses/academic/biology', count: 78 },
        { title: 'علم الحاسوب', href: '/courses/academic/computer-science', count: 156 },
        { title: 'الهندسة', href: '/courses/academic/engineering', count: 123 },
        { title: 'الطب', href: '/courses/academic/medicine', count: 98 },
        { title: 'التاريخ', href: '/courses/history', count: 90 },
        { title: 'الأدب', href: '/courses/literature', count: 80 }
      ],
      totalCourses: 826
    },
    {
      id: 'music',
      title: 'الموسيقى',
      description: 'جيتار، بيانو، طبول، غناء، إنتاج موسيقي',
      icon: Music,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      links: [
        { title: 'الجيتار', href: '/courses/music/guitar', count: 156 },
        { title: 'البيانو', href: '/courses/music/piano', count: 134 },
        { title: 'الطبول', href: '/courses/music/drums', count: 89 },
        { title: 'الغناء', href: '/courses/music/vocals', count: 123 },
        { title: 'نظرية الموسيقى', href: '/courses/music/music-theory', count: 67 },
        { title: 'الإنتاج الموسيقي', href: '/courses/music/music-production', count: 98 }
      ],
      totalCourses: 667
    },
    {
      id: 'writing',
      title: 'الكتابة',
      description: 'كتابة إبداعية، محتوى، تقنية، إعلانية، صحافة',
      icon: Pen,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      links: [
        { title: 'الكتابة الإبداعية', href: '/courses/writing/creative-writing', count: 145 },
        { title: 'كتابة المحتوى', href: '/courses/writing/content-writing', count: 167 },
        { title: 'الكتابة التقنية', href: '/courses/writing/technical-writing', count: 89 },
        { title: 'الكتابة الإعلانية', href: '/courses/writing/copywriting', count: 123 },
        { title: 'الصحافة', href: '/courses/writing/journalism', count: 78 }
      ],
      totalCourses: 602
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
            اختر من بين أكثر من 6000+ دورة في 8 فئات رئيسية وابدأ رحلتك التعليمية اليوم مع أفضل المدربين المعتمدين
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
            const colorClasses = getColorClasses(category.color);
            
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
                    <div className="space-y-3">
                      {category.links.slice(0, 4).map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className={`flex items-center justify-between p-3 rounded-xl ${colorClasses.bg} ${colorClasses.hover} transition-all duration-200 group`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${colorClasses.text}`} />
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-gray-700">
                                {link.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {link.count} دورة
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {link.trending && (
                              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                                رائج
                              </span>
                            )}
                            <ChevronRight className={`w-4 h-4 ${colorClasses.text} group-hover:translate-x-1 transition-transform`} />
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Enhanced View All Link */}
                    <Link
                      href={category.id === 'music' ? '/courses/music' : category.id === 'writing' ? '/courses/writing' : `/courses?category=${category.id}`}
                      className={`flex items-center justify-center gap-2 mt-6 p-4 rounded-xl bg-gradient-to-r ${category.gradient} text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      <Rocket className="w-4 h-4" />
                      <span>عرض جميع الدورات</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              لم تجد ما تبحث عنه؟
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              استكشف جميع الدورات المتاحة وابدأ رحلتك التعليمية اليوم
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              <span>استكشف جميع الدورات</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickLinksUpdated;
