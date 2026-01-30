"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Receipt, 
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

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const invoices = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      amount: 299.99,
      currency: 'ريال',
      status: 'paid',
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      paidDate: '2024-01-20',
      paymentMethod: 'بطاقة ائتمان',
      items: [
        { name: 'تطوير تطبيقات الويب', quantity: 1, price: 299.99 }
      ],
      tax: 15.00,
      total: 314.99,
      notes: 'شكراً لثقتك بمنصة Lumo'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customerName: 'سارة علي',
      customerEmail: 'sarah@example.com',
      amount: 199.99,
      currency: 'ريال',
      status: 'unpaid',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      paidDate: null,
      paymentMethod: null,
      items: [
        { name: 'تصميم واجهات المستخدم', quantity: 1, price: 199.99 }
      ],
      tax: 10.00,
      total: 209.99,
      notes: 'تاريخ الاستحقاق: 20 فبراير 2024'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      customerName: 'محمد سالم',
      customerEmail: 'mohammed@example.com',
      amount: 399.99,
      currency: 'ريال',
      status: 'overdue',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      paidDate: null,
      paymentMethod: null,
      items: [
        { name: 'أساسيات قواعد البيانات', quantity: 1, price: 399.99 }
      ],
      tax: 20.00,
      total: 419.99,
      notes: 'فاتورة متأخرة - يرجى السداد فوراً'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      customerName: 'ليلى أحمد',
      customerEmail: 'laila@example.com',
      amount: 499.99,
      currency: 'ريال',
      status: 'paid',
      issueDate: '2024-01-25',
      dueDate: '2024-02-25',
      paidDate: '2024-01-28',
      paymentMethod: 'باي بال',
      items: [
        { name: 'مقدمة في الذكاء الاصطناعي', quantity: 1, price: 499.99 }
      ],
      tax: 25.00,
      total: 524.99,
      notes: 'شكراً لثقتك بمنصة Lumo'
    }
  ];

  const paymentMethods = ['الجميع', 'بطاقة ائتمان', 'باي بال', 'تحويل بنكي', 'الدفع عند الاستلام'];
  const currencies = ['الجميع', 'ريال', 'دولار', 'يورو'];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || invoice.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleBulkAction = (action: 'send' | 'mark-paid' | 'delete') => {
    console.log(`Bulk ${action} for invoices:`, selectedInvoices);
    setSelectedInvoices([]);
  };

  const handleExport = () => {
    console.log('Exporting invoices data...');
  };

  const handleSendReminder = (invoiceId: string) => {
    console.log('Sending reminder for invoice:', invoiceId);
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    console.log('Marking invoice as paid:', invoiceId);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">إدارة الفواتير</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              إدارة جميع الفواتير والمعاملات المالية في منصة Lumo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء فاتورة جديدة
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
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
                  {invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">إجمالي المدفوعات</div>
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
                  {invoices.filter(i => i.status === 'paid').length}
                </div>
                <div className="text-sm text-gray-600">فواتير مدفوعة</div>
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
                  {invoices.filter(i => i.status === 'unpaid').length}
                </div>
                <div className="text-sm text-gray-600">فواتير غير مدفوعة</div>
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
                  {invoices.filter(i => i.status === 'overdue').length}
                </div>
                <div className="text-sm text-gray-600">فواتير متأخرة</div>
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
                placeholder="بحث عن فاتورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">جميع طرق الدفع</option>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">جميع العملات</option>
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedInvoices.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm text-green-700">
                تم اختيار {selectedInvoices.length} فاتورة
              </span>
              <Button size="sm" onClick={() => handleBulkAction('send')}>
                <MessageSquare className="w-4 h-4 ml-2" />
                إرسال تذكير
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('mark-paid')}>
                <CheckCircle className="w-4 h-4 ml-2" />
                تحديد كمدفوع
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
            </div>
          )}
        </div>

        {/* Invoices Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.length === filteredInvoices.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvoices(filteredInvoices.map(i => i.id));
                        } else {
                          setSelectedInvoices([]);
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم الفاتورة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الإصدار
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الاستحقاق
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
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={() => handleSelectInvoice(invoice.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.invoiceNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.customerName}</div>
                      <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.total} {invoice.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.issueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : invoice.status === 'unpaid' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status === 'paid' ? 'مدفوع' : invoice.status === 'unpaid' ? 'غير مدفوع' : 'متأخر'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض
                        </Button>
                        {invoice.status !== 'paid' && (
                          <Button variant="outline" size="sm" onClick={() => handleSendReminder(invoice.id)}>
                            <MessageSquare className="w-4 h-4 ml-2" />
                            تذكير
                          </Button>
                        )}
                        {invoice.status !== 'paid' && (
                          <Button variant="outline" size="sm" onClick={() => handleMarkAsPaid(invoice.id)}>
                            <CheckCircle className="w-4 h-4 ml-2" />
                            سداد
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 ml-2" />
                          PDF
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
