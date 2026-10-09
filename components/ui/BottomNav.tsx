import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Typography';
import { useThemeColor } from '@/constants/theme';

export interface TabBarIconProps {
  label: string;
  focused: boolean;
  icon: React.ReactNode;
}

export function TabBarIcon({ label, focused, icon }: TabBarIconProps) {
  const theme = useThemeColor();
  const color = focused ? theme.primary : theme.textSecondary;

  return (
    <View style={styles.container}>
      {icon}
      <Text 
        variant="caption" 
        style={[styles.label, { color }]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    // large touch target handling should typically be handled by the BottomTabNavigator itself,
    // but we ensure the content inside has appropriate spacing.
  },
  label: {
    marginTop: 4,
    fontWeight: '500',
  }
});
