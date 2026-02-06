const fs = require('fs');
const path = require('path');

function analyzeSEO() {
  console.log(`🔍 Starting SEO analysis...`);
  
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
  
  // Global analysis
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
  
  // Check for duplicate titles
  const titles = pages.map(p => p.title).filter(Boolean);
  const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index);
  if (duplicateTitles.length > 0) {
    issues.push('Duplicate page titles found');
  }
  
  // Check for duplicate descriptions
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

module.exports = {
  analyzeSEO
};
