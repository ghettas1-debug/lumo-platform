'use client';

import React from 'react';
import Link from 'next/link';
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
  MessageSquare
} from 'lucide-react';

interface QuickLinksProps {
  className?: string;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ className }) => {
  const categories = [
    {
      id: 'development',
      title: 'تطوير البرمجيات',
      icon: Code,
      color: 'blue',
      links: [
        { title: 'تطوير الويب', href: '/courses/web-development', count: 245 },
        { title: 'تطبيقات الموبايل', href: '/courses/mobile-development', count: 189 },
        { title: 'تطوير الألعاب', href: '/courses/game-development', count: 67 },
        { title: 'DevOps', href: '/courses/devops', count: 134 },
        { title: 'قواعد البيانات', href: '/courses/databases', count: 98 },
        { title: 'أمن المعلومات', href: '/courses/cybersecurity', count: 156 }
      ]
    },
    {
      id: 'business',
      title: 'الأعمال والإدارة',
      icon: Briefcase,
      color: 'green',
      links: [
        { title: 'إدارة الأعمال', href: '/courses/business-administration', count: 203 },
        { title: 'التسويق الرقمي', href: '/courses/digital-marketing', count: 178 },
        { title: 'المالية والمحاسبة', href: '/courses/finance', count: 145 },
        { title: 'ريادة الأعمال', href: '/courses/entrepreneurship', count: 89 },
        { title: 'الموارد البشرية', href: '/courses/human-resources', count: 76 },
        { title: 'إدارة المشاريع', href: '/courses/project-management', count: 124 }
      ]
    },
    {
      id: 'design',
      title: 'التصميم والإبداع',
      icon: Palette,
      color: 'purple',
      links: [
        { title: 'تصميم UI/UX', href: '/courses/ui-ux-design', count: 167 },
        { title: 'التصميم الجرافيكي', href: '/courses/graphic-design', count: 234 },
        { title: 'الرسوم المتحركة', href: '/courses/animation', count: 45 },
        { title: 'تصميم ثلاثي الأبعاد', href: '/courses/3d-design', count: 78 },
        { title: 'التصوير الفوتوغرافي', href: '/courses/photography', count: 156 },
        { title: 'مونتاج الفيديو', href: '/courses/video-editing', count: 89 }
      ]
    },
    {
      id: 'technology',
      title: 'التكنولوجيا الحديثة',
      icon: TrendingUp,
      color: 'orange',
      links: [
        { title: 'الذكاء الاصطناعي', href: '/courses/artificial-intelligence', count: 198 },
        { title: 'تعلم الآلة', href: '/courses/machine-learning', count: 143 },
        { title: 'تحليل البيانات', href: '/courses/data-science', count: 267 },
        { title: 'إنترنت الأشياء', href: '/courses/iot', count: 56 },
        { title: 'البلوك تشين', href: '/courses/blockchain', count: 34 },
        { title: 'الواقع الافتراضي', href: '/courses/virtual-reality', count: 29 }
      ]
    },
    {
      id: 'personal',
      title: 'التطوير الشخصي',
      icon: Heart,
      color: 'red',
      links: [
        { title: 'تطوير الذات', href: '/courses/personal-development', count: 189 },
        { title: 'المهارات اللغوية', href: '/courses/language-skills', count: 234 },
        { title: 'الصحة واللياقة', href: '/courses/health-fitness', count: 67 },
        { title: 'التأمل واليقظة', href: '/courses/mindfulness', count: 45 },
        { title: 'إدارة الوقت', href: '/courses/time-management', count: 123 },
        { title: 'المهارات الاجتماعية', href: '/courses/social-skills', count: 98 }
      ]
    },
    {
      id: 'academic',
      title: 'الدراسات الأكاديمية',
      icon: GraduationCap,
      color: 'indigo',
      links: [
        { title: 'الرياضيات', href: '/courses/mathematics', count: 145 },
        { title: 'الفيزياء', href: '/courses/physics', count: 89 },
        { title: 'الكيمياء', href: '/courses/chemistry', count: 67 },
        { title: 'الأحياء', href: '/courses/biology', count: 78 },
        { title: 'التاريخ', href: '/courses/history', count: 123 },
        { title: 'الأدب والكتابة', href: '/courses/literature', count: 156 }
      ]
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
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            استكشف <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">فئات الدورات</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر من بين 6000+ دورة في 6 فئات رئيسية وابدأ رحلتك التعليمية اليوم
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const colorClasses = getColorClasses(category.color);
            const Icon = category.icon;
            
            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Category Header */}
                <div className={`${colorClasses.bg} p-6 border-b border-gray-100`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600">
                        {category.links.reduce((sum, link) => sum + link.count, 0)} دورة
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category Links */}
                <div className="p-6">
                  <div className="space-y-3">
                    {category.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className={`flex items-center justify-between p-3 rounded-lg ${colorClasses.bg} ${colorClasses.hover} transition-all duration-200 group`}
                      >
                        <div className="flex items-center gap-3">
                          <ChevronRight className={`w-4 h-4 ${colorClasses.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {link.title}
                          </span>
                        </div>
                        <span className={`text-xs ${colorClasses.text} font-medium`}>
                          {link.count}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* View All Link */}
                  <Link
                    href={`/courses?category=${category.id}`}
                    className={`flex items-center justify-center gap-2 mt-4 p-3 rounded-lg border-2 ${colorClasses.text} ${colorClasses.text.replace('text', 'border')} hover:bg-gray-50 transition-all duration-200`}
                  >
                    <span className="text-sm font-medium">عرض جميع الدورات</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            استكشف جميع الدورات
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
