const fs = require('fs');

const cssPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\scratch\\post-4438.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');

const id = '494de3';
console.log(`\n=== Rules for parent container ${id} ===`);
const regex = new RegExp(`\\.elementor-element-${id}[^{]*\\{[^}]*\\}`, 'gi');
let match;
while ((match = regex.exec(cssContent)) !== null) {
  console.log(match[0]);
}
