const fs = require('fs');

const fixAuthFile = (file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import \{ View/, 'import { View, SafeAreaView');
  content = content.replace(/<View style=\{styles\.container\}>/, '<SafeAreaView style={styles.container}>');
  // the last </View>
  const lastIndex = content.lastIndexOf('</View>');
  if (lastIndex !== -1) {
    content = content.substring(0, lastIndex) + '</SafeAreaView>' + content.substring(lastIndex + 7);
  }
  fs.writeFileSync(file, content);
}

fixAuthFile('app/(auth)/login.tsx');
fixAuthFile('app/(auth)/signup.tsx');
fixAuthFile('app/(auth)/forgot-password.tsx');
fixAuthFile('app/(auth)/profile-setup.tsx');
fixAuthFile('app/settings/caregiver.tsx');
fixAuthFile('app/add/sugar.tsx');
fixAuthFile('app/add/bp.tsx');
fixAuthFile('app/add/medicine.tsx');
fixAuthFile('app/medicines/index.tsx');
