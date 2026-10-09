const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

write('app/add/sugar.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Input, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function AddSugarScreen() {
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="Add Sugar Reading" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.segmentedControl}>
          <Badge label="Fasting" status="info" />
          <Badge label="Before Meal" status="default" />
          <Badge label="2-Hr After" status="default" />
          <Badge label="Random" status="default" />
        </View>

        <View style={styles.bigInputContainer}>
          <Input placeholder="128" keyboardType="numeric" style={{fontSize: 48, textAlign: 'center'}} />
          <Text variant="bodyLarge" secondary align="center">mg/dL</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Input placeholder="01 Oct 2024" style={{flex: 1, marginRight: Spacing.sm}} />
          <Input placeholder="07:15 AM" style={{flex: 1, marginLeft: Spacing.sm}} />
        </View>

        <Input label="Notes (optional)" placeholder="e.g. feeling well, little tired etc." multiline style={{minHeight: 100}} />

        <View style={styles.targetBox}>
          <Text variant="body" color="#1B5E20">✓ Normal Fasting Range</Text>
          <Text variant="h3" color="#1B5E20">70 - 130 mg/dL</Text>
          <Text variant="caption" color="#1B5E20">(Your doctor's target may be different)</Text>
        </View>

        <Button title="Save Reading" onPress={handleSave} loading={loading} style={{marginTop: Spacing.xl}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  segmentedControl: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xl, flexWrap: 'wrap', gap: 8 },
  bigInputContainer: { alignItems: 'center', marginBottom: Spacing.xl },
  targetBox: { backgroundColor: '#E8F5E9', padding: Spacing.md, borderRadius: 12, marginTop: Spacing.md }
});
`);

write('app/add/bp.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Input, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function AddBPScreen() {
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="Add Blood Pressure" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.segmentedControl}>
          <Badge label="Morning" status="info" />
          <Badge label="Evening" status="default" />
          <Badge label="Other" status="default" />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.lg}}>
          <View style={{flex: 1, marginRight: Spacing.sm}}>
            <Input label="Systolic (mmHg)" placeholder="136" keyboardType="numeric" style={{fontSize: 32, textAlign: 'center'}} />
          </View>
          <View style={{flex: 1, marginLeft: Spacing.sm}}>
            <Input label="Diastolic (mmHg)" placeholder="82" keyboardType="numeric" style={{fontSize: 32, textAlign: 'center'}} />
          </View>
        </View>

        <Input label="Pulse (bpm)" placeholder="76" keyboardType="numeric" style={{fontSize: 32, textAlign: 'center'}} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.md}}>
          <Input placeholder="01 Oct 2024" style={{flex: 1, marginRight: Spacing.sm}} />
          <Input placeholder="08:00 AM" style={{flex: 1, marginLeft: Spacing.sm}} />
        </View>

        <Input label="Notes (optional)" placeholder="e.g. feeling better today" multiline style={{minHeight: 100, marginTop: Spacing.md}} />

        <Button title="Save Reading" onPress={handleSave} loading={loading} style={{marginTop: Spacing.xl}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  segmentedControl: { flexDirection: 'row', gap: 16, marginBottom: Spacing.xl },
});
`);

write('app/medicines/index.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Header, Card, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { mockMedicines } from '@/constants/mockData';
import { router } from 'expo-router';

export default function MedicinesList() {
  return (
    <View style={styles.container}>
      <Header 
        title="My Medicines" 
        onBack={() => router.back()} 
        rightElement={<Button title="+ Add" size="medium" onPress={() => {}} />}
      />
      <View style={styles.tabs}>
        <Badge label="Today" status="info" />
        <Badge label="All Medicines" status="default" />
        <Badge label="Schedule" status="default" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {mockMedicines.map(med => (
          <TouchableOpacity key={med.id} onPress={() => router.push(\`/medicines/\${med.id}\` as any)}>
            <Card style={styles.card}>
              <View style={{flex: 1}}>
                <Text variant="h3">{med.name}</Text>
                <Text variant="body">{med.dose}</Text>
                <Text variant="caption" secondary>{med.timing} • {med.time}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                {med.status === 'Taken' ? (
                  <Badge label="✓ Taken" status="success" />
                ) : (
                  <Button title="Mark" variant="outline" size="medium" onPress={() => {}} />
                )}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.md },
  tabs: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm, backgroundColor: '#F8F9FA' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md }
});
`);

write('app/medicines/[id].tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useLocalSearchParams, router } from 'expo-router';
import { mockMedicines } from '@/constants/mockData';

export default function MedicineDetails() {
  const { id } = useLocalSearchParams();
  const med = mockMedicines.find(m => m.id === id) || mockMedicines[0];

  return (
    <View style={styles.container}>
      <Header title="Medicine Details" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="h1" style={{marginBottom: Spacing.xl}}>{med.name}</Text>
        
        <View style={styles.row}>
          <Text variant="bodyLarge" secondary style={styles.label}>Type</Text>
          <Text variant="bodyLarge">Tablet</Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyLarge" secondary style={styles.label}>Dose</Text>
          <Text variant="bodyLarge">{med.dose}</Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyLarge" secondary style={styles.label}>Timing</Text>
          <Text variant="bodyLarge">{med.timing}</Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyLarge" secondary style={styles.label}>Time</Text>
          <Text variant="bodyLarge">{med.time}</Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyLarge" secondary style={styles.label}>Prescribed By</Text>
          <Text variant="bodyLarge">Dr. Ahmad</Text>
        </View>

        <Card style={{marginTop: Spacing.xl, backgroundColor: '#F8F9FA'}}>
          <Text variant="bodyLarge" style={{fontWeight: '600', marginBottom: Spacing.sm}}>Instructions</Text>
          <Text variant="bodyLarge">Take with food. Do not skip doses. If stomach upset occurs, inform doctor.</Text>
        </Card>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.xxl}}>
          <Button title="Edit" variant="outline" style={{flex: 1, marginRight: Spacing.sm}} onPress={() => {}} />
          <Button title="Delete" variant="danger" style={{flex: 1, marginLeft: Spacing.sm}} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  row: { flexDirection: 'row', paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  label: { width: 120 }
});
`);

write('app/(tabs)/ai.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Input, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function AIscreen() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your AI Health Assistant. I can help you understand your readings, track your progress, answer general health questions and prepare reports for your doctor." }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm a prototype! I don't have real AI connected right now, but I'll be able to help you soon." }]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="AI Health Assistant" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{alignItems: 'center', marginBottom: Spacing.lg}}>
          <View style={styles.botIcon} />
          <Text variant="bodyLarge" secondary>Your Personal Health Companion</Text>
        </View>
        
        {messages.map((msg, i) => (
          <View key={i} style={[styles.bubble, msg.sender === 'ai' ? styles.bubbleAI : styles.bubbleUser]}>
            <Text variant="bodyLarge" color={msg.sender === 'user' ? '#fff' : '#000'}>{msg.text}</Text>
          </View>
        ))}
        
        {messages.length === 1 && (
          <View style={styles.suggestions}>
            <Text variant="bodyLarge" color="#4B2E83" style={styles.suggestion} onPress={() => setInput('Explain my last 7 days sugar trend')}>Explain my last 7 days sugar trend</Text>
            <Text variant="bodyLarge" color="#4B2E83" style={styles.suggestion} onPress={() => setInput('Is my blood pressure normal?')}>Is my blood pressure normal?</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputArea}>
        <Input 
          placeholder="Ask anything about your health..." 
          value={input}
          onChangeText={setInput}
          style={{flex: 1, marginBottom: 0}}
        />
        <Button title=">" onPress={send} size="medium" style={styles.sendBtn} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.md },
  botIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#4B2E83', marginBottom: Spacing.sm },
  bubble: { padding: Spacing.md, borderRadius: 16, marginBottom: Spacing.md, maxWidth: '85%' },
  bubbleAI: { backgroundColor: '#fff', alignSelf: 'flex-start' },
  bubbleUser: { backgroundColor: '#4B2E83', alignSelf: 'flex-end' },
  suggestions: { marginTop: Spacing.xl },
  suggestion: { paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  inputArea: { flexDirection: 'row', padding: Spacing.md, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E5EA', alignItems: 'center' },
  sendBtn: { minWidth: 50, marginLeft: Spacing.sm }
});
`);

write('app/ai/insights.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Card, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function AIInsights() {
  return (
    <View style={styles.container}>
      <Header title="AI Insights" onBack={() => router.back()} />
      <View style={styles.tabs}>
        <Badge label="Summary" status="info" />
        <Badge label="Trends" status="default" />
        <Badge label="Suggestions" status="default" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="h3" style={{marginBottom: Spacing.md}}>Last 7 Days Overview</Text>
        
        <Card style={styles.card}>
          <Text variant="h3">Fasting Sugar</Text>
          <Text variant="bodyLarge" color="#4B2E83">Average 132 mg/dL</Text>
          <Text variant="body" secondary>Slightly higher than previous week</Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="h3">Blood Pressure</Text>
          <Text variant="bodyLarge" color="#34C759">Average 138/84 mmHg</Text>
          <Text variant="body" secondary>In target range</Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="h3">Medicine Adherence</Text>
          <Text variant="bodyLarge" color="#FFCC00">85%</Text>
          <Text variant="body" secondary>Good (1 dose missed)</Text>
        </Card>

        <Card style={[styles.card, {backgroundColor: '#E8E3F2'}]}>
          <Text variant="h3" color="#4B2E83">AI Suggestion</Text>
          <Text variant="bodyLarge" style={{marginTop: Spacing.sm}}>
            Your fasting sugar is slightly higher this week. Consider reviewing your diet and activity levels. If this trend continues, discuss with your doctor.
          </Text>
          <Text variant="caption" secondary style={{marginTop: Spacing.lg}}>
            This is AI-generated guidance and not a replacement for professional medical advice.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabs: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg },
  card: { marginBottom: Spacing.md }
});
`);

write('app/(tabs)/reports.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Card, Badge, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Reports" />
      <View style={styles.tabs}>
        <Badge label="7 Days" status="default" />
        <Badge label="30 Days" status="info" />
        <Badge label="90 Days" status="default" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text variant="h3" style={{marginBottom: Spacing.md}}>Sugar Trend (mg/dL)</Text>
          <View style={styles.chartPlaceholder}>
            <Text variant="body" secondary>(Trend chart will appear here)</Text>
          </View>
        </Card>
        <Card style={styles.card}>
          <Text variant="h3" style={{marginBottom: Spacing.md}}>Blood Pressure Trend (mmHg)</Text>
          <View style={styles.chartPlaceholder}>
            <Text variant="body" secondary>(Trend chart will appear here)</Text>
          </View>
        </Card>
        
        <Button title="Share / Export Report" onPress={() => router.push('/reports/export' as any)} style={{marginTop: Spacing.lg}} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  tabs: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: Spacing.lg },
  card: { marginBottom: Spacing.md },
  chartPlaceholder: { height: 150, backgroundColor: '#E5E5EA', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }
});
`);

write('app/reports/export.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Button, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function ReportExport() {
  const [loading, setLoading] = useState(false);
  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header title="Share / Export Report" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="h3" style={{marginBottom: Spacing.md}}>Select Date Range</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xl}}>
          <Input label="From" placeholder="01 Sep 2024" style={{flex: 1, marginRight: Spacing.sm}} />
          <Input label="To" placeholder="30 Sep 2024" style={{flex: 1, marginLeft: Spacing.sm}} />
        </View>

        <Text variant="h3" style={{marginBottom: Spacing.md}}>Include in Report</Text>
        <Text variant="bodyLarge" style={styles.checkItem}>☑ Sugar Readings</Text>
        <Text variant="bodyLarge" style={styles.checkItem}>☑ Blood Pressure</Text>
        <Text variant="bodyLarge" style={styles.checkItem}>☑ Pulse</Text>
        <Text variant="bodyLarge" style={styles.checkItem}>☑ Weight</Text>
        <Text variant="bodyLarge" style={styles.checkItem}>☑ Medicine Adherence</Text>
        <Text variant="bodyLarge" style={styles.checkItem}>☑ Symptoms & Notes</Text>

        <Text variant="h3" style={{marginTop: Spacing.xl, marginBottom: Spacing.md}}>Export Format</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button title="PDF" variant="danger" style={{flex: 1, marginRight: Spacing.sm}} />
          <Button title="Excel" variant="primary" style={{flex: 1, marginLeft: Spacing.sm, backgroundColor: '#34C759'}} />
        </View>

        <Button title="Generate Report" onPress={handleExport} loading={loading} style={{marginTop: Spacing.xxl}} />
        <Text variant="caption" align="center" secondary style={{marginTop: Spacing.md}}>
          You can share this report with your doctor or family members.
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  checkItem: { paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: '#F0F0F3' }
});
`);

write('app/(tabs)/settings.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { mockUser } from '@/constants/mockData';
import { router } from 'expo-router';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileBox}>
          <View style={styles.avatar} />
          <View>
            <Text variant="h2">{mockUser.name}</Text>
            <Text variant="bodyLarge" color="#4B2E83">View Profile</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <Text variant="bodyLarge" style={styles.menuItem} onPress={() => router.push('/(auth)/profile-setup' as any)}>👤 My Profile</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>🔔 Medicine Reminders</Text>
          <Text variant="bodyLarge" style={styles.menuItem} onPress={() => router.push('/settings/caregiver' as any)}>👥 Caregiver Access</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>🩺 Doctor Information</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>⚙️ App Preferences</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>🌐 Language (English / اردو)</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>🔒 Privacy & Security</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>❓ Help & Support</Text>
        </View>

        <Button title="Sign Out" variant="outline" onPress={() => router.replace('/')} style={{marginTop: Spacing.xxl}} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg },
  profileBox: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E8E3F2', marginRight: Spacing.md },
  menu: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  menuItem: { padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: '#F0F0F3' }
});
`);

write('app/settings/caregiver.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Input, Button, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function CaregiverAccess() {
  const [loading, setLoading] = useState(false);
  const handleInvite = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <Header title="Caregiver Access" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="bodyLarge" style={{marginBottom: Spacing.xl}}>
          Allow family members or caregivers to view your health reports and get alerts if you miss your medicines.
        </Text>
        
        <Text variant="h3" style={{marginBottom: Spacing.md}}>Invite Caregiver</Text>
        <Input placeholder="Caregiver's Email or Phone" />
        <Button title="Send Invite" onPress={handleInvite} loading={loading} />

        <Text variant="h3" style={{marginTop: Spacing.xxl, marginBottom: Spacing.md}}>Active Caregivers</Text>
        <Card style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View>
            <Text variant="bodyLarge">Ali Arif (Son)</Text>
            <Text variant="caption" secondary>Can view reports & alerts</Text>
          </View>
          <Button title="Remove" variant="outline" size="medium" />
        </Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg }
});
`);

write('app/notifications.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Header title="Notifications" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text variant="h3">Time for Medicine</Text>
          <Text variant="bodyLarge" style={{marginVertical: Spacing.sm}}>It is time to take Sitaglu Met 50/850.</Text>
          <Button title="Mark Taken" size="medium" />
        </Card>
        <Card style={styles.card}>
          <Text variant="h3">Weekly Report Ready</Text>
          <Text variant="bodyLarge" style={{marginVertical: Spacing.sm}}>Your health summary for last week is ready.</Text>
          <Button title="View Report" size="medium" variant="secondary" />
        </Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.md },
  card: { marginBottom: Spacing.md }
});
`);

write('app/safety-alert.tsx', `
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function SafetyAlert() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconPlaceholder}>
          <Text variant="h1" color="#fff" align="center">!</Text>
        </View>
        <Text variant="h1" align="center" style={{marginTop: Spacing.xl}}>High Sugar Alert</Text>
        <Text variant="bodyLarge" align="center" style={{marginTop: Spacing.md, marginBottom: Spacing.xxl}}>
          Your last fasting reading was significantly higher than normal. Please contact your doctor.
        </Text>
        <Button title="Call Doctor" variant="primary" style={{backgroundColor: '#000', marginBottom: Spacing.md}} />
        <Button title="Call Caregiver" variant="primary" style={{backgroundColor: '#000', marginBottom: Spacing.xl}} />
        <Button title="Dismiss" variant="outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF3B30' },
  content: { flex: 1, justifyContent: 'center', padding: Spacing.xl },
  iconPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'center', justifyContent: 'center' }
});
`);

write('app/(tabs)/history.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Card, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { mockReadings } from '@/constants/mockData';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Header title="History" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="h3" style={{marginBottom: Spacing.md}}>Today</Text>
        
        <Card style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text variant="bodyLarge">Sugar Reading</Text>
              <Text variant="caption" secondary>07:15 AM • Fasting</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text variant="h3">{mockReadings.sugar.value} <Text variant="caption">mg/dL</Text></Text>
              <Badge label={mockReadings.sugar.label} status="success" />
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text variant="bodyLarge">Blood Pressure</Text>
              <Text variant="caption" secondary>08:00 AM • Morning</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text variant="h3">{mockReadings.bp.systolic}/{mockReadings.bp.diastolic}</Text>
              <Badge label={mockReadings.bp.label} status="success" />
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.md },
  card: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
`);
