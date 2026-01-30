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
  Shield
} from 'lucide-react';

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<'open' | 'culture' | 'benefits'>('open');

  const openPositions = [
    {
      title: "مطور واجهات مستخدم",
      department: "الهندسة",
      location: "الرياض، المملكة العربية السعودية",
      type: "دوام كامل",
      description: "بناء وتطوير واجهات مستخدم مبتكرة باستخدام React و Next.js",
      requirements: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      icon: Users
    },
    {
      title: "مصمم محتوى تعليمي",
      department: "المحتوى",
      location: "جدة، المملكة العربية السعودية",
      type: "دوام كامل",
      description: "إنشاء وتصميم محتوى تعليمي جذاب ومفيد",
      requirements: ["كتابة إبداعية", "تصميم جرافيك", "SEO"],
      icon: FileText
    },
    {
      title: "مدير تسويق",
      department: "التسويق",
      location: "الدمام، المملكة العربية السعودية",
      type: "دوام كامل",
      description: "قيادة استراتيجيات التسويق والتسويق الرقمي",
      requirements: ["التسويق الرقمي", "التسويق التقني", "التسويق المحتوى"],
      icon: TrendingUp
    },
    {
      title: "محلل علاقات العملاء",
      department: "الموارد البشرية",
      location: "الرياض، المملكة العربية السعودية",
      type: "دوام كامل",
      description: "بناء علاقات قوية مع الشركاء والعملاء",
      requirements: ["علاقات عامة", "مفاوضات", "مفاوضات"],
      icon: Heart
    }
  ];

  const cultureValues = [
    {
      title: "الابتكار والإبداع",
      description: "نحن نؤمن بالابتكار والإبداع في كل ما نفعله",
      icon: Target
    },
    {
      title: "الجودة والتميز",
      description: "نحن نسعى دائماً للجودة والتميز في منتجاتنا",
      icon: Award
    },
    {
      title: "العمل الجماعي",
      description: "نحن نؤمن بالعمل الجماعي والتعاون الفعال",
      icon: Users
    },
    {
      title: "النمو والتطور",
      description: "نحن ندعم نمو الموظفين وتطوير مهاراتهم",
      icon: TrendingUp
    },
    {
      title: "الصدق والشفافية",
      description: "نحن نلتزم بالصدق والشفافية في جميع تعاملاتنا",
      icon: Shield
    },
    {
      title: "الابتسام والابتكار",
      description: "نحن نؤمن بالابتسام والابتكار في كل ما نفعله",
      icon: Target
    }
  ];

  const benefits = [
    {
      title: "تطوير مهني",
      description: "فرص لتطوير مهاراتك واكتساب خبرات جديدة",
      icon: TrendingUp
    },
    {
      title: "مرونة العمل",
      description: "فرص للنمو المهني مع دعم مستمر",
      icon: Star
    },
    {
      title: "بيئة عمل ممتازة",
      description: "فرص للنمو المهني مع دعم مستمر",
      icon: Star
    },
    {
      title: "تأمين صحي",
      description: "فرص للنمو المهني مع دعم مستمر",
      icon: Star
    },
    {
      title: "إجازات مدفوعة",
      description: "فرص للنمو المهني مع دعم مستمر",
      icon: Star
    },
    {
      title: "تدريب متخصص",
      description: "فرص للنمو المهني مع دعم مستمر",
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">انضم فريق Lumo</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              كن أكثر من مجرد منصة تعليمية - نحن مجتمع من المبدعين والمحترفين
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Users className="w-4 h-4 ml-2" />
                استكشف الفرص
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Briefcase className="w-4 h-4 ml-2" />
                عرض الفرص المفتوحة
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
              onClick={() => setActiveTab('open')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'open'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الوظائف المفتوحة
            </button>
            <button
              onClick={() => setActiveTab('culture')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'culture'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              ثقافة Lumo
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
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'open' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">فرص عمل مفتوحة</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                ابحث عن فرصة تناسب شغفك وكن جزءاً من مجتمع Lumo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openPositions.map((position, index) => {
                const Icon = position.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{position.title}</h3>
                        <p className="text-sm text-gray-600">{position.department}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{position.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        position.type === 'دوام كامل' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {position.type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{position.description}</p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 ml-2" />
                        التقدم للوظيفة
                      </Button>
                      <Button size="sm">
                        <Mail className="w-4 h-4 ml-2" />
                        تواصل معنا
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ثقافة Lumo</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                نحن مجتمع من المبدعين والمحترفين الذين يشاركون في بناء مستقبل التعليم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cultureValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                    </div>
                    <p className="text-gray-700">{value.description}</p>
                  </Card>
                );
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">لماذا تنضم فريقنا؟</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900">النمو المهني</h4>
                  <p className="text-blue-700">تطوير مهاراتك واكتساب خبرات جديدة</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900">العمل الجماعي</h4>
                  <p className="text-blue-700">العمل مع فريق رائع</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900">النمو المستمر</h4>
                  <p className="text-blue-700">فرص للنمو في مسار مهني</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">مزايا العمل في Lumo</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                نقدم مزايايا تنافسية للموظفين للمساعدة على تحقيق أهدافهم المهنية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-700">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">لماذا تختار Lumo؟</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">للموظفين</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>فرص للنمو المهني</li>
                    <li>دعم فني مستمر</li>
                    <li>مرونة مهنية</li>
                    <li>مجتمع داعم</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">للشركات</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>حلول B2B متكامل</li>
                    <li>تدريب متخصص</li>
                    <li>دعم فني متقدم</li>
                    <li>تقارير مخصص</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12">
          <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">هل أنت مستعد للانضمام فريقنا؟</h3>
              <p className="text-lg mb-6">
                انضم مجتمع من المبدعين والمحترفين في بناء مستقبل التعليم
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Users className="w-4 h-4 ml-2" />
                  استكشف الفرص
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Mail className="w-4 h-4 ml-2" />
                  تواصل معنا
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
