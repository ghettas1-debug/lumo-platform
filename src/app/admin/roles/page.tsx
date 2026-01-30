"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Shield, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Key, 
  Crown, 
  Star, 
  Award, 
  Zap, 
  Activity, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
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
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Globe, 
  Database, 
  Server, 
  Monitor, 
  Smartphone, 
  Tablet, 
  FileText, 
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
  QrCode, 
  MessageSquare, 
  Bell, 
  HelpCircle, 
  Info, 
  TrendingDown, 
  PieChart, 
  LineChart, 
  AreaChart, 
  ScatterChart, 
  BarChart, 
  UserPlus, 
  UserMinus, 
  UserCheck, 
  UserX, 
  UserCog, 
  Users2, 
  UserRound, 
  UserRoundPlus, 
  UserRoundMinus, 
  UserRoundX, 
  UserRoundCheck, 
  UserRoundCog, 
  Shield as ShieldIcon,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Key as KeyIcon,
  Crown as CrownIcon,
  Star as StarIcon,
  Award as AwardIcon,
  Zap as ZapIcon,
  Activity as ActivityIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  AlertTriangle as AlertTriangleIcon,
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
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Globe as GlobeIcon,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  FileText as FileTextIcon,
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
  Cloud as CloudIcon,
  CloudDownload as CloudDownloadIcon,
  CloudUpload as CloudUploadIcon,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  QrCode as QrCodeIcon,
  MessageSquare as MessageSquareIcon,
  Bell as BellIcon,
  HelpCircle as HelpCircleIcon,
  Info as InfoIcon,
  TrendingDown as TrendingDownIcon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  AreaChart as AreaChartIcon,
  ScatterChart as ScatterChartIcon,
  BarChart as BarChartIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinusIcon,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  UserCog as UserCogIcon,
  Users2 as Users2Icon,
  UserRound as UserRoundIcon,
  UserRoundPlus as UserRoundPlusIcon,
  UserRoundMinus as UserRoundMinusIcon,
  UserRoundX as UserRoundXIcon,
  UserRoundCheck as UserRoundCheckIcon,
  UserRoundCog as UserRoundCogIcon
} from 'lucide-react';

export default function AdminRolesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const roles = [
    {
      id: '1',
      name: 'المدير العام',
      nameEn: 'Super Admin',
      description: 'صلاحيات كاملة على جميع أنظمة المنصة',
      permissions: ['all'],
      userCount: 2,
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: <Crown className="w-5 h-5" />,
      isSystem: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'مدير المحتوى',
      nameEn: 'Content Manager',
      description: 'إدارة الدورات والمحتوى التعليمي',
      permissions: ['courses.create', 'courses.edit', 'courses.delete', 'content.manage'],
      userCount: 5,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: <FileText className="w-5 h-5" />,
      isSystem: false,
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      name: 'مدير المستخدمين',
      nameEn: 'User Manager',
      description: 'إدارة حسابات المستخدمين والصلاحيات',
      permissions: ['users.create', 'users.edit', 'users.delete', 'roles.manage'],
      userCount: 3,
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: <Users className="w-5 h-5" />,
      isSystem: false,
      createdAt: '2024-01-20'
    },
    {
      id: '4',
      name: 'مدرب',
      nameEn: 'Instructor',
      description: 'إنشاء وإدارة الدورات التدريبية',
      permissions: ['courses.create', 'courses.edit', 'students.manage', 'analytics.view'],
      userCount: 25,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: <Award className="w-5 h-5" />,
      isSystem: false,
      createdAt: '2024-01-10'
    },
    {
      id: '5',
      name: 'مساعد',
      nameEn: 'Assistant',
      description: 'مساعدة المدربين وإدارة المهام اليومية',
      permissions: ['courses.view', 'students.view', 'content.edit'],
      userCount: 8,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <Star className="w-5 h-5" />,
      isSystem: false,
      createdAt: '2024-01-25'
    },
    {
      id: '6',
      name: 'مشرف',
      nameEn: 'Moderator',
      description: 'إشراف على المحتوى والتفاعلات',
      permissions: ['content.moderate', 'users.moderate', 'reports.view'],
      userCount: 12,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: <Shield className="w-5 h-5" />,
      isSystem: false,
      createdAt: '2024-01-18'
    }
  ];

  const permissions = [
    {
      category: 'المستخدمون',
      permissions: [
        { id: 'users.create', name: 'إنشاء مستخدمين', description: 'إضافة مستخدمين جدد' },
        { id: 'users.edit', name: 'تعديل المستخدمين', description: 'تعديل بيانات المستخدمين' },
        { id: 'users.delete', name: 'حذف المستخدمين', description: 'حذف حسابات المستخدمين' },
        { id: 'users.view', name: 'عرض المستخدمين', description: 'عرض قائمة المستخدمين' },
        { id: 'users.moderate', name: 'إشراف المستخدمين', description: 'إشراف على نشاط المستخدمين' }
      ]
    },
    {
      category: 'الدورات',
      permissions: [
        { id: 'courses.create', name: 'إنشاء دورات', description: 'إضافة دورات جديدة' },
        { id: 'courses.edit', name: 'تعديل الدورات', description: 'تعديل محتوى الدورات' },
        { id: 'courses.delete', name: 'حذف الدورات', description: 'حذف الدورات' },
        { id: 'courses.view', name: 'عرض الدورات', description: 'عرض قائمة الدورات' },
        { id: 'courses.publish', name: 'نشر الدورات', description: 'نشر الدورات للعامة' }
      ]
    },
    {
      category: 'المحتوى',
      permissions: [
        { id: 'content.create', name: 'إنشاء محتوى', description: 'إضافة محتوى تعليمي' },
        { id: 'content.edit', name: 'تعديل المحتوى', description: 'تعديل المحتوى الموجود' },
        { id: 'content.delete', name: 'حذف المحتوى', description: 'حذف المحتوى' },
        { id: 'content.manage', name: 'إدارة المحتوى', description: 'إدارة جميع المحتويات' },
        { id: 'content.moderate', name: 'إشراف المحتوى', description: 'إشراف على المحتوى' }
      ]
    },
    {
      category: 'التحليلات',
      permissions: [
        { id: 'analytics.view', name: 'عرض التحليلات', description: 'عرض الإحصائيات والتحليلات' },
        { id: 'analytics.export', name: 'تصدير البيانات', description: 'تصدير البيانات التحليلية' },
        { id: 'reports.view', name: 'عرض التقارير', description: 'عرض التقارير المختلفة' },
        { id: 'reports.create', name: 'إنشاء تقارير', description: 'إنشاء تقارير مخصصة' }
      ]
    },
    {
      category: 'النظام',
      permissions: [
        { id: 'system.settings', name: 'إعدادات النظام', description: 'الوصول لإعدادات النظام' },
        { id: 'system.backup', name: 'النسخ الاحتياطي', description: 'إدارة النسخ الاحتياطي' },
        { id: 'system.logs', name: 'سجلات النظام', description: 'عرض سجلات النظام' },
        { id: 'roles.manage', name: 'إدارة الصلاحيات', description: 'إدارة صلاحيات الأدوار' }
      ]
    }
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRole = () => {
    setShowCreateModal(true);
  };

  const handleEditRole = (roleId: string) => {
    setSelectedRole(roleId);
    setShowEditModal(true);
  };

  const handleDeleteRole = (roleId: string) => {
    console.log('Deleting role:', roleId);
  };

  const getPermissionName = (permissionId: string) => {
    for (const category of permissions) {
      const permission = category.permissions.find(p => p.id === permissionId);
      if (permission) return permission.name;
    }
    return permissionId;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إدارة الصلاحيات</h1>
              <p className="text-gray-600 mt-1">إنشاء وإدارة أدوار وصلاحيات المستخدمين</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                تصدير
              </Button>
              <Button onClick={handleCreateRole}>
                <Plus className="w-4 h-4 ml-2" />
                دور جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{roles.length}</div>
                <div className="text-sm text-gray-600">إجمالي الأدوار</div>
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
                  {roles.reduce((sum, role) => sum + role.userCount, 0)}
                </div>
                <div className="text-sm text-gray-600">المستخدمون المعينون</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {roles.filter(r => r.isSystem).length}
                </div>
                <div className="text-sm text-gray-600">أدوار النظام</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {roles.filter(r => !r.isSystem).length}
                </div>
                <div className="text-sm text-gray-600">أدوار مخصصة</div>
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
                  placeholder="البحث في الأدوار..."
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

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${role.color}`}>
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                    <p className="text-sm text-gray-600">{role.nameEn}</p>
                  </div>
                </div>
                {role.isSystem && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                    نظام
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{role.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{role.userCount} مستخدم</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{role.createdAt}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">الصلاحيات:</div>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map((permission, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {getPermissionName(permission)}
                    </span>
                  ))}
                  {role.permissions.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{role.permissions.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditRole(role.id)}
                >
                  <Eye className="w-4 h-4 ml-2" />
                  عرض
                </Button>
                {!role.isSystem && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditRole(role.id)}
                    >
                      <Edit className="w-4 h-4 ml-2" />
                      تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <Trash2 className="w-4 h-4 ml-2" />
                      حذف
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Permissions Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">نظرة عامة على الصلاحيات</h3>
          <div className="space-y-6">
            {permissions.map((category) => (
              <div key={category.category}>
                <h4 className="font-medium text-gray-900 mb-3">{category.category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div>
                        <div className="font-medium text-gray-900">{permission.name}</div>
                        <div className="text-sm text-gray-600">{permission.description}</div>
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
