import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Card, Badge, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reports" onBack={() => router.push('/')} />
      <View style={styles.tabs}>
        <Badge label="7 Days" status="default" />
        <Badge label="30 Days" status="info" />
        <Badge label="90 Days" status="default" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text variant="h3" style={{marginBottom: Spacing.md}}>Sugar Trend (mg/dL)</Text>
          <View style={styles.chartPlaceholder}>
            <Text variant="body" secondary>(Trend chart will appear here)</Text>
          </View>
        </Card>
        <Card style={styles.card}>
          <Text variant="h3" style={{marginBottom: Spacing.md}}>Blood Pressure Trend (mmHg)</Text>
          <View style={styles.chartPlaceholder}>
            <Text variant="body" secondary>(Trend chart will appear here)</Text>
          </View>
        </Card>
        
        <Button title="Share / Export Report" onPress={() => router.push('/reports/export' as any)} style={{marginTop: Spacing.lg}} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  tabs: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: Spacing.lg },
  card: { marginBottom: Spacing.md },
  chartPlaceholder: { height: 150, backgroundColor: '#E5E5EA', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }
});
