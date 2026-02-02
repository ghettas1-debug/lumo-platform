'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  GraduationCap,
  Award,
  Heart,
  Settings,
  User,
  Bell,
  ShoppingCart,
  TrendingUp,
  Clock,
  FileText,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
  Target,
  BarChart3,
  MessageSquare,
  Users,
  Star,
  FolderOpen,
  Calendar,
  CreditCard,
  Download,
  Share2
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

const studentSidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم',
    href: '/student/dashboard',
    icon: <Home className="w-5 h-5" />,
    description: 'نظرة عامة على تقدمك'
  },
  {
    id: 'courses',
    label: 'دوراتي',
    href: '/student/courses',
    icon: <BookOpen className="w-5 h-5" />,
    badge: '12',
    description: 'الدورات المسجلة',
    children: [
      {
        id: 'active-courses',
        label: 'دورات نشطة',
        href: '/student/courses/active',
        icon: <PlayCircle className="w-4 h-4" />,
        badge: '8'
      },
      {
        id: 'completed-courses',
        label: 'دورات مكتملة',
        href: '/student/courses/completed',
        icon: <Award className="w-4 h-4" />,
        badge: '4'
      },
      {
        id: 'saved-courses',
        label: 'دورات محفوظة',
        href: '/student/wishlist',
        icon: <Heart className="w-4 h-4" />,
        badge: '8'
      }
    ]
  },
  {
    id: 'learning-path',
    label: 'مسارات التعلم',
    href: '/student/learning-path',
    icon: <Target className="w-5 h-5" />,
    description: 'مساراتك التعليمية'
  },
  {
    id: 'progress',
    label: 'التقدم والإحصائيات',
    href: '/student/progress',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'تتبع أدائك',
    children: [
      {
        id: 'analytics',
        label: 'التحليلات',
        href: '/student/analytics',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        id: 'achievements',
        label: 'الإنجازات',
        href: '/student/achievements',
        icon: <Star className="w-4 h-4" />
      },
      {
        id: 'study-time',
        label: 'وقت الدراسة',
        href: '/student/study-time',
        icon: <Clock className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'certificates',
    label: 'الشهادات',
    href: '/student/certificates',
    icon: <Award className="w-5 h-5" />,
    badge: '6',
    description: 'شهاداتك المكتسبة',
    children: [
      {
        id: 'my-certificates',
        label: 'شهاداتي',
        href: '/student/certificates',
        icon: <FileText className="w-4 h-4" />
      },
      {
        id: 'share-certificates',
        label: 'مشاركة الشهادات',
        href: '/student/certificates/share',
        icon: <Share2 className="w-4 h-4" />
      },
      {
        id: 'download-certificates',
        label: 'تحميل الشهادات',
        href: '/student/certificates/download',
        icon: <Download className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'community',
    label: 'المجتمع',
    href: '/student/community',
    icon: <Users className="w-5 h-5" />,
    description: 'تواصل مع الزملاء',
    children: [
      {
        id: 'forums',
        label: 'المنتديات',
        href: '/forums',
        icon: <MessageSquare className="w-4 h-4" />
      },
      {
        id: 'study-groups',
        label: 'مجموعات الدراسة',
        href: '/student/study-groups',
        icon: <Users className="w-4 h-4" />
      },
      {
        id: 'discussions',
        label: 'النقاشات',
        href: '/student/discussions',
        icon: <MessageSquare className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'schedule',
    label: 'الجدول الزمني',
    href: '/student/schedule',
    icon: <Calendar className="w-5 h-5" />,
    description: 'جدول دراستك'
  },
  {
    id: 'notes',
    label: 'الملاحظات',
    href: '/student/notes',
    icon: <FileText className="w-5 h-5" />,
    description: 'ملاحظاتك الدراسية'
  },
  {
    id: 'billing',
    label: 'الفواتير والدفع',
    href: '/student/billing',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'إدارة الاشتراكات',
    children: [
      {
        id: 'subscriptions',
        label: 'الاشتراكات',
        href: '/student/subscriptions',
        icon: <CreditCard className="w-4 h-4" />
      },
      {
        id: 'payment-history',
        label: 'سجل الدفعات',
        href: '/student/payment-history',
        icon: <FileText className="w-4 h-4" />
      },
      {
        id: 'invoices',
        label: 'الفواتير',
        href: '/student/invoices',
        icon: <FileText className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'profile',
    label: 'الملف الشخصي',
    href: '/student/profile',
    icon: <User className="w-5 h-5" />,
    description: 'إعدادات حسابك',
    children: [
      {
        id: 'personal-info',
        label: 'المعلومات الشخصية',
        href: '/student/profile/personal',
        icon: <User className="w-4 h-4" />
      },
      {
        id: 'account-settings',
        label: 'إعدادات الحساب',
        href: '/student/settings',
        icon: <Settings className="w-4 h-4" />
      },
      {
        id: 'notifications',
        label: 'الإشعارات',
        href: '/student/notifications',
        icon: <Bell className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'help',
    label: 'المساعدة',
    href: '/student/help',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'مركز المساعدة'
  }
];

export interface StudentSidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const StudentSidebar = React.forwardRef<HTMLDivElement, StudentSidebarProps>(
  ({ className, isCollapsed = false, onToggle, ...props }, ref) => {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['courses', 'progress', 'certificates']));

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
                <h2 className="font-semibold text-gray-900">لوحة الطالب</h2>
                <p className="text-xs text-gray-500 mt-1">إدارة تعلمك</p>
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
          {studentSidebarItems.map(item => renderSidebarItem(item))}
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

StudentSidebar.displayName = 'StudentSidebar';

export { StudentSidebar };
