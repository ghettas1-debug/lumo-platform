"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Newspaper, 
  Calendar, 
  User, 
  TrendingUp, 
  Eye, 
  Share2, 
  Bookmark,
  Search,
  Filter,
  Globe,
  Award,
  Target,
  Star,
  Heart,
  MessageCircle,
  ArrowRight,
  Clock,
  Tag,
  Download,
  Mail,
  Phone
} from 'lucide-react';

export default function PressPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const pressReleases = [
    {
      id: 1,
      title: "Lumo تطلق منصة تعليمية عالمية جديدة",
      excerpt: "أعلنت Lumo اليوم عن إطلاق منصة تعليمية عالمية متكاملة تهدف إلى ثورة في مجال التعليم عبر الإنترنت",
      date: "15 يناير 2026",
      category: "إطلاق منتج",
      author: "فريق Lumo",
      image: "bg-gradient-to-r from-blue-500 to-purple-600",
      views: 12500,
      shares: 450,
      featured: true
    },
    {
      id: 2,
      title: "Lumo تحصل على استثمار بقيمة 10 مليون دولار",
      excerpt: "نجحت Lumo في الحصول على جولة تمويل جديدة بقيمة 10 مليون دولار من مستثمرين رائدين",
      date: "10 يناير 2026",
      category: "تمويل",
      author: "فريق Lumo",
      image: "bg-gradient-to-r from-green-500 to-teal-600",
      views: 8900,
      shares: 320,
      featured: true
    },
    {
      id: 3,
      title: "Lumo توقع شراكة مع 10 جامعات عالمية",
      excerpt: "أعلنت Lumo عن شراكة استراتيجية مع 10 جامعات عالمية لتقديم محتوى تعليمي متميز",
      date: "5 يناير 2026",
      category: "شراكات",
      author: "فريق Lumo",
      image: "bg-gradient-to-r from-orange-500 to-red-600",
      views: 6700,
      shares: 280,
      featured: false
    },
    {
      id: 4,
      title: "Lumo تصل إلى 100 ألف مستخدم نشط",
      excerpt: "حققت Lumو إنجازاً كبيراً بالوصول إلى 100 ألف مستخدم نشط في أقل من 6 أشهر",
      date: "1 يناير 2026",
      category: "إنجازات",
      author: "فريق Lumo",
      image: "bg-gradient-to-r from-purple-500 to-pink-600",
      views: 5400,
      shares: 190,
      featured: false
    }
  ];

  const mediaCoverage = [
    {
      id: 1,
      outlet: "تقنية العرب",
      title: "Lumo: ثورة في التعليم الرقمي العربي",
      date: "12 يناير 2026",
      excerpt: "منصة Lumo تغير مشهد التعليم الرقمي في المنطقة العربية",
      link: "#",
      logo: "bg-blue-600"
    },
    {
      id: 2,
      outlet: "الاقتصادية",
      title: "شركة سعودية ناشئة تحقق نجاحاً عالمياً",
      date: "8 يناير 2026",
      excerpt: "Lumo تثبت أن الشركات السعودية يمكنها المنافسة عالمياً",
      link: "#",
      logo: "bg-green-600"
    },
    {
      id: 3,
      outlet: "BBC Arabic",
      title: "How Lumo is transforming education in the Middle East",
      date: "5 يناير 2026",
      excerpt: "Saudi startup Lumo is making waves in the education technology sector",
      link: "#",
      logo: "bg-red-600"
    }
  ];

  const awards = [
    {
      id: 1,
      name: "أفضل منصة تعليمية عربية 2026",
      organization: "جمعية التقنية العربية",
      date: "ديسمبر 2025",
      icon: Award,
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 2,
      name: "أفضل شركة ناشئة سعودية",
      organization: "وزارة الاستثمار السعودي",
      date: "نوفمبر 2025",
      icon: Star,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 3,
      name: "أفضل تطبيق تعليمي",
      organization: "Google Play Awards",
      date: "أكتوبر 2025",
      icon: Target,
      color: "from-green-500 to-teal-600"
    }
  ];

  const categories = ['all', 'إطلاق منتج', 'تمويل', 'شراكات', 'إنجازات'];

  const filteredPressReleases = pressReleases.filter(release => {
    const matchesCategory = activeCategory === 'all' || release.category === activeCategory;
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">الإعلام والأخبار</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              تابع آخر أخبار Lumو وإنجازاتنا في الإعلام العالمي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Newspaper className="w-4 h-4 ml-2" />
                بيانات صحفية
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Share2 className="w-4 h-4 ml-2" />
                مواد إعلامية
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في البيانات الصحفية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category === 'all' ? 'الكل' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Press Release */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">البيانات الصحفية المميزة</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pressReleases.filter(release => release.featured).map((release) => (
              <Card key={release.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-48 ${release.image}`}></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {release.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{release.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{release.title}</h3>
                  <p className="text-gray-600 mb-4">{release.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{release.views.toLocaleString('ar-SA')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        <span>{release.shares}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      قراءة المزيد
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Press Releases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">جميع البيانات الصحفية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPressReleases.map((release) => (
              <Card key={release.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-32 ${release.image}`}></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {release.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{release.date}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{release.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{release.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{release.views.toLocaleString('ar-SA')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        <span>{release.shares}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      قراءة
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">التغطية الإعلامية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaCoverage.map((coverage) => (
              <Card key={coverage.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${coverage.logo} rounded-lg flex items-center justify-center`}>
                    <Newspaper className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{coverage.outlet}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{coverage.date}</span>
                    </div>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{coverage.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{coverage.excerpt}</p>
                <Button variant="outline" size="sm">
                  قراءة المقال
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">الجوائز والتقدير</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => {
              const Icon = award.icon;
              return (
                <Card key={award.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-linear-to-r ${award.color} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{award.name}</h3>
                      <p className="text-sm text-gray-600">{award.organization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{award.date}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Press Kit */}
        <div className="mb-16">
          <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">مجموعة الإعلام</h2>
              <p className="text-xl mb-6">
                قم بتنزيل شعار Lumo وصور الشركة ومواديل إعلامية أخرى
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Download className="w-4 h-4 ml-2" />
                  تنزيل مجموعة الإعلام
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Mail className="w-4 h-4 ml-2" />
                  تواصل مع فريق الإعلام
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">تواصل مع فريق الإعلام</h2>
          <p className="text-gray-600 mb-6">
            للأسئلة الإعلامية وطلبات المقابلات، تواصل معنا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <Mail className="w-4 h-4 ml-2" />
              press@lumo.com
            </Button>
            <Button variant="outline">
              <Phone className="w-4 h-4 ml-2" />
              +966 50 123 4567
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
