import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function ReportsScreen() {
  const { theme, isDark } = useTheme();
  const [selectedRange, setSelectedRange] = useState<'7' | '30' | '90'>('7');

  const ranges = [
    { key: '7', label: '7 Days' },
    { key: '30', label: '30 Days' },
    { key: '90', label: '90 Days' }
  ];

  // Dummy trend bars for Sugar (7 days)
  const sugarData = [
    { day: 'Mon', val: 105, target: 120, status: 'normal' },
    { day: 'Tue', val: 118, target: 120, status: 'normal' },
    { day: 'Wed', val: 142, target: 120, status: 'high' },
    { day: 'Thu', val: 112, target: 120, status: 'normal' },
    { day: 'Fri', val: 125, target: 120, status: 'normal' },
    { day: 'Sat', val: 135, target: 120, status: 'high' },
    { day: 'Sun', val: 110, target: 120, status: 'normal' }
  ];

  // Dummy trend bars for Blood Pressure (7 days)
  const bpData = [
    { day: 'Mon', sys: 120, dia: 80, label: '120/80', status: 'normal' },
    { day: 'Tue', sys: 124, dia: 82, label: '124/82', status: 'normal' },
    { day: 'Wed', sys: 138, dia: 88, label: '138/88', status: 'high' },
    { day: 'Thu', sys: 118, dia: 78, label: '118/78', status: 'normal' },
    { day: 'Fri', sys: 122, dia: 80, label: '122/80', status: 'normal' },
    { day: 'Sat', sys: 128, dia: 84, label: '128/84', status: 'normal' },
    { day: 'Sun', sys: 121, dia: 79, label: '121/79', status: 'normal' }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Reports" onBack={() => router.push('/')} />
      
      {/* Time Range Pills */}
      <View style={[styles.rangeSelector, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        {ranges.map((r) => {
          const isSelected = selectedRange === r.key;
          return (
            <TouchableOpacity
              key={r.key}
              style={[
                styles.rangePill, 
                { backgroundColor: isDark ? '#334155' : '#F4F4F6' },
                isSelected && { backgroundColor: theme.primary }
              ]}
              onPress={() => setSelectedRange(r.key as any)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.rangeText, 
                { color: isDark ? '#94A3B8' : '#4B5563' },
                isSelected && styles.rangeTextActive
              ]}>
                {r.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Quick Health Summary Stat Boxes */}
        <View style={styles.statsRow}>
          <Card style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Avg Blood Sugar</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>121 <Text style={[styles.statUnit, { color: theme.textSecondary }]}>mg/dL</Text></Text>
            <View style={[styles.statTagGood, { backgroundColor: isDark ? '#064E3B' : '#ECFDF5' }]}>
              <Feather name="check" size={12} color={isDark ? '#34D399' : '#059669'} />
              <Text style={[styles.statTagText, { color: isDark ? '#34D399' : '#059669' }]}>In Target</Text>
            </View>
          </Card>

          <Card style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Avg Blood Pressure</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>124/81 <Text style={[styles.statUnit, { color: theme.textSecondary }]}>mmHg</Text></Text>
            <View style={[styles.statTagGood, { backgroundColor: isDark ? '#064E3B' : '#ECFDF5' }]}>
              <Feather name="check" size={12} color={isDark ? '#34D399' : '#059669'} />
              <Text style={[styles.statTagText, { color: isDark ? '#34D399' : '#059669' }]}>Normal</Text>
            </View>
          </Card>
        </View>

        {/* Sugar Trend Chart Card */}
        <Card style={[styles.chartCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.chartTitle, { color: theme.text }]}>Fasting Sugar Trend</Text>
              <Text style={[styles.chartSubtitle, { color: theme.textSecondary }]}>Target: Under 125 mg/dL</Text>
            </View>
            <View style={styles.chartLegend}>
              <View style={[styles.legendDot, { backgroundColor: theme.primary }]} />
              <Text style={[styles.legendText, { color: theme.textSecondary }]}>mg/dL</Text>
            </View>
          </View>

          {/* Visual Bar Chart */}
          <View style={styles.barChartContainer}>
            {sugarData.map((d) => {
              const heightPercent = Math.min(100, Math.max(30, (d.val / 160) * 100));
              const isHigh = d.status === 'high';
              return (
                <View key={d.day} style={styles.barCol}>
                  <Text style={[styles.barValText, { color: theme.textSecondary }]}>{d.val}</Text>
                  <View style={[styles.barTrack, { backgroundColor: isDark ? '#334155' : '#F3F4F6' }]}>
                    <View 
                      style={[
                        styles.barFill, 
                        { height: `${heightPercent}%`, backgroundColor: theme.primary },
                        isHigh && { backgroundColor: '#F59E0B' }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.barDayText, { color: theme.textSecondary }]}>{d.day}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Blood Pressure Trend Chart Card */}
        <Card style={[styles.chartCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.chartTitle, { color: theme.text }]}>Blood Pressure Trend</Text>
              <Text style={[styles.chartSubtitle, { color: theme.textSecondary }]}>Target: Under 130/85 mmHg</Text>
            </View>
            <View style={styles.chartLegend}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.legendText, { color: theme.textSecondary }]}>Systolic</Text>
            </View>
          </View>

          {/* Visual BP Bar Chart */}
          <View style={styles.barChartContainer}>
            {bpData.map((d) => {
              const heightPercent = Math.min(100, Math.max(30, (d.sys / 150) * 100));
              const isHigh = d.status === 'high';
              return (
                <View key={d.day} style={styles.barCol}>
                  <Text style={[styles.barValText, { color: theme.textSecondary }]}>{d.sys}</Text>
                  <View style={[styles.barTrack, { backgroundColor: isDark ? '#334155' : '#F3F4F6' }]}>
                    <View 
                      style={[
                        styles.barFill, 
                        { height: `${heightPercent}%`, backgroundColor: '#10B981' },
                        isHigh && { backgroundColor: '#EF4444' }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.barDayText, { color: theme.textSecondary }]}>{d.day}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Export CTA Button */}
        <Button 
          title="Share / Export Full Report" 
          onPress={() => router.push('/reports/export' as any)} 
          style={{ marginTop: Spacing.sm }} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 60 },

  rangeSelector: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
    gap: Spacing.sm,
    justifyContent: 'center'
  },
  rangePill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6'
  },
  rangePillActive: {
    backgroundColor: '#0EADF1'
  },
  rangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563'
  },
  rangeTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },

  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg
  },
  statBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6
  },
  statUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280'
  },
  statTagGood: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 4
  },
  statTagText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700'
  },

  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#8E8E93'
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600'
  },

  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 10
  },
  barCol: {
    alignItems: 'center',
    flex: 1
  },
  barValText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 4
  },
  barTrack: {
    height: 90,
    width: 14,
    backgroundColor: '#F3F4F6',
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  barFill: {
    width: '100%',
    backgroundColor: '#0EADF1',
    borderRadius: 7
  },
  barDayText: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '600',
    marginTop: 6
  }
});
