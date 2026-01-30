"use client";

import { useState, useEffect } from 'react';
import { 
  Trophy, Target, Flame, Clock, BookOpen, Award, 
  Star, TrendingUp, Calendar, CheckCircle, 
  Circle, Lock, Zap, Medal, Crown
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ProgressTrackerProps {
  userId?: string;
  courseId?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'course' | 'time' | 'streak' | 'social';
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface LearningStreak {
  current: number;
  longest: number;
  lastActiveDate: string;
}

interface CourseProgress {
  courseId: string;
  courseName: string;
  totalLessons: number;
  completedLessons: number;
  totalTime: number; // in minutes
  averageScore: number;
  lastAccessed: string;
  progress: number;
}

export default function ProgressTracker({ userId, courseId }: ProgressTrackerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'streaks' | 'courses'>('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | 'month' | 'year' | 'all'>('month');

  // Mock data - in real app, this would come from API
  const [learningStreak, setLearningStreak] = useState<LearningStreak>({
    current: 15,
    longest: 45,
    lastActiveDate: new Date().toISOString()
  });

  const [totalStats, setTotalStats] = useState({
    totalCoursesEnrolled: 12,
    totalCoursesCompleted: 8,
    totalLearningTime: 1560, // hours
    totalAchievements: 24,
    totalPoints: 2450,
    averageCompletionRate: 85
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'بداية المشوار',
      description: 'أكمل أول درس لك',
      icon: '🎯',
      category: 'course',
      points: 10,
      unlocked: true,
      unlockedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'المتعلم النشط',
      description: 'درست لمدة 10 ساعات',
      icon: '⏰',
      category: 'time',
      points: 25,
      unlocked: true,
      unlockedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'المتواصل دائماً',
      description: 'سلسلة دراسة لمدة 7 أيام',
      icon: '🔥',
      category: 'streak',
      points: 50,
      unlocked: true,
      unlockedAt: '2024-02-01'
    },
    {
      id: '4',
      title: 'خبير البرمجة',
      description: 'أكملت 5 دورات برمجة',
      icon: '💻',
      category: 'course',
      points: 100,
      unlocked: true,
      unlockedAt: '2024-02-15'
    },
    {
      id: '5',
      title: 'المتعلم الملتزم',
      description: 'درست لمدة 100 ساعة',
      icon: '📚',
      category: 'time',
      points: 75,
      unlocked: false,
      progress: 65,
      maxProgress: 100
    },
    {
      id: '6',
      title: 'أسطورة التعلم',
      description: 'سلسلة دراسة لمدة 30 يوم',
      icon: '👑',
      category: 'streak',
      points: 200,
      unlocked: false,
      progress: 15,
      maxProgress: 30
    },
    {
      id: '7',
      title: 'محتوى غير محدود',
      description: 'أكملت 10 دورات',
      icon: '🌟',
      category: 'course',
      points: 150,
      unlocked: false,
      progress: 8,
      maxProgress: 10
    },
    {
      id: '8',
      title: 'المساعد الاجتماعي',
      description: 'ساعد 10 طلاب',
      icon: '🤝',
      category: 'social',
      points: 100,
      unlocked: false,
      progress: 3,
      maxProgress: 10
    }
  ]);

  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([
    {
      courseId: '1',
      courseName: 'احتراف React.js',
      totalLessons: 45,
      completedLessons: 38,
      totalTime: 1240,
      averageScore: 92,
      lastAccessed: '2024-03-10',
      progress: 84
    },
    {
      courseId: '2',
      courseName: 'تحليل البيانات مع Python',
      totalLessons: 32,
      completedLessons: 28,
      totalTime: 890,
      averageScore: 88,
      lastAccessed: '2024-03-08',
      progress: 88
    },
    {
      courseId: '3',
      courseName: 'تصميم واجهات المستخدم',
      totalLessons: 28,
      completedLessons: 15,
      totalTime: 450,
      averageScore: 85,
      lastAccessed: '2024-03-05',
      progress: 54
    }
  ]);

  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: 'الأحد', hours: 2.5, lessons: 3 },
    { day: 'الإثنين', hours: 1.8, lessons: 2 },
    { day: 'الثلاثاء', hours: 3.2, lessons: 4 },
    { day: 'الأربعاء', hours: 2.1, lessons: 3 },
    { day: 'الخميس', hours: 1.5, lessons: 2 },
    { day: 'الجمعة', hours: 4.0, lessons: 5 },
    { day: 'السبت', hours: 0.8, lessons: 1 }
  ]);

  const [monthlyProgress, setMonthlyProgress] = useState([
    { month: 'يناير', coursesCompleted: 2, hoursStudied: 45 },
    { month: 'فبراير', coursesCompleted: 3, hoursStudied: 62 },
    { month: 'مارس', coursesCompleted: 1, hoursStudied: 38 }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'course': return <BookOpen size={20} />;
      case 'time': return <Clock size={20} />;
      case 'streak': return <Flame size={20} />;
      case 'social': return <Trophy size={20} />;
      default: return <Star size={20} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'course': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'time': return 'text-green-500 bg-green-50 border-green-200';
      case 'streak': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'social': return 'text-purple-500 bg-purple-50 border-purple-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getStreakLevel = (days: number) => {
    if (days >= 100) return { level: 'أسطورة', color: 'text-purple-600', icon: Crown };
    if (days >= 50) return { level: 'خبير', color: 'text-orange-600', icon: Medal };
    if (days >= 30) return { level: 'محترف', color: 'text-blue-600', icon: Award };
    if (days >= 14) return { level: 'نشط', color: 'text-green-600', icon: Zap };
    if (days >= 7) return { level: 'مبتدئ', color: 'text-yellow-600', icon: Star };
    return { level: 'جديد', color: 'text-gray-600', icon: Circle };
  };

  const streakLevel = getStreakLevel(learningStreak.current);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">التقدم والإنجازات</h1>
          <p className="text-gray-600">تتبع رحلتك التعليمية واحتفل بإنجازاتك</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="text-blue-600" size={24} />
              <span className="text-2xl font-bold text-gray-900">{totalStats.totalCoursesEnrolled}</span>
            </div>
            <h3 className="text-gray-600 text-sm">دورات مسجلة</h3>
            <div className="mt-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-gray-600">{totalStats.totalCoursesCompleted} مكتملة</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="text-green-600" size={24} />
              <span className="text-2xl font-bold text-gray-900">{totalStats.totalLearningTime}</span>
            </div>
            <h3 className="text-gray-600 text-sm">ساعة دراسة</h3>
            <div className="mt-2">
              <div className="text-sm text-gray-600">
                متوسط {Math.round(totalStats.totalLearningTime / totalStats.totalCoursesEnrolled)} ساعة للدورة
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="text-yellow-600" size={24} />
              <span className="text-2xl font-bold text-gray-900">{totalStats.totalAchievements}</span>
            </div>
            <h3 className="text-gray-600 text-sm">إنجاز</h3>
            <div className="mt-2">
              <div className="text-sm text-gray-600">
                {totalStats.totalPoints} نقطة
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Flame className="text-orange-600" size={24} />
              <span className="text-2xl font-bold text-gray-900">{learningStreak.current}</span>
            </div>
            <h3 className="text-gray-600 text-sm">يوم متتالي</h3>
            <div className="mt-2">
              <div className="flex items-center gap-2 text-sm">
                <streakLevel.icon className={streakLevel.color} size={16} />
                <span className="text-gray-600">{streakLevel.level}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'achievements'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الإنجازات
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'courses'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              تقدم الدورات
            </button>
            <button
              onClick={() => setActiveTab('streaks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'streaks'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              السلاسل
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Weekly Activity */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">النشاط الأسبوعي</h3>
                <div className="space-y-3">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {day.day.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{day.day}</p>
                          <p className="text-sm text-gray-500">{day.lessons} درس</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{day.hours} ساعة</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((day.hours / 4) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Monthly Progress */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">التقدم الشهري</h3>
                <div className="space-y-4">
                  {monthlyProgress.map((month, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{month.month}</h4>
                        <span className="text-sm text-gray-500">{month.hoursStudied} ساعة</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{month.coursesCompleted} دورة مكتملة</span>
                        <TrendingUp size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Achievements */}
              <Card className="p-6 lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-4">أحدث الإنجازات</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.filter(a => a.unlocked).slice(0, 6).map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                        getCategoryColor(achievement.category)
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">+{achievement.points} نقطة</span>
                        <span className="text-xs text-gray-500">{achievement.unlockedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              {/* Achievement Categories */}
              <div className="flex gap-4 mb-6">
                {['all', 'course', 'time', 'streak', 'social'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedTimeRange('all')} // Simplified for demo
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      category === 'all' 
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {category === 'all' && 'الكل'}
                    {category === 'course' && 'الدورات'}
                    {category === 'time' && 'الوقت'}
                    {category === 'streak' && 'السلاسل'}
                    {category === 'social' && 'الاجتماعي'}
                  </button>
                ))}
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`border rounded-lg p-6 transition-all ${
                      achievement.unlocked 
                        ? 'border-gray-200 hover:shadow-lg' 
                        : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                        achievement.unlocked 
                          ? getCategoryColor(achievement.category)
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        
                        {achievement.unlocked ? (
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-green-600">
                              +{achievement.points} نقطة
                            </span>
                            <span className="text-xs text-gray-500">
                              {achievement.unlockedAt}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-600">
                                +{achievement.points} نقطة
                              </span>
                              <span className="text-sm text-gray-500">
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                            </div>
                            {achievement.progress !== undefined && achievement.maxProgress && (
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courseProgress.map((course) => (
                  <Card key={course.courseId} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{course.courseName}</h3>
                        <p className="text-sm text-gray-600">
                          {course.completedLessons} من {course.totalLessons} درس
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{course.progress}%</div>
                        <div className="text-sm text-gray-600">مكتمل</div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">الوقت الكلي</p>
                        <p className="font-medium text-gray-900">{Math.round(course.totalTime / 60)} ساعة</p>
                      </div>
                      <div>
                        <p className="text-gray-600">متوسط التقييم</p>
                        <p className="font-medium text-gray-900">{course.averageScore}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">آخر وصول</p>
                        <p className="font-medium text-gray-900">{course.lastAccessed}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">الحالة</p>
                        <p className="font-medium text-green-600">
                          {course.progress === 100 ? 'مكتملة' : 'قيد التقدم'}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'streaks' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Current Streak */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">السلسلة الحالية</h3>
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 ${streakLevel.color} bg-opacity-10`}>
                    <streakLevel.icon size={48} className={streakLevel.color} />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">{learningStreak.current} يوم</h4>
                  <p className="text-gray-600 mb-6">{streakLevel.level}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">أطول سلسلة:</span>
                      <span className="font-medium text-gray-900">{learningStreak.longest} يوم</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">آخر نشاط:</span>
                      <span className="font-medium text-gray-900">اليوم</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Streak Calendar */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">تقويم النشاط</h3>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['أ', 'ث', 'أ', 'خ', 'ج', 'س', 'ح'].map((day, index) => (
                    <div key={index} className="font-medium text-gray-600">{day}</div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const isActive = i < learningStreak.current;
                    return (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
                          isActive 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Streak Milestones */}
              <Card className="p-6 lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-4">معالم السلاسل</h3>
                <div className="space-y-4">
                  {[
                    { days: 7, title: 'أسبوع واحد', reward: '50 نقطة', icon: '🏃' },
                    { days: 14, title: 'أسبوعان', reward: '100 نقطة', icon: '🏅' },
                    { days: 30, title: 'شهر واحد', reward: '250 نقطة', icon: '🏆' },
                    { days: 50, title: '50 يوم', reward: '500 نقطة', icon: '👑' },
                    { days: 100, title: '100 يوم', reward: '1000 نقطة', icon: '🌟' }
                  ].map((milestone, index) => {
                    const achieved = learningStreak.current >= milestone.days;
                    return (
                      <div 
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          achieved 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                            achieved ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            {milestone.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.reward}</p>
                          </div>
                        </div>
                        {achieved && (
                          <CheckCircle className="text-green-500" size={24} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
