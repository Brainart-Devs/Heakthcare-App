const fs = require('fs');
const path = require('path');

const replaceInFile = (file, replacements) => {
  const p = path.resolve(__dirname, file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  replacements.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  fs.writeFileSync(p, content);
};

// 1. Audit Auth Screens (Fix spacing)
replaceInFile('app/(auth)/login.tsx', [
  [/marginVertical: Spacing\.xl/g, 'marginBottom: Spacing.xxl'],
  [/<Button title="Google" variant="outline" style=\{\{flex: 1, marginRight: Spacing\.sm\}\} \/>/g, '<Button title="Google" variant="outline" style={{flex: 1, marginRight: Spacing.sm}} icon={<Text>G</Text>} />'], // We don't have SVG Google logo but wait, we can just use normal text or Feather. Actually, let's just fix the gap.
]);

// 2. Audit Dashboard (Home)
replaceInFile('app/(tabs)/index.tsx', [
  // Add SafeAreaView import
  [/import \{ View, StyleSheet, ScrollView \} from 'react-native';/, "import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';\nimport { Feather, MaterialCommunityIcons } from '@expo/vector-icons';"],
  
  // Wrap with SafeAreaView
  [/<View style=\{styles\.container\}>/, "<SafeAreaView style={styles.container}>"],
  [/<\/ScrollView>\n    <\/View>/, "</ScrollView>\n    </SafeAreaView>"],

  // Fix header layout and emojis
  [
    /<Button variant="outline" title="🔔" onPress=\{\(\) => router\.push\('\/notifications'\)\} style=\{styles\.iconBtn\} \/>/g,
    '<TouchableOpacity onPress={() => router.push(\'/notifications\')} style={styles.iconWrapper}><Feather name="bell" size={24} color="#16449C" /></TouchableOpacity>'
  ],
  [
    /<Button variant="outline" title="🚨" onPress=\{\(\) => router\.push\('\/safety-alert'\)\} style=\[styles\.iconBtn, \{marginLeft: 8\}\] \/>/g,
    '<TouchableOpacity onPress={() => router.push(\'/safety-alert\')} style={[styles.iconWrapper, {marginLeft: 12}]}><MaterialCommunityIcons name="alert-plus-outline" size={28} color="#FF3B30" /></TouchableOpacity>'
  ],

  // Fix row buttons
  [
    /<Button title="\+ Add Sugar" onPress=\{\(\) => router\.push\('\/add\/sugar'\)\} style=\{styles\.halfBtn\} \/>\s*<Button title="\+ Add BP" onPress=\{\(\) => router\.push\('\/add\/bp'\)\} style=\[styles\.halfBtn, \{marginLeft: Spacing\.md\}\] \/>/,
    '<View style={{flex: 1, paddingRight: Spacing.sm}}><Button title="+ Sugar" onPress={() => router.push(\'/add/sugar\')} /></View>\n          <View style={{flex: 1, paddingLeft: Spacing.sm}}><Button title="+ BP" onPress={() => router.push(\'/add/bp\')} /></View>'
  ],
  
  // Fix styles
  [
    /container: \{ flex: 1 \},/,
    "container: { flex: 1, backgroundColor: '#FFFFFF' },\n  iconWrapper: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E5FAFA', justifyContent: 'center', alignItems: 'center' },"
  ],
  [/iconBtn: \{ minHeight: 48, paddingHorizontal: 12 \},/, ""],
  [/halfBtn: \{ flex: 1 \},/, ""]
]);

// 3. Audit other Tabs (Add SafeAreaView)
const tabFiles = ['history.tsx', 'ai.tsx', 'reports.tsx', 'settings.tsx'];
tabFiles.forEach(file => {
  replaceInFile(`app/(tabs)/${file}`, [
    [/import \{ View/, "import { View, SafeAreaView"],
    [/<View style=\{styles\.container\}>/, "<SafeAreaView style={styles.container}>"],
    [/<\/View>\n  \);\n\}/, "</SafeAreaView>\n  );\n}"],
    [/container: \{ flex: 1 \}/, "container: { flex: 1, backgroundColor: '#FFFFFF' }"]
  ]);
});

