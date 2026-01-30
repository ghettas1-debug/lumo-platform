"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Download, 
  Search, 
  Filter, 
  RefreshCw, 
  Globe, 
  Users, 
  Database, 
  Server, 
  Clock, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Settings, 
  Lock, 
  Unlock, 
  Key, 
  User, 
  Activity, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Heart, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Copy, 
  Move, 
  Archive, 
  ArchiveRestore, 
  Cloud, 
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
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical, 
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
  EyeOff, 
  LockKeyhole, 
  UnlockKeyhole, 
  Shield as ShieldIcon,
  FileText as FileTextIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Eye as EyeIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  RefreshCw as RefreshCwIcon,
  Globe as GlobeIcon,
  Users as UsersIcon,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Settings as SettingsIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Key as KeyIcon,
  User as UserIcon,
  Activity as ActivityIcon,
  BarChart3 as BarChart3Icon,
  TrendingUp as TrendingUpIcon,
  DollarSign as DollarSignIcon,
  Target as TargetIcon,
  Heart as HeartIcon,
  Bookmark as BookmarkIcon,
  Share2 as Share2Icon,
  ExternalLink as ExternalLinkIcon,
  Copy as CopyIcon,
  Move as MoveIcon,
  Archive as ArchiveIcon,
  ArchiveRestore as ArchiveRestoreIcon,
  Cloud as CloudIcon,
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
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Menu as MenuIcon,
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  MoreVertical as MoreVerticalIcon,
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
  EyeOff as EyeOffIcon,
  LockKeyhole as LockKeyholeIcon,
  UnlockKeyhole as UnlockKeyholeIcon
} from 'lucide-react';

export default function GDPRPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const complianceItems = [
    {
      id: 'data-protection',
      title: 'حماية البيانات',
      description: 'تطبيق مبادئ حماية البيانات حسب GDPR',
      status: 'compliant',
      lastUpdated: '2024-01-30',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'user-consent',
      title: 'موافقة المستخدم',
      description: 'إدارة موافقات المستخدمين والسماح',
      status: 'compliant',
      lastUpdated: '2024-01-29',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'data-breach',
      title: 'إخلاء المسؤولية',
      description: 'الإبلاغ عن اختراقات البيانات',
      status: 'partial',
      lastUpdated: '2024-01-28',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'data-retention',
      title: 'الاحتفاظ بالبيانات',
      description: 'سياسات الاحتفاظ بالبيانات',
      status: 'compliant',
      lastUpdated: '2024-01-27',
      icon: <Database className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const userRights = [
    {
      id: 'access',
      title: 'الحق في الوصول',
      description: 'الحق في الحصول على نسخة من بياناتك',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'rectification',
      title: 'الحق في التصحيح',
      description: 'الحق في تصحيح البيانات غير الدقيقة',
      icon: <Edit className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'erasure',
      title: 'الحق في المحو',
      description: 'الحق في طلب حذف بياناتك',
      icon: <Trash2 className="w-6 h-6" />,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'portability',
      title: 'الحق في النقل',
      description: 'الحق في نقل بياناتك إلى خدمة أخرى',
      icon: <Move className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'objection',
      title: 'الحق في الاعتراض',
      description: 'الحق في الاعتراض على معالجة بياناتك',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'restriction',
      title: 'الحق في التقييد',
      description: 'الحق في تقييد معالجة بياناتك',
      icon: <Lock className="w-6 h-6" />,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const dataRequests = [
    {
      id: '1',
      user: 'أحمد محمد',
      email: 'ahmed@example.com',
      type: 'access',
      status: 'completed',
      requested: '2024-01-28',
      completed: '2024-01-30',
      priority: 'normal'
    },
    {
      id: '2',
      user: 'سارة أحمد',
      email: 'sara@example.com',
      type: 'deletion',
      status: 'pending',
      requested: '2024-01-29',
      completed: null,
      priority: 'high'
    },
    {
      id: '3',
      user: 'محمد سالم',
      email: 'mohammed@example.com',
      type: 'correction',
      status: 'in-progress',
      requested: '2024-01-30',
      completed: null,
      priority: 'normal'
    }
  ];

  const documents = [
    {
      id: '1',
      title: 'سياسة الخصوصية GDPR',
      type: 'policy',
      version: '2.1',
      lastUpdated: '2024-01-30',
      size: '245 KB',
      status: 'active'
    },
    {
      id: '2',
      title: 'نموذج موافقة المستخدم',
      type: 'form',
      version: '1.5',
      lastUpdated: '2024-01-28',
      size: '128 KB',
      status: 'active'
    },
    {
      id: '3',
      title: 'إجراءات اختراق البيانات',
      type: 'procedure',
      version: '1.2',
      lastUpdated: '2024-01-25',
      size: '189 KB',
      status: 'active'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الامتثال لـ GDPR</h1>
              <p className="text-gray-600 mt-1">إدارة الامتثال للائحة حماية البيانات العامة</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                تصدير التقرير
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                طلب جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Compliance Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {complianceItems.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-linear-to-r ${item.color} rounded-lg text-white`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.status === 'compliant' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'compliant' ? 'ممتثل' : 'جزئي'}
                </span>
                <span className="text-xs text-gray-500">{item.lastUpdated}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* User Rights */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">حقوق المستخدمين</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRights.map((right) => (
              <div key={right.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className={`p-3 rounded-lg ${right.color}`}>
                  {right.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{right.title}</h4>
                  <p className="text-sm text-gray-600">{right.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Data Requests */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">طلبات البيانات</h3>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 ml-2" />
              عرض الكل
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
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الطلب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الأولوية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{request.user}</div>
                        <div className="text-sm text-gray-600">{request.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {request.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : request.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status === 'completed' ? 'مكتمل' : 
                         request.status === 'in-progress' ? 'قيد التنفيذ' : 'معلق'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.requested}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.priority === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {request.priority === 'high' ? 'عالية' : 'عادية'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">الوثائق والنماذج</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 ml-2" />
              إضافة وثيقة
            </Button>
          </div>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{doc.title}</div>
                    <div className="text-sm text-gray-600">
                      الإصدار {doc.version} • {doc.size} • آخر تحديث: {doc.lastUpdated}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {doc.status}
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
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
