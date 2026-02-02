'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  Award, 
  Briefcase, 
  Building, 
  HelpCircle, 
  Settings, 
  Bell,
  ShoppingCart,
  Heart,
  Star,
  TrendingUp,
  Globe,
  Smartphone,
  CreditCard,
  FileText,
  Shield,
  Headphones,
  MessageSquare,
  Calendar,
  Clock,
  Target,
  Zap,
  ChevronLeft
} from 'lucide-react';

export default function QuickLinks() {
  const quickLinks = [
    // التعليم والدورات
    {
      title: 'التعلم',
      icon: <BookOpen className="w-5 h-5" />,
      links: [
        { label: 'جميع الدورات', href: '/courses', description: 'استكشف 6000+ دورة' },
        { label: 'مسارات التعلم', href: '/learning-path', description: 'مسارات مصممة لك' },
        { label: 'الدبلومات', href: '/diplomas', description: 'دبلومات معتمدة' },
        { label: 'الشهادات', href: '/certificates', description: 'شهادات مجانية' },
        { label: 'المختبرات', href: '/labs', description: 'مختبرات افتراضية' },
        { label: 'تقييم المهارات', href: '/skill-assessment', description: 'اختبر مهاراتك' }
      ]
    },
    // المستخدمون
    {
      title: 'المستخدمون',
      icon: <Users className="w-5 h-5" />,
      links: [
        { label: 'للطلاب', href: '/student/dashboard', description: 'لوحة تحكم الطالب' },
        { label: 'للمدربين', href: '/instructor-dashboard', description: 'لوحة تحكم المدرب' },
        { label: 'للمؤسسات', href: '/enterprise', description: 'حلول للشركات' },
        { label: 'للجامعات', href: '/universities', description: 'حلول تعليمية' },
        { label: 'للشركات', href: '/corporate-training', description: 'تدريب الشركات' },
        { label: 'للمطورين', href: '/developers', description: 'API والمطورين' }
      ]
    },
    // المميزات
    {
      title: 'المميزات',
      icon: <Star className="w-5 h-5" />,
      links: [
        { label: 'الذكاء الاصطناعي', href: '/ai', description: 'تعلم ذكي' },
        { label: 'التعلم التكيفي', href: '/adaptive-learning', description: 'تعلم مخصص' },
        { label: 'التطبيقات', href: '/mobile-experience', description: 'تطبيقات محمولة' },
        { label: 'التنقل الصوتي', href: '/voice-navigation', description: 'تحكم صوتي' },
        { label: 'إمكانية الوصول', href: '/accessibility', description: 'وصول للجميع' },
        { label: 'التعاون', href: '/collaboration', description: 'تعلم جماعي' }
      ]
    },
    // الشركة
    {
      title: 'الشركة',
      icon: <Building className="w-5 h-5" />,
      links: [
        { label: 'من نحن', href: '/about', description: 'تعرف علينا' },
        { label: 'الوظائف', href: '/careers', description: 'انضم لفريقنا' },
        { label: 'الشركاء', href: '/partners', description: 'شركاء النجاح' },
        { label: 'الصحافة', href: '/press', description: 'أخبارنا' },
        { label: 'المستثمرون', href: '/investors', description: 'فرص استثمارية' },
        { label: 'الثقة والأمان', href: '/trust', description: 'أمان وثقة' }
      ]
    },
    // الدعم
    {
      title: 'الدعم',
      icon: <HelpCircle className="w-5 h-5" />,
      links: [
        { label: 'مركز المساعدة', href: '/help', description: 'مساعدة فورية' },
        { label: 'الأسئلة الشائعة', href: '/faq', description: 'أجوبة سريعة' },
        { label: 'اتصل بنا', href: '/contact', description: 'تواصل معنا' },
        { label: 'المنتديات', href: '/forums', description: 'مجتمع الدعم' },
        { label: 'حالة الخدمة', href: '/status', description: 'حالة النظام' },
        { label: 'وثائق API', href: '/api-docs', description: 'للمطورين' }
      ]
    },
    // الأدوات والخدمات
    {
      title: 'الأدوات',
      icon: <Settings className="w-5 h-5" />,
      links: [
        { label: 'سلة التسوق', href: '/cart', description: 'دوراتك المختارة' },
        { label: 'قائمة الرغبات', href: '/wishlist', description: 'دورات محفوظة' },
        { label: 'الإشعارات', href: '/notifications', description: 'آخر التحديثات' },
        { label: 'الإعدادات', href: '/settings', description: 'إعدادات الحساب' },
        { label: 'الفواتير', href: '/billing', description: 'إدارة الفواتير' },
        { label: 'الملف الشخصي', href: '/profile', description: 'معلوماتك' }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            وصول سريع لكل شيء
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            جميع الصفحات والخدمات متاحة بنقرة واحدة. ابحث بسهولة عن ما تحتاجه.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickLinks.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {section.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h3>
              </div>
              
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="text-right flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {link.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {link.description}
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Bar */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            الوصول السريع
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link
              href="/student/dashboard"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">لوحة الطالب</span>
            </Link>
            
            <Link
              href="/instructor-dashboard"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">لوحة المدرب</span>
            </Link>
            
            <Link
              href="/admin/dashboard"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">لوحة المدير</span>
            </Link>
            
            <Link
              href="/courses"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">جميع الدورات</span>
            </Link>
            
            <Link
              href="/cart"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">سلة التسوق</span>
            </Link>
            
            <Link
              href="/help"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">المساعدة</span>
            </Link>
          </div>
        </div>

        {/* Emergency Links */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-600">
            <Link href="/emergency" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Headphones className="w-4 h-4" />
              <span>دعم طارئ</span>
            </Link>
            <Link href="/feedback" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>ملاحظاتك</span>
            </Link>
            <Link href="/report" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Shield className="w-4 h-4" />
              <span>الإبلاغ عن مشكلة</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
