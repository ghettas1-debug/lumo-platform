"use client";

import { useState } from 'react';
import { Search, HelpCircle, BookOpen, MessageSquare, Phone, Mail, Clock, ChevronRight, FileText, Video, Settings, Shield, Users, Award, Target } from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'جميع الأقسام', icon: HelpCircle, color: 'blue' },
    { id: 'getting-started', name: 'البدء', icon: BookOpen, color: 'green' },
    { id: 'courses', name: 'الدورات', icon: Target, color: 'purple' },
    { id: 'account', name: 'الحساب', icon: Users, color: 'orange' },
    { id: 'technical', name: 'فني', icon: Settings, color: 'red' },
    { id: 'billing', name: 'الفواتير', icon: Shield, color: 'yellow' }
  ];

  const helpArticles = [
    {
      id: 1,
      title: 'كيف أبدأ التعلم في LUMO؟',
      category: 'getting-started',
      description: 'دليل شامل للبدء في رحلتك التعليمية مع منصة LUMO',
      content: 'للبدء في التعلم مع LUMO، اتبع الخطوات التالية...',
      readTime: '5 دقائق',
      difficulty: 'سهل',
      views: 15420,
      helpful: 1420,
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'كيف أشترك في دورة؟',
      category: 'courses',
      description: 'تعلم كيفية الاشتراك في الدورات والبدء في التعلم',
      content: 'للاشتراك في دورة، اتبع الخطوات التالية...',
      readTime: '3 دقائق',
      difficulty: 'سهل',
      views: 8930,
      helpful: 890,
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      title: 'كيف أحصل على شهادة؟',
      category: 'courses',
      description: 'شرح كامل للحصول على شهادات إتمام الدورات',
      content: 'للحصول على شهادة، يجب إكمال جميع متطلبات الدورة...',
      readTime: '4 دقائق',
      difficulty: 'متوسط',
      views: 6750,
      helpful: 650,
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      title: 'كيف أغير كلمة المرور؟',
      category: 'account',
      description: 'خطوات تغيير كلمة المرور لحسابك',
      content: 'لتغيير كلمة المرور، اذهب إلى صفحة الإعدادات...',
      readTime: '2 دقائق',
      difficulty: 'سهل',
      views: 12300,
      helpful: 1180,
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      title: 'مشاكل تشغيل الفيديو',
      category: 'technical',
      description: 'حلول لمشاكل تشغيل الفيديو في الدورات',
      content: 'إذا واجهت مشاكل في تشغيل الفيديو، جرب الحلول التالية...',
      readTime: '6 دقائق',
      difficulty: 'متوسط',
      views: 5670,
      helpful: 520,
      lastUpdated: '2024-01-11'
    },
    {
      id: 6,
      title: 'كيف أطلب استرداد المال؟',
      category: 'billing',
      description: 'سياسة استرداد المال وكيفية طلب الاسترداد',
      content: 'يمكنك طلب استرداد المال خلال 30 يوماً من تاريخ الشراء...',
      readTime: '4 دقائق',
      difficulty: 'سهل',
      views: 3450,
      helpful: 320,
      lastUpdated: '2024-01-10'
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل': return 'text-green-600 bg-green-100';
      case 'متوسط': return 'text-yellow-600 bg-yellow-100';
      case 'صعب': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <HelpCircle size={40} />
            <h1 className="text-4xl font-black">مركز المساعدة</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl mb-10">
            كل ما تحتاجه للنجاح في رحلتك التعليمية. ابحث عن إجابات أو تواصل مع فريق الدعم.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center">
              <div className="p-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <input
                type="text"
                placeholder="ابحث عن مساعدة، دورة، أو مشكلة..."
                className="flex-1 p-4 text-gray-900 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">دردشة مباشرة</h3>
            <p className="text-gray-600 text-sm mb-4">تحدث مع فريق الدعم</p>
            <Button variant="outline" size="sm">ابدأ الدردشة</Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">اتصل بنا</h3>
            <p className="text-gray-600 text-sm mb-4">+966 50 123 4567</p>
            <Button variant="outline" size="sm">اتصل الآن</Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-600 text-sm mb-4">support@lumo.com</p>
            <Button variant="outline" size="sm">أرسل رسالة</Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">دروس فيديو</h3>
            <p className="text-gray-600 text-sm mb-4">شاهد الدروس التعليمية</p>
            <Button variant="outline" size="sm">شاهد الآن</Button>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">تصفح حسب الفئة</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <IconComponent size={24} className="mx-auto mb-2" />
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'جميع المقالات' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-500">
              {filteredArticles.length} مقال
            </p>
          </div>

          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-3/4">
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${getCategoryColor(article.category)}-100 text-${getCategoryColor(article.category)}-600`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>{article.views.toLocaleString()} مشاهدة</span>
                        <span>{article.helpful} مفيد</span>
                        <span>آخر تحديث: {article.lastUpdated}</span>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        قراءة المزيد
                        <ChevronRight size={16} className="mr-2" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4">
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <FileText size={48} className="text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">مقال تعليمي</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <Card className="text-center py-16">
              <HelpCircle className="text-gray-400 mx-auto mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">لم نعثر على نتائج</h3>
              <p className="text-gray-500 mb-6">
                جرب تغيير الفئة أو كلمات البحث
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}>
                إعادة تعيين
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">هل تحتاج مساعدة إضافية؟</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              فريق الدعم متاح لمساعدتك في أي وقت. لا تتردد في التواصل معنا.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">دردشة مباشرة</h3>
              <p className="text-gray-600 mb-6">
                تواصل مع فريق الدعم مباشرة عبر الدردشة الحية
              </p>
              <Button variant="default">ابدأ الدردشة</Button>
            </Card>

            <Card className="text-center p-8">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">بريد إلكتروني</h3>
              <p className="text-gray-600 mb-6">
                أرسل لنا بريداً إلكترونياً وسنرد خلال 24 ساعة
              </p>
              <Button variant="default">أرسل رسالة</Button>
            </Card>

            <Card className="text-center p-8">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">هاتف</h3>
              <p className="text-gray-600 mb-6">
                اتصل بنا مباشرة على رقم الهاتف
              </p>
              <Button variant="default">اتصل الآن</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

