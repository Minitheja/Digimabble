const fs = require('fs');

const cssPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\scratch\\post-4438.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Match content widths
const matches = cssContent.match(/--content-width:[^;}\s]+/g);

if (matches) {
  console.log(`Found ${matches.length} content width values:`);
  console.log([...new Set(matches)]);
} else {
  console.log('No content-width variables found');
}
