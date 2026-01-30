"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Smartphone, 
  Download, 
  Play, 
  Star, 
  Shield, 
  Zap, 
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
  Heart,
  Chrome,
  Globe as Firefox,
  Monitor as Edge,
  Monitor as Opera
} from 'lucide-react';

export default function DesktopPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platforms = [
    {
      name: 'Windows',
      icon: <Monitor className="w-8 h-8" />,
      version: '2.5.1',
      size: '245 MB',
      description: 'متوافق مع Windows 10 و 11',
      features: ['دعم كامل', 'مزامنة سحابية', 'إشعارات سطح المكتب', 'وضع كامل الشاشة'],
      downloadUrl: '#',
      minVersion: 'Windows 10 (64-bit)'
    },
    {
      name: 'macOS',
      icon: <Monitor className="w-8 h-8" />,
      version: '2.5.1',
      size: '198 MB',
      description: 'متوافق مع macOS 10.15 وأحدث',
      features: ['دعم كامل', 'مزامنة سحابية', 'إشعارات سطح المكتب', 'وضع كامل الشاشة'],
      downloadUrl: '#',
      minVersion: 'macOS 10.15 (Catalina)'
    },
    {
      name: 'Linux',
      icon: <Monitor className="w-8 h-8" />,
      version: '2.5.1',
      size: '156 MB',
      description: 'متوافق مع Ubuntu 18.04 وأحدث',
      features: ['دعم كامل', 'مزامنة سحابية', 'إشعارات سطح المكتب', 'وضع كامل الشاشة'],
      downloadUrl: '#',
      minVersion: 'Ubuntu 18.04 LTS'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'آمن وموثوق',
      description: 'تطبيقات موقعة رقمياً مع حماية البيانات'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'أداء فائق',
      description: 'محسّن لأداء سطح المكتب مع استجابة سريعة'
    },
    {
      icon: <CloudDownload className="w-6 h-6" />,
      title: 'مزامنة سحابية',
      description: 'مزامنة تلقائية مع جميع أجهزتك'
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: 'واجهة احترافية',
      description: 'تصميم حديث مناسب للعمل المكتبي'
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: 'وضع عدم الاتصال',
      description: 'حفظ الدورات للمشاهدة بدون إنترنت'
    },
    {
      icon: <Bluetooth className="w-6 h-6" />,
      title: 'مزامنة عبر الشبكة',
      description: 'مزامنة مع أجهزة أخرى عبر الشبكة'
    }
  ];

  const requirements = {
    Windows: {
      title: 'متطلبات النظام',
      specs: [
        'Windows 10 (64-bit) أو Windows 11',
        'معالجج Intel Core i5 أو أحدث',
        '8 GB RAM (موصى 16 GB)',
        '2 GB مساحة تخزين متاحة'
      ]
    },
    macOS: {
      title: 'متطلبات النظام',
      specs: [
        'macOS 10.15 (Catalina) أو أحدث',
        'معالجج Intel Core i5 أو أحدث',
        '8 GB RAM (موصى 16 GB)',
        '2 GB مساحة تخزين متاحة'
      ]
    },
    Linux: {
      title: 'متطلبات النظام',
      specs: [
        'Ubuntu 18.04 LTS أو أحدث',
        'معالجج Intel Core i3 أو أحدث',
        '4 GB RAM (موصى 8 GB)',
        '1.5 GB مساحة تخزين متاحة'
      ]
    }
  };

  const reviews = [
    {
      name: 'أحمد محمد',
      rating: 5,
      date: '2024-01-20',
      comment: 'تطبيق سطح مكتب ممتاز. الأداء رائع!'
    },
    {
      name: 'سارة علي',
      rating: 5,
      date: '2024-01-18',
      comment: 'أفضل تطبيق تعليمي لسطح المكتب. واجهة احترافية.'
    },
    {
      name: 'محمد سالم',
      rating: 4,
      date: '2024-01-15',
      comment: 'محتوى ممتاز وتطبيق سريع. أنصح به بشدة.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Monitor className="w-16 h-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Lumo لسطح المكتب</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              تجربة تعليمية استثنائية على سطح المكتب
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Download className="w-4 h-4 ml-2" />
                تنزيل التطبيق
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700">
                <QrCode className="w-4 h-4 ml-2" />
                مسح QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Platforms */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">اختر منصتك</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-blue-100 rounded-lg text-blue-700">
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                    <p className="text-sm text-gray-600">{platform.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الإصدار:</span>
                    <span className="font-medium">{platform.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحجم:</span>
                    <span className="font-medium">{platform.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحد الأدنى:</span>
                    <span className="font-medium text-sm">{platform.minVersion}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">المميزات:</h4>
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => setSelectedPlatform(platform.name)}
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تنزيل
                  </Button>
                  <Button variant="outline">
                    <QrCode className="w-4 h-4 ml-2" />
                    QR
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">مميزات سطح المكتب</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-700">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">متطلبات النظام</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(requirements).map(([platform, data], index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{platform}</h3>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">{data.title}</h4>
                  <ul className="space-y-2">
                    {data.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 text-sm">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">تقييمات المستخدمين</h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.6</span>
            <span className="text-gray-600">(3,456 تقييم)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{review.name}</div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-lg mb-6">قم بتنزيل تطبيق Lumo لسطح المكتب وابدأ رحلة التعلم</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Download className="w-4 h-4 ml-2" />
              تنزيل الآن
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700">
              <Monitor className="w-4 h-4 ml-2" />
              اختر منصتك
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
