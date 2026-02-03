'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Users, 
  HelpCircle, 
  FileText, 
  Headphones, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Community() {
  const communitySections = [
    {
      id: 'forums',
      title: 'المنتديات',
      description: 'مجتمع نشط من الطلاب والمدربين لتبادل المعرفة والخبرات',
      icon: MessageSquare,
      color: 'blue',
      href: '/forums',
      features: [
        'منتديات متخصصة حسب المجال',
        'نقاشات جماعية وتفاعلية',
        'مشاركة الخبرات والمعرفة',
        'حل المشكلات المشتركة',
        'شبكة علاقات مهنية',
        'محتوى تعليمي مجتمعي'
      ],
      stats: {
        topics: '10K+',
        members: '50K+',
        posts: '100K+'
      }
    },
    {
      id: 'help',
      title: 'مركز المساعدة',
      description: 'مساعدة فورية وموارد شاملة للإجابة على جميع استفساراتك',
      icon: HelpCircle,
      color: 'green',
      href: '/help',
      features: [
        'قاعدة معرفية شاملة',
        'دليل استخدام مفصل',
        'فيديوهات تعليمية',
        'دعم فني على مدار الساعة',
        'تذاكل دعم فوري',
        'تتبع حالة الطلبات'
      ],
      stats: {
        articles: '500+',
        videos: '200+',
        tickets: '5K+/شهر'
      }
    },
    {
      id: 'faq',
      title: 'الأسئلة الشائعة',
      description: 'أجوبة سريعة ومباشرة للأسئلة الأكثر شيوعاً',
      icon: FileText,
      color: 'purple',
      href: '/faq',
      features: [
        'أسئلة مصنفة حسب الفئة',
        'بحث سريع في الإجابات',
        'تحديث مستمر للمحتوى',
        'تقييم مفيدة للإجابات',
        'اقتراح أسئلة جديدة',
        'ترجمة للغات متعددة'
      ],
      stats: {
        questions: '1000+',
        categories: '50+',
        views: '1M+/شهر'
      }
    },
    {
      id: 'contact',
      title: 'اتصل بنا',
      description: 'تواصل مباشرة مع فريق الدعم للحصول على المساعدة الشخصية',
      icon: Headphones,
      color: 'orange',
      href: '/contact',
      features: [
        'دعم عبر الهاتف',
        'محادثة مباشرة',
        'بريد إلكتروني مخصص',
        'استشارات مجانية',
        'زيارات ميدانية',
        'دعم مخصص للشركات'
      ],
      stats: {
        agents: '50+',
        response: '5 دقائق',
        satisfaction: '98%'
      }
    },
    {
      id: 'status',
      title: 'حالة الخدمة',
      description: 'متابعة حالة النظام والأداء في الوقت الفعلي',
      icon: Shield,
      color: 'red',
      href: '/status',
      features: [
        'حالة الخدمة المباشرة',
        'تقارير الأداء',
        'سجل الصيانة',
        'إشعارات الانقطاع',
        'تقارير شهرية',
        'SLA guarantees'
      ],
      stats: {
        uptime: '99.9%',
        incidents: '2/شهر',
        resolution: '30 دقيقة'
      }
    },
    {
      id: 'api',
      title: 'وثائق API',
      description: 'مصدر شامل للمطورين لدمج واستخدام منصة Lumo',
      icon: BookOpen,
      color: 'indigo',
      href: '/api-docs',
      features: [
        'وثائق تفاعلية',
        'أمثلة برمجية',
        'SDKs للغات المختلفة',
        'بيئة تجريبية',
        'دعم فني للمطورين',
        'مجتمع المطورين'
      ],
      stats: {
        endpoints: '100+',
        languages: '10+',
        developers: '5K+'
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getButtonColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      orange: 'bg-orange-600 hover:bg-orange-700',
      red: 'bg-red-600 hover:bg-red-700',
      indigo: 'bg-indigo-600 hover:bg-indigo-700'
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
              مجتمع Lumo والدعم
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              انضم إلى مجتمعنا النشط واحصل على الدعم الذي تحتاجه لتحقيق النجاح
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Users className="w-5 h-5" />
                انضم للمجتمع
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <HelpCircle className="w-5 h-5" />
                احصل على مساعدة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Sections Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communitySections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg border ${getColorClasses(section.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex gap-4 mb-4">
                  {Object.entries(section.stats).map(([key, value]) => (
                    <div key={key} className="text-center flex-1">
                      <div className="text-lg font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {key === 'topics' ? 'موضوع' :
                         key === 'members' ? 'عضو' :
                         key === 'posts' ? 'مشاركة' :
                         key === 'articles' ? 'مقال' :
                         key === 'videos' ? 'فيديو' :
                         key === 'tickets' ? 'تذكرة' :
                         key === 'questions' ? 'سؤال' :
                         key === 'categories' ? 'فئة' :
                         key === 'views' ? 'مشاهدة' :
                         key === 'agents' ? 'موظف' :
                         key === 'response' ? 'استجابة' :
                         key === 'satisfaction' ? 'رضا' :
                         key === 'uptime' ? 'uptime' :
                         key === 'incidents' ? 'حادث' :
                         key === 'resolution' ? 'حل' :
                         key === 'endpoints' ? 'نقطة' :
                         key === 'languages' ? 'لغة' :
                         key === 'developers' ? 'مطور' : ''}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {section.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={section.href}>
                  <Button 
                    variant="outline" 
                    className={`w-full ${getButtonColorClasses(section.color)} text-white border-0 hover:opacity-90`}
                  >
                    استكشف
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              مجتمعنا ينمو باستمرار
            </h2>
            <p className="text-xl text-gray-600">
              انضم إلى آلاف الطلاب والمدربين الذين يستفيدون من مجتمع Lumo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50M+</div>
              <div className="text-gray-600">طالب حول العالم</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100K+</div>
              <div className="text-gray-600">عضو نشط في المجتمع</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600">محادثة شهرياً</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">رضا العملاء</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            جاهز للانضمام إلى مجتمعنا؟
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            احصل على الدعم والمساعدة التي تحتاجها للنجاح في رحلتك التعليمية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
              <Zap className="w-5 h-5 mr-2" />
              انضم الآن
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Award className="w-5 h-5 mr-2" />
              تصفح المجتمع
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
