const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// 1. Mock Data
write('constants/mockData.ts', `
export const mockUser = {
  name: 'Rukhsana Arif',
  age: 66,
  weight: 68,
  doctor: 'Dr. Ahmad',
};

export const mockMedicines = [
  { id: '1', name: 'Thyroxine', dose: '50 mcg', timing: 'Before Breakfast', time: '7:00 AM', status: 'Taken' },
  { id: '2', name: 'Diamicron MR', dose: '30 mg', timing: 'With Breakfast', time: '8:00 AM', status: 'Taken' },
  { id: '3', name: 'Sitaglu Met 50/850', dose: '1 tablet', timing: 'With Meal', time: '1:00 PM', status: 'Pending' },
  { id: '4', name: 'Telsarta', dose: '40 mg', timing: 'After Dinner', time: '8:30 PM', status: 'Pending' }
];

export const mockReadings = {
  sugar: { value: 128, label: 'Normal', date: '01 Oct 2024' },
  bp: { systolic: 136, diastolic: 82, pulse: 76, label: 'Good', date: '01 Oct 2024' },
};
`);

// 2. Root Layout
write('app/_layout.tsx', `
import { Stack } from 'expo-router';
import { useThemeColor } from '@/constants/theme';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useThemeColor();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add/sugar" options={{ presentation: 'modal' }} />
      <Stack.Screen name="add/bp" options={{ presentation: 'modal' }} />
      <Stack.Screen name="medicines/index" />
      <Stack.Screen name="medicines/[id]" />
      <Stack.Screen name="ai/insights" />
      <Stack.Screen name="reports/export" options={{ presentation: 'modal' }} />
      <Stack.Screen name="settings/caregiver" />
      <Stack.Screen name="notifications" options={{ presentation: 'modal' }} />
      <Stack.Screen name="safety-alert" options={{ presentation: 'fullScreenModal' }} />
    </Stack>
  );
}
`);

// 3. Splash Screen
write('app/index.tsx', `
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logoPlaceholder} />
        <Text variant="h1" align="center" color="#4B2E83" style={{marginTop: Spacing.md}}>HealthTrack AI</Text>
        <Text variant="bodyLarge" align="center" secondary style={{marginTop: Spacing.lg}}>
          Track Today\\nFor a Healthier Tomorrow
        </Text>
      </View>
      <View style={styles.bottom}>
        <Button title="Get Started" onPress={() => router.push('/(auth)/signup')} style={{marginBottom: Spacing.md}} />
        <Button title="Sign In" variant="outline" onPress={() => router.push('/(auth)/login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.xl, backgroundColor: '#fff', justifyContent: 'space-between' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E8E3F2' },
  bottom: { paddingBottom: Spacing.xl },
});
`);

// Auth Layout
write('app/(auth)/_layout.tsx', `
import { Stack } from 'expo-router';
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
`);

// Auth Login
write('app/(auth)/login.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Header title="Sign In" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.center}>
          <Text variant="h2" color="#4B2E83" style={{marginBottom: Spacing.xl}}>HealthTrack AI</Text>
        </View>
        <Input placeholder="Email or Phone" label="Email or Phone" />
        <Input placeholder="Password" label="Password" secureTextEntry />
        <View style={{alignItems: 'flex-end', marginBottom: Spacing.lg}}>
          <Text variant="body" color="#4B2E83" onPress={() => router.push('/(auth)/forgot-password')}>Forgot Password?</Text>
        </View>
        <Button title="Sign In" onPress={() => router.replace('/(tabs)')} />
        
        <View style={styles.divider}>
          <Text variant="caption" secondary>or continue with</Text>
        </View>
        
        <View style={styles.socialButtons}>
          <Button title="Google" variant="outline" style={{flex: 1, marginRight: Spacing.sm}} />
          <Button title="Apple" variant="outline" style={{flex: 1, marginLeft: Spacing.sm}} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  center: { alignItems: 'center', marginVertical: Spacing.xl },
  divider: { alignItems: 'center', marginVertical: Spacing.xl },
  socialButtons: { flexDirection: 'row', justifyContent: 'space-between' }
});
`);

// Auth Signup
write('app/(auth)/signup.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Header title="Create Account" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input placeholder="Full Name" label="Full Name" />
        <Input placeholder="Email or Phone" label="Email or Phone" />
        <Input placeholder="Password" label="Password" secureTextEntry />
        <Button title="Sign Up" style={{marginTop: Spacing.lg}} onPress={() => router.push('/(auth)/profile-setup')} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' }, content: { padding: Spacing.lg } });
`);

// Forgot Password
write('app/(auth)/forgot-password.tsx', `
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Header, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <Header title="Reset Password" onBack={() => router.back()} />
      <View style={styles.content}>
        <Text variant="bodyLarge" style={{marginBottom: Spacing.xl}}>Enter your email or phone number to reset your password.</Text>
        <Input placeholder="Email or Phone" />
        <Button title="Send Reset Link" onPress={() => router.back()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' }, content: { padding: Spacing.lg } });
`);

// Profile Setup
write('app/(auth)/profile-setup.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function ProfileSetup() {
  return (
    <View style={styles.container}>
      <Header title="Patient Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <Input label="Date of Birth" placeholder="DD MMM YYYY" />
        <Input label="Gender" placeholder="Select Gender" />
        <Input label="Height (cm)" placeholder="e.g. 157" keyboardType="numeric" />
        <Input label="Weight (kg)" placeholder="e.g. 68" keyboardType="numeric" />
        <Input label="Conditions" placeholder="e.g. Diabetes, Hypertension" />
        <Button title="Complete Setup" style={{marginTop: Spacing.xl}} onPress={() => router.replace('/(tabs)')} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' }, content: { padding: Spacing.lg } });
`);

// Tabs Layout
write('app/(tabs)/_layout.tsx', `
import { Tabs } from 'expo-router';
import { useThemeColor, Spacing } from '@/constants/theme';

export default function TabsLayout() {
  const theme = useThemeColor();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          height: 70,
          paddingBottom: Spacing.sm,
          paddingTop: Spacing.sm,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="ai" options={{ title: 'AI' }} />
      <Tabs.Screen name="reports" options={{ title: 'Reports' }} />
      <Tabs.Screen name="settings" options={{ title: 'Menu' }} />
    </Tabs>
  );
}
`);

// Home Dashboard
write('app/(tabs)/index.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Badge } from '@/components/ui';
import { Spacing, Layout } from '@/constants/theme';
import { mockUser, mockReadings } from '@/constants/mockData';
import { router } from 'expo-router';

export default function HomeDashboard() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text variant="bodyLarge">Good Morning</Text>
            <Text variant="h2">{mockUser.name}</Text>
            <Text variant="body" secondary>Tue, 01 Oct 2024</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button variant="outline" title="🔔" onPress={() => router.push('/notifications')} style={styles.iconBtn} />
            <Button variant="outline" title="🚨" onPress={() => router.push('/safety-alert')} style={[styles.iconBtn, {marginLeft: 8}]} />
          </View>
        </View>

        <View style={styles.row}>
          <Card style={styles.halfCard}>
            <Text variant="body" secondary>Fasting Sugar</Text>
            <Text variant="h1">{mockReadings.sugar.value}</Text>
            <Badge label={mockReadings.sugar.label} status="success" />
          </Card>
          <Card style={styles.halfCard}>
            <Text variant="body" secondary>Blood Pressure</Text>
            <Text variant="h2">{mockReadings.bp.systolic}/{mockReadings.bp.diastolic}</Text>
            <Badge label={mockReadings.bp.label} status="success" />
          </Card>
        </View>

        <View style={styles.row}>
          <Card style={styles.thirdCard}>
            <Text variant="body" secondary>Pulse</Text>
            <Text variant="h3">{mockReadings.bp.pulse}</Text>
            <Text variant="caption" secondary>bpm</Text>
          </Card>
          <Card style={styles.thirdCard}>
            <Text variant="body" secondary>Weight</Text>
            <Text variant="h3">{mockUser.weight}</Text>
            <Text variant="caption" secondary>kg</Text>
          </Card>
          <Card style={styles.thirdCard}>
            <Text variant="body" secondary>Medicines</Text>
            <Text variant="h3">3 of 5</Text>
            <Text variant="caption" secondary>Taken</Text>
          </Card>
        </View>

        <View style={styles.row}>
          <Button title="+ Add Sugar" onPress={() => router.push('/add/sugar')} style={styles.halfBtn} />
          <Button title="+ Add BP" onPress={() => router.push('/add/bp')} style={[styles.halfBtn, {marginLeft: Spacing.md}]} />
        </View>

        <View style={styles.quickLinks}>
          <Button title="Medicines" variant="secondary" onPress={() => router.push('/medicines')} />
          <Button title="AI Insights" variant="secondary" onPress={() => router.push('/ai/insights')} style={{marginTop: Spacing.md}} />
        </View>

        <Card style={styles.nextMedicine}>
          <Text variant="bodyLarge">Next Medicine</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.md}}>
            <View>
              <Text variant="h3">Sitaglu Met 50/850</Text>
              <Text variant="body" secondary>After Dinner - 8:30 PM</Text>
            </View>
            <Button title="Mark Taken" size="medium" />
          </View>
        </Card>

      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xl },
  iconBtn: { minHeight: 48, paddingHorizontal: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  halfCard: { width: '48%' },
  thirdCard: { width: '31%', alignItems: 'center' },
  halfBtn: { flex: 1 },
  quickLinks: { marginBottom: Spacing.md },
  nextMedicine: { marginTop: Spacing.sm }
});
`);

// And I'll quickly stub the rest to compile
const stubs = [
  'app/(tabs)/history.tsx',
  'app/(tabs)/ai.tsx',
  'app/(tabs)/reports.tsx',
  'app/(tabs)/settings.tsx',
  'app/add/sugar.tsx',
  'app/add/bp.tsx',
  'app/medicines/index.tsx',
  'app/medicines/[id].tsx',
  'app/ai/insights.tsx',
  'app/reports/export.tsx',
  'app/settings/caregiver.tsx',
  'app/notifications.tsx',
  'app/safety-alert.tsx'
];

stubs.forEach(stub => {
  const name = stub.replace('app/', '').replace('.tsx', '').replace('/', ' ').toUpperCase();
  write(stub, `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function Screen() {
  return (
    <View style={styles.container}>
      <Header title="${name}" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="bodyLarge" style={{marginBottom: Spacing.lg}}>Prototype screen for ${name}</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' }, content: { padding: Spacing.lg } });
  `);
});

console.log("Scaffold complete.");
