'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Heart, 
  Bell, 
  Settings, 
  FileText, 
  User, 
  CreditCard, 
  Download,
  Package,
  Bookmark,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Tools() {
  const tools = [
    {
      id: 'cart',
      title: 'سلة التسوق',
      description: 'دوراتك المختارة للشراء',
      icon: ShoppingCart,
      color: 'blue',
      href: '/cart',
      features: [
        'إضافة وإزالة الدورات',
        'حساب الإجمالي تلقائي',
        'تطبيقات الخصومات',
        'حفظ للشراء لاحقاً',
        'مقارنة الدورات',
        'توصيات ذكية'
      ],
      action: 'عرض السلة'
    },
    {
      id: 'wishlist',
      title: 'قائمة الرغبات',
      description: 'دورات محفوظة للدراسة مستقبلاً',
      icon: Heart,
      color: 'red',
      href: '/wishlist',
      features: [
        'حفظ الدورات المفضلة',
        'تنبيهات عند الخصومات',
        'مشاركة القائمة',
        'تصنيف حسب الفئة',
        'تتبع الأسعار',
        'توصيات مخصصة'
      ],
      action: 'عرض الرغبات'
    },
    {
      id: 'notifications',
      title: 'الإشعارات',
      description: 'آخر التحديثات والأخبار المهمة',
      icon: Bell,
      color: 'purple',
      href: '/notifications',
      features: [
        'إشعارات الدورات الجديدة',
        'تذكيرات بالمواعيد',
        'تحديثات التقدم',
        'عروض خاصة',
        'رسائل من المدربين',
        'تحكم في الإشعارات'
      ],
      action: 'عرض الإشعارات'
    },
    {
      id: 'settings',
      title: 'الإعدادات',
      description: 'إعدادات الحساب والتفضيلات الشخصية',
      icon: Settings,
      color: 'green',
      href: '/settings',
      features: [
        'الملف الشخصي',
        'الخصوصية والأمان',
        'التفضيلات اللغوية',
        'إعدادات الإشعارات',
        'الطرق الدفع',
        'الاشتراكات'
      ],
      action: 'الإعدادات'
    },
    {
      id: 'billing',
      title: 'الفواتير',
      description: 'إدارة الفواتير والمدفوعات',
      icon: FileText,
      color: 'orange',
      href: '/billing',
      features: [
        'عرض الفواتير',
        'تحميل الإيصالات',
        'طرق الدفع',
        'تاريخ المدفوعات',
        'الاشتراكات النشطة',
        'إلغاء الاشتراكات'
      ],
      action: 'عرض الفواتير'
    },
    {
      id: 'profile',
      title: 'الملف الشخصي',
      description: 'معلوماتك وإنجازاتك',
      icon: User,
      color: 'indigo',
      href: '/profile',
      features: [
        'المعلومات الشخصية',
        'الصورة الرمزية',
        'السيرة الذاتية',
        'الشهادات والمهارات',
        'الإنجازات',
        'النشاط الأخير'
      ],
      action: 'عرض الملف'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getButtonColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      red: 'bg-red-600 hover:bg-red-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      green: 'bg-green-600 hover:bg-green-700',
      orange: 'bg-orange-600 hover:bg-orange-700',
      indigo: 'bg-indigo-600 hover:bg-indigo-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              أدوات Lumo التعليمية
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              كل ما تحتاجه لإدارة تجربة التعلم الخاصة بك في مكان واحد
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Zap className="w-5 h-5" />
                ابدأ الآن
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Shield className="w-5 h-5" />
                استكشف المميزات
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg border ${getColorClasses(tool.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {tool.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={tool.href}>
                  <Button 
                    className={`w-full ${getButtonColorClasses(tool.color)} text-white border-0 hover:opacity-90`}
                  >
                    {tool.action}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              أدوات قوية لتجربة تعليمية أفضل
            </h2>
            <p className="text-xl text-gray-600">
              كل ما تحتاجه لتنظيم وتحسين رحلتك التعليمية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">6+</div>
              <div className="text-gray-600">أدوات متكاملة</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">مجانية</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">متاحة</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">5★</div>
              <div className="text-gray-600">تقييم</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            جاهز لاستخدام جميع الأدوات؟
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب الذين يستفيدون من أدوات Lumo التعليمية المتقدمة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
              <TrendingUp className="w-5 h-5 mr-2" />
              ابدأ مجاناً
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Clock className="w-5 h-5 mr-2" />
              جولة في الأدوات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
