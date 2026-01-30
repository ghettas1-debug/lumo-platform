'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, Award, TrendingUp, Calendar, BookOpen, Star } from 'lucide-react';
import { useGamification, getLevelColor } from '@/components/providers/GamificationProvider';
import { AnimatedProgress, AnimatedCounter } from '@/components/ui/Animations';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// Progress Circle Component
interface ProgressCircleProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  showPercentage?: boolean;
}

export function ProgressCircle({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  label,
  showPercentage = true,
}: ProgressCircleProps) {
  const percentage = (value / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        {showPercentage && (
          <div className="text-2xl font-bold" style={{ color }}>
            <AnimatedCounter value={Math.round(percentage)} suffix="%" />
          </div>
        )}
        {label && (
          <div className="text-sm text-gray-600 mt-1">{label}</div>
        )}
      </div>
    </div>
  );
}

// Level Progress Component
export function LevelProgress() {
  const { userStats, getProgressToNextLevel } = useGamification();
  const progress = getProgressToNextLevel();
  const levelColor = getLevelColor(userStats.level);

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" style={{ color: levelColor }} />
          المستوى {userStats.level}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">الخبرة</span>
          <span className="font-medium">
            <AnimatedCounter value={progress.current} /> / <AnimatedCounter value={progress.needed} />
          </span>
        </div>
        <AnimatedProgress value={progress.current} max={progress.needed} color={levelColor} />
        <div className="text-center text-sm text-gray-500">
          <AnimatedCounter value={Math.round(progress.percentage)} suffix="% إلى المستوى التالي" />
        </div>
      </CardContent>
    </Card>
  );
}

// Study Streak Component
export function StudyStreak() {
  const { userStats } = useGamification();

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-500" />
          سلسلة الحضور
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-orange-500">
              <AnimatedCounter value={userStats.currentStreak} />
            </div>
            <div className="text-sm text-gray-600">أيام متتالية</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              <AnimatedCounter value={userStats.longestStreak} />
            </div>
            <div className="text-sm text-gray-600">أطول سلسلة</div>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full ${
                index < userStats.currentStreak ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Study Time Component
export function StudyTime() {
  const { userStats } = useGamification();
  const hours = Math.floor(userStats.totalStudyTime / 60);
  const minutes = userStats.totalStudyTime % 60;

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          وقت الدراسة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-500">
            <AnimatedCounter value={hours} />
            <span className="text-2xl">h</span>
            <AnimatedCounter value={minutes} />
            <span className="text-2xl">m</span>
          </div>
          <div className="text-sm text-gray-600 mt-2">إجمالي وقت الدراسة</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-700">
              <AnimatedCounter value={Math.floor(userStats.totalStudyTime / 7 / 60)} suffix="h" />
            </div>
            <div className="text-xs text-gray-500">متوسط أسبوعي</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-700">
              <AnimatedCounter value={Math.floor(userStats.totalStudyTime / 30 / 60)} suffix="h" />
            </div>
            <div className="text-xs text-gray-500">متوسط شهري</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Course Progress Component
export function CourseProgress() {
  const { userStats } = useGamification();

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-500" />
          الدورات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-500">
            <AnimatedCounter value={userStats.completedCourses} />
          </div>
          <div className="text-sm text-gray-600">دورات مكتملة</div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">الدورات المنجزة</span>
            <span className="font-medium"><AnimatedCounter value={userStats.completedCourses} /></span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">نقاط الخبرة</span>
            <span className="font-medium"><AnimatedCounter value={userStats.completedCourses * 100} /></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Achievements Progress Component
export function AchievementsProgress() {
  const { userStats } = useGamification();
  const totalAchievements = 12; // Total number of achievements available
  const unlockedCount = userStats.achievements.length;
  const percentage = (unlockedCount / totalAchievements) * 100;

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-500" />
          الإنجازات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-purple-500">
              <AnimatedCounter value={unlockedCount} />
            </div>
            <div className="text-sm text-gray-600">إنجازات مفتوحة</div>
          </div>
          <ProgressCircle
            value={unlockedCount}
            max={totalAchievements}
            size={80}
            color="#8b5cf6"
            showPercentage={false}
          />
        </div>
        <div className="text-center text-sm text-gray-500">
          <AnimatedCounter value={Math.round(percentage)} suffix="% من الإنجازات" />
        </div>
      </CardContent>
    </Card>
  );
}

// Weekly Activity Component
export function WeeklyActivity() {
  const { userStats } = useGamification();
  
  // Simulate weekly data (in real app, this would come from actual data)
  const weeklyData = [
    { day: 'الأحد', hours: 2 },
    { day: 'الإثنين', hours: 3 },
    { day: 'الثلاثاء', hours: 1 },
    { day: 'الأربعاء', hours: 4 },
    { day: 'الخميس', hours: 2 },
    { day: 'الجمعة', hours: 3 },
    { day: 'السبت', hours: 5 },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          النشاط الأسبوعي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {weeklyData.map((day, index) => (
            <div key={day.day} className="flex items-center gap-3">
              <div className="w-12 text-sm text-gray-600 text-right">{day.day}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                <motion.div
                  className="bg-indigo-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(day.hours / maxHours) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
              <div className="w-8 text-sm font-medium text-left">
                <AnimatedCounter value={day.hours} suffix="h" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Overall Progress Dashboard
export function ProgressDashboard() {
  const { userStats } = useGamification();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LevelProgress />
        <StudyStreak />
        <StudyTime />
        <CourseProgress />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AchievementsProgress />
        <WeeklyActivity />
      </div>

      {/* Stats Overview */}
      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            نظرة عامة على التقدم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">
                <AnimatedCounter value={userStats.level} />
              </div>
              <div className="text-sm text-gray-600">المستوى</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                <AnimatedCounter value={userStats.totalPoints} />
              </div>
              <div className="text-sm text-gray-600">النقاط الإجمالية</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                <AnimatedCounter value={userStats.currentStreak} />
              </div>
              <div className="text-sm text-gray-600">سلسلة الحضور</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">
                <AnimatedCounter value={userStats.achievements.length} />
              </div>
              <div className="text-sm text-gray-600">الإنجازات</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
