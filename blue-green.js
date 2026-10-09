const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// 1. Update Theme to Blue/Green Palette
write('constants/theme.ts', `
import { Platform, useColorScheme } from 'react-native';

export const Colors = {
  light: {
    primary: '#0066FF', // Vibrant Blue for buttons
    primaryLight: '#E0F7FA', // Soft Cyan
    primaryDark: '#002D72', // Deep Blue for titles
    secondary: '#00BFA5', // Green gradient accent
    primaryGradient2: '#00BFA5',
    primaryGradient3: '#E0F7FA',
    text: '#1A365D', // Dark slate blue
    textSecondary: '#4A6583', // Muted slate blue
    background: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E5E5EA',
    success: '#34C759', 
    successLight: '#E8F5E9',
    danger: '#FF3B30', 
    dangerLight: '#FFEBEE',
    warning: '#FFCC00',
    info: '#007AFF',
  },
  dark: {
    // We force light mode for this design, but keeping dark for structure
    primary: '#0066FF', 
    primaryLight: '#002D72',
    primaryDark: '#FFFFFF',
    secondary: '#00BFA5',
    primaryGradient2: '#00BFA5',
    primaryGradient3: '#E0F7FA',
    text: '#F2F2F7',
    textSecondary: '#EBEBF5',
    background: '#000000',
    card: '#1C1C1E',
    border: '#38383A',
    success: '#30D158',
    successLight: '#1B5E20',
    danger: '#FF453A',
    dangerLight: '#B71C1C',
    warning: '#FFD60A',
    info: '#0A84FF',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Typography = {
  h1: { fontSize: 36, fontWeight: '800' as const, lineHeight: 44 },
  h2: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
  bodyLarge: { fontSize: 18, fontWeight: '500' as const, lineHeight: 26 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  label: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Layout = {
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 9999,
  },
  touchTarget: 48,
};

export function useThemeColor() {
  return Colors.light; // Force light mode for exact UI matching
}
`);

// 2. Re-write app/index.tsx to match exact screenshot
write('app/index.tsx', `
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Background Gradient simulating the wave */}
      <LinearGradient 
        colors={['#FFFFFF', '#FFFFFF', '#E0F7FA', '#B2EBF2']} 
        style={StyleSheet.absoluteFillObject}
        locations={[0, 0.4, 0.7, 1]}
      />
      
      <View style={styles.content}>
        
        {/* Logo Area */}
        <View style={styles.logoSection}>
          {/* We use a big heartbeat icon as placeholder for the gradient logo */}
          <FontAwesome5 name="heartbeat" size={100} color="#0066FF" />
          
          <View style={styles.titleRow}>
            <Text variant="h1" color="#002D72" style={{letterSpacing: -1}}>HealthTrack </Text>
            <Text variant="h1" color="#0066FF" style={{letterSpacing: -1}}>AI</Text>
          </View>
          
          <Text variant="bodyLarge" align="center" color="#4A6583" style={{marginTop: Spacing.sm}}>
            {'Track Today\\nFor a Healthier Tomorrow'}
          </Text>
        </View>

        {/* 3 Circular Features */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, { shadowColor: '#0066FF' }]}>
              <FontAwesome5 name="pills" size={24} color="#0066FF" />
            </View>
            <Text variant="label" align="center" color="#1A365D" style={{marginTop: Spacing.sm}}>Track</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, { shadowColor: '#00BFA5' }]}>
              <MaterialCommunityIcons name="shield-check-outline" size={28} color="#00BFA5" />
            </View>
            <Text variant="label" align="center" color="#1A365D" style={{marginTop: Spacing.sm}}>Understand</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, { shadowColor: '#8E1EA2' }]}>
              <MaterialCommunityIcons name="robot-outline" size={28} color="#8E1EA2" />
            </View>
            <Text variant="label" align="center" color="#1A365D" style={{marginTop: Spacing.sm}}>Stay on Track\nwith AI</Text>
          </View>
        </View>
        
        {/* Buttons Bottom */}
        <View style={styles.bottomSection}>
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
          
          <Text variant="caption" align="center" color="#0066FF" style={{marginTop: Spacing.lg}}>
            Better Health for You and{`\\n`}Your Family
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
    marginTop: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  bottomSection: {
    width: '100%',
  },
});
`);

// 3. Update Button component so 'outline' handles Blue border correctly
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
      case 'outline': return theme.primary; // Blue text for outline
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
      borderWidth: variant === 'outline' ? 1.5 : 0,
      minHeight: isLarge ? Layout.touchTarget + 8 : Layout.touchTarget,
      borderRadius: Layout.borderRadius.pill,
      backgroundColor: disabled ? theme.border : (variant === 'outline' ? 'transparent' : variant === 'secondary' ? theme.primaryLight : variant === 'danger' ? theme.danger : theme.primary),
    },
    style,
  ];

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
