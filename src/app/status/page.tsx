"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Check, 
  X, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Server, 
  Database, 
  Globe, 
  Users, 
  Activity, 
  RefreshCw, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  Shield,
  Wifi,
  HardDrive,
  Cloud,
  Monitor,
  Smartphone,
  Download,
  Bell
} from 'lucide-react';

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const services = [
    {
      name: 'API الرئيسي',
      status: 'operational',
      description: 'API RESTful الرئيسي للمنصة',
      uptime: 99.9,
      responseTime: 234,
      lastIncident: null,
      icon: Server
    },
    {
      name: 'قاعدة البيانات',
      status: 'operational',
      description: 'قاعدة البيانات الرئيسية',
      uptime: 99.8,
      responseTime: 45,
      lastIncident: null,
      icon: Database
    },
    {
      name: 'المصادقة',
      status: 'operational',
      description: 'خدمة المصادقة والمصادقة الثنائية',
      uptime: 99.9,
      responseTime: 123,
      lastIncident: null,
      icon: Shield
    },
    {
      name: 'التحميلات',
      status: 'degraded',
      description: 'خدمة التحميلات والمحتوى',
      uptime: 98.5,
      responseTime: 567,
      lastIncident: '2 ساعات مضت',
      icon: Download
    },
    {
      name: 'الإشعارات',
      status: 'operational',
      description: 'خدمة الإشعارات والبريد الإلكتروني',
      uptime: 99.7,
      responseTime: 89,
      lastIncident: null,
      icon: Bell
    },
    {
      name: 'التحليلات',
      status: 'operational',
      description: 'خدمة التحليلات والتقارير',
      uptime: 99.9,
      responseTime: 345,
      lastIncident: null,
      icon: Activity
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'بطء في خدمة التحميلات',
      description: 'نلاحظ بطءاً في خدمة التحميلات. الفريق يعمل على حل المشكلة.',
      status: 'investigating',
      severity: 'medium',
      startTime: '2026-01-30T13:30:00Z',
      services: ['التحميلات'],
      updates: [
        { time: '2026-01-30T13:30:00Z', message: 'تم الإبلاغ عن المشكلة' },
        { time: '2026-01-30T13:45:00Z', message: 'الفريق يحقق في المشكلة' },
        { time: '2026-01-30T14:00:00Z', message: 'تم تحديد السبب المحتمل' }
      ]
    },
    {
      id: 2,
      title: 'صيانة قاعدة البيانات المجدولة',
      description: 'صيانة قاعدة البيانات المجدولة لتحسين الأداء.',
      status: 'resolved',
      severity: 'low',
      startTime: '2026-01-29T02:00:00Z',
      endTime: '2026-01-29T03:30:00Z',
      services: ['قاعدة البيانات'],
      updates: [
        { time: '2026-01-29T02:00:00Z', message: 'بدء الصيانة المجدولة' },
        { time: '2026-01-29T03:15:00Z', message: 'اكتملت الصيانة بنجاح' },
        { time: '2026-01-29T03:30:00Z', message: 'الخدمة تعمل بشكل طبيعي' }
      ]
    }
  ];

  const uptimeStats = {
    last30Days: 99.8,
    last90Days: 99.7,
    last12Months: 99.6
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'down': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'يعمل';
      case 'degraded': return 'انخفاض الأداء';
      case 'down': return 'متوقف';
      case 'maintenance': return 'صيانة';
      default: return 'غير معروف';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <Check className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'down': return <X className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-700 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'منخفض';
      case 'medium': return 'متوسط';
      case 'high': return 'عالي';
      case 'critical': return 'حرج';
      default: return 'غير معروف';
    }
  };

  const refreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // تحديث كل دقيقة

    return () => clearInterval(interval);
  }, []);

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'degraded';

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">حالة الخدمة</h1>
              <p className="text-gray-600">مراقبة حالة جميع خدمات Lumo في الوقت الفعلي</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-left">
                <div className="text-sm text-gray-500">آخر تحديث</div>
                <div className="text-sm text-gray-900">{lastUpdated.toLocaleTimeString('ar-SA')}</div>
              </div>
              <Button 
                variant="outline" 
                onClick={refreshStatus}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 ml-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                تحديث
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`p-6 rounded-lg border-2 ${
          overallStatus === 'operational' 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                overallStatus === 'operational' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {overallStatus === 'operational' ? (
                  <Check className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {overallStatus === 'operational' ? 'جميع الخدمات تعمل بشكل طبيعي' : 'بعض الخدمات تواجه مشاكل'}
                </h2>
                <p className="text-gray-600">
                  {overallStatus === 'operational' 
                    ? 'لا توجد مشاكل حالياً في أي من الخدمات'
                    : 'بعض الخدمات تواجه مشاكل أو انخفاض في الأداء'
                  }
                </p>
              </div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900">
                {services.filter(s => s.status === 'operational').length}/{services.length}
              </div>
              <div className="text-sm text-gray-600">خدمات تعمل</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">حالة الخدمات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                    {getStatusText(service.status)}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">وقت التشغيل</span>
                    <span className="text-sm font-medium text-gray-900">{service.uptime}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">وقت الاستجابة</span>
                    <span className="text-sm font-medium text-gray-900">{service.responseTime}ms</span>
                  </div>
                  {service.lastIncident && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">آخر حادث</span>
                      <span className="text-sm font-medium text-gray-900">{service.lastIncident}</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Uptime Statistics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">إحصائيات التشغيل</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{uptimeStats.last30Days}%</div>
            <div className="text-gray-600">آخر 30 يوم</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{uptimeStats.last90Days}%</div>
            <div className="text-gray-600">آخر 90 يوم</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{uptimeStats.last12Months}%</div>
            <div className="text-gray-600">آخر 12 شهر</div>
          </Card>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">الأحداث الأخيرة</h2>
        <div className="space-y-4">
          {incidents.map((incident, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                      {getSeverityText(incident.severity)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status === 'investigating' && 'قيد التحقيق'}
                      {incident.status === 'identified' && 'تم تحديد المشكلة'}
                      {incident.status === 'monitoring' && 'تحت المراقبة'}
                      {incident.status === 'resolved' && 'تم الحل'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{incident.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">
                      <strong>الخدمات المتأثرة:</strong> {incident.services.join(', ')}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>وقت البدء:</strong> {new Date(incident.startTime).toLocaleString('ar-SA')}
                    </div>
                    {incident.endTime && (
                      <div className="text-sm text-gray-500">
                        <strong>وقت الانتهاء:</strong> {new Date(incident.endTime).toLocaleString('ar-SA')}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">التحديثات:</h4>
                    <div className="space-y-2">
                      {incident.updates.map((update, updateIndex) => (
                        <div key={updateIndex} className="flex items-start gap-3 text-sm">
                          <span className="text-gray-500 whitespace-nowrap">
                            {new Date(update.time).toLocaleString('ar-SA')}
                          </span>
                          <span className="text-gray-700">{update.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">هل تواجه مشكلة؟</h2>
            <p className="text-xl mb-6">
              إذا واجهت أي مشكلة، لا تتردد في التواصل معنا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="w-4 h-4 ml-2" />
                support@lumo.com
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="w-4 h-4 ml-2" />
                +966 50 123 4567
              </Button>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-8 justify-center">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                <span>اشترك في إشعارات الحالة</span>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5" />
                <span>صفحة الحالة العامة</span>
              </div>
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <span>تقارير الحالة</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
