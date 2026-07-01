const fs = require('fs');

const cssPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\scratch\\post-4438.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Search for any selector containing elementor-element-244e6a5
const matches = cssContent.match(/\.elementor-element-244e6a5[^{]*\{[^}]*\}/g);

if (matches) {
  console.log(`Found ${matches.length} matches:`);
  matches.forEach(m => console.log(m));
} else {
  console.log('No matches found for elementor-element-244e6a5');
}
