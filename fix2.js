const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<TouchableOpacity key=\{.*\} onPress=\{.*\}\>\s*<Badge.*?\/>\s*<\/View>/g, (match) => {
    return match.replace('</View>', '</TouchableOpacity>');
  });
  fs.writeFileSync(file, content);
}

fix('app/add/sugar.tsx');
fix('app/add/bp.tsx');
