// Bundle Size Analyzer
// Analyze and optimize bundle size for better performance

interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: ChunkInfo[];
  largestModules: ModuleInfo[];
  unusedExports: string[];
  duplicateModules: ModuleInfo[];
  optimizationSuggestions: OptimizationSuggestion[];
}

interface ChunkInfo {
  name: string;
  size: number;
  gzippedSize: number;
  modules: ModuleInfo[];
  entry: boolean;
}

interface ModuleInfo {
  name: string;
  size: number;
  path: string;
  type: 'js' | 'css' | 'asset' | 'chunk';
  duplicated: boolean;
}

interface OptimizationSuggestion {
  type: 'code-splitting' | 'tree-shaking' | 'compression' | 'dynamic-import' | 'asset-optimization' | 'dependency-optimization';
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedSavings: number;
  implementation: string;
}

// Mock bundle analysis data (in real app, this would come from webpack-bundle-analyzer)
const mockBundleData: BundleAnalysis = {
  totalSize: 2048576, // 2MB
  gzippedSize: 512000, // 512KB
  chunks: [
    {
      name: 'main',
      size: 1048576,
      gzippedSize: 262144,
      modules: [
        { name: 'react', size: 131072, path: 'node_modules/react/index.js', type: 'js', duplicated: false },
        { name: 'react-dom', size: 524288, path: 'node_modules/react-dom/index.js', type: 'js', duplicated: false },
        { name: 'next', size: 1048576, path: 'node_modules/next/index.js', type: 'js', duplicated: false },
        { name: 'framer-motion', size: 262144, path: 'node_modules/framer-motion/dist/framer-motion.esm.js', type: 'js', duplicated: false },
        { name: 'lucide-react', size: 131072, path: 'node_modules/lucide-react/dist/esm/lucide-react.js', type: 'js', duplicated: false },
      ],
      entry: true
    },
    {
      name: 'pages/_app',
      size: 262144,
      gzippedSize: 65536,
      modules: [
        { name: 'layout', size: 131072, path: 'src/app/layout.tsx', type: 'js', duplicated: false },
        { name: 'error', size: 65536, path: 'src/app/error.tsx', type: 'js', duplicated: false },
        { name: 'not-found', size: 65536, path: 'src/app/not-found.tsx', type: 'js', duplicated: false },
      ],
      entry: false
    },
    {
      name: 'pages/home',
      size: 524288,
      gzippedSize: 131072,
      modules: [
        { name: 'HeroSection', size: 131072, path: 'src/components/features/HeroSection.tsx', type: 'js', duplicated: false },
        { name: 'HomePage', size: 262144, path: 'src/app/page.tsx', type: 'js', duplicated: false },
        { name: 'NotificationSystem', size: 131072, path: 'src/components/ui/NotificationSystem.tsx', type: 'js', duplicated: false },
      ],
      entry: false
    }
  ],
  largestModules: [
    { name: 'next', size: 1048576, path: 'node_modules/next/index.js', type: 'js', duplicated: false },
    { name: 'react', size: 131072, path: 'node_modules/react/index.js', type: 'js', duplicated: false },
    { name: 'lucide-react', size: 131072, path: 'node_modules/lucide-react/dist/esm/lucide-react.js', type: 'js', duplicated: false },
    { name: 'framer-motion', size: 262144, path: 'node_modules/framer-motion/dist/framer-motion.esm.js', type: 'js', duplicated: false },
    { name: 'react-dom', size: 524288, path: 'node_modules/react-dom/index.js', type: 'js', duplicated: false },
  ],
  unusedExports: [
    'unused-component-1',
    'unused-component-2',
    'deprecated-function',
  ],
  duplicateModules: [],
  optimizationSuggestions: []
};

// Analyze bundle size
export function analyzeBundleSize(): BundleAnalysis {
  // In a real app, this would analyze the actual bundle
  // For now, return mock data with analysis
  
  const suggestions: OptimizationSuggestion[] = [
    {
      type: 'code-splitting',
      description: 'Implement code splitting for large components',
      impact: 'high',
      estimatedSavings: 524288,
      implementation: 'Use React.lazy() and Suspense for heavy components'
    },
    {
      type: 'tree-shaking',
      description: 'Remove unused code and dependencies',
      impact: 'medium',
      estimatedSavings: 262144,
      implementation: 'Configure webpack for better tree shaking'
    },
    {
      type: 'compression',
      description: 'Enable gzip and brotli compression',
      impact: 'high',
      estimatedSavings: 1048576,
      implementation: 'Configure server compression middleware'
    },
    {
      type: 'dynamic-import',
      description: 'Use dynamic imports for non-critical code',
      impact: 'medium',
      estimatedSavings: 131072,
      implementation: 'Convert static imports to dynamic() where appropriate'
    },
    {
      type: 'asset-optimization',
      description: 'Optimize images and assets',
      impact: 'medium',
      estimatedSavings: 262144,
      implementation: 'Use next/image and optimize assets'
    },
    {
      type: 'dependency-optimization',
      description: 'Replace heavy dependencies with lighter alternatives',
      impact: 'low',
      estimatedSavings: 131072,
      implementation: 'Evaluate and replace heavy packages'
    }
  ];

  return {
    ...mockBundleData,
    optimizationSuggestions: suggestions
  };
}

// Get bundle size metrics
export function getBundleMetrics(): {
  totalSize: number;
  gzippedSize: number;
  compressionRatio: number;
  chunkCount: number;
  averageChunkSize: number;
  largestChunkSize: number;
  largestModuleSize: number;
} {
  const analysis = analyzeBundleSize();
  
  return {
    totalSize: analysis.totalSize,
    gzippedSize: analysis.gzippedSize,
    compressionRatio: analysis.totalSize > 0 ? analysis.totalSize / analysis.gzippedSize : 0,
    chunkCount: analysis.chunks.length,
    averageChunkSize: analysis.chunks.length > 0 ? analysis.chunks.reduce((sum, chunk) => sum + chunk.size, 0) / analysis.chunks.length : 0,
    largestChunkSize: Math.max(...analysis.chunks.map(chunk => chunk.size)),
    largestModuleSize: Math.max(...analysis.largestModules.map(module => module.size))
  };
}

// Get optimization recommendations
export function getOptimizationRecommendations(): OptimizationSuggestion[] {
  const analysis = analyzeBundleSize();
  
  // Sort by impact and estimated savings
  return analysis.optimizationSuggestions
    .sort((a, b) => {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      const aScore = impactOrder[a.impact] * a.estimatedSavings;
      const bScore = impactOrder[b.impact] * b.estimatedSavings;
      return bScore - aScore;
    });
}

// Check if bundle size exceeds recommended limits
export function checkBundleSizeHealth(): {
  healthy: boolean;
  warnings: string[];
  errors: string[];
  recommendations: string[];
} {
  const metrics = getBundleMetrics();
  const warnings: string[] = [];
  const errors: string[] = [];
  const recommendations: string[] = [];

  // Check total bundle size
  if (metrics.totalSize > 3145728) { // 3MB
    errors.push('Bundle size exceeds 3MB limit');
    recommendations.push('Implement aggressive code splitting');
  } else if (metrics.totalSize > 2097152) { // 2MB
    warnings.push('Bundle size is large (>2MB)');
    recommendations.push('Consider code splitting for better performance');
  }

  // Check compression ratio
  if (metrics.compressionRatio < 2) {
    warnings.push('Compression ratio is low (<2:1)');
    recommendations.push('Enable better compression');
  }

  // Check largest chunk size
  if (metrics.largestChunkSize > 1048576) { // 1MB
    warnings.push('Largest chunk is large (>1MB)');
    recommendations.push('Split large chunks into smaller ones');
  }

  // Check largest module size
  if (metrics.largestModuleSize > 524288) { // 512KB
    warnings.push('Largest module is large (>512KB)');
    recommendations.push('Consider splitting large modules');
  }

  const healthy = errors.length === 0 && warnings.length <= 2;

  return {
    healthy,
    warnings,
    errors,
    recommendations
  };
}

// Generate bundle report
export function generateBundleReport(): {
  timestamp: string;
  metrics: {
    totalSize: number;
    gzippedSize: number;
    compressionRatio: number;
    chunkCount: number;
    averageChunkSize: number;
    largestChunkSize: number;
    largestModuleSize: number;
  };
  health: {
    healthy: boolean;
    warnings: string[];
    errors: string[];
    recommendations: string[];
  };
  recommendations: OptimizationSuggestion[];
  summary: {
    totalSize: string;
    gzippedSize: string;
    compressionRatio: string;
    chunkCount: number;
    health: string;
    recommendationsCount: number;
  };
} {
  const metrics = getBundleMetrics();
  const health = checkBundleSizeHealth();
  const recommendations = getOptimizationRecommendations();
  
  return {
    timestamp: new Date().toISOString(),
    metrics,
    health,
    recommendations,
    summary: {
      totalSize: `${(metrics.totalSize / 1024 / 1024).toFixed(2)}MB`,
      gzippedSize: `${(metrics.gzippedSize / 1024 / 1024).toFixed(2)}MB`,
      compressionRatio: `${metrics.compressionRatio.toFixed(2)}:1`,
      chunkCount: metrics.chunkCount,
      health: health.healthy ? 'Good' : 'Needs Improvement',
      recommendationsCount: recommendations.length
    }
  };
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

// Calculate potential savings
export function calculatePotentialSavings(recommendations: OptimizationSuggestion[]): {
  totalSavings: number;
  byImpact: Record<string, number>;
} {
  const totalSavings = recommendations.reduce((sum, rec) => sum + rec.estimatedSavings, 0);
  
  const byImpact = recommendations.reduce((acc, rec) => {
    acc[rec.impact] = (acc[rec.impact] || 0) + rec.estimatedSavings;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalSavings,
    byImpact
  };
}

// Export all utilities
export const BundleAnalyzer = {
  analyzeBundleSize,
  getBundleMetrics,
  getOptimizationRecommendations,
  checkBundleSizeHealth,
  generateBundleReport,
  formatFileSize,
  calculatePotentialSavings
};

export default BundleAnalyzer;
