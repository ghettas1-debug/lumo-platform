'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Star, 
  MessageSquare,
  Search,
  Filter,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/atoms/Badge';

const stats = [
  { 
    label: 'إجمالي الأرباح', 
    value: '$24,500', 
    icon: DollarSign, 
    trend: '+12%', 
    trendUp: true,
    description: 'مقارنة بالشهر الماضي',
    color: 'text-green-600', 
    bg: 'bg-green-100' 
  },
  { 
    label: 'الطلاب المسجلين', 
    value: '3,420', 
    icon: Users, 
    trend: '+5%', 
    trendUp: true,
    description: 'مقارنة بالشهر الماضي',
    color: 'text-blue-600', 
    bg: 'bg-blue-100' 
  },
  { 
    label: 'الدورات النشطة', 
    value: '8', 
    icon: BookOpen, 
    trend: '0', 
    trendUp: true,
    description: 'لا تغيير',
    color: 'text-purple-600', 
    bg: 'bg-purple-100' 
  },
  { 
    label: 'متوسط التقييم', 
    value: '4.8', 
    icon: Star, 
    trend: '+0.2', 
    trendUp: true,
    description: 'تحسن ملحوظ',
    color: 'text-yellow-600', 
    bg: 'bg-yellow-100' 
  },
];

const courses = [
  { 
    id: 1,
    title: 'React المتقدم: بناء تطبيقات ضخمة', 
    students: 1240, 
    rating: 4.8, 
    revenue: '12,400$', 
    status: 'published',
    lastUpdated: 'منذ يومين'
  },
  { 
    id: 2,
    title: 'Python من الصفر إلى الاحتراف', 
    students: 980, 
    rating: 4.7, 
    revenue: '9,200$', 
    status: 'published',
    lastUpdated: 'منذ أسبوع'
  },
  { 
    id: 3,
    title: 'أساسيات تصميم واجهة المستخدم UI/UX', 
    students: 450, 
    rating: 4.9, 
    revenue: '2,900$', 
    status: 'draft',
    lastUpdated: 'منذ 3 أيام'
  }
];

const messages = [
  { id: 1, name: 'سارة أحمد', message: 'هل هناك واجبات جديدة لهذا الأسبوع؟', time: 'منذ 2 ساعة', course: 'React المتقدم' },
  { id: 2, name: 'محمد علي', message: 'متى ينزل الدرس القادم؟', time: 'منذ 5 ساعات', course: 'Python من الصفر' },
  { id: 3, name: 'خالد عمر', message: 'شكراً لك على الشرح الرائع!', time: 'منذ يوم', course: 'React المتقدم' },
];

export default function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'نظرة عامة',
      content: (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                    {stat.trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Courses */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-900">أفضل الدورات أداءً</h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">عرض الكل</Button>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {courses.slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            <BookOpen size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1"><Users size={14} /> {course.students} طالب</span>
                              <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> {course.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-gray-900">{course.revenue}</div>
                          <Badge variant={course.status === 'published' ? 'success' : 'secondary'} className="mt-1">
                            {course.status === 'published' ? 'منشور' : 'مسودة'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Messages */}
            <div>
              <Card className="h-full">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-900">آخر الرسائل</h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">عرض الكل</Button>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                          {msg.name[0]}
                        </div>
                        <div>
                          <div className="flex justify-between items-start w-full">
                            <h4 className="font-bold text-sm text-gray-900">{msg.name}</h4>
                            <span className="text-xs text-gray-400">{msg.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{msg.message}</p>
                          <p className="text-xs text-blue-500 mt-1">{msg.course}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'courses',
      label: 'دوراتي',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="بحث عن دورة..." 
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter size={18} /> تصفية
              </Button>
              <Link href="/instructor-dashboard/create-course">
                <Button variant="primary" className="gap-2">
                  <Plus size={18} /> دورة جديدة
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="h-40 bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <BookOpen size={48} />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={course.status === 'published' ? 'success' : 'secondary'}>
                      {course.status === 'published' ? 'منشور' : 'مسودة'}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock size={14} /> {course.lastUpdated}</span>
                    <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> {course.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500">الأرباح</div>
                      <div className="font-bold text-gray-900">{course.revenue}</div>
                    </div>
                    <Button variant="ghost" size="sm">إدارة</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      label: 'التحليلات',
      content: (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-gray-900">نظرة عامة على الأرباح</h3>
              <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
                <option>آخر 30 يوم</option>
                <option>آخر 6 أشهر</option>
                <option>هذا العام</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {[65, 45, 75, 50, 80, 60, 90, 70, 85, 65, 95, 80].map((height, i) => (
                <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-lg transition-all duration-500 group-hover:bg-blue-700"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-500 px-4">
              <span>يناير</span>
              <span>فبراير</span>
              <span>مارس</span>
              <span>أبريل</span>
              <span>مايو</span>
              <span>يونيو</span>
              <span>يوليو</span>
              <span>أغسطس</span>
              <span>سبتمبر</span>
              <span>أكتوبر</span>
              <span>نوفمبر</span>
              <span>ديسمبر</span>
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">لوحة التحكم</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar size={16} />
              {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <BarChart3 size={18} /> تقرير مفصل
            </Button>
            <Link href="/instructor-dashboard/create-course">
              <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-600/20">
                <Plus size={18} /> إنشاء دورة جديدة
              </Button>
            </Link>
          </div>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </main>
  );
}
