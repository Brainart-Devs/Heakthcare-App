import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeColor, Spacing } from '@/constants/theme';
import { Text } from './Typography';
import { Button } from './Button';

interface StateViewProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function LoadingState({ message = 'Loading...' }: StateViewProps) {
  const theme = useThemeColor();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text variant="bodyLarge" style={styles.message} secondary align="center">
        {message}
      </Text>
    </View>
  );
}

interface ErrorStateProps extends StateViewProps {
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'We encountered an error loading this information.', 
  icon,
  onRetry 
}: ErrorStateProps) {
  const theme = useThemeColor();
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text variant="h3" color={theme.danger} align="center" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyLarge" secondary align="center" style={styles.message}>
        {message}
      </Text>
      {onRetry && (
        <Button 
          title="Try Again" 
          variant="outline" 
          onPress={onRetry} 
          style={styles.actionButton} 
        />
      )}
    </View>
  );
}

interface EmptyStateProps extends StateViewProps {
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'No Data Found',
  message = 'There is nothing to display here yet.',
  icon,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text variant="h3" align="center" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyLarge" secondary align="center" style={styles.message}>
        {message}
      </Text>
      {actionLabel && onAction && (
        <Button 
          title={actionLabel} 
          variant="primary" 
          onPress={onAction} 
          style={styles.actionButton} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  message: {
    marginBottom: Spacing.xl,
  },
  actionButton: {
    minWidth: 200,
  }
});
