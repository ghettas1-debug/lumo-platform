const fs = require('fs');
const path = require('path');

function runStaticAnalysis() {
  console.log('🔍 Starting Static Frontend Analysis...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    summary: {
      overallScore: 0,
      status: 'pending',
      criticalIssues: 0,
      recommendations: []
    },
    seo: {},
    bundle: {},
    security: {},
    codeQuality: {},
    performance: {}
  };
  
  try {
    // 1. SEO Analysis
    console.log('🔍 Running SEO Analysis...');
    results.seo = analyzeSEO();
    console.log(`✅ SEO Analysis Complete: ${results.seo.totalPages} pages analyzed`);
    
    // 2. Bundle Analysis
    console.log('📦 Running Bundle Analysis...');
    results.bundle.dependencies = analyzeBundleSize();
    results.bundle.performance = analyzePerformanceMetrics();
    console.log(`✅ Bundle Analysis Complete: ${results.bundle.dependencies.totalDependencies} dependencies`);
    
    // 3. Security Analysis
    console.log('🔒 Running Security Analysis...');
    results.security = analyzeSecurity();
    console.log(`✅ Security Score: ${results.security.securityScore}/100`);
    
    // 4. Code Quality Analysis
    console.log('📝 Running Code Quality Analysis...');
    results.codeQuality = analyzeCodeQuality();
    console.log(`✅ Code Quality Score: ${results.codeQuality.score}/100`);
    
    // 5. Performance Analysis (Static)
    console.log('⚡ Running Static Performance Analysis...');
    results.performance = analyzeStaticPerformance();
    console.log(`✅ Performance Analysis Complete`);
    
    // Calculate overall score
    results.summary.overallScore = calculateOverallScore(results);
    results.summary.criticalIssues = countCriticalIssues(results);
    results.summary.recommendations = generateOverallRecommendations(results);
    results.summary.status = results.summary.overallScore >= 80 ? 'pass' : 'fail';
    
    // Save results
    saveResults(results);
    
    // Display summary
    displaySummary(results);
    
    return results;
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    results.summary.status = 'error';
    results.error = error.message;
    return results;
  }
}

function analyzeSEO() {
  const srcDir = path.join(__dirname, '../src/app');
  const pages = [];
  
  function getAllPages(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        getAllPages(filePath, path.join(basePath, file));
      } else if (file === 'page.tsx' || file === 'page.js') {
        pages.push({
          path: basePath || '/',
          filePath: filePath
        });
      }
    }
  }
  
  getAllPages(srcDir);
  
  const seoAnalysis = {
    totalPages: pages.length,
    pages: [],
    globalIssues: [],
    recommendations: []
  };
  
  for (const page of pages) {
    const content = fs.readFileSync(page.filePath, 'utf8');
    const pageAnalysis = analyzePageSEO(page, content);
    seoAnalysis.pages.push(pageAnalysis);
  }
  
  seoAnalysis.globalIssues = analyzeGlobalIssues(seoAnalysis.pages);
  seoAnalysis.recommendations = generateRecommendations(seoAnalysis);
  
  return seoAnalysis;
}

function analyzePageSEO(page, content) {
  const analysis = {
    path: page.path,
    title: extractTitle(content),
    metaDescription: extractMetaDescription(content),
    h1: extractH1(content),
    headings: extractHeadings(content),
    images: extractImages(content),
    links: extractLinks(content),
    structuredData: extractStructuredData(content),
    issues: [],
    score: 100
  };
  
  // SEO checks
  if (!analysis.title) {
    analysis.issues.push('Missing page title');
    analysis.score -= 20;
  } else if (analysis.title.length < 30 || analysis.title.length > 60) {
    analysis.issues.push('Title length should be 30-60 characters');
    analysis.score -= 10;
  }
  
  if (!analysis.metaDescription) {
    analysis.issues.push('Missing meta description');
    analysis.score -= 15;
  } else if (analysis.metaDescription.length < 120 || analysis.metaDescription.length > 160) {
    analysis.issues.push('Meta description should be 120-160 characters');
    analysis.score -= 5;
  }
  
  if (!analysis.h1) {
    analysis.issues.push('Missing H1 tag');
    analysis.score -= 15;
  } else if (analysis.h1.length > 70) {
    analysis.issues.push('H1 should be under 70 characters');
    analysis.score -= 5;
  }
  
  if (analysis.images.length > 0) {
    const imagesWithoutAlt = analysis.images.filter(img => !img.alt).length;
    if (imagesWithoutAlt > 0) {
      analysis.issues.push(`${imagesWithoutAlt} images missing alt text`);
      analysis.score -= imagesWithoutAlt * 2;
    }
  }
  
  if (analysis.headings.filter(h => h.level === 1).length > 1) {
    analysis.issues.push('Multiple H1 tags found');
    analysis.score -= 10;
  }
  
  return analysis;
}

function extractTitle(content) {
  const match = content.match(/<title[^>]*>([^<]+)<\/title>/);
  return match ? match[1].trim() : null;
}

function extractMetaDescription(content) {
  const match = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/);
  return match ? match[1].trim() : null;
}

function extractH1(content) {
  const match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  return match ? match[1].trim() : null;
}

function extractHeadings(content) {
  const headings = [];
  const matches = content.matchAll(/<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/g);
  
  for (const match of matches) {
    headings.push({
      level: parseInt(match[1]),
      text: match[2].trim()
    });
  }
  
  return headings;
}

function extractImages(content) {
  const images = [];
  const matches = content.matchAll(/<img[^>]*>/g);
  
  for (const match of matches) {
    const imgTag = match[0];
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/);
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/);
    
    images.push({
      src: srcMatch ? srcMatch[1] : null,
      alt: altMatch ? altMatch[1] : null
    });
  }
  
  return images;
}

function extractLinks(content) {
  const links = [];
  const matches = content.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/g);
  
  for (const match of matches) {
    links.push({
      href: match[1],
      text: match[2].trim()
    });
  }
  
  return links;
}

function extractStructuredData(content) {
  const structuredData = [];
  const matches = content.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/g);
  
  for (const match of matches) {
    try {
      structuredData.push(JSON.parse(match[1]));
    } catch (e) {
      // Invalid JSON
    }
  }
  
  return structuredData;
}

function analyzeGlobalIssues(pages) {
  const issues = [];
  
  const titles = pages.map(p => p.title).filter(Boolean);
  const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index);
  if (duplicateTitles.length > 0) {
    issues.push('Duplicate page titles found');
  }
  
  const descriptions = pages.map(p => p.metaDescription).filter(Boolean);
  const duplicateDescriptions = descriptions.filter((desc, index) => descriptions.indexOf(desc) !== index);
  if (duplicateDescriptions.length > 0) {
    issues.push('Duplicate meta descriptions found');
  }
  
  return issues;
}

function generateRecommendations(analysis) {
  const recommendations = [];
  
  if (analysis.pages.filter(p => !p.title).length > 0) {
    recommendations.push('Add unique titles to all pages');
  }
  
  if (analysis.pages.filter(p => !p.metaDescription).length > 0) {
    recommendations.push('Add unique meta descriptions to all pages');
  }
  
  if (analysis.pages.filter(p => !p.h1).length > 0) {
    recommendations.push('Add H1 tags to all pages');
  }
  
  const pagesWithImagesWithoutAlt = analysis.pages.filter(p => 
    p.images.some(img => !img.alt)
  );
  if (pagesWithImagesWithoutAlt.length > 0) {
    recommendations.push('Add alt text to all images');
  }
  
  return recommendations;
}

function analyzeBundleSize() {
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
        
        if (size > 1024 * 1024) {
          analysis.largePackages.push(dep);
        }
      }
    } catch (error) {
      // Package not found or error reading
    }
  }
  
  analysis.dependencies.sort((a, b) => b.size - a.size);
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
  
  if (analysis.largePackages.length > 0) {
    suggestions.push({
      type: 'large-packages',
      message: `Consider tree-shaking or replacing large packages: ${analysis.largePackages.join(', ')}`,
      impact: 'high'
    });
  }
  
  const packagesWithSideEffects = analysis.dependencies.filter(d => d.hasSideEffects);
  if (packagesWithSideEffects.length > 5) {
    suggestions.push({
      type: 'side-effects',
      message: 'Consider using packages with sideEffects: false for better tree-shaking',
      impact: 'medium'
    });
  }
  
  if (analysis.estimatedBundleSize > 5 * 1024 * 1024) {
    suggestions.push({
      type: 'bundle-size',
      message: 'Bundle size is large, consider code splitting and dynamic imports',
      impact: 'high'
    });
  }
  
  return suggestions;
}

function analyzePerformanceMetrics() {
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
    
    const componentMatches = content.match(/function\s+\w+|const\s+\w+\s*=\s*\(|class\s+\w+/g);
    if (componentMatches) {
      analysis.componentCount += componentMatches.length;
    }
    
    const hookMatches = content.match(/use[A-Z]\w*/g);
    if (hookMatches) {
      analysis.hookCount += hookMatches.length;
    }
    
    checkPerformanceIssues(content, filePath);
  }
  
  function checkPerformanceIssues(content, filePath) {
    const componentExports = content.match(/export\s+(default\s+)?function\s+\w+|export\s+(default\s+)?const\s+\w+\s*=\s*\(/g);
    if (componentExports && !content.includes('React.memo')) {
      analysis.optimizationIssues.push({
        file: filePath,
        issue: 'Component not memoized',
        suggestion: 'Consider using React.memo for expensive components'
      });
    }
    
    const hasComplexLogic = content.includes('map(') || content.includes('filter(') || content.includes('reduce(');
    if (hasComplexLogic && (!content.includes('useCallback') && !content.includes('useMemo'))) {
      analysis.optimizationIssues.push({
        file: filePath,
        issue: 'Complex operations not memoized',
        suggestion: 'Consider using useCallback/useMemo for expensive operations'
      });
    }
    
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

function analyzeSecurity() {
  const srcDir = path.join(__dirname, '../src');
  const analysis = {
    vulnerabilities: [],
    securityScore: 100,
    recommendations: [],
    checks: {
      xssProtection: true,
      csrfProtection: true,
      inputValidation: true,
      authentication: true,
      authorization: true,
      dataExposure: true,
      dependencies: true
    }
  };
  
  function analyzeDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath);
      } else if (file.match(/\.(tsx?|jsx?|js|ts)$/)) {
        analyzeFile(filePath);
      }
    }
  }
  
  function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    checkXSSVulnerabilities(content, filePath);
    checkCSRFProtection(content, filePath);
    checkInputValidation(content, filePath);
    checkAuthentication(content, filePath);
    checkAuthorization(content, filePath);
    checkDataExposure(content, filePath);
  }
  
  function checkXSSVulnerabilities(content, filePath) {
    if (content.includes('dangerouslySetInnerHTML')) {
      analysis.vulnerabilities.push({
        type: 'XSS',
        severity: 'high',
        file: filePath,
        description: 'Use of dangerouslySetInnerHTML detected',
        recommendation: 'Avoid using dangerouslySetInnerHTML or sanitize content properly'
      });
      analysis.securityScore -= 15;
      analysis.checks.xssProtection = false;
    }
    
    if (content.includes('innerHTML') || content.includes('outerHTML')) {
      analysis.vulnerabilities.push({
        type: 'XSS',
        severity: 'high',
        file: filePath,
        description: 'Direct HTML manipulation detected',
        recommendation: 'Use safe alternatives or sanitize content'
      });
      analysis.securityScore -= 10;
    }
    
    if (content.includes('eval(') || content.includes('Function(')) {
      analysis.vulnerabilities.push({
        type: 'XSS',
        severity: 'critical',
        file: filePath,
        description: 'Use of eval() or Function() constructor detected',
        recommendation: 'Avoid using eval() and Function() constructor'
      });
      analysis.securityScore -= 20;
    }
  }
  
  function checkCSRFProtection(content, filePath) {
    if (content.includes('fetch(') || content.includes('axios.')) {
      const hasCSRFToken = content.includes('csrf') || content.includes('xsrf');
      if (!hasCSRFToken) {
        analysis.vulnerabilities.push({
          type: 'CSRF',
          severity: 'medium',
          file: filePath,
          description: 'Potential CSRF vulnerability in API calls',
          recommendation: 'Implement CSRF protection for state-changing requests'
        });
        analysis.securityScore -= 5;
        analysis.checks.csrfProtection = false;
      }
    }
  }
  
  function checkInputValidation(content, filePath) {
    if (content.includes('useState(') || content.includes('useRef(')) {
      const hasValidation = content.includes('validate') || content.includes('validation');
      if (!hasValidation) {
        analysis.vulnerabilities.push({
          type: 'Input Validation',
          severity: 'medium',
          file: filePath,
          description: 'User input without proper validation',
          recommendation: 'Implement proper input validation and sanitization'
        });
        analysis.securityScore -= 5;
        analysis.checks.inputValidation = false;
      }
    }
  }
  
  function checkAuthentication(content, filePath) {
    if (content.includes('useRouter') || content.includes('redirect')) {
      const hasAuthCheck = content.includes('auth') || content.includes('token') || content.includes('session');
      if (!hasAuthCheck) {
        analysis.vulnerabilities.push({
          type: 'Authentication',
          severity: 'high',
          file: filePath,
          description: 'Potential unprotected route',
          recommendation: 'Implement proper authentication checks'
        });
        analysis.securityScore -= 10;
        analysis.checks.authentication = false;
      }
    }
  }
  
  function checkAuthorization(content, filePath) {
    if (content.includes('admin') || content.includes('role') || content.includes('permission')) {
      const hasAuthz = content.includes('authorization') || content.includes('can(') || content.includes('allowed');
      if (!hasAuthz) {
        analysis.vulnerabilities.push({
          type: 'Authorization',
          severity: 'medium',
          file: filePath,
          description: 'Potential authorization bypass',
          recommendation: 'Implement proper role-based access control'
        });
        analysis.securityScore -= 5;
        analysis.checks.authorization = false;
      }
    }
  }
  
  function checkDataExposure(content, filePath) {
    const sensitivePatterns = [
      /password/i,
      /secret/i,
      /token/i,
      /api[_-]?key/i,
      /private[_-]?key/i
    ];
    
    for (const pattern of sensitivePatterns) {
      if (pattern.test(content)) {
        analysis.vulnerabilities.push({
          type: 'Data Exposure',
          severity: 'high',
          file: filePath,
          description: 'Potential sensitive data exposure',
          recommendation: 'Move sensitive data to backend and use secure storage'
        });
        analysis.securityScore -= 10;
        analysis.checks.dataExposure = false;
        break;
      }
    }
  }
  
  checkDependencies();
  analyzeDirectory(srcDir);
  analysis.recommendations = generateSecurityRecommendations(analysis);
  
  return analysis;
}

function checkDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});
    
    const vulnerablePackages = [
      'axios<1.0.0',
      'react<16.9.0',
      'next<12.0.0'
    ];
    
    for (const dep of dependencies) {
      for (const vulnerable of vulnerablePackages) {
        if (dep.startsWith(vulnerable.split('<')[0])) {
          break;
        }
      }
    }
  } catch (error) {
    console.error('Error checking dependencies:', error);
  }
}

function generateSecurityRecommendations(analysis) {
  const recommendations = [];
  
  if (analysis.vulnerabilities.length > 0) {
    recommendations.push({
      type: 'vulnerabilities',
      message: `Found ${analysis.vulnerabilities.length} security vulnerabilities`,
      priority: 'high'
    });
  }
  
  if (analysis.securityScore < 80) {
    recommendations.push({
      type: 'security-score',
      message: 'Security score is below 80, implement security best practices',
      priority: 'high'
    });
  }
  
  if (!analysis.checks.xssProtection) {
    recommendations.push({
      type: 'xss',
      message: 'Implement XSS protection measures',
      priority: 'high'
    });
  }
  
  if (!analysis.checks.csrfProtection) {
    recommendations.push({
      type: 'csrf',
      message: 'Implement CSRF protection',
      priority: 'medium'
    });
  }
  
  return recommendations;
}

function analyzeCodeQuality() {
  const srcDir = path.join(__dirname, '../src');
  const analysis = {
    score: 100,
    issues: [],
    metrics: {
      totalFiles: 0,
      totalLines: 0,
      avgLinesPerFile: 0,
      duplicateCode: 0,
      complexity: 0
    },
    recommendations: []
  };
  
  function analyzeDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath);
      } else if (file.match(/\.(tsx?|jsx?|js|ts)$/)) {
        analyzeFile(filePath);
      }
    }
  }
  
  function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;
    
    analysis.metrics.totalFiles++;
    analysis.metrics.totalLines += lines;
    
    // Check for console.log
    const consoleLogs = content.match(/console\.log/g);
    if (consoleLogs && consoleLogs.length > 0) {
      analysis.issues.push({
        type: 'console-log',
        file: filePath,
        count: consoleLogs.length,
        severity: 'low'
      });
      analysis.score -= consoleLogs.length;
    }
    
    // Check for TODO comments
    const todos = content.match(/\/\/\s*TODO|\/\*\s*TODO/g);
    if (todos && todos.length > 0) {
      analysis.issues.push({
        type: 'todo',
        file: filePath,
        count: todos.length,
        severity: 'medium'
      });
      analysis.score -= todos.length * 2;
    }
    
    // Check for large files
    if (lines > 500) {
      analysis.issues.push({
        type: 'large-file',
        file: filePath,
        lines: lines,
        severity: 'medium'
      });
      analysis.score -= 5;
    }
    
    // Check for complex functions
    const functions = content.match(/function\s+\w+[^{]*\{[\s\S]*?\}/g);
    if (functions) {
      functions.forEach(func => {
        const funcLines = func.split('\n').length;
        if (funcLines > 50) {
          analysis.issues.push({
            type: 'complex-function',
            file: filePath,
            lines: funcLines,
            severity: 'medium'
          });
          analysis.score -= 3;
        }
      });
    }
  }
  
  analyzeDirectory(srcDir);
  
  analysis.metrics.avgLinesPerFile = Math.round(analysis.metrics.totalLines / analysis.metrics.totalFiles);
  analysis.recommendations = generateCodeQualityRecommendations(analysis);
  analysis.score = Math.max(0, analysis.score);
  
  return analysis;
}

function generateCodeQualityRecommendations(analysis) {
  const recommendations = [];
  
  const consoleLogs = analysis.issues.filter(i => i.type === 'console-log');
  if (consoleLogs.length > 0) {
    recommendations.push({
      type: 'console-logs',
      message: `Remove ${consoleLogs.reduce((sum, i) => sum + i.count, 0)} console.log statements`,
      priority: 'low'
    });
  }
  
  const todos = analysis.issues.filter(i => i.type === 'todo');
  if (todos.length > 0) {
    recommendations.push({
      type: 'todos',
      message: `Address ${todos.reduce((sum, i) => sum + i.count, 0)} TODO comments`,
      priority: 'medium'
    });
  }
  
  const largeFiles = analysis.issues.filter(i => i.type === 'large-file');
  if (largeFiles.length > 0) {
    recommendations.push({
      type: 'large-files',
      message: `Refactor ${largeFiles.length} large files (>500 lines)`,
      priority: 'medium'
    });
  }
  
  return recommendations;
}

function analyzeStaticPerformance() {
  const analysis = {
    score: 100,
    issues: [],
    optimizations: [],
    recommendations: []
  };
  
  // Check for Next.js optimizations
  try {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8');
    
    if (!nextConfig.includes('experimental')) {
      analysis.issues.push({
        type: 'missing-optimizations',
        description: 'No experimental optimizations found in next.config.js',
        recommendation: 'Enable experimental optimizations like optimizeCss and optimizePackageImports'
      });
      analysis.score -= 10;
    }
    
    if (!nextConfig.includes('images.remotePatterns')) {
      analysis.issues.push({
        type: 'deprecated-config',
        description: 'Using deprecated images.domains configuration',
        recommendation: 'Update to images.remotePatterns for better security'
      });
      analysis.score -= 5;
    }
  } catch (error) {
    analysis.issues.push({
      type: 'missing-config',
      description: 'next.config.js not found',
      recommendation: 'Create next.config.js with performance optimizations'
    });
    analysis.score -= 15;
  }
  
  // Check for lazy loading
  const srcDir = path.join(__dirname, '../src');
  let hasLazyLoading = false;
  
  function checkForLazyLoading(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        checkForLazyLoading(filePath);
      } else if (file.match(/\.(tsx?|jsx?)$/)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('lazy(') || content.includes('dynamic(')) {
          hasLazyLoading = true;
        }
      }
    }
  }
  
  checkForLazyLoading(srcDir);
  
  if (!hasLazyLoading) {
    analysis.issues.push({
      type: 'no-lazy-loading',
      description: 'No lazy loading found in components',
      recommendation: 'Implement lazy loading for heavy components and routes'
    });
    analysis.score -= 15;
  }
  
  analysis.recommendations = generatePerformanceRecommendations(analysis);
  analysis.score = Math.max(0, analysis.score);
  
  return analysis;
}

function generatePerformanceRecommendations(analysis) {
  const recommendations = [];
  
  if (!analysis.issues) {
    return recommendations;
  }
  
  const missingOptimizations = analysis.issues.filter(i => i.type === 'missing-optimizations');
  if (missingOptimizations.length > 0) {
    recommendations.push({
      type: 'optimizations',
      message: 'Enable experimental optimizations in next.config.js',
      priority: 'high'
    });
  }
  
  const noLazyLoading = analysis.issues.filter(i => i.type === 'no-lazy-loading');
  if (noLazyLoading.length > 0) {
    recommendations.push({
      type: 'lazy-loading',
      message: 'Implement lazy loading for better performance',
      priority: 'high'
    });
  }
  
  return recommendations;
}

function calculateOverallScore(results) {
  const weights = {
    seo: 0.20,
    bundle: 0.15,
    security: 0.25,
    codeQuality: 0.20,
    performance: 0.20
  };
  
  const scores = {
    seo: calculateSEOScore(results.seo),
    bundle: calculateBundleScore(results.bundle),
    security: results.security.securityScore || 0,
    codeQuality: results.codeQuality.score || 0,
    performance: results.performance.score || 0
  };
  
  let overallScore = 0;
  for (const [key, weight] of Object.entries(weights)) {
    overallScore += scores[key] * weight;
  }
  
  return Math.round(overallScore);
}

function calculateSEOScore(seoResults) {
  if (!seoResults.pages || seoResults.pages.length === 0) return 0;
  
  const totalScore = seoResults.pages.reduce((sum, page) => sum + page.score, 0);
  return Math.round(totalScore / seoResults.pages.length);
}

function calculateBundleScore(bundleResults) {
  const deps = bundleResults.dependencies;
  const perf = bundleResults.performance;
  
  let score = 100;
  
  if (deps.estimatedBundleSize > 5 * 1024 * 1024) score -= 20;
  else if (deps.estimatedBundleSize > 2 * 1024 * 1024) score -= 10;
  
  if (perf.optimizationIssues.length > 10) score -= 15;
  else if (perf.optimizationIssues.length > 5) score -= 5;
  
  return Math.max(0, score);
}

function countCriticalIssues(results) {
  let count = 0;
  
  count += results.security.vulnerabilities.filter(v => v.severity === 'critical').length;
  count += results.codeQuality.issues.filter(i => i.severity === 'high').length;
  
  return count;
}

function generateOverallRecommendations(results) {
  const recommendations = [];
  
  if (calculateSEOScore(results.seo) < 80) {
    recommendations.push({
      category: 'SEO',
      priority: 'medium',
      message: 'Improve SEO optimization (meta tags, structured data, etc.)'
    });
  }
  
  if (calculateBundleScore(results.bundle) < 80) {
    recommendations.push({
      category: 'Bundle',
      priority: 'medium',
      message: 'Optimize bundle size and implement code splitting'
    });
  }
  
  if (results.security.securityScore < 90) {
    recommendations.push({
      category: 'Security',
      priority: 'critical',
      message: 'Address security vulnerabilities immediately'
    });
  }
  
  if (results.codeQuality.score < 80) {
    recommendations.push({
      category: 'Code Quality',
      priority: 'medium',
      message: 'Improve code quality by addressing technical debt'
    });
  }
  
  if (results.performance.score < 80) {
    recommendations.push({
      category: 'Performance',
      priority: 'high',
      message: 'Implement performance optimizations'
    });
  }
  
  return recommendations.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

function saveResults(results) {
  const resultsDir = path.join(__dirname, '../analysis-results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsFile = path.join(resultsDir, `static-analysis-${timestamp}.json`);
  
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`💾 Results saved to: ${resultsFile}`);
}

function displaySummary(results) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 STATIC FRONTEND ANALYSIS SUMMARY');
  console.log('='.repeat(60));
  
  console.log(`🎯 Overall Score: ${results.summary.overallScore}/100`);
  console.log(`📋 Status: ${results.summary.status.toUpperCase()}`);
  console.log(`⚠️  Critical Issues: ${results.summary.criticalIssues}`);
  
  console.log('\n📈 Category Scores:');
  console.log(`🔍 SEO: ${calculateSEOScore(results.seo)}/100`);
  console.log(`📦 Bundle: ${calculateBundleScore(results.bundle)}/100`);
  console.log(`🔒 Security: ${results.security.securityScore}/100`);
  console.log(`📝 Code Quality: ${results.codeQuality.score}/100`);
  console.log(`⚡ Performance: ${results.performance.score}/100`);
  
  console.log('\n🔧 Top Recommendations:');
  results.summary.recommendations.slice(0, 5).forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.category.toUpperCase()}] ${rec.message}`);
  });
  
  console.log('\n' + '='.repeat(60));
}

// Run analysis
if (require.main === module) {
  runStaticAnalysis();
}

module.exports = {
  runStaticAnalysis
};
