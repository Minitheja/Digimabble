const fs = require('fs');

const htmlPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\c9c5a4a7-01a4-4489-9b87-02ad86f86983\\scratch\\chatbot_raw.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract Mailchimp (around line 885)
const mailchimpStart = html.indexOf('<svg xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105" fill="none"><rect width="105" height="105" rx="10.5" fill="white"></rect><path d="M52.5 24.9375C37.2975');
const mailchimpEnd = html.indexOf('</svg>', mailchimpStart) + 6;
const mailchimpSvg = html.substring(mailchimpStart, mailchimpEnd);

// Extract Snapchat (around line 891)
const snapchatStart = html.indexOf('<svg xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105" fill="none"><rect width="105" height="105" rx="10.5" fill="white"></rect><rect x="20.999" y="21" width="62.9999" height="62.9999" rx="31.5" fill="#FFFC00"></rect><path d="M68.9268 62.563C');
const snapchatEnd = html.indexOf('</svg>', snapchatStart) + 6;
const snapchatSvg = html.substring(snapchatStart, snapchatEnd);

console.log('=== MAILCHIMP ===');
console.log(mailchimpSvg.replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule').replace(/stroke-width/g, 'strokeWidth'));

console.log('=== SNAPCHAT ===');
console.log(snapchatSvg.replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule').replace(/stroke-width/g, 'strokeWidth'));
