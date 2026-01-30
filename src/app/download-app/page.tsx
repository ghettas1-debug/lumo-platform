"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  Download, 
  Play, 
  Apple, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Shield, 
  Heart, 
  Zap, 
  Activity, 
  BarChart3, 
  FileText, 
  Settings, 
  Upload, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Star, 
  Award, 
  Target, 
  TrendingUp, 
  Users, 
  Clock, 
  Calendar, 
  QrCode,
  Wifi,
  Bluetooth,
  Cloud,
  CloudDownload,
  CheckCircle as UserCheckCircle,
  XCircle as UserXCircle,
  MinusCircle as UserMinusCircle,
  PlusCircle as UserPlusCircle,
  Cog as UserCogCircle,
  Shield as UserShieldCircle,
  Users2,
  UserRoundPlus,
  UserRoundMinus,
  UserRoundX,
  UserRoundCheck,
  UserRoundCog
} from 'lucide-react';

export default function DownloadAppPage() {
  const [activeTab, setActiveTab] = useState<'mobile' | 'desktop' | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const platforms = {
    mobile: [
      {
        name: 'iOS',
        icon: <Apple className="w-8 h-8" />,
        version: '2.5.1',
        size: '125 MB',
        description: 'متوافق مع iOS 14.0 وأحدث',
        features: ['دعم كامل', 'مزامنة سحابية', 'إشعارات فورية', 'وضع عدم الاتصال'],
        downloadUrl: '#',
        qrCode: 'QR_IOS'
      },
      {
        name: 'Android',
        icon: <Globe className="w-8 h-8" />,
        version: '2.5.1',
        size: '98 MB',
        description: 'متوافق مع Android 8.0 وأحدث',
        features: ['دعم كامل', 'مزامنة سحابية', 'إشعارات فورية', 'وضع عدم الاتصال'],
        downloadUrl: '#',
        qrCode: 'QR_ANDROID'
      }
    ],
    desktop: [
      {
        name: 'Windows',
        icon: <Monitor className="w-8 h-8" />,
        version: '2.5.1',
        size: '245 MB',
        description: 'متوافق مع Windows 10 و 11',
        features: ['دعم كامل', 'مزامنة سحابية', 'إشعارات سطح المكتب', 'وضع كامل الشاشة'],
        downloadUrl: '#',
        qrCode: 'QR_WINDOWS'
      },
      {
        name: 'macOS',
        icon: <Monitor className="w-8 h-8" />,
        version: '2.5.1',
        size: '198 MB',
        description: 'متوافق مع macOS 10.15 وأحدث',
        features: ['دعم كامل', 'مزامنة سحابية', 'إشعارات سطح المكتب', 'وضع كامل الشاشة'],
        downloadUrl: '#',
        qrCode: 'QR_MAC'
      },
      {
        name: 'Linux',
        icon: <Monitor className="w-8 h-8" />,
        version: '2.5.1',
        size: '156 MB',
        description: 'متوافق مع Ubuntu 18.04 وأحدث',
        features: ['دعم كامل', 'مزامنة سحابية', 'إشعارات سطح المكتب', 'وضع كامل الشاشة'],
        downloadUrl: '#',
        qrCode: 'QR_LINUX'
      }
    ]
  };

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'تجربة متسقة',
      description: 'واجهة موحدة عبر جميع الأجهزة'
    },
    {
      icon: <CloudDownload className="w-6 h-6" />,
      title: 'مزامنة سحابية',
      description: 'تزامن تلقائي للتقدم والبيانات'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'أمان متقدم',
      description: 'تشفير البيانات وحماية الخصوصية'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'أداء فائق',
      description: 'تحسينات للأداء وسرعة الاستجابة'
    },
    {
      icon: <CloudDownload className="w-6 h-6" />,
      title: 'تنزيل غير متصل',
      description: 'حفظ الدورات للمشاهدة بدون إنترنت'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'دعم فوري',
      description: 'مساعدة فنية 24/7 عبر التطبيق'
    }
  ];

  const stats = [
    { label: 'المستخدمون النشطون', value: '500,000+', icon: <Users className="w-5 h-5" /> },
    { label: 'التقييمات', value: '4.8/5', icon: <Star className="w-5 h-5" /> },
    { label: 'التنزيلات', value: '1M+', icon: <Download className="w-5 h-5" /> },
    { label: 'الدول', value: '150+', icon: <Globe className="w-5 h-5" /> }
  ];

  const handleDownload = (platform: string) => {
    setSelectedPlatform(platform);
    // Simulate download
    console.log(`Downloading ${platform} app...`);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">تنزيل تطبيق Lumo</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              احصل على تطبيق Lumo على جميع أجهزتك وتعلم في أي وقت ومكان
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Download className="w-4 h-4 ml-2" />
                تنزيل مجاني
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <QrCode className="w-4 h-4 ml-2" />
                مسح QR code
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['all', 'mobile', 'desktop'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'all' && 'الكل'}
                {tab === 'mobile' && 'موبايل'}
                {tab === 'desktop' && 'سطح المكتب'}
              </button>
            ))}
          </nav>
        </div>

        {/* Platforms */}
        <div className="space-y-12">
          {(activeTab === 'all' || activeTab === 'mobile') && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">تطبيقات الموبايل</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {platforms.mobile.map((platform, index) => (
                  <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="p-4 bg-blue-100 rounded-lg text-blue-600">
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{platform.name}</h3>
                        <p className="text-gray-600">{platform.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الإصدار:</span>
                        <span className="font-medium">{platform.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الحجم:</span>
                        <span className="font-medium">{platform.size}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">المميزات:</h4>
                      <ul className="space-y-2">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleDownload(platform.name)}
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
          )}

          {(activeTab === 'all' || activeTab === 'desktop') && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">تطبيقات سطح المكتب</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.desktop.map((platform, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
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
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">المميزات:</h4>
                      <ul className="space-y-1">
                        {platform.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleDownload(platform.name)}
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
          )}
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">لماذا تطبيق Lumo؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg text-green-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">هل أنت مستعد لبدء رحلة التعلم؟</h2>
          <p className="text-lg mb-6">قم بتنزيل تطبيق Lumo ووصل إلى آلاف الدورات في أي وقت ومكان</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Download className="w-4 h-4 ml-2" />
              تنزيل الآن
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Smartphone className="w-4 h-4 ml-2" />
              اختر جهازك
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
