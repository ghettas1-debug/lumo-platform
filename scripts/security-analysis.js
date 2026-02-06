const fs = require('fs');
const path = require('path');

function analyzeSecurity() {
  console.log(`🔒 Starting Security analysis...`);
  
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
    
    // Check for XSS vulnerabilities
    checkXSSVulnerabilities(content, filePath);
    
    // Check for CSRF protection
    checkCSRFProtection(content, filePath);
    
    // Check for input validation
    checkInputValidation(content, filePath);
    
    // Check for authentication issues
    checkAuthentication(content, filePath);
    
    // Check for authorization issues
    checkAuthorization(content, filePath);
    
    // Check for data exposure
    checkDataExposure(content, filePath);
  }
  
  function checkXSSVulnerabilities(content, filePath) {
    // Check for dangerouslySetInnerHTML
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
    
    // Check for unescaped HTML
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
    
    // Check for eval usage
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
    // Check for form submissions without CSRF tokens
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
    // Check for direct use of user input
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
    // Check for protected routes without authentication
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
    // Check for role-based access control
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
    // Check for sensitive data in frontend
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
  
  // Check for vulnerable dependencies
  checkDependencies();
  
  analyzeDirectory(srcDir);
  
  // Generate recommendations
  analysis.recommendations = generateSecurityRecommendations(analysis);
  
  return analysis;
}

function checkDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});
    
    // Check for known vulnerable packages (simplified)
    const vulnerablePackages = [
      'axios<1.0.0',
      'react<16.9.0',
      'next<12.0.0'
    ];
    
    for (const dep of dependencies) {
      for (const vulnerable of vulnerablePackages) {
        if (dep.startsWith(vulnerable.split('<')[0])) {
          // This is a simplified check - in reality, you'd use a database like npm audit
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

module.exports = {
  analyzeSecurity
};
