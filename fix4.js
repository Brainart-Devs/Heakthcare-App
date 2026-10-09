const fs = require('fs');

const fixFile = (file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Revert all SafeAreaView changes
  content = content.replace(/<SafeAreaView/g, '<View');
  content = content.replace(/<\/SafeAreaView>/g, '</View>');
  
  // Now explicitly make the top-level container SafeAreaView again if we want to
  // But wait! If we are in Expo Router tabs (headerShown: false), we DO need SafeAreaView.
  // The structure is usually:
  // return (
  //   <View style={styles.container}> ... </View>
  // );
  
  // So we just replace the VERY FIRST <View style={styles.container}> and the VERY LAST </View>
  // Let's do it with string operations
  content = content.replace('<View style={styles.container}>', '<SafeAreaView style={styles.container}>');
  
  // Find the last </View> before the final );
  const lastIndex = content.lastIndexOf('</View>\n  );\n}');
  if (lastIndex !== -1) {
    content = content.substring(0, lastIndex) + '</SafeAreaView>' + content.substring(lastIndex + 7);
  }
  
  // Add SafeAreaView to imports if missing
  if (!content.includes('SafeAreaView')) {
    content = content.replace(/import \{ View/, 'import { View, SafeAreaView');
  }

  fs.writeFileSync(file, content);
}

const tabFiles = ['index.tsx', 'history.tsx', 'ai.tsx', 'reports.tsx', 'settings.tsx'];
tabFiles.forEach(f => fixFile(`app/(tabs)/${f}`));

