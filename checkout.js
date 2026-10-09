const { execSync } = require('child_process');
execSync('git restore app/(tabs)/index.tsx app/(tabs)/ai.tsx app/(tabs)/reports.tsx app/(tabs)/history.tsx app/(tabs)/settings.tsx');
