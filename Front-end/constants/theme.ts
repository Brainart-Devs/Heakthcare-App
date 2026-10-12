import { Platform, useColorScheme } from 'react-native';

export const Colors = {
  light: {
    primary: '#16449C', // Deep Navy Blue
    primaryLight: '#E5FAFA', // Soft Tint
    primaryDark: '#0E748A', // Dark Teal
    secondary: '#05C2C4', // Teal/Cyan
    primaryGradient2: '#0EADF1', 
    primaryGradient3: '#05C2C4',
    text: '#16449C', // Navy text
    textSecondary: '#0E748A', // Dark teal text
    background: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E5E5EA',
    success: '#05C2C4', 
    successLight: '#E5FAFA',
    danger: '#FF3B30', 
    dangerLight: '#FFEBEE',
    warning: '#FFCC00',
    info: '#0EADF1', // Sky blue
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
