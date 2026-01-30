'use client';

import React, { useState, useEffect } from 'react';
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
  priority: number;
  category: 'learning' | 'progress' | 'social' | 'goals' | 'recommendations';
}

// Quick stats component
function QuickStats() {
  const { userStats } = useGamification();

  const stats = [
    {
      label: 'الدروس اليوم',
      value: 5,
      change: 2,
      icon: <BookOpen className="w-4 h-4" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'وقت الدراسة',
      value: '2.5h',
      change: 0.5,
      icon: <Clock className="w-4 h-4" />,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      label: 'الإنجازات',
      value: userStats.achievements.length,
      change: 1,
      icon: <Award className="w-4 h-4" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'سلسلة الحضور',
      value: userStats.currentStreak,
      change: 0,
      icon: <Target className="w-4 h-4" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          إحصائيات سريعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label} variant="fadeIn">
              <div className={`${stat.bgColor} rounded-xl p-4 text-center`}>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${stat.bgColor} mb-2`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                {stat.change !== 0 && (
                  <div className={`flex items-center justify-center gap-1 text-xs mt-1 ${
                    stat.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Recent activity component
function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'lesson',
      title: 'أكملت درس React Hooks',
      time: 'منذ 2 ساعة',
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      color: 'bg-green-50',
    },
    {
      id: 2,
      type: 'achievement',
      title: 'حصلت على إنجاز "أسبوع متواصل"',
      time: 'منذ 5 ساعة',
      icon: <Award className="w-4 h-4 text-purple-500" />,
      color: 'bg-purple-50',
    },
    {
      id: 3,
      type: 'course',
      title: 'بدأت دورة Next.js المتقدم',
      time: 'منذ يوم',
      icon: <PlayCircle className="w-4 h-4 text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      id: 4,
      type: 'reminder',
      title: 'تذكير: درس Python غداً الساعة 3 م',
      time: 'منذ يومين',
      icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
      color: 'bg-orange-50',
    },
  ];

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          النشاط الأخير
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <StaggerItem key={activity.id} variant="slideUp">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.title}</div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Upcoming tasks component
function UpcomingTasks() {
  const tasks = [
    {
      id: 1,
      title: 'مراجعة درس JavaScript',
      course: 'أساسيات البرمجة',
      dueDate: 'غداً',
      priority: 'high',
      progress: 75,
    },
    {
      id: 2,
      title: 'اختبار نهائي React',
      course: 'React المتقدم',
      dueDate: 'بعد 3 أيام',
      priority: 'medium',
      progress: 30,
    },
    {
      id: 3,
      title: 'مشروع تطبيقي',
      course: 'Next.js',
      dueDate: 'بعد أسبوع',
      priority: 'low',
      progress: 10,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          المهام القادمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <StaggerItem key={task.id} variant="fadeIn">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.course}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'عاجل' : task.priority === 'medium' ? 'متوسط' : 'منخفض'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{task.dueDate}</span>
                  <span className="text-blue-600 font-medium">{task.progress}%</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Learning recommendations component
function LearningRecommendations() {
  const recommendations = [
    {
      id: 1,
      title: 'TypeScript مع React',
      type: 'دورة',
      reason: 'بناءً على اهتمامك بـ React',
      rating: 4.8,
      duration: '6 ساعات',
      level: 'متوسط',
      image: 'bg-gradient-to-br from-blue-500 to-purple-600',
    },
    {
      id: 2,
      title: 'تصميم واجهات المستخدم',
      type: 'دورة',
      reason: 'مكمل لـ React',
      rating: 4.6,
      duration: '4 ساعات',
      level: 'مبتدئ',
      image: 'bg-gradient-to-br from-pink-500 to-orange-500',
    },
    {
      id: 3,
      title: 'Node.js للواجهات الخلفية',
      type: 'دورة',
      reason: 'للتطوير الكامل',
      rating: 4.7,
      duration: '8 ساعات',
      level: 'متوسط',
      image: 'bg-gradient-to-br from-green-500 to-teal-500',
    },
  ];

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          موصى به لك
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <StaggerItem key={rec.id} variant="slideUp">
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-16 h-16 rounded-xl ${rec.image} flex items-center justify-center`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{rec.title}</div>
                  <div className="text-sm text-gray-500 mb-1">{rec.reason}</div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {rec.rating}
                    </span>
                    <span>{rec.duration}</span>
                    <span>{rec.level}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Study partners component
function StudyPartners() {
  const partners = [
    {
      id: 1,
      name: 'أحمد محمد',
      avatar: 'bg-blue-500',
      status: 'online',
      currentCourse: 'React المتقدم',
      progress: 65,
    },
    {
      id: 2,
      name: 'سارة أحمد',
      avatar: 'bg-purple-500',
      status: 'offline',
      currentCourse: 'Next.js',
      progress: 45,
    },
    {
      id: 3,
      name: 'محمد علي',
      avatar: 'bg-green-500',
      status: 'online',
      currentCourse: 'TypeScript',
      progress: 80,
    },
  ];

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          زملاء الدراسة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {partners.map((partner, index) => (
            <StaggerItem key={partner.id} variant="fadeIn">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full ${partner.avatar} flex items-center justify-center text-white font-bold`}>
                    {partner.name.charAt(0)}
                  </div>
                  {partner.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{partner.name}</div>
                  <div className="text-sm text-gray-500">{partner.currentCourse}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">{partner.progress}%</div>
                  <div className="text-xs text-gray-500">التقدم</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Main personalized dashboard
export function PersonalizedDashboard() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    favoriteSubjects: ['البرمجة', 'التصميم'],
    learningStyle: 'visual',
    studyTimePreference: 'evening',
    difficultyPreference: 'intermediate',
    goals: ['تعلم React', 'بناء مشاريع'],
    widgets: ['stats', 'progress', 'activity', 'tasks', 'recommendations', 'partners'],
    layout: 'comfortable',
  });

  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: 'stats',
      title: 'إحصائيات سريعة',
      icon: <BarChart3 className="w-5 h-5" />,
      component: <QuickStats />,
      size: 'medium',
      priority: 1,
      category: 'progress',
    },
    {
      id: 'progress',
      title: 'التقدم التعليمي',
      icon: <TrendingUp className="w-5 h-5" />,
      component: <ProgressDashboard />,
      size: 'large',
      priority: 2,
      category: 'progress',
    },
    {
      id: 'activity',
      title: 'النشاط الأخير',
      icon: <Clock className="w-5 h-5" />,
      component: <RecentActivity />,
      size: 'medium',
      priority: 3,
      category: 'learning',
    },
    {
      id: 'tasks',
      title: 'المهام القادمة',
      icon: <Calendar className="w-5 h-5" />,
      component: <UpcomingTasks />,
      size: 'medium',
      priority: 4,
      category: 'goals',
    },
    {
      id: 'recommendations',
      title: 'موصى به لك',
      icon: <Star className="w-5 h-5" />,
      component: <LearningRecommendations />,
      size: 'medium',
      priority: 5,
      category: 'recommendations',
    },
    {
      id: 'partners',
      title: 'زملاء الدراسة',
      icon: <Users className="w-5 h-5" />,
      component: <StudyPartners />,
      size: 'medium',
      priority: 6,
      category: 'social',
    },
  ]);

  // Filter widgets based on user preferences
  const activeWidgets = widgets.filter(widget => 
    userPreferences.widgets.includes(widget.id)
  ).sort((a, b) => a.priority - b.priority);

  const getWidgetSize = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-1';
      case 'medium': return 'col-span-1 md:col-span-2';
      case 'large': return 'col-span-1 md:col-span-2 lg:col-span-3';
      case 'full': return 'col-span-1 md:col-span-2 lg:col-span-4';
      default: return 'col-span-1';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600">مرحباً بك! إليك ملخص تقدمك التعليمي</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 ml-2" />
            تخصيص اللوحة
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 ml-2" />
            الإشعارات
          </Button>
        </div>
      </div>

      {/* Widgets Grid */}
      <StaggerContainer staggerDelay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeWidgets.map((widget) => (
            <StaggerItem key={widget.id}>
              <div className={getWidgetSize(widget.size)}>
                {widget.component}
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </div>
  );
}
