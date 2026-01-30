"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, UserCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = "30 يناير 2026";

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">سياسة الخصوصية</h1>
              <p className="text-gray-600">آخر تحديث: {lastUpdated}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              نحن في منصة Lumo نلتزم بحماية خصوصيتك وبياناتك. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">مقدمة</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                مرحباً بك في منصة Lumo التعليمية. نحن نقدر ثقتك ونلتزم بحماية خصوصيتك. 
                توضح هذه سياسة الخصوصية كيف نقوم بجمع واستخدام和保护 المعلومات الشخصية التي تقدمها لنا.
              </p>
              <p>
                باستخدامك لمنصتنا، فإنك توافق على الممارسات الموضحة في هذه السياسة.
              </p>
            </div>
          </Card>

          {/* Information We Collect */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">المعلومات التي نجمعها</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <UserCheck className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">المعلومات الشخصية</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>الاسم والبريد الإلكتروني</li>
                    <li>رقم الهاتف (اختياري)</li>
                    <li>العنوان (للتوصيل)</li>
                    <li>معلومات الدفع</li>
                    <li>السيرة الذاتية والمؤهلات</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <Eye className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">معلومات الاستخدام</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>صفحات التصفح والوقت المستغرق</li>
                    <li>الدورات التي شاهدتها</li>
                    <li>التقدم في التعلم</li>
                    <li>التفاعل مع المحتوى</li>
                    <li>الاختبارات والنتائج</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <Database className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">معلومات تقنية</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>عنوان IP</li>
                    <li>نوع المتصفح وجهاز الكمبيوتر</li>
                    <li>معلومات نظام التشغيل</li>
                    <li>ملفات تعريف الارتباط</li>
                    <li>بيانات الموقع الجغرافي</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* How We Use Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف نستخدم معلوماتك</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">تقديم الخدمات</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• توفير المحتوى التعليمي</li>
                    <li>• تتبع التقدم التعليمي</li>
                    <li>• إصدار الشهادات</li>
                    <li>• دعم العملاء</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">تحسين المنصة</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• تحليلات الاستخدام</li>
                    <li>• تحسين تجربة المستخدم</li>
                    <li>• تطوير الميزات الجديدة</li>
                    <li>• اختبار الأداء</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">التواصل والتسويق</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• إرسال الإشعارات</li>
                    <li>• عروض مخصصة</li>
                    <li>• نشرات إخبارية</li>
                    <li>• تحديثات الدورات</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">الأمان والقانونية</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• منع الاحتيال</li>
                    <li>• حماية الحسابات</li>
                    <li>• الامتثال القانوني</li>
                    <li>• حل النزاعات</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Data Protection */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">حماية البيانات</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Lock className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">تشفير البيانات</h3>
                  <p className="text-gray-600">جميع البيانات مشفرة باستخدام SSL/TLS</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">الوصول المحدود</h3>
                  <p className="text-gray-600">فريق محدود لديه صلاحية الوصول للبيانات</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Database className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">النسخ الاحتياطي</h3>
                  <p className="text-gray-600">نسخ احتياطي منتظم للبيانات</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Your Rights */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">حقوقك</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">الوصول إلى بياناتك</h3>
                  <p className="text-gray-600">يمكنك طلب نسخة من بياناتك الشخصية في أي وقت.</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">تصحيح البيانات</h3>
                  <p className="text-gray-600">يمكنك تصحيح أو تحديث معلوماتك الشخصية.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">حذف البيانات</h3>
                  <p className="text-gray-600">يمكنك طلب حذف بياناتك الشخصية.</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">إلغاء الاشتراك</h3>
                  <p className="text-gray-600">يمكنك إلغاء اشتراكك في أي وقت.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold">البريد الإلكتروني</div>
                  <div className="text-gray-600">privacy@lumo.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold">الهاتف</div>
                  <div className="text-gray-600">+966 50 123 4567</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold">العنوان</div>
                  <div className="text-gray-600">الرياض، المملكة العربية السعودية</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                لأي استفسارات حول سياسة الخصوصية أو حقوقك، لا تتردد في التواصل معنا. 
                سنعود إلى الرد خلال 24 ساعة عمل.
              </p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              <Mail className="w-4 h-4 ml-2" />
              اتصل بنا
            </Button>
            <Button variant="outline" size="lg">
              <Shield className="w-4 h-4 ml-2" />
              إعدادات الخصوصية
            </Button>
            <Link href="/">
              <Button size="lg">
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
