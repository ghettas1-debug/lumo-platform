"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Calculator, 
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

export default function TaxPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'vat' | 'income-tax' | 'reports'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const taxRates = [
    {
      country: 'المملكة العربية السعودية',
      currency: 'ريال',
      vatRate: 15,
      incomeTaxRate: 20,
      corporateTaxRate: 20,
      withholdingTax: {
        services: 15,
        royalties: 15,
        interest: 5,
        dividends: 5
      },
      taxYear: '2024',
      lastUpdated: '2024-01-01'
    },
    {
      country: 'الإمارات العربية المتحدة',
      currency: 'درهم',
      vatRate: 5,
      incomeTaxRate: 0,
      corporateTaxRate: 9,
      withholdingTax: {
        services: 0,
        royalties: 0,
        interest: 0,
        dividends: 0
      },
      taxYear: '2024',
      lastUpdated: '2024-01-01'
    },
    {
      country: 'مصر',
      currency: 'جنيه',
      vatRate: 14,
      incomeTaxRate: 25,
      corporateTaxRate: 22.5,
      withholdingTax: {
        services: 20,
        royalties: 20,
        interest: 20,
        dividends: 10
      },
      taxYear: '2024',
      lastUpdated: '2024-01-01'
    }
  ];

  const taxReports = [
    {
      id: '1',
      reportType: 'تقرير ضريبة القيمة المضافة',
      period: '2024-Q1',
      country: 'المملكة العربية السعودية',
      totalRevenue: 50000,
      vatAmount: 7500,
      vatCollected: 7500,
      vatPaid: 1200,
      netVatPayable: 6300,
      status: 'submitted',
      submissionDate: '2024-04-15',
      dueDate: '2024-04-30'
    },
    {
      id: '2',
      reportType: 'تقرير ضريبة الدخل',
      period: '2024-Annual',
      country: 'المملكة العربية السعودية',
      totalIncome: 600000,
      taxableIncome: 480000,
      incomeTaxAmount: 96000,
      taxPaid: 24000,
      netTaxPayable: 72000,
      status: 'draft',
      submissionDate: null,
      dueDate: '2024-12-31'
    },
    {
      id: '3',
      reportType: 'تقرير ضريبة الشركات',
      period: '2024-Annual',
      country: 'الإمارات العربية المتحدة',
      totalRevenue: 300000,
      taxableProfit: 27000,
      corporateTaxAmount: 2430,
      taxPaid: 0,
      netTaxPayable: 2430,
      status: 'pending',
      submissionDate: null,
      dueDate: '2024-12-31'
    }
  ];

  const taxSettings = {
    defaultCountry: 'المملكة العربية السعودية',
    taxCalculationMethod: 'accrual',
    taxReportingFrequency: 'quarterly',
    autoTaxCalculation: true,
    taxNumber: '300123456700003',
    taxRegistrationDate: '2020-01-01',
    taxAuthority: 'هيئة الزكاة والضريبة والدخل',
    taxOffice: 'الرياض - المملكة العربية السعودية'
  };

  const filteredReports = taxReports.filter(report => {
    const matchesSearch = report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.period.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleExportReport = (reportId: string) => {
    console.log('Exporting report:', reportId);
  };

  const handleSubmitReport = (reportId: string) => {
    console.log('Submitting report:', reportId);
  };

  const handleCalculateTax = () => {
    console.log('Calculating taxes...');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">إدارة الضرائب</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              نظام متكامل لإدارة الضرائب والامتثال الضريبي في منصة Lumo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                <Calculator className="w-4 h-4 ml-2" />
                حساب الضرائب
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-indigo-600">
                <FileText className="w-4 h-4 ml-2" />
                إنشاء تقرير ضريبي
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
              <div className="p-3 bg-indigo-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {taxReports.reduce((sum, r) => sum + (r.totalRevenue || 0), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">إجمالي الإيرادات</div>
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
                  {taxReports.filter(r => r.status === 'submitted').length}
                </div>
                <div className="text-sm text-gray-600">تقارير مقدمة</div>
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
                  {taxReports.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">تقارير معلقة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calculator className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {taxRates.length}
                </div>
                <div className="text-sm text-gray-600">دول مدعومة</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'vat', 'income-tax', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'vat' && 'ضريبة القيمة المضافة'}
                {tab === 'income-tax' && 'ضريبة الدخل'}
                {tab === 'reports' && 'التقارير'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">نظرة عامة على الضرائب</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                نظام متكامل لإدارة الضرائب والامتثال الضريبي في جميع الدول التي نعمل بها
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">إعدادات الضريبة</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">البلد الافتراضي:</span>
                    <span className="font-medium">{taxSettings.defaultCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">طريقة الحساب:</span>
                    <span className="font-medium">{taxSettings.taxCalculationMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تكرار التقارير:</span>
                    <span className="font-medium">{taxSettings.taxReportingFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الرقم الضريبي:</span>
                    <span className="font-medium">{taxSettings.taxNumber}</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">ملخص الضرائب</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">إجمالي ضريبة القيمة المضافة:</span>
                    <span className="font-medium">
                      {taxReports.reduce((sum, r) => sum + (r.vatAmount || 0), 0).toLocaleString()} ريال
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">إجمالي ضريبة الدخل:</span>
                    <span className="font-medium">
                      {taxReports.reduce((sum, r) => sum + (r.incomeTaxAmount || 0), 0).toLocaleString()} ريال
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">إجمالي ضريبة الشركات:</span>
                    <span className="font-medium">
                      {taxReports.reduce((sum, r) => sum + (r.corporateTaxAmount || 0), 0).toLocaleString()} ريال
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'vat' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ضريبة القيمة المضافة</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                إدارة ضريبة القيمة المضافة لجميع الدول المدعومة
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الدولة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العملة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نسبة الضريبة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السنة الضريبية
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      آخر تحديث
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {taxRates.map((rate, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.vatRate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.taxYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'income-tax' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ضريبة الدخل والشركات</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                إدارة ضرائب الدخل والشركات لجميع الدول المدعومة
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {taxRates.map((rate, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{rate.country}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ضريبة الدخل:</span>
                      <span className="font-medium">{rate.incomeTaxRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ضريبة الشركات:</span>
                      <span className="font-medium">{rate.corporateTaxRate}%</span>
                    </div>
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-gray-900 mb-2">ضريبة الخصم:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">خدمات:</span>
                          <span>{rate.withholdingTax.services}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">إتاوات:</span>
                          <span>{rate.withholdingTax.royalties}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">فوائد:</span>
                          <span>{rate.withholdingTax.interest}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">أرباح:</span>
                          <span>{rate.withholdingTax.dividends}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">التقارير الضريبية</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث عن تقرير..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <Button onClick={handleCalculateTax}>
                  <Calculator className="w-4 h-4 ml-2" />
                  حساب الضرائب
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نوع التقرير
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الفترة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الدولة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبلغ الضريبي
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ الاستحقاق
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.reportType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.netVatPayable || report.netTaxPayable || 0} ريال
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'submitted' 
                            ? 'bg-green-100 text-green-800' 
                            : report.status === 'draft' 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status === 'submitted' ? 'مقدم' : report.status === 'draft' ? 'مسودة' : 'معلق'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleExportReport(report.id)}>
                            <Download className="w-4 h-4 ml-2" />
                            تصدير
                          </Button>
                          {report.status === 'draft' && (
                            <Button variant="outline" size="sm" onClick={() => handleSubmitReport(report.id)}>
                              <CheckCircle className="w-4 h-4 ml-2" />
                              تقديم
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
