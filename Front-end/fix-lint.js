const fs = require('fs');

let content = fs.readFileSync('app/reports/export.tsx', 'utf8');

const innerComponentRegex = /const CheckboxRow = \(\{ label, isChecked, onPress \}[\s\S]*?\n  \);\n/;
const match = content.match(innerComponentRegex);

if (match) {
  content = content.replace(innerComponentRegex, '');
  content = content.replace('export default function ReportExport() {', match[0] + '\nexport default function ReportExport() {');
  fs.writeFileSync('app/reports/export.tsx', content);
  console.log('Fixed CheckboxRow position');
} else {
  console.log('Could not find inner component');
}
