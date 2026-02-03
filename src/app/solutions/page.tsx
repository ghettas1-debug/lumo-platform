'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  GraduationCap, 
  Users, 
  Code, 
  Award, 
  TrendingUp, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Star,
  BookOpen,
  Target,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Solutions() {
  const solutions = [
    {
      id: 'enterprise',
      title: 'حلول للشركات',
      description: 'منصة تعليمية متكاملة لتدريب وتطوير الموظفين',
      icon: Building,
      color: 'blue',
      href: '/enterprise',
      features: [
        'برامج تدريبية مخصصة',
        'تتبع أداء الموظفين',
        'شهادات معتمدة للشركات',
        'دعم فني متخصص',
        'تقارير تحليلية متقدمة',
        'تكامل مع أنظمة الموارد البشرية'
      ],
      stats: {
        clients: '500+',
        employees: '50K+',
        courses: '1000+'
      }
    },
    {
      id: 'universities',
      title: 'للجامعات',
      description: 'حلول تعليمية متقدمة للمؤسسات الأكاديمية',
      icon: GraduationCap,
      color: 'purple',
      href: '/universities',
      features: [
        'منصات تعليمية افتراضية',
        'نظام إدارة الدورات',
        'تقييمات إلكترونية',
        'مكتبات محتوى رقمية',
        'بحث علمي متقدم',
        'شهادات جامعية معتمدة'
      ],
      stats: {
        universities: '200+',
        students: '500K+',
        professors: '10K+'
      }
    },
    {
      id: 'corporate',
      title: 'تدريب الشركات',
      description: 'برامج تدريبية متخصصة لتطوير مهارات الفرق',
      icon: Users,
      color: 'green',
      href: '/corporate-training',
      features: [
        'تدريب حسب الطلب',
        'ورش عمل تفاعلية',
        'تطوير المهارات القيادية',
        'برامج التدريب المدمج',
        'تقييم ما قبل وبعد التدريب',
        'شهادات احترافية'
      ],
      stats: {
        programs: '300+',
        trainees: '25K+',
        trainers: '500+'
      }
    },
    {
      id: 'developers',
      title: 'للمطورين',
      description: 'API وأدوات للمطورين لدمج Lumo في تطبيقاتهم',
      icon: Code,
      color: 'orange',
      href: '/developers',
      features: [
        'RESTful API شامل',
        'SDKs للغات المختلفة',
        'Webhooks للتكامل',
        'وثائق تقنية مفصلة',
        'بيئة تجريبية مجانية',
        'دعم فني للمطورين'
      ],
      stats: {
        apis: '50+',
        developers: '5K+',
        integrations: '1000+'
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getButtonColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      green: 'bg-green-600 hover:bg-green-700',
      orange: 'bg-orange-600 hover:bg-orange-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              حلول Lumo المتخصصة
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              حلول تعليمية مخصصة تلبي احتياجات الشركات والجامعات والمطورين
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Target className="w-5 h-5" />
                اطلب عرض توضيحي
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                تحميل الكتيب
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Card key={solution.id} className="p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 rounded-lg border ${getColorClasses(solution.color)}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    
                    {/* Stats */}
                    <div className="flex gap-6 mb-6">
                      {Object.entries(solution.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{value}</div>
                          <div className="text-sm text-gray-500 capitalize">
                            {key === 'clients' ? 'عملاء' :
                             key === 'employees' ? 'موظفين' :
                             key === 'courses' ? 'دورة' :
                             key === 'universities' ? 'جامعة' :
                             key === 'students' ? 'طالب' :
                             key === 'professors' ? 'أستاذ' :
                             key === 'programs' ? 'برنامج' :
                             key === 'trainees' ? 'متدرب' :
                             key === 'trainers' ? 'مدرب' :
                             key === 'apis' ? 'API' :
                             key === 'developers' ? 'مطور' :
                             'تكامل'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {solution.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={solution.href}>
                  <Button 
                    className={`w-full ${getButtonColorClasses(solution.color)} text-white border-0 hover:opacity-90`}
                  >
                    تعرف على المزيد
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              لماذا تختار Lumo؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحن نقدم حلولاً تعليمية متكاملة تساعدك على تحقيق أهدافك بكفاءة وفعالية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">آمن وموثوق</h3>
              <p className="text-gray-600">منصة آمنة مع حماية البيانات والامتثال للمعايير العالمية</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">سريع وفعال</h3>
              <p className="text-gray-600">أداء عالي وتحميل سريع مع تجربة مستخدم سلسة</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">معتمد عالمياً</h3>
              <p className="text-gray-600">شهادات معترف بها من المؤسسات التعليمية الرائدة</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            جاهز لتحويل مؤسستك؟
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            تواصل معنا اليوم للحصول على عرض توضيحي مخصص لاحتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
              <TrendingUp className="w-5 h-5 mr-2" />
              اطلب عرض توضيحي
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Users className="w-5 h-5 mr-2" />
              تحدث مع خبير
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
