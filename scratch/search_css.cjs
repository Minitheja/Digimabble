const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}

const scratchDir = 'C:/Users/lamshitha/.gemini/antigravity-ide/brain/c9c5a4a7-01a4-4489-9b87-02ad86f86983/scratch';
const files = walk(scratchDir);
console.log('CSS files count:', files.length);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('47e8cba5')) {
    console.log('Match 47e8cba5 in:', file);
  }
  if (content.includes('42bac53e')) {
    console.log('Match 42bac53e in:', file);
  }
}
