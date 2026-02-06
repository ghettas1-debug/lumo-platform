"use client";

import { useState } from 'react';
import { PlayCircle, Clock, Users, Star, BookOpen, Award, Download, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// بيانات وهمية للكورس
const courseData = {
  1: {
    id: 1,
    title: 'احتراف Python 2026',
    description: 'دورة شاملة لتعلم برمجة بايثون من الصفر إلى الاحتراف. سنتعلم أساسيات البرمجة، هياكل البيانات، البرمجة الكائنية، تطوير الويب، تحليل البيانات، والذكاء الاصطناعي.',
    instructor: 'أحمد محمود',
    instructorBio: 'مطور برمجيات بخبرة 10 سنوات في تطوير تطبيقات الويب والذكاء الاصطناعي',
    rating: 4.9,
    students: 12500,
    duration: '18 ساعة',
    level: 'متوسط',
    category: 'البرمجة',
    price: 0,
    language: 'العربية',
    certificate: true,
    topics: [
      'مقدمة في بايثون',
      'المتغيرات وأنواع البيانات',
      'التحكم في التدفق',
      'الدوال والوحدات',
      'البرمجة الكائنية',
      'التعامل مع الملفات',
      'تطوير الويب مع Django',
      'تحليل البيانات مع Pandas'
    ],
    requirements: [
      'لا توجد متطلبات سابقة',
      'حاسوب مع اتصال بالإنترنت',
      'رغبة في التعلم'
    ]
  }
};

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const params = useParams();
  const courseId = params.id as string;
  const course = courseData[parseInt(courseId) as keyof typeof courseData] || courseData[1];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">الكورس غير موجود</h1>
          <p className="text-gray-600">عذراً، الكورس الذي تبحث عنه غير متوفر.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="mb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {course.category}
                  </span>
                </div>
                <h1 className="text-4xl font-black mb-4">{course.title}</h1>
                <p className="text-xl opacity-90 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400" size={20} fill="currentColor" />
                    <span className="font-bold">{course.rating}</span>
                    <span className="opacity-75" suppressHydrationWarning>({course.students.toLocaleString('en-US')} طالب)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={20} />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={20} />
                    <span>{course.language}</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <Card className="p-6">
                  <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                    <PlayCircle className="text-white/50" size={80} />
                  </div>
                  
                  <div className="text-center mb-6">
                    {course.price === 0 ? (
                      <div>
                        <span className="text-3xl font-black text-green-600">مجاني</span>
                        <p className="text-gray-500 text-sm mt-1">دورة مجانية بالكامل</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-3xl font-black">${course.price}</span>
                        <p className="text-gray-500 text-sm mt-1">دفع لمرة واحدة</p>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="default" size="lg" className="w-full mb-3">
                    ابدأ التعلم الآن
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Share2 size={16} className="ml-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download size={16} className="ml-2" />
                      تحميل
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-8 mb-8 border-b border-gray-200">
            {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-bold transition-all ${
                  activeTab === tab 
                    ? 'border-b-4 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'curriculum' && 'المنهج'}
                {tab === 'instructor' && 'المدرب'}
                {tab === 'reviews' && 'التقييمات'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <Card>
                <h2 className="text-2xl font-bold mb-4">ماذا ستتعلم في هذه الدورة؟</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {course.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-bold mb-4">المتطلبات</h2>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm">
                        •
                      </div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {course.certificate && (
                <Card>
                  <div className="flex items-center gap-4">
                    <Award className="text-blue-600" size={48} />
                    <div>
                      <h3 className="text-xl font-bold mb-2">شهادة إتمام</h3>
                      <p className="text-gray-600">احصل على شهادة معتمدة عند إكمال الدورة بنجاح</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'curriculum' && (
            <Card>
              <h2 className="text-2xl font-bold mb-6">منهج الدورة</h2>
              <div className="space-y-4">
                {course.topics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{topic}</span>
                    </div>
                    <PlayCircle className="text-gray-400" size={20} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'instructor' && (
            <Card>
              <h2 className="text-2xl font-bold mb-6">مدرب الدورة</h2>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-linear-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {course.instructor.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                  <p className="text-gray-600 mb-4">{course.instructorBio}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-500" size={16} fill="currentColor" />
                      <span>4.9 تقييم</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>12,500 طالب</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>8 دورات</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'reviews' && (
            <Card>
              <h2 className="text-2xl font-bold mb-6">تقييمات الطلاب</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="font-bold">طالب {review}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-yellow-500" size={14} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      دورة رائعة ومفيدة جداً. الشرح واضح ومنظم. أنصح بها بشدة لكل من يريد تعلم البرمجة.
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
