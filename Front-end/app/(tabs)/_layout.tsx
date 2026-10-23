import { Tabs } from 'expo-router';
import { useThemeColor } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import { useLanguage } from '@/context/LanguageContext';

export default function TabsLayout() {
  const theme = useThemeColor();
  const { t } = useLanguage();

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
          borderTopWidth: 1,
          borderTopColor: theme.border,
          elevation: 10,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          backgroundColor: theme.card,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: t('home', 'Home'), tabBarIcon: ({color}) => <Feather name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="history" options={{ title: t('history', 'History'), tabBarIcon: ({color}) => <Feather name="clock" size={24} color={color} /> }} />
      <Tabs.Screen name="ai" options={{ title: t('ai', 'AI'), tabBarIcon: ({color}) => <Feather name="cpu" size={24} color={color} /> }} />
      <Tabs.Screen name="reports" options={{ title: t('reports', 'Reports'), tabBarIcon: ({color}) => <Feather name="file-text" size={24} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: t('menu', 'Menu'), tabBarIcon: ({color}) => <Feather name="menu" size={24} color={color} /> }} />
    </Tabs>
  );
}
