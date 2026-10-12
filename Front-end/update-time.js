const fs = require('fs');

let content = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');

// We add the two helper functions inside the HomeDashboard component
const dynamicLogic = `  const { user } = useUser();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const getFormattedDate = () => {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    // @ts-ignore
    return new Date().toLocaleDateString('en-US', options);
  };
`;

content = content.replace("  const { user } = useUser();", dynamicLogic);

// Replace the hardcoded texts
content = content.replace('<Text variant="bodyLarge">Good Morning</Text>', '<Text variant="bodyLarge">{getGreeting()}</Text>');
content = content.replace('<Text variant="body" secondary>Tue, 01 Oct 2024</Text>', '<Text variant="body" secondary>{getFormattedDate()}</Text>');

fs.writeFileSync('app/(tabs)/index.tsx', content);
