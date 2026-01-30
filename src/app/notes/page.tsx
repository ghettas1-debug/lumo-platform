"use client";

import { useState } from 'react';
import { 
  Plus, Search, Filter, Calendar, Clock, 
  Tag, Star, BookOpen, FileText, Hash
} from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';
import NotesManager from '@/components/notes/NotesManager';

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'title' | 'likes'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for courses
  const courses = [
    { id: 'react-course', name: 'دورة React.js المتقدمة', notes: 15 },
    { id: 'python-course', name: 'دورة Python الاحترافية', notes: 12 },
    { id: 'javascript-course', name: 'دورة JavaScript الأساسية', notes: 8 },
    { id: 'node-course', name: 'دورة Node.js للخوادم', notes: 10 },
    { id: 'css-course', name: 'دورة CSS و Tailwind', notes: 6 }
  ];

  const categories = [
    { id: 'all', name: 'الكل', count: 51, icon: FileText },
    { id: 'programming', name: 'برمجة', count: 35, icon: BookOpen },
    { id: 'design', name: 'تصميم', count: 8, icon: Tag },
    { id: 'business', name: 'أعمال', count: 5, icon: Star },
    { id: 'personal', name: 'شخصي', count: 3, icon: Hash }
  ];

  const recentNotes = [
    {
      id: '1',
      title: 'ملاحظات حول React Hooks',
      content: 'React Hooks هي طريقة جديدة لاستخدام state...',
      courseName: 'دورة React.js المتقدمة',
      timestamp: 1650,
      tags: ['React', 'Hooks', 'JavaScript'],
      likes: 24,
      comments: 5,
      createdAt: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'مفاهيم مهمة في Redux',
      content: 'Redux هو حاوية حالة يمكن التنبؤ بها...',
      courseName: 'دورة React.js المتقدمة',
      timestamp: 3200,
      tags: ['Redux', 'State Management'],
      likes: 15,
      comments: 3,
      createdAt: '2024-03-14T14:45:00Z'
    },
    {
      id: '3',
      title: 'أفضل الممارسات في React',
      content: '1. استخدام functional components مع hooks...',
      courseName: 'دورة React.js المتقدمة',
      timestamp: 4500,
      tags: ['React', 'Best Practices'],
      likes: 42,
      comments: 8,
      createdAt: '2024-03-13T12:20:00Z'
    }
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الملاحظات</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            سجل ملاحظاتك وأفكارك أثناء الدراسة وشاركها مع الآخرين
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">51</div>
            <div className="text-sm text-gray-600">إجمالي الملاحظات</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
            <div className="text-sm text-gray-600">دورات</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Tag size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">وسوم</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">81</div>
            <div className="text-sm text-gray-600">إعجابات</div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="البحث في الملاحظات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الدورات</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.notes} ملاحظة)
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">الأحدث</option>
                <option value="oldest">الأقدم</option>
                <option value="title">العنوان</option>
                <option value="likes">الأكثر إعجاباً</option>
              </select>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5"></div>
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                >
                  <div className="w-4 h-4 flex flex-col gap-0.5">
                    <div className="w-full h-0.5 bg-current"></div>
                    <div className="w-full h-0.5 bg-current"></div>
                    <div className="w-full h-0.5 bg-current"></div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Notes List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {recentNotes.map((note) => (
                <Card key={note.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {note.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <BookOpen size={14} />
                          {note.courseName}
                        </span>
                        {note.timestamp && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {formatTime(note.timestamp)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(note.createdAt)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {note.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Star size={16} className={note.likes > 0 ? 'fill-current text-yellow-400' : 'text-gray-400'} />
                        <span className="text-xs">{note.likes}</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <div className="w-4 h-4 flex flex-col gap-0.5">
                          <div className="w-full h-0.5 bg-current"></div>
                          <div className="w-full h-0.5 bg-current"></div>
                        </div>
                        <span className="text-xs">{note.comments}</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <div className="w-4 h-4 grid grid-cols-2 gap-0.5"></div>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  <Plus size={16} className="ml-2" />
                  ملاحظة جديدة
                </Button>
                <Button variant="outline" className="w-full">
                  <Search size={16} className="ml-2" />
                  بحث متقدم
                </Button>
                <Button variant="outline" className="w-full">
                  <Filter size={16} className="ml-2" />
                  فلترة متقدمة
                </Button>
              </div>
            </Card>

            {/* Categories */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">التصنيفات</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedCategory === category.id ? 'bg-blue-50 border-blue-500 border' : 'border border-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <category.icon size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.count} ملاحظة</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular Tags */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">الوسوم الشائعة</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'Python', 'Redux', 'Node.js', 'CSS', 'HTML', 'TypeScript', 'MongoDB', 'SQL'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">النشاط الحديث</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">تم إنشاء ملاحظة جديدة</span>
                  <span className="text-gray-400 text-xs">منذ دقيقة</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">تم تعديل ملاحظة</span>
                  <span className="text-gray-400 text-xs">منذ 5 دقائق</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">تمت مشاركة ملاحظة</span>
                  <span className="text-gray-400 text-xs">منذ 10 دقائق</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

