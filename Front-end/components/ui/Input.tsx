import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor, Spacing, Layout, Typography } from '@/constants/theme';
import { Text } from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...rest
}: InputProps) {
  const theme = useThemeColor();

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="label" style={styles.label} color={theme.text}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.card,
            borderColor: error ? theme.danger : theme.border,
            borderRadius: Layout.borderRadius.lg,
            minHeight: Layout.touchTarget + 8,
          },
          containerStyle,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.input,
            { color: theme.text, fontSize: Typography.bodyLarge.fontSize },
            style,
          ]}
          {...rest}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {error && (
        <Text variant="caption" color={theme.danger} style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  label: {
    marginBottom: Spacing.xs,
    fontWeight: '600',
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: Spacing.lg,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: Spacing.sm,
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
  error: {
    marginTop: Spacing.xs,
    paddingLeft: 4,
  },
});
