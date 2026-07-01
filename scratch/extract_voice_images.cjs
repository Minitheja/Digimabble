const fs = require('fs');
const contentPath = 'C:\\\\Users\\\\lamshitha\\\\.gemini\\\\antigravity-ide\\\\brain\\\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\\\.system_generated\\\\steps\\\\542\\\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

const regex = /https:\/\/digimabbleai\.com\/wp-content\/uploads\/[0-9a-zA-Z\/\-_.]+\.png/gi;
const matches = content.match(regex);

if (matches) {
  console.log('Found matches:');
  console.log([...new Set(matches)]);
} else {
  console.log('No matches');
}
