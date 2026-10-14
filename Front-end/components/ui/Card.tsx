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
          borderColor: theme.border,
          borderWidth: 1,
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
    shadowColor: '#16449C',
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
