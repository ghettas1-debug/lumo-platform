"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Target, 
  Star, 
  Trophy, 
  Award, 
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
  Monitor, 
  Camera, 
  Video, 
  Image, 
  Music, 
  Film, 
  Headphones, 
  Mic, 
  Speaker, 
  Radio, 
  Tv, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Gamepad2, 
  Dumbbell, 
  Brain, 
  Lightbulb, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  Flag, 
  Compass, 
  Map, 
  Navigation, 
  Navigation2, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  ArrowUpLeft, 
  ArrowDownRight, 
  ArrowDownLeft, 
  Move3d, 
  Move, 
  MoveDiagonal, 
  MoveDiagonal2, 
  MoveHorizontal, 
  MoveVertical, 
  Expand, 
  Shrink, 
  Maximize, 
  Minimize, 
  ZoomIn, 
  ZoomOut, 
  Scan, 
  ScanLine, 
  ScanFace, 
  ScanBarcode, 
  ScanQrCode, 
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

export default function SkillAssessmentPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [assessmentInProgress, setAssessmentInProgress] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'الكل', count: 24 },
    { id: 'technical', name: 'تقني', count: 10 },
    { id: 'creative', name: 'إبداعي', count: 6 },
    { id: 'business', name: 'أعمال', count: 5 },
    { id: 'soft', name: 'مهارات شخصية', count: 3 }
  ];

  const assessments = [
    {
      id: '1',
      title: 'تقييم مهارات البرمجة',
      category: 'technical',
      duration: 45,
      questions: 30,
      difficulty: 'intermediate',
      description: 'تقييم شامل لمهارات البرمجة المختلفة',
      skills: ['JavaScript', 'Python', 'Java', 'C++', 'SQL'],
      topics: ['الخوارزميات', 'هياكل البيانات', 'تصميم الأنظمة', 'قواعد البيانات'],
      results: {
        levels: ['مبتدئ', 'متوسط', 'متقدم', 'خبير'],
        recommendations: true,
        detailedReport: true
      }
    },
    {
      id: '2',
      title: 'تقييم مهارات التصميم',
      category: 'creative',
      duration: 30,
      questions: 25,
      difficulty: 'beginner',
      description: 'قياس مهارات التصميم الجرافيكي وUI/UX',
      skills: ['Photoshop', 'Illustrator', 'Figma', 'Sketch', 'Adobe XD'],
      topics: ['نظرية الألوان', 'Typography', 'تصميم الواجهات', 'تجربة المستخدم'],
      results: {
        levels: ['مبتدئ', 'متوسط', 'متقدم'],
        recommendations: true,
        detailedReport: true
      }
    },
    {
      id: '3',
      title: 'تقييم المهارات الشخصية',
      category: 'soft',
      duration: 20,
      questions: 20,
      difficulty: 'easy',
      description: 'تقييم المهارات الشخصية والقيادية',
      skills: ['التواصل', 'القيادة', 'العمل الجماعي', 'حل المشكلات', 'إدارة الوقت'],
      topics: ['الذكاء العاطفي', 'القيادة', 'التواصل الفعال', 'العمل تحت الضغط'],
      results: {
        levels: ['تحتاج تحسين', 'جيد', 'ممتاز', 'استثنائي'],
        recommendations: true,
        detailedReport: false
      }
    },
    {
      id: '4',
      title: 'تقييم مهارات التسويق',
      category: 'business',
      duration: 35,
      questions: 28,
      difficulty: 'intermediate',
      description: 'تقييم مهارات التسويق الرقمي والتقليدي',
      skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Email Marketing'],
      topics: ['استراتيجيات التسويق', 'تحليل السوق', 'قياس الأداء', 'التسويق الرقمي'],
      results: {
        levels: ['مبتدئ', 'متوسط', 'متقدم', 'خبير'],
        recommendations: true,
        detailedReport: true
      }
    }
  ];

  const myAssessments = [
    {
      id: '1',
      title: 'تقييم مهارات البرمجة',
      completionDate: '2024-01-25',
      score: 85,
      level: 'متقدم',
      timeSpent: 42,
      status: 'completed',
      certificateId: 'LUMO-ASSESS-2024-PROG-001'
    },
    {
      id: '2',
      title: 'تقييم المهارات الشخصية',
      completionDate: '2024-01-20',
      score: 92,
      level: 'ممتاز',
      timeSpent: 18,
      status: 'completed',
      certificateId: 'LUMO-ASSESS-2024-SOFT-045'
    }
  ];

  const skillLevels = [
    { name: 'مبتدئ', color: 'bg-green-100 text-green-800', range: '0-25%' },
    { name: 'متوسط', color: 'bg-yellow-100 text-yellow-800', range: '26-50%' },
    { name: 'متقدم', color: 'bg-orange-100 text-orange-800', range: '51-75%' },
    { name: 'خبير', color: 'bg-red-100 text-red-800', range: '76-100%' }
  ];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesCategory = selectedCategory === 'all' || assessment.category === selectedCategory;
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartAssessment = (assessmentId: string) => {
    setCurrentAssessment(assessmentId);
    setAssessmentInProgress(true);
  };

  const handleEndAssessment = () => {
    setAssessmentInProgress(false);
    setCurrentAssessment(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'سهل';
      case 'intermediate':
        return 'متوسط';
      case 'hard':
        return 'صعب';
      default:
        return 'غير محدد';
    }
  };

  if (assessmentInProgress && currentAssessment) {
    const assessment = assessments.find(a => a.id === currentAssessment);
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        {/* Assessment Interface */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">{assessment?.title}</h1>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">15:30</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">السؤال:</span>
                  <span className="font-medium text-gray-900">8 / 30</span>
                </div>
                <Button variant="destructive" onClick={handleEndAssessment}>
                  إنهاء التقييم
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">السؤال 8</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">التقدم:</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '27%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-6">
                ما هو الفرق بين Array و Linked List في هياكل البيانات؟
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="answer" className="w-4 h-4" />
                  <span>Array يخزن العناصر في ذاكرة متصلة، Linked List يخزنها في ذاكرة متفرقة</span>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="answer" className="w-4 h-4" />
                  <span>Linked List أسرع في الوصول العشوائي، Array أسرع في الإدراج والحذف</span>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="answer" className="w-4 h-4" />
                  <span>Array حجمه ثابت، Linked List حجمه متغير</span>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="answer" className="w-4 h-4" />
                  <span>لا يوجد فرق بينهما في الأداء</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline">
                السابق
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline">تخطي</Button>
                <Button>التالي</Button>
              </div>
            </div>
          </Card>

          {/* Progress Sidebar */}
          <div className="mt-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">تقدم التقييم</h3>
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 30 }, (_, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 rounded-lg border ${
                      i < 8
                        ? 'bg-green-500 text-white border-green-500'
                        : i === 7
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </Card>
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
              <h1 className="text-3xl font-bold text-gray-900">تقييم المهارات</h1>
              <p className="text-gray-600 mt-1">اكتشف مهاراتك وقوّها باستخدام تقييمات احترافية</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Target className="w-4 h-4 ml-2" />
                تقييماتي
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                تقييم جديد
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
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{assessments.length}</div>
                <div className="text-sm text-gray-600">تقييم متاح</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{myAssessments.length}</div>
                <div className="text-sm text-gray-600">تقييم مكتمل</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">88%</div>
                <div className="text-sm text-gray-600">متوسط الدرجة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-sm text-gray-600">مهارة مقيمة</div>
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
                  placeholder="البحث في التقييمات..."
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

        {/* My Assessments */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">تقييماتي</h3>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </div>
          <div className="space-y-4">
            {myAssessments.map((assessment) => (
              <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{assessment.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>التاريخ: {assessment.completionDate}</span>
                      <span>الدرجة: {assessment.score}%</span>
                      <span>المستوى: {assessment.level}</span>
                      <span>المدة: {assessment.timeSpent} دقيقة</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available Assessments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(assessment.difficulty)}`}>
                  {getDifficultyText(assessment.difficulty)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{assessment.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">المدة:</span>
                  <span className="font-medium">{assessment.duration} دقيقة</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الأسئلة:</span>
                  <span className="font-medium">{assessment.questions} سؤال</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">المهارات المقيمة:</div>
                <div className="flex flex-wrap gap-1">
                  {assessment.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {assessment.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{assessment.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">المستويات:</div>
                <div className="flex flex-wrap gap-1">
                  {assessment.results.levels.map((level, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">توصيات مخصصة</span>
                {assessment.results.detailedReport && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">تقرير مفصل</span>
                  </>
                )}
              </div>

              <Button 
                className="w-full"
                onClick={() => handleStartAssessment(assessment.id)}
              >
                ابدأ التقييم
              </Button>
            </Card>
          ))}
        </div>

        {/* Skill Levels Reference */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">مستويات المهارات</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {skillLevels.map((level) => (
              <div key={level.name} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${level.color}`}>
                    {level.name}
                  </span>
                  <span className="text-sm text-gray-600">{level.range}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {level.name === 'مبتدئ' && 'فهم أساسي للمفاهيم'}
                  {level.name === 'متوسط' && 'تطبيق عملي للمهارات'}
                  {level.name === 'متقدم' && 'إتقان عميق للمفاهيم'}
                  {level.name === 'خبير' && 'مستوى احترافي متقدم'}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
