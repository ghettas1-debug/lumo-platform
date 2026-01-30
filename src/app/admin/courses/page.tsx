"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Settings,
  Award,
  Target,
  Globe,
  MapPin,
  Briefcase,
  Shield,
  Heart,
  MessageSquare,
  Activity,
  Zap,
  UserCheck,
  Video,
  Image,
  Music,
  Share2,
  Bookmark,
  Tag,
  Archive
} from 'lucide-react';

export default function AdminCoursesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const courses = [
    {
      id: '1',
      title: 'تطوير تطبيقات الويب باستخدام React',
      description: 'تعلم أساسيات React و Next.js لبناء تطبيقات ويب تفاعلية',
      instructor: 'أحمد محمد',
      category: 'البرمجة',
      level: 'متوسط',
      duration: '8 أسابيع',
      price: 'مجاني',
      status: 'published',
      enrolledStudents: 1250,
      rating: 4.8,
      reviews: 245,
      image: 'bg-gradient-to-r from-blue-500 to-purple-600',
      created: '2024-01-15',
      updated: '2024-01-20',
      modules: 12,
      lessons: 48,
      durationHours: 32
    },
    {
      id: '2',
      title: 'تصميم واجهات المستخدم مع Tailwind CSS',
      description: 'تعلم أساسيات تصميم واجهات المستخدم باستخدام Tailwind CSS',
      instructor: 'سارة علي',
      category: 'التصميم',
      level: 'مبتدئ',
      duration: '6 أسابيع',
      price: 'مجاني',
      status: 'published',
      enrolledStudents: 890,
      rating: 4.9,
      reviews: 178,
      image: 'bg-gradient-to-r from-green-500 to-teal-600',
      created: '2024-01-10',
      updated: '2024-01-18',
      modules: 8,
      lessons: 32,
      durationHours: 24
    },
    {
      id: '3',
      title: 'أساسيات قواعد البيانات مع SQL',
      description: 'تعلم أساسيات قواعد البيانات واستخدام SQL لإدارة البيانات',
      instructor: 'محمد سالم',
      category: 'البيانات',
      level: 'مبتدئ',
      duration: '10 أسابيع',
      price: 'مجاني',
      status: 'draft',
      enrolledStudents: 0,
      rating: 0,
      reviews: 0,
      image: 'bg-gradient-to-r from-orange-500 to-red-600',
      created: '2024-01-05',
      updated: '2024-01-15',
      modules: 15,
      lessons: 60,
      durationHours: 40
    },
    {
      id: '4',
      title: 'مقدمة في الذكاء الاصطناعي',
      description: 'مقدمة في أساسيات الذكاء الاصطناعي وتطبيقها في المشاريع',
      instructor: 'ليلى أحمد',
      category: 'الذكاء الاصطناعي',
      level: 'متقدم',
      duration: '12 أسابيع',
      price: 'مدفوع',
      status: 'archived',
      enrolledStudents: 0,
      rating: 0,
      reviews: 0,
      image: 'bg-gradient-to-r from-purple-500 to-pink-600',
      created: '2024-01-01',
      updated: '2024-01-10',
      modules: 20,
      lessons: 80,
      durationHours: 48
    }
  ];

  const categories = ['الكل', 'البرمجة', 'التصميم', 'البيانات', 'الذكاء الاصطناعي'];
  const levels = ['الجميع', 'مبتدئ', 'متوسط', 'متقدم'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || course.status === activeTab;
    const matchesCategory = activeTab === 'all' || course.category === activeTab;
    return matchesSearch && matchesTab && matchesCategory;
  });

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleBulkAction = (action: 'publish' | 'draft' | 'archive' | 'delete') => {
    console.log(`Bulk ${action} for courses:`, selectedCourses);
    setSelectedCourses([]);
  };

  const handleExport = () => {
    console.log('Exporting courses data...');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">إدارة الدورات</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              إدارة جميع دورات منصة Lumo بسهولة وفعالية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء دورة جديدة
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="w-4 h-4 ml-2" />
                تصدير البيانات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
                <div className="text-sm text-gray-600">إجمالي الدورات</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'published').length}
                </div>
                <div className="text-sm text-gray-600">دورات منشورة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'draft').length}
                </div>
                <div className="text-sm text-gray-600">دورات مسودة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'archived').length}
                </div>
                <div className="text-sm text-gray-600">دورات مؤرشفة</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="بحث عن دورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع الفئات</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع المستويات</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCourses.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm text-blue-700">
                تم اختيار {selectedCourses.length} دورة
              </span>
              <Button size="sm" onClick={() => handleBulkAction('publish')}>
                <CheckCircle className="w-4 h-4 ml-2" />
                نشر
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('draft')}>
                <Clock className="w-4 h-4 ml-2" />
                مسودة
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')}>
                <Archive className="w-4 h-4 ml-2" />
                أرشفة
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-48 ${course.image} relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm">{course.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {course.category}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{course.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    ({course.reviews} تقييم)
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{course.enrolledStudents} طالب</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {course.duration} ساعة
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">
                    {course.price === 'مجاني' ? 'مجاني' : `${course.price} ريال`}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : course.status === 'draft' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {course.status === 'published' ? 'منشور' : course.status === 'draft' ? 'مسودة' : 'مؤرشفة'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
