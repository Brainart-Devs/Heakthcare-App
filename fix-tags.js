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

// Fix tab screens
const tabFiles = ['index.tsx', 'history.tsx', 'ai.tsx', 'reports.tsx', 'settings.tsx'];
tabFiles.forEach(file => {
  replaceInFile(`app/(tabs)/${file}`, [
    [/<\/ScrollView>\s*<\/View>/g, '</ScrollView>\n    </SafeAreaView>'],
    [/<\/View>\s*\);\s*\}/g, '</SafeAreaView>\n  );\n}']
  ]);
});

// Re-verify that index.tsx actually changed it
replaceInFile('app/(tabs)/index.tsx', [
  [/<\/ScrollView>\s*<\/View>/g, '</ScrollView>\n    </SafeAreaView>']
]);

// Fix add screens
const addFiles = ['sugar.tsx', 'bp.tsx'];
addFiles.forEach(file => {
  replaceInFile(`app/add/${file}`, [
    [/<\/TouchableOpacity>\s*\)\)\}/g, '</TouchableOpacity>\n          ))}'] // Fix closing brackets if broken
  ]);
});
