const axeCore = require('axe-core');

async function runAccessibilityAnalysis(url) {
  console.log(`♿ Starting Accessibility analysis for: ${url}`);
  
  const chrome = await require('chrome-launcher').launch({ chromeFlags: ['--headless'] });
  
  try {
    const page = await require('puppeteer').launch({
      headless: true,
      executablePath: chrome.chromePath
    }).then(browser => browser.newPage());
    
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const accessibilityResults = await page.evaluate(() => {
      return axeCore.run(document, {
        rules: {
          'color-contrast': { enabled: true },
          'keyboard-navigation': { enabled: true },
          'aria-labels': { enabled: true },
          'focus-management': { enabled: true },
          'screen-reader': { enabled: true },
          'language': { enabled: true },
          'document-title': { enabled: true }
        }
      });
    });
    
    await page.close();
    await chrome.kill();
    
    return {
      score: calculateAccessibilityScore(accessibilityResults),
      violations: accessibilityResults.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map(node => ({
          html: node.html,
          target: node.target,
          failureSummary: node.failureSummary
        }))
      })),
      passes: accessibilityResults.passes.length,
      incomplete: accessibilityResults.incomplete.length,
      wcagLevel: 'AA',
      standards: {
        'WCAG 2.1 AA': checkWCAGCompliance(accessibilityResults),
        'Section 508': checkSection508Compliance(accessibilityResults),
        'EN 301 549': checkEN301Compliance(accessibilityResults)
      }
    };
  } catch (error) {
    await chrome.kill();
    throw error;
  }
}

function calculateAccessibilityScore(results) {
  const totalChecks = results.violations.length + results.passes.length + results.incomplete.length;
  const passedChecks = results.passes.length;
  return Math.round((passedChecks / totalChecks) * 100);
}

function checkWCAGCompliance(results) {
  const wcagLevels = {
    'A': 0,
    'AA': 0,
    'AAA': 0
  };
  
  results.violations.forEach(violation => {
    if (violation.impact === 'critical') wcagLevels.A++;
    if (violation.impact === 'serious') wcagLevels.AA++;
    if (violation.impact === 'moderate') wcagLevels.AAA++;
  });
  
  return {
    compliant: wcagLevels.AA === 0,
    violations: wcagLevels
  };
}

function checkSection508Compliance(results) {
  const section508Violations = results.violations.filter(v => 
    v.tags.includes('cat.508')
  );
  
  return {
    compliant: section508Violations.length === 0,
    violations: section508Violations.length
  };
}

function checkEN301Compliance(results) {
  const en301Violations = results.violations.filter(v => 
    v.tags.includes('cat.en-301-549')
  );
  
  return {
    compliant: en301Violations.length === 0,
    violations: en301Violations.length
  };
}

module.exports = {
  runAccessibilityAnalysis
};
