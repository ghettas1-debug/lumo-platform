"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Eye, 
  Key, 
  Smartphone, 
  Globe, 
  AlertTriangle, 
  Check, 
  Clock, 
  UserCheck, 
  Server, 
  Database, 
  FileText, 
  Mail,
  Phone,
  Settings,
  Zap,
  ShieldCheck,
  UserX,
  Activity,
  Download
} from 'lucide-react';

export default function SecurityPage() {
  const [activeSection, setActiveSection] = useState<'overview' | 'authentication' | 'data-protection' | 'privacy' | 'compliance'>('overview');

  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: "التشفير المتقدم",
      description: "جميع البيانات مشفرة باستخدام تقنيات التشفير الحديثة AES-256"
    },
    {
      icon: Lock,
      title: "جدار الحماية",
      description: "حماية متعددة الطبقات ضد الهجمات الإلكترونية"
    },
    {
      icon: Key,
      title: "المصادقة الثنائية",
      description: "تأكيد الهوية الثنائية باستخدام تطبيقات المصادقة الموثوقة"
    },
    {
      icon: Eye,
      title: "المراقبة الأمنية",
      description: "مراقبة 24/7 للأنشطة المشبوهة والكشف عن التهديدات"
    },
    {
      icon: Smartphone,
      title: "الأمان المحمول",
      description: "حماية البيانات على الأجهزة المحمولة مع إمكانية مسحها عن بعد"
    },
    {
      icon: Globe,
      title: "شهادات SSL/TLS",
      description: "اتصالات آمنة مشفرة بالكامل بين المستخدم والخوادم"
    }
  ];

  const authenticationMethods = [
    {
      type: "كلمة المرور",
      description: "كلمات مرور قوية مع متطلبات تعقيدية",
      icon: Lock,
      enabled: true
    },
    {
      type: "المصادقة الثنائية (2FA)",
      description: "طبقة إضافية من الحماية باستخدام تطبيقات المصادقة",
      icon: Key,
      enabled: true
    },
    {
      type: "تسجيل الدخول الاجتماعي",
      description: "تسجيل الدخول باستخدام Google و Microsoft",
      icon: UserCheck,
      enabled: true
    },
    {
      type: "المصادقة الحيوية",
      description: "تأكيد الهوية باستخدام بصمات الوجه أو الأصابع",
      icon: Eye,
      enabled: false
    }
  ];

  const complianceStandards = [
    {
      name: "GDPR",
      title: "اللائحة الأوروبية لحماية البيانات",
      description: "الامتثال الكامل مع لوائح GDPR الأوروبية",
      status: "compliant"
    },
    {
      name: "CCPA",
      title: "قانون خصوصية المستهلك في كاليفورنيا",
      description: "الامتثال مع قانون CCPPA لحماية خصوصية المستهلكين",
      status: "compliant"
    },
    {
      name: "SOC 2",
      title: "تقرير تنظيم التحكم في المنظمات",
      description: "شهادة SOC 2 Type II لإدارة الأمان",
      status: "in_progress"
    },
    {
      name: "ISO 27001",
      title: "نظام إدارة أمن المعلومات",
      description: "معيار دولي لإدارة أمن المعلومات",
      status: "planned"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "login",
      user: "أحمد محمد",
      location: "الرياض، المملكة العربية السعودية",
      device: "Windows 11 - Chrome",
      timestamp: "2 دقيقة مضت",
      status: "success"
    },
    {
      id: 2,
      type: "2fa",
      user: "سارة علي",
      location: "جدة، المملكة العربية السعودية",
      device: "iPhone 15 - Safari",
      timestamp: "5 دقائق مضت",
      status: "success"
    },
    {
      id: 3,
      type: "failed_login",
      user: "مجهول",
      location: "غير معروف",
      device: "Android - Chrome",
      timestamp: "15 دقيقة مضت",
      status: "warning"
    },
    {
      id: 4,
      type: "password_change",
      user: "محمد سالم",
      location: "دبي، الإمارات العربية المتحدة",
      device: "MacBook Pro - Safari",
      timestamp: "1 ساعة مضت",
      status: "success"
    },
    {
      id: 5,
      type: "suspicious_activity",
      user: "غير معروف",
      location: "الصين، الصين",
      device: "Windows 10 - Firefox",
      timestamp: "2 ساعات مضت",
      status: "blocked"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'blocked': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Check className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'blocked': return <UserX className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">الأمان والخصوصية</h1>
              <p className="text-gray-600">نحن نلتزم بأعلى معايير الأمان لحماية بياناتك وخصوصيتك</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                تحميل تقرير الأمان
              </Button>
              <Button>
                <Shield className="w-4 h-4 ml-2" />
                إعدادات الأمان
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Score */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900">مستوى الأمان: ممتاز</h3>
                <p className="text-green-700">نظامك محمي بأعلى معايير الأمان</p>
              </div>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-green-900">95%</div>
              <div className="text-sm text-green-700">نقاط الأمان</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveSection('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveSection('authentication')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'authentication'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              المصادقة
            </button>
            <button
              onClick={() => setActiveSection('data-protection')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'data-protection'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              حماية البيانات
            </button>
            <button
              onClick={() => setActiveSection('privacy')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'privacy'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الخصوصية
            </button>
            <button
              onClick={() => setActiveSection('compliance')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'compliance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الامتثال القانوني
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Security Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">النشاط الأمني الأخير</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getStatusColor(activity.status)} bg-opacity-10`}>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {activity.type === 'login' && 'تسجيل الدخول'}
                          {activity.type === '2fa' && 'المصادقة الثنائية'}
                          {activity.type === 'failed_login' && 'فشل تسجيل الدخول'}
                          {activity.type === 'password_change' && 'تغيير كلمة المرور'}
                          {activity.type === 'suspicious_activity' && 'نشاط مشبوه'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {activity.user} • {activity.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-500">{activity.timestamp}</div>
                      <div className="text-sm text-gray-600">{activity.device}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'authentication' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">طرق المصادقة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {authenticationMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className={`p-3 rounded-lg ${method.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Icon className={`w-6 h-6 ${method.enabled ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{method.type}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                        <div className="mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            method.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {method.enabled ? 'مفعل' : 'معطل'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">نصائح الأمان الموصى بها</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">استخدم كلمة مرور قوية</div>
                    <div className="text-sm text-gray-600">8 أحرف على الأقل مع مزيج من الحروف والأرقام</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">فعّل المصادقة الثنائية</div>
                    <div className="text-sm text-gray-600">أضف طبقة حماية إضافية لحسابك</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">تجنب مشاركة كلمة المرور</div>
                    <div className="text-sm text-gray-600">لا تشارك كلمة المرور مع أي شخص</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">سجل الخروج بانتظام</div>
                    <div className="text-sm text-gray-600">سجل الخروج من جميع الأجهزة عند الانتهاء</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'data-protection' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">حماية البيانات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">في حالة التشغيل</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Server className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">الخوادم</div>
                        <div className="text-sm text-gray-600">تشفير متقدم مع جدار حماية</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">قاعدة البيانات</div>
                        <div className="text-sm text-gray-600">تشفير ونسخ احتياطي منتظم</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">النسخ الاحتياطي</div>
                        <div className="text-sm text-gray-600">نسخ احتياطي مشفر يومياً</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">على أجهزة المستخدم</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">التطبيقات</div>
                        <div className="text-sm text-gray-600">حماية من الفيروس والبرامج الضارة</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">التشفير</div>
                        <div className="text-sm text-gray-600">فحص الأمان عند التشغيل</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">التحديثات</div>
                        <div className="text-sm text-gray-600">تحديثات أمنية تلقائية</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">سياسة الاحتفاظ بالبيانات</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">جمع ومعالجة البيانات</h4>
                  <p className="text-blue-800">
                    نجمع البيانات الشخصية فقط للأغراض المعلنة: تقديم الخدمات، تحسين المنتجات، التواصل مع المستخدمين.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">الوصول والتحكم</h4>
                  <p className="text-blue-800">
                    يمكنك طلب نسخة من بياناتك أو حذفها في أي وقت. الوصول محدود للموظفين المصرح لهم.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">الاحتفاظ</h4>
                  <p className="text-blue-800">
                    لا نبيع أو نشارك بياناتك مع أطراف ثالثة دون موافقتك الصريحة.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'privacy' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">إعدادات الخصوصية</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">الملف الشخصي العام</div>
                    <div className="text-sm text-gray-600">مرئي للجميع</div>
                  </div>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">البريد الإلكتروني</div>
                    <div className="text-sm text-gray-600">مرئي للتواصل فقط</div>
                  </div>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">الإشعارات</div>
                    <div className="text-sm text-gray-600">اختر الإشعارات التي تريدها</div>
                  </div>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">التحليلات والإحصائيات</div>
                    <div className="text-sm text-gray-600">تحسين تجربة المستخدم</div>
                  </div>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ملفات تعريف الارتباط</h3>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">
                  نستخدم ملفات تعريف الارتباط (cookies) لتحسين تجربة الاستخدام. يمكنك التحكم في هذه الملفات من إعدادات المتصفح.
                </p>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'compliance' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">الامتثال القانوني</h3>
              <div className="space-y-4">
                {complianceStandards.map((standard, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">{standard.name}</div>
                      <div className="text-sm text-gray-600">{standard.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{standard.description}</div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        standard.status === 'compliant' 
                          ? 'bg-green-100 text-green-800'
                          : standard.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {standard.status === 'compliant' && 'ممتثل'}
                        {standard.status === 'in_progress' && 'قيد التنفيذ'}
                        {standard.status === 'planned' && 'مخطط للتنفيذ'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">تقارير الامتثال</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">مراجعة أمنية دورية</div>
                    <div className="text-sm text-gray-600">تقييمات أمنية ربع سنوية كل 6 أشهر</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">اختبار الاختراق</div>
                    <div className="text-sm text-gray-600">اختبار اختراق أمني سنوي</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">تدريب الموظفين</div>
                    <div className="text-sm text-gray-600">تدريب مستمر على أفضل الممارسات الأمنية</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Contact Security */}
      <div className="mt-12">
        <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">هل لديك مخاوف أمنية؟</h3>
            <p className="text-lg mb-6">
              فريق الأمن متاح 24/7 لمساعدتك في أي استفسارات أمنية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
                <Mail className="w-4 h-4 ml-2" />
                security@lumo.com
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
