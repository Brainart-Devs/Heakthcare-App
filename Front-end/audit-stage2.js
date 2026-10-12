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

// 1. Fix app/add/sugar.tsx layout rows and touch targets
replaceInFile('app/add/sugar.tsx', [
  [
    /<Input placeholder="Date" value=\{date\} onChangeText=\{setDate\} style=\{\{flex: 1, marginRight: Spacing\.sm\}\} \/>\s*<Input placeholder="Time" value=\{time\} onChangeText=\{setTime\} style=\{\{flex: 1, marginLeft: Spacing\.sm\}\} \/>/,
    '<View style={{flex: 1, paddingRight: Spacing.sm}}><Input placeholder="Date" value={date} onChangeText={setDate} /></View>\n          <View style={{flex: 1, paddingLeft: Spacing.sm}}><Input placeholder="Time" value={time} onChangeText={setTime} /></View>'
  ],
  [
    /onTouchEnd/g,
    'onPress'
  ],
  [
    /<View key=\{t\} onPress=\{\(\) => setType\(t\)\}>/g,
    '<TouchableOpacity key={t} onPress={() => setType(t)}>'
  ],
  [
    /<\/View>\n          \)\)\}/g,
    '</TouchableOpacity>\n          ))}'
  ]
]);

// Need to import TouchableOpacity in sugar.tsx
replaceInFile('app/add/sugar.tsx', [
  [/import \{ View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform \} from 'react-native';/, "import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';"]
]);

// 2. Fix app/add/bp.tsx layout rows and touch targets
replaceInFile('app/add/bp.tsx', [
  [
    /<Input placeholder="Systolic" keyboardType="numeric" value=\{systolic\} onChangeText=\{setSystolic\} style=\{\{flex: 1, marginRight: Spacing\.sm\}\} \/>\s*<Input placeholder="Diastolic" keyboardType="numeric" value=\{diastolic\} onChangeText=\{setDiastolic\} style=\{\{flex: 1, marginLeft: Spacing\.sm\}\} \/>/,
    '<View style={{flex: 1, paddingRight: Spacing.sm}}><Input placeholder="Systolic" keyboardType="numeric" value={systolic} onChangeText={setSystolic} /></View>\n          <View style={{flex: 1, paddingLeft: Spacing.sm}}><Input placeholder="Diastolic" keyboardType="numeric" value={diastolic} onChangeText={setDiastolic} /></View>'
  ],
  [
    /<Input placeholder="Date" value=\{date\} onChangeText=\{setDate\} style=\{\{flex: 1, marginRight: Spacing\.sm\}\} \/>\s*<Input placeholder="Time" value=\{time\} onChangeText=\{setTime\} style=\{\{flex: 1, marginLeft: Spacing\.sm\}\} \/>/,
    '<View style={{flex: 1, paddingRight: Spacing.sm}}><Input placeholder="Date" value={date} onChangeText={setDate} /></View>\n          <View style={{flex: 1, paddingLeft: Spacing.sm}}><Input placeholder="Time" value={time} onChangeText={setTime} /></View>'
  ],
  [
    /onTouchEnd/g,
    'onPress'
  ],
  [
    /<View key=\{p\} onPress=\{\(\) => setPeriod\(p\)\}>/g,
    '<TouchableOpacity key={p} onPress={() => setPeriod(p)}>'
  ],
  [
    /<\/View>\n          \)\)\}/g,
    '</TouchableOpacity>\n          ))}'
  ]
]);

// Need to import TouchableOpacity in bp.tsx
replaceInFile('app/add/bp.tsx', [
  [/import \{ View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform \} from 'react-native';/, "import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';"]
]);

// 3. Fix medicines screens
replaceInFile('app/medicines/index.tsx', [
  [/halfBtn: \{ flex: 1 \},/, ""],
  [
    /<Button title="\+ Add Medicine" onPress=\{\(\) => router\.push\('\/medicines\/new'\)\} style=\{styles\.halfBtn\} \/>\s*<Button title="History" variant="secondary" onPress=\{\(\) => router\.push\('\/history'\)\} style=\[styles\.halfBtn, \{marginLeft: Spacing\.md\}\] \/>/,
    '<View style={{flex: 1, paddingRight: Spacing.sm}}><Button title="+ Add Medicine" onPress={() => router.push(\'/medicines/new\')} /></View>\n          <View style={{flex: 1, paddingLeft: Spacing.sm}}><Button title="History" variant="secondary" onPress={() => router.push(\'/history\')} /></View>'
  ]
]);
