const fs = require('fs');

const cssPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\scratch\\post-4438.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');

const containerIds = ['3257e5ad', '313b8ab9', '1121f521'];

containerIds.forEach(id => {
  console.log(`\n=== Rules for container ${id} ===`);
  const regex = new RegExp(`\\.elementor-element-${id}[^{]*\\{[^}]*\\}`, 'gi');
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    console.log(match[0]);
  }
});
