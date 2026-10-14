export * from './colors';

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

// Re-export useThemeColor from ThemeContext for reactive theme updates
export { useThemeColor, useTheme } from '@/context/ThemeContext';
