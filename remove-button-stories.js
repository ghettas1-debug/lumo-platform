const fs = require('fs');
const path = require('path');

// Find the Button stories file
const buttonStoriesFile = path.join(__dirname, 'src/components/Button/Button.stories.tsx');

console.log('Removing Button stories file...');

try {
  if (fs.existsSync(buttonStoriesFile)) {
    fs.unlinkSync(buttonStoriesFile);
    console.log(`Removed: ${buttonStoriesFile}`);
  } else {
    console.log('Button stories file not found, skipping...');
  }
} catch (error) {
  console.error(`Error removing Button stories:`, error);
}

console.log('Done!');
