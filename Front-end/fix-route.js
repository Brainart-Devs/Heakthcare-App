const fs = require('fs');

let profileContent = fs.readFileSync('app/profile/index.tsx', 'utf8');
profileContent = profileContent.replace("'/(auth)/profile-setup?edit=true' as any", "'/profile-setup?edit=true' as any");
fs.writeFileSync('app/profile/index.tsx', profileContent);

let settingsContent = fs.readFileSync('app/(tabs)/settings.tsx', 'utf8');
settingsContent = settingsContent.replace("'/(auth)/profile-setup?edit=true'", "'/profile-setup?edit=true'");
fs.writeFileSync('app/(tabs)/settings.tsx', settingsContent);

console.log('Fixed router paths');
