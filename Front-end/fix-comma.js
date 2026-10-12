const fs = require('fs');
let content = fs.readFileSync('app/(tabs)/settings.tsx', 'utf8');

content = content.replace("fontWeight: '700'\n  }\n\n  // Modal Styles", "fontWeight: '700'\n  },\n\n  // Modal Styles");

fs.writeFileSync('app/(tabs)/settings.tsx', content);
console.log('Fixed comma');
