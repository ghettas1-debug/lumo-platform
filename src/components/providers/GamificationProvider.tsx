'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'social' | 'streak' | 'completion' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface UserStats {
  level: number;
  experience: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  completedCourses: number;
  totalStudyTime: number;
  achievements: Achievement[];
  badges: Badge[];
  leaderboardRank?: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Date;
}

interface GamificationContextType {
  userStats: UserStats;
  addExperience: (amount: number) => void;
  addPoints: (amount: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateStreak: (increment: boolean) => void;
  addStudyTime: (minutes: number) => void;
  completeCourse: (courseId: string) => void;
  checkLevelUp: () => boolean;
  getProgressToNextLevel: () => { current: number; needed: number; percentage: number };
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// Constants
const EXP_PER_LEVEL = 1000;
const LEVEL_MULTIPLIER = 1.5;

// Achievements data
const ACHIEVEMENTS: Achievement[] = [
  // Learning Achievements
  {
    id: 'first_lesson',
    title: 'البداية',
    description: 'أكمل أول درس لك',
    icon: '🎯',
    category: 'learning',
    rarity: 'common',
    points: 10,
  },
  {
    id: 'week_streak',
    title: 'أسبوع متواصل',
    description: 'دراسة لمدة 7 أيام متتالية',
    icon: '🔥',
    category: 'streak',
    rarity: 'rare',
    points: 50,
    maxProgress: 7,
  },
  {
    id: 'month_streak',
    title: 'شهر متواصل',
    description: 'دراسة لمدة 30 يوماً متتالياً',
    icon: '💎',
    category: 'streak',
    rarity: 'epic',
    points: 200,
    maxProgress: 30,
  },
  {
    id: 'course_complete',
    title: 'دارس متميز',
    description: 'أكمل دورة كاملة',
    icon: '🎓',
    category: 'completion',
    rarity: 'common',
    points: 100,
  },
  {
    id: 'five_courses',
    title: 'طالب نشيط',
    description: 'أكمل 5 دورات',
    icon: '⭐',
    category: 'completion',
    rarity: 'rare',
    points: 300,
    maxProgress: 5,
  },
  {
    id: 'ten_courses',
    title: 'خبير تعلم',
    description: 'أكمل 10 دورات',
    icon: '🏆',
    category: 'completion',
    rarity: 'epic',
    points: 600,
    maxProgress: 10,
  },
  {
    id: '100_hours',
    title: 'متعلم جاد',
    description: 'دراسة لمدة 100 ساعة',
    icon: '⏰',
    category: 'learning',
    rarity: 'rare',
    points: 250,
    maxProgress: 6000, // 100 hours in minutes
  },
  {
    id: 'social_butterfly',
    title: 'شخصية اجتماعية',
    description: 'شارك في 50 مناقشة',
    icon: '🦋',
    category: 'social',
    rarity: 'rare',
    points: 150,
    maxProgress: 50,
  },
  {
    id: 'helpful_friend',
    title: 'صديق مفيد',
    description: 'ساعد 10 طلاب آخرين',
    icon: '🤝',
    category: 'social',
    rarity: 'rare',
    points: 100,
    maxProgress: 10,
  },
  {
    id: 'speed_learner',
    title: 'متعلم سريع',
    description: 'أكمل دورة في أقل من يوم',
    icon: '⚡',
    category: 'learning',
    rarity: 'epic',
    points: 400,
  },
  {
    id: 'night_owl',
    title: 'بوم الليل',
    description: 'دراسة لمدة 5 ساعات ليلاً',
    icon: '🦉',
    category: 'learning',
    rarity: 'rare',
    points: 150,
  },
  {
    id: 'early_bird',
    title: 'الطائر المبكر',
    description: 'دراسة 5 مرات صباحاً',
    icon: '🐦',
    category: 'learning',
    rarity: 'rare',
    points: 150,
  },
];

// Badges data
const BADGES = [
  {
    id: 'beginner',
    name: 'مبتدئ',
    description: 'بدأت رحلتك التعليمية',
    icon: '🌱',
    color: '#10b981',
  },
  {
    id: 'intermediate',
    name: 'متوسط',
    description: 'أحرزت تقدماً جيداً',
    icon: '🌿',
    color: '#3b82f6',
  },
  {
    id: 'advanced',
    name: 'متقدم',
    description: 'أصبحت خبيراً في المجال',
    icon: '🌳',
    color: '#8b5cf6',
  },
  {
    id: 'master',
    name: 'خبير',
    description: 'وصلت إلى مستوى الخبراء',
    icon: '🏔️',
    color: '#f59e0b',
  },
];

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [userStats, setUserStats] = useState<UserStats>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lumo-gamification');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          achievements: parsed.achievements || [],
          badges: parsed.badges || [],
        };
      }
    }
    return {
      level: 1,
      experience: 0,
      totalPoints: 0,
      currentStreak: 0,
      longestStreak: 0,
      completedCourses: 0,
      totalStudyTime: 0,
      achievements: [],
      badges: [],
    };
  });

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lumo-gamification', JSON.stringify(userStats));
    }
  }, [userStats]);

  const addExperience = (amount: number) => {
    setUserStats(prev => ({
      ...prev,
      experience: prev.experience + amount,
    }));
  };

  const addPoints = (amount: number) => {
    setUserStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + amount,
    }));
  };

  const unlockAchievement = (achievementId: string) => {
    setUserStats(prev => {
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (!achievement || prev.achievements.find(a => a.id === achievementId)) {
        return prev;
      }

      const newAchievement = {
        ...achievement,
        unlockedAt: new Date(),
      };

      return {
        ...prev,
        achievements: [...prev.achievements, newAchievement],
        totalPoints: prev.totalPoints + achievement.points,
        experience: prev.experience + achievement.points,
      };
    });
  };

  const updateStreak = (increment: boolean) => {
    setUserStats(prev => {
      const newStreak = increment ? prev.currentStreak + 1 : 0;
      const longestStreak = Math.max(newStreak, prev.longestStreak);
      
      // Check streak achievements
      if (newStreak === 7) unlockAchievement('week_streak');
      if (newStreak === 30) unlockAchievement('month_streak');
      
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak,
      };
    });
  };

  const addStudyTime = (minutes: number) => {
    setUserStats(prev => {
      const newTotalTime = prev.totalStudyTime + minutes;
      
      // Check time achievements
      if (newTotalTime >= 6000) unlockAchievement('100_hours');
      
      return {
        ...prev,
        totalStudyTime: newTotalTime,
      };
    });
  };

  const completeCourse = (courseId: string) => {
    setUserStats(prev => {
      const newCompletedCourses = prev.completedCourses + 1;
      
      // Check course achievements
      unlockAchievement('course_complete');
      if (newCompletedCourses === 5) unlockAchievement('five_courses');
      if (newCompletedCourses === 10) unlockAchievement('ten_courses');
      
      return {
        ...prev,
        completedCourses: newCompletedCourses,
      };
    });
  };

  const checkLevelUp = (): boolean => {
    const nextLevelExp = Math.floor(EXP_PER_LEVEL * Math.pow(LEVEL_MULTIPLIER, userStats.level));
    if (userStats.experience >= nextLevelExp) {
      setUserStats(prev => ({
        ...prev,
        level: prev.level + 1,
      }));
      
      // Update badges based on level
      if (userStats.level + 1 >= 5) updateBadge('intermediate');
      if (userStats.level + 1 >= 10) updateBadge('advanced');
      if (userStats.level + 1 >= 20) updateBadge('master');
      
      return true;
    }
    return false;
  };

  const updateBadge = (badgeId: string) => {
    setUserStats(prev => {
      if (prev.badges.find(b => b.id === badgeId)) return prev;
      
      const badge = BADGES.find(b => b.id === badgeId);
      if (!badge) return prev;
      
      return {
        ...prev,
        badges: [...prev.badges, { ...badge, unlockedAt: new Date() }],
      };
    });
  };

  const getProgressToNextLevel = () => {
    const currentLevelExp = Math.floor(EXP_PER_LEVEL * Math.pow(LEVEL_MULTIPLIER, userStats.level - 1));
    const nextLevelExp = Math.floor(EXP_PER_LEVEL * Math.pow(LEVEL_MULTIPLIER, userStats.level));
    const current = userStats.experience - currentLevelExp;
    const needed = nextLevelExp - currentLevelExp;
    const percentage = (current / needed) * 100;

    return { current, needed, percentage };
  };

  const value: GamificationContextType = {
    userStats,
    addExperience,
    addPoints,
    unlockAchievement,
    updateStreak,
    addStudyTime,
    completeCourse,
    checkLevelUp,
    getProgressToNextLevel,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// Helper functions
export const getAchievementProgress = (achievementId: string, userStats: UserStats): number => {
  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!achievement || !achievement.maxProgress) return 0;

  switch (achievementId) {
    case 'week_streak':
    case 'month_streak':
      return Math.min((userStats.currentStreak / achievement.maxProgress) * 100, 100);
    case 'five_courses':
    case 'ten_courses':
      return Math.min((userStats.completedCourses / achievement.maxProgress) * 100, 100);
    case '100_hours':
      return Math.min((userStats.totalStudyTime / achievement.maxProgress) * 100, 100);
    default:
      return 0;
  }
};

export const getRarityColor = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common': return '#9ca3af';
    case 'rare': return '#3b82f6';
    case 'epic': return '#8b5cf6';
    case 'legendary': return '#f59e0b';
    default: return '#9ca3af';
  }
};

export const getLevelColor = (level: number): string => {
  if (level >= 20) return '#f59e0b'; // Master - Gold
  if (level >= 10) return '#8b5cf6'; // Advanced - Purple
  if (level >= 5) return '#3b82f6'; // Intermediate - Blue
  return '#10b981'; // Beginner - Green
};
