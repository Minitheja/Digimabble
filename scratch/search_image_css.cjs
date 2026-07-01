const fs = require('fs');
const file = 'C:/Users/lamshitha/.gemini/antigravity-ide/brain/c9c5a4a7-01a4-4489-9b87-02ad86f86983/scratch/post-897.css';
const content = fs.readFileSync(file, 'utf8');

const regexes = [
  /\.elementor-widget-image\s*img\s*\{([^}]+)\}/i,
  /\.elementor-widget-image\s*\{([^}]+)\}/i,
  /img\s*\{([^}]+)\}/i
];

for (const regex of regexes) {
  const match = content.match(regex);
  if (match) {
    console.log(match[0]);
  } else {
    console.log('No match for:', regex.toString());
  }
}
