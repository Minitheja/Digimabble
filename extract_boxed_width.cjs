const fs = require('fs');

const cssPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\scratch\\post-4438.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Match boxed container rules
const matches = cssContent.match(/\.e-con-boxed[^{]*\{[^}]*\}/g);

if (matches) {
  console.log(`Found ${matches.length} boxed container rules:`);
  matches.forEach(m => console.log(m));
} else {
  console.log('No boxed container rules found');
}
