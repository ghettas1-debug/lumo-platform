'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Star, Target, Zap, Award, Medal, Crown, Flame, Rocket, CheckCircle } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  type: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  unlocked: boolean;
  progress?: number;
  totalRequired?: number;
}

interface GamificationProps {
  userId?: string;
  className?: string;
}

export default function Gamification({ userId, className = "" }: GamificationProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_course',
      title: 'أول دورة',
      description: 'أكمل أول دورة في المنصة',
      icon: '🎯',
      points: 50,
      type: 'bronze',
      unlocked: false
    },
    {
      id: 'course_streak',
      title: 'سلسلة الدورات',
      description: 'أكمل 5 دورات متتالية',
      icon: '🔥',
      points: 100,
      type: 'silver',
      unlocked: false
    },
    {
      id: 'expert_learner',
      title: 'خبير المتعلم',
      description: 'أكمل 20 دورة',
      icon: '🎓',
      points: 200,
      type: 'gold',
      unlocked: false
    },
    {
      'id': 'master_instructor',
      title: 'معلمعلم',
      description: 'ساعد 100 طالب في الحصول على شهادات',
      icon: '👨‍🏫',
      points: 500,
      type: 'platinum',
      unlocked: false
    },
    {
      id: 'platform_champion',
      title: 'بطل المنصة',
      description: 'أكمل 50 دورة وحصل على أعلى تقدير',
      icon: '👑',
      points: 1000,
      type: 'diamond',
      unlocked: false
    },
    {
      id: 'streak_week',
      title: 'أسبوع متواصل',
      description: 'دراسة لمدة أسبوع متواصل',
      icon: '📅',
      points: 150,
      type: 'gold',
      unlocked: false,
      progress: 3,
      totalRequired: 7
    },
    {
      id: 'perfect_score',
      title: 'درجة كاملة',
      description: 'احصل على درجة كاملة في 10 دورات',
      icon: '💯',
      points: 300,
      type: 'platinum',
      unlocked: false,
      progress: 4,
      totalRequired: 10
    },
    {
      id: 'social_butterfly',
      title: 'شبكة اجتماعية',
      description: 'شارك 50 دورة مع الأصدقاء',
      icon: '🦋',
      points: 100,
      type: 'silver',
      unlocked: false,
      progress: 12,
      totalRequired: 50
    }
  ]);

  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  const levels = [
    { level: 1, name: 'مبتدئ', minPoints: 0, maxPoints: 99, color: 'from-green-400 to-green-600' },
    { level: 2, name: 'متوسط', minPoints: 100, maxPoints: 299, color: 'from-blue-400 to-blue-600' },
    { level: 3, name: 'متقدم', minPoints: 300, maxPoints: 599, color: 'from-purple-400 to-purple-600' },
    { level: 4, name: 'خبير', minPoints: 600, maxPoints: 999, color: 'from-orange-400 to-orange-600' },
    { level: 5, name: 'معلمعلم', minPoints: 1000, maxPoints: 9999, color: 'from-red-400 to-red-600' }
  ];

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'bronze': return 'from-yellow-600 to-yellow-700';
      case 'silver': return 'from-gray-400 to-gray-500';
      case 'gold': return 'from-yellow-500 to-yellow-600';
      case 'platinum': return 'from-purple-500 to-purple-600';
      case 'diamond': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, unlocked: true }
          : achievement
      )
    );
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      setUserPoints(prev => prev + achievement.points);
      setShowAchievement(achievementId);
      setTimeout(() => setShowAchievement(null), 3000);
    }
  };

  useEffect(() => {
    // Calculate user level based on points
    const level = levels.find(level => 
      userPoints >= level.minPoints && userPoints <= level.maxPoints
    );
    if (level) {
      setUserLevel(level.level);
    }
  }, [userPoints]);

  const currentLevel = levels.find(level => level.level === userLevel);
  const nextLevel = levels.find(level => level.level === userLevel + 1);
  const progressToNextLevel = nextLevel 
    ? ((userPoints - currentLevel!.minPoints) / (nextLevel.maxPoints - currentLevel!.minPoints)) * 100
    : 100;

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">نظام الإنجازات</h2>
        </div>
        <p className="text-gray-600">اكسب نقاط وفتح إنجازاتك في رحلة التعلم</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{userPoints}</div>
          <div className="text-sm text-gray-600">النقاط الكلية</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">المستوى {userLevel}</div>
          <div className="text-sm text-gray-600">{currentLevel?.name}</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-600 mb-2">
            التقدم للمستوى التالي
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${currentLevel?.color} transition-all duration-500`}
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {nextLevel ? `${userPoints - currentLevel!.minPoints} / (nextLevel.maxPoints - currentLevel!.minPoints)} نقطة` : ''}
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
              achievement.unlocked
                ? `bg-gradient-to-br ${getAchievementColor(achievement.type)} border-transparent transform scale-105 shadow-lg`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Achievement Icon */}
            <div className="text-4xl mb-2 text-center">
              {achievement.icon}
            </div>
            
            {/* Achievement Info */}
            <div className="text-center">
              <h3 className="font-bold text-gray-900 mb-1">
                {achievement.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {achievement.description}
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="text-sm font-medium text-gray-700">
                  {achievement.points} نقطة
                </div>
                {achievement.progress && achievement.totalRequired && (
                  <div className="text-xs text-gray-500">
                    {achievement.progress}/{achievement.totalRequired}
                  </div>
                )}
              </div>
              
              {/* Progress Bar for Partial Achievements */}
              {achievement.progress && achievement.totalRequired && !achievement.unlocked && (
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div 
                    className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
                    style={{ width: `${(achievement.progress / achievement.totalRequired) * 100}%` }}
                  />
                </div>
              )}
              
              {/* Unlocked Badge */}
              {achievement.unlocked && (
                <div className="absolute -top-2 -right-2">
                  <CheckCircle className="w-6 h-6 text-green-500 fill-current" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Notification */}
      {showAchievement && (
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {achievements.find(a => a.id === showAchievement)?.icon}
            </div>
            <div>
              <div className="font-bold text-gray-900">
                إنجاز جديد!
              </div>
              <div className="text-sm text-gray-600">
                {achievements.find(a => a.id === showAchievement)?.title}
              </div>
              <div className="text-xs text-green-600 font-medium">
                +{achievements.find(a => a.id === showAchievement)?.points} نقطة
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Preview */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">لوحة المتصدرين</h3>
          <Link href="/leaderboard" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            عرض الكل
          </Link>
        </div>
        <div className="space-y-2">
          {[
            { name: 'أحمد محمد', points: 2500, level: 4, avatar: 'أحمد' },
            { name: 'فاطمة علي', points: 1800, level: 3, avatar: 'فاطمة' },
            { name: 'محمد سعيد', points: 1200, level: 2, avatar: 'محمد' }
          ].map((user, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">المستوى {user.level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{user.points}</div>
                <div className="text-xs text-gray-500">نقطة</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
