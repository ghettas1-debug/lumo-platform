'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  Grid3x3,
  List,
  Moon,
  Sun,
  ChevronRight,
  Star,
  Zap,
  Heart,
  Brain,
  Code,
  Palette,
  Music,
  Globe,
  Briefcase,
  Camera,
  Mic,
  FileText,
  Download,
  Share2,
  Bookmark,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';

// Mock theme hook for now
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  return [theme, toggleTheme] as const;
};

// Interfaces
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'ar' | 'en' | 'fr';
  notifications: boolean;
  soundEffects: boolean;
  autoPlay: boolean;
  downloadQuality: 'low' | 'medium' | 'high';
  layout: 'compact' | 'comfortable' | 'spacious';
  widgets: string[];
}

interface LearningAnalytics {
  totalStudyTime: number;
  coursesCompleted: number;
  coursesInProgress: number;
  averageScore: number;
  studyStreak: number;
  weeklyProgress: number;
  subjectProgress: Record<string, number>;
  skillProgress: Record<string, number>;
}

interface DashboardWidget {
  id: string;
  title: string;
  type: 'progress' | 'achievements' | 'calendar' | 'stats' | 'courses' | 'goals';
  position: { x: number; y: number };
  size: { width: number; height: number };
  data?: any;
}

// Personalized Dashboard Component
const PersonalizedDashboard = React.memo(function PersonalizedDashboard({
  userId,
  userPreferences,
  analytics,
  onPreferenceUpdate,
  onWidgetUpdate,
  onLayoutChange,
}: {
  userId: string;
  userPreferences: UserPreferences;
  analytics: LearningAnalytics;
  onPreferenceUpdate?: (preferences: Partial<UserPreferences>) => void;
  onWidgetUpdate?: (widgets: string[]) => void;
  onLayoutChange?: (layout: 'compact' | 'comfortable' | 'spacious') => void;
}) {
  const [theme, toggleTheme] = useTheme();
  
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
  }>>([]);

  // Initialize widgets based on user preferences
  useEffect(() => {
    const defaultWidgets: DashboardWidget[] = [
      {
        id: 'progress',
        title: 'التقدم التعليمي',
        type: 'progress',
        position: { x: 0, y: 0 },
        size: { width: 2, height: 1 }
      },
      {
        id: 'achievements',
        title: 'الإنجازات',
        type: 'achievements',
        position: { x: 2, y: 0 },
        size: { width: 2, height: 1 }
      },
      {
        id: 'stats',
        title: 'الإحصائيات',
        type: 'stats',
        position: { x: 0, y: 1 },
        size: { width: 2, height: 1 }
      },
      {
        id: 'courses',
        title: 'الدورات',
        type: 'courses',
        position: { x: 2, y: 1 },
        size: { width: 2, height: 1 }
      }
    ];

    setWidgets(defaultWidgets);
  }, [userPreferences.widgets]);

  // Filter widgets based on search
  const filteredWidgets = useMemo(() => {
    if (!searchQuery) return widgets;
    
    return widgets.filter(widget =>
      widget.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [widgets, searchQuery]);

  // Render widget based on type
  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'progress':
        return <ProgressWidget analytics={analytics} />;
      case 'achievements':
        return <AchievementsWidget userId={userId} />;
      case 'stats':
        return <StatsWidget analytics={analytics} />;
      case 'courses':
        return <CoursesWidget userId={userId} />;
      default:
        return <div>Widget not found</div>;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme === 'dark' ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-blue-50 via-white to-purple-50'} p-6`}>
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              لوحة التحكم الشخصية
            </h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              مرحباً بك في لوحة التحكم المخصصة لك
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="البحث عن ودجت..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pr-10 pl-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} hover:opacity-80 transition-opacity`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Notifications */}
            <button className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:opacity-80 transition-opacity relative`}>
              <Bell className="w-5 h-5" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {/* Settings */}
            <button className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:opacity-80 transition-opacity`}>
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredWidgets.map((widget) => (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`col-span-${widget.size.width} row-span-${widget.size.height}`}
            >
              <div className={`h-full p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {widget.title}
                </h3>
                {renderWidget(widget)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

// Widget Components
const ProgressWidget: React.FC<{ analytics: LearningAnalytics }> = ({ analytics }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">إجمالي وقت الدراسة</span>
      <span className="text-lg font-semibold">{analytics.totalStudyTime} ساعة</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">الدورات المكتملة</span>
      <span className="text-lg font-semibold">{analytics.coursesCompleted}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">متوسط الدرجة</span>
      <span className="text-lg font-semibold">{analytics.averageScore}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${analytics.weeklyProgress}%` }}
      ></div>
    </div>
  </div>
);

const AchievementsWidget: React.FC<{ userId: string }> = ({ userId }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Trophy className="w-5 h-5 text-yellow-500" />
      <span className="font-semibold">الإنجازات الأخيرة</span>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Award className="w-6 h-6 text-gray-400" />
        </div>
      ))}
    </div>
  </div>
);

const StatsWidget: React.FC<{ analytics: LearningAnalytics }> = ({ analytics }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <BarChart3 className="w-5 h-5 text-blue-500" />
      <span className="font-semibold">الإحصائيات</span>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm">سلسلة الدراسة</span>
        <span className="font-semibold">{analytics.studyStreak} أيام</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm">الدورات النشطة</span>
        <span className="font-semibold">{analytics.coursesInProgress}</span>
      </div>
    </div>
  </div>
);

const CoursesWidget: React.FC<{ userId: string }> = ({ userId }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <BookOpen className="w-5 h-5 text-green-500" />
      <span className="font-semibold">الدورات</span>
    </div>
    <div className="space-y-2">
      {['تطوير الويب', 'الذكاء الاصطناعي', 'تصميم UI/UX'].map((course, i) => (
        <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm">{course}</span>
        </div>
      ))}
    </div>
  </div>
);

export default PersonalizedDashboard;
