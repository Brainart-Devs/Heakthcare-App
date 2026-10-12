const fs = require('fs');

const fixFile = (file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Clean all SafeAreaView back to View
  content = content.replace(/<SafeAreaView/g, '<View');
  content = content.replace(/<\/SafeAreaView>/g, '</View>');
  
  // Make the top wrapper SafeAreaView
  content = content.replace(/<View style=\{styles\.container\}>/, '<SafeAreaView style={styles.container}>');
  
  // Replace the absolute last </View> before );
  content = content.replace(/<\/View>\s*\);\s*\}/, '</SafeAreaView>\n  );\n}');

  fs.writeFileSync(file, content);
}

const tabFiles = ['index.tsx', 'history.tsx', 'ai.tsx', 'reports.tsx', 'settings.tsx'];
tabFiles.forEach(f => fixFile(`app/(tabs)/${f}`));
