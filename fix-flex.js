const fs = require('fs');

let content = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');

// 1. Fix the top row to use percentages instead of flex
content = content.replace(
  '<View style={styles.row}>',
  '<View style={[styles.row, {gap: 0, justifyContent: \'space-between\'}]}>'
);
content = content.replace(/<Card style=\{styles\.flexCard\}>/g, '<Card style={styles.halfCard}>');

// 2. Fix the middle row to use percentages
content = content.replace(
  '<View style={styles.row}>',
  '<View style={[styles.row, {gap: 0, justifyContent: \'space-between\'}]}>'
);
content = content.replace(
  "<Card style={[styles.flexCard, {alignItems: 'center', justifyContent: 'center'}]}>\n                <Text variant=\"body\" color=\"#4A6583\" style={{fontWeight: '500'}}>Pulse",
  "<Card style={[styles.thirdCard, {alignItems: 'center', justifyContent: 'center'}]}>\n                <Text variant=\"body\" color=\"#4A6583\" style={{fontWeight: '500'}}>Pulse"
);
content = content.replace(
  "<Card style={[styles.flexCard, {alignItems: 'center', justifyContent: 'center'}]}>\n                <Text variant=\"body\" color=\"#4A6583\" style={{fontWeight: '500'}}>Weight",
  "<Card style={[styles.thirdCard, {alignItems: 'center', justifyContent: 'center'}]}>\n                <Text variant=\"body\" color=\"#4A6583\" style={{fontWeight: '500'}}>Weight"
);
content = content.replace(
  "<Card style={[styles.flexCard, {flex: 1.4, alignItems: 'flex-start'}]}>",
  "<Card style={styles.fortyCard}>"
);

// Fix "Today's Medicine s" line break issue by ensuring width and shrinking text if needed, 
// actually the width is now 40%, it should fit. Let's just adjust it.
content = content.replace(
  ">Today&apos;s Medicines</Text>",
  " numberOfLines={1} adjustsFontSizeToFit>Today&apos;s Medicines</Text>"
);

// 3. Fix the action buttons row
content = content.replace(
  "<View style={[styles.row, {marginTop: Spacing.sm, marginBottom: Spacing.xl}]}>",
  "<View style={[styles.row, {marginTop: Spacing.sm, marginBottom: Spacing.xl, gap: Spacing.md}]}>"
);
// For action buttons, we CAN use flex because there are only two and no padding weirdness inside a bounded box.
// So gap: Spacing.md is fine for action buttons.


// 4. Update the styles at the bottom
let stylesStr = `  // Cards with Gap
  row: { 
    flexDirection: 'row', 
    marginBottom: Spacing.md, 
    alignItems: 'stretch' 
  },
  halfCard: { 
    width: '48%', 
    padding: Spacing.lg, 
    borderRadius: 20 
  },
  thirdCard: { 
    width: '28%', 
    padding: Spacing.md, 
    borderRadius: 20 
  },
  fortyCard: {
    width: '40%',
    padding: Spacing.md,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  flexCard: { 
    flex: 1, 
    padding: Spacing.lg, 
    borderRadius: 20 
  },`;

content = content.replace(
  /  \/\/ Cards with Gap[\s\S]*?borderRadius: 20 \n  \},/,
  stylesStr
);

// 5. Fix gradient height
content = content.replace(
  "height: Platform.OS === 'ios' ? 360 : 340,",
  "height: Platform.OS === 'ios' ? 240 : 220,"
);

fs.writeFileSync('app/(tabs)/index.tsx', content);
