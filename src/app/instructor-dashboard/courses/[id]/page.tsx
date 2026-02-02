'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Users,
  Star,
  Clock,
  BookOpen,
  Play,
  FileText,
  Award,
  TrendingUp,
  DollarSign,
  Eye,
  MessageSquare,
  Settings,
  Download,
  Share2,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/atoms/Badge';

// Mock course data - in real app, this would come from API
const mockCourseData = {
  id: '1',
  title: 'React المتقدم',
  description: 'دورة شاملة لتعلم React المتقدم مع أحدث التقنيات والأفضل الممارسات',
  category: 'تطوير الويب',
  level: 'متقدم',
  language: 'العربية',
  price: 99.99,
  duration: '8 ساعات',
  students: 1240,
  rating: 4.8,
  reviews: 245,
  status: 'published',
  thumbnail: '/images/courses/react-advanced.jpg',
  previewVideo: '/videos/react-preview.mp4',
  requirements: [
    'معرفة أساسيات JavaScript',
    'فهم أساسيات React',
    'خبرة في تطوير الويب'
  ],
  objectives: [
    'إتقان React Hooks',
    'بناء تطبيقات متقدمة',
    'فهم أداء التطبيقات',
    'التعامل مع state management'
  ],
  tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
  revenue: '12,400$',
  enrollmentRate: '+15%',
  completionRate: '78%',
  createdAt: '2024-01-15',
  updatedAt: '2024-02-01'
};

const mockLessons = [
  {
    id: '1',
    title: 'مقدمة في React المتقدم',
    duration: '15 دقيقة',
    type: 'video',
    status: 'published',
    order: 1
  },
  {
    id: '2',
    title: 'React Hooks المتقدمة',
    duration: '45 دقيقة',
    type: 'video',
    status: 'published',
    order: 2
  },
  {
    id: '3',
    title: 'State Management',
    duration: '60 دقيقة',
    type: 'video',
    status: 'published',
    order: 3
  },
  {
    id: '4',
    title: 'مشروع عملي',
    duration: '120 دقيقة',
    type: 'project',
    status: 'draft',
    order: 4
  }
];

const mockReviews = [
  {
    id: '1',
    studentName: 'أحمد محمد',
    rating: 5,
    comment: 'دورة ممتازة جداً والشرح واضح ومفصل',
    date: '2024-01-20'
  },
  {
    id: '2',
    studentName: 'سارة أحمد',
    rating: 4,
    comment: 'محتوى رائع ولكن أتمنى المزيد من الأمثلة العملية',
    date: '2024-01-18'
  }
];

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const courseId = params.id as string;
  const course = mockCourseData; // In real app: fetch course data

  const tabs = [
    {
      id: 'overview',
      label: 'نظرة عامة',
      content: (
        <div className="space-y-6">
          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-lg font-bold">{course.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">طلاب</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-lg font-bold">{course.rating}</div>
                  <div className="text-sm text-gray-600">تقييم</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-lg font-bold">{course.revenue}</div>
                  <div className="text-sm text-gray-600">إيرادات</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-lg font-bold">{course.enrollmentRate}</div>
                  <div className="text-sm text-gray-600">نمو التسجيل</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Course Description */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">وصف الدورة</h3>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </Card>

          {/* Requirements and Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">المتطلبات</h3>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">الأهداف</h3>
              <ul className="space-y-2">
                {course.objectives.map((obj, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'content',
      label: 'المحتوى',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">دروس الدورة</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة درس
            </Button>
          </div>

          {mockLessons.map((lesson) => (
            <Card key={lesson.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    {lesson.type === 'video' ? (
                      <Play className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{lesson.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      <Badge variant={lesson.status === 'published' ? 'success' : 'secondary'}>
                        {lesson.status === 'published' ? 'منشور' : 'مسودة'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'students',
      label: 'الطلاب',
      content: (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">الطلاب المسجلون</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              تصدير القائمة
            </Button>
          </div>
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>قائمة الطلاب ستظهر هنا</p>
          </div>
        </Card>
      )
    },
    {
      id: 'analytics',
      label: 'التحليلات',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-lg font-bold">{course.enrollmentRate}</div>
                  <div className="text-sm text-gray-600">معدل التسجيل</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-lg font-bold">{course.completionRate}</div>
                  <div className="text-sm text-gray-600">معدل الإنجاز</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-lg font-bold">{course.reviews}</div>
                  <div className="text-sm text-gray-600">التقييمات</div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">مراجعات الطلاب</h3>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{review.studentName}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'settings',
      label: 'الإعدادات',
      content: (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">إعدادات الدورة</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">حالة الدورة</h4>
                  <p className="text-sm text-gray-500">تحكم في ظهور الدورة للطلاب</p>
                </div>
                <Badge variant={course.status === 'published' ? 'success' : 'secondary'}>
                  {course.status === 'published' ? 'منشورة' : 'مسودة'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">الشهادات</h4>
                  <p className="text-sm text-gray-500">توفير شهادة عند إكمال الدورة</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">التعليقات</h4>
                  <p className="text-sm text-gray-500">السماح للطلاب بالتعليق</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                </button>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              تصدير البيانات
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              مشاركة الرابط
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700 gap-2">
              <Trash2 className="w-4 h-4" />
              حذف الدورة
            </Button>
          </div>
        </div>
      )
    }
  ];

  const handleDeleteCourse = async () => {
    // In real app, call API to delete course
    console.log('Deleting course:', courseId);
    setShowDeleteModal(false);
    router.push('/instructor-dashboard?success=course-deleted');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/instructor-dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                العودة للوحة التحكم
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Badge variant="outline">{course.category}</Badge>
                  <Badge variant="secondary">{course.level}</Badge>
                  <span>آخر تحديث: {course.updatedAt}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                معاينة
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="w-4 h-4" />
                تعديل
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-reverse space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>{tabs.find(tab => tab.id === activeTab)?.content}</div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold">حذف الدورة</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من حذف دورة "{course.title}"؟ هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى حذف جميع البيانات المرتبطة بالدورة.
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                إلغاء
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteCourse}
              >
                حذف الدورة
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
