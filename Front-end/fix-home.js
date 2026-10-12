const fs = require('fs');

let content = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');

// 1. Fix line height (chopped text)
content = content.replace(
  "metricBig: { fontSize: 32, fontWeight: '800', color: '#111827', marginVertical: Spacing.xs },",
  "metricBig: { fontSize: 32, fontWeight: '800', color: '#111827', marginVertical: Spacing.xs, lineHeight: 38 },"
);
content = content.replace(
  "metricMedium: { fontSize: 24, fontWeight: '800', color: '#111827', marginVertical: 4 },",
  "metricMedium: { fontSize: 24, fontWeight: '800', color: '#111827', marginVertical: 4, lineHeight: 30 },"
);

// 2. Fix the stretched middle cards
content = content.replace(
  "row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },",
  "row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md, alignItems: 'flex-start' },"
);

// 3. Fix the gradient background being too short
content = content.replace(
  "height: Platform.OS === 'ios' ? 280 : 250,",
  "height: Platform.OS === 'ios' ? 320 : 300,"
);

fs.writeFileSync('app/(tabs)/index.tsx', content);
