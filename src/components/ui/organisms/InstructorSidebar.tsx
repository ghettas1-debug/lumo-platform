'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Users,
  TrendingUp,
  DollarSign,
  FileText,
  Settings,
  Bell,
  BarChart3,
  PlayCircle,
  Award,
  MessageSquare,
  Calendar,
  Video,
  Upload,
  Edit,
  Eye,
  Star,
  Clock,
  Target,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FolderOpen,
  CreditCard,
  Download,
  Share2,
  GraduationCap,
  PieChart,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: SidebarItem[];
  description?: string;
}

const instructorSidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم',
    href: '/instructor/dashboard',
    icon: <Home className="w-5 h-5" />,
    description: 'نظرة عامة على أدائك'
  },
  {
    id: 'courses',
    label: 'دوراتي',
    href: '/instructor/courses',
    icon: <BookOpen className="w-5 h-5" />,
    badge: '8',
    description: 'إدارة دوراتك',
    children: [
      {
        id: 'all-courses',
        label: 'جميع الدورات',
        href: '/instructor/courses',
        icon: <BookOpen className="w-4 h-4" />,
        badge: '8'
      },
      {
        id: 'create-course',
        label: 'إنشاء دورة جديدة',
        href: '/instructor/courses/create',
        icon: <Upload className="w-4 h-4" />
      },
      {
        id: 'draft-courses',
        label: 'مسودات الدورات',
        href: '/instructor/courses/drafts',
        icon: <FileText className="w-4 h-4" />
      },
      {
        id: 'published-courses',
        label: 'دورات منشورة',
        href: '/instructor/courses/published',
        icon: <Eye className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'content-management',
    label: 'إدارة المحتوى',
    href: '/instructor/content',
    icon: <FolderOpen className="w-5 h-5" />,
    description: 'إدارة المحتوى التعليمي',
    children: [
      {
        id: 'lessons',
        label: 'الدروس',
        href: '/instructor/content/lessons',
        icon: <PlayCircle className="w-4 h-4" />
      },
      {
        id: 'videos',
        label: 'الفيديوهات',
        href: '/instructor/content/videos',
        icon: <Video className="w-4 h-4" />
      },
      {
        id: 'quizzes',
        label: 'الاختبارات',
        href: '/instructor/content/quizzes',
        icon: <Edit className="w-4 h-4" />
      },
      {
        id: 'resources',
        label: 'المصادر',
        href: '/instructor/content/resources',
        icon: <FileText className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'students',
    label: 'الطلاب',
    href: '/instructor/students',
    icon: <Users className="w-5 h-5" />,
    badge: '245',
    description: 'إدارة الطلاب',
    children: [
      {
        id: 'all-students',
        label: 'جميع الطلاب',
        href: '/instructor/students',
        icon: <Users className="w-4 h-4" />,
        badge: '245'
      },
      {
        id: 'active-students',
        label: 'الطلاب النشطون',
        href: '/instructor/students/active',
        icon: <Activity className="w-4 h-4" />
      },
      {
        id: 'student-progress',
        label: 'تقدم الطلاب',
        href: '/instructor/students/progress',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        id: 'student-certificates',
        label: 'شهادات الطلاب',
        href: '/instructor/students/certificates',
        icon: <Award className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'analytics',
    label: 'التحليلات والإحصائيات',
    href: '/instructor/analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'تحليلات الأداء',
    children: [
      {
        id: 'revenue',
        label: 'الإيرادات',
        href: '/instructor/analytics/revenue',
        icon: <DollarSign className="w-4 h-4" />
      },
      {
        id: 'enrollments',
        label: 'التسجيلات',
        href: '/instructor/analytics/enrollments',
        icon: <Users className="w-4 h-4" />
      },
      {
        id: 'engagement',
        label: 'مشاركة الطلاب',
        href: '/instructor/analytics/engagement',
        icon: <Activity className="w-4 h-4" />
      },
      {
        id: 'course-performance',
        label: 'أداء الدورات',
        href: '/instructor/analytics/courses',
        icon: <PieChart className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'earnings',
    label: 'الأرباح',
    href: '/instructor/earnings',
    icon: <DollarSign className="w-5 h-5" />,
    description: 'إدارة الأرباح',
    children: [
      {
        id: 'revenue-overview',
        label: 'نظرة عامة على الإيرادات',
        href: '/instructor/earnings',
        icon: <DollarSign className="w-4 h-4" />
      },
      {
        id: 'payment-history',
        label: 'سجل المدفوعات',
        href: '/instructor/earnings/payments',
        icon: <CreditCard className="w-4 h-4" />
      },
      {
        id: 'payouts',
        label: 'التحويلات',
        href: '/instructor/earnings/payouts',
        icon: <Download className="w-4 h-4" />
      },
      {
        id: 'tax-info',
        label: 'معلومات ضريبية',
        href: '/instructor/earnings/tax',
        icon: <FileText className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'reviews',
    label: 'التقييمات والمراجعات',
    href: '/instructor/reviews',
    icon: <Star className="w-5 h-5" />,
    badge: '4.8',
    description: 'تقييمات الدورات',
    children: [
      {
        id: 'course-reviews',
        label: 'تقييمات الدورات',
        href: '/instructor/reviews/courses',
        icon: <Star className="w-4 h-4" />
      },
      {
        id: 'instructor-reviews',
        label: 'تقييمات المدرب',
        href: '/instructor/reviews/instructor',
        icon: <GraduationCap className="w-4 h-4" />
      },
      {
        id: 'respond-reviews',
        label: 'الرد على التقييمات',
        href: '/instructor/reviews/respond',
        icon: <MessageSquare className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'communication',
    label: 'التواصل',
    href: '/instructor/communication',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'التواصل مع الطلاب',
    children: [
      {
        id: 'messages',
        label: 'الرسائل',
        href: '/instructor/messages',
        icon: <MessageSquare className="w-4 h-4" />
      },
      {
        id: 'announcements',
        label: 'الإعلانات',
        href: '/instructor/announcements',
        icon: <Bell className="w-4 h-4" />
      },
      {
        id: 'live-sessions',
        label: 'الجلسات المباشرة',
        href: '/instructor/live-sessions',
        icon: <Video className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'schedule',
    label: 'الجدول الزمني',
    href: '/instructor/schedule',
    icon: <Calendar className="w-5 h-5" />,
    description: 'جدولك الزمني'
  },
  {
    id: 'profile',
    label: 'الملف الشخصي',
    href: '/instructor/profile',
    icon: <GraduationCap className="w-5 h-5" />,
    description: 'إعدادات ملفك',
    children: [
      {
        id: 'personal-info',
        label: 'المعلومات الشخصية',
        href: '/instructor/profile/personal',
        icon: <GraduationCap className="w-4 h-4" />
      },
      {
        id: 'professional-info',
        label: 'المعلومات المهنية',
        href: '/instructor/profile/professional',
        icon: <Award className="w-4 h-4" />
      },
      {
        id: 'account-settings',
        label: 'إعدادات الحساب',
        href: '/instructor/settings',
        icon: <Settings className="w-4 h-4" />
      },
      {
        id: 'notifications',
        label: 'الإشعارات',
        href: '/instructor/notifications',
        icon: <Bell className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'help',
    label: 'المساعدة',
    href: '/instructor/help',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'مركز المساعدة للمدربين'
  }
];

export interface InstructorSidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const InstructorSidebar = React.forwardRef<HTMLDivElement, InstructorSidebarProps>(
  ({ className, isCollapsed = false, onToggle, ...props }, ref) => {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['courses', 'students', 'analytics']));

    const toggleExpanded = (itemId: string) => {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    };

    const isItemActive = (item: SidebarItem): boolean => {
      if (pathname === item.href) return true;
      if (item.children) {
        return item.children.some(child => pathname === child.href);
      }
      return false;
    };

    const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
      const isActive = isItemActive(item);
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id} className="w-full">
          <Link
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
              'hover:bg-gray-100',
              isActive && 'bg-blue-50 text-blue-600 border-r-2 border-blue-600',
              level > 0 && 'mr-4',
              isCollapsed ? 'justify-center' : ''
            )}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                toggleExpanded(item.id);
              }
            }}
          >
            <div className={cn('flex-shrink-0', isActive && 'text-blue-600')}>
              {item.icon}
            </div>
            
            {!isCollapsed && (
              <>
                <div className="flex-1 text-right">
                  <div className={cn(
                    'font-medium text-sm',
                    isActive ? 'text-blue-600' : 'text-gray-700'
                  )}>
                    {item.label}
                  </div>
                  {item.description && !isCollapsed && (
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  
                  {hasChildren && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleExpanded(item.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </Link>

          {/* Children */}
          {hasChildren && isExpanded && !isCollapsed && (
            <div className="mt-1 space-y-1">
              {item.children?.map(child => renderSidebarItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border-l border-gray-200 h-full overflow-y-auto',
          isCollapsed ? 'w-16' : 'w-72',
          className || ''
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-gray-900">لوحة المدرب</h2>
                <p className="text-xs text-gray-500 mt-1">إدارة تدريسك</p>
              </div>
            )}
            
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {instructorSidebarItems.map(item => renderSidebarItem(item))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <Link
            href="/logout"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium text-sm">تسجيل الخروج</span>}
          </Link>
        </div>
      </div>
    );
  }
);

InstructorSidebar.displayName = 'InstructorSidebar';

export { InstructorSidebar };
