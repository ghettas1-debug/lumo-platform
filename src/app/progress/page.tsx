'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Download, TrendingUp, Award, Target, Calendar, Clock, BookOpen, Users, BarChart3, PieChart, Activity, CheckCircle, Star, Trophy, Flame, Zap, Eye, Heart, MessageSquare, Filter, Search, ChevronDown, X, Facebook, Twitter, Linkedin, Mail, Link } from 'lucide-react';

interface ProgressData {
  userId: string;
  userName: string;
  userAvatar: string;
  totalStudyTime: number;
  coursesCompleted: number;
  coursesInProgress: number;
  totalCourses: number;
  streak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  monthlyGoal: number;
  monthlyProgress: number;
  achievements: Achievement[];
  certificates: Certificate[];
  studySessions: StudySession[];
  courseProgress: CourseProgress[];
  skills: Skill[];
  badges: Badge[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Certificate {
  id: string;
  title: string;
  courseName: string;
  issuedAt: string;
  score: number;
  duration: string;
  instructor: string;
  certificateUrl: string;
}

interface StudySession {
  id: string;
  date: string;
  duration: number;
  courseName: string;
  lessonsCompleted: number;
  quizScore?: number;
}

interface CourseProgress {
  courseId: string;
  courseName: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTimeRemaining: number;
  lastAccessed: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Skill {
  name: string;
  level: number;
  maxLevel: number;
  progress: number;
  category: string;
  icon: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  level: number;
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load progress data from localStorage
    const savedProgress = localStorage.getItem('progressData');
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress));
    } else {
      // Initialize with sample data
      const sampleData: ProgressData = {
        userId: 'user-1',
        userName: 'أحمد محمد',
        userAvatar: '/avatars/user1.jpg',
        totalStudyTime: 1560, // 26 hours
        coursesCompleted: 3,
        coursesInProgress: 2,
        totalCourses: 8,
        streak: 12,
        weeklyGoal: 600, // 10 hours
        weeklyProgress: 450, // 7.5 hours
        monthlyGoal: 2400, // 40 hours
        monthlyProgress: 1800, // 30 hours
        achievements: [
          {
            id: '1',
            title: 'بداية قوية',
            description: 'أكمل أول دورة لك',
            icon: '🎯',
            unlockedAt: '2024-03-01T10:00:00Z',
            category: 'milestone',
            rarity: 'common'
          },
          {
            id: '2',
            title: 'متعلم منتظم',
            description: 'حضر لمدة 7 أيام متتالية',
            icon: '🔥',
            unlockedAt: '2024-03-10T15:30:00Z',
            category: 'consistency',
            rarity: 'rare'
          },
          {
            id: '3',
            title: 'خبير JavaScript',
            description: 'أكمل دورة JavaScript المتقدمة',
            icon: '💎',
            unlockedAt: '2024-03-15T12:00:00Z',
            category: 'skill',
            rarity: 'epic'
          }
        ],
        certificates: [
          {
            id: '1',
            title: 'شهادة إتمام دورة React.js',
            courseName: 'React.js الشامل',
            issuedAt: '2024-03-01T00:00:00Z',
            score: 95,
            duration: '20 ساعة',
            instructor: 'أحمد محمد',
            certificateUrl: '/certificates/react-js.pdf'
          },
          {
            id: '2',
            title: 'شهادة إتمام دورة JavaScript',
            courseName: 'JavaScript المتقدم',
            issuedAt: '2024-02-15T00:00:00Z',
            score: 88,
            duration: '25 ساعة',
            instructor: 'سارة أحمد',
            certificateUrl: '/certificates/javascript.pdf'
          }
        ],
        studySessions: [
          {
            id: '1',
            date: '2024-03-15T10:00:00Z',
            duration: 90,
            courseName: 'React.js الشامل',
            lessonsCompleted: 3,
            quizScore: 85
          },
          {
            id: '2',
            date: '2024-03-14T14:30:00Z',
            duration: 60,
            courseName: 'JavaScript المتقدم',
            lessonsCompleted: 2,
            quizScore: 92
          },
          {
            id: '3',
            date: '2024-03-13T09:00:00Z',
            duration: 45,
            courseName: 'CSS المتقدم',
            lessonsCompleted: 2
          }
        ],
        courseProgress: [
          {
            courseId: '1',
            courseName: 'React.js الشامل',
            instructor: 'أحمد محمد',
            thumbnail: '/courses/react.jpg',
            progress: 75,
            totalLessons: 40,
            completedLessons: 30,
            estimatedTimeRemaining: 300,
            lastAccessed: '2024-03-15T10:00:00Z',
            category: 'برمجة',
            difficulty: 'intermediate'
          },
          {
            courseId: '2',
            courseName: 'JavaScript المتقدم',
            instructor: 'سارة أحمد',
            thumbnail: '/courses/javascript.jpg',
            progress: 90,
            totalLessons: 35,
            completedLessons: 31,
            estimatedTimeRemaining: 90,
            lastAccessed: '2024-03-14T14:30:00Z',
            category: 'برمجة',
            difficulty: 'advanced'
          },
          {
            courseId: '3',
            courseName: 'CSS المتقدم',
            instructor: 'محمد علي',
            thumbnail: '/courses/css.jpg',
            progress: 45,
            totalLessons: 30,
            completedLessons: 13,
            estimatedTimeRemaining: 480,
            lastAccessed: '2024-03-13T09:00:00Z',
            category: 'تصميم',
            difficulty: 'intermediate'
          }
        ],
        skills: [
          {
            name: 'React.js',
            level: 4,
            maxLevel: 5,
            progress: 80,
            category: 'Frontend',
            icon: '⚛️'
          },
          {
            name: 'JavaScript',
            level: 5,
            maxLevel: 5,
            progress: 100,
            category: 'Programming',
            icon: '📜'
          },
          {
            name: 'CSS',
            level: 3,
            maxLevel: 5,
            progress: 60,
            category: 'Styling',
            icon: '🎨'
          },
          {
            name: 'Node.js',
            level: 2,
            maxLevel: 5,
            progress: 40,
            category: 'Backend',
            icon: '🟢'
          }
        ],
        badges: [
          {
            id: '1',
            name: 'نجم الأسبوع',
            description: 'أكثر المستخدمين نشاطاً هذا الأسبوع',
            icon: '⭐',
            earnedAt: '2024-03-10T00:00:00Z',
            level: 1
          },
          {
            id: '2',
            name: 'مساعد المجتمع',
            description: 'ساعد 10 مستخدمين في المنتديات',
            icon: '🤝',
            earnedAt: '2024-03-08T00:00:00Z',
            level: 2
          }
        ]
      };
      setProgressData(sampleData);
    }
  }, []);

  useEffect(() => {
    if (progressData) {
      localStorage.setItem('progressData', JSON.stringify(progressData));
    }
  }, [progressData]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'epic':
        return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white';
      case 'rare':
        return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'مبتدئ';
      case 'intermediate':
        return 'متوسط';
      case 'advanced':
        return 'متقدم';
      default:
        return difficulty;
    }
  };

  const handleShare = (platform: string) => {
    const shareText = `لقد حققت تقدماً رائعاً في رحلتي التعليمية! 🎉\n` +
                     `وقت الدراسة: ${formatTime(progressData?.totalStudyTime || 0)}\n` +
                     `الدورات المكتملة: ${progressData?.coursesCompleted || 0}\n` +
                     `سلسلة الحضور: ${progressData?.streak || 0} يوم\n` +
                     `انضموا إلي في منصة Lumo للتعلم!`;
    
    const shareUrl = window.location.href;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=تقدمي في منصة Lumo&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText + '\n\n' + shareUrl);
        alert('تم نسخ الرابط بنجاح!');
        break;
    }
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF report
    const reportData = {
      userName: progressData?.userName,
      totalStudyTime: progressData?.totalStudyTime,
      coursesCompleted: progressData?.coursesCompleted,
      streak: progressData?.streak,
      achievements: progressData?.achievements,
      certificates: progressData?.certificates,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `progress-report-${progressData?.userName}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!progressData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل بيانات التقدم...</p>
        </div>
      </div>
    );
  }

  const weeklyProgressPercentage = (progressData.weeklyProgress / progressData.weeklyGoal) * 100;
  const monthlyProgressPercentage = (progressData.monthlyProgress / progressData.monthlyGoal) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-xl font-bold flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="w-6 h-6" />
                <span>مشاركة التقدم</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setShowShareModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة التقدم</span>
              </button>
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <Download className="w-4 h-4" />
                <span>تحميل التقرير</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* User Stats Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 space-x-reverse mb-6">
            <img
              src={progressData.userAvatar}
              alt={progressData.userName}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{progressData.userName}</h2>
              <p className="text-gray-600 dark:text-gray-400">متعلم نشط</p>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="flex items-center space-x-2 space-x-reverse text-orange-600 dark:text-orange-400">
                <Flame className="w-6 h-6" />
                <span className="text-2xl font-bold">{progressData.streak}</span>
                <span className="text-sm">يوم متتالي</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">وقت الدراسة الإجمالي</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {formatTime(progressData.totalStudyTime)}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">الدورات المكتملة</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {progressData.coursesCompleted}/{progressData.totalCourses}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">الشهادات</p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                    {progressData.certificates.length}
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">الإنجازات</p>
                  <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                    {progressData.achievements.length}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>هدف الأسبوع</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>التقدم الحالي</span>
                <span>{formatTime(progressData.weeklyProgress)} / {formatTime(progressData.weeklyGoal)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(weeklyProgressPercentage, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(weeklyProgressPercentage)}% مكتمل
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>هدف الشهر</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>التقدم الحالي</span>
                <span>{formatTime(progressData.monthlyProgress)} / {formatTime(progressData.monthlyGoal)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(monthlyProgressPercentage, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(monthlyProgressPercentage)}% مكتمل
              </p>
            </div>
          </div>
        </div>

        {/* Skills Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>تقدم المهارات</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressData.skills.map((skill, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{skill.category}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium">المستوى {skill.level}/{skill.maxLevel}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{skill.progress}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
            <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span>تقدم الدورات</span>
          </h3>
          <div className="space-y-4">
            {progressData.courseProgress.map((course) => (
              <div key={course.courseId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{course.courseName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{course.instructor}</p>
                        <div className="flex items-center space-x-2 space-x-reverse mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                            {getDifficultyText(course.difficulty)}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {course.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">{course.progress}%</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {course.completedLessons}/{course.totalLessons} درس
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>آخر وصول: {formatDate(course.lastAccessed)}</span>
                      <span>وقت متبقي: {formatTime(course.estimatedTimeRemaining)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2 space-x-reverse">
              <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span>الإنجازات الحديثة</span>
            </h3>
            <button
              onClick={() => setShowAchievements(true)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm"
            >
              عرض الكل
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {progressData.achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className={`p-4 rounded-lg border ${getRarityColor(achievement.rarity)}`}>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-3xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm opacity-80">{achievement.description}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {formatDate(achievement.unlockedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">مشاركة التقدم</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium mb-2">إحصائياتي:</h4>
                <ul className="space-y-1 text-sm">
                  <li>⏰ وقت الدراسة: {formatTime(progressData.totalStudyTime)}</li>
                  <li>📚 الدورات المكتملة: {progressData.coursesCompleted}</li>
                  <li>🔥 سلسلة الحضور: {progressData.streak} يوم</li>
                  <li>🏆 الإنجازات: {progressData.achievements.length}</li>
                  <li>🎓 الشهادات: {progressData.certificates.length}</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center space-x-2 space-x-reverse p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center space-x-2 space-x-reverse p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center justify-center space-x-2 space-x-reverse p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="flex items-center justify-center space-x-2 space-x-reverse p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>البريد</span>
                </button>
              </div>
              
              <button
                onClick={() => handleShare('copy')}
                className="w-full flex items-center justify-center space-x-2 space-x-reverse p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Link className="w-4 h-4" />
                <span>نسخ الرابط</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">جميع الإنجازات</h3>
              <button
                onClick={() => setShowAchievements(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {progressData.achievements.map((achievement) => (
                <div key={achievement.id} className={`p-4 rounded-lg border ${getRarityColor(achievement.rarity)}`}>
                  <div className="text-center">
                    <span className="text-4xl block mb-2">{achievement.icon}</span>
                    <h4 className="font-medium mb-1">{achievement.title}</h4>
                    <p className="text-sm opacity-80 mb-2">{achievement.description}</p>
                    <p className="text-xs opacity-60">{formatDate(achievement.unlockedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
