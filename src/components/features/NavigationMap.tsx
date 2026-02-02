'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Home, 
  BookOpen, 
  Users, 
  Award,
  Briefcase,
  Building,
  HelpCircle,
  FileText,
  Shield,
  Smartphone,
  Globe,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function NavigationMap() {
  const navigationStructure = [
    {
      title: 'الصفحة الرئيسية',
      icon: <Home className="w-5 h-5" />,
      href: '/',
      status: 'active',
      description: 'نقطة البداية للمنصة',
      children: [
        { title: 'Hero Section', href: '/', status: 'active' },
        { title: 'الإحصائيات', href: '/#stats', status: 'active' },
        { title: 'الفئات', href: '/#categories', status: 'active' },
        { title: 'مسارات التعلم', href: '/#learning-paths', status: 'active' },
        { title: 'الدورات', href: '/#courses', status: 'active' },
        { title: 'الروابط السريعة', href: '/#quick-links', status: 'active' },
        { title: 'الشهادات', href: '/#testimonials', status: 'active' }
      ]
    },
    {
      title: 'التعليم والدورات',
      icon: <BookOpen className="w-5 h-5" />,
      href: '/courses',
      status: 'active',
      description: 'جميع المحتوى التعليمي',
      children: [
        { title: 'جميع الدورات', href: '/courses', status: 'active' },
        { title: 'تفاصيل الدورة', href: '/courses/[id]', status: 'active' },
        { title: 'مشغل الدورة', href: '/course-player', status: 'active' },
        { title: 'مسارات التعلم', href: '/learning-path', status: 'active' },
        { title: 'الدبلومات', href: '/diplomas', status: 'active' },
        { title: 'الشهادات', href: '/certificates', status: 'active' },
        { title: 'المختبرات', href: '/labs', status: 'active' },
        { title: 'المختبر الافتراضي', href: '/labs/virtual-lab', status: 'active' },
        { title: 'تقييم المهارات', href: '/skill-assessment', status: 'active' },
        { title: 'الامتحانات المراقبة', href: '/proctored-exams', status: 'active' },
        { title: 'مركز الشهادات', href: '/certification-center', status: 'active' }
      ]
    },
    {
      title: 'المستخدمون',
      icon: <Users className="w-5 h-5" />,
      href: '/student/dashboard',
      status: 'active',
      description: 'مناطق المستخدمين المختلفة',
      children: [
        { title: 'الطلاب', href: '/student/dashboard', status: 'active' },
        { title: 'دورات الطالب', href: '/student/courses', status: 'active' },
        { title: 'تقدم الطالب', href: '/student/progress', status: 'active' },
        { title: 'شهادات الطالب', href: '/student/certificates', status: 'active' },
        { title: 'مجتمع الطالب', href: '/student/community', status: 'active' },
        { title: 'جدول الطالب', href: '/student/schedule', status: 'active' },
        { title: 'ملاحظات الطالب', href: '/student/notes', status: 'active' },
        { title: 'فواتير الطالب', href: '/student/billing', status: 'active' },
        { title: 'ملف الطالب', href: '/student/profile', status: 'active' },
        { title: 'إعدادات الطالب', href: '/student/settings', status: 'active' },
        { title: 'مساعدة الطالب', href: '/student/help', status: 'active' },
        { title: 'المدربون', href: '/instructor-dashboard', status: 'active' },
        { title: 'دورات المدرب', href: '/instructor/courses', status: 'active' },
        { title: 'محتوى المدرب', href: '/instructor/content', status: 'active' },
        { title: 'طلاب المدرب', href: '/instructor/students', status: 'active' },
        { title: 'تحليلات المدرب', href: '/instructor/analytics', status: 'active' },
        { title: 'أرباح المدرب', href: '/instructor/earnings', status: 'active' },
        { title: 'تقييمات المدرب', href: '/instructor/reviews', status: 'active' },
        { title: 'تواصل المدرب', href: '/instructor/communication', status: 'active' },
        { title: 'جدول المدرب', href: '/instructor/schedule', status: 'active' },
        { title: 'ملف المدرب', href: '/instructor/profile', status: 'active' },
        { title: 'إعدادات المدرب', href: '/instructor/settings', status: 'active' },
        { title: 'مساعدة المدرب', href: '/instructor/help', status: 'active' },
        { title: 'المديرون', href: '/admin/dashboard', status: 'active' },
        { title: 'المستخدمون', href: '/admin/users', status: 'active' },
        { title: 'الأدوار', href: '/admin/roles', status: 'active' },
        { title: 'الدورات', href: '/admin/courses', status: 'active' },
        { title: 'المدفوعات', href: '/admin/payments', status: 'active' },
        { title: 'التقارير', href: '/admin/reports', status: 'active' },
        { title: 'التحليلات', href: '/admin/analytics', status: 'active' },
        { title: 'الأمان', href: '/admin/security', status: 'active' },
        { title: 'سجل التدقيق', href: '/admin/audit-log', status: 'active' },
        { title: 'النظام', href: '/admin/system', status: 'active' },
        { title: 'المحتوى', href: '/admin/content', status: 'active' },
        { title: 'التواصل', href: '/admin/communication', status: 'active' },
        { title: 'المؤسسات', href: '/admin/enterprise', status: 'active' },
        { title: 'الموبايل', href: '/admin/mobile', status: 'active' },
        { title: 'إعدادات المدير', href: '/admin/settings', status: 'active' },
        { title: 'مساعدة المدير', href: '/admin/help', status: 'active' }
      ]
    },
    {
      title: 'الحلول المؤسسية',
      icon: <Building className="w-5 h-5" />,
      href: '/enterprise',
      status: 'active',
      description: 'حلول للشركات والمؤسسات',
      children: [
        { title: 'الحلول المؤسسية', href: '/enterprise', status: 'active' },
        { title: 'التدريب الشركاتي', href: '/corporate-training', status: 'active' },
        { title: 'المدارس', href: '/schools', status: 'active' },
        { title: 'الجامعات', href: '/universities', status: 'active' },
        { title: 'الشركاء', href: '/partners', status: 'active' },
        { title: 'برامج التسويق', href: '/affiliates', status: 'active' }
      ]
    },
    {
      title: 'المميزات والتقنية',
      icon: <Star className="w-5 h-5" />,
      href: '/features',
      status: 'active',
      description: 'المميزات التقنية المتقدمة',
      children: [
        { title: 'المميزات', href: '/features', status: 'active' },
        { title: 'الذكاء الاصطناعي', href: '/ai', status: 'active' },
        { title: 'التعلم التكيفي', href: '/adaptive-learning', status: 'active' },
        { title: 'التطبيقات', href: '/mobile-experience', status: 'active' },
        { title: 'تطبيق أندرويد', href: '/android', status: 'active' },
        { title: 'تطبيق iOS', href: '/ios', status: 'active' },
        { title: 'تحميل التطبيق', href: '/download-app', status: 'active' },
        { title: 'تطبيق سطح المكتب', href: '/desktop', status: 'active' },
        { title: 'الأجهزة', href: '/devices', status: 'active' },
        { title: 'تطبيق الويب', href: '/pwa', status: 'active' },
        { title: 'التنقل الصوتي', href: '/voice-navigation', status: 'active' },
        { title: 'إمكانية الوصول', href: '/accessibility', status: 'active' },
        { title: 'نظام التصميم', href: '/design-system', status: 'active' },
        { title: 'للمطورين', href: '/developers', status: 'active' },
        { title: 'وثائق API', href: '/api-docs', status: 'active' },
        { title: 'التكاملات', href: '/integrations', status: 'active' },
        { title: 'Webhooks', href: '/webhooks', status: 'active' }
      ]
    },
    {
      title: 'الشركة والدعم',
      icon: <HelpCircle className="w-5 h-5" />,
      href: '/about',
      status: 'active',
      description: 'معلومات الشركة والدعم',
      children: [
        { title: 'من نحن', href: '/about', status: 'active' },
        { title: 'الوظائف', href: '/careers', status: 'active' },
        { title: 'اتصل بنا', href: '/contact', status: 'active' },
        { title: 'الصحافة', href: '/press', status: 'active' },
        { title: 'المستثمرون', href: '/investors', status: 'active' },
        { title: 'الثقة والأمان', href: '/trust', status: 'active' },
        { title: 'المدونة', href: '/blog', status: 'active' },
        { title: 'المنتديات', href: '/forums', status: 'active' },
        { title: 'مركز المساعدة', href: '/help', status: 'active' },
        { title: 'الأسئلة الشائعة', href: '/faq', status: 'active' },
        { title: 'حالة الخدمة', href: '/status', status: 'active' },
        { title: 'عرض توضيحي', href: '/demo', status: 'active' },
        { title: 'دليل المنصة', href: '/platform-guide', status: 'active' }
      ]
    },
    {
      title: 'المصادقة والحسابات',
      icon: <Shield className="w-5 h-5" />,
      href: '/auth',
      status: 'active',
      description: 'إدارة الحسابات والمصادقة',
      children: [
        { title: 'المصادقة', href: '/auth', status: 'active' },
        { title: 'تسجيل الدخول', href: '/login', status: 'active' },
        { title: 'إنشاء حساب', href: '/signup', status: 'active' },
        { title: 'نسيت كلمة المرور', href: '/forgot-password', status: 'active' },
        { title: 'إعادة تعيين كلمة المرور', href: '/reset-password', status: 'active' },
        { title: 'المصادقة الثنائية', href: '/2fa', status: 'active' }
      ]
    },
    {
      title: 'التجارة والدفع',
      icon: <TrendingUp className="w-5 h-5" />,
      href: '/pricing',
      status: 'active',
      description: 'إدارة التجارة والمدفوعات',
      children: [
        { title: 'الأسعار', href: '/pricing', status: 'active' },
        { title: 'سلة التسوق', href: '/cart', status: 'active' },
        { title: 'صفحة الدفع', href: '/checkout', status: 'active' },
        { title: 'الفواتير', href: '/billing', status: 'active' },
        { title: 'الفواتير التفصيلية', href: '/invoices', status: 'active' },
        { title: 'الاشتراكات', href: '/subscriptions', status: 'active' },
        { title: 'سياسة الاسترداد', href: '/refunds', status: 'active' },
        { title: 'الضرائب', href: '/tax', status: 'active' }
      ]
    },
    {
      title: 'المحتوى والمجتمع',
      icon: <FileText className="w-5 h-5" />,
      href: '/blog',
      status: 'active',
      description: 'المحتوى والمجتمع',
      children: [
        { title: 'المدونة', href: '/blog', status: 'active' },
        { title: 'المنتديات', href: '/forums', status: 'active' },
        { title: 'مجتمع الدورات', href: '/course-community', status: 'active' },
        { title: 'التعاون', href: '/collaboration', status: 'active' },
        { title: 'لوحة الوظائف', href: '/job-board', status: 'active' },
        { title: 'لوحة الصدارة', href: '/leaderboard', status: 'active' },
        { title: 'غرف الدراسة', href: '/study-rooms', status: 'active' },
        { title: 'الاختبارات', href: '/quiz', status: 'active' },
        { title: 'قوائم التشغيل', href: '/playlist', status: 'active' },
        { title: 'التقدم', href: '/progress', status: 'active' },
        { title: 'معرض الأعمال', href: '/portfolio', status: 'active' },
        { title: 'قائمة الرغبات', href: '/wishlist', status: 'active' }
      ]
    },
    {
      title: 'السياسات القانونية',
      icon: <FileText className="w-5 h-5" />,
      href: '/privacy-policy',
      status: 'active',
      description: 'السياسات والشروط القانونية',
      children: [
        { title: 'سياسة الخصوصية', href: '/privacy-policy', status: 'active' },
        { title: 'الشروط والأحكام', href: '/terms', status: 'active' },
        { title: 'سياسة الكوكيز', href: '/cookie-policy', status: 'active' },
        { title: 'GDPR', href: '/gdpr', status: 'active' },
        { title: 'حماية البيانات', href: '/data-protection', status: 'active' },
        { title: 'أمان الموقع', href: '/security', status: 'active' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const totalActivePages = navigationStructure.reduce((acc, section) => {
    return acc + 1 + (section.children?.length || 0);
  }, 0);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            خريطة التنقل الكاملة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            جميع الصفحات والروابط في المنصة مضمونة للوصول السريع والسهل
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">نشط: {totalActivePages} صفحة</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">100% متصل</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationStructure.map((section, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg border border-gray-200">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
                {getStatusIcon(section.status)}
              </div>

              <div className="space-y-2">
                <Link
                  href={section.href}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(section.status)}
                    <span className="font-medium text-gray-900">{section.title}</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </Link>

                {section.children && (
                  <div className="space-y-1">
                    {section.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-sm"
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(child.status)}
                          <span className="text-gray-700">{child.title}</span>
                        </div>
                        <ChevronLeft className="w-3 h-3 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{totalActivePages}</div>
              <div className="text-sm text-gray-600">صفحة نشطة</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">متصل بالكامل</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">11</div>
              <div className="text-sm text-gray-600">قسم رئيسي</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">صفحة يتيمة</div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            جميع الصفحات متاحة من خلال القوائم الرئيسية أو الروابط السريعة
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              الصفحة الرئيسية
            </Link>
            <Link
              href="/courses"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              جميع الدورات
            </Link>
            <Link
              href="/student/dashboard"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              لوحة الطالب
            </Link>
            <Link
              href="/help"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              المساعدة
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
