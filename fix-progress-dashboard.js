const fs = require('fs');
const path = require('path');

// Find the PersonalizedDashboard file
const dashboardFile = path.join(__dirname, 'src/components/dashboard/PersonalizedDashboard.optimized.tsx');

console.log('Fixing ProgressDashboard props error...');

try {
  if (fs.existsSync(dashboardFile)) {
    let content = fs.readFileSync(dashboardFile, 'utf8');
    
    // Fix the ProgressDashboard props by removing the problematic props
    content = content.replace(
      /<ProgressDashboard\s+analytics={analytics}\s+preferences={userPreferences}\s*\/>/,
      `<ProgressDashboard />`
    );
    
    fs.writeFileSync(dashboardFile, content);
    console.log(`Fixed: ${dashboardFile}`);
  } else {
    console.log('PersonalizedDashboard file not found, skipping...');
  }
} catch (error) {
  console.error(`Error fixing PersonalizedDashboard:`, error);
}

console.log('Done!');
