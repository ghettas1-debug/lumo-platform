'use client';

import Link from 'next/link';
import { Award, Target, Users, Settings, Sparkles, Smartphone, BookOpen, PlayCircle, Search } from 'lucide-react';
import Card from '@/components/ui/Card';

const guideSections = [
  {
    title: 'تجربة الدورة',
    items: [
      { label: 'صفحة الدورة الاحترافية', href: '/courses/1', icon: BookOpen },
      { label: 'عناصر الثقة', href: '/trust', icon: Award }
    ]
  },
  {
    title: 'رحلة الطالب',
    items: [
      { label: 'مسار تعلم واضح', href: '/learning-path', icon: Target },
      { label: 'لوحة الطالب', href: '/student', icon: Users }
    ]
  },
  {
    title: 'تجربة المدرس',
    items: [
      { label: 'لوحة المدرس', href: '/instructor-dashboard', icon: Users },
      { label: 'إدارة المحتوى', href: '/content-management', icon: Settings }
    ]
  },
  {
    title: 'نظام التصميم',
    items: [
      { label: 'Design System', href: '/design-system', icon: Sparkles }
    ]
  },
  {
    title: 'التفاعل أثناء التعلم',
    items: [
      { label: 'مشغل التعلم', href: '/course-player', icon: PlayCircle },
      { label: 'اختبارات سريعة', href: '/quiz', icon: BookOpen }
    ]
  },
  {
    title: 'البحث والاكتشاف',
    items: [
      { label: 'البحث المتقدم', href: '/search', icon: Search }
    ]
  },
  {
    title: 'الجوال والأداء',
    items: [
      { label: 'تجربة الجوال', href: '/mobile-experience', icon: Smartphone },
      { label: 'تفاصيل دقيقة', href: '/polish', icon: Sparkles }
    ]
  }
];

export default function PlatformGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">دليل منصة Lumo</h1>
          <p className="text-gray-600">كل الروابط المهمة للميزات المتقدمة في مكان واحد.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {guideSections.map((section) => (
            <Card key={section.title} className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
