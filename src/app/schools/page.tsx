"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  School, 
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

export default function SchoolsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'success-stories'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'إدارة الطلاب',
      description: 'نظام متكامل لإدارة بيانات الطلاب وتتبع أدائهم الأكاديمي'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'مكتبة المحتوى',
      description: 'وصول غير محدود إلى آلاف الدورات والمواد التعليمية'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'الشهادات المعتمدة',
      description: 'شهادات معتمدة دولياً للطلاب بعد إكمال الدورات'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'التعلم التكيفي',
      description: 'نظام ذكي يتكيف مع مستوى كل طالب وقدراته'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'التحليلات المتقدمة',
      description: 'تقارير مفصلة عن أداء الطلاب والمدارس'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'الأمان والخصوصية',
      description: 'حماية كاملة لبيانات الطلاب والمدارس'
    }
  ];

  const pricingPlans = [
    {
      name: 'الخطة الأساسية',
      price: 'مجاني',
      description: 'للمدارس الصغيرة التي تبدأ رحلتها',
      features: [
        'حتى 100 طالب',
        '10 دورات شهرياً',
        'تقارير أساسية',
        'دعم عبر البريد الإلكتروني'
      ],
      notIncluded: [
        'التكامل مع أنظمة المدارس',
        'شهادات معتمدة',
        'دعم فني متقدم'
      ]
    },
    {
      name: 'الخطة المتقدمة',
      price: 'ريال 299/شهرياً',
      description: 'للمدارس المتوسطة التي تنمو بسرعة',
      features: [
        'حتى 500 طالب',
        'دورات غير محدودة',
        'تقارير متقدمة',
        'شهادات معتمدة',
        'التكامل مع أنظمة المدارس',
        'دعم فني متقدم'
      ],
      notIncluded: [
        'مدير حساب مخصص',
        'تدريب مخصص'
      ],
      popular: true
    },
    {
      name: 'الخطة المؤسسية',
      price: 'ريال 999/شهرياً',
      description: 'للمدارس الكبيرة والمجموعات التعليمية',
      features: [
        'طلاب غير محدود',
        'دورات غير محدودة',
        'تقارير متقدمة',
        'شهادات معتمدة',
        'التكامل مع أنظمة المدارس',
        'دعم فني متقدم',
        'مدير حساب مخصص',
        'تدريب مخصص'
      ],
      notIncluded: []
    }
  ];

  const successStories = [
    {
      name: 'مدرسة المستقبل',
      location: 'الرياض',
      students: 1200,
      improvement: '45%',
      testimonial: 'ساعدتنا منصة Lumo في تحسين أداء الطلاب بنسبة 45% خلال عام واحد',
      image: 'bg-gradient-to-r from-blue-500 to-purple-600'
    },
    {
      name: 'مدارس الإبداع',
      location: 'جدة',
      students: 800,
      improvement: '38%',
      testimonial: 'أفضل استثمار قمنا به لتطوير التعليم في مدارسنا',
      image: 'bg-gradient-to-r from-green-500 to-teal-600'
    },
    {
      name: 'أكاديمية النجاح',
      location: 'الدمام',
      students: 600,
      improvement: '52%',
      testimonial: 'منصة Lumo غيرت طريقة التدريس في أكاديميتنا تماماً',
      image: 'bg-gradient-to-r from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">حلول المدارس</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              منصة تعليمية متكاملة مصممة خصيصاً للمدارس لتعزيز تجربة التعلم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Plus className="w-4 h-4 ml-2" />
                ابدأ مجاناً
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="w-4 h-4 ml-2" />
                طلب عرض توضيحي
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
              <div className="p-3 bg-blue-100 rounded-lg">
                <School className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">مدرسة شريكة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50,000+</div>
                <div className="text-sm text-gray-600">طالب نشط</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,000+</div>
                <div className="text-sm text-gray-600">دورة متاحة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600">تقييم المستخدمين</div>
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
                    ? 'border-blue-500 text-blue-600'
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار المدارس Lumo؟</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                منصة Lumo هي الحل الأمثل للمدارس التي تبحث عن تحسين جودة التعليم وتسهيل إدارة العمليات التعليمية
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">مميزات متقدمة للمدارس</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                مجموعة شاملة من المميزات المصممة لتلبية احتياجات المدارس الحديثة
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600 shrink-0">
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
                اختر الخطة التي تناسب حجم مدرستك وميزانيتك
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`p-8 hover:shadow-lg transition-shadow ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {plan.popular && (
                    <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full text-center mb-4">
                      الأكثر شعبية
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{plan.price}</div>
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
                    {plan.price === 'مجاني' ? 'ابدأ مجاناً' : 'اشترك الآن'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'success-stories' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">قصص نجاح مدارسنا</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                تعرف على كيفية تحقيق المدارس نجاحاً ملحوظاً مع منصة Lumo
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-32 ${story.image} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <School className="w-12 h-12 text-white" />
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
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">هل أنت مستعد لتحويل مدرستك؟</h2>
          <p className="text-lg mb-6">انضم إلى آلاف المدارس التي تستخدم Lumo لتحسين التعليم</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Plus className="w-4 h-4 ml-2" />
              ابدأ مجاناً
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Phone className="w-4 h-4 ml-2" />
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
