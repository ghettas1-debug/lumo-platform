const fs = require('fs');
const path = require('path');

// Get all course page files
const coursesDir = path.join(__dirname, 'src/app/courses');
const files = fs.readdirSync(coursesDir, { withFileTypes: true })
  .filter(file => file.isFile() && file.name.endsWith('.tsx'))
  .map(file => path.join(coursesDir, file.name));

// Also check subdirectories
const subdirs = fs.readdirSync(coursesDir, { withFileTypes: true })
  .filter(file => file.isDirectory());

subdirs.forEach(subdir => {
  const subdirPath = path.join(coursesDir, subdir.name);
  const subFiles = fs.readdirSync(subdirPath, { withFileTypes: true })
    .filter(file => file.isFile() && file.name === 'page.tsx')
    .map(file => path.join(subdirPath, file.name));
  files.push(...subFiles);
});

console.log('Found files:', files.length);

// Fix each file
files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if course objects have isNew property but it's not defined in the type
    if (content.includes('course.isNew') && !content.includes('isNew?: boolean')) {
      console.log(`Fixing isNew property in: ${filePath}`);
      
      // Add isNew property to course type/interface
      content = content.replace(
        /interface Course \{[\s\S]*?\}/g,
        (match) => {
          if (match.includes('isNew')) return match;
          return match.replace(
            '}',
            '  isNew?: boolean;\n}'
          );
        }
      );
      
      // Or add isNew to course objects
      content = content.replace(
        /(\{[^}]*?isBestseller[^}]*?\})/g,
        (match) => {
          if (match.includes('isNew')) return match;
          return match.replace(
            'isBestseller',
            'isNew?: boolean,\n    isBestseller'
          );
        }
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log('Done!');
