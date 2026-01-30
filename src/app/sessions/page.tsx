"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Activity, 
  Eye, 
  EyeOff, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Globe, 
  Wifi, 
  MapPin, 
  Calendar, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Upload, 
  Copy, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
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
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  RotateCcw, 
  Save, 
  File, 
  FilePlus, 
  FileMinus, 
  FileX, 
  Printer, 
  LogOut, 
  Power, 
  PowerOff, 
  Zap, 
  Battery, 
  BatteryCharging, 
  BatteryLow, 
  BatteryFull, 
  BatteryMedium, 
  Users, 
  Clock, 
  Cpu as CpuIcon,
  MemoryStick as MemoryStickIcon,
  Network as NetworkIcon,
  Router as RouterIcon,
  Code as CodeIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  Square as SquareIcon,
  SkipForward as SkipForwardIcon,
  SkipBack as SkipBackIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Maximize2 as Maximize2Icon,
  Minimize2 as Minimize2Icon,
  RotateCw as RotateCwIcon,
  RotateCcw as RotateCcwIcon,
  Save as SaveIcon,
  File as FileIcon,
  FilePlus as FilePlusIcon,
  FileMinus as FileMinusIcon,
  FileX as FileXIcon,
  Printer as PrinterIcon,
  LogOut as LogOutIcon,
  Power as PowerIcon,
  PowerOff as PowerOffIcon,
  Zap as ZapIcon,
  Battery as BatteryIcon,
  BatteryCharging as BatteryChargingIcon,
  BatteryLow as BatteryLowIcon,
  BatteryFull as BatteryFullIcon,
  BatteryMedium as BatteryMediumIcon
} from 'lucide-react';

export default function SessionsPage() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const sessions = [
    {
      id: '1',
      userId: 'user123',
      userName: 'أحمد محمد',
      userEmail: 'ahmed@example.com',
      device: 'Chrome - Windows',
      deviceType: 'desktop',
      browser: 'Chrome',
      os: 'Windows 11',
      ip: '192.168.1.100',
      location: 'الرياض، السعودية',
      startTime: '2024-01-30 14:30:25',
      lastActivity: '2024-01-30 15:45:12',
      duration: '1 ساعة 15 دقيقة',
      status: 'active',
      current: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      sessionId: 'sess_abc123def456',
      loginMethod: 'password',
      twoFactorEnabled: true,
      securityScore: 95
    },
    {
      id: '2',
      userId: 'user123',
      userName: 'أحمد محمد',
      userEmail: 'ahmed@example.com',
      device: 'Safari - iPhone',
      deviceType: 'mobile',
      browser: 'Safari',
      os: 'iOS 17',
      ip: '192.168.1.105',
      location: 'جدة، السعودية',
      startTime: '2024-01-30 12:15:33',
      lastActivity: '2024-01-30 15:30:45',
      duration: '3 ساعات 15 دقيقة',
      status: 'active',
      current: false,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      sessionId: 'sess_ghi789jkl012',
      loginMethod: 'biometric',
      twoFactorEnabled: true,
      securityScore: 92
    },
    {
      id: '3',
      userId: 'user123',
      userName: 'أحمد محمد',
      userEmail: 'ahmed@example.com',
      device: 'Firefox - MacBook',
      deviceType: 'laptop',
      browser: 'Firefox',
      os: 'macOS Sonoma',
      ip: '192.168.1.110',
      location: 'الدمام، السعودية',
      startTime: '2024-01-29 18:45:22',
      lastActivity: '2024-01-30 09:20:15',
      duration: '14 ساعة 35 دقيقة',
      status: 'inactive',
      current: false,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0)',
      sessionId: 'sess_mno345pqr678',
      loginMethod: 'password',
      twoFactorEnabled: false,
      securityScore: 78
    },
    {
      id: '4',
      userId: 'user456',
      userName: 'سارة أحمد',
      userEmail: 'sara@example.com',
      device: 'Chrome - Android',
      deviceType: 'mobile',
      browser: 'Chrome',
      os: 'Android 14',
      ip: '192.168.1.120',
      location: 'مكة، السعودية',
      startTime: '2024-01-30 10:30:18',
      lastActivity: '2024-01-30 15:40:33',
      duration: '5 ساعات 10 دقيقة',
      status: 'active',
      current: false,
      userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-G998B)',
      sessionId: 'sess_stu901vwx234',
      loginMethod: 'password',
      twoFactorEnabled: true,
      securityScore: 88
    }
  ];

  const securityEvents = [
    {
      id: '1',
      sessionId: '1',
      type: 'login_success',
      description: 'تسجيل دخول ناجح',
      timestamp: '2024-01-30 14:30:25',
      severity: 'low',
      ip: '192.168.1.100',
      location: 'الرياض، السعودية'
    },
    {
      id: '2',
      sessionId: '1',
      type: 'two_factor_verified',
      description: 'تم التحقق من المصادقة الثنائية',
      timestamp: '2024-01-30 14:30:45',
      severity: 'low',
      ip: '192.168.1.100',
      location: 'الرياض، السعودية'
    },
    {
      id: '3',
      sessionId: '3',
      type: 'suspicious_location',
      description: 'موقع جغرافي غير معروف',
      timestamp: '2024-01-30 09:20:15',
      severity: 'high',
      ip: '192.168.1.110',
      location: 'الدمام، السعودية'
    },
    {
      id: '4',
      sessionId: '2',
      type: 'device_change',
      description: 'تغيير الجهاز',
      timestamp: '2024-01-30 12:15:33',
      severity: 'medium',
      ip: '192.168.1.105',
      location: 'جدة، السعودية'
    }
  ];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !showActiveOnly || session.status === 'active';
    return matchesSearch && matchesStatus;
  });

  const handleEndSession = (sessionId: string) => {
    console.log('Ending session:', sessionId);
  };

  const handleExtendSession = (sessionId: string) => {
    console.log('Extending session:', sessionId);
  };

  const handleViewDetails = (sessionId: string) => {
    setSelectedSession(sessionId);
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop':
        return <Monitor className="w-6 h-6" />;
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'tablet':
        return <Tablet className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'inactive':
        return 'غير نشط';
      case 'expired':
        return 'منتهي';
      default:
        return 'غير معروف';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'منخفض';
      case 'medium':
        return 'متوسط';
      case 'high':
        return 'عالي';
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
              <h1 className="text-3xl font-bold text-gray-900">إدارة الجلسات</h1>
              <p className="text-gray-600 mt-1">مراقبة وإدارة جلسات المستخدمين النشطة</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 ml-2" />
                إعدادات الأمان
              </Button>
              <Button variant="outline">
                <LogOut className="w-4 h-4 ml-2" />
                تسجيل الخروج من جميع الجلسات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {sessions.filter(s => s.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">جلسات نشطة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {new Set(sessions.map(s => s.userId)).size}
                </div>
                <div className="text-sm text-gray-600">مستخدم فريد</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">91%</div>
                <div className="text-sm text-gray-600">متوسط درجة الأمان</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {securityEvents.filter(e => e.severity === 'high').length}
                </div>
                <div className="text-sm text-gray-600">أحداث عالية الخطورة</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في الجلسات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={(e) => setShowActiveOnly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">الجلسات النشطة فقط</span>
              </label>
              <Button variant="outline">
                <Filter className="w-4 h-4 ml-2" />
                فلتر
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
              </Button>
            </div>
          </div>
        </Card>

        {/* Sessions Table */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">الجلسات النشطة</h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستخدم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الجهاز
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الموقع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    البدء
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المدة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الأمان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{session.userName}</div>
                        <div className="text-sm text-gray-600">{session.userEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(session.deviceType)}
                        <div>
                          <div className="font-medium text-gray-900">{session.device}</div>
                          <div className="text-sm text-gray-600">{session.ip}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{session.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{session.startTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{session.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
                          {getStatusText(session.status)}
                        </span>
                        {session.current && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            الحالية
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-900">{session.securityScore}%</div>
                        <div className="flex items-center gap-1">
                          {session.twoFactorEnabled && (
                            <Shield className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(session.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {session.status === 'active' && !session.current && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEndSession(session.id)}
                          >
                            <LogOut className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Security Events */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">أحداث الأمان</h3>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </div>
          <div className="space-y-4">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    event.severity === 'high' 
                      ? 'bg-red-100' 
                      : event.severity === 'medium'
                      ? 'bg-yellow-100'
                      : 'bg-green-100'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      event.severity === 'high' 
                        ? 'text-red-600' 
                        : event.severity === 'medium'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{event.description}</div>
                    <div className="text-sm text-gray-600">
                      {event.timestamp} • {event.ip} • {event.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(event.severity)}`}>
                    {getSeverityText(event.severity)}
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
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
