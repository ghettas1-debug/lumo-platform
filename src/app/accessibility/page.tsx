"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Accessibility, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  Minus, 
  Palette, 
  Moon, 
  Sun, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Upload, 
  Copy, 
  Edit, 
  Trash2, 
  MoreVertical, 
  Calendar, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  Globe, 
  Shield, 
  Key, 
  Lock, 
  Unlock, 
  FileText, 
  FileCheck, 
  FileSearch, 
  FileLock, 
  FileSignature, 
  FileWarning, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  UserCheck, 
  UserX, 
  UserLock, 
  KeyRound, 
  Fingerprint, 
  LockKeyhole, 
  UnlockKeyhole, 
  Terminal, 
  Braces, 
  Package, 
  GitBranch, 
  GitMerge, 
  GitCommit, 
  GitPullRequest, 
  GitFork, 
  Database, 
  Server, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Network, 
  Router, 
  Code, 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  Plus
} from 'lucide-react';

export default function AccessibilityPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(true);

  const accessibilityFeatures = [
    {
      id: 'visual',
      title: 'الإمكانيات البصرية',
      description: 'تحسينات للمستخدمين ضعاف البصر',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      features: [
        'تكبير وتصغير النص',
        'وضع التباين العالي',
        'الوضع الليلي',
        'قارئ الشاشة',
        'ألوان متخصصة'
      ],
      status: 'active'
    },
    {
      id: 'hearing',
      title: 'الإمكانيات السمعية',
      description: 'دعم المستخدمين ضعاف السمع',
      icon: <Volume2 className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      features: [
        'ترجمة نصية للصوت',
        'إشعارات مرئية',
        'تحكم في مستوى الصوت',
        'تعليقات توضيحية'
      ],
      status: 'active'
    },
    {
      id: 'motor',
      title: 'الإمكانيات الحركية',
      description: 'تسهيلات للمستخدمين ذوي الإعاقات الحركية',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      features: [
        'التنقل بلوحة المفاتيح',
        'أوامر صوتية',
        'تباعد بين العناصر',
        'أزرار كبيرة'
      ],
      status: 'active'
    },
    {
      id: 'cognitive',
      title: 'الإمكانيات المعرفية',
      description: 'دعم المستخدمين ذوي الإعاقات المعرفية',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      features: [
        'واجهة بسيطة',
        'تعليمات واضحة',
        'رسائل خطأ مفهومة',
        'تنقل سهل'
      ],
      status: 'active'
    }
  ];

  const wcagCompliance = [
    {
      level: 'A',
      description: 'المستوى الأساسي',
      requirements: 25,
      completed: 25,
      percentage: 100
    },
    {
      level: 'AA',
      description: 'المستوى المتوسط',
      requirements: 13,
      completed: 12,
      percentage: 92
    },
    {
      level: 'AAA',
      description: 'المستوى المتقدم',
      requirements: 23,
      completed: 18,
      percentage: 78
    }
  ];

  const testingTools = [
    {
      name: 'محقق التباين',
      description: 'فحص تباين الألوان',
      icon: <Eye className="w-5 h-5" />,
      status: 'available'
    },
    {
      name: 'قارئ الشاشة',
      description: 'اختبار قارئ الشاشة',
      icon: <Volume2 className="w-5 h-5" />,
      status: 'available'
    },
    {
      name: 'التنقل بلوحة المفاتيح',
      description: 'اختبار التنقل',
      icon: <Type className="w-5 h-5" />,
      status: 'available'
    },
    {
      name: 'مقياس الوضوح',
      description: 'فحص وضوح النص',
      icon: <Search className="w-5 h-5" />,
      status: 'available'
    }
  ];

  const handleFontSizeChange = (delta: number) => {
    const newSize = fontSize + delta;
    if (newSize >= 12 && newSize <= 24) {
      setFontSize(newSize);
    }
  };

  const handleReset = () => {
    setFontSize(16);
    setHighContrast(false);
    setDarkMode(false);
    setReducedMotion(false);
    setScreenReader(false);
    setKeyboardNavigation(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'partial':
        return 'جزئي';
      case 'inactive':
        return 'غير نشط';
      default:
        return 'غير معروف';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إمكانية الوصول</h1>
              <p className="text-gray-600 mt-1">جعل المنصة متاحة للجميع</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                تقرير الوصول
              </Button>
              <Button variant="default">
                <Plus className="w-4 h-4 ml-2" />
                تحسين جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Settings */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">الإعدادات السريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Font Size */}
            <div className="space-y-3">
              <label className="font-medium text-gray-900">حجم النص</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFontSizeChange(-2)}
                  disabled={fontSize <= 12}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium" style={{ fontSize: `${fontSize}px` }}>
                  {fontSize}px
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFontSizeChange(2)}
                  disabled={fontSize >= 24}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="space-y-3">
              <label className="font-medium text-gray-900">التباين العالي</label>
              <Button
                variant={highContrast ? "default" : "outline"}
                onClick={() => setHighContrast(!highContrast)}
                className="w-full"
              >
                {highContrast ? 'مفعل' : 'غير مفعل'}
              </Button>
            </div>

            {/* Dark Mode */}
            <div className="space-y-3">
              <label className="font-medium text-gray-900">الوضع الليلي</label>
              <Button
                variant={darkMode ? "default" : "outline"}
                onClick={() => setDarkMode(!darkMode)}
                className="w-full"
              >
                {darkMode ? 'مفعل' : 'غير مفعل'}
              </Button>
            </div>

            {/* Reduced Motion */}
            <div className="space-y-3">
              <label className="font-medium text-gray-900">تقليل الحركة</label>
              <Button
                variant={reducedMotion ? "default" : "outline"}
                onClick={() => setReducedMotion(!reducedMotion)}
                className="w-full"
              >
                {reducedMotion ? 'مفعل' : 'غير مفعل'}
              </Button>
            </div>

            {/* Screen Reader */}
            <div className="space-y-3">
              <label className="font-medium text-gray-900">قارئ الشاشة</label>
              <Button
                variant={screenReader ? "default" : "outline"}
                onClick={() => setScreenReader(!screenReader)}
                className="w-full"
              >
                {screenReader ? 'مفعل' : 'غير مفعل'}
              </Button>
            </div>

            {/* Reset */}
            <div className="space-y-3">
              <label className="font-medium text-gray-900">إعادة التعيين</label>
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 ml-2" />
                إعادة التعيين
              </Button>
            </div>
          </div>
        </Card>

        {/* Accessibility Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accessibilityFeatures.map((feature) => (
            <Card key={feature.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-linear-to-r ${feature.color} rounded-lg text-white`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
              <div className="mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feature.status)}`}>
                  {getStatusText(feature.status)}
                </span>
              </div>
              <div className="space-y-2">
                {feature.features.map((feat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{feat}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* WCAG Compliance */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">الامتثال لمعايير WCAG</h3>
          <div className="space-y-4">
            {wcagCompliance.map((level) => (
              <div key={level.level} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">المستوى {level.level}</h4>
                    <p className="text-sm text-gray-600">{level.description}</p>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">{level.percentage}%</div>
                    <div className="text-sm text-gray-600">
                      {level.completed}/{level.requirements}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      level.percentage >= 90 
                        ? 'bg-green-500' 
                        : level.percentage >= 70
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${level.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Testing Tools */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">أدوات الاختبار</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testingTools.map((tool) => (
              <div key={tool.name} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {tool.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tool.name}</h4>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  تشغيل
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Guidelines */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">إرشادات التصميم</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">النصوص والقراءة</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• استخدم خطوط واضحة وسهلة القراءة</li>
                <li>• حجم النص لا يقل عن 16px</li>
                <li>• تباين الألوان لا يقل عن 4.5:1</li>
                <li>• استخدم تباعد مناسب بين الأسطر</li>
                <li>• تجنب النصوص فقط بالصور</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">التنقل والتفاعل</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• اجعل جميع العناصر قابلة للوصول بلوحة المفاتيح</li>
                <li>• استخدم ترتيب منطقي للتبويب</li>
                <li>• وفر بديل نصي للصور</li>
                <li>• استخدم عناوين واضحة ومنظمة</li>
                <li>• اجعل الروابط وصفية</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">الألوان والتصميم</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• لا تعتمد على اللون فقط لنقل المعلومات</li>
                <li>• استخدم ألوان متباينة بشكل كافٍ</li>
                <li>• وفر وضع تباين عالي</li>
                <li>• تجنب الأنماط التي تسبب الصداع</li>
                <li>• استخدم ألوان هادئة ومريحة</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">الوسائط المتعددة</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• وفر ترجمة نصية للفيديوهات</li>
                <li>• استخدم تعليقات توضيحية</li>
                <li>• وفر تحكم في الصوت والحركة</li>
                <li>• استخدم بدائل للوسائط المتعددة</li>
                <li>• اجعل المحتوى متاحًا بدون وسائط</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
