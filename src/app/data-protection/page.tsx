"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Shield, 
  Database, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Server, 
  Cloud, 
  Globe, 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Upload, 
  Copy, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  Plus, 
  Edit, 
  Trash2, 
  Settings, 
  Calendar, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Heart, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Move, 
  Archive, 
  ArchiveRestore, 
  CloudDownload, 
  CloudUpload, 
  Wifi, 
  Bluetooth, 
  Monitor, 
  Smartphone, 
  Tablet, 
  QrCode, 
  MessageSquare, 
  Bell, 
  HelpCircle, 
  Info, 
  TrendingDown, 
  PieChart, 
  LineChart, 
  AreaChart, 
  Star, 
  Award, 
  Zap, 
  Crown, 
  Flag, 
  Gavel, 
  Scale, 
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
  Shield as ShieldIcon,
  Database as DatabaseIcon,
  Lock as LockIcon,
  Key as KeyIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Server as ServerIcon,
  Cloud as CloudIcon,
  Globe as GlobeIcon,
  Users as UsersIcon,
  Activity as ActivityIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  RefreshCw as RefreshCwIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Copy as CopyIcon,
  MoreVertical as MoreVerticalIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Menu as MenuIcon,
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Settings as SettingsIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  BarChart3 as BarChart3Icon,
  TrendingUp as TrendingUpIcon,
  DollarSign as DollarSignIcon,
  Target as TargetIcon,
  Heart as HeartIcon,
  Bookmark as BookmarkIcon,
  Share2 as Share2Icon,
  ExternalLink as ExternalLinkIcon,
  Move as MoveIcon,
  Archive as ArchiveIcon,
  ArchiveRestore as ArchiveRestoreIcon,
  CloudDownload as CloudDownloadIcon,
  CloudUpload as CloudUploadIcon,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  QrCode as QrCodeIcon,
  MessageSquare as MessageSquareIcon,
  Bell as BellIcon,
  HelpCircle as HelpCircleIcon,
  Info as InfoIcon,
  TrendingDown as TrendingDownIcon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  AreaChart as AreaChartIcon,
  Star as StarIcon,
  Award as AwardIcon,
  Zap as ZapIcon,
  Crown as CrownIcon,
  Flag as FlagIcon,
  Gavel as GavelIcon,
  Scale as ScaleIcon,
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
  UnlockKeyhole as UnlockKeyholeIcon
} from 'lucide-react';

export default function DataProtectionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const protectionMeasures = [
    {
      id: 'encryption',
      title: 'التشفير',
      description: 'تشفير البيانات في حالة السكون والنقل',
      status: 'active',
      strength: 'high',
      icon: <Lock className="w-5 h-5" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'access-control',
      title: 'التحكم في الوصول',
      description: 'إدارة صلاحيات الوصول للبيانات',
      status: 'active',
      strength: 'high',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'backup',
      title: 'النسخ الاحتياطي',
      description: 'نسخ احتياطي منتظم للبيانات',
      status: 'active',
      strength: 'medium',
      icon: <Cloud className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'monitoring',
      title: 'المراقبة',
      description: 'مراقبة الوصول والأنشطة المشبوهة',
      status: 'active',
      strength: 'high',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const dataCategories = [
    {
      id: 'personal',
      name: 'البيانات الشخصية',
      description: 'الاسم، البريد الإلكتروني، رقم الهاتف',
      sensitivity: 'high',
      records: 45231,
      lastAccess: '2024-01-30'
    },
    {
      id: 'financial',
      name: 'البيانات المالية',
      description: 'معلومات الدفع والفواتير',
      sensitivity: 'very-high',
      records: 12450,
      lastAccess: '2024-01-29'
    },
    {
      id: 'educational',
      name: 'البيانات التعليمية',
      description: 'الدورات، التقدم، الشهادات',
      sensitivity: 'medium',
      records: 89320,
      lastAccess: '2024-01-30'
    },
    {
      id: 'behavioral',
      name: 'البيانات السلوكية',
      description: 'أنماط الاستخدام والتفضيلات',
      sensitivity: 'medium',
      records: 156780,
      lastAccess: '2024-01-30'
    }
  ];

  const securityIncidents = [
    {
      id: '1',
      type: 'محاولة وصول غير مصرح',
      severity: 'medium',
      date: '2024-01-29',
      status: 'resolved',
      description: 'محاولة وصول من IP غير معروف',
      affected: '0 مستخدم'
    },
    {
      id: '2',
      type: 'تسريب بيانات',
      severity: 'low',
      date: '2024-01-25',
      status: 'resolved',
      description: 'تسريب بيانات عامة غير حساسة',
      affected: '125 مستخدم'
    },
    {
      id: '3',
      type: 'هجوم برمجية خبيثة',
      severity: 'high',
      date: '2024-01-20',
      status: 'resolved',
      description: 'محاولة هجوم برمجية خبيثة محاصر',
      affected: '0 مستخدم'
    }
  ];

  const complianceFrameworks = [
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'الائحة الأوروبية لحماية البيانات',
      status: 'compliant',
      score: 95,
      lastAudit: '2024-01-15'
    },
    {
      id: 'ccpa',
      name: 'CCPA',
      description: 'قانون حماية خصوصية المستهلك في كاليفورنيا',
      status: 'compliant',
      score: 92,
      lastAudit: '2024-01-10'
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'نظام إدارة أمان المعلومات',
      status: 'in-progress',
      score: 88,
      lastAudit: '2024-01-05'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">حماية البيانات</h1>
              <p className="text-gray-600 mt-1">إدارة حماية البيانات والامتثال للمعايير</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                تصدير التقرير
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                إجراء جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Protection Measures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {protectionMeasures.map((measure) => (
            <Card key={measure.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-linear-to-r ${measure.color} rounded-lg text-white`}>
                  {measure.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{measure.title}</h3>
                  <p className="text-sm text-gray-600">{measure.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  measure.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {measure.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
                <span className={`text-xs font-medium ${
                  measure.strength === 'high' 
                    ? 'text-green-600' 
                    : measure.strength === 'medium'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>
                  {measure.strength === 'high' ? 'قوي' : 
                   measure.strength === 'medium' ? 'متوسط' : 'ضعيف'}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Data Categories */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">فئات البيانات</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوصف
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحساسية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عدد السجلات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر وصول
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{category.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        category.sensitivity === 'very-high' 
                          ? 'bg-red-100 text-red-800' 
                          : category.sensitivity === 'high'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {category.sensitivity === 'very-high' ? 'عالية جداً' : 
                         category.sensitivity === 'high' ? 'عالية' : 'متوسطة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.records.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.lastAccess}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Security Incidents */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">الحوادث الأمنية</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 ml-2" />
              إبلاغ عن حادث
            </Button>
          </div>
          <div className="space-y-4">
            {securityIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    incident.severity === 'high' 
                      ? 'bg-red-100' 
                      : incident.severity === 'medium'
                      ? 'bg-yellow-100'
                      : 'bg-blue-100'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      incident.severity === 'high' 
                        ? 'text-red-600' 
                        : incident.severity === 'medium'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{incident.type}</div>
                    <div className="text-sm text-gray-600">{incident.description}</div>
                    <div className="text-xs text-gray-500">
                      {incident.date} • {incident.affected}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    incident.status === 'resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {incident.status === 'resolved' ? 'تم الحل' : 'قيد المعالجة'}
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Frameworks */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">أطر الامتثال</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {complianceFrameworks.map((framework) => (
              <div key={framework.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">{framework.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    framework.status === 'compliant' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {framework.status === 'compliant' ? 'ممتثل' : 'قيد التنفيذ'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{framework.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">درجة الامتثال</span>
                    <span className="text-sm font-medium text-gray-900">{framework.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        framework.score >= 90 
                          ? 'bg-green-500' 
                          : framework.score >= 80
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${framework.score}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    آخر تدقيق: {framework.lastAudit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
