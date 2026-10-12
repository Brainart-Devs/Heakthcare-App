const fs = require('fs');
let content = fs.readFileSync('app/(tabs)/ai.tsx', 'utf8');

if (!content.includes('import { router }')) {
  content = content.replace("import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';", "import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';\nimport { router } from 'expo-router';");
}

content = content.replace(
  `onBack={() => {
        const { router } = require('expo-router');
        router.push('/');
      }}`,
  `onBack={() => router.push('/')}`
);

fs.writeFileSync('app/(tabs)/ai.tsx', content);
