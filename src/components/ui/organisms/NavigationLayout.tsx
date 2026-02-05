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
  sidebarContent?: React.ReactNode;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  stickyNavigation?: boolean;
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
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile viewport
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }, []);

    // Handle scroll for sticky navigation
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

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

    const handleSidebarToggle = () => {
      setIsSidebarCollapsed(!isSidebarCollapsed);
      config?.onSidebarToggle?.();
    };

    const navigationConfig = config || generateNavigationConfig();

    const renderSidebar = () => {
      if (!navigationConfig.showSidebar) return null;

      const sidebarClasses = cn(
        'transition-all duration-300',
        isMobile && 'mobile-sidebar',
        navigationConfig.sidebarCollapsed && 'w-16'
      );

      switch (navigationConfig.sidebarType) {
        case 'student':
          return (
            <aside 
              className={sidebarClasses}
              data-testid="mock-student-sidebar"
              data-collapsed={navigationConfig.sidebarCollapsed}
            >
              {config?.sidebarContent || (
                <StudentSidebar
                  isCollapsed={navigationConfig.sidebarCollapsed}
                  onToggle={navigationConfig.onSidebarToggle}
                />
              )}
            </aside>
          );
        case 'instructor':
          return (
            <aside 
              className={sidebarClasses}
              data-testid="mock-instructor-sidebar"
              data-collapsed={navigationConfig.sidebarCollapsed}
            >
              {config?.sidebarContent || (
                <InstructorSidebar
                  isCollapsed={navigationConfig.sidebarCollapsed}
                  onToggle={navigationConfig.onSidebarToggle}
                />
              )}
            </aside>
          );
        case 'admin':
          return (
            <aside 
              className={sidebarClasses}
              data-testid="mock-admin-sidebar"
              data-collapsed={navigationConfig.sidebarCollapsed}
            >
              {config?.sidebarContent || (
                <AdminSidebar
                  isCollapsed={navigationConfig.sidebarCollapsed}
                  onToggle={navigationConfig.onSidebarToggle}
                />
              )}
            </aside>
          );
        default:
          return null;
      }
    };

    return (
      <div 
        ref={ref} 
        className={cn(
          'min-h-screen bg-gray-50 flex',
          className
        )} 
        data-testid="navigation-layout"
        {...props}
      >
        {/* Main Navigation Header */}
        <header 
          className={cn(
            'sticky top-0 z-40 bg-white border-b border-gray-200 transition-all duration-200',
            scrolled && 'shadow-md',
            config?.stickyNavigation && 'sticky'
          )}
        >
          <div className="px-4 py-3 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {config?.showSidebar && (
                <button
                  onClick={handleSidebarToggle}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Toggle sidebar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              
              {/* Search Input */}
              {config?.showSearch && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg 
                    className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Notifications Button */}
              {config?.showNotifications && (
                <button
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors relative"
                  aria-label="Notifications"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              )}

              {/* User Menu */}
              {config?.showUserMenu && (
                <div className="relative">
                  <button
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="User menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          {navigationConfig.showSidebar && (
            <div className="fixed right-0 top-0 h-full z-40 lg:relative lg:z-auto">
              {renderSidebar()}
            </div>
          )}

          {/* Main Content */}
          <div className={cn(
            'flex-1 flex flex-col',
            navigationConfig.showSidebar && !navigationConfig.sidebarCollapsed && 'lg:ml-64'
          )}>
            {/* Breadcrumbs */}
            {navigationConfig.breadcrumbs && navigationConfig.breadcrumbs.length > 0 && (
              <nav 
                aria-label="Breadcrumbs" 
                data-testid="breadcrumbs"
                className="px-4 py-3 bg-white border-b border-gray-200"
              >
                <ol className="flex items-center space-x-2 text-sm">
                  {navigationConfig.breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && (
                        <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {crumb.href ? (
                        <a
                          href={crumb.href}
                          className={cn(
                            'hover:text-blue-600 transition-colors',
                            crumb.isActive && 'text-blue-600 font-medium'
                          )}
                        >
                          {crumb.label}
                        </a>
                      ) : (
                        <span className={cn(
                          crumb.isActive && 'text-blue-600 font-medium'
                        )}>
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Page Navigation */}
            {(navigationConfig.previous || navigationConfig.next || navigationConfig.related) && (
              <nav 
                aria-label="Main navigation" 
                data-testid="page-navigation"
                className={cn(
                  'px-4 py-3 bg-white border-b border-gray-200 transition-all duration-200',
                  scrolled && 'sticky scrolled'
                )}
              >
                <div className="flex items-center justify-between">
                  {/* Previous Button */}
                  {navigationConfig.previous && (
                    <button
                      data-testid="previous-button"
                      onClick={() => window.location.href = navigationConfig.previous!.href}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      aria-label={navigationConfig.previous.label}
                      title={navigationConfig.previous.description}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>{navigationConfig.previous.label}</span>
                    </button>
                  )}

                  {/* Related Links */}
                  {navigationConfig.related && navigationConfig.related.length > 0 && (
                    <div className="flex items-center space-x-2">
                      {navigationConfig.related.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => window.location.href = item.href}
                          className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                          data-testid={`related-${index}`}
                        >
                          {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Next Button */}
                  {navigationConfig.next && (
                    <button
                      data-testid="next-button"
                      onClick={() => window.location.href = navigationConfig.next!.href}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      aria-label={navigationConfig.next.label}
                      title={navigationConfig.next.description}
                    >
                      <span>{navigationConfig.next.label}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </nav>
            )}

            {/* Page Content */}
            <main 
              role="main" 
              aria-label="Main content"
              className="flex-1 p-6"
            >
              {children}
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
