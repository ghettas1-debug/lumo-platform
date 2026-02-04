'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  Calendar,
  BarChart3,
  Users,
  Star,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from 'lucide-react';
import { useGamification } from '@/components/providers/GamificationProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimatedWrapper, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { ProgressDashboard, LevelProgress, StudyStreak, StudyTime } from '@/components/progress/ProgressTracking';

// User preferences interface
interface UserPreferences {
  favoriteSubjects: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  studyTimePreference: 'morning' | 'afternoon' | 'evening' | 'night';
  difficultyPreference: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  widgets: string[];
  layout: 'compact' | 'comfortable' | 'spacious';
}

// Dashboard widget interface
interface DashboardWidget {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  size: 'small' | 'medium' | 'large' | 'full';
  position: { x: number; y: number };
  minimized?: boolean;
}

// Learning analytics interface
interface LearningAnalytics {
  totalStudyTime: number;
  coursesCompleted: number;
  coursesInProgress: number;
  averageScore: number;
  studyStreak: number;
  weeklyProgress: number;
  subjectProgress: Record<string, number>;
  skillProgress: Record<string, number>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: Date;
    progress: number;
  }>;
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
  const { theme, toggleTheme } = useTheme();
  const { level, points, badges, achievements } = useGamification();
  
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
  const [showSettings, setShowSettings] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Memoized filtered widgets based on search
  const filteredWidgets = useMemo(() => {
    return widgets.filter(widget =>
      widget.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [widgets, searchQuery]);

  // Memoized recommended courses based on preferences
  const recommendedCourses = useMemo(() => {
    // This would typically come from an API call
    return userPreferences.favoriteSubjects.map(subject => ({
      id: subject,
      title: `${subject} Course`,
      description: `Learn ${subject} with our comprehensive course`,
      progress: Math.random() * 100,
      difficulty: userPreferences.difficultyPreference,
      estimatedTime: Math.floor(Math.random() * 40) + 10,
      rating: Math.floor(Math.random() * 2) + 3,
      enrolled: Math.random() > 0.5,
    }));
  }, [userPreferences.favoriteSubjects, userPreferences.difficultyPreference]);

  // Memoized study time analytics
  const studyTimeAnalytics = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return {
      today: analytics.totalStudyTime,
      thisWeek: analytics.weeklyProgress,
      average: analytics.totalStudyTime / 7,
      bySubject: analytics.subjectProgress,
      bySkill: analytics.skillProgress,
      trend: analytics.weeklyProgress > 50 ? 'up' : 'down',
    };
  }, [analytics]);

  // Memoized learning insights
  const learningInsights = useMemo(() => {
    const insights = [];
    
    // Study streak insight
    if (analytics.studyStreak >= 7) {
      insights.push({
        type: 'achievement',
        title: 'دراسة متواصلة!',
        message: `لقد حافظت على دراستك لمدة ${analytics.studyStreak} أيام متتالية`,
        icon: '🔥',
        color: 'green',
      });
    }
    
    // Progress insight
    if (analytics.weeklyProgress > 80) {
      insights.push({
        type: 'success',
        title: 'تقدم ممتاز!',
        message: 'أنت تقدم بشكل ممتاز هذا الأسبوع',
        icon: '📈',
        color: 'blue',
      });
    }
    
    // Course completion insight
    if (analytics.coursesCompleted > 0) {
      insights.push({
        type: 'info',
        title: 'إنجازات رائعة',
        message: `لقد أكملت ${analytics.coursesCompleted} دورة حتى الآن`,
        icon: '🎉',
        color: 'purple',
      });
    }
    
    return insights;
  }, [analytics]);

  // Memoized greeting based on time
  const greeting = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  }, [currentTime]);

  // Memoized layout classes
  const layoutClasses = useMemo(() => {
    switch (userPreferences.layout) {
      case 'compact':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      case 'spacious':
        return 'grid-cols-1 md:grid-cols-2 gap-8';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  }, [userPreferences.layout]);

  // Memoized widget size classes
  const getWidgetSizeClass = useCallback((size: 'small' | 'medium' | 'large' | 'full') => {
    switch (size) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-1 md:col-span-2';
      case 'large':
        return 'col-span-1 md:col-span-2 lg:col-span-3';
      case 'full':
        return 'col-span-1 md:col-span-2 lg:col-span-3';
      default:
        return 'col-span-1';
    }
  }, []);

  // Memoized widget components
  const getWidgetComponent = useCallback((widgetId: string) => {
    switch (widgetId) {
      case 'progress':
        return (
          <ProgressDashboard
            analytics={analytics}
            preferences={userPreferences}
          />
        );
      case 'streak':
        return (
          <StudyStreak
            streak={analytics.studyStreak}
            preferences={userPreferences}
          />
        );
      case 'time':
        return (
          <StudyTime
            analytics={studyTimeAnalytics}
            preferences={userPreferences}
          />
        );
      case 'level':
        return (
          <LevelProgress
            level={level}
            points={points}
            preferences={userPreferences}
          />
        );
      case 'achievements':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                الإنجازات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.slice(0, 6).map((achievement) => (
                  <div
                    key={achievement.id}
                    className="text-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <div className="text-sm font-medium">{achievement.title}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'courses':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                الدورات الموصى
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">قيد التقدم</span>
                  <span className="text-sm font-medium">{analytics.coursesInProgress}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">مكتمل</span>
                  <span className="text-sm font-medium">{analytics.coursesCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">متوسط الدرجة</span>
                  <span className="text-sm font-medium">{analytics.averageScore.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'schedule':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                جدول الدراسة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>الوقت المفضل: {userPreferences.studyTimePreference}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span>الأسلوب: {userPreferences.learningStyle}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                  <span>المستوى: {userPreferences.difficultyPreference}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  }, []);

  // Handle widget reordering
  const handleWidgetReorder = useCallback((draggedId: string, targetId: string) => {
    setWidgets(prev => {
      const draggedIndex = prev.findIndex(w => w.id === draggedId);
      const targetIndex = prev.findIndex(w => w.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newWidgets = [...prev];
      const [draggedWidget] = newWidgets.splice(draggedIndex, 1)[0];
      newWidgets.splice(targetIndex, 0, draggedWidget);
      
      return newWidgets;
    });
  }, []);

  // Handle widget minimization
  const handleWidgetMinimize = useCallback((widgetId: string) => {
    setWidgets(prev =>
      prev.map(widget =>
        widget.id === widgetId
          ? { ...widget, minimized: !widget.minimized }
          : widget
      )
    );
  }, []);

  // Handle widget removal
  const handleWidgetRemove = useCallback((widgetId: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
    onWidgetUpdate?.( prev.filter(w => w.id !== widgetId).map(w => w.id) );
  }, [onWidgetUpdate]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle settings toggle
  const handleSettingsToggle = useCallback(() => {
    setShowSettings(!showSettings);
  }, [showSettings]);

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Initialize widgets based on preferences
  useEffect(() => {
    const defaultWidgets: DashboardWidget[] = [
      {
        id: 'progress',
        title: 'التقدم',
        icon: <TrendingUp className="w-5 h-5" />,
        component: getWidgetComponent('progress'),
        size: 'large',
        position: { x: 0, y: 0 },
      },
      {
        id: 'streak',
        title: 'سلسلة الدراسة',
        icon: <CheckCircle className="w-5 h-5" />,
        component: getWidgetComponent('streak'),
        size: 'medium',
        position: { x: 1, y: 0 },
      },
      {
        id: 'time',
        title: 'وقت الدراسة',
        icon: <Clock className="w-5 h-5" />,
        component: getWidgetComponent('time'),
        size: 'medium',
        position: { x: 2, y: 0 },
      },
      {
        id: 'level',
        title: 'المستوى',
        icon: <Star className="w-5 h-5" />,
        component: getWidgetComponent('level'),
        size: 'small',
        position: { x: 0, y: 1 },
      },
      {
        id: 'achievements',
        title: 'الإنجازات',
        icon: <Award className="w-5 h-5" />,
        component: getWidgetComponent('achievements'),
        size: 'large',
        position: { x: 1, y: 1 },
      },
      {
        id: 'courses',
        title: 'الدورات',
        icon: <BookOpen className="w-5 h-5" />,
        component: getWidgetComponent('courses'),
        size: 'medium',
        position: { x: 2, y: 1 },
      },
      {
        id: 'schedule',
        title: 'الجدول',
        icon: <Calendar className="w-5 h-5" />,
        component: getWidgetComponent('schedule'),
        size: 'small',
        position: { x: 0, y: 2 },
      },
    ];

    // Filter widgets based on user preferences
    const filteredDefaultWidgets = defaultWidgets.filter(widget =>
      userPreferences.widgets.includes(widget.id)
    );

    setWidgets(filteredDefaultWidgets);
  }, [userPreferences.widgets, getWidgetComponent]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {greeting}، {userId}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              مستوى {level} • {points} نقطة
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في لوحة التحكم..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Notifications */}
            <Button
              variant="outline"
              size="sm"
              className="relative"
            >
              <Bell className="w-4 h-4" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Button>
            
            {/* Settings */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSettingsToggle}
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleThemeToggle}
            >
              {theme === 'light' ? '🌙' : '🌙'}
            </Button>
          </div>
        </div>

        {/* Learning Insights */}
        {learningInsights.length > 0 && (
          <div className="mb-6">
            <StaggerContainer>
              {learningInsights.map((insight, index) => (
                <StaggerItem key={index} delay={index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      insight.type === 'achievement'
                        ? 'bg-green-100 border-green-300'
                        : insight.type === 'success'
                        ? 'bg-blue-100 border-blue-300'
                        : insight.type === 'info'
                        ? 'bg-purple-100 border-purple-300'
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{insight.icon}</span>
                      <div>
                        <h3 className="font-semibold">{insight.title}</h3>
                        <p className="text-sm text-gray-600">{insight.message}</p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Recommended Courses */}
        {recommendedCourses.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              الدورات الموصى لك
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">{course.difficulty}</span>
                        <span className="text-sm text-gray-500">{course.estimatedTime} ساعة</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{course.rating}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <Button
                        variant={course.enrolled ? 'outline' : 'default'}
                        className="w-full"
                      >
                        {course.enrolled ? 'متابعة الدراسة' : 'التسجيل'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Widgets */}
      <div className={`grid ${layoutClasses}`}>
        {filteredWidgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            layout={widget.minimized ? 'position: absolute' : 'position: relative'}
            className={`${getWidgetSizeClass(widget.size)} ${widget.minimized ? 'h-20' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full">
              {!widget.minimized && (
                <>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {widget.icon}
                      {widget.title}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWidgetMinimize(widget.id)}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWidgetRemove(widget.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {widget.component}
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">إعدادات لوحة التحكم</h2>
            
            {/* Layout Settings */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">التخطوط</h3>
              <div className="space-y-2">
                {['compact', 'comfortable', 'spacious'].map(layout => (
                  <button
                    key={layout}
                    onClick={() => onLayoutChange?.( layout as any )}
                    className={`w-full text-left px-3 py-2 rounded ${
                      userPreferences.layout === layout
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {layout === 'compact' && 'مضغوط'}
                    {layout === 'comfortable' && 'مريح'}
                    {layout === 'spacious' && 'واسع'}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget Settings */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">الأدوات</h3>
              <div className="space-y-2">
                {[
                  'progress',
                  'streak',
                  'time',
                  'level',
                  'achievements',
                  'courses',
                  'schedule'
                ].map(widgetId => (
                  <label key={widgetId} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={userPreferences.widgets.includes(widgetId)}
                      onChange={(e) => {
                        const newWidgets = e.target.checked
                          ? [...userPreferences.widgets, widgetId]
                          : userPreferences.widgets.filter(id => id !== widgetId);
                        onPreferenceUpdate?.({ widgets: newWidgets });
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">
                      {widgetId === 'progress' && 'التقدم'}
                      {widgetId === 'streak' && 'سلسلة الدراسة'}
                      {widgetId === 'time' && 'وقت الدراسة'}
                      {widgetId === 'level' && 'المستوى'}
                      {widgetId === 'achievements' && 'الإنجازات'}
                      {widgetId === 'courses' && 'الدورات'}
                      {widgetId === 'schedule' && 'الجدول'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Learning Style */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">أسلوب التعلم</h3>
              <div className="space-y-2">
                {[
                  'visual',
                  'auditory',
                  'kinesthetic',
                  'reading'
                ].map(style => (
                  <button
                    key={style}
                    onClick={() => onPreferenceUpdate?.({ learningStyle: style as any })}
                    className={`w-full text-left px-3 py-2 rounded ${
                      userPreferences.learningStyle === style
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {style === 'visual' && 'بصري'}
                    {style === 'auditory' && 'سمعي'}
                    {style === 'kinesthetic' && 'حركي'}
                    {style === 'reading' && 'قراءة'}
                  </button>
                ))}
              </div>
            </div>

            {/* Study Time Preference */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">وقت الدراسة المفضل</h3>
              <div className="space-y-2">
                {[
                  'morning',
                  'afternoon',
                  'evening',
                  'night'
                ].map(time => (
                  <button
                    key={time}
                    onClick={() => onPreferenceUpdate?.({ studyTimePreference: time as any })}
                    className={`w-full text-left px-3 py-2 rounded ${
                      userPreferences.studyTimePreference === time
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {time === 'morning' && 'الصباح'}
                    {time === 'afternoon' && 'بعد الظهر'}
                    {time === 'evening' && 'المساء'}
                    {time === 'night' && 'المساء'}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Preference */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">مستوى الصعوبة</h3>
              <div className="space-y-2">
                {[
                  'beginner',
                  'intermediate',
                  'advanced'
                ].map(level => (
                  <button
                    key={level}
                    onClick={() => onPreferenceUpdate?.({ difficultyPreference: level as any })}
                    className={`w-full text-left px-3 py-2 rounded ${
                      userPreferences.difficultyPreference === level
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {level === 'beginner' && 'مبتدئ'}
                    {level === 'intermediate' && 'متوسط'}
                    {level === 'advanced' && 'متقدم'}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSettingsToggle}
              variant="outline"
              className="w-full"
            >
              إغلاق
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
});

PersonalizedDashboard.displayName = 'PersonalizedDashboard';
