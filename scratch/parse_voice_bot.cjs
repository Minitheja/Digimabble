const fs = require('fs');
const contentPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\.system_generated\\steps\\542\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// Simple regex to extract headings and their immediate following text
const regex = /<(h[1-6]|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  const tag = match[1].toLowerCase();
  let text = match[2].replace(/<[^>]*>/g, '').trim();
  if (text.length > 0 && !text.includes('var ') && !text.includes('{') && text.length < 500) {
    console.log(`[${tag.toUpperCase()}] ${text}`);
    count++;
  }
}
console.log(`Total elements: ${count}`);
