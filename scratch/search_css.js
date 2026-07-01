const fs = require('fs');
const glob = require('glob');

const files = glob.sync('C:/Users/lamshitha/.gemini/antigravity-ide/brain/c9c5a4a7-01a4-4489-9b87-02ad86f86983/scratch/**/*.css');
console.log('Found CSS files count:', files.length);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('47e8cba5')) {
    console.log('Match 47e8cba5 in:', file);
  }
  if (content.includes('42bac53e')) {
    console.log('Match 42bac53e in:', file);
  }
}
