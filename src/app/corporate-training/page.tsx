"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Briefcase, 
  Users, 
  Award, 
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

export default function CorporateTrainingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'pricing' | 'success-stories'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const programs = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'تطوير المهارات القيادية',
      description: 'برامج متقدمة لتطوير المهارات القيادية والإدارية للمديرين والمشرفين'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'العمل الجماعي والتواصل',
      description: 'دورات متخصصة في تحسين مهارات العمل الجماعي والتواصل الفعال'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'إدارة المشاريع',
      description: 'برامج معتمدة في إدارة المشاريع باستخدام أحدث المنهجيات العالمية'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'المبيعات والتسويق',
      description: 'دورات متقدمة في فنون المبيعات والتسويق الرقمي واستراتيجيات النمو'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'الأمان والامتثال',
      description: 'برامج تدريبية في الأمان المهني والامتثال التنظيمي والمعايير الدولية'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'التحول الرقمي',
      description: 'دورات في التحول الرقمي والابتكار واستخدام التكنولوجيا في الأعمال'
    }
  ];

  const pricingPlans = [
    {
      name: 'الخطة الأساسية',
      price: 'ريال 99/موظف/سنة',
      description: 'للشركات الصغيرة التي تبدأ رحلة التدريب',
      features: [
        'حتى 50 موظف',
        'دورات أساسية',
        'تقارير أساسية',
        'شهادات إتمام',
        'دعم عبر البريد الإلكتروني'
      ],
      notIncluded: [
        'برامج مخصصة',
        'تدريب داخلي',
        'مدير حساب'
      ]
    },
    {
      name: 'الخطة المتقدمة',
      price: 'ريال 199/موظف/سنة',
      description: 'للشركات المتوسطة التي تسعى للنمو',
      features: [
        'حتى 500 موظف',
        'دورات متقدمة',
        'تقارير مفصلة',
        'شهادات معتمدة',
        'برامج مخصصة',
        'دعم فني متقدم'
      ],
      notIncluded: [
        'تدريب داخلي',
        'مدير حساب'
      ],
      popular: true
    },
    {
      name: 'الخطة المؤسسية',
      price: 'مخصص',
      description: 'للشركات الكبيرة والمؤسسات الحكومية',
      features: [
        'موظفون غير محدود',
        'دورات غير محدودة',
        'تقارير متقدمة',
        'شهادات معتمدة',
        'برامج مخصصة',
        'دعم فني متقدم',
        'تدريب داخلي',
        'مدير حساب مخصص'
      ],
      notIncluded: []
    }
  ];

  const successStories = [
    {
      name: 'شركة التقنية المتقدمة',
      industry: 'التقنية',
      employees: 1200,
      improvement: '67%',
      testimonial: 'ساعدتنا منصة Lumo في رفع كفاءة الموظفين بنسبة 67% خلال 6 أشهر',
      image: 'bg-gradient-to-r from-blue-500 to-purple-600'
    },
    {
      name: 'مجموعة الخدمات المالية',
      industry: 'الخدمات المالية',
      employees: 800,
      improvement: '45%',
      testimonial: 'برامج التدريب المخصصة أحدثت نقلة نوعية في أداء فرقنا',
      image: 'bg-gradient-to-r from-green-500 to-teal-600'
    },
    {
      name: 'شركة التجزئة الكبرى',
      industry: 'التجزئة',
      employees: 2000,
      improvement: '52%',
      testimonial: 'أفضل استثمار قمنا به في تطوير مهارات فريق المبيعات',
      image: 'bg-gradient-to-r from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">تدريب الشركات</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              برامج تدريبية متخصصة لتطوير مهارات فرق عملك وتحقيق أهدافك الاستراتيجية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Plus className="w-4 h-4 ml-2" />
                ابدأ التجربة المجانية
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
                <Phone className="w-4 h-4 ml-2" />
                طلب استشارة
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
              <div className="p-3 bg-green-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-600">شركة عميلة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50,000+</div>
                <div className="text-sm text-gray-600">موظف مدرب</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">برنامج تدريبي</div>
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
                <div className="text-sm text-gray-600">تقييم العملاء</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'programs', 'pricing', 'success-stories'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'programs' && 'البرامج'}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار شركاتك Lumo؟</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                منصة Lumo هي الشريك المثالي لشركتك في رحلة التطوير المهني والنمو المستمر
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      {program.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                  </div>
                  <p className="text-gray-600">{program.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">برامج تدريبية متخصصة</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                مجموعة شاملة من البرامج المصممة لتلبية احتياجات الشركات الحديثة
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <div key={index} className="flex gap-6">
                  <div className="p-3 bg-green-100 rounded-lg text-green-600 shrink-0">
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-gray-600">{program.description}</p>
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
                اختر الخطة التي تناسب حجم شركتك وميزانية التدريب
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`p-8 hover:shadow-lg transition-shadow ${plan.popular ? 'ring-2 ring-green-500' : ''}`}>
                  {plan.popular && (
                    <div className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full text-center mb-4">
                      الأكثر شعبية
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">{plan.price}</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">قصص نجاح عملائنا</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                تعرف على كيفية تحقيق الشركات نجاحاً ملحوظاً مع برامج التدريب من Lumo
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-32 ${story.image} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <Briefcase className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.name}</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{story.industry}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{story.employees} موظف</span>
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
        <div className="bg-green-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">هل أنت مستعد لتطوير فريق عملك؟</h2>
          <p className="text-lg mb-6">انضم إلى مئات الشركات التي تستخدم Lumo لتحقيق التميز</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Plus className="w-4 h-4 ml-2" />
              ابدأ التجربة المجانية
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
              <Phone className="w-4 h-4 ml-2" />
              طلب استشارة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
