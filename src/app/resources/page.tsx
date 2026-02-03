'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Zap, 
  Smartphone, 
  Mic, 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  Shield, 
  Star,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Resources() {
  const features = [
    {
      id: 'ai',
      title: 'الذكاء الاصطناعي',
      description: 'تعلم ذكي ومتكيف يتكيف مع سرعتك وأسلوب تعلمك',
      icon: Brain,
      color: 'blue',
      href: '/ai',
      features: [
        'توصيات ذكية للدورات',
        'تتبع التقدم الشخصي',
        'تحليل أداء المتعلم',
        'محتوى متكيف'
      ]
    },
    {
      id: 'adaptive',
      title: 'التعلم التكيفي',
      description: 'تعلم مخصص يناسب احتياجاتك وأهدافك المهنية',
      icon: Zap,
      color: 'purple',
      href: '/adaptive-learning',
      features: [
        'مسارات تعليمية مخصصة',
        'تقييم مستوى تلقائي',
        'تعديل الصعوبة ديناميكياً',
        'أهداف تعلم ذكية'
      ]
    },
    {
      id: 'mobile',
      title: 'التطبيقات',
      description: 'تطبيقات محمولة للتعلم في أي وقت ومكان',
      icon: Smartphone,
      color: 'green',
      href: '/mobile-experience',
      features: [
        'تطبيق iOS و Android',
        'تنزيل للمشاهدة بدون إنترنت',
        'مزامنة تلقائية',
        'إشعارات ذكية'
      ]
    },
    {
      id: 'voice',
      title: 'التنقل الصوتي',
      description: 'تحكم صوتي في المحتوى والتنقل بين الدروس',
      icon: Mic,
      color: 'orange',
      href: '/voice-navigation',
      features: [
        'أوامر صوتية باللغة العربية',
        'تحكم بدون استخدام اليدين',
        'بحث صوتي في المحتوى',
        'قراءة نصية تلقائية'
      ]
    },
    {
      id: 'accessibility',
      title: 'إمكانية الوصول',
      description: 'وصول للجميع بغض النظر عن القدرات أو الظروف',
      icon: Globe,
      color: 'indigo',
      href: '/accessibility',
      features: [
        'دعم كامل لذوي الإعاقة',
        'ترجمة فورية',
        'خطوط قابلة للتعديل',
        'وضع قراءة مريح'
      ]
    },
    {
      id: 'collaboration',
      title: 'التعاون',
      description: 'تعلم جماعي وتفاعلي مع زملائك ومدربيك',
      icon: Users,
      color: 'red',
      href: '/collaboration',
      features: [
        'مجموعات دراسة',
        'منتديات نقاش',
        'مشاريع جماعية',
        'مراجعة الأقران'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getButtonColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      green: 'bg-green-600 hover:bg-green-700',
      orange: 'bg-orange-600 hover:bg-orange-700',
      indigo: 'bg-indigo-600 hover:bg-indigo-700',
      red: 'bg-red-600 hover:bg-red-700'
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
              مميزات Lumo التعليمية
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              اكتشف أحدث التقنيات والمميزات التي تجعل تجربة التعلم فريدة ومميزة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                ابدأ التعلم الآن
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Award className="w-5 h-5" />
                استكشف الشهادات
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg border ${getColorClasses(feature.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {feature.features.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={feature.href}>
                  <Button 
                    variant="outline" 
                    className={`w-full ${getButtonColorClasses(feature.color)} text-white border-0 hover:opacity-90`}
                  >
                    تعرف على المزيد
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            جاهز لبدء رحلتك التعليمية؟
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب الذين يستفيدون من مميزات Lumo التعليمية المتقدمة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
              <Shield className="w-5 h-5 mr-2" />
              ابدأ مجاناً
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Globe className="w-5 h-5 mr-2" />
              جولة في المنصة
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50M+</div>
              <div className="text-gray-600">طالب حول العالم</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">6000+</div>
              <div className="text-gray-600">دورة تدريبية</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">180+</div>
              <div className="text-gray-600">دولة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
