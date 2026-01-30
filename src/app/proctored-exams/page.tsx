"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Monitor, 
  Eye, 
  EyeOff, 
  Camera, 
  CameraOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ScreenShare, 
  ScreenShareOff, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Upload, 
  Copy, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical, 
  Settings, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
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
  Move, 
  Archive, 
  ArchiveRestore, 
  Cloud, 
  CloudDownload, 
  CloudUpload, 
  Wifi, 
  Bluetooth, 
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
  User, 
  UserPlus, 
  UserMinus, 
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

export default function ProctoredExamsPage() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [examInProgress, setExamInProgress] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const exams = [
    {
      id: '1',
      title: 'اختبار تطوير الويب المتقدم',
      category: 'برمجة',
      duration: 120,
      questions: 50,
      passingScore: 70,
      price: 99,
      proctoringLevel: 'strict',
      status: 'available',
      description: 'اختبار شامل لمهارات تطوير الويب الحديثة',
      requirements: ['كاميرا ويب', 'ميكروفون', 'مشاركة الشاشة'],
      topics: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'REST APIs'],
      attempts: 3,
      nextAvailable: '2024-02-01'
    },
    {
      id: '2',
      title: 'اختبار التصميم الجرافيكي',
      category: 'تصميم',
      duration: 90,
      questions: 40,
      passingScore: 75,
      price: 79,
      proctoringLevel: 'moderate',
      status: 'available',
      description: 'تقييم مهارات التصميم الجرافيكي الاحترافية',
      requirements: ['كاميرا ويب', 'مشاركة الشاشة'],
      topics: ['Photoshop', 'Illustrator', 'نظرية الألوان', 'Typography'],
      attempts: 2,
      nextAvailable: '2024-01-31'
    },
    {
      id: '3',
      title: 'اختبار التسويق الرقمي',
      category: 'تسويق',
      duration: 60,
      questions: 30,
      passingScore: 65,
      price: 59,
      proctoringLevel: 'basic',
      status: 'in_progress',
      description: 'اختبار في استراتيجيات التسويق الرقمي',
      requirements: ['كاميرا ويب'],
      topics: ['SEO', 'SEM', 'Social Media', 'Content Marketing'],
      attempts: 3,
      nextAvailable: '2024-02-05'
    }
  ];

  const myExams = [
    {
      id: '1',
      title: 'اختبار تطوير الويب المتقدم',
      attemptDate: '2024-01-25',
      score: 85,
      status: 'passed',
      certificateId: 'LUMO-EXAM-2024-WEB-001',
      duration: 115,
      proctoringVerified: true
    },
    {
      id: '2',
      title: 'اختبار التصميم الجرافيكي',
      attemptDate: '2024-01-20',
      score: 62,
      status: 'failed',
      certificateId: null,
      duration: 88,
      proctoringVerified: true
    }
  ];

  const examRules = [
    'يجب إبقاء الكاميرا مفتوحة طوال فترة الاختبار',
    'لا يسمح بالتحدث مع أي شخص أثناء الاختبار',
    'يجب إبقاء الشاشة مرئية للمشرف',
    'ممنوع استخدام الهاتف أو الأجهزة الإلكترونية الأخرى',
    'لا يسمح بفتح نوافذ أو تطبيقات أخرى',
    'يجب إكمال الاختبار في الجلسة الواحدة'
  ];

  const systemRequirements = {
    basic: {
      name: 'أساسي',
      requirements: ['كاميرا ويب', 'متصفح حديث', 'اتصال إنترنت مستقر'],
      description: 'للاختبارات غير الحرجة'
    },
    moderate: {
      name: 'متوسط',
      requirements: ['كاميرا ويب', 'ميكروفون', 'مشاركة الشاشة', 'متصفح حديث'],
      description: 'للاختبارات المتوسطة الأهمية'
    },
    strict: {
      name: 'صارم',
      requirements: ['كاميرا ويب', 'ميكروفون', 'مشاركة الشاشة', 'تسجيل الشاشة', 'بيئة اختبار معتمدة'],
      description: 'للاختبارات عالية الأهمية'
    }
  };

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartExam = (examId: string) => {
    setSelectedExam(examId);
    setExamInProgress(true);
  };

  const handleEndExam = () => {
    setExamInProgress(false);
    setSelectedExam(null);
  };

  const getProctoringColor = (level: string) => {
    switch (level) {
      case 'basic':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'strict':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProctoringText = (level: string) => {
    switch (level) {
      case 'basic':
        return 'أساسي';
      case 'moderate':
        return 'متوسط';
      case 'strict':
        return 'صارم';
      default:
        return 'غير محدد';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'متاح';
      case 'in_progress':
        return 'قيد التنفيذ';
      case 'completed':
        return 'مكتمل';
      case 'passed':
        return 'نجح';
      case 'failed':
        return 'فشل';
      default:
        return 'غير معروف';
    }
  };

  if (examInProgress && selectedExam) {
    const exam = exams.find(e => e.id === selectedExam);
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        {/* Exam Interface */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">{exam?.title}</h1>
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-green-500" />
                  <Mic className="w-5 h-5 text-green-500" />
                  <ScreenShare className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">01:45:30</span>
                </div>
                <Button variant="destructive" onClick={handleEndExam}>
                  إنهاء الاختبار
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Exam Area */}
            <div className="lg:col-span-3">
              <Card className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">السؤال 1 من 50</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">الدرجة:</span>
                      <span className="font-medium text-gray-900">0/100</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    ما هو الفرق بين useState و useReducer في React؟
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="answer" className="w-4 h-4" />
                      <span>لا يوجد فرق بينهما</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="answer" className="w-4 h-4" />
                      <span>useState للحالات البسيطة، useReducer للحالات المعقدة</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="answer" className="w-4 h-4" />
                      <span>useReducer أسرع من useState دائماً</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="answer" className="w-4 h-4" />
                      <span>useState للكائنات فقط، useReducer للقيم البسيطة</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" disabled>
                    السابق
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">حفظ والإنتقال لاحقاً</Button>
                    <Button>التالي</Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Proctoring Status */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">حالة المراقبة</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">الكاميرا: نشطة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mic className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">الميكروفون: نشط</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ScreenShare className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">مشاركة الشاشة: نشطة</span>
                  </div>
                </div>
              </Card>

              {/* Question Navigator */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">الأسئلة</h3>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 50 }, (_, i) => (
                    <button
                      key={i}
                      className={`w-10 h-10 rounded-lg border ${
                        i === 0
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Rules Reminder */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">قواعد الاختبار</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {examRules.slice(0, 3).map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الاختبارات المراقبة</h1>
              <p className="text-gray-600 mt-1">اختبارات معتمدة مع مراقبة مباشرة</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <HelpCircle className="w-4 h-4 ml-2" />
                الدليل
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                اختبار جديد
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
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{exams.length}</div>
                <div className="text-sm text-gray-600">اختبار متاح</div>
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
                  {myExams.filter(e => e.status === 'passed').length}
                </div>
                <div className="text-sm text-gray-600">اختبار ناجح</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">مراقبة آمنة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">متوسط الدرجة</div>
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
                  placeholder="البحث في الاختبارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 ml-2" />
                فلتر
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
              </Button>
            </div>
          </div>
        </Card>

        {/* My Exams */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">اختباراتي</h3>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </div>
          <div className="space-y-4">
            {myExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    exam.status === 'passed' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {exam.status === 'passed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{exam.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>التاريخ: {exam.attemptDate}</span>
                      <span>الدرجة: {exam.score}%</span>
                      <span>المدة: {exam.duration} دقيقة</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(exam.status)}`}>
                    {getStatusText(exam.status)}
                  </span>
                  {exam.certificateId && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available Exams */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getProctoringColor(exam.proctoringLevel)}`}>
                  {getProctoringText(exam.proctoringLevel)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">المدة:</span>
                  <span className="font-medium">{exam.duration} دقيقة</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الأسئلة:</span>
                  <span className="font-medium">{exam.questions} سؤال</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">درجة النجاح:</span>
                  <span className="font-medium">{exam.passingScore}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">المحاولات:</span>
                  <span className="font-medium">{exam.attempts}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">المتطلبات:</div>
                <div className="flex flex-wrap gap-1">
                  {exam.requirements.map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-gray-900">${exam.price}</div>
                <div className="text-sm text-gray-600">
                  {exam.nextAvailable && `متاح: ${exam.nextAvailable}`}
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => handleStartExam(exam.id)}
                disabled={exam.status !== 'available'}
              >
                {exam.status === 'available' ? 'ابدأ الاختبار' : 'غير متاح'}
              </Button>
            </Card>
          ))}
        </div>

        {/* System Requirements */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">متطلبات النظام</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(systemRequirements).map(([key, level]) => (
              <div key={key} className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{level.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {level.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
