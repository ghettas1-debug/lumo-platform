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
  Share2,
  Gift,
  Crown
} from 'lucide-react';

export default function AffiliatesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'how-it-works' | 'join'>('overview');

  const affiliateTiers = [
    {
      name: "شريك أساسي",
      commission: "10%",
      description: "للمبتدئين في التسويق بالعمولة",
      benefits: ["10% عمولة", "دعم أساسي", "مواد تسويقية", "تقارير شهرية"],
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      minSales: 0
    },
    {
      name: "شريك متقدم",
      commission: "20%",
      description: "للمسوقين ذوي الخبرة",
      benefits: ["20% عمولة", "دعم متقدم", "مواد حصرية", "تقارير أسبوعية"],
      icon: Star,
      color: "from-purple-500 to-pink-600",
      minSales: 50
    },
    {
      name: "شريك مميز",
      commission: "30%",
      description: "للمسوقين المحترفين",
      benefits: ["30% عمولة", "دعم مميز", "مواد حصرية", "تقارير يومية"],
      icon: Crown,
      color: "from-yellow-500 to-orange-600",
      minSales: 200
    },
    {
      name: "شريك استراتيجي",
      commission: "40%",
      description: "للمسوقين الكبار",
      benefits: ["40% عمولة", "دعم استراتيجي", "مواد حصرية", "تقارير فورية"],
      icon: Award,
      color: "from-green-500 to-teal-600",
      minSales: 500
    }
  ];

  const benefits = [
    {
      title: "عمولات تنافسية",
      description: "احصل على أفضل نسب عمولات في السوق",
      icon: DollarSign,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "مواد تسويقية مجانية",
      description: "استخدم مواد تسويقية احترافية مجاناً",
      icon: Gift,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "تقارير مفصلة",
      description: "تتبع أدائك مع تقارير مفصلة",
      icon: BarChart3,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "دعم فني متخصص",
      description: "فريق دعم متخصص لمساعدتك",
      icon: Shield,
      color: "from-orange-500 to-red-600"
    },
    {
      title: "مدفوعات منتظمة",
      description: "احصل على عمولاتك بانتظام",
      icon: Clock,
      color: "from-yellow-500 to-orange-600"
    },
    {
      title: "مجتمع نشط",
      description: "انضم مجتمع المسوقين الناجحين",
      icon: Users,
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "سجل في البرنامج",
      description: "املأ نموذج التسجيل وانتظر الموافقة",
      icon: Users,
      color: "from-blue-500 to-indigo-600"
    },
    {
      step: 2,
      title: "احصل على رابط التسويق",
      description: "احصل على رابط ترويجي فريد لك",
      icon: Share2,
      color: "from-purple-500 to-pink-600"
    },
    {
      step: 3,
      title: "سوق Lumo",
      description: "استخدم موادنا التسويقية للترويج",
      icon: TrendingUp,
      color: "from-green-500 to-teal-600"
    },
    {
      step: 4,
      title: "احصل على عمولات",
      description: "احصل على عمولات على كل عملية بيع",
      icon: DollarSign,
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const successStories = [
    {
      name: "أحمد محمد",
      tier: "شريك متقدم",
      earnings: "5,000 ريال شهرياً",
      description: "بدأت كشريك أساسي ووصلت إلى شريك متقدم في 3 أشهر",
      icon: Star
    },
    {
      name: "سارة علي",
      tier: "شريك مميز",
      earnings: "8,000 ريال شهرياً",
      description: "استخدمت وسائل التواصل الاجتماعي لتحقيق نجاح كبير",
      icon: Crown
    },
    {
      name: "محمد سالم",
      tier: "شريك استراتيجي",
      earnings: "15,000 ريال شهرياً",
      description: "بنيت شبكة تسويقية كبيرة وحققت نجاحاً استثنائياً",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">برنامج التسويق بالعمولة</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              احصل على عمولات تنافسية عند تسويق Lumo - منصة التعليم العالمية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Handshake className="w-4 h-4 ml-2" />
                انضم البرنامج
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <DollarSign className="w-4 h-4 ml-2" />
                احسب عمولاتك
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
              onClick={() => setActiveTab('benefits')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'benefits'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              المزايا
            </button>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'how-it-works'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              كيف يعمل
            </button>
            <button
              onClick={() => setActiveTab('join')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'join'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              انضم الآن
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">مستويات الشراكة</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                اختر مستوى الشراكة الذي يناسبك واحصل على عمولات تنافسية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {affiliateTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 bg-linear-to-r ${tier.color} rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                        <div className="text-2xl font-bold text-blue-600">{tier.commission}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    <div className="space-y-2 mb-4">
                      {tier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      الحد الأدنى: {tier.minSales} عملية بيع
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">لماذا تختار برنامج Lumo؟</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900">عمولات عالية</h4>
                  <p className="text-blue-700">حتى 40% عمولة</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900">دعم متكامل</h4>
                  <p className="text-blue-700">فريق دعم متخصص</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900">نمو مستمر</h4>
                  <p className="text-blue-700">فرص للتطور</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">مزايا البرنامج</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                استمتع بمزايا حصرية كشريك تسويق مع Lumo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 bg-linear-to-r ${benefit.color} rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-700">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">أرقام البرنامج</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
                  <p className="text-green-700">أعلى نسبة عمولة</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">5,000+</div>
                  <p className="text-green-700">شريك نشط</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">100,000+</div>
                  <p className="text-green-700">عملاء تم إحالتهم</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <p className="text-green-700">دعم فني</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف يعمل البرنامج</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                اتبع هذه الخطوات البسيطة لبدء كسب العمولات
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                      </div>
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </Card>
                );
              })}
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">قصص نجاح</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStories.map((story, index) => {
                  const Icon = story.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="p-3 bg-purple-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-purple-900">{story.name}</h4>
                      <p className="text-purple-700">{story.tier}</p>
                      <div className="text-2xl font-bold text-purple-600">{story.earnings}</div>
                      <p className="text-purple-700 text-sm">{story.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'join' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">انضم البرنامج الآن</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                املأ النموذج وابدأ كسب العمولات اليوم
              </p>
            </div>

            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
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
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الموقع
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">اختر موقعك</option>
                      <option value="saudi">المملكة العربية السعودية</option>
                      <option value="uae">الإمارات العربية المتحدة</option>
                      <option value="qatar">قطر</option>
                      <option value="kuwait">الكويت</option>
                      <option value="bahrain">البحرين</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مستوى الشراكة
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">اختر مستوى الشراكة</option>
                      <option value="basic">شريك أساسي</option>
                      <option value="advanced">شريك متقدم</option>
                      <option value="premium">شريك مميز</option>
                      <option value="strategic">شريك استراتيجي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الخبرة في التسويق
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">اختر خبرتك</option>
                      <option value="beginner">مبتدئ</option>
                      <option value="intermediate">متوسط</option>
                      <option value="advanced">متقدم</option>
                      <option value="expert">خبير</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رسالة تعريفية
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="أخبرنا عن خبرتك في التسويق ولماذا تريد الانضمام لبرنامجنا"
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="ml-2"
                    id="terms"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    أوافق على شروط وأحكام البرنامج
                  </label>
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                    <Handshake className="w-4 h-4 ml-2" />
                    إرسال الطلب
                  </Button>
                  <Button variant="outline" size="lg">
                    <Mail className="w-4 h-4 ml-2" />
                    تواصل معنا
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12">
          <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">هل أنت مستعد لبدء كسب العمولات؟</h3>
              <p className="text-lg mb-6">
                انضم آلاف المسوقين الناجحين وابدأ كسب الدخل اليوم
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Handshake className="w-4 h-4 ml-2" />
                  انضم البرنامج
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <DollarSign className="w-4 h-4 ml-2" />
                  احسب عمولاتك
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">تواصل مع فريق الشراكات</h2>
          <p className="text-gray-600 mb-6">
            للأسئلة حول برنامج التسويق بالعمولة، تواصل معنا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <Mail className="w-4 h-4 ml-2" />
              affiliates@lumo.com
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
