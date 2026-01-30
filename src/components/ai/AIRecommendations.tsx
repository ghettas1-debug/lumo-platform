// AI Content Recommendations Component
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Star, 
  BookOpen, 
  Target,
  Lightbulb,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ContentRecommendation {
  id: string;
  title: string;
  type: 'course' | 'video' | 'quiz' | 'article';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  rating: number;
  reason: string;
  matchScore: number;
}

interface AIRecommendationsProps {
  userProgress?: any;
  userInterests?: string[];
  learningStyle?: string;
}

export function AIRecommendations({ 
  userProgress, 
  userInterests = [], 
  learningStyle = 'visual' 
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Generate AI-based recommendations
  useEffect(() => {
    const generateRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockRecommendations: ContentRecommendation[] = [
        {
          id: '1',
          title: 'JavaScript المتقدم: البرمجة غير المتزامنة',
          type: 'course',
          category: 'برمجة',
          difficulty: 'advanced',
          estimatedTime: 120,
          rating: 4.8,
          reason: 'بناءً على تقدمك في JavaScript الأساسي',
          matchScore: 95
        },
        {
          id: '2',
          title: 'تقنيات حل المشكلات في الرياضيات',
          type: 'video',
          category: 'رياضيات',
          difficulty: 'intermediate',
          estimatedTime: 45,
          rating: 4.6,
          reason: 'لتحسين مهاراتك في التحليل المنطقي',
          matchScore: 88
        },
        {
          id: '3',
          title: 'اختبار: مفاهيم البرمجة الكائنية',
          type: 'quiz',
          category: 'برمجة',
          difficulty: 'intermediate',
          estimatedTime: 30,
          rating: 4.7,
          reason: 'لتقييم فهمك للمفاهيم المتقدمة',
          matchScore: 82
        },
        {
          id: '4',
          title: 'مقدمة في الذكاء الاصطناعي',
          type: 'article',
          category: 'تقنية',
          difficulty: 'beginner',
          estimatedTime: 15,
          rating: 4.9,
          reason: 'مجال جديد يتناسب مع اهتماماتك التقنية',
          matchScore: 78
        },
        {
          id: '5',
          title: 'تصميم واجهات المستخدم التفاعلية',
          type: 'course',
          category: 'تصميم',
          difficulty: 'intermediate',
          estimatedTime: 90,
          rating: 4.5,
          reason: 'يكمل مهاراتك في تطوير الويب',
          matchScore: 75
        }
      ];

      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };

    generateRecommendations();
  }, [userProgress, userInterests, learningStyle]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen size={16} />;
      case 'video': return <Target size={16} />;
      case 'quiz': return <Star size={16} />;
      case 'article': return <Lightbulb size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-600';
      case 'video': return 'bg-purple-100 text-purple-600';
      case 'quiz': return 'bg-green-100 text-green-600';
      case 'article': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-50 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(recommendations.map(rec => rec.category)))];

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold">توصيات ذكية لك</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Brain className="text-blue-600" size={24} />
            <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold">توصيات ذكية لك</h2>
            <p className="text-sm text-gray-600">مخصصة بناءً على تقدمك واهتماماتك</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp size={16} />
          <span>دقة عالية</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'الكل' : category}
          </button>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {filteredRecommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              {/* Type Icon */}
              <div className={`p-2 rounded-lg ${getTypeColor(recommendation.type)}`}>
                {getTypeIcon(recommendation.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {recommendation.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{recommendation.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span>{recommendation.rating}</span>
                    </div>
                    <div className="text-sm font-bold text-blue-600">
                      {recommendation.matchScore}%
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className={`px-2 py-1 rounded-lg border ${getDifficultyColor(recommendation.difficulty)}`}>
                    {recommendation.difficulty === 'beginner' ? 'مبتدئ' : 
                     recommendation.difficulty === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{recommendation.estimatedTime} دقيقة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} />
                    <span>{recommendation.category}</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={20} className="text-blue-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-medium">نصيحة ذكية:</span> هذه التوصيات مخصصة لك بناءً على نمط تعلمك ({learningStyle})
          </p>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            تحديث التوصيات
          </button>
        </div>
      </div>
    </div>
  );
}

// AI Learning Insights Component
export function AILearningInsights({ userProgress }: { userProgress: any }) {
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    const generateInsights = async () => {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockInsights = [
        'أنت تتعلم بشكل أفضل في الصباح (9-11 ص)، حاول جدولة الدراسة الهامة في هذا الوقت',
        'معدل احتفاظك بالمعلومات يزداد عند الممارسة العملية، أضف تمارين أكثر لروتينك',
        'أظهرت أداءً ممتازًا في المواد البصرية، استخدم الفيديوهات والمخططات أكثر',
        'فترات الدراسة القصيرة (25 دقيقة) أكثر فعالية لك من الجلسات الطويلة',
        'تحسين ملحوظ في حل المشكلات المنطقية خلال الشهر الماضي'
      ];

      setInsights(mockInsights);
    };

    generateInsights();
  }, [userProgress]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="text-purple-600" size={20} />
        <h3 className="font-bold text-gray-900">رؤى تعليمية ذكية</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 p-3 bg-white/70 rounded-lg"
          >
            <Lightbulb className="text-yellow-500 shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-gray-700">{insight}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
