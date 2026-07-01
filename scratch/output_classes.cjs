const fs = require('fs');
const file = 'C:/Users/lamshitha/.gemini/antigravity-ide/brain/c9c5a4a7-01a4-4489-9b87-02ad86f86983/scratch/post-897.css';
const content = fs.readFileSync(file, 'utf8');

const regexes = [/\.elementor-element-47e8cba5\s*\{([^}]+)\}/, /\.elementor-element-42bac53e\s*\{([^}]+)\}/];

for (const regex of regexes) {
  const match = content.match(regex);
  if (match) {
    console.log(match[0]);
  } else {
    console.log('No match for regex:', regex.toString());
  }
}
