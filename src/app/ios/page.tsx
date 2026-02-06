"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Apple, 
  Download, 
  Play, 
  Star, 
  Shield, 
  Zap, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Wifi, 
  Bluetooth, 
  Cloud, 
  CloudDownload, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Clock, 
  Award, 
  Target, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Settings, 
  RefreshCw, 
  ExternalLink,
  QrCode,
  Globe,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Heart
} from 'lucide-react';

export default function IOSPage() {
  const [selectedVersion, setSelectedVersion] = useState('latest');

  const versions = [
    {
      version: '2.5.1',
      releaseDate: '2024-01-15',
      size: '125 MB',
      minIOS: 'iOS 14.0',
      features: [
        'واجهة مستخدم محسّنة',
        'أداء أسرع بنسبة 30%',
        'دعم كامل للوضع الليلي',
        'مزامنة سحابية محسّنة',
        'إشعارات فورية محسّنة'
      ],
      bugFixes: [
        'إصلاح مشكلة تسجيل الدخول',
        'تحسين استقرار الفيديو',
        'إصلاح مشكلة المزامنة'
      ]
    },
    {
      version: '2.5.0',
      releaseDate: '2023-12-20',
      size: '124 MB',
      minIOS: 'iOS 14.0',
      features: [
        'وضع عدم الاتصال',
        'تحسينات الأداء',
        'دعم كامل للآيباد برو',
        'مزامنة سحابية',
        'إشعارات فورية'
      ],
      bugFixes: [
        'إصلاح مشاكل الأداء',
        'تحسين واجهة المستخدم'
      ]
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'آمن وموثوق',
      description: 'تطبيق معتمد من Apple مع حماية البيانات'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'أداء فائق',
      description: 'محسّن لأجهزة iOS مع أسرع أداء'
    },
    {
      icon: <CloudDownload className="w-6 h-6" />,
      title: 'مزامنة سحابية',
      description: 'مزامنة تلقائية مع جميع أجهزتك'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'واجهة سلسة',
      description: 'تصميم حديث يتوافق مع تصميم iOS'
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: 'وضع عدم الاتصال',
      description: 'حفظ الدورات للمشاهدة بدون إنترنت'
    },
    {
      icon: <Bluetooth className="w-6 h-6" />,
      title: 'مزامنة بلوتوث',
      description: 'مزامنة مع أجهزة أخرى عبر بلوتوث'
    }
  ];

  const requirements = [
    {
      title: 'النظام',
      value: 'iOS 14.0 أو أحدث'
    },
    {
      title: 'المساحة',
      value: '125 MB مساحة تخزين'
    },
    {
      title: 'الاتصال',
      value: 'اتصال بالإنترنت للتثبيت الأول'
    },
    {
      title: 'الحساب',
      value: 'حساب Apple ID'
    }
  ];

  const reviews = [
    {
      name: 'أحمد محمد',
      rating: 5,
      date: '2024-01-20',
      comment: 'تطبيق رائع وسهل الاستخدام. الأداء ممتاز!'
    },
    {
      name: 'سارة علي',
      rating: 5,
      date: '2024-01-18',
      comment: 'أفضل تطبيق تعليمي استخدمته. واجهة جميلة وسلسة.'
    },
    {
      name: 'محمد سالم',
      rating: 4,
      date: '2024-01-15',
      comment: 'محتوى ممتاز وتطبيق سريع. أنصح به بشدة.'
    }
  ];

  const currentVersion = versions.find(v => v.version === selectedVersion) || versions[0];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Apple className="w-16 h-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Lumo لـ iOS</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              تجربة تعليمية استثنائية على أجهزة iPhone و iPad
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Download className="w-4 h-4 ml-2" />
                تنزيل من App Store
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                <QrCode className="w-4 h-4 ml-2" />
                مسح QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Version Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">اختر الإصدار</h2>
          <div className="flex justify-center gap-4 mb-8">
            {versions.map((version) => (
              <Button
                key={version.version}
                variant={selectedVersion === version.version ? "default" : "outline"}
                onClick={() => setSelectedVersion(version.version)}
              >
                الإصدار {version.version}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Version Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                الإصدار {currentVersion.version}
              </h3>

              <div className="flex gap-4">
                <Button className="flex-1">
                  <Download className="w-4 h-4 ml-2" />
                  تنزيل الآن
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  App Store
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
