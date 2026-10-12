import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColor, Spacing, Layout } from '@/constants/theme';
import { Text } from './Typography';

export interface BadgeProps {
  label: string;
  status?: 'success' | 'danger' | 'warning' | 'info' | 'default';
  icon?: React.ReactNode;
}

export function Badge({ label, status = 'default', icon }: BadgeProps) {
  const theme = useThemeColor();

  const getColors = () => {
    switch (status) {
      case 'success':
        return { bg: theme.successLight, text: theme.success };
      case 'danger':
        return { bg: theme.dangerLight, text: theme.danger };
      case 'warning':
        return { bg: theme.warning, text: '#FFF' }; // Warning might need distinct light/dark logic
      case 'info':
        return { bg: theme.primaryLight, text: theme.primary };
      default:
        return { bg: theme.border, text: theme.textSecondary };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderRadius: Layout.borderRadius.pill,
        },
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text variant="caption" color={colors.text} style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: '600',
  },
});
