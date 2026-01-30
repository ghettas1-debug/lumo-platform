"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Award, 
  TrendingUp,
  UserPlus,
  Settings,
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Zap,
  Target,
  Star,
  Heart,
  MessageSquare,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  CreditCard,
  Receipt,
  RefreshCw,
  DownloadCloud,
  UploadCloud,
  UserCheck,
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

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users = [
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+966 50 123 4567',
      role: 'طالب',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      courses: 5,
      progress: 75,
      avatar: 'bg-blue-600'
    },
    {
      id: '2',
      name: 'سارة علي',
      email: 'sarah@example.com',
      phone: '+966 55 987 6543',
      role: 'طالب',
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-19',
      courses: 8,
      progress: 60,
      avatar: 'bg-purple-600'
    },
    {
      id: '3',
      name: 'محمد سالم',
      email: 'mohammed@example.com',
      phone: '+966 56 789 0123',
      role: 'طالب',
      status: 'inactive',
      joinDate: '2024-01-05',
      lastLogin: '2024-01-15',
      courses: 3,
      progress: 30,
      avatar: 'bg-green-600'
    },
    {
      id: '4',
      name: 'ليلى أحمد',
      email: 'laila@example.com',
      phone: '+966 57 234 5678',
      role: 'طالب',
      status: 'pending',
      joinDate: '2024-01-20',
      lastLogin: '2024-01-20',
      courses: 0,
      progress: 0,
      avatar: 'bg-orange-600'
    }
  ];

  const roles = ['طالب', 'مدرب', 'مشرف', 'مدير'];
  const statuses = ['active', 'inactive', 'pending'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    // Implementation for bulk actions
    console.log(`Bulk ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const handleExport = () => {
    // Implementation for exporting users data
    console.log('Exporting users data...');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">إدارة المستخدمين</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              إدارة جميع مستخدمي منصة Lumo بسهولة وفعالية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <UserPlus className="w-4 h-4 ml-2" />
                إضافة مستخدم جديد
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="w-4 h-4 ml-2" />
                تصدير البيانات
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
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                <div className="text-sm text-gray-600">إجمالي المستخدمين</div>
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
                  {users.filter(u => u.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">مستخدمون نشطون</div>
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
                  {users.filter(u => u.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">في انتظار</div>
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
                  {users.filter(u => u.status === 'inactive').length}
                </div>
                <div className="text-sm text-gray-600">غير نشطين</div>
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
                placeholder="بحث عن مستخدم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع الأدوار</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع الحالات</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'active' ? 'نشط' : status === 'inactive' ? 'غير نشط' : 'في انتظار'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm text-blue-700">
                تم اختيار {selectedUsers.length} مستخدم
              </span>
              <Button size="sm" onClick={() => handleBulkAction('activate')}>
                <CheckCircle className="w-4 h-4 ml-2" />
                تفعيل
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                <XCircle className="w-4 h-4 ml-2" />
                تعطيل
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
            </div>
          )}
        </div>

        {/* Users Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(u => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستخدم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الدور
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الانضمام
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر تسجيل دخول
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${user.avatar} rounded-full flex items-center justify-center`}>
                          <UserCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : user.status === 'inactive' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status === 'active' ? 'نشط' : user.status === 'inactive' ? 'غير نشط' : 'في انتظار'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 ml-2" />
                          إرسال
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
