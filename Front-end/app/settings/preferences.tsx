import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function AppPreferencesScreen() {
  const [textSize, setTextSize] = useState<'Normal' | 'Large' | 'Extra Large'>('Large');
  const [sugarUnit, setSugarUnit] = useState<'mg/dL' | 'mmol/L'>('mg/dL');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [highContrast, setHighContrast] = useState(true);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [vibrateOnTouch, setVibrateOnTouch] = useState(true);

  const textSizes: ('Normal' | 'Large' | 'Extra Large')[] = ['Normal', 'Large', 'Extra Large'];

  const handleSave = () => {
    Alert.alert('Preferences Saved', 'Your display and measurement units have been updated.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="App Preferences" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Readability & Text Size */}
        <Text style={styles.sectionTitle}>Readability & Display</Text>
        <Card style={styles.card}>
          <Text style={styles.groupLabel}>Text Size (For Older Eyes)</Text>
          <View style={styles.pillRow}>
            {textSizes.map((size) => {
              const isSelected = textSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  style={[styles.pill, isSelected && styles.pillActive]}
                  onPress={() => setTextSize(size)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>
                    {size} {size === 'Large' ? '★' : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.pillHelper}>★ &apos;Large&apos; is recommended for comfortable reading.</Text>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>High Contrast Mode</Text>
              <Text style={styles.rowSubtitle}>Darker borders and enhanced text contrast</Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={setHighContrast}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={highContrast ? '#0EADF1' : '#9CA3AF'}
            />
          </View>
        </Card>

        {/* Health Measurement Units */}
        <Text style={styles.sectionTitle}>Medical Units</Text>
        <Card style={styles.card}>
          <Text style={styles.groupLabel}>Blood Sugar Unit</Text>
          <View style={styles.unitRow}>
            {(['mg/dL', 'mmol/L'] as const).map((unit) => {
              const isSelected = sugarUnit === unit;
              return (
                <TouchableOpacity
                  key={unit}
                  style={[styles.unitBtn, isSelected && styles.unitBtnActive]}
                  onPress={() => setSugarUnit(unit)}
                >
                  <Text style={[styles.unitText, isSelected && styles.unitTextActive]}>{unit}</Text>
                  {unit === 'mg/dL' && <Text style={styles.standardTag}>Pakistan/US Standard</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.divider} />

          <Text style={styles.groupLabel}>Weight Unit</Text>
          <View style={styles.unitRow}>
            {(['kg', 'lbs'] as const).map((unit) => {
              const isSelected = weightUnit === unit;
              return (
                <TouchableOpacity
                  key={unit}
                  style={[styles.unitBtn, isSelected && styles.unitBtnActive]}
                  onPress={() => setWeightUnit(unit)}
                >
                  <Text style={[styles.unitText, isSelected && styles.unitTextActive]}>
                    {unit === 'kg' ? 'Kilograms (kg)' : 'Pounds (lbs)'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Accessibility & Voice */}
        <Text style={styles.sectionTitle}>Accessibility Assistance</Text>
        <Card style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Spoken Alert Guidance</Text>
              <Text style={styles.rowSubtitle}>Read out loud critical alerts and dose names</Text>
            </View>
            <Switch
              value={voiceGuidance}
              onValueChange={setVoiceGuidance}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={voiceGuidance ? '#0EADF1' : '#9CA3AF'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Haptic Tap Feedback</Text>
              <Text style={styles.rowSubtitle}>Light vibration when pressing buttons</Text>
            </View>
            <Switch
              value={vibrateOnTouch}
              onValueChange={setVibrateOnTouch}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={vibrateOnTouch ? '#0EADF1' : '#9CA3AF'}
            />
          </View>
        </Card>

        {/* Save Button */}
        <Button 
          title="Save Preferences" 
          onPress={handleSave} 
          style={{ marginTop: Spacing.sm }} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 60 },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginLeft: 4
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1
  },
  groupLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: Spacing.sm
  },
  pillRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: 6
  },
  pill: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  pillActive: {
    backgroundColor: '#0EADF1',
    borderColor: '#0EADF1'
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151'
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  pillHelper: {
    fontSize: 12,
    color: '#0E748A',
    marginTop: 4,
    marginBottom: Spacing.xs
  },

  unitRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xs
  },
  unitBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  unitBtnActive: {
    borderColor: '#0EADF1',
    backgroundColor: '#F0F9FF'
  },
  unitText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563'
  },
  unitTextActive: {
    color: '#0EADF1',
    fontWeight: '700'
  },
  standardTag: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 2
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm
  },
  switchLabelCol: {
    flex: 1,
    paddingRight: Spacing.md
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: Spacing.md
  }
});
