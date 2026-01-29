'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Target, Zap, TrendingUp, Award, BookOpen, Clock, BarChart3, Lightbulb, CheckCircle, AlertCircle, Star, Users, Calendar, Activity, Settings, RefreshCw, Play, Pause, SkipForward, Volume2, ArrowLeft, Home, Search, Bell, MessageSquare, TrendingUp as TrendUpIcon, BarChart3 as BarChartIcon } from 'lucide-react';
import Link from 'next/link';

interface AdaptiveLearningProfile {
  userId: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  skillLevel: Record<string, number>;
  preferences: {
    difficulty: 'easy' | 'medium' | 'hard' | 'adaptive';
    sessionLength: number;
    preferredTopics: string[];
    weakAreas: string[];
    strongAreas: string[];
  };
  progress: {
    completedLessons: number;
    totalLessons: number;
    averageScore: number;
    timeSpent: number;
    streak: number;
  };
  recommendations: Recommendation[];
}

interface Recommendation {
  id: string;
  type: 'course' | 'lesson' | 'exercise' | 'review' | 'break';
  title: string;
  description: string;
  difficulty: number;
  estimatedTime: number;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  confidence: number;
  prerequisites?: string[];
  learningObjectives?: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modules: LearningModule[];
  progress: number;
  adaptiveAdjustments: number;
}

interface LearningModule {
  id: string;
  title: string;
  lessons: Lesson[];
  requiredScore: number;
  adaptiveContent: boolean;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'interactive' | 'quiz' | 'practice';
  content: LessonContent;
  difficulty: number;
  estimatedTime: number;
  completed: boolean;
  score?: number;
  timeSpent: number;
  adaptations: Adaptation[];
}

interface LessonContent {
  visual: string[];
  auditory: string[];
  kinesthetic: string[];
  reading: string[];
  interactive: InteractiveElement[];
}

interface InteractiveElement {
  type: 'quiz' | 'simulation' | 'exercise' | 'game';
  content: any;
  feedback: string;
}

interface Adaptation {
  type: 'difficulty' | 'pace' | 'content' | 'method';
  original: any;
  adjusted: any;
  reason: string;
  timestamp: string;
}

export default function AdaptiveLearningPage() {
  const [profile, setProfile] = useState<AdaptiveLearningProfile | null>(null);
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load adaptive learning profile from localStorage
    const savedProfile = localStorage.getItem('adaptiveLearningProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Initialize with sample profile
      const sampleProfile: AdaptiveLearningProfile = {
        userId: 'user-1',
        learningStyle: 'visual',
        skillLevel: {
          'JavaScript': 65,
          'React': 45,
          'Python': 80,
          'Data Analysis': 30,
          'UI Design': 55
        },
        preferences: {
          difficulty: 'adaptive',
          sessionLength: 45,
          preferredTopics: ['JavaScript', 'React', 'Python'],
          weakAreas: ['Data Analysis', 'React Hooks'],
          strongAreas: ['Python', 'JavaScript Basics']
        },
        progress: {
          completedLessons: 23,
          totalLessons: 50,
          averageScore: 78,
          timeSpent: 1840, // minutes
          streak: 7
        },
        recommendations: [
          {
            id: '1',
            type: 'lesson',
            title: 'React Hooks المتقدمة',
            description: 'تعلم استخدام useState و useEffect بعمق',
            difficulty: 7,
            estimatedTime: 45,
            priority: 'high',
            reason: 'منطقة ضعيفة محددة من تحليل الأداء',
            confidence: 0.85,
            prerequisites: ['React Basics', 'JavaScript ES6'],
            learningObjectives: ['فهم دورة حياة React', 'إدارة الحالة المعقدة', 'تحسين الأداء']
          },
          {
            id: '2',
            type: 'exercise',
            title: 'تمارين Python العملية',
            description: 'حل مسائل برمجية لتعزيز المفاهيم',
            difficulty: 6,
            estimatedTime: 30,
            priority: 'medium',
            reason: 'للحفاظ على المهارات القوية',
            confidence: 0.75
          },
          {
            id: '3',
            type: 'review',
            title: 'مراجعة JavaScript الأساسيات',
            description: 'مراجعة سريعة للمفاهيم الأساسية',
            difficulty: 4,
            estimatedTime: 20,
            priority: 'low',
            reason: 'للحفاظ على المعلومات',
            confidence: 0.90
          }
        ]
      };
      setProfile(sampleProfile);
    }

    // Load current learning path
    const savedPath = localStorage.getItem('currentLearningPath');
    if (savedPath) {
      setCurrentPath(JSON.parse(savedPath));
    } else {
      // Initialize with sample path
      const samplePath: LearningPath = {
        id: 'path-1',
        title: 'مسار تطوير الويب المتكامل',
        description: 'من الصفر إلى الاحتراف في تطوير الويب',
        estimatedDuration: 1200, // minutes
        difficulty: 'intermediate',
        modules: [
          {
            id: 'module-1',
            title: 'أساسيات HTML و CSS',
            lessons: [],
            requiredScore: 70,
            adaptiveContent: true
          },
          {
            id: 'module-2',
            title: 'JavaScript المتقدم',
            lessons: [],
            requiredScore: 75,
            adaptiveContent: true
          }
        ],
        progress: 35,
        adaptiveAdjustments: 12
      };
      setCurrentPath(samplePath);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('adaptiveLearningProfile', JSON.stringify(profile));
    }
  }, [profile]);

  const startAdaptiveSession = () => {
    if (!profile || !profile.recommendations.length) return;
    
    setLoading(true);
    // Simulate loading adaptive content
    setTimeout(() => {
      const topRecommendation = profile.recommendations[0];
      // Create adaptive lesson based on recommendation
      const adaptiveLesson: Lesson = {
        id: `adaptive-${Date.now()}`,
        title: topRecommendation.title,
        type: 'interactive',
        content: {
          visual: ['مخططات انسيابية', 'رسوم بيانية تفاعلية'],
          auditory: ['شرح صوتي', 'مناقشات مسجلة'],
          kinesthetic: ['تمارين عملية', 'محاكاة'],
          reading: ['نصوص تفصيلية', 'ملاحظات'],
          interactive: [
            {
              type: 'quiz',
              content: {
                questions: [
                  {
                    question: 'ما هو استخدام useEffect في React؟',
                    options: ['إدارة الحالة', 'التعامل مع الآثار الجانبية', 'تحسين الأداء', 'التعامل مع الأحداث'],
                    correct: 1
                  }
                ]
              },
              feedback: 'استخدم useEffect للتعامل مع الآثار الجانبية مثل طلبات API'
            }
          ]
        },
        difficulty: topRecommendation.difficulty,
        estimatedTime: topRecommendation.estimatedTime,
        completed: false,
        timeSpent: 0,
        adaptations: []
      };
      
      setCurrentLesson(adaptiveLesson);
      setIsPlaying(true);
      setLoading(false);
    }, 1500);
  };

  const adaptToUserResponse = (response: any, performance: number) => {
    if (!currentLesson || !profile) return;

    const adaptation: Adaptation = {
      type: 'difficulty',
      original: currentLesson.difficulty,
      adjusted: performance > 80 ? Math.min(10, currentLesson.difficulty + 1) : Math.max(1, currentLesson.difficulty - 1),
      reason: performance > 80 ? 'أداء ممتاز - زيادة الصعوبة' : 'أداء ضعيف - تقليل الصعوبة',
      timestamp: new Date().toISOString()
    };

    const updatedLesson = {
      ...currentLesson,
      adaptations: [...currentLesson.adaptations, adaptation],
      difficulty: adaptation.adjusted
    };

    setCurrentLesson(updatedLesson);

    // Update profile based on performance
    const updatedProfile = {
      ...profile,
      progress: {
        ...profile.progress,
        averageScore: (profile.progress.averageScore + performance) / 2
      }
    };

    setProfile(updatedProfile);
  };

  const generateNewRecommendations = () => {
    if (!profile) return;

    // Simulate AI-powered recommendation generation
    const newRecommendations: Recommendation[] = [
      {
        id: Date.now().toString(),
        type: 'course',
        title: 'دورة TypeScript المتقدمة',
        description: 'تعلم TypeScript لتطوير تطبيقات أكثر قوة',
        difficulty: 8,
        estimatedTime: 120,
        priority: 'medium',
        reason: 'بناءً على مهارات JavaScript الحالية',
        confidence: 0.80
      }
    ];

    setProfile({
      ...profile,
      recommendations: newRecommendations
    });
  };

  const getLearningStyleIcon = (style: string) => {
    switch (style) {
      case 'visual':
        return '👁️';
      case 'auditory':
        return '👂';
      case 'kinesthetic':
        return '🤚';
      case 'reading':
        return '📖';
      default:
        return '🧠';
    }
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-blue-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل ملف التعلم التكيفي...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home size={18} />
                <span className="text-sm font-medium">الرئيسية</span>
              </Link>
              
              <div className="w-px h-4 bg-gray-300"></div>
              
              <div className="flex items-center gap-3">
                <Link 
                  href="/playlist"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  title="قائمة التشغيل"
                >
                  <Play size={16} />
                  <span>قائمة التشغيل</span>
                </Link>

                <Link 
                  href="/notifications"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  title="الإشعارات"
                >
                  <Bell size={16} />
                  <span>الإشعارات</span>
                </Link>

                <Link 
                  href="/forums"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  title="المنتديات"
                >
                  <MessageSquare size={16} />
                  <span>المنتديات</span>
                </Link>

                <Link 
                  href="/progress"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  title="التقدم"
                >
                  <TrendUpIcon size={16} />
                  <span>التقدم</span>
                </Link>

                <Link 
                  href="/leaderboard"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  title="المتصدرين"
                >
                  <BarChartIcon size={16} />
                  <span>المتصدرين</span>
                </Link>

                <Link 
                  href="/search"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  title="البحث"
                >
                  <Search size={16} />
                  <span>بحث</span>
                </Link>
              </div>
              
              <div className="w-px h-4 bg-gray-300"></div>
              
              <h1 className="text-xl font-bold flex items-center space-x-2 space-x-reverse">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span>التعلم التكيفي الذكي</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={generateNewRecommendations}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Learning Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Style & Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>ملف التعلم الشخصي</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">نمط التعلم المفضل</h3>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-2xl">{getLearningStyleIcon(profile.learningStyle)}</span>
                    <div>
                      <p className="font-medium capitalize">{profile.learningStyle}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile.learningStyle === 'visual' && 'تتعلم أفضل بالمحتوى البصري'}
                        {profile.learningStyle === 'auditory' && 'تتعلم أفضل بالمحتوى الصوتي'}
                        {profile.learningStyle === 'kinesthetic' && 'تتعلم أفضل بالممارسة العملية'}
                        {profile.learningStyle === 'reading' && 'تتعلم أفضل بالقراءة والكتابة'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">التفضيلات</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">مستوى الصعوبة</span>
                      <span className="text-sm font-medium">
                        {profile.preferences.difficulty === 'adaptive' ? 'تكيفي' : profile.preferences.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">طول الجلسة</span>
                      <span className="text-sm font-medium">{profile.preferences.sessionLength} دقيقة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">سلسلة الحضور</span>
                      <span className="text-sm font-medium">{profile.progress.streak} أيام</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Levels */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>المهارات والمستويات</span>
              </h2>
              
              <div className="space-y-4">
                {Object.entries(profile.skillLevel).map(([skill, level]) => (
                  <div key={skill} className="flex items-center space-x-3 space-x-reverse">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getSkillLevelColor(level)}`}
                          style={{ width: `${level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Session */}
            {currentLesson && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
                  <Play className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>الجلسة الحالية</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">{currentLesson.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      الصعوبة: {currentLesson.difficulty}/10 • الوقت المتوقع: {formatTime(currentLesson.estimatedTime)}
                    </p>
                  </div>
                  
                  {/* Adaptive Content Display */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium mb-3">المحتوى التكيفي</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">محتوى {profile.learningStyle}</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {currentLesson.content[profile.learningStyle as keyof LessonContent]?.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">عناصر تفاعلية</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {currentLesson.content.interactive.map((element, index) => (
                            <li key={index}>• {element.type}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Session Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        <SkipForward className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => adaptToUserResponse({}, 75)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      محاكاة التكيف
                    </button>
                  </div>
                  
                  {/* Adaptations History */}
                  {currentLesson.adaptations.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">التعديلات التكيفية</h4>
                      <div className="space-y-1">
                        {currentLesson.adaptations.slice(-2).map((adaptation, index) => (
                          <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                            {adaptation.reason} ({adaptation.original} → {adaptation.adjusted})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
                <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span>التوصيات الذكية</span>
              </h2>
              
              <div className="space-y-4">
                {profile.recommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {rec.priority === 'high' ? 'أولوية عالية' : rec.priority === 'medium' ? 'أولوية متوسطة' : 'أولوية منخفضة'}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ثقة: {Math.round(rec.confidence * 100)}%
                          </span>
                        </div>
                        <h3 className="font-medium mb-1">{rec.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{rec.description}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">{rec.reason}</p>
                        
                        {rec.learningObjectives && (
                          <div className="mt-3">
                            <h4 className="text-xs font-medium mb-1">أهداف التعلم:</h4>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              {rec.learningObjectives.map((objective, index) => (
                                <li key={index}>• {objective}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-left mr-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {formatTime(rec.estimatedTime)}
                        </div>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          ابدأ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {!currentLesson && (
                <button
                  onClick={startAdaptiveSession}
                  disabled={loading}
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center space-x-2 space-x-reverse"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>ابدأ جلسة تعلم تكيفية</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Progress Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>نظرة عامة على التقدم</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {profile.progress.completedLessons}/{profile.progress.totalLessons}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">الدروس المكتملة</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {profile.progress.averageScore}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">متوسط الدرجات</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatTime(profile.progress.timeSpent)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">وقت الدراسة</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {profile.progress.streak}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">أيام متتالية</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        {showAnalytics && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
              <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>تحليلات التعلم التكيفي</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">فعالية التكيف</h3>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">87%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">تحسن في الأداء</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">دقة التوصيات</h3>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">92%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">مطابقة التوقعات</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">التعديلات التكيفية</h3>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">هذا الأسبوع</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span>إعدادات التعلم التكيفي</span>
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">نمط التعلم</label>
                <select
                  value={profile.learningStyle}
                  onChange={(e) => setProfile({...profile, learningStyle: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="visual">بصري</option>
                  <option value="auditory">سمعي</option>
                  <option value="kinesthetic">حركي</option>
                  <option value="reading">قراءة</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">مستوى الصعوبة المفضل</label>
                <select
                  value={profile.preferences.difficulty}
                  onChange={(e) => setProfile({
                    ...profile,
                    preferences: {...profile.preferences, difficulty: e.target.value as any}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="easy">سهل</option>
                  <option value="medium">متوسط</option>
                  <option value="hard">صعب</option>
                  <option value="adaptive">تكيفي</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">طول الجلسة (دقائق)</label>
                <input
                  type="number"
                  value={profile.preferences.sessionLength}
                  onChange={(e) => setProfile({
                    ...profile,
                    preferences: {...profile.preferences, sessionLength: parseInt(e.target.value)}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="15"
                  max="120"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
