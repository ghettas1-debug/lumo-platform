const fs = require('fs');
const path = require('path');

function analyzeBundleSize() {
  console.log(`📦 Starting Bundle Size analysis...`);
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  const analysis = {
    totalDependencies: dependencies.length,
    totalDevDependencies: devDependencies.length,
    dependencies: [],
    largePackages: [],
    optimizationSuggestions: [],
    estimatedBundleSize: 0
  };
  
  // Analyze each dependency
  for (const dep of dependencies) {
    try {
      const depPath = path.join('node_modules', dep, 'package.json');
      if (fs.existsSync(depPath)) {
        const depPackage = JSON.parse(fs.readFileSync(depPath, 'utf8'));
        const size = getDirectorySize(path.join('node_modules', dep));
        
        analysis.dependencies.push({
          name: dep,
          version: depPackage.version,
          size: size,
          sizeFormatted: formatBytes(size),
          hasSideEffects: depPackage.sideEffects !== false
        });
        
        analysis.estimatedBundleSize += size;
        
        if (size > 1024 * 1024) { // > 1MB
          analysis.largePackages.push(dep);
        }
      }
    } catch (error) {
      // Package not found or error reading
    }
  }
  
  // Sort by size
  analysis.dependencies.sort((a, b) => b.size - a.size);
  
  // Generate optimization suggestions
  analysis.optimizationSuggestions = generateOptimizationSuggestions(analysis);
  
  return analysis;
}

function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stat.size;
      }
    }
  } catch (error) {
    // Directory not accessible
  }
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function generateOptimizationSuggestions(analysis) {
  const suggestions = [];
  
  // Large packages
  if (analysis.largePackages.length > 0) {
    suggestions.push({
      type: 'large-packages',
      message: `Consider tree-shaking or replacing large packages: ${analysis.largePackages.join(', ')}`,
      impact: 'high'
    });
  }
  
  // Side effects
  const packagesWithSideEffects = analysis.dependencies.filter(d => d.hasSideEffects);
  if (packagesWithSideEffects.length > 5) {
    suggestions.push({
      type: 'side-effects',
      message: 'Consider using packages with sideEffects: false for better tree-shaking',
      impact: 'medium'
    });
  }
  
  // Bundle size
  if (analysis.estimatedBundleSize > 5 * 1024 * 1024) { // > 5MB
    suggestions.push({
      type: 'bundle-size',
      message: 'Bundle size is large, consider code splitting and dynamic imports',
      impact: 'high'
    });
  }
  
  return suggestions;
}

function analyzePerformanceMetrics() {
  console.log(`⚡ Starting Performance Metrics analysis...`);
  
  const srcDir = path.join(__dirname, '../src');
  const analysis = {
    totalFiles: 0,
    totalLines: 0,
    componentCount: 0,
    hookCount: 0,
    optimizationIssues: [],
    recommendations: []
  };
  
  function analyzeDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath);
      } else if (file.match(/\.(tsx?|jsx?)$/)) {
        analyzeFile(filePath);
      }
    }
  }
  
  function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;
    
    analysis.totalFiles++;
    analysis.totalLines += lines;
    
    // Count components
    const componentMatches = content.match(/function\s+\w+|const\s+\w+\s*=\s*\(|class\s+\w+/g);
    if (componentMatches) {
      analysis.componentCount += componentMatches.length;
    }
    
    // Count hooks
    const hookMatches = content.match(/use[A-Z]\w*/g);
    if (hookMatches) {
      analysis.hookCount += hookMatches.length;
    }
    
    // Check for performance issues
    checkPerformanceIssues(content, filePath);
  }
  
  function checkPerformanceIssues(content, filePath) {
    // Check for missing React.memo
    const componentExports = content.match(/export\s+(default\s+)?function\s+\w+|export\s+(default\s+)?const\s+\w+\s*=\s*\(/g);
    if (componentExports && !content.includes('React.memo')) {
      analysis.optimizationIssues.push({
        file: filePath,
        issue: 'Component not memoized',
        suggestion: 'Consider using React.memo for expensive components'
      });
    }
    
    // Check for missing useCallback/useMemo
    const hasComplexLogic = content.includes('map(') || content.includes('filter(') || content.includes('reduce(');
    if (hasComplexLogic && (!content.includes('useCallback') && !content.includes('useMemo'))) {
      analysis.optimizationIssues.push({
        file: filePath,
        issue: 'Complex operations not memoized',
        suggestion: 'Consider using useCallback/useMemo for expensive operations'
      });
    }
    
    // Check for large files
    const lines = content.split('\n').length;
    if (lines > 500) {
      analysis.optimizationIssues.push({
        file: filePath,
        issue: 'Large file',
        suggestion: 'Consider splitting large files into smaller components'
      });
    }
  }
  
  analyzeDirectory(srcDir);
  
  // Generate recommendations
  analysis.recommendations = generatePerformanceRecommendations(analysis);
  
  return analysis;
}

function generatePerformanceRecommendations(analysis) {
  const recommendations = [];
  
  if (analysis.totalFiles > 100) {
    recommendations.push({
      type: 'file-count',
      message: 'Large number of files, consider consolidating related components',
      impact: 'medium'
    });
  }
  
  if (analysis.optimizationIssues.length > 10) {
    recommendations.push({
      type: 'optimization',
      message: 'Multiple performance optimization opportunities found',
      impact: 'high'
    });
  }
  
  const avgLinesPerFile = analysis.totalLines / analysis.totalFiles;
  if (avgLinesPerFile > 200) {
    recommendations.push({
      type: 'file-size',
      message: 'Average file size is large, consider component splitting',
      impact: 'medium'
    });
  }
  
  return recommendations;
}

module.exports = {
  analyzeBundleSize,
  analyzePerformanceMetrics
};
