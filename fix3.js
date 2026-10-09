const fs = require('fs');

const tabFiles = ['index.tsx', 'history.tsx', 'ai.tsx', 'reports.tsx', 'settings.tsx'];
tabFiles.forEach(f => {
  const file = `app/(tabs)/${f}`;
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the last </View> and change it to </SafeAreaView>
  const parts = content.split('</View>');
  if (parts.length > 1) {
    const lastPart = parts.pop();
    content = parts.join('</View>') + '</SafeAreaView>' + lastPart;
    fs.writeFileSync(file, content);
  }
});
