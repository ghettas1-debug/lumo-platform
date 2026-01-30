'use client';

import { useState } from 'react';
import { Target, BookOpen, CheckCircle, Clock, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@\/components\/ui\/Button';
import Stepper from '@/components/ui/Stepper';
import Tabs from '@/components/ui/Tabs';

const steps = [
  { label: 'البداية' },
  { label: 'التأسيس' },
  { label: 'التطبيق' },
  { label: 'الاحتراف' }
];

const modules = [
  { title: 'أساسيات البرمجة', lessons: 12, duration: '6 ساعات', completed: true },
  { title: 'مشاريع عملية', lessons: 8, duration: '4 ساعات', completed: false },
  { title: 'التحسين والتقييم', lessons: 6, duration: '3 ساعات', completed: false }
];

export default function LearningPathPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'نظرة عامة',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Target className="text-blue-600" />
              <div>
                <div className="text-xl font-bold">مسار مطور الويب</div>
                <div className="text-sm text-gray-600">12 دورة • 48 ساعة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="text-green-600" />
              <div>
                <div className="text-xl font-bold">65%</div>
                <div className="text-sm text-gray-600">تقدم المسار</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500" />
              <div>
                <div className="text-xl font-bold">4.8</div>
                <div className="text-sm text-gray-600">تقييم المسار</div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'modules',
      label: 'الوحدات',
      content: (
        <div className="space-y-4">
          {modules.map((module, index) => (
            <Card key={index} className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{module.title}</h3>
                <div className="text-sm text-gray-600 flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1"><BookOpen size={14} /> {module.lessons} درس</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {module.duration}</span>
                </div>
              </div>
              {module.completed ? (
                <span className="text-green-600 flex items-center gap-1 text-sm"><CheckCircle size={16} /> مكتمل</span>
              ) : (
                <Button variant="outline" size="sm">ابدأ الوحدة</Button>
              )}
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'milestones',
      label: 'المراحل',
      content: (
        <div className="space-y-6">
          <Stepper steps={steps} currentStep={1} />
          <Card className="p-6">
            <h3 className="font-bold mb-2">مرحلة التأسيس</h3>
            <p className="text-gray-600 text-sm">تعلم الأساسيات ثم طبّق بمشاريع صغيرة.</p>
          </Card>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">مسار تعلم</h1>
          <p className="text-gray-600">رحلة تعليمية متكاملة خطوة بخطوة.</p>
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </main>
  );
}

