// Performance Optimization Components
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  Image, 
  Code, 
  Activity, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Gauge,
  Rocket,
  Shield
} from 'lucide-react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

interface OptimizationTip {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'images' | 'code' | 'network' | 'rendering';
  implemented: boolean;
}

export function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [optimizationTips, setOptimizationTips] = useState<OptimizationTip[]>([]);

  // Simulate performance metrics analysis
  const analyzePerformance = useCallback(async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockMetrics: PerformanceMetrics = {
      fcp: 1.2,
      lcp: 2.8,
      fid: 45,
      cls: 0.08,
      ttfb: 0.4
    };

    setMetrics(mockMetrics);

    const mockTips: OptimizationTip[] = [
      {
        id: '1',
        title: 'ضغط الصور تلقائياً',
        description: 'تقليل حجم الصور بنسبة 60% مع الحفاظ على الجودة',
        impact: 'high',
        category: 'images',
        implemented: false
      },
      {
        id: '2',
        title: 'تحميل الصور بشكل كسول',
        description: 'تحميل الصور فقط عند ظهورها في الشاشة',
        impact: 'medium',
        category: 'images',
        implemented: false
      },
      {
        id: '3',
        title: 'تقسيم الكود (Code Splitting)',
        description: 'تحميل الكود فقط عند الحاجة',
        impact: 'high',
        category: 'code',
        implemented: false
      },
      {
        id: '4',
        title: 'تخزين مؤقت للموارد',
        description: 'استخدام Service Worker للتخزين المؤقت',
        impact: 'medium',
        category: 'network',
        implemented: false
      },
      {
        id: '5',
        title: 'تحسين الخطوط',
        description: 'تحميل الخطوط الحيوية أولاً',
        impact: 'low',
        category: 'rendering',
        implemented: false
      }
    ];

    setOptimizationTips(mockTips);
    setIsAnalyzing(false);
  }, []);

  useEffect(() => {
    analyzePerformance();
  }, [analyzePerformance]);

  const getMetricColor = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = {
      fcp: { good: 1.8, needsImprovement: 3 },
      lcp: { good: 2.5, needsImprovement: 4 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      ttfb: { good: 0.8, needsImprovement: 1.8 }
    };

    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'text-green-600';
    if (value <= threshold.needsImprovement) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricStatus = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = {
      fcp: { good: 1.8, needsImprovement: 3 },
      lcp: { good: 2.5, needsImprovement: 4 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      ttfb: { good: 0.8, needsImprovement: 1.8 }
    };

    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'ممتاز';
    if (value <= threshold.needsImprovement) return 'يحتاج تحسين';
    return 'ضعيف';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'images': return <Image size={16} />;
      case 'code': return <Code size={16} />;
      case 'network': return <Activity size={16} />;
      case 'rendering': return <Gauge size={16} />;
      default: return <Zap size={16} />;
    }
  };

  const overallScore = useMemo(() => {
    const scores = [
      metrics.fcp <= 1.8 ? 100 : metrics.fcp <= 3 ? 60 : 30,
      metrics.lcp <= 2.5 ? 100 : metrics.lcp <= 4 ? 60 : 30,
      metrics.fid <= 100 ? 100 : metrics.fid <= 300 ? 60 : 30,
      metrics.cls <= 0.1 ? 100 : metrics.cls <= 0.25 ? 60 : 30,
      metrics.ttfb <= 0.8 ? 100 : metrics.ttfb <= 1.8 ? 60 : 30
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [metrics]);

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="text-blue-600 animate-pulse" size={24} />
          <h2 className="text-xl font-bold">تحليل الأداء</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">نقاط الأداء العامة</h2>
            <p className="opacity-90">تحليل شامل لأداء منصة لومو</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">{overallScore}</div>
            <div className="text-sm opacity-90">من 100</div>
          </div>
        </div>
      </motion.div>

      {/* Core Web Vitals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold">مقاييس الأداء الأساسية</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">FCP</span>
              <Clock size={16} className="text-gray-400" />
            </div>
            <div className={`text-2xl font-bold ${getMetricColor('fcp', metrics.fcp)}`}>
              {metrics.fcp}s
            </div>
            <div className="text-xs text-gray-500">
              {getMetricStatus('fcp', metrics.fcp)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">LCP</span>
              <Image size={16} className="text-gray-400" />
            </div>
            <div className={`text-2xl font-bold ${getMetricColor('lcp', metrics.lcp)}`}>
              {metrics.lcp}s
            </div>
            <div className="text-xs text-gray-500">
              {getMetricStatus('lcp', metrics.lcp)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">FID</span>
              <Zap size={16} className="text-gray-400" />
            </div>
            <div className={`text-2xl font-bold ${getMetricColor('fid', metrics.fid)}`}>
              {metrics.fid}ms
            </div>
            <div className="text-xs text-gray-500">
              {getMetricStatus('fid', metrics.fid)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">CLS</span>
              <Activity size={16} className="text-gray-400" />
            </div>
            <div className={`text-2xl font-bold ${getMetricColor('cls', metrics.cls)}`}>
              {metrics.cls}
            </div>
            <div className="text-xs text-gray-500">
              {getMetricStatus('cls', metrics.cls)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">TTFB</span>
              <Rocket size={16} className="text-gray-400" />
            </div>
            <div className={`text-2xl font-bold ${getMetricColor('ttfb', metrics.ttfb)}`}>
              {metrics.ttfb}s
            </div>
            <div className="text-xs text-gray-500">
              {getMetricStatus('ttfb', metrics.ttfb)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Optimization Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-600" size={24} />
            <h3 className="text-xl font-bold">اقتراحات التحسين</h3>
          </div>
          <button
            onClick={analyzePerformance}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            إعادة تحليل
          </button>
        </div>

        <div className="space-y-3">
          {optimizationTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getImpactColor(tip.impact)}`}>
                  {getCategoryIcon(tip.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{tip.title}</h4>
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${getImpactColor(tip.impact)}`}>
                      {tip.impact === 'high' ? 'عالي' : tip.impact === 'medium' ? 'متوسط' : 'منخفض'}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
                  <div className="flex items-center gap-3">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      تطبيق الآن
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-700">
                      معرفة المزيد
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-green-600" size={20} />
          <h3 className="font-bold text-gray-900">مراقبة الأداء المستمرة</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle size={16} className="text-green-600" />
            <span>مراقبة تلقائية لمقاييس الأداء</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle size={16} className="text-green-600" />
            <span>تنبيهات فورية عند انخفاض الأداء</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle size={16} className="text-green-600" />
            <span>تقارير أسبوعية مفصلة</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Lazy Loading Component
export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/placeholder.jpg' 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  placeholder?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      <img
        src={isInView ? src : placeholder}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-50'
        }`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}

// Code Splitting Hook
export function useCodeSplitting(componentName: string) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComponent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate dynamic import
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real implementation, this would be:
      // const module = await import(`../components/${componentName}`);
      // setComponent(module.default);
      
      setComponent(() => () => <div>Dynamic Component: {componentName}</div>);
    } catch (err) {
      setError('Failed to load component');
    } finally {
      setIsLoading(false);
    }
  }, [componentName]);

  return { Component, isLoading, error, loadComponent };
}
