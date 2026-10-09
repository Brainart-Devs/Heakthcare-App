const fs = require('fs');
const path = require('path');

const files = [
  'app/(auth)/login.tsx',
  'app/(tabs)/ai.tsx',
  'app/(tabs)/settings.tsx',
  'app/(tabs)/_layout.tsx',
  'app/ai/insights.tsx',
  'components/ui/Card.tsx'
];

files.forEach(file => {
  const fullPath = path.resolve(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Replace old purples with new oceanic palette
    content = content.replace(/#8E1EA2/gi, '#16449C'); // Deep Navy
    content = content.replace(/#C654C3/gi, '#0EADF1'); // Sky Blue
    content = content.replace(/#FFC0DE/gi, '#E5FAFA'); // Light Cyan
    content = content.replace(/#ED96D7/gi, '#05C2C4'); // Teal
    content = content.replace(/purple/gi, 'blue'); // Fallback string
    fs.writeFileSync(fullPath, content);
  }
});
