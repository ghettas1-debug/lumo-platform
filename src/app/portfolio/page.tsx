"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Briefcase, 
  Star, 
  Trophy, 
  Award, 
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
  Github, 
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
  Layout, 
  LayoutDashboard, 
  LayoutGrid, 
  LayoutList, 
  LayoutTemplate, 
  Layers, 
  Folder, 
  FolderOpen, 
  FolderPlus, 
  FolderMinus, 
  FolderX, 
  FolderTree, 
  Archive, 
  ArchiveX, 
  ArchiveRestore, 
  Inbox, 
  Send, 
  Paperclip, 
  Link2, 
  Link2Off, 
  Unlink, 
  Hash, 
  AtSign, 
  Percent, 
  DollarSign as DollarSignIcon,
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

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'الكل', count: 48 },
    { id: 'web', name: 'تطوير الويب', count: 18 },
    { id: 'mobile', name: 'تطبيقات الموبايل', count: 12 },
    { id: 'design', name: 'التصميم', count: 10 },
    { id: 'data', name: 'تحليل البيانات', count: 8 }
  ];

  const portfolioItems = [
    {
      id: '1',
      title: 'منصة التعلم الإلكتروني',
      description: 'منصة تعليمية متكاملة مع نظام إدارة المحتوى والطلاب',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example/project',
      featured: true,
      completedDate: '2024-01-15',
      duration: '6 أشهر',
      teamSize: 5,
      role: 'قائد الفريق',
      achievements: ['أفضل مشروع', '1000+ مستخدم', '5 نجوم'],
      client: 'شركة التعليم المتقدم',
      budget: '$50,000'
    },
    {
      id: '2',
      title: 'تطبيق إدارة المهام',
      description: 'تطبيق موبايل لإدارة المهام والمشاريع مع ميزات التعاون',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      images: ['/api/placeholder/400/300'],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example/mobile-app',
      featured: false,
      completedDate: '2024-01-10',
      duration: '3 أشهر',
      teamSize: 3,
      role: 'مطور رئيسي',
      achievements: ['50000+ تحميل', '4.5 نجوم'],
      client: 'شركة التكنولوجيا الناشئة',
      budget: '$25,000'
    },
    {
      id: '3',
      title: 'لوحة تحليل البيانات',
      description: 'لوحة تحكم تفاعلية لتحليل وعرض البيانات المالية',
      category: 'data',
      technologies: ['Python', 'Django', 'D3.js', 'PostgreSQL'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example/dashboard',
      featured: true,
      completedDate: '2024-01-05',
      duration: '4 أشهر',
      teamSize: 4,
      role: 'محلل بيانات',
      achievements: ['تحسين الأداء 50%', 'تكامل API'],
      client: 'بنك الاستثمار',
      budget: '$35,000'
    },
    {
      id: '4',
      title: 'موقع تجارة إلكترونية',
      description: 'منصة تجارة إلكترونية كاملة مع نظام دفع متكامل',
      category: 'web',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Stripe'],
      images: ['/api/placeholder/400/300'],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example/ecommerce',
      featured: false,
      completedDate: '2023-12-20',
      duration: '5 أشهر',
      teamSize: 6,
      role: 'مطور Full Stack',
      achievements: ['100+ منتج', 'مبيعات $1M+'],
      client: 'متجر الإلكتروني',
      budget: '$40,000'
    },
    {
      id: '5',
      title: 'تطبيق اللياقة البدنية',
      description: 'تطبيق تتبع اللياقة البدنية مع خطط تدريبية مخصصة',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Node.js', 'MongoDB'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example/fitness',
      featured: false,
      completedDate: '2023-12-15',
      duration: '4 أشهر',
      teamSize: 3,
      role: 'مطور Flutter',
      achievements: ['25000+ مستخدم', 'ميزة التدريب AI'],
      client: 'شركة اللياقة',
      budget: '$30,000'
    }
  ];

  const skills = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 85, category: 'backend' },
    { name: 'TypeScript', level: 88, category: 'frontend' },
    { name: 'Python', level: 75, category: 'backend' },
    { name: 'MongoDB', level: 80, category: 'database' },
    { name: 'PostgreSQL', level: 70, category: 'database' },
    { name: 'React Native', level: 82, category: 'mobile' },
    { name: 'Flutter', level: 78, category: 'mobile' },
    { name: 'Docker', level: 72, category: 'devops' },
    { name: 'AWS', level: 68, category: 'cloud' }
  ];

  const testimonials = [
    {
      id: '1',
      name: 'أحمد محمد',
      role: 'مدير مشروع في شركة التكنولوجيا',
      content: 'عمل رائع! تم تسليم المشروع في الوقت المحدد وبجودة عالية.',
      rating: 5,
      project: 'منصة التعلم الإلكتروني'
    },
    {
      id: '2',
      name: 'سارة أحمد',
      role: 'CEO في شركة الناشئة',
      content: 'فريق احترافي ومبدع. التطبيق تجاوز توقعاتنا تماماً.',
      rating: 5,
      project: 'تطبيق إدارة المهام'
    },
    {
      id: '3',
      name: 'محمد سالم',
      role: 'مدير تقني في البنك',
      content: 'حلول مبتكرة وموثوقة. أوصي بهم بشدة.',
      rating: 4,
      project: 'لوحة تحليل البيانات'
    }
  ];

  const filteredPortfolio = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">معرض الأعمال</h1>
              <p className="text-gray-600 mt-1">استعرض مشاريعي وخبراتي التقنية</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                تحميل السيرة الذاتية
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                مشروع جديد
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
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{portfolioItems.length}</div>
                <div className="text-sm text-gray-600">مشروع مكتمل</div>
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
                  {portfolioItems.reduce((sum, item) => sum + item.teamSize, 0)}
                </div>
                <div className="text-sm text-gray-600">عضو فريق</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
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
                <div className="text-2xl font-bold text-gray-900">
                  ${portfolioItems.reduce((sum, item) => sum + parseInt(item.budget.replace('$', '').replace(',', '')), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">إجمالي المشاريع</div>
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
                  placeholder="البحث في المشاريع..."
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
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-gray-100' : ''}
                >
                  <LayoutList className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Skills Section */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">المهارات التقنية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Portfolio Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPortfolio.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <Image className="w-16 h-16 text-gray-400" />
                  </div>
                  {item.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        مميز
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.completedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{item.teamSize} أعضاء</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{item.budget}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={item.demoUrl} target="_blank">
                        <ExternalLink className="w-4 h-4 ml-2" />
                        معاينة
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={item.githubUrl} target="_blank">
                        <Github className="w-4 h-4 ml-2" />
                        GitHub
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6 mb-8">
            {filteredPortfolio.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                      </div>
                      {item.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          مميز
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{item.completedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{item.teamSize} أعضاء</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{item.budget}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={item.demoUrl} target="_blank">
                          <ExternalLink className="w-4 h-4 ml-2" />
                          معاينة
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={item.githubUrl} target="_blank">
                          <Github className="w-4 h-4 ml-2" />
                          GitHub
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Testimonials */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">آراء العملاء</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-gray-500 mt-1">المشروع: {testimonial.project}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
