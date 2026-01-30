"use client";

import { useState } from 'react';
import { User, Bell, Shield, Globe, Palette, Smartphone, Lock, Mail, CreditCard, Download, HelpCircle, ChevronRight, Moon, Sun, Monitor } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('ar');

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'appearance', label: 'المظهر', icon: Palette },
    { id: 'language', label: 'اللغة', icon: Globe },
    { id: 'devices', label: 'الأجهزة', icon: Smartphone },
    { id: 'privacy', label: 'الخصوصية', icon: Lock },
    { id: 'billing', label: 'الفواتير', icon: CreditCard },
    { id: 'data', label: 'البيانات', icon: Download },
    { id: 'help', label: 'المساعدة', icon: HelpCircle }
  ];

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                أ
              </div>
              <div>
                <h3 className="text-xl font-bold">أحمد محمد</h3>
                <p className="text-gray-600">ahmed.mohammed@example.com</p>
                <Button variant="outline" className="mt-2">تغيير الصورة</Button>
              </div>
            </div>

            <Card className="p-6">
              <h4 className="font-bold mb-4">معلومات شخصية</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                  <input type="text" defaultValue="أحمد" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأخير</label>
                  <input type="text" defaultValue="محمد" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input type="email" defaultValue="ahmed.mohammed@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                  <input type="tel" defaultValue="+966 50 123 4567" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <Button className="mt-4">حفظ التغييرات</Button>
            </Card>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-bold mb-4">تغيير كلمة المرور</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الحالية</label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة</label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور الجديدة</label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <Button className="mt-4">تحديث كلمة المرور</Button>
            </Card>

            <Card className="p-6">
              <h4 className="font-bold mb-4">المصادقة الثنائية</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">تفعيل المصادقة الثنائية</p>
                  <p className="text-sm text-gray-600">أضف طبقة أمان إضافية لحسابك</p>
                </div>
                <Button variant="outline">تفعيل</Button>
              </div>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-bold mb-4">إعدادات الإشعارات</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">الإشعارات البريد الإلكتروني</p>
                    <p className="text-sm text-gray-600">تلقي تحديثات الدورات والعروض الجديدة</p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعارات المتصفح</p>
                    <p className="text-sm text-gray-600">إشعارات فورية في المتصفح</p>
                  </div>
                  <button className="w-12 h-6 bg-blue-600 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعارات الجوال</p>
                    <p className="text-sm text-gray-600">إشعارات على هاتفك المحمول</p>
                  </div>
                  <button className="w-12 h-6 bg-gray-300 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-bold mb-4">المظهر</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-3">الوضع</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                        !darkMode ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300'
                      }`}
                    >
                      <Sun size={20} />
                      <span>وضع النهار</span>
                    </button>
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                        darkMode ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300'
                      }`}
                    >
                      <Moon size={20} />
                      <span>وضع الليل</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300">
                      <Monitor size={20} />
                      <span>تلقائي</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-bold mb-4">اللغة</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-right ${
                      language === lang.code ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex-1">
                      <p className="font-medium">{lang.name}</p>
                      <p className="text-sm text-gray-600">{lang.code}</p>
                    </div>
                    {language === lang.code && (
                      <ChevronRight size={20} className="text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="p-6">
            <div className="text-center py-8">
              <p className="text-gray-600">هذا القسم قيد التطوير</p>
            </div>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="p-4">
              <h2 className="text-xl font-bold mb-4">الإعدادات</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h1>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
