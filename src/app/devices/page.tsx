"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  Monitor, 
  Tv, 
  Watch, 
  Camera, 
  Speaker, 
  Headphones, 
  Mouse, 
  Keyboard, 
  Gamepad2, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Wifi, 
  Bluetooth, 
  Usb, 
  Battery, 
  Zap, 
  Shield, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
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
  Globe, 
  Key, 
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
  Clock, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  Bell, 
  HelpCircle, 
  Info, 
  AlertCircle, 
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Laptop as LaptopIcon,
  Monitor as MonitorIcon,
  Tv as TvIcon,
  Watch as WatchIcon,
  Camera as CameraIcon,
  Speaker as SpeakerIcon,
  Headphones as HeadphonesIcon,
  Mouse as MouseIcon,
  Keyboard as KeyboardIcon,
  Gamepad2 as Gamepad2Icon,
  HardDrive as HardDriveIcon,
  Cpu as CpuIcon,
  MemoryStick as MemoryStickIcon,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  Usb as UsbIcon,
  Battery as BatteryIcon,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  RefreshCw as RefreshCwIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Copy as CopyIcon,
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  MoreVertical as MoreVerticalIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Menu as MenuIcon,
  Globe as GlobeIcon,
  Key as KeyIcon,
  FileText as FileTextIcon,
  FileCheck as FileCheckIcon,
  FileSearch as FileSearchIcon,
  FileLock as FileLockIcon,
  FileSignature as FileSignatureIcon,
  FileWarning as FileWarningIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert as ShieldAlertIcon,
  ShieldX as ShieldXIcon,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  UserLock as UserLockIcon,
  KeyRound as KeyRoundIcon,
  Fingerprint as FingerprintIcon,
  LockKeyhole as LockKeyholeIcon,
  UnlockKeyhole as UnlockKeyholeIcon,
  Terminal as TerminalIcon,
  Braces as BracesIcon,
  Package as PackageIcon,
  GitBranch as GitBranchIcon,
  GitMerge as GitMergeIcon,
  GitCommit as GitCommitIcon,
  GitPullRequest as GitPullRequestIcon,
  GitFork as GitForkIcon,
  Database as DatabaseIcon,
  Server as ServerIcon,
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
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  BarChart3 as BarChart3Icon,
  TrendingUp as TrendingUpIcon,
  DollarSign as DollarSignIcon,
  Users as UsersIcon,
  Activity as ActivityIcon,
  Bell as BellIcon,
  HelpCircle as HelpCircleIcon,
  Info as InfoIcon,
  AlertCircle as AlertCircleIcon
} from 'lucide-react';

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTrustedOnly, setShowTrustedOnly] = useState(false);

  const devices = [
    {
      id: '1',
      name: 'Chrome - Windows',
      type: 'desktop',
      deviceType: 'laptop',
      os: 'Windows 11',
      browser: 'Chrome',
      ip: '192.168.1.100',
      location: 'الرياض، السعودية',
      lastSeen: '2024-01-30 15:45:12',
      status: 'active',
      trusted: true,
      current: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      deviceId: 'device_abc123def456',
      firstSeen: '2024-01-15 10:30:25',
      sessionsCount: 45,
      securityScore: 95,
      batteryLevel: 85,
      connectionType: 'wifi',
      vpnEnabled: false,
      twoFactorEnabled: true,
      biometricEnabled: false,
      screenResolution: '1920x1080',
      timezone: 'Asia/Riyadh',
      language: 'ar-SA'
    },
    {
      id: '2',
      name: 'Safari - iPhone',
      type: 'mobile',
      deviceType: 'smartphone',
      os: 'iOS 17',
      browser: 'Safari',
      ip: '192.168.1.105',
      location: 'جدة، السعودية',
      lastSeen: '2024-01-30 15:30:45',
      status: 'active',
      trusted: true,
      current: false,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      deviceId: 'device_ghi789jkl012',
      firstSeen: '2024-01-20 14:20:33',
      sessionsCount: 28,
      securityScore: 92,
      batteryLevel: 65,
      connectionType: 'cellular',
      vpnEnabled: false,
      twoFactorEnabled: true,
      biometricEnabled: true,
      screenResolution: '390x844',
      timezone: 'Asia/Riyadh',
      language: 'ar-SA'
    },
    {
      id: '3',
      name: 'Firefox - MacBook',
      type: 'desktop',
      deviceType: 'laptop',
      os: 'macOS Sonoma',
      browser: 'Firefox',
      ip: '192.168.1.110',
      location: 'الدمام، السعودية',
      lastSeen: '2024-01-30 09:20:15',
      status: 'inactive',
      trusted: false,
      current: false,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0)',
      deviceId: 'device_mno345pqr678',
      firstSeen: '2024-01-10 08:45:22',
      sessionsCount: 67,
      securityScore: 78,
      batteryLevel: 45,
      connectionType: 'wifi',
      vpnEnabled: true,
      twoFactorEnabled: false,
      biometricEnabled: true,
      screenResolution: '2560x1600',
      timezone: 'Asia/Riyadh',
      language: 'en-US'
    },
    {
      id: '4',
      name: 'Chrome - Android',
      type: 'mobile',
      deviceType: 'smartphone',
      os: 'Android 14',
      browser: 'Chrome',
      ip: '192.168.1.120',
      location: 'مكة، السعودية',
      lastSeen: '2024-01-30 15:40:33',
      status: 'active',
      trusted: true,
      current: false,
      userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-G998B)',
      deviceId: 'device_stu901vwx234',
      firstSeen: '2024-01-25 16:10:18',
      sessionsCount: 15,
      securityScore: 88,
      batteryLevel: 92,
      connectionType: 'wifi',
      vpnEnabled: false,
      twoFactorEnabled: true,
      biometricEnabled: true,
      screenResolution: '1080x2400',
      timezone: 'Asia/Riyadh',
      language: 'ar-SA'
    },
    {
      id: '5',
      name: 'iPad Pro',
      type: 'tablet',
      deviceType: 'tablet',
      os: 'iPadOS 17',
      browser: 'Safari',
      ip: '192.168.1.130',
      location: 'المدينة المنورة، السعودية',
      lastSeen: '2024-01-29 20:15:44',
      status: 'inactive',
      trusted: false,
      current: false,
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)',
      deviceId: 'device_yza234bcd567',
      firstSeen: '2024-01-18 11:30:12',
      sessionsCount: 8,
      securityScore: 85,
      batteryLevel: 78,
      connectionType: 'wifi',
      vpnEnabled: false,
      twoFactorEnabled: true,
      biometricEnabled: true,
      screenResolution: '1024x1366',
      timezone: 'Asia/Riyadh',
      language: 'ar-SA'
    }
  ];

  const securityAlerts = [
    {
      id: '1',
      deviceId: '3',
      type: 'untrusted_device',
      description: 'جهاز غير موثوق يحاول الوصول',
      timestamp: '2024-01-30 09:20:15',
      severity: 'high',
      ip: '192.168.1.110',
      location: 'الدمام، السعودية',
      resolved: false
    },
    {
      id: '2',
      deviceId: '1',
      type: 'vpn_detected',
      description: 'استخدام VPN تم اكتشافه',
      timestamp: '2024-01-30 08:45:22',
      severity: 'medium',
      ip: '192.168.1.100',
      location: 'الرياض، السعودية',
      resolved: true
    },
    {
      id: '3',
      deviceId: '2',
      type: 'low_battery',
      description: 'بطارية الجهاز منخفضة',
      timestamp: '2024-01-30 15:30:45',
      severity: 'low',
      ip: '192.168.1.105',
      location: 'جدة، السعودية',
      resolved: false
    }
  ];

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.os.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrusted = !showTrustedOnly || device.trusted;
    return matchesSearch && matchesTrusted;
  });

  const handleTrustDevice = (deviceId: string) => {
    console.log('Trusting device:', deviceId);
  };

  const handleUntrustDevice = (deviceId: string) => {
    console.log('Untrusting device:', deviceId);
  };

  const handleRemoveDevice = (deviceId: string) => {
    console.log('Removing device:', deviceId);
  };

  const handleViewDetails = (deviceId: string) => {
    setSelectedDevice(deviceId);
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop':
        return <Monitor className="w-6 h-6" />;
      case 'laptop':
        return <Laptop className="w-6 h-6" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'tablet':
        return <Tablet className="w-6 h-6" />;
      default:
        return <Monitor className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'blocked':
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
      case 'blocked':
        return 'محظور';
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

  const getBatteryColor = (level: number) => {
    if (level >= 60) return 'text-green-500';
    if (level >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إدارة الأجهزة</h1>
              <p className="text-gray-600 mt-1">مراقبة وإدارة الأجهزة المتصلة بحسابك</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 ml-2" />
                إعدادات الأمان
              </Button>
              <Button variant="outline">
                <PowerOff className="w-4 h-4 ml-2" />
                تسجيل الخروج من جميع الأجهزة
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
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{devices.length}</div>
                <div className="text-sm text-gray-600">إجمالي الأجهزة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {devices.filter(d => d.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">أجهزة نشطة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {devices.filter(d => d.trusted).length}
                </div>
                <div className="text-sm text-gray-600">أجهزة موثوقة</div>
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
                  {securityAlerts.filter(a => !a.resolved).length}
                </div>
                <div className="text-sm text-gray-600">تنبيهات نشطة</div>
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
                  placeholder="البحث في الأجهزة..."
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
                  checked={showTrustedOnly}
                  onChange={(e) => setShowTrustedOnly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">الأجهزة الموثوقة فقط</span>
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

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    device.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {getDeviceIcon(device.deviceType)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-600">{device.os}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {device.current && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      الحالي
                    </span>
                  )}
                  {device.trusted && (
                    <Shield className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الحالة:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(device.status)}`}>
                    {getStatusText(device.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الموقع:</span>
                  <span className="text-gray-900">{device.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">آخر استخدام:</span>
                  <span className="text-gray-900">{device.lastSeen}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الجلسات:</span>
                  <span className="text-gray-900">{device.sessionsCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">البطارية:</span>
                  <div className="flex items-center gap-2">
                    <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
                    <span className="text-gray-900">{device.batteryLevel}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الأمان:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{device.securityScore}%</span>
                    {device.twoFactorEnabled && (
                      <Lock className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {device.vpnEnabled && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                    VPN
                  </span>
                )}
                {device.biometricEnabled && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    بصمة
                  </span>
                )}
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                  {device.connectionType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(device.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                {device.trusted ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUntrustDevice(device.id)}
                  >
                    <ShieldX className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTrustDevice(device.id)}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveDevice(device.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Security Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">تنبيهات الأمان</h3>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </div>
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'high' 
                      ? 'bg-red-100' 
                      : alert.severity === 'medium'
                      ? 'bg-yellow-100'
                      : 'bg-green-100'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.severity === 'high' 
                        ? 'text-red-600' 
                        : alert.severity === 'medium'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{alert.description}</div>
                    <div className="text-sm text-gray-600">
                      {alert.timestamp} • {alert.ip} • {alert.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                    {getSeverityText(alert.severity)}
                  </span>
                  {alert.resolved && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      تم الحل
                    </span>
                  )}
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
