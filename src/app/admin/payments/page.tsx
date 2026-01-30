"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
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
  CreditCard,
  Receipt,
  RefreshCw,
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

export default function AdminPaymentsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const payments = [
    {
      id: '1',
      transactionId: 'TRX-001',
      user: 'أحمد محمد',
      email: 'ahmed@example.com',
      amount: 299.99,
      currency: 'ريال',
      method: 'بطاقة ائتمان',
      status: 'completed',
      date: '2024-01-20',
      course: 'تطوير تطبيقات الويب باستخدام React',
      paymentGateway: 'Stripe',
      invoiceId: 'INV-001',
      refundStatus: 'none',
      metadata: {
        ip: '192.168.1.1',
        device: 'Chrome on Windows',
        location: 'الرياض، المملكة العربية السعودية'
      }
    },
    {
      id: '2',
      transactionId: 'TRX-002',
      user: 'سارة علي',
      email: 'sarah@example.com',
      amount: 199.99,
      currency: 'ريال',
      method: 'باي بال',
      status: 'completed',
      date: '2024-01-19',
      course: 'تصميم واجهات المستخدم مع Tailwind CSS',
      paymentGateway: 'PayPal',
      invoiceId: 'INV-002',
      refundStatus: 'none',
      metadata: {
        ip: '192.168.1.2',
        device: 'Safari on iPhone',
        location: 'جدة، المملكة العربية السعودية'
      }
    },
    {
      id: '3',
      transactionId: 'TRX-003',
      user: 'محمد سالم',
      email: 'mohammed@example.com',
      amount: 399.99,
      currency: 'ريال',
      method: 'بطاقة ائتمان',
      status: 'pending',
      date: '2024-01-18',
      course: 'أساسيات قواعد البيانات مع SQL',
      paymentGateway: 'Stripe',
      invoiceId: 'INV-003',
      refundStatus: 'none',
      metadata: {
        ip: '192.168.1.3',
        device: 'Firefox on Mac',
        location: 'الدمام، المملكة العربية السعودية'
      }
    },
    {
      id: '4',
      transactionId: 'TRX-004',
      user: 'ليلى أحمد',
      email: 'laila@example.com',
      amount: 499.99,
      currency: 'ريال',
      method: 'بطاقة ائتمان',
      status: 'failed',
      date: '2024-01-17',
      course: 'مقدمة في الذكاء الاصطناعي',
      paymentGateway: 'Stripe',
      invoiceId: 'INV-004',
      refundStatus: 'none',
      metadata: {
        ip: '192.168.1.4',
        device: 'Edge on Windows',
        location: 'الخبر، المملكة العربية السعودية'
      }
    }
  ];

  const paymentMethods = ['الجميع', 'بطاقة ائتمان', 'باي بال', 'تحويل بنكي', 'الدفع عند الاستلام'];
  const currencies = ['الجميع', 'ريال', 'دولار', 'يورو'];
  const gateways = ['الجميع', 'Stripe', 'PayPal', 'Apple Pay', 'Google Pay'];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || payment.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId) 
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleBulkAction = (action: 'refund' | 'cancel' | 'retry') => {
    console.log(`Bulk ${action} for payments:`, selectedPayments);
    setSelectedPayments([]);
  };

  const handleExport = () => {
    console.log('Exporting payments data...');
  };

  const handleRefund = (paymentId: string) => {
    console.log('Processing refund for payment:', paymentId);
  };

  const handleRetry = (paymentId: string) => {
    console.log('Retrying payment:', paymentId);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">إدارة المدفوعات</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              إدارة جميع المدفوعات والمعاملات المالية في منصة Lumo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Plus className="w-4 h-4 ml-2" />
                معاملة جديدة
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
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
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">إجمالي الإيرادات</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {payments.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">مدفوعات مكتملة</div>
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
                  {payments.filter(p => p.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">مدفوعات معلقة</div>
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
                  {payments.filter(p => p.status === 'failed').length}
                </div>
                <div className="text-sm text-gray-600">مدفوعات فاشلة</div>
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
                placeholder="بحث عن معاملة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع الطرق</option>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع العملات</option>
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع البوابات</option>
                {gateways.map(gateway => (
                  <option key={gateway} value={gateway}>{gateway}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedPayments.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm text-blue-700">
                تم اختيار {selectedPayments.length} معاملة
              </span>
              <Button size="sm" onClick={() => handleBulkAction('refund')}>
                <RefreshCw className="w-4 h-4 ml-2" />
                استرداد
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('cancel')}>
                <XCircle className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('retry')}>
                <RefreshCw className="w-4 h-4 ml-2" />
                إعادة المحاولة
              </Button>
            </div>
          )}
        </div>

        {/* Payments Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedPayments.length === filteredPayments.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPayments(filteredPayments.map(p => p.id));
                        } else {
                          setSelectedPayments([]);
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    معرّف المعاملة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستخدم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    طريقة الدفع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => handleSelectPayment(payment.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.transactionId}</div>
                      <div className="text-sm text-gray-500">{payment.invoiceId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.user}</div>
                      <div className="text-sm text-gray-500">{payment.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.amount} {payment.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : payment.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status === 'completed' ? 'مكتمل' : payment.status === 'pending' ? 'معلق' : 'فشل'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض
                        </Button>
                        {payment.status === 'completed' && (
                          <Button variant="outline" size="sm" onClick={() => handleRefund(payment.id)}>
                            <RefreshCw className="w-4 h-4 ml-2" />
                            استرداد
                          </Button>
                        )}
                        {payment.status === 'failed' && (
                          <Button variant="outline" size="sm" onClick={() => handleRetry(payment.id)}>
                            <RefreshCw className="w-4 h-4 ml-2" />
                            إعادة
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 ml-2" />
                          فاتورة
                        </Button>
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
