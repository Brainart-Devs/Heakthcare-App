const fs = require('fs');
let content = fs.readFileSync('app/(tabs)/settings.tsx', 'utf8');

const innerComponentRegex = /const MenuItem = \(\{ icon, title, subtitle, onPress, color = '#4A6583', isDanger = false \}: any\) => \([\s\S]*?\n  \);\n/;
const match = content.match(innerComponentRegex);

if (match) {
  content = content.replace(innerComponentRegex, '');
  content = content.replace('export default function SettingsScreen() {', match[0] + '\nexport default function SettingsScreen() {');
  fs.writeFileSync('app/(tabs)/settings.tsx', content);
  console.log('Fixed MenuItem position');
} else {
  console.log('Could not find inner component');
}
