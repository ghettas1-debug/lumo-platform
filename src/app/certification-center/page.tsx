"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Award, 
  Star, 
  Trophy, 
  Medal, 
  Target, 
  Zap, 
  Heart, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Download, 
  Upload, 
  Copy, 
  Eye, 
  EyeOff, 
  Search, 
  Filter, 
  RefreshCw, 
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
  Users, 
  Activity, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  Globe, 
  Shield, 
  Key, 
  Lock, 
  Unlock, 
  FileText, 
  FileCheck, 
  FileSearch, 
  FileLock, 
  FileSignature, 
  FileWarning, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  UserCheck, 
  UserX, 
  UserLock, 
  KeyRound, 
  Fingerprint, 
  LockKeyhole, 
  UnlockKeyhole, 
  Terminal, 
  Braces, 
  Package, 
  GitBranch, 
  GitMerge, 
  GitCommit, 
  GitPullRequest, 
  GitFork, 
  Database, 
  Server, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Network, 
  Router, 
  Code, 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  RotateCcw, 
  Save, 
  File, 
  FilePlus, 
  FileMinus, 
  FileX, 
  Printer, 
  Mail as MailIcon,
  Phone as PhoneIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Users as UsersIcon,
  Activity as ActivityIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Menu as MenuIcon,
  Globe as GlobeIcon,
  Shield as ShieldIcon,
  Key as KeyIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  FileText as FileTextIcon,
  FileCheck as FileCheckIcon,
  FileSearch as FileSearchIcon,
  FileLock as FileLockIcon,
  FileSignature as FileSignatureIcon,
  FileWarning as FileWarningIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert as ShieldAlertIcon,
  ShieldX as ShieldXIcon,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  UserLock as UserLockIcon,
  KeyRound as KeyRoundIcon,
  Fingerprint as FingerprintIcon,
  LockKeyhole as LockKeyholeIcon,
  UnlockKeyhole as UnlockKeyholeIcon,
  Terminal as TerminalIcon,
  Braces as BracesIcon,
  Package as PackageIcon,
  GitBranch as GitBranchIcon,
  GitMerge as GitMergeIcon,
  GitCommit as GitCommitIcon,
  GitPullRequest as GitPullRequestIcon,
  GitFork as GitForkIcon,
  Database as DatabaseIcon,
  Server as ServerIcon,
  HardDrive as HardDriveIcon,
  Cpu as CpuIcon,
  MemoryStick as MemoryStickIcon,
  Network as NetworkIcon,
  Router as RouterIcon,
  Code as CodeIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  Square as SquareIcon,
  SkipForward as SkipForwardIcon,
  SkipBack as SkipBackIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Maximize2 as Maximize2Icon,
  Minimize2 as Minimize2Icon,
  RotateCw as RotateCwIcon,
  RotateCcw as RotateCcwIcon,
  Save as SaveIcon,
  File as FileIcon,
  FilePlus as FilePlusIcon,
  FileMinus as FileMinusIcon,
  FileX as FileXIcon,
  Printer as PrinterIcon
} from 'lucide-react';

export default function CertificationCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'الكل', count: 24 },
    { id: 'programming', name: 'البرمجة', count: 8 },
    { id: 'design', name: 'التصميم', count: 6 },
    { id: 'business', name: 'الأعمال', count: 5 },
    { id: 'marketing', name: 'التسويق', count: 5 }
  ];

  const certificates = [
    {
      id: '1',
      title: 'شهادة تطوير الويب المتقدم',
      category: 'programming',
      level: 'متقدم',
      duration: '40 ساعة',
      price: 299,
      rating: 4.8,
      students: 1250,
      instructor: 'محمد أحمد',
      image: '/api/placeholder/300/200',
      description: 'تعلم أحدث تقنيات تطوير الويب',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      prerequisites: ['HTML/CSS أساسيات', 'JavaScript متوسط'],
      outcomes: ['بناء تطبيقات ويب احترافية', 'فهم معمارية الويب الحديثة'],
      validity: 'سنتان',
      accreditation: 'معتمد دولياً'
    },
    {
      id: '2',
      title: 'شهادة التصميم الجرافيكي',
      category: 'design',
      level: 'متوسط',
      duration: '30 ساعة',
      price: 199,
      rating: 4.6,
      students: 890,
      instructor: 'سارة محمد',
      image: '/api/placeholder/300/200',
      description: 'إتقان مبادئ التصميم الجرافيكي',
      skills: ['Photoshop', 'Illustrator', 'InDesign', 'Figma'],
      prerequisites: ['أساسيات التصميم'],
      outcomes: ['إنشاء تصاميم احترافية', 'فهم نظرية الألوان'],
      validity: 'سنتان',
      accreditation: 'معتمد محلياً'
    },
    {
      id: '3',
      title: 'شهادة التسويق الرقمي',
      category: 'marketing',
      level: 'مبتدئ',
      duration: '25 ساعة',
      price: 149,
      rating: 4.7,
      students: 2100,
      instructor: 'خالد علي',
      image: '/api/placeholder/300/200',
      description: 'استراتيجيات التسويق الرقمي الفعالة',
      skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing'],
      prerequisites: ['لا يوجد'],
      outcomes: ['بناء حملات تسويقية ناجحة', 'تحليل أداء التسويق'],
      validity: 'سنة',
      accreditation: 'معتمد دولياً'
    },
    {
      id: '4',
      title: 'شهادة إدارة المشاريع',
      category: 'business',
      level: 'متقدم',
      duration: '45 ساعة',
      price: 399,
      rating: 4.9,
      students: 670,
      instructor: 'منى سعيد',
      image: '/api/placeholder/300/200',
      description: 'إدارة المشاريع الاحترافية',
      skills: ['Agile', 'Scrum', 'Risk Management', 'Budget Planning'],
      prerequisites: ['خبرة في إدارة المشاريع'],
      outcomes: ['إدارة مشاريع معقدة', 'قيادة فرق عمل'],
      validity: '3 سنوات',
      accreditation: 'PMP معتمد'
    }
  ];

  const myCertificates = [
    {
      id: '1',
      title: 'شهادة تطوير الويب المتقدم',
      issueDate: '2024-01-15',
      expiryDate: '2026-01-15',
      status: 'active',
      score: 92,
      certificateId: 'LUMO-2024-WEB-001',
      verificationCode: 'ABC123XYZ'
    },
    {
      id: '2',
      title: 'شهادة التصميم الجرافيكي',
      issueDate: '2023-12-20',
      expiryDate: '2025-12-20',
      status: 'active',
      score: 88,
      certificateId: 'LUMO-2023-DES-045',
      verificationCode: 'DEF456UVW'
    }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (certificateId: string) => {
    console.log('Enrolling in certificate:', certificateId);
  };

  const handleDownloadCertificate = (certificateId: string) => {
    console.log('Downloading certificate:', certificateId);
  };

  const handleVerifyCertificate = (verificationCode: string) => {
    console.log('Verifying certificate:', verificationCode);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ':
        return 'bg-green-100 text-green-800';
      case 'متوسط':
        return 'bg-yellow-100 text-yellow-800';
      case 'متقدم':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">مركز الشهادات</h1>
              <p className="text-gray-600 mt-1">احصل على شهادات معتمدة تعزز مسيرتك المهنية</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Award className="w-4 h-4 ml-2" />
                شهاداتي
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                طلب شهادة
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
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{certificates.length}</div>
                <div className="text-sm text-gray-600">شهادة متاحة</div>
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
                  {certificates.reduce((sum, cert) => sum + cert.students, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">طالب مسجل</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.7</div>
                <div className="text-sm text-gray-600">متوسط التقييم</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{myCertificates.length}</div>
                <div className="text-sm text-gray-600">شهاداتي</div>
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
                  placeholder="البحث في الشهادات..."
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

        {/* My Certificates */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">شهاداتي</h3>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 ml-2" />
              عرض الكل
            </Button>
          </div>
          <div className="space-y-4">
            {myCertificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{cert.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>رقم الشهادة: {cert.certificateId}</span>
                      <span>الدرجة: {cert.score}%</span>
                      <span>صلاحية: {cert.issueDate} - {cert.expiryDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cert.status)}`}>
                    {cert.status === 'active' ? 'نشطة' : 'منتهية'}
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <Award className="w-16 h-16 text-gray-400" />
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(certificate.level)}`}>
                    {certificate.level}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{certificate.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{certificate.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{certificate.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{certificate.students} طالب</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{certificate.duration}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">المهارات:</div>
                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">${certificate.price}</div>
                    <div className="text-xs text-gray-500">{certificate.accreditation}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-600">مع</div>
                    <div className="text-sm font-medium text-gray-900">{certificate.instructor}</div>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => handleEnroll(certificate.id)}
                >
                  سجل الآن
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <Card className="p-12 text-center">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Award className="w-8 h-8 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لم يتم العثور على شهادات</h3>
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
