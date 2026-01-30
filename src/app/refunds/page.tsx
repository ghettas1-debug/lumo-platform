"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  RefreshCw, 
  DollarSign, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  Star, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  Award,
  Target,
  Globe,
  MapPin,
  Briefcase,
  Shield,
  Heart,
  MessageSquare,
  Activity,
  Zap,
  UserCheck,
  DownloadCloud,
  UploadCloud,
  UserX,
  UserCog,
  UserCircle,
  CheckCircle as UserCheckCircle,
  XCircle as UserXCircle,
  MinusCircle as UserMinusCircle,
  PlusCircle as UserPlusCircle,
  Cog as UserCogCircle,
  Shield as UserShieldCircle,
  Users2,
  UserRoundPlus,
  UserRoundMinus,
  UserRoundX,
  UserRoundCheck,
  UserRoundCog
} from 'lucide-react';

export default function RefundsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRefunds, setSelectedRefunds] = useState<string[]>([]);

  const refunds = [
    {
      id: '1',
      refundId: 'REF-2024-001',
      transactionId: 'TRX-001',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      originalAmount: 299.99,
      refundAmount: 299.99,
      currency: 'ريال',
      status: 'approved',
      requestDate: '2024-01-18',
      processedDate: '2024-01-20',
      reason: 'لم يرضني المحتوى',
      courseName: 'تطوير تطبيقات الويب باستخدام React',
      refundMethod: 'بطاقة ائتمان',
      processingFee: 15.00,
      netAmount: 284.99,
      notes: 'تمت معالجة الاسترداد بنجاح'
    },
    {
      id: '2',
      refundId: 'REF-2024-002',
      transactionId: 'TRX-002',
      customerName: 'سارة علي',
      customerEmail: 'sarah@example.com',
      originalAmount: 199.99,
      refundAmount: 199.99,
      currency: 'ريال',
      status: 'pending',
      requestDate: '2024-01-22',
      processedDate: null,
      reason: 'مشاكل فنية في الوصول للمحتوى',
      courseName: 'تصميم واجهات المستخدم مع Tailwind CSS',
      refundMethod: 'باي بال',
      processingFee: 10.00,
      netAmount: 189.99,
      notes: 'قيد المراجعة من فريق الدعم'
    },
    {
      id: '3',
      refundId: 'REF-2024-003',
      transactionId: 'TRX-003',
      customerName: 'محمد سالم',
      customerEmail: 'mohammed@example.com',
      originalAmount: 399.99,
      refundAmount: 399.99,
      currency: 'ريال',
      status: 'rejected',
      requestDate: '2024-01-15',
      processedDate: '2024-01-17',
      reason: 'غير مناسب لمستواي',
      courseName: 'أساسيات قواعد البيانات مع SQL',
      refundMethod: 'تحويل بنكي',
      processingFee: 0.00,
      netAmount: 0.00,
      notes: 'تم رفض الطلب لأنه يتجاوز فترة الـ 30 يوماً'
    },
    {
      id: '4',
      refundId: 'REF-2024-004',
      transactionId: 'TRX-004',
      customerName: 'ليلى أحمد',
      customerEmail: 'laila@example.com',
      originalAmount: 499.99,
      refundAmount: 499.99,
      currency: 'ريال',
      status: 'approved',
      requestDate: '2024-01-25',
      processedDate: '2024-01-27',
      reason: 'تغيير في الظروف الشخصية',
      courseName: 'مقدمة في الذكاء الاصطناعي',
      refundMethod: 'بطاقة ائتمان',
      processingFee: 25.00,
      netAmount: 474.99,
      notes: 'تمت الموافقة على الاسترداد الكامل'
    }
  ];

  const refundReasons = ['الجميع', 'لم يرضني المحتوى', 'مشاكل فنية', 'غير مناسب لمستواي', 'تغيير في الظروف', 'أسباب أخرى'];
  const refundMethods = ['الجميع', 'بطاقة ائتمان', 'باي بال', 'تحويل بنكي'];
  const currencies = ['الجميع', 'ريال', 'دولار', 'يورو'];

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = refund.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.refundId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || refund.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSelectRefund = (refundId: string) => {
    setSelectedRefunds(prev => 
      prev.includes(refundId) 
        ? prev.filter(id => id !== refundId)
        : [...prev, refundId]
    );
  };

  const handleBulkAction = (action: 'approve' | 'reject' | 'process') => {
    console.log(`Bulk ${action} for refunds:`, selectedRefunds);
    setSelectedRefunds([]);
  };

  const handleExport = () => {
    console.log('Exporting refunds data...');
  };

  const handleApprove = (refundId: string) => {
    console.log('Approving refund:', refundId);
  };

  const handleReject = (refundId: string) => {
    console.log('Rejecting refund:', refundId);
  };

  const handleProcess = (refundId: string) => {
    console.log('Processing refund:', refundId);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">إدارة الاستردادات</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              إدارة جميع طلبات الاسترداد والمعاملات المالية في منصة Lumo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Plus className="w-4 h-4 ml-2" />
                معالجة استرداد جديد
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600">
                <Download className="w-4 h-4 ml-2" />
                تصدير التقارير
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {refunds.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.netAmount, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">إجمالي الاستردادات</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {refunds.filter(r => r.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600">استردادات موافق عليها</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {refunds.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">استردادات معلقة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {refunds.filter(r => r.status === 'rejected').length}
                </div>
                <div className="text-sm text-gray-600">استردادات مرفوضة</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="بحث عن استرداد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="">جميع الأسباب</option>
                {refundReasons.map(reason => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="">جميع طرق الاسترداد</option>
                {refundMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="">جميع العملات</option>
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedRefunds.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <span className="text-sm text-orange-700">
                تم اختيار {selectedRefunds.length} استرداد
              </span>
              <Button size="sm" onClick={() => handleBulkAction('approve')}>
                <CheckCircle className="w-4 h-4 ml-2" />
                موافقة
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('reject')}>
                <XCircle className="w-4 h-4 ml-2" />
                رفض
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('process')}>
                <RefreshCw className="w-4 h-4 ml-2" />
                معالجة
              </Button>
            </div>
          )}
        </div>

        {/* Refunds Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedRefunds.length === filteredRefunds.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRefunds(filteredRefunds.map(r => r.id));
                        } else {
                          setSelectedRefunds([]);
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم الاسترداد
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السبب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الطلب
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
                {filteredRefunds.map((refund) => (
                  <tr key={refund.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRefunds.includes(refund.id)}
                        onChange={() => handleSelectRefund(refund.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{refund.refundId}</div>
                      <div className="text-sm text-gray-500">{refund.transactionId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{refund.customerName}</div>
                      <div className="text-sm text-gray-500">{refund.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {refund.refundAmount} {refund.currency}
                      </div>
                      <div className="text-sm text-gray-500">
                        المبلغ الصافي: {refund.netAmount} {refund.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{refund.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {refund.requestDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        refund.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : refund.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {refund.status === 'approved' ? 'موافق عليه' : refund.status === 'pending' ? 'معلق' : 'مرفوض'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض
                        </Button>
                        {refund.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" onClick={() => handleApprove(refund.id)}>
                              <CheckCircle className="w-4 h-4 ml-2" />
                              موافقة
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleReject(refund.id)}>
                              <XCircle className="w-4 h-4 ml-2" />
                              رفض
                            </Button>
                          </>
                        )}
                        {refund.status === 'approved' && (
                          <Button variant="outline" size="sm" onClick={() => handleProcess(refund.id)}>
                            <RefreshCw className="w-4 h-4 ml-2" />
                            معالجة
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
      </div>
    </div>
  );
}
