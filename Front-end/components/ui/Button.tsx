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

  const baseContainerStyle = {
    borderColor: getBorderColor(),
    borderWidth: variant === 'outline' ? 1.5 : 0,
    minHeight: isLarge ? Layout.touchTarget + 8 : Layout.touchTarget,
    borderRadius: Layout.borderRadius.pill,
  };

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity disabled={loading} style={[styles.buttonWrapper, style]} {...rest}>
        <LinearGradient
          colors={['#05C2C4', '#16449C']}
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          style={[styles.button, baseContainerStyle, { backgroundColor: 'transparent' }]}
        >
          {innerContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const containerStyle = [
    styles.button,
    baseContainerStyle,
    {
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
  buttonWrapper: {
    width: '100%',
    borderRadius: Layout.borderRadius.pill,
    shadowColor: '#16449C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
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
