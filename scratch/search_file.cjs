const fs = require('fs');
const path = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\c9c5a4a7-01a4-4489-9b87-02ad86f86983\\scratch\\chatbot_raw.html';
const content = fs.readFileSync(path, 'utf8');

const targetIndex = 145329;
console.log(content.substring(targetIndex - 1000, targetIndex + 1000));
