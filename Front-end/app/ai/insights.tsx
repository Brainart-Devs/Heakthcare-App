import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Card, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function AIInsights() {
  const { theme, isDark } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="AI Insights" onBack={() => router.back()} />
      <View style={[styles.tabs, { backgroundColor: isDark ? '#1E293B' : '#F8F9FA' }]}>
        <Badge label="Summary" status="info" />
        <Badge label="Trends" status="default" />
        <Badge label="Suggestions" status="default" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="h3" color={theme.text} style={{marginBottom: Spacing.md}}>Last 7 Days Overview</Text>
        
        <Card style={styles.card}>
          <Text variant="h3">Fasting Sugar</Text>
          <Text variant="bodyLarge" color={theme.primary}>Average 132 mg/dL</Text>
          <Text variant="body" secondary>Slightly higher than previous week</Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="h3">Blood Pressure</Text>
          <Text variant="bodyLarge" color="#34C759">Average 138/84 mmHg</Text>
          <Text variant="body" secondary>In target range</Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="h3">Medicine Adherence</Text>
          <Text variant="bodyLarge" color="#FFCC00">85%</Text>
          <Text variant="body" secondary>Good (1 dose missed)</Text>
        </Card>

        <Card style={[styles.card, {backgroundColor: isDark ? '#082F49' : '#E8E3F2'}]}>
          <Text variant="h3" color={theme.primary}>AI Suggestion</Text>
          <Text variant="bodyLarge" style={{marginTop: Spacing.sm}}>
            Your fasting sugar is slightly higher this week. Consider reviewing your diet and activity levels. If this trend continues, discuss with your doctor.
          </Text>
          <Text variant="caption" secondary style={{marginTop: Spacing.lg}}>
            This is AI-generated guidance and not a replacement for professional medical advice.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabs: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg },
  card: { marginBottom: Spacing.md }
});
