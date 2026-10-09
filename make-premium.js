const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// 1. Upgrade Button.tsx
write('components/ui/Button.tsx', `
import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleSheet, 
  ActivityIndicator,
  View
} from 'react-native';
import { useThemeColor, Spacing, Layout } from '@/constants/theme';
import { Text } from './Typography';
import { LinearGradient } from 'expo-linear-gradient';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'large' | 'medium';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  title,
  variant = 'primary',
  size = 'large',
  loading = false,
  icon,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const theme = useThemeColor();

  const getTextColor = () => {
    if (disabled) return theme.textSecondary;
    switch (variant) {
      case 'primary': 
      case 'danger': return '#FFFFFF';
      case 'secondary': return theme.primary;
      case 'outline': return theme.primary;
      default: return '#FFFFFF';
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.border;
    if (variant === 'outline') return theme.primary;
    return 'transparent';
  };

  const isLarge = size === 'large';

  const innerContent = (
    <>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text 
            variant={isLarge ? 'bodyLarge' : 'body'} 
            color={getTextColor()}
            style={styles.text}
          >
            {title}
          </Text>
        </View>
      )}
    </>
  );

  const containerStyle = [
    styles.button,
    {
      borderColor: getBorderColor(),
      borderWidth: variant === 'outline' ? 2 : 0,
      minHeight: isLarge ? Layout.touchTarget + 8 : Layout.touchTarget,
      borderRadius: Layout.borderRadius.pill,
      backgroundColor: disabled ? theme.border : (variant === 'secondary' ? theme.primaryLight : variant === 'danger' ? theme.danger : 'transparent'),
    },
    style,
  ];

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity disabled={loading} style={style} {...rest}>
        <LinearGradient
          colors={[(theme as any).primaryGradient2 || '#C654C3', theme.primary]}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          style={[styles.button, { minHeight: isLarge ? Layout.touchTarget + 8 : Layout.touchTarget, borderRadius: Layout.borderRadius.pill, borderWidth: 0 }]}
        >
          {innerContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={containerStyle}
      {...rest}
    >
      {innerContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: Spacing.sm,
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
`);

// 2. Upgrade Card.tsx
write('components/ui/Card.tsx', `
import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useThemeColor, Spacing, Layout } from '@/constants/theme';

interface CardProps extends ViewProps {
  padding?: keyof typeof Spacing;
}

export function Card({ style, padding = 'md', children, ...rest }: CardProps) {
  const theme = useThemeColor();

  return (
    <View
      style={[
        styles.card,
        { 
          backgroundColor: theme.card,
          padding: Spacing[padding],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Layout.borderRadius.xl,
    shadowColor: '#8E1EA2',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    width: '100%',
  },
});
`);

// 3. Upgrade Splash Screen (app/index.tsx)
write('app/index.tsx', `
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  return (
    <LinearGradient 
      colors={['#FFC0DE', '#FFFFFF', '#FFFFFF']} 
      style={styles.container}
      locations={[0, 0.4, 1]}
    >
      <View style={styles.center}>
        <View style={styles.logoContainer}>
           <Image 
             source={require('../assets/images/logo.jpg')} 
             style={styles.logo} 
             resizeMode="contain" 
           />
        </View>
        
        <Text variant="h1" align="center" color="#8E1EA2" style={{marginTop: Spacing.xl, fontSize: 36, letterSpacing: -1}}>
          HealthTrack AI
        </Text>
        
        <Text variant="bodyLarge" align="center" secondary style={{marginTop: Spacing.md, opacity: 0.7, paddingHorizontal: 40}}>
          {'Track Today\\nFor a Healthier Tomorrow'}
        </Text>
      </View>
      
      <View style={styles.bottom}>
        <Button 
          title="Get Started" 
          onPress={() => router.push('/(auth)/signup' as any)} 
          style={{marginBottom: Spacing.md}} 
        />
        <Button 
          title="Sign In" 
          variant="outline" 
          onPress={() => router.push('/(auth)/login' as any)} 
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: Spacing.xl, 
    justifyContent: 'space-between' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8E1EA2',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  bottom: { 
    paddingBottom: Spacing.xl 
  },
});
`);

// 4. Upgrade app/(tabs)/_layout.tsx to use beautiful icons from expo/vector-icons
write('app/(tabs)/_layout.tsx', `
import { Tabs } from 'expo-router';
import { useThemeColor, Spacing } from '@/constants/theme';
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
          shadowColor: '#8E1EA2',
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
`);
