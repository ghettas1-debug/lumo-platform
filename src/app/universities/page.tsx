"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  GraduationCap, 
  Users, 
  Award, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Shield, 
  Heart, 
  Zap, 
  Activity, 
  BarChart3, 
  FileText, 
  Settings, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Play, 
  Pause, 
  RefreshCw, 
  AlertCircle, 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  ChevronUp, 
  ChevronDown, 
  MoreVertical, 
  MoreHorizontal, 
  Menu, 
  X, 
  PlusCircle, 
  MinusCircle, 
  Edit2, 
  Save, 
  Undo, 
  Redo, 
  Copy, 
  Move, 
  Trash, 
  Archive, 
  ArchiveRestore, 
  DownloadCloud, 
  UploadCloud, 
  Share2, 
  ExternalLink
} from 'lucide-react';

export default function UniversitiesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'success-stories'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'إدارة البرامج الأكاديمية',
      description: 'نظام متكامل لإدارة البرامج والمقررات الدراسية والجداول الأكاديمية'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'إدارة الطلاب وأعضاء هيئة التدريس',
      description: 'إدارة شاملة للطلاب وأعضاء هيئة التدريس والموظفين الإداريين'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'الشهادات الجامعية المعتمدة',
      description: 'شهادات جامعية معتمدة دولياً مع نظام التحقق الإلكتروني'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'البحث العلمي',
      description: 'منصة متقدمة لإدارة الأبحاث العلمية والنشر الأكاديمي'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'التحليلات الأكاديمية',
      description: 'تحليلات متقدمة لأداء الطلاب والبرامج الأكاديمية'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'الامتثال الأكاديمي',
      description: 'ضمان الامتثال للمعايير الأكاديمية والاعتمادية'
    }
  ];

  const pricingPlans = [
    {
      name: 'الخطة الجامعية',
      price: 'ريال 999/شهرياً',
      description: 'للجامعات الصغيرة والكليات المتخصصة',
      features: [
        'حتى 5,000 طالب',
        'برامج غير محدودة',
        'شهادات معتمدة',
        'نظام إدارة أبحاث',
        'دعم فني متقدم'
      ],
      notIncluded: [
        'مدير حساب مخصص',
        'تدريب مخصص',
        'تكامل متقدم'
      ]
    },
    {
      name: 'الخطة المؤسسية',
      price: 'ريال 2,999/شهرياً',
      description: 'للجامعات المتوسطة والمجموعات الجامعية',
      features: [
        'حتى 20,000 طالب',
        'برامج غير محدودة',
        'شهادات معتمدة',
        'نظام إدارة أبحاث',
        'دعم فني متقدم',
        'مدير حساب مخصص',
        'تدريب مخصص'
      ],
      notIncluded: [
        'تكامل متقدم'
      ],
      popular: true
    },
    {
      name: 'الخطة المميزة',
      price: 'مخصص',
      description: 'للجامعات الكبيرة والمؤسسات التعليمية الكبرى',
      features: [
        'طلاب غير محدود',
        'برامج غير محدودة',
        'شهادات معتمدة',
        'نظام إدارة أبحاث',
        'دعم فني متقدم',
        'مدير حساب مخصص',
        'تدريب مخصص',
        'تكامل متقدم',
        'حلول مخصصة'
      ],
      notIncluded: []
    }
  ];

  const successStories = [
    {
      name: 'جامعة المستقبل',
      location: 'الرياض',
      students: 15000,
      improvement: '62%',
      testimonial: 'ساعدتنا منصة Lumo في تحسين تجربة الطلاب وتسهيل الإدارة الأكاديمية',
      image: 'bg-gradient-to-r from-blue-500 to-purple-600'
    },
    {
      name: 'جامعة الإبداع',
      location: 'جدة',
      students: 12000,
      improvement: '48%',
      testimonial: 'منصة Lumo غيرت طريقة إدارة البرامج الأكاديمية في جامعتنا تماماً',
      image: 'bg-gradient-to-r from-green-500 to-teal-600'
    },
    {
      name: 'جامعة النجاح',
      location: 'الدمام',
      students: 8000,
      improvement: '55%',
      testimonial: 'أفضل استثمار قمنا به لتحديث البنية التحتية التعليمية',
      image: 'bg-gradient-to-r from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">حلول الجامعات</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              منصة تعليمية متكاملة مصممة خصيصاً للجامعات لتعزيز التميز الأكاديمي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Plus className="w-4 h-4 ml-2" />
                طلب عرض توضيحي
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Phone className="w-4 h-4 ml-2" />
                تواصل مع المبيعات
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">جامعة شريكة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">200,000+</div>
                <div className="text-sm text-gray-600">طالب جامعي</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5,000+</div>
                <div className="text-sm text-gray-600">برنامج أكاديمي</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">تقييم الجامعات</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'features', 'pricing', 'success-stories'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'features' && 'المميزات'}
                {tab === 'pricing' && 'الأسعار'}
                {tab === 'success-stories' && 'قصص نجاح'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار الجامعات Lumo؟</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                منصة Lumo هي الحل الأمثل للجامعات التي تبحث عن التميز الأكاديمي والتحول الرقمي
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">مميزات متقدمة للجامعات</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                مجموعة شاملة من المميزات المصممة لتلبية احتياجات الجامعات الحديثة
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6">
                  <div className="p-3 bg-purple-100 rounded-lg text-purple-600 shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">خطط الأسعار</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                اختر الخطة التي تناسب حجم جامعتك ومتطلباتك الأكاديمية
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`p-8 hover:shadow-lg transition-shadow ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                  {plan.popular && (
                    <div className="bg-purple-500 text-white text-sm font-medium px-3 py-1 rounded-full text-center mb-4">
                      الأكثر شعبية
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{plan.price}</div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant={plan.popular ? "primary" : "outline"}>
                    {plan.price === 'مخصص' ? 'تواصل مع المبيعات' : 'اشترك الآن'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'success-stories' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">قصص نجاح جامعاتنا</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                تعرف على كيفية تحقيق الجامعات نجاحاً ملحوظاً مع منصة Lumo
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-32 ${story.image} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.name}</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{story.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{story.students} طالب</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-lg font-semibold text-green-600">+{story.improvement}</span>
                      <span className="text-gray-600">تحسن في الأداء</span>
                    </div>
                    <p className="text-gray-600 italic">"{story.testimonial}"</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">هل أنت مستعد لتحويل جامعتك؟</h2>
          <p className="text-lg mb-6">انضم إلى عشرات الجامعات التي تستخدم Lumo للتميز الأكاديمي</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Plus className="w-4 h-4 ml-2" />
              طلب عرض توضيحي
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Phone className="w-4 h-4 ml-2" />
              تواصل مع المبيعات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
