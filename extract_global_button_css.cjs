const fs = require('fs');

const cssPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\scratch\\post-4438.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Match global mas-creative-btn styles
const matches = cssContent.match(/\.mas-creative-btn[^{]*\{[^}]*\}/g);

if (matches) {
  console.log(`Found ${matches.length} matches:`);
  matches.forEach((m, idx) => {
    if (idx < 10) console.log(m);
  });
} else {
  console.log('No matches found for mas-creative-btn');
}
