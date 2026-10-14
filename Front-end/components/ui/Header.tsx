import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useThemeColor, Spacing, Layout } from '@/constants/theme';
import { Text } from './Typography';
import { Feather } from '@expo/vector-icons';

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({ title, onBack, rightElement }: HeaderProps) {
  const theme = useThemeColor();

  return (
    <SafeAreaView style={{ backgroundColor: theme.card }}>
      <View style={[styles.container, { borderBottomColor: theme.border }]}>
        <View style={styles.left}>
          {onBack && (
            <TouchableOpacity 
              onPress={onBack} 
              style={styles.backButton}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Feather name="chevron-left" size={28} color={theme.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.center}>
          <Text variant="h3" align="center" numberOfLines={1} color={theme.text}>
            {title}
          </Text>
        </View>

        <View style={styles.right}>
          {rightElement}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60, // Large touch targets and spacing
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    padding: Spacing.sm,
    minHeight: Layout.touchTarget,
    justifyContent: 'center',
  },
});
