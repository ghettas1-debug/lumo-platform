"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Check, 
  Clock, 
  FileText, 
  Mail, 
  Phone, 
  MapPin,
  User,
  Package,
  Settings,
  Shield,
  Zap
} from 'lucide-react';

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payment-methods' | 'billing-history'>('overview');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // بيانات وهمية للفواتير
  const invoices = [
    {
      id: 'INV-2026-001',
      date: '30 يناير 2026',
      dueDate: '15 فبراير 2026',
      amount: 79.00,
      status: 'paid',
      description: 'اشتراك شهري - خطة المحترف',
      plan: 'المحترف',
      period: 'يناير 2026'
    },
    {
      id: 'INV-2026-002',
      date: '15 يناير 2026',
      dueDate: '15 فبراير 2026',
      amount: 790.00,
      status: 'paid',
      description: 'اشتراك سنوي - خطة المحترف',
      plan: 'المحترف',
      period: '2026'
    },
    {
      id: 'INV-2026-003',
      date: '1 يناير 2026',
      dueDate: '1 فبراير 2026',
      amount: 29.00,
      status: 'pending',
      description: 'اشتراك شهري - خطة الأساسي',
      plan: 'الأساسي',
      period: 'يناير 2026'
    },
    {
      id: 'INV-2025-012',
      date: '15 ديسمبر 2025',
      dueDate: '15 يناير 2026',
      amount: 199.00,
      status: 'overdue',
      description: 'اشتراك شهري - خطة المؤسسات',
      plan: 'المؤسسات',
      period: 'ديسمبر 2025'
    }
  ];

  const paymentMethods = [
    {
      id: 'card-1',
      type: 'credit-card',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'credit-card',
      brand: 'Mastercard',
      last4: '5555',
      expiry: '09/26',
      isDefault: false
    },
    {
      id: 'paypal-1',
      type: 'paypal',
      email: 'user@example.com',
      isDefault: false
    }
  ];

  const billingStats = {
    currentSpend: 158.00,
    lastMonthSpend: 29.00,
    projectedSpend: 1896.00,
    totalSavings: 158.00,
    nextPayment: 79.00,
    nextPaymentDate: '15 فبراير 2026'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'مدفوع';
      case 'pending': return 'معلق';
      case 'overdue': return 'متأخر';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">الفواتير والدفعات</h1>
              <p className="text-gray-600">إدارة فواتيرك وطرق الدفع</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                تحميل التقارير
              </Button>
              <Button>
                <CreditCard className="w-4 h-4 ml-2" />
                إضافة طريقة دفع
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <span className="text-xs text-green-600 font-medium">+445%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${billingStats.currentSpend}</div>
            <div className="text-sm text-gray-600">الإنفاق الشهري</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-xs text-green-600 font-medium">+23%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${billingStats.projectedSpend}</div>
            <div className="text-sm text-gray-600">الإنفاق السنوي</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-orange-600" />
              <span className="text-xs text-gray-500">التالي</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${billingStats.nextPayment}</div>
            <div className="text-sm text-gray-600">{billingStats.nextPaymentDate}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
              <span className="text-xs text-green-600 font-medium">وفر</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${billingStats.totalSavings}</div>
            <div className="text-sm text-gray-600">إجمالي المدخرات</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الفواتير
            </button>
            <button
              onClick={() => setActiveTab('payment-methods')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payment-methods'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              طرق الدفع
            </button>
            <button
              onClick={() => setActiveTab('billing-history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'billing-history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              السجل المالي
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Current Plan */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">خطتك الحالية</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-blue-900">خطة المحترف</h4>
                    <p className="text-blue-700">اشتراك شهري</p>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-blue-900">$79.00</div>
                    <div className="text-sm text-blue-700">شهرياً</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-blue-700">التجديد التالي: 15 فبراير 2026</span>
                  <Button variant="outline" size="sm">
                    تعديل الخطة
                  </Button>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">طرق الدفع</h3>
                <Button variant="outline" size="sm">
                  إضافة طريقة دفع
                </Button>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded">
                        {method.type === 'credit-card' ? (
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {method.type === 'credit-card' 
                            ? `${method.brand} **** ${method.last4}`
                            : method.email
                          }
                        </div>
                        <div className="text-sm text-gray-500">
                          {method.type === 'credit-card' 
                            ? `تنتهي: ${method.expiry}`
                            : 'PayPal'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          افتراضي
                        </span>
                      )}
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Payments */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">المدفوعات القادمة</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <div className="font-medium text-yellow-900">دفع قادم</div>
                    <div className="text-sm text-yellow-700">خطة المحترف - فبراير 2026</div>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-yellow-900">$79.00</div>
                    <div className="text-sm text-yellow-700">15 فبراير</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="space-y-6">
            {invoices.map((invoice) => (
              <Card key={invoice.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{invoice.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{invoice.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {invoice.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        تاريخ الاستحقاق: {invoice.dueDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {invoice.plan}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-2xl font-bold text-gray-900">${invoice.amount}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 ml-2" />
                        تحميل
                      </Button>
                      {invoice.status === 'pending' && (
                        <Button size="sm">
                          <CreditCard className="w-4 h-4 ml-2" />
                          دفع الآن
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'payment-methods' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إضافة طريقة دفع جديدة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <CreditCard className="w-4 h-4 ml-2" />
                  إضافة بطاقة ائتمان
                </Button>
                <Button variant="outline" className="justify-start">
                  <Package className="w-4 h-4 ml-2" />
                  إضافة حساب PayPal
                </Button>
                <Button variant="outline" className="justify-start">
                  <Shield className="w-4 h-4 ml-2" />
                  إضافة تحويل بنكي
                </Button>
                <Button variant="outline" className="justify-start">
                  <Zap className="w-4 h-4 ml-2" />
                  إضافة محفظة رقمية
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">طرق الدفع الحالية</h3>
              {paymentMethods.map((method) => (
                <Card key={method.id} className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        {method.type === 'credit-card' ? (
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {method.type === 'credit-card' 
                            ? `${method.brand} **** ${method.last4}`
                            : method.email
                          }
                        </div>
                        <div className="text-sm text-gray-500">
                          {method.type === 'credit-card' 
                            ? `تنتهي: ${method.expiry}`
                            : 'PayPal'
                          }
                        </div>
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            طريقة الدفع الافتراضية
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 ml-2" />
                        تعديل
                      </Button>
                      {!method.isDefault && (
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                          حذف
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'billing-history' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">سجل المعاملات المالية</h3>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-gray-500">{invoice.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${invoice.amount}</div>
                      <div className={`text-sm ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="mt-12">
        <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">هل تحتاجد مساعدة في الفواتير؟</h3>
            <p className="text-lg mb-6">فريق الدعم متاحد لمساعدتك في أي استفسارات مالية</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
                <Mail className="w-4 h-4 ml-2" />
                billing@lumo.com
              </Button>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
                <Phone className="w-4 h-4 ml-2" />
                +966 50 123 4567
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
