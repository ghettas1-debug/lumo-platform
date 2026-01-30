"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Briefcase, 
  Users, 
  Award, 
  Target, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Shield, 
  Heart, 
  Zap, 
  Activity, 
  BarChart3, 
  FileText, 
  Settings, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  RefreshCw, 
  AlertCircle, 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  ChevronUp, 
  ChevronDown, 
  MoreVertical, 
  MoreHorizontal, 
  Menu, 
  X, 
  PlusCircle, 
  MinusCircle, 
  Edit2, 
  Save, 
  Undo, 
  Redo, 
  Copy, 
  Move, 
  Trash, 
  Archive, 
  ArchiveRestore, 
  DownloadCloud, 
  UploadCloud, 
  Share2, 
  ExternalLink,
  FileText as FileTextIcon,
  BarChart3 as BarChart3Icon,
  Activity as ActivityIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  Award as AwardIcon,
  Users as UsersIcon,
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

export default function JobBoardPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'recent' | 'categories'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');

  const jobs = [
    {
      id: '1',
      title: 'مطور واجهات مستخدم متقدم',
      company: 'شركة التقنية المتقدمة',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'full-time',
      category: 'التقنية',
      experience: '5+ سنوات',
      salary: '15,000 - 25,000 ريال',
      description: 'نظر عن مطور واجهات مستخدم متخصص في React و Next.js للانضمام لفريقنا الموهوبين.',
      requirements: [
        'خبرة في React و Next.js',
        'خبرة في TypeScript',
        'خبرة في CSS و Tailwind CSS',
        'خبرة في تصميم واجهات المستخدم',
        'خبرة في تطوير تطبيقات ويب'
      ],
      benefits: [
        'راتب تنافسية',
        'أدوير مهني مستمر',
        'بيئة عمل حديثة',
        'أوقات مرنة',
        'أجهزة حديثة'
      ],
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      featured: true,
      remote: true,
      urgent: false
    },
    {
      id: '2',
      title: 'محلل بيانات مبتدئ',
      company: 'شركة التحليلات الكبرى',
      location: 'جدة، المملكة العربية السعودية',
      type: 'full-time',
      category: 'البيانات',
      experience: '3-5 سنوات',
      salary: '10,000 - 18,000 ريال',
      description: 'نبحث عن محلل بيانات مبتدئ لإدارة وتحليل البيانات الضخمة لشركتنا.',
      requirements: [
        'خبرة في SQL',
        'خبرة في Python أو R',
        'خبرة في تحليل البيانات',
        'خبرة في Power BI أو Tableau',
        'خبرة في إدارة قواعد البيانات'
      ],
      benefits: [
        'راتب تنافسية',
        'تدريب مستمر',
        'مشاركة في مشاريع القرارات',
        'بيئة عمل احترافية',
        'فرصصات عمل مرنة'
      ],
      postedDate: '2024-01-19',
      deadline: '2024-02-19',
      featured: true,
      remote: true,
      urgent: true
    },
    {
      id: '3',
      title: 'مصم محتخصص في الذكاء الاصطناعي',
      company: 'شركة الذكاء الاصطناعي',
      location: 'الدمام، المملكة العربية السعودية',
      type: 'full-time',
      category: 'الذكاء الاصطناعي',
      experience: '7+ سنوات',
      salary: '20,000 - 35,000 ريال',
      description: 'نظر عن مصمم متخصص في الذكاء الاصطناعي لتطوير نماذجج ذكية متقدمة.',
      requirements: [
        'خبرة في Python',
        'خبرة في TensorFlow و PyTorch',
        'خبرة في Scikit-learn',
        'خبرة في OpenCV',
        'خبرة في معالجة الصور والنصوص',
        'خبرة في علوم الحاسوب'
      ],
      benefits: [
        'راتب تنافسية',
        'أبحاث متقدمة',
        'فرصص عمل مبتكرة',
        'مشاركة في أبحاث عالمية',
        'مختبرات عالمية'
      ],
      postedDate: '2024-01-18',
      deadline: '2024-02-18',
      featured: false,
      remote: true,
      urgent: false
    },
    {
      id: '4',
      title: 'مدرب محتخصص في تعليم الرياضيات',
      company: 'منصة Lumo التعليمية',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'full-time',
      category: 'التعليم',
      experience: '3-5 سنوات',
      salary: '12,000 - 20,000 ريال',
      description: 'نظر عن مدرب محتخصص في تعليم الرياضيات لتطوير وتقديم المحتوى التعليمي.',
      requirements: [
        'شهادة في التعليم',
        'خبرة في المناهج التعليمية',
        'خبرة في تطوير المناهج التعليمية',
        'خبرة في إدارة الفصول الدراسية',
        'خبرة في تقييم الطلبة'
      ],
      benefits: [
        'بيئة عمل داعمة',
        'فرصص عمل مرنة',
        'أثر إيجابي',
        'تطوير مهارات',
        'مشاركة في بناء المستقبل'
      ],
      postedDate: '2024-01-17',
      deadline: '2024-02-17',
      featured: false,
      remote: true,
      urgent: false
    },
    {
      id: '5',
      title: 'مطور محتوى رقمي',
      company: 'شركة المحتوى الرقمي',
      location: 'جدة، المملكة العربية السعودية',
      type: 'part-time',
      category: 'الإعلام',
      experience: '2-4 سنوات',
      salary: '8,000 - 15,000 ريال',
      description: 'نظر عن مطور محتوى رقمي مبدعين لإنشاء وتطوير المحتوى الرقمي.',
      requirements: [
        'خبرة في كتابة المحتوى',
        'خبرة في SEO',
        'خبرة في إدارة وسائل التواصل الاجتماعي',
        'خبرة في التصوير الفيديو',
        'خبرة في تحرير الصوت',
        'خبرة في إدارة الحملفات'
      ],
      benefits: [
        'مرونة في المحتوى',
        'عمل مرن',
        'فرصات عمل مرنة',
        'مشاركة في النجاح'
      ],
      postedDate: '2024-01-16',
      deadline: '2024-02-16',
      featured: false,
      remote: true,
      urgent: false
    }
  ];

  const categories = [
    { id: 'all', name: 'الكل الفئات', count: jobs.length },
    { id: 'technology', name: 'التقنية', count: 2 },
    { id: 'data', name: 'البيانات', count: 1 },
    { id: 'ai', name: 'الذكاء الاصطناعي', count: 1 },
    { id: 'education', name: 'التعليم', count: 1 },
    { id: 'media', name: 'الإعلام', count: 1 }
  ];

  const jobTypes = [
    { id: 'all', name: 'كل الأنواعد', count: jobs.length },
    { id: 'full-time', name: 'دوام كامل', count: 4 },
    { id: 'part-time', name: 'دوام جزئي', count: 1 }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesType = selectedJobType === 'all' || job.type === selectedJobType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleApply = (jobId: string) => {
    console.log('Applying for job:', jobId);
  };

  const handleSaveJob = (jobId: string) => {
    console.log('Saving job:', jobId);
  };

  const handleShareJob = (jobId: string) => {
    console.log('Sharing job:', jobId);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Briefcase className="w-16 h-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">لوحة الوظائف</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              اكتشف فرصة العمل المثالي لك في منصة Lumo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Plus className="w-4 h-4 ml-2" />
                نشر وظيفة جديدة
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Upload className="w-4 h-4 ml-2" />
                رفع سيرتك
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
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
                <div className="text-sm text-gray-600">وظيفة شاغرة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {jobs.filter(j => j.featured).length}
                </div>
                <div className="text-sm text-gray-600">وظائف مميزة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {jobs.filter(j => j.urgent).length}
                </div>
                <div className="text-sm text-gray-600">وظائف عاجلة</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {jobs.filter(j => j.remote).length}
                </div>
                <div className="text-sm text-gray-600">وظائف عن بعد</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['all', 'featured', 'recent', 'categories'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'all' && 'الكل الوظائف'}
                {tab === 'featured' && 'الوظائف المميزة'}
                {tab === 'recent' && 'الوظائف الحديثة'}
                {tab === 'categories' && 'الفئات'}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="بحث عن وظيفة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select 
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {jobTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">{job.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {job.category}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      {job.type}
                    </span>
                    {job.remote && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        عن بعد
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-gray-900">{job.salary}</span>
                  <span className="text-gray-600 text-sm">/ شهر</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleSaveJob(job.id)}>
                  <PlusCircle className="w-4 h-4 ml-2" />
                  حفظظ
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShareJob(job.id)}>
                  <Share2 className="w-4 h-4 ml-2" />
                  مشاركة
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleApply(job.id)}>
                  <CheckCircle className="w-4 h-4 ml-2" />
                  التقديم الآن
                </Button>
              </div>
              {job.featured && (
                <div className="mt-4 p-3 bg-blue-50 border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-blue-700">وظيفة مميزة</span>
                  </div>
                </div>
              )}
              {job.urgent && (
                <div className="mt-4 p-3 bg-red-50 border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-700">وظائف عاجلة</span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-lg mb-6">ابحث عن فرصة عمل مناسب لك في منصة Lumo</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Plus className="w-4 h-4 ml-2" />
              نشر وظيفة جديدة
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Upload className="w-4 h-4 ml-2" />
              رفع سيرتك
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
