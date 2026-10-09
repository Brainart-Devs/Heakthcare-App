const fs = require('fs');
const path = require('path');

const applyKeyboardAvoiding = (filePath, contentOverrides) => {
  const fullPath = path.join(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  if (!content.includes('KeyboardAvoidingView')) {
    content = content.replace(
      "import { View, StyleSheet, ScrollView } from 'react-native';",
      "import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';"
    );
    // Some files might have different imports
    content = content.replace(
      "import { View, StyleSheet } from 'react-native';",
      "import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';"
    );
  }

  // Wrap the ScrollView or main content
  // We'll replace <ScrollView contentContainerStyle={styles.content}>
  // with <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}><ScrollView ...>
  if (content.includes('<ScrollView contentContainerStyle={styles.content}>') && !content.includes('<KeyboardAvoidingView')) {
    content = content.replace(
      '<ScrollView contentContainerStyle={styles.content}>',
      '<KeyboardAvoidingView behavior={Platform.OS === \'ios\' ? \'padding\' : \'height\'} style={{ flex: 1 }}><ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>'
    );
    // Close it
    content = content.replace(
      '</ScrollView>\n    </View>',
      '</ScrollView></KeyboardAvoidingView>\n    </View>'
    );
  }

  if (contentOverrides) {
    content = contentOverrides(content);
  }

  fs.writeFileSync(fullPath, content);
};

// Apply to form screens
['app/add/sugar.tsx', 'app/add/bp.tsx', 'app/add/medicine.tsx', 'app/(auth)/login.tsx', 'app/(auth)/signup.tsx', 'app/(auth)/profile-setup.tsx', 'app/settings/caregiver.tsx', 'app/reports/export.tsx'].forEach(file => {
  try {
    applyKeyboardAvoiding(file);
  } catch(e) {}
});

// Fix AI Chat Screen Keyboard
const aiScreenPath = path.join(__dirname, 'app/(tabs)/ai.tsx');
let aiContent = fs.readFileSync(aiScreenPath, 'utf8');
if (!aiContent.includes('KeyboardAvoidingView')) {
  aiContent = aiContent.replace(
    "import { View, StyleSheet, ScrollView } from 'react-native';",
    "import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';"
  );
  aiContent = aiContent.replace(
    '<Header title="AI Health Assistant" />',
    '<Header title="AI Health Assistant" />\n      <KeyboardAvoidingView behavior={Platform.OS === \'ios\' ? \'padding\' : \'height\'} style={{ flex: 1 }} keyboardVerticalOffset={90}>'
  );
  aiContent = aiContent.replace(
    '</View>\n  );\n}',
    '</KeyboardAvoidingView>\n    </View>\n  );\n}'
  );
  fs.writeFileSync(aiScreenPath, aiContent);
}

// Add Empty State to Notifications
const notifPath = path.join(__dirname, 'app/notifications.tsx');
let notifContent = fs.readFileSync(notifPath, 'utf8');
if (!notifContent.includes('EmptyState')) {
  notifContent = notifContent.replace(
    "import { Text, Header, Card, Button } from '@/components/ui';",
    "import { Text, Header, Card, Button, EmptyState } from '@/components/ui';"
  );
  // Add a clear button that clears notifications and shows empty state
  notifContent = notifContent.replace(
    "export default function Notifications() {",
    "export default function Notifications() {\n  const [notifs, setNotifs] = React.useState([1, 2]);"
  );
  notifContent = notifContent.replace(
    "<Header title=\"Notifications\" onBack={() => router.back()} />",
    "<Header title=\"Notifications\" onBack={() => router.back()} rightElement={<Button title=\"Clear\" size=\"medium\" variant=\"outline\" onPress={() => setNotifs([])} />} />"
  );
  notifContent = notifContent.replace(
    "<ScrollView contentContainerStyle={styles.content}>",
    "<ScrollView contentContainerStyle={styles.content}>\n        {notifs.length === 0 ? <EmptyState title=\"No Notifications\" message=\"You are all caught up!\" /> : <>\n"
  );
  notifContent = notifContent.replace(
    "</ScrollView>",
    "</>\n        }\n      </ScrollView>"
  );
  fs.writeFileSync(notifPath, notifContent);
}
