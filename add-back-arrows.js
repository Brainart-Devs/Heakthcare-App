const fs = require('fs');

const tabsToUpdate = [
  { file: 'app/(tabs)/history.tsx', regex: /<Header title="History" \/>/ },
  { file: 'app/(tabs)/reports.tsx', regex: /<Header title="Reports" \/>/ },
  { file: 'app/(tabs)/settings.tsx', regex: /<Header title="Settings" \/>/ }
];

tabsToUpdate.forEach(({ file, regex }) => {
  let content = fs.readFileSync(file, 'utf8');

  // Check if router is imported
  if (!content.includes('import { router }')) {
    // try inserting it after react imports
    content = content.replace(/(import React.*?;\n)/, "$1import { router } from 'expo-router';\n");
  }

  // Replace Header
  content = content.replace(regex, (match) => {
    return match.replace('/>', `onBack={() => router.push('/')} />`);
  });

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
