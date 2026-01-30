"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Download, 
  Calendar, 
  Filter, 
  Search, 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  Settings, 
  Database, 
  Server, 
  Globe, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
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
  ScatterChart, 
  BarChart, 
  Calendar as CalendarIcon,
  Filter as FilterIcon,
  Search as SearchIcon,
  RefreshCw as RefreshCwIcon,
  Eye as EyeIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreVertical as MoreVerticalIcon,
  Settings as SettingsIcon,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Globe as GlobeIcon,
  Shield as ShieldIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
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
  ScatterChart as ScatterChartIcon,
  BarChart as BarChartIcon
} from 'lucide-react';

export default function AdminReportsPage() {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    {
      id: 'overview',
      name: 'نظرة عامة',
      description: 'إحصائيات شاملة عن المنصة',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'users',
      name: 'المستخدمون',
      description: 'تقارير المستخدمين والنشاط',
      icon: <Users className="w-5 h-5" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'courses',
      name: 'الدورات',
      description: 'أداء الدورات والتسجيل',
      icon: <FileText className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'revenue',
      name: 'الإيرادات',
      description: 'تقارير مالية وإيرادات',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'engagement',
      name: 'التفاعل',
      description: 'معدلات التفاعل والمشاركة',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'performance',
      name: 'الأداء',
      description: 'أداء النظام والخوادم',
      icon: <Server className="w-5 h-5" />,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const dateRanges = [
    { id: '7days', name: '7 أيام' },
    { id: '30days', name: '30 يوم' },
    { id: '90days', name: '90 يوم' },
    { id: '1year', name: 'سنة' },
    { id: 'custom', name: 'مخصص' }
  ];

  const overviewStats = [
    {
      title: 'إجمالي المستخدمين',
      value: '45,231',
      change: '+12.5%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'المستخدمون النشطون',
      value: '12,847',
      change: '+8.2%',
      trend: 'up',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'إجمالي الإيرادات',
      value: '₪234,567',
      change: '+15.3%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'معدل التحويل',
      value: '3.2%',
      change: '-2.1%',
      trend: 'down',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const recentReports = [
    {
      id: '1',
      name: 'تقرير أداء الشهر',
      type: 'شهري',
      generated: '2024-01-30 14:30',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: '2',
      name: 'تحليل المستخدمين الجدد',
      type: 'أسبوعي',
      generated: '2024-01-29 10:15',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      id: '3',
      name: 'تقرير الإيرادات Q1',
      type: 'ربع سنوي',
      generated: '2024-01-28 16:45',
      size: '3.2 MB',
      status: 'processing'
    },
    {
      id: '4',
      name: 'تحليل دورات الشتاء',
      type: 'فصلي',
      generated: '2024-01-27 09:30',
      size: '4.1 MB',
      status: 'completed'
    }
  ];

  const scheduledReports = [
    {
      id: '1',
      name: 'تقرير يومي للمستخدمين',
      frequency: 'يومي',
      nextRun: '2024-01-31 08:00',
      recipients: ['admin@lumo.com', 'manager@lumo.com'],
      enabled: true
    },
    {
      id: '2',
      name: 'تقرير أسبوعي للإيرادات',
      frequency: 'أسبوعي',
      nextRun: '2024-02-04 09:00',
      recipients: ['finance@lumo.com'],
      enabled: true
    },
    {
      id: '3',
      name: 'تقرير شهري للأداء',
      frequency: 'شهري',
      nextRun: '2024-02-01 10:00',
      recipients: ['admin@lumo.com', 'tech@lumo.com'],
      enabled: false
    }
  ];

  const handleGenerateReport = (reportId: string) => {
    console.log('Generating report:', reportId);
  };

  const handleDownloadReport = (reportId: string) => {
    console.log('Downloading report:', reportId);
  };

  const handleDeleteReport = (reportId: string) => {
    console.log('Deleting report:', reportId);
  };

  const handleToggleSchedule = (scheduleId: string) => {
    console.log('Toggling schedule:', scheduleId);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">التقارير</h1>
              <p className="text-gray-600 mt-1">إنشاء وإدارة التقارير والتحليلات</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 ml-2" />
                إعدادات التقارير
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                تقرير جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reports.map((report) => (
            <Card 
              key={report.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedReport === report.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-linear-to-r from-blue-500 to-purple-600 text-white`}>
                  {report.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Date Range Filter */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في التقارير..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
              </Button>
            </div>
          </div>
        </Card>

        {/* Overview Stats */}
        {selectedReport === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewStats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </Card>
            ))}
          </div>
        )}

        {/* Recent Reports */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">التقارير الحديثة</h3>
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
                    اسم التقرير
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الإنشاء
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحجم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{report.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.generated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                          disabled={report.status !== 'completed'}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReport(report.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Scheduled Reports */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">التقارير المجدولة</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 ml-2" />
              جدولة جديدة
            </Button>
          </div>
          <div className="space-y-4">
            {scheduledReports.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{schedule.name}</div>
                    <div className="text-sm text-gray-600">
                      {schedule.frequency} • التشغيل التالي: {schedule.nextRun}
                    </div>
                    <div className="text-xs text-gray-500">
                      المستلمون: {schedule.recipients.join(', ')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant={schedule.enabled ? "outline" : "primary"}
                    size="sm"
                    onClick={() => handleToggleSchedule(schedule.id)}
                  >
                    {schedule.enabled ? 'إيقاف' : 'تفعيل'}
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
