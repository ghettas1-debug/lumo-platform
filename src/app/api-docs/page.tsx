"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Code, 
  Book, 
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
  Router as RouterIcon
} from 'lucide-react';

export default function APIDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCode, setShowCode] = useState(true);

  const apiCategories = [
    {
      id: 'users',
      name: 'المستخدمون',
      description: 'إدارة حسابات المستخدمين والملفات الشخصية',
      icon: <UserCheck className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      endpoints: 12
    },
    {
      id: 'courses',
      name: 'الدورات',
      description: 'إدارة الدورات والمحتوى التعليمي',
      icon: <Book className="w-5 h-5" />,
      color: 'from-green-500 to-green-600',
      endpoints: 18
    },
    {
      id: 'payments',
      name: 'المدفوعات',
      description: 'معالجة المدفوعات والاشتراكات',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600',
      endpoints: 15
    },
    {
      id: 'analytics',
      name: 'التحليلات',
      description: 'الإحصائيات والتقارير والتحليلات',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      endpoints: 10
    },
    {
      id: 'notifications',
      name: 'الإشعارات',
      description: 'إرسال وإدارة الإشعارات',
      icon: <Bell className="w-5 h-5" />,
      color: 'from-red-500 to-red-600',
      endpoints: 8
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      description: 'تكاملات الأحداث الخارجية',
      icon: <Globe className="w-5 h-5" />,
      color: 'from-indigo-500 to-indigo-600',
      endpoints: 6
    }
  ];

  const endpoints = {
    users: [
      {
        method: 'GET',
        path: '/api/v1/users',
        description: 'الحصول على قائمة المستخدمين',
        parameters: [
          { name: 'page', type: 'integer', description: 'رقم الصفحة', required: false },
          { name: 'limit', type: 'integer', description: 'عدد النتائج', required: false },
          { name: 'search', type: 'string', description: 'بحث في المستخدمين', required: false }
        ],
        response: {
          type: 'object',
          example: {
            users: [
              {
                id: '123',
                name: 'أحمد محمد',
                email: 'ahmed@example.com',
                role: 'student',
                created_at: '2024-01-30T10:00:00Z'
              }
            ],
            pagination: {
              page: 1,
              limit: 20,
              total: 100
            }
          }
        }
      },
      {
        method: 'POST',
        path: '/api/v1/users',
        description: 'إنشاء مستخدم جديد',
        parameters: [
          { name: 'name', type: 'string', description: 'اسم المستخدم', required: true },
          { name: 'email', type: 'string', description: 'البريد الإلكتروني', required: true },
          { name: 'password', type: 'string', description: 'كلمة المرور', required: true },
          { name: 'role', type: 'string', description: 'دور المستخدم', required: false }
        ],
        response: {
          type: 'object',
          example: {
            user: {
              id: '123',
              name: 'أحمد محمد',
              email: 'ahmed@example.com',
              role: 'student',
              created_at: '2024-01-30T10:00:00Z'
            }
          }
        }
      }
    ],
    courses: [
      {
        method: 'GET',
        path: '/api/v1/courses',
        description: 'الحصول على قائمة الدورات',
        parameters: [
          { name: 'category', type: 'string', description: 'فئة الدورة', required: false },
          { name: 'level', type: 'string', description: 'مستوى الدورة', required: false },
          { name: 'page', type: 'integer', description: 'رقم الصفحة', required: false }
        ],
        response: {
          type: 'object',
          example: {
            courses: [
              {
                id: '456',
                title: 'تطوير الويب المتقدم',
                description: 'تعلم تطوير الويب الحديث',
                instructor: 'محمد أحمد',
                price: 299.99,
                duration: '40 ساعة'
              }
            ]
          }
        }
      }
    ]
  };

  const authentication = {
    type: 'Bearer Token',
    description: 'يجب إرسال التوكن في رأس الطلب',
    example: 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  };

  const rateLimit = {
    requests: 1000,
    window: '15 minutes',
    description: '1000 طلب في كل 15 دقيقة لكل IP'
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800';
      case 'POST':
        return 'bg-blue-100 text-blue-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">وثائق API</h1>
              <p className="text-gray-600 mt-1">وثائق واجهة برمجة التطبيقات لمنصة Lumo</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                تحميل PDF
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 ml-2" />
                OpenAPI
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">Base URL</div>
                <div className="text-sm text-gray-600 font-mono">https://api.lumo.com/v1</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">المصادقة</div>
                <div className="text-sm text-gray-600">Bearer Token</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">معدل الطلبات</div>
                <div className="text-sm text-gray-600">1000/15 دقيقة</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {apiCategories.map((category) => (
            <Card 
              key={category.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedEndpoint === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedEndpoint(category.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-linear-to-r ${category.color} rounded-lg text-white`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {category.endpoints} نقطة نهاية
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Authentication */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">المصادقة</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Bearer Token</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCode(authentication.example)}
              >
                <Copy className="w-4 h-4 ml-2" />
                نسخ
              </Button>
            </div>
            <div className="font-mono text-sm text-gray-700 mb-2">
              {authentication.example}
            </div>
            <p className="text-sm text-gray-600">{authentication.description}</p>
          </div>
        </Card>

        {/* Endpoints */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            نقاط النهاية - {apiCategories.find(c => c.id === selectedEndpoint)?.name}
          </h3>
          <div className="space-y-6">
            {endpoints[selectedEndpoint as keyof typeof endpoints]?.map((endpoint, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                  <code className="font-mono text-sm text-gray-900">{endpoint.path}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyCode(`${endpoint.method} ${endpoint.path}`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-gray-600 mb-4">{endpoint.description}</p>

                {/* Parameters */}
                {endpoint.parameters.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">المعلمات</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-right">الاسم</th>
                            <th className="px-3 py-2 text-right">النوع</th>
                            <th className="px-3 py-2 text-right">مطلوب</th>
                            <th className="px-3 py-2 text-right">الوصف</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <tr key={paramIndex}>
                              <td className="px-3 py-2 font-mono">{param.name}</td>
                              <td className="px-3 py-2">{param.type}</td>
                              <td className="px-3 py-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  param.required 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {param.required ? 'نعم' : 'لا'}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-gray-600">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Response Example */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">مثال الاستجابة</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyCode(JSON.stringify(endpoint.response.example, null, 2))}
                    >
                      <Copy className="w-4 h-4 ml-2" />
                      نسخ
                    </Button>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{JSON.stringify(endpoint.response.example, null, 2)}</code>
                    </pre>
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
