const { runLighthouseAnalysis, runMobileAnalysis } = require('./lighthouse-analysis');
const { runAccessibilityAnalysis } = require('./accessibility-analysis');
const { analyzeSEO } = require('./seo-analysis');
const { analyzeBundleSize, analyzePerformanceMetrics } = require('./bundle-analysis');
const { analyzeSecurity } = require('./security-analysis');

async function runCompleteAnalysis() {
  console.log('🚀 Starting Complete Frontend Analysis...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    url: 'http://localhost:3000',
    summary: {
      overallScore: 0,
      status: 'pending',
      criticalIssues: 0,
      recommendations: []
    },
    performance: {},
    accessibility: {},
    seo: {},
    bundle: {},
    security: {},
    mobile: {}
  };
  
  try {
    // 1. Performance Analysis
    console.log('📊 Running Performance Analysis...');
    results.performance = await runLighthouseAnalysis(results.url);
    console.log(`✅ Performance Score: ${results.performance.performance.toFixed(1)}/100`);
    
    // 2. Mobile Performance Analysis
    console.log('📱 Running Mobile Performance Analysis...');
    results.mobile = await runMobileAnalysis(results.url);
    console.log(`✅ Mobile Performance Score: ${results.mobile.performance.toFixed(1)}/100`);
    
    // 3. Accessibility Analysis
    console.log('♿ Running Accessibility Analysis...');
    results.accessibility = await runAccessibilityAnalysis(results.url);
    console.log(`✅ Accessibility Score: ${results.accessibility.score}/100`);
    
    // 4. SEO Analysis
    console.log('🔍 Running SEO Analysis...');
    results.seo = analyzeSEO();
    console.log(`✅ SEO Analysis Complete: ${results.seo.totalPages} pages analyzed`);
    
    // 5. Bundle Analysis
    console.log('📦 Running Bundle Analysis...');
    results.bundle.dependencies = analyzeBundleSize();
    results.bundle.performance = analyzePerformanceMetrics();
    console.log(`✅ Bundle Analysis Complete: ${results.bundle.dependencies.totalDependencies} dependencies`);
    
    // 6. Security Analysis
    console.log('🔒 Running Security Analysis...');
    results.security = analyzeSecurity();
    console.log(`✅ Security Score: ${results.security.securityScore}/100`);
    
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

function calculateOverallScore(results) {
  const weights = {
    performance: 0.25,
    mobile: 0.15,
    accessibility: 0.20,
    seo: 0.15,
    bundle: 0.10,
    security: 0.15
  };
  
  const scores = {
    performance: results.performance.performance || 0,
    mobile: results.mobile.performance || 0,
    accessibility: results.accessibility.score || 0,
    seo: calculateSEOScore(results.seo),
    bundle: calculateBundleScore(results.bundle),
    security: results.security.securityScore || 0
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
  
  // Penalize large bundles
  if (deps.estimatedBundleSize > 5 * 1024 * 1024) score -= 20;
  else if (deps.estimatedBundleSize > 2 * 1024 * 1024) score -= 10;
  
  // Penalize many optimization issues
  if (perf.optimizationIssues.length > 10) score -= 15;
  else if (perf.optimizationIssues.length > 5) score -= 5;
  
  return Math.max(0, score);
}

function countCriticalIssues(results) {
  let count = 0;
  
  // Performance critical issues
  if (results.performance.performance < 50) count++;
  if (results.mobile.performance < 50) count++;
  
  // Accessibility critical issues
  count += results.accessibility.violations.filter(v => v.impact === 'critical').length;
  
  // Security critical issues
  count += results.security.vulnerabilities.filter(v => v.severity === 'critical').length;
  
  return count;
}

function generateOverallRecommendations(results) {
  const recommendations = [];
  
  // Performance recommendations
  if (results.performance.performance < 80) {
    recommendations.push({
      category: 'Performance',
      priority: 'high',
      message: 'Optimize performance metrics (FCP, LCP, CLS, TBT)'
    });
  }
  
  // Mobile recommendations
  if (results.mobile.performance < 80) {
    recommendations.push({
      category: 'Mobile',
      priority: 'high',
      message: 'Improve mobile performance and responsive design'
    });
  }
  
  // Accessibility recommendations
  if (results.accessibility.score < 90) {
    recommendations.push({
      category: 'Accessibility',
      priority: 'high',
      message: 'Fix accessibility violations to meet WCAG 2.1 AA standards'
    });
  }
  
  // SEO recommendations
  if (calculateSEOScore(results.seo) < 80) {
    recommendations.push({
      category: 'SEO',
      priority: 'medium',
      message: 'Improve SEO optimization (meta tags, structured data, etc.)'
    });
  }
  
  // Bundle recommendations
  if (calculateBundleScore(results.bundle) < 80) {
    recommendations.push({
      category: 'Bundle',
      priority: 'medium',
      message: 'Optimize bundle size and implement code splitting'
    });
  }
  
  // Security recommendations
  if (results.security.securityScore < 90) {
    recommendations.push({
      category: 'Security',
      priority: 'critical',
      message: 'Address security vulnerabilities immediately'
    });
  }
  
  return recommendations.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

function saveResults(results) {
  const fs = require('fs');
  const path = require('path');
  
  const resultsDir = path.join(__dirname, '../analysis-results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsFile = path.join(resultsDir, `analysis-${timestamp}.json`);
  
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`💾 Results saved to: ${resultsFile}`);
}

function displaySummary(results) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 FRONTEND ANALYSIS SUMMARY');
  console.log('='.repeat(60));
  
  console.log(`🎯 Overall Score: ${results.summary.overallScore}/100`);
  console.log(`📋 Status: ${results.summary.status.toUpperCase()}`);
  console.log(`⚠️  Critical Issues: ${results.summary.criticalIssues}`);
  
  console.log('\n📈 Category Scores:');
  console.log(`⚡ Performance: ${results.performance.performance.toFixed(1)}/100`);
  console.log(`📱 Mobile: ${results.mobile.performance.toFixed(1)}/100`);
  console.log(`♿ Accessibility: ${results.accessibility.score}/100`);
  console.log(`🔍 SEO: ${calculateSEOScore(results.seo)}/100`);
  console.log(`📦 Bundle: ${calculateBundleScore(results.bundle)}/100`);
  console.log(`🔒 Security: ${results.security.securityScore}/100`);
  
  console.log('\n🔧 Top Recommendations:');
  results.summary.recommendations.slice(0, 5).forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.category.toUpperCase()}] ${rec.message}`);
  });
  
  console.log('\n' + '='.repeat(60));
}

// Run the analysis
if (require.main === module) {
  runCompleteAnalysis()
    .then(() => {
      console.log('\n✅ Analysis completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Analysis failed:', error);
      process.exit(1);
    });
}

module.exports = {
  runCompleteAnalysis
};
