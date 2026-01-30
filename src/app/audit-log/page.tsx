"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Shield, 
  Eye, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Settings, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  Download as DownloadIcon,
  Upload,
  Trash2,
  Edit,
  Save,
  X,
  Plus,
  BarChart3,
  TrendingUp,
  Users,
  Lock,
  Unlock,
  Database,
  Server,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Bell,
  Star,
  Award,
  Target,
  Zap,
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
  MapPin,
  Phone,
  CreditCard,
  DollarSign,
  TrendingDown,
  AlertCircle,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu,
  Home,
  Settings as SettingsIcon,
  LogOut,
  User as UserIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Download as DownloadIcon2,
  Upload as UploadIcon2,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Activity as ActivityIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  FileText as FileTextIcon,
  BarChart3 as BarChart3Icon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Globe as GlobeIcon,
  Smartphone as SmartphoneIcon,
  Mail as MailIcon,
  MessageSquare as MessageSquareIcon,
  Bell as BellIcon,
  Star as StarIcon,
  Award as AwardIcon,
  Target as TargetIcon,
  Zap as ZapIcon,
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
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  CreditCard as CreditCardIcon,
  DollarSign as DollarSignIcon,
  TrendingDown as TrendingDownIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon
} from 'lucide-react';

export default function AuditLogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  const auditLogs = [
    {
      id: '1',
      timestamp: '2024-01-30 14:30:25',
      user: 'أحمد محمد',
      action: 'تسجيل دخول',
      resource: 'لوحة التحكم',
      ip: '192.168.1.100',
      status: 'success',
      details: 'تسجيل دخول ناجح من جهاز موثوق',
      severity: 'low'
    },
    {
      id: '2',
      timestamp: '2024-01-30 14:25:18',
      user: 'سارة أحمد',
      action: 'تعديل',
      resource: 'دورة Python المتقدمة',
      ip: '192.168.1.105',
      status: 'success',
      details: 'تم تحديث محتوى الدورة وإضافة 3 دروس جديدة',
      severity: 'medium'
    },
    {
      id: '3',
      timestamp: '2024-01-30 14:20:12',
      user: 'محمد سالم',
      action: 'محاولة تسجيل دخول',
      resource: 'لوحة الإدارة',
      ip: '10.0.0.50',
      status: 'failed',
      details: 'محاولة تسجيل دخول فاشلة - كلمة مرور خاطئة',
      severity: 'high'
    },
    {
      id: '4',
      timestamp: '2024-01-30 14:15:45',
      user: 'النظام',
      action: 'نسخ احتياطي',
      resource: 'قاعدة البيانات',
      ip: 'localhost',
      status: 'success',
      details: 'تم إجراء نسخ احتياطي تلقائي ناجح',
      severity: 'low'
    },
    {
      id: '5',
      timestamp: '2024-01-30 14:10:30',
      user: 'ليلى حسن',
      action: 'حذف',
      resource: 'مستخدم',
      ip: '192.168.1.110',
      status: 'success',
      details: 'تم حذف حساب المستخدم بناءً على طلب المستخدم',
      severity: 'medium'
    },
    {
      id: '6',
      timestamp: '2024-01-30 14:05:22',
      user: 'خالد علي',
      action: 'إنشاء',
      resource: 'دورة جديدة',
      ip: '192.168.1.115',
      status: 'success',
      details: 'تم إنشاء دورة "تطوير الويب المتقدم"',
      severity: 'low'
    },
    {
      id: '7',
      timestamp: '2024-01-30 14:00:15',
      user: 'منى سعيد',
      action: 'تصدير',
      resource: 'تقارير المبيعات',
      ip: '192.168.1.120',
      status: 'success',
      details: 'تم تصدير 150 سجل من تقارير المبيعات',
      severity: 'low'
    },
    {
      id: '8',
      timestamp: '2024-01-30 13:55:08',
      user: 'ياسر محمد',
      action: 'تحديث',
      resource: 'إعدادات النظام',
      ip: '192.168.1.125',
      status: 'success',
      details: 'تم تحديث إعدادات الأمان والخصوصية',
      severity: 'high'
    }
  ];

  const filters = [
    { id: 'all', name: 'كل السجلات', count: auditLogs.length },
    { id: 'success', name: 'ناجح', count: auditLogs.filter(log => log.status === 'success').length },
    { id: 'failed', name: 'فشل', count: auditLogs.filter(log => log.status === 'failed').length },
    { id: 'high', name: 'عالي الخطورة', count: auditLogs.filter(log => log.severity === 'high').length },
    { id: 'medium', name: 'متوسط الخطورة', count: auditLogs.filter(log => log.severity === 'medium').length },
    { id: 'low', name: 'منخفض الخطورة', count: auditLogs.filter(log => log.severity === 'low').length }
  ];

  const dateRanges = [
    { id: '24hours', name: '24 ساعة' },
    { id: '7days', name: '7 أيام' },
    { id: '30days', name: '30 يوم' },
    { id: '90days', name: '90 يوم' },
    { id: '1year', name: 'سنة' }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'success' && log.status === 'success') ||
                         (selectedFilter === 'failed' && log.status === 'failed') ||
                         (selectedFilter === log.severity);
    return matchesSearch && matchesFilter;
  });

  const logsPerPage = 10;
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'عالي';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'منخفض';
      default:
        return 'غير محدد';
    }
  };

  const handleSelectAll = () => {
    if (selectedLogs.length === paginatedLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(paginatedLogs.map(log => log.id));
    }
  };

  const handleSelectLog = (logId: string) => {
    if (selectedLogs.includes(logId)) {
      setSelectedLogs(selectedLogs.filter(id => id !== logId));
    } else {
      setSelectedLogs([...selectedLogs, logId]);
    }
  };

  const handleExport = () => {
    console.log('Exporting selected logs:', selectedLogs);
  };

  const handleDelete = () => {
    console.log('Deleting selected logs:', selectedLogs);
    setSelectedLogs([]);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">سجل التدقيق</h1>
              <p className="text-gray-600 mt-1">مراقبة وتتبع جميع الأنشطة في النظام</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 ml-2" />
                تصدير
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
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
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{auditLogs.length}</div>
                <div className="text-sm text-gray-600">إجمالي السجلات</div>
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
                  {auditLogs.filter(log => log.status === 'success').length}
                </div>
                <div className="text-sm text-gray-600">عمليات ناجحة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {auditLogs.filter(log => log.status === 'failed').length}
                </div>
                <div className="text-sm text-gray-600">عمليات فاشلة</div>
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
                  {auditLogs.filter(log => log.severity === 'high').length}
                </div>
                <div className="text-sm text-gray-600">عالي الخطورة</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في السجلات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filters.map(filter => (
                  <option key={filter.id} value={filter.id}>
                    {filter.name} ({filter.count})
                  </option>
                ))}
              </select>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Selected Actions */}
        {selectedLogs.length > 0 && (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-blue-800 font-medium">
                  تم تحديد {selectedLogs.length} سجل
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 ml-2" />
                  تصدير المحدد
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 ml-2" />
                  حذف المحدد
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Logs Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right">
                    <input
                      type="checkbox"
                      checked={selectedLogs.length === paginatedLogs.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التوقيت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستخدم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراء
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المورد
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الخطورة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التفاصيل
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedLogs.includes(log.id)}
                        onChange={() => handleSelectLog(log.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{log.action}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{log.resource}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="text-sm text-gray-900">{log.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(log.severity)}`}>
                        {getSeverityText(log.severity)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-mono">{log.ip}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 truncate" title={log.details}>
                          {log.details}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                عرض {startIndex + 1} إلى {Math.min(startIndex + logsPerPage, filteredLogs.length)} من {filteredLogs.length} سجل
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronRight className="w-4 h-4 ml-1" />
                  السابق
                </Button>
                <span className="px-3 py-1 text-sm text-gray-700">
                  صفحة {currentPage} من {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  التالي
                  <ChevronLeft className="w-4 h-4 mr-1" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
