'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  BookOpen,
  DollarSign,
  Settings,
  Shield,
  FileText,
  BarChart3,
  Activity,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Database,
  Globe,
  Lock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  Clock,
  TrendingUp,
  PieChart,
  Target,
  Award,
  MessageSquare,
  HelpCircle,
  CreditCard,
  ShoppingCart,
  GraduationCap,
  Briefcase,
  Building,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Cpu,
  HardDrive,
  Wifi,
  Smartphone,
  Monitor,
  FolderOpen
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

const adminSidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم',
    href: '/admin/dashboard',
    icon: <Home className="w-5 h-5" />,
    description: 'نظرة عامة على النظام'
  },
  {
    id: 'users',
    label: 'إدارة المستخدمين',
    href: '/admin/users',
    icon: <Users className="w-5 h-5" />,
    badge: '1,245',
    description: 'إدارة جميع المستخدمين',
    children: [
      {
        id: 'all-users',
        label: 'جميع المستخدمين',
        href: '/admin/users',
        icon: <Users className="w-4 h-4" />,
        badge: '1,245'
      },
      {
        id: 'students',
        label: 'الطلاب',
        href: '/admin/users/students',
        icon: <GraduationCap className="w-4 h-4" />,
        badge: '1,100'
      },
      {
        id: 'instructors',
        label: 'المدربون',
        href: '/admin/users/instructors',
        icon: <Award className="w-4 h-4" />,
        badge: '120'
      },
      {
        id: 'admins',
        label: 'المديرون',
        href: '/admin/users/admins',
        icon: <Shield className="w-4 h-4" />,
        badge: '25'
      },
      {
        id: 'user-roles',
        label: 'الأدوار والصلاحيات',
        href: '/admin/roles',
        icon: <Lock className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'courses',
    label: 'إدارة الدورات',
    href: '/admin/courses',
    icon: <BookOpen className="w-5 h-5" />,
    badge: '486',
    description: 'إدارة جميع الدورات',
    children: [
      {
        id: 'all-courses',
        label: 'جميع الدورات',
        href: '/admin/courses',
        icon: <BookOpen className="w-4 h-4" />,
        badge: '486'
      },
      {
        id: 'pending-courses',
        label: 'دورات معلقة',
        href: '/admin/courses/pending',
        icon: <Clock className="w-4 h-4" />,
        badge: '12'
      },
      {
        id: 'published-courses',
        label: 'دورات منشورة',
        href: '/admin/courses/published',
        icon: <CheckCircle className="w-4 h-4" />,
        badge: '450'
      },
      {
        id: 'rejected-courses',
        label: 'دورات مرفوضة',
        href: '/admin/courses/rejected',
        icon: <XCircle className="w-4 h-4" />,
        badge: '24'
      },
      {
        id: 'categories',
        label: 'الفئات',
        href: '/admin/courses/categories',
        icon: <FolderOpen className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'payments',
    label: 'إدارة المدفوعات',
    href: '/admin/payments',
    icon: <DollarSign className="w-5 h-5" />,
    badge: '$45.2K',
    description: 'إدارة المعاملات المالية',
    children: [
      {
        id: 'transactions',
        label: 'المعاملات',
        href: '/admin/payments/transactions',
        icon: <CreditCard className="w-4 h-4" />
      },
      {
        id: 'subscriptions',
        label: 'الاشتراكات',
        href: '/admin/payments/subscriptions',
        icon: <Calendar className="w-4 h-4" />
      },
      {
        id: 'refunds',
        label: 'المستردات',
        href: '/admin/payments/refunds',
        icon: <Download className="w-4 h-4" />
      },
      {
        id: 'payment-methods',
        label: 'طرق الدفع',
        href: '/admin/payments/methods',
        icon: <CreditCard className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'reports',
    label: 'التقارير',
    href: '/admin/reports',
    icon: <FileText className="w-5 h-5" />,
    description: 'تقارير النظام',
    children: [
      {
        id: 'user-reports',
        label: 'تقارير المستخدمين',
        href: '/admin/reports/users',
        icon: <Users className="w-4 h-4" />
      },
      {
        id: 'course-reports',
        label: 'تقارير الدورات',
        href: '/admin/reports/courses',
        icon: <BookOpen className="w-4 h-4" />
      },
      {
        id: 'financial-reports',
        label: 'التقارير المالية',
        href: '/admin/reports/financial',
        icon: <DollarSign className="w-4 h-4" />
      },
      {
        id: 'activity-reports',
        label: 'تقارير النشاط',
        href: '/admin/reports/activity',
        icon: <Activity className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'analytics',
    label: 'التحليلات',
    href: '/admin/analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'تحليلات متقدمة',
    children: [
      {
        id: 'dashboard-analytics',
        label: 'تحليلات لوحة التحكم',
        href: '/admin/analytics/dashboard',
        icon: <PieChart className="w-4 h-4" />
      },
      {
        id: 'user-analytics',
        label: 'تحليلات المستخدمين',
        href: '/admin/analytics/users',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        id: 'course-analytics',
        label: 'تحليلات الدورات',
        href: '/admin/analytics/courses',
        icon: <Target className="w-4 h-4" />
      },
      {
        id: 'revenue-analytics',
        label: 'تحليلات الإيرادات',
        href: '/admin/analytics/revenue',
        icon: <DollarSign className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'security',
    label: 'الأمان',
    href: '/admin/security',
    icon: <Shield className="w-5 h-5" />,
    description: 'أمان النظام',
    children: [
      {
        id: 'audit-log',
        label: 'سجل التدقيق',
        href: '/admin/audit-log',
        icon: <Eye className="w-4 h-4" />
      },
      {
        id: 'security-settings',
        label: 'إعدادات الأمان',
        href: '/admin/security/settings',
        icon: <Lock className="w-4 h-4" />
      },
      {
        id: 'access-control',
        label: 'التحكم في الوصول',
        href: '/admin/security/access',
        icon: <Shield className="w-4 h-4" />
      },
      {
        id: 'threat-monitoring',
        label: 'مراقبة التهديدات',
        href: '/admin/security/threats',
        icon: <AlertTriangle className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'system',
    label: 'إدارة النظام',
    href: '/admin/system',
    icon: <Cpu className="w-5 h-5" />,
    description: 'إعدادات النظام',
    children: [
      {
        id: 'system-settings',
        label: 'إعدادات النظام',
        href: '/admin/system/settings',
        icon: <Settings className="w-4 h-4" />
      },
      {
        id: 'database',
        label: 'قاعدة البيانات',
        href: '/admin/system/database',
        icon: <Database className="w-4 h-4" />
      },
      {
        id: 'performance',
        label: 'الأداء',
        href: '/admin/system/performance',
        icon: <Zap className="w-4 h-4" />
      },
      {
        id: 'storage',
        label: 'التخزين',
        href: '/admin/system/storage',
        icon: <HardDrive className="w-4 h-4" />
      },
      {
        id: 'backup',
        label: 'النسخ الاحتياطي',
        href: '/admin/system/backup',
        icon: <Download className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'content',
    label: 'إدارة المحتوى',
    href: '/admin/content',
    icon: <FileText className="w-5 h-5" />,
    description: 'إدارة المحتوى',
    children: [
      {
        id: 'pages',
        label: 'الصفحات',
        href: '/admin/content/pages',
        icon: <FileText className="w-4 h-4" />
      },
      {
        id: 'blog',
        label: 'المدونة',
        href: '/admin/content/blog',
        icon: <Edit className="w-4 h-4" />
      },
      {
        id: 'media',
        label: 'الوسائط',
        href: '/admin/content/media',
        icon: <Monitor className="w-4 h-4" />
      },
      {
        id: 'seo',
        label: 'تحسين محركات البحث',
        href: '/admin/content/seo',
        icon: <Globe className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'communication',
    label: 'التواصل',
    href: '/admin/communication',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'إدارة التواصل',
    children: [
      {
        id: 'notifications',
        label: 'الإشعارات',
        href: '/admin/notifications',
        icon: <Bell className="w-4 h-4" />
      },
      {
        id: 'emails',
        label: 'البريد الإلكتروني',
        href: '/admin/communication/emails',
        icon: <MessageSquare className="w-4 h-4" />
      },
      {
        id: 'announcements',
        label: 'الإعلانات',
        href: '/admin/communication/announcements',
        icon: <Bell className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'enterprise',
    label: 'الحلول المؤسسية',
    href: '/admin/enterprise',
    icon: <Building className="w-5 h-5" />,
    description: 'إدارة الشركات',
    children: [
      {
        id: 'organizations',
        label: 'المؤسسات',
        href: '/admin/enterprise/organizations',
        icon: <Building className="w-4 h-4" />
      },
      {
        id: 'corporate-accounts',
        label: 'حسابات الشركات',
        href: '/admin/enterprise/accounts',
        icon: <Briefcase className="w-4 h-4" />
      },
      {
        id: 'enterprise-analytics',
        label: 'تحليلات الشركات',
        href: '/admin/enterprise/analytics',
        icon: <BarChart3 className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'mobile',
    label: 'التطبيقات المحمولة',
    href: '/admin/mobile',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'إدارة التطبيقات',
    children: [
      {
        id: 'mobile-apps',
        label: 'تطبيقات الموبايل',
        href: '/admin/mobile/apps',
        icon: <Smartphone className="w-4 h-4" />
      },
      {
        id: 'push-notifications',
        label: 'الإشعارات المدفوعة',
        href: '/admin/mobile/push',
        icon: <Bell className="w-4 h-4" />
      },
      {
        id: 'mobile-analytics',
        label: 'تحليلات الموبايل',
        href: '/admin/mobile/analytics',
        icon: <BarChart3 className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'settings',
    label: 'الإعدادات',
    href: '/admin/settings',
    icon: <Settings className="w-5 h-5" />,
    description: 'إعدادات النظام'
  },
  {
    id: 'help',
    label: 'المساعدة',
    href: '/admin/help',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'مركز المساعدة للمديرين'
  }
];

export interface AdminSidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const AdminSidebar = React.forwardRef<HTMLDivElement, AdminSidebarProps>(
  ({ className, isCollapsed = false, onToggle, ...props }, ref) => {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['users', 'courses', 'payments']));

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
              isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : '',
              level > 0 ? 'mr-4' : '',
              isCollapsed ? 'justify-center' : ''
            )}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                toggleExpanded(item.id);
              }
            }}
          >
            <div className={cn('flex-shrink-0', isActive ? 'text-blue-600' : '')}>
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
          isCollapsed ? 'w-16' : 'w-80',
          className || ''
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-gray-900">لوحة المدير</h2>
                <p className="text-xs text-gray-500 mt-1">إدارة النظام</p>
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
          {adminSidebarItems.map(item => renderSidebarItem(item))}
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

AdminSidebar.displayName = 'AdminSidebar';

export { AdminSidebar };
