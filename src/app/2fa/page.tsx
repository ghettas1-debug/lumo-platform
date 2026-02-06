"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Shield, 
  Smartphone, 
  Key, 
  Clock, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Copy, 
  Download, 
  Trash2, 
  Plus, 
  Settings, 
  Lock, 
  Unlock, 
  Wifi, 
  Globe, 
  Monitor, 
  Tablet, 
  QrCode, 
  Mail, 
  MessageSquare, 
  Bell, 
  User, 
  Calendar, 
  MapPin, 
  Info, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  MoreVertical, 
  Search, 
  Filter, 
  LogOut, 
  Smartphone as SmartphoneIcon,
  Key as KeyIcon,
  Clock as ClockIcon,
  Activity as ActivityIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  RefreshCw as RefreshCwIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Copy as CopyIcon,
  Download as DownloadIcon,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
  Settings as SettingsIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Wifi as WifiIcon,
  Globe as GlobeIcon,
  Monitor as MonitorIcon,
  Tablet as TabletIcon,
  QrCode as QrCodeIcon,
  Mail as MailIcon,
  MessageSquare as MessageSquareIcon,
  Bell as BellIcon,
  User as UserIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  MoreVertical as MoreVerticalIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  LogOut as LogOutIcon
} from 'lucide-react';

export default function TwoFactorPage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'app' | 'sms' | 'email'>('app');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const secretKey = 'JBSWY3DPEHPK3PXP';
  const qrCodeUrl = `otpauth://totp/LumoPlatform:user@example.com?secret=${secretKey}&issuer=LumoPlatform`;

  const trustedDevices = [
    {
      id: '1',
      name: 'Chrome - Windows',
      device: 'Windows PC',
      location: 'الرياض، السعودية',
      lastUsed: '2024-01-30 14:30',
      trusted: true
    },
    {
      id: '2',
      name: 'Safari - iPhone',
      device: 'iPhone 14',
      location: 'جدة، السعودية',
      lastUsed: '2024-01-30 12:15',
      trusted: true
    },
    {
      id: '3',
      name: 'Chrome - MacBook',
      device: 'MacBook Pro',
      location: 'الدمام، السعودية',
      lastUsed: '2024-01-29 18:45',
      trusted: false
    }
  ];

  const activeSessions = [
    {
      id: '1',
      device: 'Chrome - Windows',
      ip: '192.168.1.100',
      location: 'الرياض، السعودية',
      started: '2024-01-30 14:30',
      lastActivity: '2024-01-30 15:45',
      current: true
    },
    {
      id: '2',
      device: 'Safari - iPhone',
      ip: '192.168.1.105',
      location: 'جدة، السعودية',
      started: '2024-01-30 12:15',
      lastActivity: '2024-01-30 15:30',
      current: false
    },
    {
      id: '3',
      device: 'Firefox - MacBook',
      ip: '192.168.1.110',
      location: 'الدمام، السعودية',
      started: '2024-01-29 18:45',
      lastActivity: '2024-01-30 09:20',
      current: false
    }
  ];

  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    setBackupCodes(codes);
    setShowBackupCodes(true);
  };

  const handleEnable2FA = () => {
    setIsEnabled(true);
    generateBackupCodes();
  };

  const handleDisable2FA = () => {
    setIsEnabled(false);
    setBackupCodes([]);
    setShowBackupCodes(false);
  };

  const handleRevokeSession = (sessionId: string) => {
    console.log('Revoking session:', sessionId);
  };

  const handleRemoveDevice = (deviceId: string) => {
    console.log('Removing device:', deviceId);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">المصادقة الثنائية</h1>
              <p className="text-gray-600 mt-1">حماية إضافية لحسابك</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 ml-2" />
                إعدادات الأمان
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Card */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${isEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Shield className={`w-6 h-6 ${isEnabled ? 'text-green-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">حالة المصادقة الثنائية</h2>
                <p className={`text-sm ${isEnabled ? 'text-green-600' : 'text-gray-600'}`}>
                  {isEnabled ? 'مفعل' : 'غير مفعل'}
                </p>
              </div>
            </div>
            <Button
              variant={isEnabled ? "outline" : "default"}
              onClick={isEnabled ? handleDisable2FA : handleEnable2FA}
            >
              {isEnabled ? 'تعطيل' : 'تفعيل'}
            </Button>
          </div>
        </Card>

        {isEnabled && (
          <>
            {/* Setup Methods */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">طرق المصادقة</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg">
                  <input
                    type="radio"
                    id="app"
                    name="method"
                    value="app"
                    checked={selectedMethod === 'app'}
                    onChange={(e) => setSelectedMethod(e.target.value as any)}
                    className="ml-3"
                  />
                  <label htmlFor="app" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">تطبيق المصادقة</div>
                      <div className="text-sm text-gray-600">استخدام تطبيق مثل Google Authenticator</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <input
                    type="radio"
                    id="sms"
                    name="method"
                    value="sms"
                    checked={selectedMethod === 'sms'}
                    onChange={(e) => setSelectedMethod(e.target.value as any)}
                    className="ml-3"
                  />
                  <label htmlFor="sms" className="flex items-center gap-3 cursor-pointer flex-1">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">رسالة نصية</div>
                      <div className="text-sm text-gray-600">استلام رمز عبر SMS</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <input
                    type="radio"
                    id="email"
                    name="method"
                    value="email"
                    checked={selectedMethod === 'email'}
                    onChange={(e) => setSelectedMethod(e.target.value as any)}
                    className="ml-3"
                  />
                  <label htmlFor="email" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">البريد الإلكتروني</div>
                      <div className="text-sm text-gray-600">استلام رمز عبر البريد</div>
                    </div>
                  </label>
                </div>
              </div>
            </Card>

            {/* App Authentication Setup */}
            {selectedMethod === 'app' && (
              <Card className="p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">إعداد تطبيق المصادقة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">امسح رمز QR</h4>
                    <div className="bg-white p-4 border rounded-lg inline-block">
                      <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">أو أدخل الرمز يدوياً</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-mono text-lg text-center mb-4">{secretKey}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSecret(!showSecret)}
                      >
                        {showSecret ? <EyeOff className="w-4 h-4 ml-2" /> : <Eye className="w-4 h-4 ml-2" />}
                        {showSecret ? 'إخفاء' : 'إظهار'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* SMS Authentication Setup */}
            {selectedMethod === 'sms' && (
              <Card className="p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">إعداد المصادقة عبر SMS</h3>
                <div className="max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+966 50 123 4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button className="mt-4">
                    إرسال رمز التحقق
                  </Button>
                </div>
              </Card>
            )}

            {/* Email Authentication Setup */}
            {selectedMethod === 'email' && (
              <Card className="p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">إعداد المصادقة عبر البريد</h3>
                <div className="max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button className="mt-4">
                    إرسال رمز التحقق
                  </Button>
                </div>
              </Card>
            )}

            {/* Backup Codes */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">رموز النسخ الاحتياطي</h3>
                <Button variant="outline" onClick={generateBackupCodes}>
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إنشاء رموز جديدة
                </Button>
              </div>
              {showBackupCodes && backupCodes.length > 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-800 font-medium">احفظ هذه الرموز في مكان آمن</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="bg-white px-3 py-2 rounded border font-mono text-sm">
                        {code}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 ml-2" />
                      تحميل
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 ml-2" />
                      نسخ
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 ml-2" />
                      طباعة
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-600">
                  لم يتم إنشاء رموز نسخ احتياطي بعد. انقر على "إنشاء رموز جديدة" لإنشاء رموز.
                </div>
              )}
            </Card>
          </>
        )}

        {/* Active Sessions */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">الجلسات النشطة</h3>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Monitor className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{session.device}</div>
                    <div className="text-sm text-gray-600">
                      {session.ip} • {session.location}
                    </div>
                    <div className="text-xs text-gray-500">
                      بدأت: {session.started} • آخر نشاط: {session.lastActivity}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {session.current && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      الجلسة الحالية
                    </span>
                  )}
                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                    >
                      <LogOut className="w-4 h-4 ml-2" />
                      إنهاء الجلسة
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Trusted Devices */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">الأجهزة الموثوقة</h3>
          <div className="space-y-4">
            {trustedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{device.name}</div>
                    <div className="text-sm text-gray-600">
                      {device.device} • {device.location}
                    </div>
                    <div className="text-xs text-gray-500">
                      آخر استخدام: {device.lastUsed}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {device.trusted && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      موثوق
                    </span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveDevice(device.id)}
                  >
                    <Trash2 className="w-4 h-4 ml-2" />
                    إزالة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
