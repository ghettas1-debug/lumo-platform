'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Sparkles, Bell, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  const benefits = [
    {
      icon: Gift,
      title: 'عروض حصرية',
      description: 'احصل على خصومات تصل إلى 50% على الدورات'
    },
    {
      icon: Bell,
      title: 'دورات جديدة',
      description: 'كن أول من يعرف عن الدورات والمحتوى الجديد'
    },
    {
      icon: Sparkles,
      title: 'نصائح احترافية',
      description: 'محتوى تعليمي حصري في بريدك الأسبوعي'
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              شكراً لاشتراكك!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              تم إضافة بريدك الإلكتروني بنجاح إلى قائمتنا البريدية. ستصلك أحدث العروض والدورات قريباً.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsSubscribed(false)}
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              إضافة بريد آخر
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
              <Mail className="w-4 h-4 text-white" />
              <span className="text-white font-medium">انضم إلى 500,000+ مشترك</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">
              لا تفوت فرصة التعلم
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              اشترك في نشرتنا البريدية واحصل على أحدث الدورات والعروض الحصرية مباشرة في بريدك
            </p>
          </div>

          {/* Subscription Form */}
          <div className="max-w-md mx-auto mb-12">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    جاري الاشتراك...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    اشترك الآن
                  </div>
                )}
              </Button>
            </form>
            <p className="text-sm text-blue-100 text-center mt-3">
              بدون رسوم مزعجة، يمكنك إلغاء الاشتراك في أي وقت
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-blue-100 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">500,000+ مشترك</span>
              </div>
              <div className="w-1 h-1 bg-blue-300 rounded-full" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">عروض حصرية أسبوعياً</span>
              </div>
              <div className="w-1 h-1 bg-blue-300 rounded-full" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">إلغاء اشتراك سهل</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
