const fs = require('fs');

let content = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');

content = content.replace(
  "import { mockUser, mockReadings } from '@/constants/mockData';",
  "import { mockUser, mockReadings } from '@/constants/mockData';\nimport { useUser } from '@/context/UserContext';"
);

content = content.replace(
  "export default function HomeDashboard() {",
  "export default function HomeDashboard() {\n  const { user } = useUser();"
);

// Replace {mockUser.name} with {user.name}
content = content.replace(/\{mockUser\.name\}/g, '{user.name}');
// Replace {mockUser.weight} with {user.weight}
content = content.replace(/\{mockUser\.weight\}/g, '{user.weight}');

fs.writeFileSync('app/(tabs)/index.tsx', content);
