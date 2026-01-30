"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Target,
  Award
} from 'lucide-react';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'البرمجة', 'التصميم', 'البيانات', 'التسويق', 'الذكاء الاصطناعي', 'التطوير المهني'];

  const blogPosts = [
    {
      id: 1,
      title: "10 نصائح لتعلم Python بفعالية في 2026",
      excerpt: "دليل شامل للمبتدئين والمحترفين لتعلم لغة Python بأحدث الأساليب والتقنيات",
      author: "أحمد محمد",
      date: "30 يناير 2026",
      readTime: "8 دقائق",
      category: "البرمجة",
      image: "bg-blue-500",
      views: 15420,
      likes: 892,
      comments: 45,
      featured: true
    },
    {
      id: 2,
      title: "كيف تصبح مطور React محترف في 6 أشهر",
      excerpt: "خارطة طريق مفصلة لتطوير مهارات React من الصفر إلى الاحترافية",
      author: "سارة علي",
      date: "28 يناير 2026",
      readTime: "12 دقيقة",
      category: "البرمجة",
      image: "bg-purple-500",
      views: 12340,
      likes: 756,
      comments: 32,
      featured: true
    },
    {
      id: 3,
      title: "أهمية الذكاء الاصطناعي في التعليم الحديث",
      excerpt: "كيف يغير AI طريقة تعلمنا ويعيد تشكيل مستقبل التعليم",
      author: "محمد سالم",
      date: "25 يناير 2026",
      readTime: "10 دقائق",
      category: "الذكاء الاصطناعي",
      image: "bg-green-500",
      views: 18900,
      likes: 1234,
      comments: 67,
      featured: false
    },
    {
      id: 4,
      title: "أساسيات تصميم UI/UX للمبتدئين",
      excerpt: "مقدمة شاملة لعالم تصميم واجهات المستخدم وتجربة المستخدم",
      author: "ليلى أحمد",
      date: "22 يناير 2026",
      readTime: "15 دقيقة",
      category: "التصميم",
      image: "bg-pink-500",
      views: 9870,
      likes: 543,
      comments: 28,
      featured: false
    },
    {
      id: 5,
      title: "تحليل البيانات باستخدام Python: دليل شامل",
      excerpt: "تعلم كيفية استخدام مكتبات Python لتحليل البيانات بشكل احترافي",
      author: "خالد عبدالله",
      date: "20 يناير 2026",
      readTime: "18 دقيقة",
      category: "البيانات",
      image: "bg-orange-500",
      views: 11200,
      likes: 678,
      comments: 41,
      featured: false
    },
    {
      id: 6,
      title: "التسويق الرقمي للمطورين: استراتيجيات ناجحة",
      excerpt: "كيف يمكن للمطورين تسويق مهاراتهم وبناء علامة تجارية شخصية",
      author: "نورا سعيد",
      date: "18 يناير 2026",
      readTime: "9 دقائق",
      category: "التسويق",
      image: "bg-red-500",
      views: 7650,
      likes: 432,
      comments: 19,
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">المدونة التعليمية</h1>
              <p className="text-gray-600">مقالات ودروس تعليمية من خبراء Lumo</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في المدونة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 ml-2" />
                فلترة
              </Button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              المقالات المميزة
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-48 ${post.image} relative`}>
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      مميز
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.comments}
                        </div>
                      </div>
                      <Button size="sm">
                        قراءة المزيد
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">جميع المقالات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-32 ${post.image}`}></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.category}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16">
          <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">انضم إلى نشرتنا الإخبارية</h2>
              <p className="text-xl mb-6">احصل على أحدث المقالات والدورات مباشرة في بريدك</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  اشترك الآن
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Topics Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">المواضيع الشائعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">البرمجة</h3>
              <p className="text-sm text-gray-600">Python, JavaScript, React, Node.js</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">الذكاء الاصطناعي</h3>
              <p className="text-sm text-gray-600">Machine Learning, Deep Learning, NLP</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">التطوير المهني</h3>
              <p className="text-sm text-gray-600">مهارات ناعمة، إدارة المشاريع</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">الشهادات</h3>
              <p className="text-sm text-gray-600">شهادات معتمدة، إعداد المقابلات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
