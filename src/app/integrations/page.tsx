"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Puzzle, 
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
  Code, 
  FileText, 
  CreditCard, 
  Github, 
  Slack, 
  Figma, 
  Trello, 
  Settings as SettingsIcon,
  Calendar as CalendarIcon,
  BarChart3 as BarChart3Icon,
  DollarSign as DollarSignIcon,
  MessageSquare as MessageSquareIcon,
  Mail as MailIcon
} from 'lucide-react';

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'الكل', count: 10 },
    { id: 'payment', name: 'المدفوعات', count: 2 },
    { id: 'communication', name: 'التواصل', count: 3 },
    { id: 'productivity', name: 'الإنتاجية', count: 4 },
    { id: 'analytics', name: 'التحليلات', count: 1 }
  ];

  const integrations = [
    // Payment Integrations
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'معالجة المدفوعات عبر الإنترنت',
      category: 'payment',
      status: 'available',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      features: ['الدفع بالبطاقة', 'الاشتراكات', 'التحويلات الدولية'],
      setupTime: '5 دقائق',
      pricing: '2.9% + 30¢'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'منصة دفع عالمية',
      category: 'payment',
      status: 'available',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      features: ['الدفع الإلكتروني', 'التحويلات', 'الفواتير'],
      setupTime: '10 دقائق',
      pricing: '2.9% + 30¢'
    },
    
    // Communication Integrations
    {
      id: 'slack',
      name: 'Slack',
      description: 'منصة التواصل الفوري',
      category: 'communication',
      status: 'available',
      icon: <Slack className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-600',
      features: ['الإشعارات', 'المشاركة', 'التكامل التلقائي'],
      setupTime: '3 دقائق',
      pricing: 'مجاني'
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'منصة التواصل للمجتمعات',
      category: 'communication',
      status: 'available',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'from-indigo-500 to-indigo-600',
      features: ['الإشعارات', 'البوتات', 'المجتمعات'],
      setupTime: '5 دقائق',
      pricing: 'مجاني'
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'خدمة البريد الإلكتروني',
      category: 'communication',
      status: 'available',
      icon: <Mail className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      features: ['البريد الإلكتروني', 'القوالب', 'التحليلات'],
      setupTime: '10 دقائق',
      pricing: 'يبدأ من $15/شهر'
    },
    
    // Productivity Integrations
    {
      id: 'notion',
      name: 'Notion',
      description: 'منصة إدارة المشاريع والملاحظات',
      category: 'productivity',
      status: 'available',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-gray-700 to-gray-900',
      features: ['الملاحظات', 'المشاريع', 'القواعد'],
      setupTime: '5 دقائق',
      pricing: 'مجاني'
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'أداة إدارة المشاريع',
      category: 'productivity',
      status: 'available',
      icon: <Trello className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      features: ['اللوحات', 'البطاقات', 'التكامل'],
      setupTime: '3 دقائق',
      pricing: 'مجاني'
    },
    {
      id: 'asana',
      name: 'Asana',
      description: 'منصة إدارة المهام',
      category: 'productivity',
      status: 'available',
      icon: <Calendar className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-600',
      features: ['المهام', 'المشاريع', 'التقارير'],
      setupTime: '10 دقائق',
      pricing: 'يبدأ من $10.99/شهر'
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'إدارة المشاريع وتتبع المشاكل',
      category: 'productivity',
      status: 'available',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-blue-600 to-blue-800',
      features: ['تتبع المشاكل', 'إدارة المشاريع', 'التقارير'],
      setupTime: '15 دقيقة',
      pricing: 'يبدأ من $7.50/شهر'
    },
    
    // Analytics Integrations
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'تحليلات الويب',
      category: 'analytics',
      status: 'available',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-yellow-400 to-yellow-600',
      features: ['التحليلات', 'التقارير', 'التتبع'],
      setupTime: '10 دقائق',
      pricing: 'مجاني'
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConnect = (integrationId: string) => {
    console.log('Connecting to:', integrationId);
  };

  const handleDisconnect = (integrationId: string) => {
    console.log('Disconnecting from:', integrationId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'connected':
        return 'bg-blue-100 text-blue-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'متاح';
      case 'connected':
        return 'متصل';
      case 'unavailable':
        return 'غير متاح';
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
              <h1 className="text-3xl font-bold text-gray-900">التكاملات</h1>
              <p className="text-gray-600 mt-1">ربط Lumo مع تطبيقاتك المفضلة</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <HelpCircle className="w-4 h-4 ml-2" />
                المساعدة
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                تكامل جديد
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
                <Puzzle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{integrations.length}</div>
                <div className="text-sm text-gray-600">تكامل متاح</div>
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
                  {integrations.filter(i => i.status === 'connected').length}
                </div>
                <div className="text-sm text-gray-600">متصل حالياً</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5 دقائق</div>
                <div className="text-sm text-gray-600">متوسط وقت الإعداد</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">آمن وموثوق</div>
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
                  placeholder="البحث في التكاملات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 ml-2" />
                فلتر
              </Button>
            </div>
          </div>
        </Card>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 bg-linear-to-r ${integration.color} rounded-lg text-white`}>
                  {integration.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <div className="text-lg font-bold text-gray-900">{integration.pricing}</div>
                  <div className="text-xs text-gray-500">{integration.setupTime}</div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{integration.category}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {integration.status === 'connected' ? (
                  <>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 ml-2" />
                      الإعدادات
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(integration.id)}
                    >
                      فصل
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleConnect(integration.id)}
                    disabled={integration.status === 'unavailable'}
                  >
                    {integration.status === 'unavailable' ? 'غير متاح' : 'اتصل'}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredIntegrations.length === 0 && (
          <Card className="p-12 text-center">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Puzzle className="w-8 h-8 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لم يتم العثور على تكاملات</h3>
            <p className="text-gray-600 mb-4">جرب تغيير الفلاتر أو البحث عن مصطلح مختلف</p>
            <Button variant="outline">
              مسح الفلاتر
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
