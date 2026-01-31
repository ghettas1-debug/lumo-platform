'use client';

import React from 'react';
import { 
  Brain, 
  Users, 
  Award, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  BookOpen, 
  Play, 
  BarChart3, 
  Settings, 
  Smartphone 
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: 'التعلم التكيفي',
      description: 'نظام ذكي يعتمد على AI لتخصيص محتوى التعلم حسب احتياجاتك ومستواك',
      href: '/adaptive-learning',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'مجتمع نشط',
      description: 'تواصل مع المتعلمين والمدربين من حول العالم وشارك الخبرات',
      href: '/course-community',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'شهادات معتمدة',
      description: 'احصل على شهادات معترف بها عالمياً بعد إكمال الدورات بنجاح',
      href: '/certificates',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Target,
      title: 'أهداف تعلم',
      description: 'حدد أهدافك التعليمية وتتبع تقدمك خطوة بخطوة',
      href: '/dashboard',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'تعلم سريع',
      description: 'تقنيات حديثة لتسريع عملية التعلم وزيادة الفعالية',
      href: '/features',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'أمان وخصوصية',
      description: 'حماية كاملة لبياناتك وخصوصية تامة في جميع التعاملات',
      href: '/security',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Globe,
      title: 'دولي',
      description: 'منصة عالمية تدعم لغات متعددة وثقافات مختلفة',
      href: '/universities',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: BookOpen,
      title: 'محتوى غني',
      description: 'آلاف الساعات من المحتوى التعليمي عالي الجودة',
      href: '/courses',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Play,
      title: 'فيديو عالي الجودة',
      description: 'محاضرات فيديو مسجلة بجودة عالية مع إمكانية التحميل',
      href: '/course-player',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: BarChart3,
      title: 'تحليلات متقدمة',
      description: 'تقارير مفصلة عن تقدمك وأدائك في جميع الدورات',
      href: '/analytics',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Settings,
      title: 'تخصيص كامل',
      description: 'تحكم كامل في إعدادات التعلم والواجهة والإشعارات',
      href: '/settings',
      color: 'from-gray-600 to-gray-700'
    },
    {
      icon: Smartphone,
      title: 'تطبيق موبايل',
      description: 'تعلم من أي مكان مع تطبيق الموبايل المتاح لنظامي iOS و Android',
      href: '/mobile-experience',
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              جميع ميزات Lumo
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              اكتشف جميع الأدوات والميزات المتقدمة التي تجعل من Lumo المنصة التعليمية الأفضل في العالم
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="p-6">
                    <div className={`w-16 h-16 bg-linear-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <span>استكشف الميزة</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            جاهز لبدء رحلتك التعليمية؟
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            انضم إلى آلاف المتعلمين واكتشف إمكانياتك مع Lumo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                ابدأ مجاناً
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                استكشف الدورات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
