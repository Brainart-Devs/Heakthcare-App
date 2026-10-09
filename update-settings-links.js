const fs = require('fs');

let content = fs.readFileSync('app/(tabs)/settings.tsx', 'utf8');

content = content.replace(
  "onPress={() => router.push('/(auth)/profile-setup?edit=true' as any)}>Edit Profile</Text>",
  "onPress={() => router.push('/profile' as any)}>View Profile</Text>"
);

content = content.replace(
  "onPress={() => router.push('/(auth)/profile-setup?edit=true' as any)}>👤 My Profile</Text>",
  "onPress={() => router.push('/profile' as any)}>👤 My Profile</Text>"
);

fs.writeFileSync('app/(tabs)/settings.tsx', content);
