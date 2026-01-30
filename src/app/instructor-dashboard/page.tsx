'use client';

import { useState } from 'react';
import { BookOpen, Users, DollarSign, TrendingUp, Plus, Star, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@\/components\/ui\/Button';
import Table from '@/components/ui/Table';
import Tabs from '@/components/ui/Tabs';

const courses = [
  { title: 'React المتقدم', students: 1240, rating: 4.8, revenue: '12,400$' },
  { title: 'Python من الصفر', students: 980, rating: 4.7, revenue: '9,200$' }
];

const messages = [
  { name: 'سارة', message: 'هل هناك واجبات جديدة؟' },
  { name: 'محمد', message: 'متى ينزل الدرس القادم؟' }
];

export default function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'نظرة عامة',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" />
              <div>
                <div className="text-xl font-bold">8</div>
                <div className="text-sm text-gray-600">دورات منشورة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Users className="text-green-600" />
              <div>
                <div className="text-xl font-bold">3,420</div>
                <div className="text-sm text-gray-600">طلاب مسجلون</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="text-purple-600" />
              <div>
                <div className="text-xl font-bold">$24,500</div>
                <div className="text-sm text-gray-600">إجمالي الأرباح</div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'courses',
      label: 'دوراتي',
      content: (
        <div className="space-y-4">
          {courses.map((course, index) => (
            <Card key={index} className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{course.title}</h3>
                <div className="text-sm text-gray-600 flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1"><Users size={14} /> {course.students}</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> {course.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">الأرباح</div>
                <div className="font-bold text-gray-900">{course.revenue}</div>
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'messages',
      label: 'رسائل الطلاب',
      content: (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <Card key={index} className="p-5 flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{msg.name}</h4>
                <p className="text-sm text-gray-600">{msg.message}</p>
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'analytics',
      label: 'التحليلات',
      content: (
        <Table
          headers={['الدورة', 'الطلاب', 'التقييم', 'الأرباح']}
          rows={courses.map((course) => [
            course.title,
            course.students,
            <span className="text-yellow-600">{course.rating}</span>,
            course.revenue
          ])}
        />
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">لوحة المدرس</h1>
            <p className="text-gray-600">إدارة الدورات والطلاب والتحليلات.</p>
          </div>
          <Button variant="primary" size="md" className="gap-2">
            <Plus size={16} /> إنشاء دورة
          </Button>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-blue-600" />
              <div>
                <div className="text-lg font-bold">+18%</div>
                <div className="text-sm text-gray-600">نمو هذا الشهر</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

