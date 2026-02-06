"use client";

import { useState } from 'react';
import { Check, X, Star, Users, Award, Clock, HeadphonesIcon, Zap } from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'مجاني',
      description: 'ابدأ رحلتك التعليمية مجاناً',
      price: 0,
      yearlyPrice: 0,
      icon: '🎓',
      color: 'gray',
      popular: false,
      features: [
        { name: 'الوصول إلى 50 دورة مجانية', included: true },
        { name: 'شهادات إتمام', included: false },
        { name: 'دعم فني محدود', included: true },
        { name: 'وصول غير محدود للمحتوى المجاني', included: true },
        { name: 'تتبع التقدم', included: true },
        { name: 'اختبارات وتقييمات', included: true },
        { name: 'مجتمع الطلاب', included: true },
        { name: 'تحميل الدروس', included: false },
        { name: 'دورات متقدمة', included: false },
        { name: 'مشروعات عملية', included: false }
      ]
    },
    {
      id: 'basic',
      name: 'الأساسي',
      description: 'مثالي للمتعلمين الجادين',
      price: 29.99,
      yearlyPrice: 299.99,
      icon: '📚',
      color: 'blue',
      popular: false,
      features: [
        { name: 'الوصول إلى 200+ دورة', included: true },
        { name: 'شهادات إتمام', included: true },
        { name: 'دعم فني عبر البريد', included: true },
        { name: 'تحميل الدروس', included: true },
        { name: 'تتبع التقدم المتقدم', included: true },
        { name: 'اختبارات وتقييمات', included: true },
        { name: 'مجتمع الطلاب', included: true },
        { name: 'دورات متقدمة', included: true },
        { name: 'مشروعات عملية', included: false },
        { name: 'جلسات استشارية', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'احترافي',
      description: 'للمحترفين الذين يريدون التميز',
      price: 59.99,
      yearlyPrice: 599.99,
      icon: '🚀',
      color: 'purple',
      popular: true,
      features: [
        { name: 'الوصول إلى جميع الدورات', included: true },
        { name: 'شهادات إتمام معتمدة', included: true },
        { name: 'دعم فني على مدار الساعة', included: true },
        { name: 'تحميل الدروس بجودة عالية', included: true },
        { name: 'تتبع التقدم المتقدم', included: true },
        { name: 'اختبارات وتقييمات', included: true },
        { name: 'مجتمع الطلاب المميز', included: true },
        { name: 'دورات متقدمة وحصرية', included: true },
        { name: 'مشروعات عملية مع تقييم', included: true },
        { name: 'جلسة استشارية شهرية', included: true }
      ]
    },
    {
      id: 'enterprise',
      name: 'المؤسسات',
      description: 'حلول متكاملة للفرق والشركات',
      price: 199.99,
      yearlyPrice: 1999.99,
      icon: '🏢',
      color: 'gold',
      popular: false,
      features: [
        { name: 'الوصول غير محدود لجميع الدورات', included: true },
        { name: 'شهادات معتمدة مخصصة', included: true },
        { name: 'مدير حساب مخصص', included: true },
        { name: 'تدريب مخصص للفرق', included: true },
        { name: 'منصة تعليمية خاصة', included: true },
        { name: 'تقارير متقدمة', included: true },
        { name: 'تكامل مع أنظمة الموارد البشرية', included: true },
        { name: 'دعم فني مخصص', included: true },
        { name: 'مشروعات عملية للشركات', included: true },
        { name: 'استشارات استراتيجية', included: true }
      ]
    }
  ];


  const formatPrice = (price: number) => {
    return price === 0 ? 'مجاني' : `$${price}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6">اختر خطتك المناسبة</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
            خطط مرنة تناسب جميع الميزانيات. ابدأ مجاناً وترقَّ عندما تكون جاهزاً
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-white text-blue-600' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-full font-bold transition-all relative ${
                billingCycle === 'yearly' 
                  ? 'bg-white text-blue-600' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              سنوي
              {billingCycle === 'yearly' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  وفر 17%
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-2xl scale-105' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-bl-xl text-sm font-bold">
                  الأكثر شعبية
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="text-4xl font-black text-gray-900">
                    {formatPrice(billingCycle === 'monthly' ? plan.price : plan.yearlyPrice)}
                  </div>
                  {plan.price > 0 && (
                    <div className="text-gray-500 text-sm">
                      {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="text-green-500 mt-0.5 shrink-0" size={16} />
                      ) : (
                        <X className="text-gray-300 mt-0.5 shrink-0" size={16} />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.price === 0 ? 'ابدأ مجاناً' : 'اشترك الآن'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">لماذا تختار LUMO؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم أفضل تجربة تعليمية مع ميزات حصرية تساعدك على تحقيق أهدافك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">محتوى عالي الجودة</h3>
              <p className="text-gray-600">
                دورات مصممة من قبل خبراء في مجالاتهم مع تحديث مستمر للمحتوى
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">مجتمع نشط</h3>
              <p className="text-gray-600">
                انضم إلى مجتمع من المتعلمين وشارك الخبرات والمعرفة
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">شهادات معتمدة</h3>
              <p className="text-gray-600">
                احصل على شهادات معتمدة معترف بها في سوق العمل
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">تعلم مرن</h3>
              <p className="text-gray-600">
                تعلم في أي وقت ومكان يناسبك مع الوصول غير المحدود
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">دعم فني</h3>
              <p className="text-gray-600">
                فريق دعم متخصص لمساعدتك في أي وقت تحتاجه
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">تحديث مستمر</h3>
              <p className="text-gray-600">
                محتوى متجدد مع أحدث التقنيات والأفضل الممارسات
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">أسئلة شائعة</h2>
            <p className="text-xl text-gray-600">
              إجابات للأسئلة الأكثر شيوعاً حول خططنا وأسعارنا
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                هل يمكنني تغيير خطتي في أي وقت؟
              </h3>
              <p className="text-gray-600">
                نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات ستطبق في الفترة التالية للفوترة.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                هل هناك فترة تجريبية مجانية؟
              </h3>
              <p className="text-gray-600">
                نعم، جميع الخطط المدفوعة تأتي مع فترة تجريبية مجانية لمدة 14 يوماً.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                ما هي طرق الدفع المتاحة؟
              </h3>
              <p className="text-gray-600">
                نقبل جميع بطاقات الائتمان الرئيسية، PayPal، والتحويل البنكي للخطط المؤسسية.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                هل الشهادات معتمدة؟
              </h3>
              <p className="text-gray-600">
                نعم، شهاداتنا معتمدة ومعترف بها من قبل الشركات الكبرى في المنطقة.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">ابدأ رحلتك التعليمية اليوم</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب الذين يحققون أهدافهم المهنية مع LUMO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              ابدأ مجاناً
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              تواصل مع المبيعات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

