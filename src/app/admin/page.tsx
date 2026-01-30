"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  TrendingUp, 
  Settings, 
  Shield, 
  FileText, 
  AlertCircle,
  BarChart3,
  DollarSign,
  UserCheck,
  Video,
  Award,
  Clock
} from 'lucide-react';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview');

  // بيانات وهمية للإحصائيات
  const stats = {
    users: {
      total: 125430,
      active: 89234,
      new: 2341,
      growth: 12.5
    },
    courses: {
      total: 1250,
      published: 1180,
      draft: 70,
      revenue: 2345678
    },
    revenue: {
      monthly: 456789,
      yearly: 5481468,
      growth: 23.4,
      subscriptions: 12345
    },
    system: {
      uptime: 99.9,
      responseTime: 234,
      errors: 12,
      storage: 67.8
    }
  };

  const adminSections = [
    {
      id: 'overview',
      title: 'نظرة عامة',
      icon: BarChart3,
      description: 'إحصائيات ومؤشرات الأداء الرئيسية'
    },
    {
      id: 'users',
      title: 'إدارة المستخدمين',
      icon: Users,
      href: '/admin/users',
      description: 'إدارة حسابات المستخدمين والصلاحيات'
    },
    {
      id: 'courses',
      title: 'إدارة الدورات',
      icon: BookOpen,
      href: '/admin/courses',
      description: 'إدارة المحتوى التعليمي والدورات'
    },
    {
      id: 'payments',
      title: 'إدارة المدفوعات',
      icon: CreditCard,
      href: '/admin/payments',
      description: 'مراقبة المعاملات المالية والإيرادات'
    },
    {
      id: 'reports',
      title: 'التقارير',
      icon: FileText,
      href: '/admin/reports',
      description: 'تقارير مفصلة وتحليلات متقدمة'
    },
    {
      id: 'roles',
      title: 'الصلاحيات',
      icon: Shield,
      href: '/admin/roles',
      description: 'إدارة الأدوار والصلاحيات'
    },
    {
      id: 'security',
      title: 'الأمان',
      icon: AlertCircle,
      href: '/admin/security',
      description: 'إعدادات الأمان وحماية البيانات'
    },
    {
      id: 'settings',
      title: 'الإعدادات',
      icon: Settings,
      href: '/admin/settings',
      description: 'إعدادات النظام والتكوين'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'user', message: 'مستخدم جديد: أحمد محمد', time: '2 دقيقة', icon: UserCheck },
    { id: 2, type: 'course', message: 'دورة جديدة: Python المتقدم', time: '15 دقيقة', icon: Video },
    { id: 3, type: 'payment', message: 'دفع جديد: $99.99', time: '1 ساعة', icon: DollarSign },
    { id: 4, type: 'certificate', message: 'شهادة جديدة: React.js', time: '2 ساعة', icon: Award },
    { id: 5, type: 'system', message: 'تحديث النظام: v2.1.0', time: '3 ساعات', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">لوحة الإدارة</h1>
                <p className="text-sm text-gray-500">منصة Lumo التعليمية</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 ml-2" />
                آخر تحديث: الآن
              </Button>
              <Button size="sm">
                <Settings className="w-4 h-4 ml-2" />
                الإعدادات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">الأقسام</h3>
              <nav className="space-y-2">
                {adminSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.id}>
                      {section.href ? (
                        <Link href={section.href}>
                          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{section.title}</div>
                              <div className="text-xs text-gray-500">{section.description}</div>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div
                          onClick={() => setActiveSection(section.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            activeSection === section.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <div className="flex-1">
                            <div className="font-medium">{section.title}</div>
                            <div className="text-xs opacity-75">{section.description}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-xs text-green-600 font-medium">+{stats.users.growth}%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.users.total.toLocaleString()}</div>
                <div className="text-sm text-gray-600">إجمالي المستخدمين</div>
                <div className="text-xs text-gray-500 mt-1">{stats.users.active.toLocaleString()} نشط</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+23</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.courses.total}</div>
                <div className="text-sm text-gray-600">إجمالي الدورات</div>
                <div className="text-xs text-gray-500 mt-1">{stats.courses.published} منشورة</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                  <span className="text-xs text-green-600 font-medium">+{stats.revenue.growth}%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">${stats.revenue.monthly.toLocaleString()}</div>
                <div className="text-sm text-gray-600">إيرادات شهرية</div>
                <div className="text-xs text-gray-500 mt-1">{stats.revenue.subscriptions} مشترك</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                  <span className="text-xs text-green-600 font-medium">{stats.system.uptime}%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.system.responseTime}ms</div>
                <div className="text-sm text-gray-600">وقت الاستجابة</div>
                <div className="text-xs text-gray-500 mt-1">{stats.system.errors} خطأ</div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">النشاط الأخير</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{activity.message}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <Users className="w-4 h-4 ml-2" />
                  إضافة مستخدم
                </Button>
                <Button variant="outline" className="justify-start">
                  <BookOpen className="w-4 h-4 ml-2" />
                  إنشاء دورة
                </Button>
                <Button variant="outline" className="justify-start">
                  <CreditCard className="w-4 h-4 ml-2" />
                  عرض المدفوعات
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="w-4 h-4 ml-2" />
                  إنشاء تقرير
                </Button>
                <Button variant="outline" className="justify-start">
                  <Shield className="w-4 h-4 ml-2" />
                  فحص الأمان
                </Button>
                <Button variant="outline" className="justify-start">
                  <Settings className="w-4 h-4 ml-2" />
                  إعدادات النظام
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
