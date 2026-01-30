"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Webhook, 
  Globe, 
  Zap, 
  Shield, 
  Key, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Copy, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical, 
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
  Star, 
  Award, 
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
  Activity, 
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
  FileText, 
  FilePlus, 
  FileMinus, 
  FileX, 
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
  HardDrive as HardDriveIcon,
  Cpu as CpuIcon,
  MemoryStick as MemoryStickIcon,
  Network as NetworkIcon,
  Router as RouterIcon,
  Code as CodeIcon,
  Activity as ActivityIcon,
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
  FileText as FileTextIcon,
  FilePlus as FilePlusIcon,
  FileMinus as FileMinusIcon,
  FileX as FileXIcon
} from 'lucide-react';

export default function WebhooksPage() {
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const webhooks = [
    {
      id: '1',
      name: 'تسجيل المستخدم الجديد',
      url: 'https://api.example.com/webhooks/user-created',
      events: ['user.created'],
      status: 'active',
      secret: 'whsec_1234567890abcdef',
      lastTriggered: '2024-01-30 14:30:25',
      totalDeliveries: 1250,
      successRate: 99.2,
      retryAttempts: 3,
      timeout: 30,
      created: '2024-01-15',
      description: 'يتم إطلاقه عند إنشاء مستخدم جديد'
    },
    {
      id: '2',
      name: 'اكتمال الدفع',
      url: 'https://payment.example.com/webhooks/payment-completed',
      events: ['payment.completed', 'payment.failed'],
      status: 'active',
      secret: 'whsec_fedcba0987654321',
      lastTriggered: '2024-01-30 13:45:12',
      totalDeliveries: 3420,
      successRate: 98.7,
      retryAttempts: 5,
      timeout: 45,
      created: '2024-01-10',
      description: 'يتم إطلاقه عند اكتمال أو فشل الدفع'
    },
    {
      id: '3',
      name: 'تسجيل الدورة',
      url: 'https://lms.example.com/webhooks/course-enrollment',
      events: ['course.enrollment.created', 'course.enrollment.completed'],
      status: 'inactive',
      secret: 'whsec_abcdef1234567890',
      lastTriggered: '2024-01-28 09:20:33',
      totalDeliveries: 890,
      successRate: 97.5,
      retryAttempts: 3,
      timeout: 30,
      created: '2024-01-20',
      description: 'يتم إطلاقه عند تسجيل أو إكمال الدورة'
    },
    {
      id: '4',
      name: 'إرسال الشهادة',
      url: 'https://certificate.example.com/webhooks/certificate-issued',
      events: ['certificate.issued'],
      status: 'active',
      secret: 'whsec_0987654321fedcba',
      lastTriggered: '2024-01-30 11:15:48',
      totalDeliveries: 567,
      successRate: 99.8,
      retryAttempts: 2,
      timeout: 25,
      created: '2024-01-25',
      description: 'يتم إطلاقه عند إصدار شهادة جديدة'
    }
  ];

  const availableEvents = [
    {
      category: 'المستخدمون',
      events: [
        { id: 'user.created', name: 'إنشاء مستخدم', description: 'عند إنشاء مستخدم جديد' },
        { id: 'user.updated', name: 'تحديث مستخدم', description: 'عند تحديث بيانات المستخدم' },
        { id: 'user.deleted', name: 'حذف مستخدم', description: 'عند حذف مستخدم' },
        { id: 'user.login', name: 'تسجيل دخول', description: 'عند تسجيل دخول المستخدم' }
      ]
    },
    {
      category: 'الدورات',
      events: [
        { id: 'course.created', name: 'إنشاء دورة', description: 'عند إنشاء دورة جديدة' },
        { id: 'course.updated', name: 'تحديث دورة', description: 'عند تحديث الدورة' },
        { id: 'course.enrollment.created', name: 'تسجيل في دورة', description: 'عند تسجيل المستخدم في دورة' },
        { id: 'course.enrollment.completed', name: 'إكمال دورة', description: 'عند إكمال المستخدم للدورة' }
      ]
    },
    {
      category: 'المدفوعات',
      events: [
        { id: 'payment.completed', name: 'اكتمال دفع', description: 'عند اكتمال عملية الدفع' },
        { id: 'payment.failed', name: 'فشل دفع', description: 'عند فشل عملية الدفع' },
        { id: 'payment.refunded', name: 'استرداد دفع', description: 'عند استرداد المبلغ' }
      ]
    },
    {
      category: 'الشهادات',
      events: [
        { id: 'certificate.issued', name: 'إصدار شهادة', description: 'عند إصدار شهادة جديدة' },
        { id: 'certificate.revoked', name: 'إلغاء شهادة', description: 'عند إلغاء شهادة' }
      ]
    }
  ];

  const recentDeliveries = [
    {
      id: '1',
      webhookId: '1',
      webhookName: 'تسجيل المستخدم الجديد',
      event: 'user.created',
      status: 'success',
      timestamp: '2024-01-30 14:30:25',
      duration: 245,
      responseCode: 200,
      attempts: 1
    },
    {
      id: '2',
      webhookId: '2',
      webhookName: 'اكتمال الدفع',
      event: 'payment.completed',
      status: 'success',
      timestamp: '2024-01-30 13:45:12',
      duration: 189,
      responseCode: 200,
      attempts: 1
    },
    {
      id: '3',
      webhookId: '1',
      webhookName: 'تسجيل المستخدم الجديد',
      event: 'user.created',
      status: 'failed',
      timestamp: '2024-01-30 12:20:08',
      duration: 5000,
      responseCode: 500,
      attempts: 3
    }
  ];

  const filteredWebhooks = webhooks.filter(webhook =>
    webhook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    webhook.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    webhook.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateWebhook = () => {
    setShowCreateModal(true);
  };

  const handleEditWebhook = (webhookId: string) => {
    setSelectedWebhook(webhookId);
  };

  const handleDeleteWebhook = (webhookId: string) => {
    console.log('Deleting webhook:', webhookId);
  };

  const handleToggleWebhook = (webhookId: string) => {
    console.log('Toggling webhook:', webhookId);
  };

  const handleRetryDelivery = (deliveryId: string) => {
    console.log('Retrying delivery:', deliveryId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'success':
        return 'bg-green-100 text-green-800';
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
      case 'failed':
        return 'فشل';
      case 'success':
        return 'نجح';
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
              <h1 className="text-3xl font-bold text-gray-900">Webhooks</h1>
              <p className="text-gray-600 mt-1">إدارة تكاملات الأحداث الخارجية</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <HelpCircle className="w-4 h-4 ml-2" />
                الوثائق
              </Button>
              <Button onClick={handleCreateWebhook}>
                <Plus className="w-4 h-4 ml-2" />
                webhook جديد
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
                <Webhook className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{webhooks.length}</div>
                <div className="text-sm text-gray-600">إجمالي Webhooks</div>
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
                  {webhooks.filter(w => w.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">نشط حالياً</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {webhooks.reduce((sum, w) => sum + w.totalDeliveries, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">إجمالي التسليم</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">98.6%</div>
                <div className="text-sm text-gray-600">معدل النجاح</div>
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
                  placeholder="البحث في Webhooks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
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

        {/* Webhooks List */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Webhooks النشطة</h3>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 ml-2" />
              عرض الكل
            </Button>
          </div>
          <div className="space-y-4">
            {filteredWebhooks.map((webhook) => (
              <div key={webhook.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Webhook className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{webhook.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{webhook.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>آخر تشغيل: {webhook.lastTriggered}</span>
                        <span>معدل نجاح: {webhook.successRate}%</span>
                        <span>إجمالي التسليم: {webhook.totalDeliveries}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(webhook.status)}`}>
                      {getStatusText(webhook.status)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleWebhook(webhook.id)}
                    >
                      {webhook.status === 'active' ? 'إيقاف' : 'تفعيل'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditWebhook(webhook.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteWebhook(webhook.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">URL:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(webhook.url)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <code className="text-sm text-gray-700 break-all">{webhook.url}</code>
                  
                  <div className="mt-3">
                    <span className="text-sm font-medium text-gray-900">الأحداث:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {webhook.events.map((event, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Deliveries */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">التسليمات الحديثة</h3>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Webhook
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحدث
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المدة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رمز الاستجابة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوقت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{delivery.webhookName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {delivery.event}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(delivery.status)}`}>
                        {getStatusText(delivery.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.duration}ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.responseCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {delivery.status === 'failed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRetryDelivery(delivery.id)}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Available Events */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">الأحداث المتاحة</h3>
          <div className="space-y-6">
            {availableEvents.map((category) => (
              <div key={category.category}>
                <h4 className="font-medium text-gray-900 mb-3">{category.category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.events.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div>
                        <div className="font-medium text-gray-900">{event.name}</div>
                        <div className="text-sm text-gray-600">{event.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
