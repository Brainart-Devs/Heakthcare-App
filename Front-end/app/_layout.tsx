import { Stack } from 'expo-router';
import { useThemeColor } from '@/constants/theme';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { UserProvider } from '@/context/UserContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useThemeColor();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="history/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="profile/index" />
        <Stack.Screen name="add/sugar" options={{ presentation: 'modal' }} />
        <Stack.Screen name="add/bp" options={{ presentation: 'modal' }} />
        <Stack.Screen name="medicines/index" />
        <Stack.Screen name="medicines/[id]" />
        <Stack.Screen name="ai/insights" />
        <Stack.Screen name="reports/export" options={{ presentation: 'modal' }} />
        <Stack.Screen name="settings/caregiver" />
        <Stack.Screen name="settings/doctor" />
        <Stack.Screen name="settings/reminders" />
        <Stack.Screen name="settings/preferences" />
        <Stack.Screen name="settings/language" />
        <Stack.Screen name="settings/security" />
        <Stack.Screen name="settings/support" />
        <Stack.Screen name="notifications" options={{ presentation: 'modal' }} />
        <Stack.Screen name="safety-alert" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </UserProvider>
  );
}
