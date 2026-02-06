'use client';

import { useState } from 'react';
import { BookOpen, Award, TrendingUp, Clock, PlayCircle, Star, Calendar, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@\/components\/ui\/Button';
import Tabs from '@/components/ui/Tabs';

const enrolledCourses = [
  {
    id: 1,
    title: 'احتراف React من الصفر إلى الاحتراف',
    instructor: 'أحمد محمد',
    progress: 72,
    lessons: '28/40',
    rating: 4.8
  },
  {
    id: 2,
    title: 'تحليل البيانات باستخدام Python',
    instructor: 'ليلى أحمد',
    progress: 45,
    lessons: '9/20',
    rating: 4.7
  }
];

const certificates = [
  { id: 1, title: 'أساسيات JavaScript', date: '2024-12-10' },
  { id: 2, title: 'تصميم UX المتقدم', date: '2025-01-05' }
];

const recommendations = [
  { id: 1, title: 'الذكاء الاصطناعي للمبتدئين', rating: 4.9 },
  { id: 2, title: 'Next.js المتقدم', rating: 4.8 }
];

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'نظرة عامة',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <div className="text-xl font-bold">12</div>
                <div className="text-sm text-gray-600">دورات مسجلة</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <Award size={24} />
              </div>
              <div>
                <div className="text-xl font-bold">6</div>
                <div className="text-sm text-gray-600">شهادات مكتملة</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <div className="text-xl font-bold">85%</div>
                <div className="text-sm text-gray-600">متوسط التقدم</div>
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
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <PlayCircle size={14} /> {course.lessons}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" /> {course.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-2">التقدم</div>
                  <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{course.progress}%</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'certificates',
      label: 'الشهادات',
      content: (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{cert.title}</h4>
                  <p className="text-sm text-gray-500">تم الإنجاز في {cert.date}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">تحميل</Button>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'recommendations',
      label: 'موصى به',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="p-5">
              <h4 className="font-bold text-gray-900 mb-2">{rec.title}</h4>
              <div className="text-sm text-gray-600 flex items-center gap-1 mb-4">
                <Star size={14} className="text-yellow-500" /> {rec.rating}
              </div>
              <Button variant="default" size="sm">تفاصيل</Button>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">لوحة الطالب</h1>
          <p className="text-gray-600">تابع تقدمك، شهاداتك، ودوراتك المسجلة.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600" />
              <div>
                <div className="text-lg font-bold">12.5 ساعة</div>
                <div className="text-sm text-gray-600">وقت التعلم هذا الأسبوع</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="text-green-600" />
              <div>
                <div className="text-lg font-bold">5 أيام متتالية</div>
                <div className="text-sm text-gray-600">سلسلة التعلم</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Award className="text-purple-600" />
              <div>
                <div className="text-lg font-bold">3 تحديات</div>
                <div className="text-sm text-gray-600">مكتملة هذا الشهر</div>
              </div>
            </div>
          </Card>
        </div>

        <Tabs tabs={tabs.map(tab => tab.label)} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </main>
  );
}

