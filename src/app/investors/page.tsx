"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Award, 
  Target,
  FileText,
  Newspaper,
  TrendingUp,
  Heart,
  Building2,
  Star,
  Shield,
  Handshake,
  CheckCircle,
  ArrowRight,
  Calendar,
  Clock,
  Zap,
  DollarSign,
  BarChart3,
  PieChart,
  TrendingDown,
  Activity,
  Eye,
  Download,
  Upload,
  Rocket,
  Linkedin
} from 'lucide-react';

export default function InvestorsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'team' | 'contact'>('overview');

  const financialHighlights = [
    {
      title: "إجمالي التمويل",
      value: "$50 مليون",
      description: "إجمالي التمويل المكتسب",
      icon: DollarSign,
      color: "from-green-500 to-teal-600",
      trend: "+25%"
    },
    {
      title: "المستخدمون النشطون",
      value: "100,000+",
      description: "مستخدم نشط شهرياً",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      trend: "+40%"
    },
    {
      title: "معدل النمو",
      value: "300%",
      description: "معدل النمو السنوي",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600",
      trend: "+50%"
    },
    {
      title: "الدول",
      value: "50+",
      description: "دولة نخدم فيها",
      icon: Globe,
      color: "from-orange-500 to-red-600",
      trend: "+20%"
    }
  ];

  const investors = [
    {
      name: "صندوق الاستثمار السعودي",
      type: "مستثمر رئيسي",
      amount: "$25 مليون",
      date: "ديسمبر 2025",
      description: "استثمار استراتيجي في التوسع العالمي",
      logo: "bg-blue-600",
      icon: Building2
    },
    {
      name: "شركة رأس المال الجريء",
      type: "مستثمر رئيسي",
      amount: "$15 مليون",
      date: "أكتوبر 2025",
      description: "استثمار في تطوير التكنولوجيا",
      logo: "bg-green-600",
      icon: TrendingUp
    },
    {
      name: "مستثمرين ملائكيين",
      type: "مستثمرون ملائكيون",
      amount: "$10 مليون",
      date: "سبتمبر 2025",
      description: "مجموعة من المستثمرين الملائكيين",
      logo: "bg-purple-600",
      icon: Users
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "تأسيس Lumo",
      description: "بدأنا رحلتنا بتأسيس منصة Lumo",
      icon: Star,
      color: "from-yellow-500 to-orange-600"
    },
    {
      year: "2024",
      title: "إطلاق المنتج",
      description: "أطلقنا منصة Lumo للجمهور",
      icon: Rocket,
      color: "from-blue-500 to-indigo-600"
    },
    {
      year: "2025",
      title: "التوسع العالمي",
      description: "بدأنا التوسع في الأسواق العالمية",
      icon: Globe,
      color: "from-green-500 to-teal-600"
    },
    {
      year: "2026",
      title: "النجاح المستمر",
      description: "نحقق نمواً مستمراً ونجاحاً",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const teamMembers = [
    {
      name: "أحمد محمد",
      position: "المؤسس والرئيس التنفيذي",
      bio: "خبير في التعليم الرقمي بخبرة 15 عاماً",
      image: "bg-blue-600",
      icon: Users
    },
    {
      name: "سارة علي",
      position: "رئيسة العمليات",
      bio: "خبيرة في إدارة العمليات والتطوير",
      image: "bg-purple-600",
      icon: Users
    },
    {
      name: "محمد سالم",
      position: "رئيس التكنولوجيا",
      bio: "خبير في تطوير المنصات التعليمية",
      image: "bg-green-600",
      icon: Users
    },
    {
      name: "ليلى أحمد",
      position: "رئيسة التسويق",
      bio: "خبيرة في التسويق الرقمي والنمو",
      image: "bg-orange-600",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">المستثمرون</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              نحن فخورون بثقة المستثمرين في رؤيتنا لمستقبل التعليم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <DollarSign className="w-4 h-4 ml-2" />
                استثمر معنا
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="w-4 h-4 ml-2" />
                تحميل التقارير
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('financials')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'financials'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              التقارير المالية
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'team'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الفريق الإداري
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              تواصل معنا
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Financial Highlights */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">البيانات المالية الرئيسية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {financialHighlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 bg-linear-to-r ${highlight.color} rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{highlight.value}</div>
                          <div className="text-sm text-green-600">{highlight.trend}</div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{highlight.title}</h3>
                      <p className="text-gray-600">{highlight.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Investors */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">مستثمرونا</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investors.map((investor, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 ${investor.logo} rounded-lg flex items-center justify-center`}>
                        <investor.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{investor.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                          {investor.type}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900">{investor.amount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{investor.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{investor.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">الإنجازات الرئيسية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 bg-linear-to-r ${milestone.color} rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{milestone.year}</div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">التقارير المالية</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                قم بتنزيل تقاريرنا المالية للحصول على معلومات مفصلة عن أدائنا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">تقرير ربع سنوي</h3>
                    <p className="text-sm text-gray-600">Q4 2025</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">تقرير مفصل عن الأداء المالي للربع الرابع</p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 ml-2" />
                  تنزيل PDF
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">تقرير سنوي</h3>
                    <p className="text-sm text-gray-600">2025</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">تقرير شامل عن الأداء المالي للعام</p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 ml-2" />
                  تنزيل PDF
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <PieChart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">عرض تقديمي</h3>
                    <p className="text-sm text-gray-600">مستثمرين</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">عرض تقديمي للمستثمرين المحتملين</p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 ml-2" />
                  تنزيل PPT
                </Button>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">بيانات مالية رئيسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$50M</div>
                  <p className="text-blue-700">إجمالي التمويل</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">300%</div>
                  <p className="text-blue-700">معدل النمو</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
                  <p className="text-blue-700">المستخدمون</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <p className="text-blue-700">الدول</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">الفريق الإداري</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                فريق من الخبراء الملتزمين بتحقيق رؤيتنا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 ${member.image} rounded-lg flex items-center justify-center`}>
                      <member.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{member.bio}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 ml-2" />
                      بريد إلكتروني
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="w-4 h-4 ml-2" />
                      LinkedIn
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">لماذا تستثمر في Lumo؟</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-3 bg-green-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-900">نمو سريع</h4>
                  <p className="text-green-700">نمو بنسبة 300% سنوياً</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-green-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-900">سوق عالمي</h4>
                  <p className="text-green-700">حضور في 50+ دولة</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-green-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-900">قاعدة عملاء</h4>
                  <p className="text-green-700">100,000+ مستخدم</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">تواصل مع فريق المستثمرين</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                نحن هنا للإجابة على أسئلتك وتقديم المعلومات التي تحتاجها
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">معلومات التواصل</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">البريد الإلكتروني</div>
                      <div className="text-gray-600">investors@lumo.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">الهاتف</div>
                      <div className="text-gray-600">+966 50 123 4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">العنوان</div>
                      <div className="text-gray-600">الرياض، المملكة العربية السعودية</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">أرسل رسالة</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الرسالة
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="أدخل رسالتك"
                    ></textarea>
                  </div>
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                    <Mail className="w-4 h-4 ml-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12">
          <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">هل أنت مستثمر؟</h3>
              <p className="text-lg mb-6">
                انضم إلينا في رحلتنا لتغيير مستقبل التعليم
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <DollarSign className="w-4 h-4 ml-2" />
                  استثمر الآن
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Download className="w-4 h-4 ml-2" />
                  تحميل التقارير
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
