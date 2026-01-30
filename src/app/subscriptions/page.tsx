"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  Headphones, 
  Download, 
  Zap,
  Crown,
  Rocket,
  Shield,
  Clock,
  Globe,
  CreditCard,
  TrendingUp
} from 'lucide-react';

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'الأساسي',
      description: 'مثالي للمتعلمين الأفراد',
      price: { monthly: 29, yearly: 290 },
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      features: [
        'جميع الدورات الأساسية',
        '500+ ساعة فيديو',
        'شهادات إتمام',
        'دعم عبر البريد',
        'وصول إلى المجتمع',
        'تطبيق الجوال'
      ],
      notIncluded: [
        'الدورات المتقدمة',
        'المشاريع العملية',
        'دعم مباشر 24/7',
        'محتوى حصري'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'المحترف',
      description: 'للمطورين والمحترفين',
      price: { monthly: 79, yearly: 790 },
      icon: Rocket,
      color: 'from-purple-500 to-purple-600',
      features: [
        'جميع الدورات الأساسية والمتقدمة',
        '2000+ ساعة فيديو',
        'شهادات معتمدة',
        'دعم مباشر 24/7',
        'مشاريع عملية',
        'محتوى حصري',
        'تطبيق الجوال والكمبيوتر',
        'تنزيلات غير محدودة'
      ],
      notIncluded: [
        'دورات التدريب الشخصي',
        'وصول API',
        'تقارير مخصصة'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'المؤسسات',
      description: 'للشركات والفرق',
      price: { monthly: 199, yearly: 1990 },
      icon: Crown,
      color: 'from-orange-500 to-orange-600',
      features: [
        'جميع الميزات في خطة المحترف',
        'دورات التدريب الشخصي',
        'وصول API كامل',
        'تقارير مخصصة',
        'إدارة فريق متقدمة',
        'تكامل SSO',
        'دعم مخصص',
        'تدريب داخل الشركة',
        'شهادات مخصصة'
      ],
      notIncluded: [],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مطور Python',
      content: 'خطة المحترف غيرت حياتي المهنية. الدورات والمشاريع العملية ساعدتني في الحصول على وظيفة أحلامي.',
      rating: 5,
      plan: 'المحترف'
    },
    {
      name: 'سارة علي',
      role: 'مصممة UI/UX',
      content: 'المحتوى الحصري والدعم 24/7 يجعل الاشتراك يستحق كل ريال. أوصي بشدة للمحترفين.',
      rating: 5,
      plan: 'المحترف'
    },
    {
      name: 'محمد سالم',
      role: 'مدير تقنية',
      content: 'خطة المؤسسات مثالية لفرقنا. التدريب المخصص والتقارير ساعدتنا في رفع مهارات الفريق.',
      rating: 5,
      plan: 'المؤسسات'
    }
  ];

  const faqs = [
    {
      question: 'هل يمكنني تغيير خطتي في أي وقت؟',
      answer: 'نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات تطبق فوراً.'
    },
    {
      question: 'هل هناك فترة تجريبية مجانية؟',
      answer: 'نعم، نقدم فترة تجريبية مجانية لمدة 14 يوماً على جميع الخطط المدفوعة.'
    },
    {
      question: 'ما هي وسائل الدفع المتاحة؟',
      answer: 'نقبل جميع بطاقات الائتمان الرئيسية، PayPal، والتحويل البنكي في بعض الدول.'
    },
    {
      question: 'هل يمكنني إلغاء اشتراكي؟',
      answer: 'نعم، يمكنك إلغاء اشتراكك في أي وقت. سيستمر الوصول حتى نهاية فترة الفوترة.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">اختر خطتك المناسبة</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              خطط اشتراك مرنة تناسب احتياجاتك من التعلم الفردي إلى التدريب المؤسسي
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={billingCycle === 'monthly' ? 'primary' : 'outline'}
                size="lg"
                onClick={() => setBillingCycle('monthly')}
                className="bg-white text-blue-600 hover:bg-gray-100 border-white"
              >
                شهري
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'primary' : 'outline'}
                size="lg"
                onClick={() => setBillingCycle('yearly')}
                className="bg-white text-blue-600 hover:bg-gray-100 border-white"
              >
                سنوي
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm mr-2">
                  وفر 20%
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const currentPrice = plan.price[billingCycle];
              const monthlyEquivalent = billingCycle === 'yearly' ? currentPrice / 12 : currentPrice;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative overflow-hidden hover:shadow-xl transition-shadow ${
                    plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                      الأكثر شعبية
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className={`p-4 bg-linear-to-r ${plan.color} rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gray-900">
                        ${currentPrice}
                        <span className="text-lg text-gray-500">/{billingCycle === 'monthly' ? 'شهر' : 'سنة'}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="text-sm text-green-600">
                          ${monthlyEquivalent.toFixed(2)} شهرياً
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 opacity-50">
                          <X className="w-5 h-5 text-gray-400 shrink-0" />
                          <span className="text-gray-500 line-through">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular ? 'ابدأ فوراً' : 'اختر الخطة'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">مقارنة الميزات</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-right">الميزة</th>
                  <th className="border border-gray-200 px-4 py-3 text-center">الأساسي</th>
                  <th className="border border-gray-200 px-4 py-3 text-center">المحترف</th>
                  <th className="border border-gray-200 px-4 py-3 text-center">المؤسسات</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">الدورات الأساسية</td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">الدورات المتقدمة</td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">المشاريع العملية</td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">دعم 24/7</td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">وصول API</td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="border border-gray-200 px-4 py-3 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">ماذا يقول عملاؤنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-blue-600">{testimonial.plan}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">أسئلة شائعة</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">ابدأ رحلتك التعليمية اليوم</h2>
          <p className="text-xl mb-8">
            انضم إلى آلاف المتعلمين الذين يحققون أهدافهم مع Lumo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <CreditCard className="w-4 h-4 ml-2" />
              ابدأ تجربة مجانية
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Headphones className="w-4 h-4 ml-2" />
              تواصل مع المبيعات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
