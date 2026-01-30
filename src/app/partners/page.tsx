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
  Zap
} from 'lucide-react';

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'technology' | 'education' | 'enterprise'>('all');

  const partners = [
    {
      id: 1,
      name: "مايكروسوفت",
      category: "technology",
      logo: "bg-blue-600",
      description: "شريك تقني استراتيجي في تطوير منصة Lumo",
      benefits: ["دعم تقني متقدم", "وصول إلى Azure", "تدريب متخصص"],
      website: "https://microsoft.com",
      icon: Globe
    },
    {
      id: 2,
      name: "جامعة الملك سعود",
      category: "education",
      logo: "bg-green-600",
      description: "شريك أكاديمي في تطوير المحتوى التعليمي",
      benefits: ["محتوى أكاديمي", "شهادات معتمدة", "بحث مشترك"],
      website: "https://ksu.edu.sa",
      icon: Building2
    },
    {
      id: 3,
      name: "أرامكو",
      category: "enterprise",
      logo: "bg-red-600",
      description: "شريك استراتيجي في تدريب الموظفين",
      benefits: ["تدريب متخصص", "برامج مخصصة", "دعم فني"],
      website: "https://aramco.com",
      icon: Building2
    },
    {
      id: 4,
      name: "جوجل",
      category: "technology",
      logo: "bg-yellow-600",
      description: "شريك تقني في تطوير البنية التحتية السحابية",
      benefits: ["Google Cloud", "دعم تقني", "تحليلات متقدمة"],
      website: "https://google.com",
      icon: Globe
    },
    {
      id: 5,
      name: "جامعة الملك فهد للبترول والمعادن",
      category: "education",
      logo: "bg-blue-800",
      description: "شريك أكاديمي في البحث والتطوير",
      benefits: ["بحث مشترك", "شهادات معتمدة", "تدريب متخصص"],
      website: "https://kfupm.edu.sa",
      icon: Building2
    },
    {
      id: 6,
      name: "سابك",
      category: "enterprise",
      logo: "bg-teal-600",
      description: "شريك استراتيجي في تطوير الموارد البشرية",
      benefits: ["تدريب متخصص", "برامج مخصصة", "شهادات معتمدة"],
      website: "https://sabic.com",
      icon: Building2
    }
  ];

  const partnershipLevels = [
    {
      level: "شريك استراتيجي",
      description: "شركاء رئيسيون يقدمون دعماً شاملاً للمنصة",
      benefits: ["دعم مالي", "وصول حصري", "تسويق مشترك"],
      icon: Star,
      color: "from-yellow-500 to-orange-600"
    },
    {
      level: "شريك تقني",
      description: "شركاء يقدمون حلولاً تقنية متقدمة",
      benefits: ["تكامل تقني", "دعم فني", "تطوير مشترك"],
      icon: Shield,
      color: "from-blue-500 to-indigo-600"
    },
    {
      level: "شريك أكاديمي",
      description: "شركاء من الجامعات والمؤسسات التعليمية",
      benefits: ["محتوى أكاديمي", "شهادات معتمدة", "بحث مشترك"],
      icon: Award,
      color: "from-green-500 to-teal-600"
    },
    {
      level: "شريك تسويق",
      description: "شركاء يساعدون في التسويق والتوزيع",
      benefits: ["تسويق مشترك", "وصول للأسواق", "عائدات مشتركة"],
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const successStories = [
    {
      id: 1,
      title: "نجاح شراكة Lumو مع جامعة الملك سعود",
      partner: "جامعة الملك سعود",
      description: "تم تطوير برنامج تعليمي متكامل خدم 10,000 طالب في العام الأول",
      results: ["10,000 طالب", "95% رضا", "500 شهادة"],
      icon: CheckCircle
    },
    {
      id: 2,
      title: "تدريب 5,000 موظف في أرامكو",
      partner: "أرامكو",
      description: "برنامج تدريب متخصص أدى إلى تحسين الإنتاجية بنسبة 30%",
      results: ["5,000 موظف", "30% تحسين", "200 شهادة"],
      icon: CheckCircle
    },
    {
      id: 3,
      title: "تكامل تقني مع مايكروسوفت",
      partner: "مايكروسوفت",
      description: "استخدام Azure لتحسين أداء المنصة بنسبة 50%",
      results: ["50% تحسين", "99.9% uptime", "24/7 دعم"],
      icon: CheckCircle
    }
  ];

  const filteredPartners = activeTab === 'all' 
    ? partners 
    : partners.filter(partner => partner.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">شركاء النجاح</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              نحن فخورون بشراكتنا مع أفضل الشركات والمؤسسات في العالم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Handshake className="w-4 h-4 ml-2" />
                كن شريكاً
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Building2 className="w-4 h-4 ml-2" />
                استكشف الشراكات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Partnership Levels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">مستويات الشراكة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipLevels.map((level, index) => {
              const Icon = level.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-linear-to-r ${level.color} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{level.level}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <div className="space-y-2">
                    {level.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              جميع الشركاء
            </button>
            <button
              onClick={() => setActiveTab('technology')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'technology'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              شركاء تقنيون
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'education'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              شركاء أكاديميون
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enterprise'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              شركاء مؤسسات
            </button>
          </nav>
        </div>

        {/* Partners Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">شركاؤنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 ${partner.logo} rounded-lg flex items-center justify-center`}>
                    <partner.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {partner.category === 'technology' ? 'تقني' : 
                       partner.category === 'education' ? 'أكاديمي' : 'مؤسسة'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{partner.description}</p>
                <div className="space-y-2 mb-4">
                  {partner.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Globe className="w-4 h-4 ml-2" />
                    الموقع
                  </Button>
                  <Button size="sm">
                    <Mail className="w-4 h-4 ml-2" />
                    تواصل
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">قصص نجاح الشراكة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <Card key={story.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <story.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
                    <p className="text-sm text-gray-600">{story.partner}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{story.description}</p>
                <div className="flex flex-wrap gap-2">
                  {story.results.map((result, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {result}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">لماذا تختار الشراكة مع Lumo؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">نمو سريع</h3>
              <p className="text-gray-600">انضم مجتمع ينمو بسرعة</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-green-100 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">سمعة ممتازة</h3>
              <p className="text-gray-600">ارتبط بعلامة موثوقة</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-purple-100 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">عائدات استثمارية</h3>
              <p className="text-gray-600">فرص عائدات متنوعة</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-orange-100 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">دعم متكامل</h3>
              <p className="text-gray-600">فريق دعم متخصص</p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mb-16">
          <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">هل أنت مستعد لتكون شريكاً؟</h3>
              <p className="text-lg mb-6">
                انضم مجتمع الشركاء الناجحين وكن جزءاً من مستقبل التعليم
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Handshake className="w-4 h-4 ml-2" />
                  طلب شراكة
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Mail className="w-4 h-4 ml-2" />
                  partners@lumo.com
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">تواصل مع فريق الشراكات</h2>
          <p className="text-gray-600 mb-6">
            للأسئلة حول الشراكات، تواصل معنا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <Mail className="w-4 h-4 ml-2" />
              partners@lumo.com
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
