'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from './Breadcrumbs';
import { PageNavigation } from './PageNavigation';
import { StudentSidebar } from './StudentSidebar';
import { InstructorSidebar } from './InstructorSidebar';
import { AdminSidebar } from './AdminSidebar';
import { cn } from '@/lib/utils';

export interface NavigationConfig {
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    isActive?: boolean;
  }>;
  previous?: {
    label: string;
    href: string;
    description?: string;
  };
  next?: {
    label: string;
    href: string;
    description?: string;
  };
  related?: Array<{
    label: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
  showSidebar?: boolean;
  sidebarType?: 'student' | 'instructor' | 'admin';
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export interface NavigationLayoutProps {
  children: React.ReactNode;
  config?: NavigationConfig;
  className?: string;
}

const NavigationLayout = React.forwardRef<HTMLDivElement, NavigationLayoutProps>(
  ({ children, config, className, ...props }, ref) => {
    const pathname = usePathname();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [userRole, setUserRole] = useState<'student' | 'instructor' | 'admin' | 'guest'>('guest');

    // Auto-detect user role based on pathname
    useEffect(() => {
      if (pathname.startsWith('/student')) {
        setUserRole('student');
      } else if (pathname.startsWith('/instructor') || pathname.startsWith('/instructor-dashboard')) {
        setUserRole('instructor');
      } else if (pathname.startsWith('/admin')) {
        setUserRole('admin');
      } else {
        setUserRole('guest');
      }
    }, [pathname]);

    // Auto-generate navigation config based on pathname
    const generateNavigationConfig = (): NavigationConfig => {
      const pathSegments = pathname.split('/').filter(Boolean);
      
      // Generate breadcrumbs
      const breadcrumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const label = getSegmentLabel(segment);
        const isActive = index === pathSegments.length - 1;
        
        return { label, href: isActive ? undefined : href, isActive };
      });

      // Generate previous/next navigation
      const { previous, next, related } = generatePageNavigation(pathname);

      // Determine sidebar visibility
      const showSidebar = pathname.startsWith('/student') || 
                         pathname.startsWith('/instructor') || 
                         pathname.startsWith('/admin');

      return {
        breadcrumbs,
        previous,
        next,
        related,
        showSidebar,
        sidebarType: userRole as 'student' | 'instructor' | 'admin',
        sidebarCollapsed: isSidebarCollapsed,
        onSidebarToggle: () => setIsSidebarCollapsed(!isSidebarCollapsed)
      };
    };

    const navigationConfig = config || generateNavigationConfig();

    const renderSidebar = () => {
      if (!navigationConfig.showSidebar) return null;

      switch (navigationConfig.sidebarType) {
        case 'student':
          return (
            <StudentSidebar
              isCollapsed={navigationConfig.sidebarCollapsed}
              onToggle={navigationConfig.onSidebarToggle}
            />
          );
        case 'instructor':
          return (
            <InstructorSidebar
              isCollapsed={navigationConfig.sidebarCollapsed}
              onToggle={navigationConfig.onSidebarToggle}
            />
          );
        case 'admin':
          return (
            <AdminSidebar
              isCollapsed={navigationConfig.sidebarCollapsed}
              onToggle={navigationConfig.onSidebarToggle}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn('min-h-screen bg-gray-50', className)}
        {...props}
      >
        <div className="flex">
          {/* Sidebar */}
          {navigationConfig.showSidebar && (
            <div className="fixed right-0 top-0 h-full z-40 lg:relative lg:z-auto">
              {renderSidebar()}
            </div>
          )}

          {/* Main Content */}
          <div className={cn(
            'flex-1 min-h-screen',
            navigationConfig.showSidebar && (
              navigationConfig.sidebarCollapsed ? 'lg:mr-16' : 'lg:mr-72'
            )
          )}>
            {/* Breadcrumbs */}
            {navigationConfig.breadcrumbs && navigationConfig.breadcrumbs.length > 1 && (
              <div className="bg-white border-b border-gray-200 px-6 py-3">
                <Breadcrumbs items={navigationConfig.breadcrumbs} />
              </div>
            )}

            {/* Page Content */}
            <main className="flex-1">
              {children}

              {/* Page Navigation */}
              {(navigationConfig.previous || navigationConfig.next || navigationConfig.related) && (
                <div className="bg-white">
                  <PageNavigation
                    previous={navigationConfig.previous}
                    next={navigationConfig.next}
                    related={navigationConfig.related}
                    layout={navigationConfig.related ? 'grid' : 'horizontal'}
                  />
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
);

NavigationLayout.displayName = 'NavigationLayout';

// Helper function to get readable labels for path segments
function getSegmentLabel(segment: string): string {
  const labels: Record<string, string> = {
    'student': 'الطالب',
    'instructor': 'المدرب',
    'admin': 'المدير',
    'dashboard': 'لوحة التحكم',
    'courses': 'الدورات',
    'course-player': 'مشغل الدورات',
    'certificates': 'الشهادات',
    'profile': 'الملف الشخصي',
    'settings': 'الإعدادات',
    'billing': 'الفواتير',
    'analytics': 'التحليلات',
    'reports': 'التقارير',
    'users': 'المستخدمون',
    'payments': 'المدفوعات',
    'security': 'الأمان',
    'content': 'المحتوى',
    'help': 'المساعدة',
    'about': 'من نحن',
    'contact': 'اتصل بنا',
    'faq': 'الأسئلة الشائعة',
    'blog': 'المدونة',
    'forums': 'المنتديات',
    'enterprise': 'الحلول المؤسسية',
    'pricing': 'الأسعار',
    'features': 'المميزات',
    'api-docs': 'وثائق API',
    'developers': 'المطورين',
    'mobile-experience': 'تجربة الموبايل',
    'accessibility': 'إمكانية الوصول',
    'adaptive-learning': 'التعلم التكيفي',
    'learning-path': 'مسارات التعلم',
    'skill-assessment': 'تقييم المهارات',
    'labs': 'المختبرات',
    'virtual-lab': 'المختبر الافتراضي',
    'proctored-exams': 'الامتحانات المراقبة',
    'certification-center': 'مركز الشهادات',
    'corporate-training': 'التدريب الشركاتي',
    'schools': 'المدارس',
    'universities': 'الجامعات',
    'partners': 'الشركاء',
    'affiliates': 'برامج التسويق',
    'careers': 'الوظائف',
    'press': 'الصحافة',
    'investors': 'المستثمرون',
    'trust': 'الثقة والأمان',
    'privacy-policy': 'سياسة الخصوصية',
    'terms': 'الشروط والأحكام',
    'cookie-policy': 'سياسة الكوكيز',
    'gdpr': 'GDPR',
    'data-protection': 'حماية البيانات',
    'security': 'الأمان',
    'status': 'حالة الخدمة',
    'download-app': 'تحميل التطبيق',
    'android': 'تطبيق أندرويد',
    'ios': 'تطبيق iOS',
    'desktop': 'تطبيق سطح المكتب',
    'devices': 'الأجهزة',
    'pwa': 'تطبيق الويب التقدمي',
    'ai': 'الذكاء الاصطناعي',
    'voice-navigation': 'التنقل الصوتي',
    'design-system': 'نظام التصميم',
    'integrations': 'التكاملات',
    'webhooks': 'Webhooks',
    'notifications': 'الإشعارات',
    'wishlist': 'قائمة الرغبات',
    'cart': 'سلة التسوق',
    'checkout': 'صفحة الدفع',
    'subscriptions': 'الاشتراكات',
    'refunds': 'سياسة الاسترداد',
    'tax': 'الضرائب',
    'invoices': 'الفواتير',
    'progress': 'التقدم',
    'portfolio': 'معرض الأعمال',
    'notes': 'الملاحظات',
    'playlist': 'قوائم التشغيل',
    'study-rooms': 'غرف الدراسة',
    'quiz': 'الاختبارات',
    'job-board': 'لوحة الوظائف',
    'leaderboard': 'لوحة الصدارة',
    'course-community': 'مجتمع الدورات',
    'collaboration': 'التعاون',
    'polish': 'تحسين الأداء',
    'sessions': 'الجلسات',
    'audit-log': 'سجل التدقيق',
    'content-management': 'إدارة المحتوى',
    '2fa': 'المصادقة الثنائية',
    'forgot-password': 'نسيت كلمة المرور',
    'reset-password': 'إعادة تعيين كلمة المرور',
    'login': 'تسجيل الدخول',
    'signup': 'إنشاء حساب',
    'auth': 'المصادقة',
    'demo': 'عرض توضيحي',
    'platform-guide': 'دليل المنصة'
  };

  return labels[segment] || segment;
}

// Helper function to generate page navigation
function generatePageNavigation(pathname: string): {
  previous?: { label: string; href: string; description?: string };
  next?: { label: string; href: string; description?: string };
  related?: Array<{ label: string; href: string; description?: string; icon?: React.ReactNode }>;
} {
  const navigationMap: Record<string, {
    previous?: { label: string; href: string; description?: string };
    next?: { label: string; href: string; description?: string };
    related?: Array<{ label: string; href: string; description?: string; icon?: React.ReactNode }>;
  }> = {
    '/courses': {
      next: { label: 'تفاصيل الدورة', href: '/courses/[id]', description: 'عرض تفاصيل الدورة' },
      related: [
        { label: 'مسارات التعلم', href: '/learning-path', description: 'اكتشف مسارات التعلم' },
        { label: 'الدبلومات', href: '/diplomas', description: 'برامج الدبلومات' }
      ]
    },
    '/courses/[id]': {
      previous: { label: 'جميع الدورات', href: '/courses', description: 'العودة لجميع الدورات' },
      next: { label: 'مشغل الدورة', href: '/course-player', description: 'ابدأ التعلم' },
      related: [
        { label: 'شهادات الدورة', href: '/certificates', description: 'شهاداتك المكتسبة' },
        { label: 'مجتمع الدورة', href: '/course-community', description: 'تواصل مع الزملاء' }
      ]
    },
    '/course-player': {
      previous: { label: 'تفاصيل الدورة', href: '/courses/[id]', description: 'العودة لتفاصيل الدورة' },
      next: { label: 'الشهادة', href: '/certificates', description: 'احصل على شهادتك' }
    },
    '/student/dashboard': {
      next: { label: 'دوراتي', href: '/student/courses', description: 'عرض دوراتي' },
      related: [
        { label: 'التقدم', href: '/student/progress', description: 'تقدم التعلم' },
        { label: 'الشهادات', href: '/student/certificates', description: 'شهاداتي' }
      ]
    },
    '/instructor/dashboard': {
      next: { label: 'دوراتي', href: '/instructor/courses', description: 'إدارة دوراتي' },
      related: [
        { label: 'الطلاب', href: '/instructor/students', description: 'إدارة الطلاب' },
        { label: 'الأرباح', href: '/instructor/earnings', description: 'عرض الأرباح' }
      ]
    },
    '/admin/dashboard': {
      next: { label: 'المستخدمون', href: '/admin/users', description: 'إدارة المستخدمين' },
      related: [
        { label: 'الدورات', href: '/admin/courses', description: 'إدارة الدورات' },
        { label: 'المدفوعات', href: '/admin/payments', description: 'إدارة المدفوعات' }
      ]
    }
  };

  // Handle dynamic routes
  const normalizedPath = pathname.replace(/\/\d+/g, '/[id]');
  
  return navigationMap[normalizedPath] || {};
}

export { NavigationLayout };
