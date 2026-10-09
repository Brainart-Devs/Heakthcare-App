const fs = require('fs');

let content = fs.readFileSync('app/(tabs)/settings.tsx', 'utf8');

content = content.replace(
  "import { mockUser } from '@/constants/mockData';",
  "import { mockUser } from '@/constants/mockData';\nimport { useUser } from '@/context/UserContext';"
);

content = content.replace(
  "export default function SettingsScreen() {",
  "export default function SettingsScreen() {\n  const { user } = useUser();"
);

content = content.replace(/\{mockUser\.name\}/g, '{user.name}');

fs.writeFileSync('app/(tabs)/settings.tsx', content);
