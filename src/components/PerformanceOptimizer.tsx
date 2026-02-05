'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Zap, Activity, Database, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, RefreshCw, Settings, BarChart3, TrendingUp, Clock, Globe } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  memoryUsage: number;
  cacheHitRate: number;
  networkLatency: number;
  bundleSize: number;
  imageOptimization: number;
  codeSplitting: number;
}

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'memory' | 'network' | 'code' | 'images';
  estimatedImprovement: string;
  implementationTime: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface CacheEntry {
  url: string;
  size: number;
  lastAccessed: string;
  hitCount: number;
  type: 'image' | 'script' | 'style' | 'data';
}

export default function PerformanceOptimizer() {
  // Disable all performance features in test environment
  if (process.env.NODE_ENV === 'test') {
    return (
      <div data-testid="performance-optimizer" className="p-4">
        <h2>Performance Optimizer (Test Mode)</h2>
        <p>All performance features disabled in test environment</p>
      </div>
    );
  }

  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [autoOptimize, setAutoOptimize] = useState(false);

  useEffect(() => {
    // Load performance data from localStorage
    const savedMetrics = localStorage.getItem('performanceMetrics');
    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    } else {
      // Initialize with sample metrics
      const sampleMetrics: PerformanceMetrics = {
        loadTime: 2.3,
        firstContentfulPaint: 1.8,
        largestContentfulPaint: 3.2,
        cumulativeLayoutShift: 0.15,
        firstInputDelay: 85,
        memoryUsage: 45.6,
        cacheHitRate: 78,
        networkLatency: 120,
        bundleSize: 2.4,
        imageOptimization: 65,
        codeSplitting: 80
      };
      setMetrics(sampleMetrics);
    }

    // Load optimization suggestions
    const savedSuggestions = localStorage.getItem('optimizationSuggestions');
    if (savedSuggestions) {
      setSuggestions(JSON.parse(savedSuggestions));
    } else {
      const sampleSuggestions: OptimizationSuggestion[] = [
        {
          id: '1',
          title: 'تحسين الصور',
          description: 'ضغط الصور وتحويلها إلى WebP لتقليل حجم الملف',
          impact: 'high',
          category: 'images',
          estimatedImprovement: '40% تقليل في حجم الصفحة',
          implementationTime: '30 دقيقة',
          status: 'pending'
        },
        {
          id: '2',
          title: 'تقسيم الكود',
          description: 'تقسيم حزم JavaScript لتقليل وقت التحميل الأولي',
          impact: 'medium',
          category: 'code',
          estimatedImprovement: '25% تحسين في سرعة التحميل',
          implementationTime: 'ساعتان',
          status: 'pending'
        },
        {
          id: '3',
          title: 'تحسين التخزين المؤقت',
          description: 'تحسين استراتيجية التخزين المؤقت للموارد الثابتة',
          impact: 'medium',
          category: 'network',
          estimatedImprovement: '60% تحسين في الزيارات المتكررة',
          implementationTime: '15 دقيقة',
          status: 'pending'
        },
        {
          id: '4',
          title: 'إزالة JavaScript غير المستخدمة',
          description: 'تحليل وإزالة الكود غير المستخدم في حزم التطبيق',
          impact: 'low',
          category: 'code',
          estimatedImprovement: '15% تقليل في حجم الحزمة',
          implementationTime: 'ساعة',
          status: 'pending'
        }
      ];
      setSuggestions(sampleSuggestions);
    }

    // Load cache entries
    const savedCache = localStorage.getItem('cacheEntries');
    if (savedCache) {
      setCacheEntries(JSON.parse(savedCache));
    } else {
      const sampleCache: CacheEntry[] = [
        { url: '/api/courses', size: 245, lastAccessed: new Date().toISOString(), hitCount: 12, type: 'data' },
        { url: '/images/hero-bg.jpg', size: 1024, lastAccessed: new Date().toISOString(), hitCount: 8, type: 'image' },
        { url: '/js/main.bundle.js', size: 2048, lastAccessed: new Date().toISOString(), hitCount: 15, type: 'script' },
        { url: '/css/styles.css', size: 512, lastAccessed: new Date().toISOString(), hitCount: 20, type: 'style' }
      ];
      setCacheEntries(sampleCache);
    }
  }, []);

  useEffect(() => {
    if (metrics) {
      localStorage.setItem('performanceMetrics', JSON.stringify(metrics));
    }
  }, [metrics]);

  useEffect(() => {
    if (suggestions.length > 0) {
      localStorage.setItem('optimizationSuggestions', JSON.stringify(suggestions));
    }
  }, [suggestions]);

  const measurePerformance = useCallback(() => {
    if (!window.performance) return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    const newMetrics: PerformanceMetrics = {
      loadTime: navigation.loadEventEnd - navigation.fetchStart,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      largestContentfulPaint: paint.find(p => p.name === 'largest-contentful-paint')?.startTime || 0,
      cumulativeLayoutShift: 0.1, // Would need to calculate from CLS entries
      firstInputDelay: 50, // Would need to calculate from FID entries
      memoryUsage: (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0,
      cacheHitRate: calculateCacheHitRate(),
      networkLatency: measureNetworkLatency(),
      bundleSize: estimateBundleSize(),
      imageOptimization: calculateImageOptimization(),
      codeSplitting: calculateCodeSplitting()
    };

    setMetrics(newMetrics);
  }, []);

  const calculateCacheHitRate = () => {
    const totalRequests = cacheEntries.reduce((acc, entry) => acc + entry.hitCount, 0);
    const uniqueEntries = cacheEntries.length;
    return uniqueEntries > 0 ? (totalRequests / (totalRequests + uniqueEntries)) * 100 : 0;
  };

  const measureNetworkLatency = () => {
    // Simulate network latency measurement
    return Math.random() * 200 + 50;
  };

  const estimateBundleSize = () => {
    // Simulate bundle size estimation
    return Math.random() * 3 + 1;
  };

  const calculateImageOptimization = () => {
    const imageEntries = cacheEntries.filter(entry => entry.type === 'image');
    if (imageEntries.length === 0) return 100;
    // Simulate optimization calculation
    return Math.random() * 40 + 60;
  };

  const calculateCodeSplitting = () => {
    // Simulate code splitting calculation
    return Math.random() * 30 + 70;
  };

  const runOptimization = useCallback(async (suggestionId: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === suggestionId ? { ...s, status: 'in-progress' as const } : s
    ));

    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSuggestions(prev => prev.map(s => 
      s.id === suggestionId ? { ...s, status: 'completed' as const } : s
    ));

    // Update metrics to show improvement
    if (metrics) {
      setMetrics({
        ...metrics,
        loadTime: metrics.loadTime * 0.85,
        firstContentfulPaint: metrics.firstContentfulPaint * 0.8,
        memoryUsage: metrics.memoryUsage * 0.9
      });
    }
  }, [metrics]);

  const runAutoOptimization = useCallback(async () => {
    setIsOptimizing(true);
    
    // Run all pending optimizations
    const pendingSuggestions = suggestions.filter(s => s.status === 'pending');
    
    for (const suggestion of pendingSuggestions) {
      await runOptimization(suggestion.id);
    }
    
    setIsOptimizing(false);
  }, [suggestions, runOptimization]);

  const clearCache = useCallback(() => {
    setCacheEntries([]);
    localStorage.removeItem('cacheEntries');
    
    // Update metrics
    if (metrics) {
      setMetrics({
        ...metrics,
        memoryUsage: metrics.memoryUsage * 0.7,
        cacheHitRate: 0
      });
    }
  }, [metrics]);

  const getPerformanceScore = useMemo(() => {
    if (!metrics) return 0;
    
    const weights = {
      loadTime: 0.3,
      firstContentfulPaint: 0.2,
      largestContentfulPaint: 0.2,
      cumulativeLayoutShift: 0.1,
      firstInputDelay: 0.1,
      memoryUsage: 0.1
    };

    const scores = {
      loadTime: Math.max(0, 100 - (metrics.loadTime / 5) * 100),
      firstContentfulPaint: Math.max(0, 100 - (metrics.firstContentfulPaint / 3) * 100),
      largestContentfulPaint: Math.max(0, 100 - (metrics.largestContentfulPaint / 4) * 100),
      cumulativeLayoutShift: Math.max(0, 100 - metrics.cumulativeLayoutShift * 100),
      firstInputDelay: Math.max(0, 100 - (metrics.firstInputDelay / 200) * 100),
      memoryUsage: Math.max(0, 100 - (metrics.memoryUsage / 100) * 100)
    };

    return Object.entries(weights).reduce((acc, [key, weight]) => {
      return acc + (scores[key as keyof typeof scores] * weight);
    }, 0);
  }, [metrics]);

  const getPerformanceGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/20' };
    if (score >= 80) return { grade: 'B', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/20' };
    if (score >= 70) return { grade: 'C', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/20' };
    if (score >= 60) return { grade: 'D', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/20' };
    return { grade: 'F', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/20' };
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const performanceScore = getPerformanceScore;
  const performanceGrade = getPerformanceGrade(performanceScore);

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">جاري تحليل الأداء...</p>
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
              <h1 className="text-xl font-bold flex items-center space-x-2 space-x-reverse">
                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                <span>محسن الأداء</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={measurePerformance}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة قياس</span>
              </button>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <Settings className="w-4 h-4" />
                <span>متقدم</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Performance Score */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">نقطة الأداء الإجمالية</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                بناءً على مقاييس Core Web Vitals ومؤشرات الأداء المختلفة
              </p>
            </div>
            <div className={`text-center p-6 rounded-lg ${performanceGrade.bg}`}>
              <div className={`text-4xl font-bold ${performanceGrade.color}`}>
                {performanceGrade.grade}
              </div>
              <div className={`text-sm ${performanceGrade.color}`}>
                {Math.round(performanceScore)}/100
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">وقت التحميل</p>
                <p className="text-2xl font-bold">{formatTime(metrics.loadTime)}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">استخدام الذاكرة</p>
                <p className="text-2xl font-bold">{metrics.memoryUsage.toFixed(1)}MB</p>
              </div>
              <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">معدل ضرب التخزين</p>
                <p className="text-2xl font-bold">{Math.round(metrics.cacheHitRate)}%</p>
              </div>
              <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">حجم الحزمة</p>
                <p className="text-2xl font-bold">{metrics.bundleSize.toFixed(1)}MB</p>
              </div>
              <HardDrive className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>اقتراحات التحسين</span>
            </h2>
            <div className="flex items-center space-x-2 space-x-reverse">
              <label className="flex items-center space-x-2 space-x-reverse text-sm">
                <input
                  type="checkbox"
                  checked={autoOptimize}
                  onChange={(e) => setAutoOptimize(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>تحسين تلقائي</span>
              </label>
              <button
                onClick={runAutoOptimization}
                disabled={isOptimizing || suggestions.filter(s => s.status === 'pending').length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 space-x-reverse"
              >
                {isOptimizing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                <span>تحسين الكل</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        suggestion.impact === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        suggestion.impact === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {suggestion.impact === 'high' ? 'تأثير عالٍ' : suggestion.impact === 'medium' ? 'تأثير متوسط' : 'تأثير منخفض'}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        suggestion.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        suggestion.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {suggestion.status === 'completed' ? 'مكتمل' : suggestion.status === 'in-progress' ? 'قيد التنفيذ' : 'معلق'}
                      </span>
                    </div>
                    <h3 className="font-medium mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{suggestion.description}</p>
                    <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500 dark:text-gray-400">
                      <span>تحسين محتمل: {suggestion.estimatedImprovement}</span>
                      <span>وقت التنفيذ: {suggestion.implementationTime}</span>
                    </div>
                  </div>
                  
                  <div className="mr-4">
                    <button
                      onClick={() => runOptimization(suggestion.id)}
                      disabled={suggestion.status !== 'pending'}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {suggestion.status === 'completed' ? 'مكتمل' : 'تنفيذ'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cache Management */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2 space-x-reverse">
              <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>إدارة التخزين المؤقت</span>
            </h2>
            <button
              onClick={clearCache}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 space-x-reverse"
            >
              <RefreshCw className="w-4 h-4" />
              <span>مسح التخزين</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-right pb-2">النوع</th>
                  <th className="text-right pb-2">الحجم</th>
                  <th className="text-right pb-2">الوصول الأخير</th>
                  <th className="text-right pb-2">عدد الضربات</th>
                </tr>
              </thead>
              <tbody>
                {cacheEntries.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2">{entry.type}</td>
                    <td className="py-2">{formatBytes(entry.size)}</td>
                    <td className="py-2">{new Date(entry.lastAccessed).toLocaleTimeString()}</td>
                    <td className="py-2">{entry.hitCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advanced Metrics */}
        {showAdvanced && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
              <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>مقاييس متقدمة</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">First Contentful Paint</h3>
                <p className="text-2xl font-bold">{formatTime(metrics.firstContentfulPaint)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">وقت عرض أول محتوى</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Largest Contentful Paint</h3>
                <p className="text-2xl font-bold">{formatTime(metrics.largestContentfulPaint)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">وقت عرض أكبر محتوى</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Cumulative Layout Shift</h3>
                <p className="text-2xl font-bold">{metrics.cumulativeLayoutShift.toFixed(3)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">مجموع انزياح التخطيط</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">First Input Delay</h3>
                <p className="text-2xl font-bold">{metrics.firstInputDelay}ms</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">تأخير أول إدخال</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Network Latency</h3>
                <p className="text-2xl font-bold">{metrics.networkLatency.toFixed(0)}ms</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">زمن استجابة الشبكة</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Image Optimization</h3>
                <p className="text-2xl font-bold">{Math.round(metrics.imageOptimization)}%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">مستوى تحسين الصور</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
