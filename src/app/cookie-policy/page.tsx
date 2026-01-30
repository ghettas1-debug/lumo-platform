"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Cookie, 
  Shield, 
  Eye, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  Lock, 
  Unlock, 
  Key, 
  Database, 
  Server, 
  Cloud, 
  Smartphone, 
  Monitor, 
  Globe, 
  MapPin, 
  Clock, 
  Calendar, 
  RefreshCw, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Copy, 
  Share2, 
  ExternalLink,
  FileText,
  BarChart3,
  Activity,
  Zap,
  Heart,
  Star,
  Award,
  Target,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  BookOpen,
  BookMarked,
  FolderOpen,
  Folder,
  File,
  FilePlus,
  FileMinus,
  FileSearch,
  FileCheck,
  FileX,
  FileArchive,
  FileText as FileTextIcon,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileSpreadsheet,
  Presentation,
  FileSignature,
  FileQuestion,
  FileWarning,
  FilePlus as FilePlusIcon,
  FileMinus as FileMinusIcon,
  FileSearch as FileSearchIcon,
  FileCheck as FileCheckIcon,
  FileX as FileXIcon,
  FileArchive as FileArchiveIcon,
  FileText as FileTextIcon2,
  FileImage as FileImageIcon,
  FileVideo as FileVideoIcon,
  FileAudio as FileAudioIcon,
  FileCode as FileCodeIcon,
  FileSpreadsheet as FileSpreadsheetIcon,
  Presentation as FilePresentationIcon,
  FileSignature as FileSignatureIcon,
  FileQuestion as FileQuestionIcon,
  FileWarning as FileWarningIcon
} from 'lucide-react';

export default function CookiePolicyPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'types' | 'management' | 'contact'>('overview');
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  });

  const cookieTypes = [
    {
      category: 'ضرورية',
      required: true,
      description: 'الكوكيز الضرورية لتشغيل الموقع بشكل صحيح',
      cookies: [
        { name: 'session_id', purpose: 'الحفاظ على جلسة المستخدم', duration: '24 ساعة' },
        { name: 'csrf_token', purpose: 'الحماية من هجمات CSRF', duration: '24 ساعة' },
        { name: 'auth_token', purpose: 'مصادقة المستخدم', duration: '7 أيام' }
      ]
    },
    {
      category: 'وظيفية',
      required: false,
      description: 'الكوكيز التي تحسن وظائف الموقع وتجربة المستخدم',
      cookies: [
        { name: 'language_preference', purpose: 'تذكر لغة المستخدم المفضلة', duration: '30 يوم' },
        { name: 'theme_preference', purpose: 'تذكر مظهر الموقع المفضل', duration: '30 يوم' },
        { name: 'layout_settings', purpose: 'حفظ إعدادات التخطيط', duration: '30 يوم' }
      ]
    },
    {
      category: 'تحليلية',
      required: false,
      description: 'الكوكيز التي تساعدنا على تحليل استخدام الموقع',
      cookies: [
        { name: 'ga_client_id', purpose: 'تحديد المستخدم في Google Analytics', duration: '2 سنة' },
        { name: 'page_views', purpose: 'تتبع عدد الصفحات التي تمت زيارتها', duration: '30 يوم' },
        { name: 'session_duration', purpose: 'قياس مدة الجلسة', duration: '24 ساعة' }
      ]
    },
    {
      category: 'تسويقية',
      required: false,
      description: 'الكوكيز المستخدمة في حملات التسويق والإعلانات',
      cookies: [
        { name: 'ad_click_id', purpose: 'تتبع النقرات على الإعلانات', duration: '30 يوم' },
        { name: 'conversion_id', purpose: 'تتبع التحويلات', duration: '30 يوم' },
        { name: 'retargeting_id', purpose: 'إعادة استهداف المستخدمين', duration: '90 يوم' }
      ]
    }
  ];

  const handleCookieSettingChange = (category: string, value: boolean) => {
    setCookieSettings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const saveCookieSettings = () => {
    // Save preferences to localStorage
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings));
    // Apply settings
    console.log('Cookie settings saved:', cookieSettings);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">سياسة الكوكيز</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              نوضح كيف نستخدم الكوكيز لتحسين تجربتك على منصة Lumo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Settings className="w-4 h-4 ml-2" />
                إعدادات الكوكيز
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600">
                <Download className="w-4 h-4 ml-2" />
                تحميل السياسة
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'types', 'management', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'types' && 'أنواع الكوكيز'}
                {tab === 'management' && 'إدارة الكوكيز'}
                {tab === 'contact' && 'تواصل معنا'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ما هي الكوكيز؟</h2>
              <p className="text-lg text-gray-600 mb-6">
                الكوكيز هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة المواقع الإلكترونية. 
                تساعد هذه الملفات في تحسين تجربة المستخدم من خلال تذكر التفضيلات والمعلومات الشخصية.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">كيف نستخدم الكوكيز</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">الأمان والصلاحية</h4>
                  </div>
                  <p className="text-gray-600">
                    نستخدم الكوكيز لحماية حسابك ومنع الوصول غير المصرح به
                  </p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Settings className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">التفضيلات الشخصية</h4>
                  </div>
                  <p className="text-gray-600">
                    نحفظ إعداداتك المفضلة لتجربة مخصصة ومريحة
                  </p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">التحليلات والإحصائيات</h4>
                  </div>
                  <p className="text-gray-600">
                    نحلل استخدام الموقع لتحسين خدماتنا ومحتوانا
                  </p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">التسويق الموجه</h4>
                  </div>
                  <p className="text-gray-600">
                    نقدم محتوى وإعلانات ذات صلة باهتماماتك
                  </p>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">أنواع الكوكيز التي نستخدمها</h2>
            <div className="space-y-6">
              {cookieTypes.map((category, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Cookie className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {category.required ? (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          ضرورية
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                          اختيارية
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-right py-2 text-sm font-medium text-gray-900">اسم الكوكيز</th>
                          <th className="text-right py-2 text-sm font-medium text-gray-900">الغرض</th>
                          <th className="text-right py-2 text-sm font-medium text-gray-900">المدة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.cookies.map((cookie, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-3 text-sm text-gray-900">{cookie.name}</td>
                            <td className="py-3 text-sm text-gray-600">{cookie.purpose}</td>
                            <td className="py-3 text-sm text-gray-600">{cookie.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'management' && (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">إدارة تفضيلات الكوكيز</h2>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">اختر الكوكيز التي تسمح بها</h3>
              <div className="space-y-4">
                {Object.entries(cookieSettings).map(([key, value]) => {
                  const category = cookieTypes.find(c => c.category.toLowerCase() === key);
                  return (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                          <Cookie className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {category?.category || key}
                          </h4>
                          <p className="text-gray-600">{category?.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {key === 'necessary' ? (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                            ضرورية
                          </span>
                        ) : (
                          <button
                            onClick={() => handleCookieSettingChange(key, !value)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              value ? 'bg-orange-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={saveCookieSettings} className="bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 ml-2" />
                  حفظ الإعدادات
                </Button>
                <Button variant="outline" onClick={() => setCookieSettings({
                  necessary: true,
                  functional: false,
                  analytics: false,
                  marketing: false
                })}>
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة تعيين
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">كيفية إدارة الكوكيز في متصفحك</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Monitor className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Chrome</h4>
                    <p className="text-gray-600">الإعدادات → الخصوصية وأمان → الكوكيز وبيانات المواقع الأخرى</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Monitor className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Firefox</h4>
                    <p className="text-gray-600">الخيارات → الخصوصية والأمان → حماية محسنة ضد التتبع</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Monitor className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Safari</h4>
                    <p className="text-gray-600">تفضيلات → الخصوصية → إدارة بيانات المواقع</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">لديك أسئلة حول الكوكيز؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">البريد الإلكتروني</h3>
                </div>
                <p className="text-gray-600 mb-4">تواصل معنا عبر البريد الإلكتروني</p>
                <a href="mailto:privacy@lumo.com" className="text-orange-600 hover:text-orange-700">
                  privacy@lumo.com
                </a>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">الهاتف</h3>
                </div>
                <p className="text-gray-600 mb-4">اتصل بنا من الأحد إلى الخميس</p>
                <a href="tel:+966500000000" className="text-orange-600 hover:text-orange-700">
                  +966 50 000 0000
                </a>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">تحديثات السياسة</h3>
              <p className="text-gray-600 mb-4">
                قد نقوم بتحديث سياسة الكوكيز من وقت لآخر. سيتم إعلامك بأي تغييرات مهمة عبر:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>إشعار على الموقع</li>
                <li>بريد إلكتروني للمستخدمين المسجلين</li>
                <li>تحديث تاريخ آخر تعديل في هذه الصفحة</li>
              </ul>
              <p className="text-gray-600 mt-4">
                آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
