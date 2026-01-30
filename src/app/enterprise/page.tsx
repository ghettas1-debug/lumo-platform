"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  Award, 
  Target, 
  Shield, 
  Globe, 
  Check, 
  Clock, 
  Phone, 
  Mail, 
  Download,
  Zap,
  TrendingUp,
  Briefcase,
  Star,
  Users2,
  Rocket,
  ShieldCheck,
  FileText,
  Headphones,
  Settings,
  ChevronRight,
  Crown,
  MapPin,
  Calendar
} from 'lucide-react';

export default function EnterprisePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'solutions' | 'pricing' | 'contact'>('overview');

  const enterpriseFeatures = [
    {
      icon: Building2,
      title: "بنية منصة تعليمية مخصصة",
      description: "منصة تعليمية متكاملة مصممة خصيصاً لاحتياجات مؤسستك",
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users2,
      title: "إدارة الفرق والفرق",
      description: "نظام متقدم لإدارة الموظفين والفرق التعليمي",
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: "تحليلات متقدمة",
      description: "تحليلات مفصلة عن أداء الفريق وتقدم الطلاب",
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: "أمان متقدم",
      description: "حماية متقدمة مع إدارة الهويات والصلاحيات",
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Globe,
      title: "دعم عالمي",
      description: "دعم متعدد اللغات والمناطق المختلفة",
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const solutions = [
    {
      category: "التعليم العالي",
      title: "منصات تعليمية متكاملة للجامعات والمدارس",
      description: "منصات تعليمية متكاملة مع إدارة المحتوى، التقييم، والتقارير",
      features: [
        "إدارة المحتوى التعليمي",
        "نظام إدارة الدورات",
        "تتبع التقدم الطلاب",
        "شهادات معتمدة",
        "تكامل مع أنظمة إدارة الجامعة"
      ],
      icon: Building2,
      color: "from-blue-500 to-blue-600"
    },
    {
      category: "الشركات التقنية",
      title: "تدريب تقني للمؤسسات التقنية",
      description: "برامج تدريب مخصص للمطورين والمهندسين",
      features: [
        "مسارات تدريب مخصصة",
        "مشاريع تطبيقية",
        "تتبع الأداء",
        "شهادات مهنية"
      ],
      icon: Rocket,
      color: "from-purple-500 to-purple-600"
    },
    {
      category: "الحكوم",
      title: "حلول B2B للشركات",
      description: "حلول متكامل للشركات والمؤسسات",
      features: [
        "إدارة المستخدمين",
        "إدارة الاشتراكات",
        "تقارير الإيرادات",
        "تقارير الفواتير"
      ],
      icon: Award,
      color: 'from-orange-500 to-orange-600'
    },
    {
      category: "الحكوم",
      title: "حلول B2G للجهات الحكومية",
      description: "حلول متكامل للجهات الحكومية مع الامتثال بالقوانين",
      features: [
        "إدارة الطلاب",
        "إدارة الدورات",
        "تقارير الإيرادات",
        "شهادات رسمية"
      ],
      icon: ShieldCheck,
      color: 'from-green-500 to-green-600'
    }
  ];

  const pricingPlans = [
    {
      name: "الأساسي",
      description: "للمؤسسات الصغيرة",
      price: "اتصل بنا لمعرفة المزيد",
      features: [
        "حتى 100 موظف",
        "دعم أساسي",
        "دعم فني",
        "دعم فني"
      ],
      icon: Shield
    },
    {
      name: "المحترف",
      description: "للمؤسسات المتوسطة",
      price: "اتصل بنا لمعرفة المزيد",
      features: [
        "حتى 500 موظف",
        "دعم متقدم",
        "دعم فني",
        "دعم فني",
        "دعم مخصص"
      ],
      icon: Building2
    },
    {
      name: "المؤسسات",
      description: "للمؤسسات الكبيرة",
      price: "اتصل بنا لمعرفة المزيد",
      features: [
        "غير محدود عدد الموظفين",
        "دعم متقدم",
        "دعم فني",
        "دعم مخصص",
        "دعم مخصص",
        "دعم مخصص"
      ],
      icon: Crown
    }
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      company: "شركة تقنية ناشئة",
      role: "مدير تقني معلومات",
      content: "منصة Lumo ساعدتنا في بناء منصة تعليمية مخصصة لشركتنا. الدعم الفني والدعم المخصص كان ممتازاً.",
      rating: 5,
      plan: "المؤسسات"
    },
    {
      name: "سارة علي",
      company: "شركة تقنية",
      role: "مديرة قسم التطوير",
      content: "التدريب المخصص والوصول إلى API والموارد التقنية جعل فريقنا أكثر كفاءة وإنتاجية.",
      rating: 5,
      plan: "المحترف"
    },
    {
      name: "محمد سالم",
      company: "جامعة الملك فيصل",
      role: "مدير قسم الحوسبة",
      content: "منصة Lumo وفرت لنا إدارة المحتوى التعليمي بفعالية وكفاءة.",
      rating: 5,
      plan: "المحترف"
    }
  ];

  const stats = [
    { number: "500+", label: "مؤسسة تخدم Lumo", icon: Building2 },
    { number: "50+", label: "دولة نخدم فيها", icon: Globe },
    { number: "98%", label: "رضا العملاء", icon: Star },
    { number: "24/7", label: "دعم فني", icon: Headphones },
    { number: "99.9%", label: "وقت تشغيل", icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">حلول الشركات والمؤسسات</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              حلول تعليمية متكاملة للشركات والمؤسسات مع دعم عالمي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Download className="w-4 h-4 ml-2" />
                تحميل كتيب
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="w-4 h-4 ml-2" />
                جدولة اجتماعي
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="p-3 bg-white rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

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
              onClick={() => setActiveTab('solutions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'solutions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الحلول
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pricing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الأسعار
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
            {/* Enterprise Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterpriseFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 bg-linear-to-r ${feature.color} rounded-lg w-16 h-16 mx-auto flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="p-3 bg-white rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">هل أنت مستعد لبناء منصة تعليمية مخصصة؟</h2>
                <p className="text-xl mb-6">
                  تواصل معنا اليوم لمناقشة احتياجاتك وتجربة عرض تجريبي مجاني
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Phone className="w-4 h-4 ml-2" />
                    جدولة اجتماعي
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                    <Mail className="w-4 h-4 ml-2" />
                    إرسال بريد إلكتروني
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'solutions' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">حلولنا المنصات</h2>
            
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-linear-to-r ${solution.color} rounded-lg w-16 h-16 mx-auto flex items-center justify-center`}>
                      <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{solution.title}</h3>
                      <p className="text-gray-600">{solution.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {solution.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الأسعار للشركات</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                    <div className="text-center mb-6">
                      <div className={`p-4 bg-linear-to-r ${
                        plan.name === 'المؤسسات' ? 'from-orange-500 to-orange-600' : 
                        plan.name === 'المحترف' ? 'from-purple-500 to-purple-600' : 
                        'from-gray-500 to-gray-600'
                      } rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    <div className="space-y-4">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button className="w-full">
                        {plan.price}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">تواصل معنا</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">معلومات التواصل</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">البريد الإلكتروني</div>
                        <div className="text-gray-600">enterprise@lumo.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">الهاتف</div>
                        <div className="text-gray-600">+966 50 123 4567</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">العنوان</h3>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">الرياض، المملكة العربية السعودية</div>
                        <div className="text-gray-600">الرياض، المملكة العربية السعودية</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">ساعات التواصل</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">الموقع الإلكتروني</div>
                        <div className="text-gray-600">www.lumo.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">الأمان</div>
                        <div className="text-gray-600">security@lumo.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">فريق المبيعات</h3>
                <p className="text-blue-700">
                  فريق المبيعات المتخصص للشركات والمؤسسات متاح دائماً لمساعدتك في تحقيق أهدافك
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                    <Phone className="w-4 h-4 ml-2" />
                    تحديد موعد
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Calendar className="w-4 h-4 ml-2" />
                    جدولة اجتماعي
                  </Button>
                </div>
              </div>
            </Card>

            {/* Testimonials */}
            <Card className="p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">عملاؤنا</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                    <div className="text-sm text-blue-600 font-medium">
                      الخطة: {testimonial.plan}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-12">
        <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">هل لديك أسئلة؟</h3>
            <p className="text-lg mb-6">
              فريق المبيعات المتخصص للشركات والمؤسسات متاح دائماً لمساعدتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
                <Mail className="w-4 h-4 ml-2" />
                enterprise@lumo.com
              </Button>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
                <Phone className="w-4 h-4 ml-2" />
                +966 50 123 4567
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
