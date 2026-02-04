#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Analyzes the bundle size and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  buildDir: path.join(__dirname, '../.next'),
  staticDir: path.join(__dirname, '../public'),
  maxBundleSize: 500 * 1024 * 1024, // 500KB
  maxChunkSize: 100 * 1024 * 1024, // 100KB
  maxImageSize: 200 * 1024, // 200KB
  maxAssetSize: 50 * 1024, // 50KB
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${title}`, 'bright');
  log('='.repeat(60), 'cyan');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBuildDirectory() {
  if (!fs.existsSync(CONFIG.buildDir)) {
    log('Build directory not found. Run `npm run build` first.', 'yellow');
    return null;
  }

  const stats = {};
  let totalSize = 0;

  function analyzeDirectory(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(itemPath, prefix + item + '/');
      } else {
        const size = stat.size;
        const relativePath = prefix + item;
        stats[relativePath] = size;
        totalSize += size;
      }
    }
  }

  analyzeDirectory(CONFIG.buildDir);
  
  return { stats, totalSize };
}

function analyzeStaticAssets() {
  if (!fs.existsSync(CONFIG.staticDir)) {
    log('Static directory not found.', 'yellow');
    return null;
  }

  const stats = {};
  let totalSize = 0;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const fontExtensions = ['.woff', '.woff2', '.ttf', '.otf', '.eot'];

  function analyzeDirectory(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(itemPath, prefix + item + '/');
      } else {
        const size = stat.size;
        const relativePath = prefix + item;
        const ext = path.extname(item).toLowerCase();
        
        stats[relativePath] = {
          size,
          type: imageExtensions.includes(ext) ? 'image' : 
                fontExtensions.includes(ext) ? 'font' : 'asset'
        };
        totalSize += size;
      }
    }
  }

  analyzeDirectory(CONFIG.staticDir);
  
  return { stats, totalSize };
}

function findLargeFiles(stats, maxSize, type = 'file') {
  return Object.entries(stats)
    .filter(([_, info]) => typeof info === 'object' ? info.size > maxSize : info > maxSize)
    .map(([path, info]) => ({
      path,
      size: typeof info === 'object' ? info.size : info,
      type: typeof info === 'object' ? info.type : type
    }))
    .sort((a, b) => b.size - a.size);
}

function generateRecommendations(buildStats, staticStats) {
  const recommendations = [];
  
  // Bundle size recommendations
  if (buildStats && buildStats.totalSize > CONFIG.maxBundleSize) {
    recommendations.push({
      type: 'bundle',
      severity: 'high',
      message: `Bundle size (${formatBytes(buildStats.totalSize)}) exceeds recommended limit (${formatBytes(CONFIG.maxBundleSize)})`,
      solutions: [
        'Implement code splitting for large components',
        'Use dynamic imports for rarely used features',
        'Optimize tree shaking to remove unused code',
        'Consider using lighter alternatives for heavy libraries'
      ]
    });
  }

  // Large chunks recommendations
  if (buildStats) {
    const largeChunks = findLargeFiles(buildStats.stats, CONFIG.maxChunkSize);
    if (largeChunks.length > 0) {
      recommendations.push({
        type: 'chunk',
        severity: 'medium',
        message: `Found ${largeChunks.length} chunks larger than ${formatBytes(CONFIG.maxChunkSize)}`,
        solutions: [
          'Split large chunks into smaller pieces',
          'Use dynamic imports for route-based code splitting',
          'Implement lazy loading for non-critical components'
        ]
      });
    }
  }

  // Image optimization recommendations
  if (staticStats) {
    const largeImages = findLargeFiles(staticStats.stats, CONFIG.maxImageSize, 'image');
    if (largeImages.length > 0) {
      recommendations.push({
        type: 'image',
        severity: 'medium',
        message: `Found ${largeImages.length} images larger than ${formatBytes(CONFIG.maxImageSize)}`,
        solutions: [
          'Compress images using next/image optimization',
          'Use modern image formats (WebP, AVIF)',
          'Implement responsive images with appropriate sizes',
          'Consider using image CDNs'
        ]
      });
    }
  }

  // Asset optimization recommendations
  if (staticStats) {
    const largeAssets = findLargeFiles(staticStats.stats, CONFIG.maxAssetSize, 'asset');
    if (largeAssets.length > 0) {
      recommendations.push({
        type: 'asset',
        severity: 'low',
        message: `Found ${largeAssets.length} assets larger than ${formatBytes(CONFIG.maxAssetSize)}`,
        dependencies: [
          'Minify CSS and JavaScript files',
          'Use gzip compression for static assets',
          'Consider using CDN for static assets'
        ]
      });
    }
  }

  return recommendations;
}

function checkNextConfig() {
  const nextConfigPath = path.join(__dirname, '../next.config.js');
  
  if (!fs.existsSync(nextConfigPath)) {
    log('next.config.js not found. Creating optimized configuration...', 'yellow');
    
    const optimizedConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  
  // Image optimization
  images: {
    domains: ['localhost'], // Add your image domains here
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\\\/]node_modules[\\\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Output configuration
  output: 'standalone',
  
  // Security headers
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
`;
    
    fs.writeFileSync(nextConfigPath, optimizedConfig);
    log('Created optimized next.config.js', 'green');
    return true;
  }
  
  return false;
}

function checkPackageJson() {
  const packageJsonPath = path.join(__dirname, '../package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    log('package.json not found.', 'yellow');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check for bundle analyzer
  if (!packageJson.devDependencies?.['@next/bundle-analyzer']) {
    log('Adding @next/bundle-analyzer for bundle analysis...', 'yellow');
    
    try {
      execSync('npm install --save-dev @next/bundle-analyzer', { stdio: 'inherit' });
      log('Added @next/bundle-analyzer successfully', 'green');
      return true;
    } catch (error) {
      log('Failed to install @next/bundle-analyzer', 'red');
      return false;
    }
  }
  
  return false;
}

function generateBundleAnalysisReport(buildStats, staticStats, recommendations) {
  const reportPath = path.join(__dirname, '../bundle-analysis-report.md');
  
  let report = `# Bundle Size Analysis Report

Generated on: ${new Date().toISOString()}

## Summary

- **Total Bundle Size**: ${buildStats ? formatBytes(buildStats.totalSize) : 'N/A'}
- **Static Assets Size**: ${staticStats ? formatBytes(staticStats.totalSize) : 'N/A'}
- **Total Size**: ${buildStats && staticStats ? formatBytes(buildStats.totalSize + staticStats.totalSize) : 'N/A'}

## Bundle Breakdown

`;
  
  if (buildStats) {
    report += '\n### Build Files\n\n';
    report += '| File | Size | Type |\n';
    report += '|------|------|------|\n';
    
    Object.entries(buildStats.stats)
      .sort(([, a], [, b]) => b - a)
      .forEach(([file, size]) => {
        const sizeStr = formatBytes(size);
        const type = file.endsWith('.js') ? 'JavaScript' : 
                    file.endsWith('.css') ? 'CSS' : 
                    file.endsWith('.json') ? 'JSON' : 'Other';
        report += `| \`${file}\` | ${sizeStr} | ${type} |\n`;
      });
  }
  
  if (staticStats) {
    report += '\n### Static Assets\n\n';
    report += '| File | Size | Type |\n';
    report += '|------|------|------|\n';
    
    Object.entries(staticStats.stats)
      .sort(([, a], [, b]) => b.size - a.size)
      .forEach(([file, info]) => {
        const sizeStr = formatBytes(info.size);
        report += `| \`${file}\` | ${sizeStr} | ${info.type} |\n`;
      });
  }
  
  if (recommendations.length > 0) {
    report += '\n## Recommendations\n\n';
    
    recommendations.forEach((rec, index) => {
      const severityColor = rec.severity === 'high' ? '🔴' : 
                           rec.severity === 'medium' ? '🟡' : '🟢';
      
      report += `### ${index + 1}. ${severityColor} ${rec.type.toUpperCase()} Issue\n\n`;
      report += `**Problem**: ${rec.message}\n\n`;
      
      if (rec.solutions) {
        report += '**Solutions**:\n';
        rec.solutions.forEach((solution, i) => {
          report += `${i + 1}. ${solution}\n`;
        });
        report += '\n';
      }
      
      if (rec.dependencies) {
        report += '**Dependencies**:\n';
        rec.dependencies.forEach((dep, i) => {
          report += `${i + 1}. ${dep}\n`;
        });
        report += '\n';
      }
    });
  }
  
  report += `
## Performance Targets

| Metric | Target | Current | Status |
|--------|--------|--------|--------|
| Bundle Size | ${formatBytes(CONFIG.maxBundleSize)} | ${buildStats ? formatBytes(buildStats.totalSize) : 'N/A'} | ${buildStats && buildStats.totalSize <= CONFIG.maxBundleSize ? '✅' : '❌'} |
| Chunk Size | ${formatBytes(CONFIG.maxChunkSize)} | N/A | N/A |
| Image Size | ${formatBytes(CONFIG.maxImageSize)} | N/A | N/A |
| Asset Size | ${formatBytes(CONFIG.maxAssetSize)} | N/A | N/A |

## Next Steps

1. Review the recommendations above
2. Implement the suggested optimizations
3. Re-run this analysis after changes
4. Monitor bundle size in future builds

---

*This report was generated automatically by the bundle analysis script.*
`;
  
  fs.writeFileSync(reportPath, report);
  log(`Bundle analysis report saved to: ${reportPath}`, 'green');
}

function main() {
  logHeader('Lumo Platform - Bundle Size Analysis');
  
  // Check prerequisites
  const configUpdated = checkNextConfig();
  const packageUpdated = checkPackageJson();
  
  if (configUpdated || packageUpdated) {
    log('Please restart your development server after making these changes.', 'yellow');
    return;
  }
  
  // Analyze build directory
  log('Analyzing build directory...', 'blue');
  const buildStats = analyzeBuildDirectory();
  
  if (!buildStats) {
    log('Failed to analyze build directory.', 'red');
    return;
  }
  
  // Analyze static assets
  log('Analyzing static assets...', 'blue');
  const staticStats = analyzeStaticAssets();
  
  // Generate recommendations
  log('Generating recommendations...', 'blue');
  const recommendations = generateRecommendations(buildStats, staticStats);
  
  // Display results
  logHeader('Analysis Results');
  
  log(`Total Bundle Size: ${formatBytes(buildStats.totalSize)}`, 
    buildStats.totalSize <= CONFIG.maxBundleSize ? 'green' : 'red');
  log(`Static Assets Size: ${formatBytes(staticStats ? staticStats.totalSize : 0)}`, 'blue');
  log(`Total Size: ${formatBytes(buildStats.totalSize + (staticStats?.totalSize || 0))}`, 'cyan');
  
  if (recommendations.length > 0) {
    log(`\nFound ${recommendations.length} optimization opportunities:`, 'yellow');
    
    recommendations.forEach((rec, index) => {
      const severityIcon = rec.severity === 'high' ? '🔴' : 
                         rec.severity === 'medium' ? '🟡' : '🟢';
      log(`${index + 1}. ${severityIcon} ${rec.type}: ${rec.message}`, 'white');
    });
  } else {
    log('\n✅ No optimization needed! Bundle size is within recommended limits.', 'green');
  }
  
  // Generate detailed report
  log('\nGenerating detailed report...', 'blue');
  generateBundleAnalysisReport(buildStats, staticStats, recommendations);
  
  logHeader('Analysis Complete');
  log('Bundle analysis completed successfully!', 'green');
  log('Check bundle-analysis-report.md for detailed recommendations.', 'cyan');
}

// Run the analysis
if (require.main === module) {
  main();
}
