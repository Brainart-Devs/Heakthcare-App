export const Colors = {
  light: {
    primary: '#16449C', // Deep Brand Blue
    primaryLight: '#E5FAFA', // Soft Tint
    primaryDark: '#0E748A', // Dark Teal
    secondary: '#05C2C4', // Teal/Cyan
    primaryGradient2: '#0EADF1', 
    primaryGradient3: '#05C2C4',
    text: '#111827', // High-contrast black
    textSecondary: '#64748B', // Slate text
    background: '#F8F9FA', // Cool soft light background
    card: '#FFFFFF', // Clean white card
    border: '#E2E8F0', // Border
    success: '#10B981', 
    successLight: '#ECFDF5',
    danger: '#EF4444', 
    dangerLight: '#FEF2F2',
    warning: '#F59E0B',
    info: '#0EADF1', // Sky blue
  },
  dark: {
    primary: '#0EADF1', // Vibrant Cyan Blue
    primaryLight: '#082F49', // Deep Sky tint
    primaryDark: '#38BDF8', // Light bright cyan
    secondary: '#05C2C4', // Teal
    primaryGradient2: '#0EADF1',
    primaryGradient3: '#05C2C4',
    text: '#F8FAFC', // High-contrast crisp white for older eyes
    textSecondary: '#94A3B8', // High-contrast slate
    background: '#0F172A', // Deep calming dark slate canvas
    card: '#1E293B', // Elevated crisp dark card
    border: '#334155', // Clear visible card border
    success: '#10B981',
    successLight: '#064E3B',
    danger: '#EF4444',
    dangerLight: '#7F1D1D',
    warning: '#F59E0B',
    info: '#0EADF1',
  },
} as const;

export type ColorPalette = Record<keyof typeof Colors.light, string>;
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
