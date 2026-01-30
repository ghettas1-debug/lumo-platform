"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Users, Building, CheckCircle } from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'general'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      value: 'support@lumo.com',
      description: 'نرد خلال 24 ساعة'
    },
    {
      icon: Phone,
      title: 'الهاتف',
      value: '+966 50 123 4567',
      description: 'الأحد - الخميس: 9 ص - 5 م'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
      description: 'مقر الشركة الرئيسي'
    }
  ];

  const departments = [
    {
      icon: Users,
      name: 'دعم العملاء',
      email: 'support@lumo.com',
      phone: '+966 50 123 4567',
      hours: '24/7'
    },
    {
      icon: Building,
      name: 'المبيعات',
      email: 'sales@lumo.com',
      phone: '+966 50 123 4568',
      hours: 'الأحد - الخميس: 9 ص - 5 م'
    },
    {
      icon: MessageSquare,
      name: 'الشراكات',
      email: 'partnerships@lumo.com',
      phone: '+966 50 123 4569',
      hours: 'الأحد - الخميس: 9 ص - 5 م'
    }
  ];

  const faqItems = [
    {
      question: 'ما هو أسرع طريقة للتواصل معكم؟',
      answer: 'أسرع طريقة هي عبر الدردشة الحية أو البريد الإلكتروني للدعم الفني'
    },
    {
      question: 'هل تقدمون دعماً باللغة العربية؟',
      answer: 'نعم، فريق الدعم متكامل باللغة العربية ويعمل على مدار الساعة'
    },
    {
      question: 'كم تستغرق الاستجابة؟',
      answer: 'نستهدف الرد خلال 24 ساعة للبريد الإلكتروني وفورياً للدردشة الحية'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6">تواصل معنا</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
            نحن هنا لمساعدتك. تواصل معنا عبر أي من القنوات المتاحة وسنرد عليك في أقرب وقت ممكن
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Card key={index} className="text-center p-8">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-lg text-gray-700 mb-2">{info.value}</p>
                <p className="text-gray-500 text-sm">{info.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-8">أرسل لنا رسالة</h2>
            
            {isSubmitted ? (
              <Card className="text-center p-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">تم الإرسال بنجاح!</h3>
                <p className="text-gray-600">
                  شكراً لتواصلك معنا. سنعود إليك في أقرب وقت ممكن.
                </p>
              </Card>
            ) : (
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        الاسم الكامل *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        البريد الإلكتروني *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        رقم الهاتف
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        نوع الاستفسار *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="general">استفسار عام</option>
                        <option value="technical">دعم فني</option>
                        <option value="billing">استفسار مالي</option>
                        <option value="partnership">شراكة</option>
                        <option value="feedback">ملاحظات</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      الموضوع *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="موضوع رسالتك"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      الرسالة *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="ml-2" />
                        إرسال الرسالة
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            )}
          </div>

          {/* Departments & Info */}
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-8">الأقسام</h2>
            
            <div className="space-y-6 mb-12">
              {departments.map((dept, index) => {
                const IconComponent = dept.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <IconComponent size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-400" />
                            <span className="text-gray-600">{dept.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-400" />
                            <span className="text-gray-600">{dept.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-gray-600">{dept.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Quick FAQ */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">أسئلة سريعة</h3>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">موقعنا</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">مقر الشركة</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">العنوان</p>
                    <p className="text-gray-600">
                      طريق الملك فهد، حي النخيل<br />
                      الرياض، المملكة العربية السعودية<br />
                      الرمز البريدي: 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">ساعات العمل</p>
                    <p className="text-gray-600">
                      الأحد - الخميس: 9:00 ص - 5:00 م<br />
                      الجمعة - السبت: مغلق
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">معلومات الاتصال</p>
                    <p className="text-gray-600">
                      هاتف: +966 50 123 4567<br />
                      فاكس: +966 11 234 5678
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Map Placeholder */}
            <Card className="p-8">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-600">خريطة الموقع</p>
                  <p className="text-gray-500 text-sm">سيتم تحميل الخريطة هنا</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">هل أنت مستعد للبدء؟</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب الذين يحققون أهدافهم مع LUMO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              ابدأ مجاناً
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              تحدث مع خبير
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

