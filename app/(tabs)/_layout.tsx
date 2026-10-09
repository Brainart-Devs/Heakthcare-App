import { Tabs } from 'expo-router';
import { useThemeColor } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';

export default function TabsLayout() {
  const theme = useThemeColor();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          height: 76,
          paddingBottom: 24,
          paddingTop: 12,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#16449C',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color, size}) => <Feather name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="history" options={{ title: 'History', tabBarIcon: ({color, size}) => <Feather name="clock" size={24} color={color} /> }} />
      <Tabs.Screen name="ai" options={{ title: 'AI', tabBarIcon: ({color, size}) => <Feather name="cpu" size={24} color={color} /> }} />
      <Tabs.Screen name="reports" options={{ title: 'Reports', tabBarIcon: ({color, size}) => <Feather name="file-text" size={24} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Menu', tabBarIcon: ({color, size}) => <Feather name="menu" size={24} color={color} /> }} />
    </Tabs>
  );
}
