'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Star, 
  BookOpen, 
  Users, 
  Target, 
  Award,
  Lightbulb,
  Zap,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Settings
} from 'lucide-react';
import { useGamification } from '@/components/providers/GamificationProvider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimatedWrapper, StaggerContainer, StaggerItem } from '@/components/ui/Animations';

// User behavior tracking interface
interface UserBehavior {
  courseViews: string[];
  completedLessons: string[];
  timeSpent: Record<string, number>;
  preferredCategories: string[];
  difficultyPreference: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  studySchedule: Record<string, number>;
  interactionPattern: 'sequential' | 'random' | 'goal-oriented';
  socialEngagement: number;
  devicePreference: 'mobile' | 'desktop' | 'tablet';
}

// Recommendation interface
interface Recommendation {
  id: string;
  type: 'course' | 'lesson' | 'quiz' | 'project' | 'study_group' | 'resource';
  title: string;
  description: string;
  reason: string;
  confidence: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  rating: number;
  enrolledCount: number;
  tags: string[];
  prerequisites?: string[];
  benefits: string[];
  image?: string;
  instructor?: string;
  price?: string;
  progress?: number;
}

// Smart Recommendations Engine
class RecommendationEngine {
  private userBehavior: UserBehavior;
  private allContent: any[];

  constructor(userBehavior: UserBehavior, allContent: any[]) {
    this.userBehavior = userBehavior;
    this.allContent = allContent;
  }

  // Calculate content similarity based on user preferences
  calculateSimilarity(content: any): number {
    let score = 0;

    // Category matching
    if (this.userBehavior.preferredCategories.includes(content.category)) {
      score += 0.3;
    }

    // Difficulty matching
    if (content.difficulty === this.userBehavior.difficultyPreference) {
      score += 0.2;
    }

    // Learning style matching
    if (content.learningStyle?.includes(this.userBehavior.learningStyle)) {
      score += 0.15;
    }

    // Time preference matching
    if (this.matchesTimePreference(content.estimatedTime)) {
      score += 0.1;
    }

    // Social proof
    score += (content.rating / 5) * 0.15;
    score += Math.min(content.enrolledCount / 1000, 1) * 0.1;

    return Math.min(score, 1);
  }

  // Check if content matches user's time preference
  private matchesTimePreference(estimatedTime: string): boolean {
    const time = parseInt(estimatedTime);
    const preferredTime = this.getPreferredStudyTime();
    return Math.abs(time - preferredTime) <= 30; // Within 30 minutes
  }

  // Get user's preferred study time based on schedule
  private getPreferredStudyTime(): number {
    const schedule = this.userBehavior.studySchedule;
    const avgTime = Object.values(schedule).reduce((a, b) => a + b, 0) / Object.keys(schedule).length;
    return avgTime;
  }

  // Generate recommendations based on collaborative filtering
  generateCollaborativeRecommendations(): Recommendation[] {
    // Find similar users based on behavior
    const similarUsers = this.findSimilarUsers();
    const recommendations: Recommendation[] = [];

    similarUsers.forEach(user => {
      user.completedContent.forEach((content: any) => {
          if (!this.userBehavior.completedLessons.includes(content.id)) {
            recommendations.push({
              id: content.id,
              type: 'course' as const,
              title: content.title,
              description: content.description || '',
              reason: 'الطلاب الذين شبهك أكملوا هذا الدورة',
              confidence: 0.7,
              category: content.category || '',
              difficulty: 'intermediate' as const,
              estimatedTime: '3 ساعات',
              rating: 4.5,
              enrolledCount: 500,
              tags: [],
              benefits: [],
            });
          }
        });
    });

    return recommendations.slice(0, 5);
  }

  // Generate content-based recommendations
  generateContentBasedRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];

    this.allContent.forEach(content => {
      if (!this.userBehavior.courseViews.includes(content.id)) {
        const similarity = this.calculateSimilarity(content);
        if (similarity > 0.5) {
          recommendations.push({
            ...content,
            type: 'course',
            reason: this.generateReason(content, similarity),
            confidence: similarity,
          });
        }
      }
    });

    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 10);
  }

  // Generate personalized reason for recommendation
  private generateReason(content: any, similarity: number): string {
    const reasons = [];

    if (this.userBehavior.preferredCategories.includes(content.category)) {
      reasons.push(`بناءً على اهتمامك بـ ${content.category}`);
    }

    if (content.difficulty === this.userBehavior.difficultyPreference) {
      reasons.push(`مستوى ${content.difficulty} يناسبك`);
    }

    if (content.rating >= 4.5) {
      reasons.push('تقييمات عالية من الطلاب');
    }

    if (content.enrolledCount > 500) {
      reasons.push('شعبي جداً');
    }

    return reasons.join(' • ') || 'موصى به لك';
  }

  // Find similar users (simplified for demo)
  private findSimilarUsers() {
    // In real implementation, this would use ML algorithms
    return [
      {
        completedContent: [
          { id: 'react-advanced', title: 'React المتقدم', category: 'البرمجة' },
          { id: 'typescript-basics', title: 'TypeScript أساسيات', category: 'البرمجة' },
        ],
      },
    ];
  }

  // Generate learning path recommendations
  generateLearningPathRecommendations(): Recommendation[] {
    const paths = [
      {
        id: 'full-stack-path',
        title: 'مسار التطوير الكامل',
        description: 'من الواجهة الأمامية إلى الخلفية',
        reason: 'بناءً على تقدمك في البرمجة',
        confidence: 0.85,
        type: 'course' as const,
        category: 'البرمجة',
        difficulty: 'intermediate' as const,
        estimatedTime: '40 ساعة',
        rating: 4.8,
        enrolledCount: 2500,
        tags: ['React', 'Node.js', 'MongoDB'],
        benefits: ['مهارات مطلوبة في السوق', 'مشروع واقعي', 'شهادة معتمدة'],
      },
      {
        id: 'ui-ux-path',
        title: 'مسار تصميم الواجهات',
        description: 'من التصميم إلى التطبيق',
        reason: 'يكمل مهاراتك في البرمجة',
        confidence: 0.75,
        type: 'course' as const,
        category: 'التصميم',
        difficulty: 'beginner' as const,
        estimatedTime: '25 ساعة',
        rating: 4.6,
        enrolledCount: 1800,
        tags: ['Figma', 'UI', 'UX'],
        benefits: ['مهارات تصميم', 'مشاريع عملية', 'بناء معرض أعمال'],
      },
    ];

    return paths;
  }

  // Generate study group recommendations
  generateStudyGroupRecommendations(): Recommendation[] {
    return [
      {
        id: 'react-study-group',
        title: 'مجموعة React الدراسية',
        description: 'نتعلم React معاً',
        reason: 'بناءً على اهتمامك بـ React',
        confidence: 0.9,
        type: 'study_group',
        category: 'البرمجة',
        difficulty: 'intermediate',
        estimatedTime: '2 ساعة أسبوعياً',
        rating: 4.7,
        enrolledCount: 45,
        tags: ['React', 'مجموعة', 'تعاون'],
        benefits: ['تعلم جماعي', 'مشاريع مشتركة', 'شبكة علاقات'],
      },
    ];
  }
}

// Mock data for demonstration
const mockContent = [
  {
    id: 'react-hooks',
    title: 'React Hooks المتقدم',
    description: 'تعلم Hooks بعمق',
    category: 'البرمجة',
    difficulty: 'intermediate',
    estimatedTime: '4 ساعات',
    rating: 4.8,
    enrolledCount: 1200,
    learningStyle: ['visual', 'kinesthetic'],
    tags: ['React', 'Hooks', 'JavaScript'],
  },
  {
    id: 'next-js',
    title: 'Next.js من الصفر',
    description: 'بناء تطبيقات ويب حديثة',
    category: 'البرمجة',
    difficulty: 'intermediate',
    estimatedTime: '6 ساعات',
    rating: 4.7,
    enrolledCount: 800,
    learningStyle: ['visual', 'reading'],
    tags: ['Next.js', 'React', 'SSR'],
  },
  {
    id: 'typescript',
    title: 'TypeScript مع React',
    description: 'إضافة الأمان النوعي لـ React',
    category: 'البرمجة',
    difficulty: 'advanced',
    estimatedTime: '5 ساعات',
    rating: 4.9,
    enrolledCount: 600,
    learningStyle: ['reading', 'visual'],
    tags: ['TypeScript', 'React', 'Types'],
  },
];

// Smart Recommendations Component
export function SmartRecommendations() {
  const { userStats } = useGamification();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    courseViews: ['react-basics', 'javascript-fundamentals'],
    completedLessons: ['html-css', 'javascript-basics'],
    timeSpent: { 'react-basics': 180, 'javascript-fundamentals': 120 },
    preferredCategories: ['البرمجة', 'التصميم'],
    difficultyPreference: 'intermediate',
    learningStyle: 'visual',
    studySchedule: { 'morning': 60, 'evening': 90 },
    interactionPattern: 'sequential',
    socialEngagement: 0.7,
    devicePreference: 'desktop',
  });
  const [feedback, setFeedback] = useState<Record<string, 'like' | 'dislike'>>({});

  useEffect(() => {
    const engine = new RecommendationEngine(userBehavior, mockContent);
    
    const contentBased = engine.generateContentBasedRecommendations();
    const collaborative = engine.generateCollaborativeRecommendations();
    const learningPaths = engine.generateLearningPathRecommendations();
    const studyGroups = engine.generateStudyGroupRecommendations();

    const allRecommendations = [
      ...contentBased.slice(0, 3),
      ...learningPaths.slice(0, 2),
      ...studyGroups.slice(0, 1),
      ...collaborative.slice(0, 2),
    ];

    setRecommendations(allRecommendations);
  }, [userBehavior]);

  const handleFeedback = (recommendationId: string, type: 'like' | 'dislike') => {
    setFeedback(prev => ({ ...prev, [recommendationId]: type }));
    
    // Update user behavior based on feedback
    if (type === 'like') {
      const recommendation = recommendations.find(r => r.id === recommendationId);
      if (recommendation && !userBehavior.preferredCategories.includes(recommendation.category)) {
        setUserBehavior(prev => ({
          ...prev,
          preferredCategories: [...prev.preferredCategories, recommendation.category],
        }));
      }
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50';
    if (confidence >= 0.6) return 'text-blue-600 bg-blue-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'study_group': return <Users className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'project': return <Award className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            توصيات ذكية لك
          </h2>
          <p className="text-gray-600">مخصصة بناءً على سلوكك وأهدافك التعليمية</p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 ml-2" />
          إعدادات التوصيات
        </Button>
      </div>

      {/* Recommendations Grid */}
      <StaggerContainer staggerDelay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation) => (
            <StaggerItem key={recommendation.id}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      {getTypeIcon(recommendation.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {recommendation.title}
                      </h3>
                      <p className="text-sm text-gray-500">{recommendation.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(recommendation.confidence)}`}>
                    {Math.round(recommendation.confidence * 100)}% تطابق
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{recommendation.description}</p>

                {/* Reason */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-blue-700 text-sm">
                    <Lightbulb className="w-4 h-4" />
                    <span>{recommendation.reason}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {recommendation.rating}
                    </span>
                    <span>{recommendation.enrolledCount} طالب</span>
                    <span>{recommendation.estimatedTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {recommendation.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Benefits */}
                {recommendation.benefits && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">الفوائد:</div>
                    <ul className="space-y-1">
                      {recommendation.benefits.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="flex-1">
                      ابدأ الآن
                      <ArrowRight className="w-3 h-3 mr-1" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-6 w-6 ${feedback[recommendation.id] === 'like' ? 'text-green-600' : 'text-gray-400'}`}
                      onClick={() => handleFeedback(recommendation.id, 'like')}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-6 w-6 ${feedback[recommendation.id] === 'dislike' ? 'text-red-600' : 'text-gray-400'}`}
                      onClick={() => handleFeedback(recommendation.id, 'dislike')}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      {/* Learning Insights */}
      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            رؤى التعلم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">87%</div>
              <div className="text-sm text-gray-600">دقة التوصيات</div>
              <div className="text-xs text-gray-500 mt-1">بناءً على تفاعلك</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">توصيات جديدة</div>
              <div className="text-xs text-gray-500 mt-1">هذا الأسبوع</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600">متوسط التقييم</div>
              <div className="text-xs text-gray-500 mt-1">للمحتوى المقترح</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
