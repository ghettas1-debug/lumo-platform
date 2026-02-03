'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Award, 
  Shield, 
  BookOpen, 
  ShoppingCart, 
  HelpCircle
} from 'lucide-react';

export default function QuickAccessBar() {
  const quickAccess = [
    {
      title: 'لوحة الطالب',
      href: '/student/dashboard',
      icon: Users,
      color: 'blue',
      description: 'لوحة تحكم الطالب'
    },
    {
      title: 'لوحة المدرب',
      href: '/instructor-dashboard',
      icon: Award,
      color: 'purple',
      description: 'لوحة تحكم المدرب'
    },
    {
      title: 'لوحة المدير',
      href: '/admin',
      icon: Shield,
      color: 'red',
      description: 'لوحة تحكم المدير'
    },
    {
      title: 'جميع الدورات',
      href: '/courses',
      icon: BookOpen,
      color: 'green',
      description: 'استكشف جميع الدورات'
    },
    {
      title: 'سلة التسوق',
      href: '/cart',
      icon: ShoppingCart,
      color: 'yellow',
      description: 'دوراتك المختارة'
    },
    {
      title: 'المساعدة',
      href: '/help',
      icon: HelpCircle,
      color: 'indigo',
      description: 'مركز المساعدة'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 hover:from-blue-200 hover:to-blue-300 border-2 border-blue-300',
      purple: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 hover:from-purple-200 hover:to-purple-300 border-2 border-purple-300',
      red: 'bg-gradient-to-br from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300 border-2 border-red-300',
      green: 'bg-gradient-to-br from-green-100 to-green-200 text-green-600 hover:from-green-200 hover:to-green-300 border-2 border-green-300',
      yellow: 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 hover:from-yellow-200 hover:to-yellow-300 border-2 border-yellow-300',
      indigo: 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 hover:from-indigo-200 hover:to-indigo-300 border-2 border-indigo-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            الوصول السريع
          </h2>
          <p className="text-gray-600">
            أهم الخدمات المتاحة بنقرة واحدة
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickAccess.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 text-center bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-300 hover:border-blue-400"
              >
                <div className={`p-3 rounded-lg ${getColorClasses(item.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-900">{item.title}</span>
                <span className="text-xs text-gray-500">{item.description}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
