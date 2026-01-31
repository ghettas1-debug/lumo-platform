'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  Award, 
  Target, 
  Brain, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: BookOpen,
    title: 'دورات تفاعلية',
    description: 'تعلم بالتجربة مع دورات عملية ومشاريع واقعية',
    href: '/courses',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    title: 'مجتمع نشط',
    description: 'تواصل مع المتعلمين والمدربين من حول العالم',
    href: '/course-community',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Award,
    title: 'شهادات معتمدة',
    description: 'احصل على شهادات معترف بها عالمياً',
    href: '/certificates',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Target,
    title: 'تعلم مخصص',
    description: 'مسارات تعلم مصممة خصيصاً لك',
    href: '/dashboard',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Brain,
    title: 'ذكاء اصطناعي',
    description: 'مساعد ذكي يرشدك في رحلتك التعليمية',
    href: '/adaptive-learning',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Zap,
    title: 'تعلم سريع',
    description: 'تقنيات حديثة لتسريع عملية التعلم',
    href: '/features',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Zap className="w-4 h-4" />
            ميزات متقدمة
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            لماذا تختار Lumo؟
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            منصة متكاملة تجمع بين التعليم الجيد والتكنولوجيا المتقدمة لتجربة تعلم فريدة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} href={feature.href}>
                <Card 
                  variant="elevated" 
                  hover={true}
                  interactive={true}
                  className="h-full"
                >
                  <div className={`w-16 h-16 bg-linear-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span>اكتشف المزيد</span>
                    <ArrowRight size={16} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            جاهز لبدء رحلتك التعليمية؟
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            انضم إلى آلاف المتعلمين واكتشف إمكانياتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all">
                ابدأ مجاناً
              </button>
            </Link>
            <Link href="/features">
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all">
                جميع الميزات
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
