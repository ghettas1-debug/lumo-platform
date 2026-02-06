const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { getWebVitals } = require('web-vitals');

async function runLighthouseAnalysis(url) {
  console.log(`🔍 Starting Lighthouse analysis for: ${url}`);
  
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    settings: {
      emulatedFormFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0
      }
    }
  };

  try {
    const runnerResult = await lighthouse(url, options);
    const { lhr } = runnerResult;
    
    await chrome.kill();
    
    return {
      performance: lhr.categories.performance.score * 100,
      accessibility: lhr.categories.accessibility.score * 100,
      bestPractices: lhr.categories.bestPractices.score * 100,
      seo: lhr.categories.seo.score * 100,
      metrics: {
        firstContentfulPaint: lhr.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: lhr.audits['largest-contentful-paint'].numericValue,
        cumulativeLayoutShift: lhr.audits['cumulative-layout-shift'].numericValue,
        totalBlockingTime: lhr.audits['total-blocking-time'].numericValue,
        speedIndex: lhr.audits['speed-index'].numericValue
      },
      opportunities: lhr.audits,
      diagnostics: lhr.audits['diagnostics']
    };
  } catch (error) {
    await chrome.kill();
    throw error;
  }
}

async function runMobileAnalysis(url) {
  console.log(`📱 Starting Mobile Lighthouse analysis for: ${url}`);
  
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
    settings: {
      emulatedFormFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
        disabled: false
      },
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0
      }
    }
  };

  try {
    const runnerResult = await lighthouse(url, options);
    const { lhr } = runnerResult;
    
    await chrome.kill();
    
    return {
      performance: lhr.categories.performance.score * 100,
      metrics: {
        firstContentfulPaint: lhr.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: lhr.audits['largest-contentful-paint'].numericValue,
        cumulativeLayoutShift: lhr.audits['cumulative-layout-shift'].numericValue,
        totalBlockingTime: lhr.audits['total-blocking-time'].numericValue,
        speedIndex: lhr.audits['speed-index'].numericValue
      }
    };
  } catch (error) {
    await chrome.kill();
    throw error;
  }
}

module.exports = {
  runLighthouseAnalysis,
  runMobileAnalysis
};
