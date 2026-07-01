const fs = require('fs');

const contentPath = 'C:\\Users\\lamshitha\\.gemini\\antigravity-ide\\brain\\1f4fe140-f320-44cc-95da-4e9c0b3fd1d6\\.system_generated\\steps\\542\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// We can search for the main container content between <main> and </main> or just elementor tags
const startIdx = content.indexOf('<div data-elementor-type="wp-page"');
const endIdx = content.lastIndexOf('<!-- .entry-content -->');

if (startIdx !== -1 && endIdx !== -1) {
  const mainC = content.substring(startIdx, endIdx);
  fs.writeFileSync('C:\\Users\\lamshitha\\Desktop\\Digimabble\\scratch\\raw_voice_html.html', mainC);
  console.log('Successfully saved raw_voice_html.html!');
} else {
  console.log('Could not locate main elementor container');
  // fallback save whole file as HTML
  fs.writeFileSync('C:\\Users\\lamshitha\\Desktop\\Digimabble\\scratch\\raw_voice_html.html', content);
}
