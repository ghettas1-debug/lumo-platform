// Advanced Analytics Component
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Users,
  Clock,
  BookOpen,
  Target,
  Award,
  Brain,
  Eye,
  MousePointer,
  Click,
  Calendar,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Settings,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Heart,
  Star,
  Trophy,
  Flame,
  Timer,
  Coffee,
  Moon,
  Sun,
  Wind,
  Cloud
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalCourses: number;
    completionRate: number;
    avgSessionTime: number;
    totalLearningHours: number;
  };
  engagement: {
    dailyActiveUsers: number[];
    weeklyActiveUsers: number[];
    monthlyActiveUsers: number[];
    sessionDuration: number[];
    pageViews: number[];
    bounceRate: number;
  };
  learning: {
    courseProgress: { courseId: string; progress: number; users: number }[];
    skillDevelopment: { skill: string; level: number; trend: 'up' | 'down' | 'stable' }[];
    learningPaths: { pathId: string; completion: number; difficulty: string }[];
    timeSpent: { category: string; hours: number; trend: number }[];
  };
  behavior: {
    clickHeatmap: { x: number; y: number; intensity: number }[];
    scrollDepth: { section: string; depth: number; users: number }[];
    deviceUsage: { device: string; percentage: number; sessions: number }[];
    popularContent: { contentId: string; title: string; views: number; avgTime: number }[];
  };
  performance: {
    pageLoadTime: number;
    serverResponseTime: number;
    errorRate: number;
    uptime: number;
    conversionRate: number;
  };
}

interface TimeRange {
  label: string;
  value: 'day' | 'week' | 'month' | 'year';
  days: number;
}

export function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange['value']>('week');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  const timeRanges: TimeRange[] = [
    { label: 'اليوم', value: 'day', days: 1 },
    { label: 'الأسبوع', value: 'week', days: 7 },
    { label: 'الشهر', value: 'month', days: 30 },
    { label: 'السنة', value: 'year', days: 365 }
  ];

  // Mock data generation
  useEffect(() => {
    const generateMockData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockData: AnalyticsData = {
        overview: {
          totalUsers: 15420,
          activeUsers: 8934,
          totalCourses: 156,
          completionRate: 73.5,
          avgSessionTime: 42.3,
          totalLearningHours: 45678
        },
        engagement: {
          dailyActiveUsers: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
          weeklyActiveUsers: Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000) + 3000),
          monthlyActiveUsers: Array.from({ length: 12 }, () => Math.floor(Math.random() * 15000) + 8000),
          sessionDuration: Array.from({ length: 7 }, () => Math.random() * 60 + 20),
          pageViews: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50000) + 20000),
          bounceRate: 32.4
        },
        learning: {
          courseProgress: [
            { courseId: '1', progress: 85, users: 234 },
            { courseId: '2', progress: 72, users: 189 },
            { courseId: '3', progress: 91, users: 156 },
            { courseId: '4', progress: 68, users: 203 },
            { courseId: '5', progress: 79, users: 145 }
          ],
          skillDevelopment: [
            { skill: 'JavaScript', level: 78, trend: 'up' },
            { skill: 'React', level: 65, trend: 'up' },
            { skill: 'Python', level: 82, trend: 'stable' },
            { skill: 'Data Analysis', level: 71, trend: 'up' },
            { skill: 'Machine Learning', level: 58, trend: 'down' }
          ],
          learningPaths: [
            { pathId: '1', completion: 67, difficulty: 'intermediate' },
            { pathId: '2', completion: 89, difficulty: 'beginner' },
            { pathId: '3', completion: 45, difficulty: 'advanced' },
            { pathId: '4', completion: 78, difficulty: 'intermediate' }
          ],
          timeSpent: [
            { category: 'فيديوهات', hours: 1234, trend: 12.5 },
            { category: 'تمارين', hours: 876, trend: -5.3 },
            { category: 'اختبارات', hours: 432, trend: 8.7 },
            { category: 'مقالات', hours: 234, trend: 15.2 },
            { category: 'مشاريع', hours: 567, trend: 3.4 }
          ]
        },
        behavior: {
          clickHeatmap: Array.from({ length: 100 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            intensity: Math.random()
          })),
          scrollDepth: [
            { section: 'Hero', depth: 95, users: 15420 },
            { section: 'Features', depth: 78, users: 12340 },
            { section: 'Courses', depth: 65, users: 9876 },
            { section: 'Testimonials', depth: 45, users: 6543 },
            { section: 'Footer', depth: 25, users: 3210 }
          ],
          deviceUsage: [
            { device: 'Desktop', percentage: 58.3, sessions: 8234 },
            { device: 'Mobile', percentage: 32.7, sessions: 4621 },
            { device: 'Tablet', percentage: 9.0, sessions: 1265 }
          ],
          popularContent: [
            { contentId: '1', title: 'مقدمة في JavaScript', views: 15420, avgTime: 23.5 },
            { contentId: '2', title: 'React للمبتدئين', views: 12340, avgTime: 31.2 },
            { contentId: '3', title: 'أساسيات Python', views: 9876, avgTime: 28.7 },
            { contentId: '4', title: 'تحليل البيانات', views: 8765, avgTime: 45.3 },
            { contentId: '5', title: 'الذكاء الاصطناعي', views: 7654, avgTime: 52.1 }
          ]
        },
        performance: {
          pageLoadTime: 2.3,
          serverResponseTime: 0.8,
          errorRate: 0.12,
          uptime: 99.97,
          conversionRate: 4.7
        }
      };

      setAnalyticsData(mockData);
      setIsLoading(false);
    };

    generateMockData();
  }, [timeRange]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Refresh data
      const generateMockData = async () => {
        const mockData: AnalyticsData = {
          // ... same mock data structure
        };
        setAnalyticsData(mockData);
      };
      generateMockData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours} س ${mins} د` : `${mins} د`;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-green-600" />;
      case 'down': return <TrendingDown size={16} className="text-red-600" />;
      case 'stable': return <Activity size={16} className="text-gray-600" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Desktop': return <Monitor size={16} />;
      case 'Mobile': return <Smartphone size={16} />;
      case 'Tablet': return <Tablet size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'overview': return <BarChart3 size={20} />;
      case 'engagement': return <Users size={20} />;
      case 'learning': return <BookOpen size={20} />;
      case 'behavior': return <MousePointer size={20} />;
      case 'performance': return <Zap size={20} />;
      default: return <BarChart3 size={20} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">التحليلات المتقدمة</h1>
                <p className="text-gray-600">رؤى شاملة حول أداء المنصة</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      timeRange === range.value
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  compareMode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                مقارنة
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Users size={20} className="text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">+12.5%</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {formatNumber(analyticsData.overview.totalUsers)}
              </div>
              <div className="text-sm text-blue-700">إجمالي المستخدمين</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Activity size={20} className="text-green-600" />
                <span className="text-xs text-green-600 font-medium">+8.3%</span>
              </div>
              <div className="text-2xl font-bold text-green-900">
                {formatNumber(analyticsData.overview.activeUsers)}
              </div>
              <div className="text-sm text-green-700">المستخدمون النشطون</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <BookOpen size={20} className="text-purple-600" />
                <span className="text-xs text-purple-600 font-medium">+5.2%</span>
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {analyticsData.overview.totalCourses}
              </div>
              <div className="text-sm text-purple-700">إجمالي الدورات</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Target size={20} className="text-orange-600" />
                <span className="text-xs text-orange-600 font-medium">+3.7%</span>
              </div>
              <div className="text-2xl font-bold text-orange-900">
                {formatPercentage(analyticsData.overview.completionRate)}
              </div>
              <div className="text-sm text-orange-700">معدل الإنجاز</div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock size={20} className="text-pink-600" />
                <span className="text-xs text-pink-600 font-medium">+15.2%</span>
              </div>
              <div className="text-2xl font-bold text-pink-900">
                {formatDuration(analyticsData.overview.avgSessionTime)}
              </div>
              <div className="text-sm text-pink-700">متوسط الجلسة</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Timer size={20} className="text-indigo-600" />
                <span className="text-xs text-indigo-600 font-medium">+22.8%</span>
              </div>
              <div className="text-2xl font-bold text-indigo-900">
                {formatNumber(analyticsData.overview.totalLearningHours)}
              </div>
              <div className="text-sm text-indigo-700">ساعات التعلم</div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {['overview', 'engagement', 'learning', 'behavior', 'performance'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedMetric === metric
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getMetricIcon(metric)}
                  {metric === 'overview' && 'نظرة عامة'}
                  {metric === 'engagement' && 'التفاعل'}
                  {metric === 'learning' && 'التعلم'}
                  {metric === 'behavior' && 'السلوك'}
                  {metric === 'performance' && 'الأداء'}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Download size={18} />
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {/* Metric Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMetric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {selectedMetric === 'engagement' && (
                <div className="space-y-6">
                  {/* Engagement Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">المستخدمون النشطون يومياً</h3>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {analyticsData.engagement.dailyActiveUsers.slice(-7).map((value, index) => (
                          <div
                            key={index}
                            className="flex-1 bg-blue-600 rounded-t-lg transition-all hover:bg-blue-700"
                            style={{ height: `${(value / 1500) * 100}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>الأحد</span>
                        <span>السبت</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">معدل الارتداد</h3>
                      <div className="flex items-center justify-center h-64">
                        <div className="relative">
                          <div className="w-48 h-48 rounded-full border-8 border-gray-200"></div>
                          <div className="absolute inset-0 w-48 h-48 rounded-full border-8 border-red-500 border-t-transparent border-r-transparent transform rotate-45"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-gray-900">
                                {formatPercentage(analyticsData.engagement.bounceRate)}
                              </div>
                              <div className="text-sm text-gray-600">معدل الارتداد</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Device Usage */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">استخدام الأجهزة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {analyticsData.behavior.deviceUsage.map((device) => (
                        <div key={device.device} className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(device.device)}
                              <span className="font-medium">{device.device}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {formatPercentage(device.percentage)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${device.percentage}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            {formatNumber(device.sessions)} جلسة
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedMetric === 'learning' && (
                <div className="space-y-6">
                  {/* Course Progress */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">تقدم الدورات</h3>
                    <div className="space-y-4">
                      {analyticsData.learning.courseProgress.map((course) => (
                        <div key={course.courseId} className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">دورة {course.courseId}</span>
                            <span className="text-sm text-gray-600">
                              {formatNumber(course.users)} مستخدم
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-600 h-3 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {formatPercentage(course.progress)} مكتمل
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skill Development */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">تطور المهارات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {analyticsData.learning.skillDevelopment.map((skill) => (
                        <div key={skill.skill} className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">{skill.skill}</span>
                            {getTrendIcon(skill.trend)}
                          </div>
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            {skill.level}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Spent by Category */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">الوقت المستخدم حسب الفئة</h3>
                    <div className="space-y-3">
                      {analyticsData.learning.timeSpent.map((category) => (
                        <div key={category.category} className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">{category.category}</span>
                              <div className="text-sm text-gray-600">
                                {formatNumber(category.hours)} ساعة
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(category.trend > 0 ? 'up' : category.trend < 0 ? 'down' : 'stable')}
                              <span className={`text-sm font-medium ${
                                category.trend > 0 ? 'text-green-600' : 
                                category.trend < 0 ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {category.trend > 0 ? '+' : ''}{category.trend.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedMetric === 'behavior' && (
                <div className="space-y-6">
                  {/* Popular Content */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">المحتوى الأكثر شعبية</h3>
                    <div className="space-y-3">
                      {analyticsData.behavior.popularContent.map((content, index) => (
                        <div key={content.contentId} className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{content.title}</p>
                                <p className="text-sm text-gray-600">
                                  {formatNumber(content.views)} مشاهدة
                                </p>
                              </div>
                            </div>
                            <div className="text-left">
                              <p className="text-sm text-gray-600">متوسط الوقت</p>
                              <p className="font-medium">{formatDuration(content.avgTime)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll Depth */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">عمق التمرير</h3>
                    <div className="space-y-3">
                      {analyticsData.behavior.scrollDepth.map((section) => (
                        <div key={section.section} className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{section.section}</span>
                            <span className="text-sm text-gray-600">
                              {formatNumber(section.users)} مستخدم
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-purple-600 h-3 rounded-full transition-all"
                              style={{ width: `${section.depth}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {formatPercentage(section.depth)} وصلوا لهذا العمق
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedMetric === 'performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">وقت تحميل الصفحة</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {analyticsData.performance.pageLoadTime}s
                      </div>
                      <div className="text-sm text-gray-600">متوسط وقت التحميل</div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">وقت استجابة الخادم</h3>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {analyticsData.performance.serverResponseTime}s
                      </div>
                      <div className="text-sm text-gray-600">متوسط وقت الاستجابة</div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">معدل الخطأ</h3>
                      <div className="text-3xl font-bold text-red-600 mb-2">
                        {formatPercentage(analyticsData.performance.errorRate)}
                      </div>
                      <div className="text-sm text-gray-600">نسبة الأخطاء</div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">وقت التشغيل</h3>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatPercentage(analyticsData.performance.uptime)}
                      </div>
                      <div className="text-sm text-gray-600">متاحية الخادم</div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">معدل التحويل</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {formatPercentage(analyticsData.performance.conversionRate)}
                      </div>
                      <div className="text-sm text-gray-600">التسجيلات</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4">إعدادات التحليلات</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">التحديث التلقائي</p>
                    <p className="text-sm text-gray-600">تحديث البيانات كل 30 ثانية</p>
                  </div>
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      autoRefresh ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      autoRefresh ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">وضع المقارنة</p>
                    <p className="text-sm text-gray-600">مقارنة مع الفترة السابقة</p>
                  </div>
                  <button
                    onClick={() => setCompareMode(!compareMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      compareMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      compareMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Analytics Hook
export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  const trackEvent = (eventName: string, properties?: any) => {
    // Track analytics event
    console.log('Analytics Event:', eventName, properties);
  };

  const trackPageView = (page: string) => {
    // Track page view
    console.log('Page View:', page);
  };

  const trackUserAction = (action: string, details?: any) => {
    // Track user action
    console.log('User Action:', action, details);
  };

  return { data, loading, trackEvent, trackPageView, trackUserAction };
}
