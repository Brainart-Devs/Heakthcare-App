import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Vibration } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, ThemeMode } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/context/LanguageContext';
import * as Speech from 'expo-speech';

export default function AppPreferencesScreen() {
  const { themeMode, setThemeMode, isDark, theme } = useTheme();
  const { voiceGuidance, setVoiceGuidance } = useUser();
  const { isUrdu, t } = useLanguage();
  const [textSize, setTextSize] = useState<'Normal' | 'Large' | 'Extra Large'>('Large');
  const [sugarUnit, setSugarUnit] = useState<'mg/dL' | 'mmol/L'>('mg/dL');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [highContrast, setHighContrast] = useState(true);
  const [vibrateOnTouch, setVibrateOnTouch] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const toggleTestSpokenGuide = async () => {
    triggerHaptic();
    if (isSpeaking) {
      try {
        await Speech.stop();
      } catch {}
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const samplePhrase = isUrdu 
      ? 'آواز کی رہنمائی فعال ہے۔ یہ ایک آزمائشی آواز ہے۔ اہم طبی الرٹس آپ کو بول کر سنائے جائیں گے۔'
      : 'Spoken Alert Guidance is active. Critical health warnings and medicine reminders will be read aloud.';

    Speech.speak(samplePhrase, {
      language: isUrdu ? 'ur-PK' : 'en-US',
      rate: 0.88,
      pitch: 1.0,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const textSizes: ('Normal' | 'Large' | 'Extra Large')[] = ['Normal', 'Large', 'Extra Large'];
  const themeModes: { mode: ThemeMode; label: string; icon: string }[] = [
    { mode: 'light', label: 'Light', icon: 'sun' },
    { mode: 'dark', label: 'Dark', icon: 'moon' },
    { mode: 'system', label: 'System', icon: 'smartphone' },
  ];

  const triggerHaptic = () => {
    if (vibrateOnTouch) {
      Vibration.vibrate(35);
    }
  };

  const handleThemeModeChange = (mode: ThemeMode) => {
    triggerHaptic();
    setThemeMode(mode);
  };

  const handleTextSizeChange = (size: 'Normal' | 'Large' | 'Extra Large') => {
    triggerHaptic();
    setTextSize(size);
  };

  const handleSave = () => {
    triggerHaptic();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      Alert.alert(
        'Preferences Saved',
        `• Theme: ${themeMode.toUpperCase()}\n• Text Size: ${textSize}\n• Sugar Unit: ${sugarUnit}\n• Weight Unit: ${weightUnit}\n• High Contrast: ${highContrast ? 'Enabled' : 'Disabled'}`
      );
    }, 600);
  };

  // Font size multiplier for Live Preview
  const getFontSize = (baseSize: number) => {
    if (textSize === 'Normal') return baseSize;
    if (textSize === 'Large') return baseSize + 3;
    return baseSize + 6;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="App Preferences" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Color Theme Selector */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Color Theme</Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.groupLabel, { color: theme.text }]}>
            Theme Mode (Dark / Light)
          </Text>
          <View style={styles.pillRow}>
            {themeModes.map((item) => {
              const isSelected = themeMode === item.mode;
              return (
                <TouchableOpacity
                  key={item.mode}
                  style={[
                    styles.pill,
                    { 
                      backgroundColor: isSelected ? theme.primary : (isDark ? '#334155' : '#F3F4F6'),
                      borderColor: isSelected ? theme.primary : theme.border,
                    }
                  ]}
                  onPress={() => handleThemeModeChange(item.mode)}
                  activeOpacity={0.8}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Feather 
                      name={item.icon as any} 
                      size={16} 
                      color={isSelected ? '#FFFFFF' : theme.text} 
                    />
                    <Text style={[
                      styles.pillText, 
                      { color: isSelected ? '#FFFFFF' : theme.text },
                      isSelected && { fontWeight: '800' }
                    ]}>
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={[styles.pillHelper, { color: theme.primary }]}>
            {isDark 
              ? '🌙 Dark mode active: High-contrast, glare-free, and easy on older eyes.' 
              : '☀️ Light mode active: Crisp, high-contrast daylight reading view.'}
          </Text>
        </Card>

        {/* Readability & Text Size */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Readability & Display</Text>
        <Card style={[
          styles.card, 
          { backgroundColor: theme.card, borderColor: theme.border },
          highContrast && (isDark ? styles.highContrastCardDark : styles.highContrastCardLight)
        ]}>
          <Text style={[styles.groupLabel, { color: theme.text }]}>
            Text Size (For Older Eyes)
          </Text>
          <View style={styles.pillRow}>
            {textSizes.map((size) => {
              const isSelected = textSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.pill,
                    { 
                      backgroundColor: isSelected ? theme.primary : (isDark ? '#334155' : '#F3F4F6'),
                      borderColor: isSelected ? theme.primary : theme.border,
                    }
                  ]}
                  onPress={() => handleTextSizeChange(size)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.pillText, 
                    { color: isSelected ? '#FFFFFF' : theme.text },
                    isSelected && { fontWeight: '800' }
                  ]}>
                    {size} {size === 'Large' ? '★' : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={[styles.pillHelper, { color: theme.primary }]}>★ &apos;Large&apos; is recommended for comfortable reading.</Text>

          {/* Live Preview Box */}
          <View style={[
            styles.previewBox, 
            { 
              backgroundColor: isDark ? '#0F172A' : '#F0F9FF', 
              borderColor: isDark ? '#38BDF8' : '#BAE6FD' 
            }
          ]}>
            <View style={styles.previewHeader}>
              <Feather name="eye" size={14} color={theme.primary} style={{ marginRight: 6 }} />
              <Text style={[styles.previewTag, { color: theme.primary }]}>LIVE READING PREVIEW ({textSize})</Text>
            </View>
            <Text style={[styles.previewTitle, { fontSize: getFontSize(16), color: theme.text }]}>
              Sitaglu Met (50/850)
            </Text>
            <Text style={[styles.previewSub, { fontSize: getFontSize(13), color: theme.textSecondary }]}>
              Take 1 tablet after dinner with water • 08:00 PM
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>High Contrast Mode</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>Darker borders and enhanced text contrast</Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={(val) => {
                triggerHaptic();
                setHighContrast(val);
              }}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={highContrast ? theme.primary : '#9CA3AF'}
            />
          </View>
        </Card>

        {/* Health Measurement Units */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Medical Units</Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.groupLabel, { color: theme.text }]}>Blood Sugar Unit</Text>
          <View style={styles.unitRow}>
            {(['mg/dL', 'mmol/L'] as const).map((unit) => {
              const isSelected = sugarUnit === unit;
              return (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.unitBtn,
                    { 
                      backgroundColor: isSelected ? (isDark ? '#082F49' : '#F0F9FF') : (isDark ? '#334155' : '#F9FAFB'),
                      borderColor: isSelected ? theme.primary : theme.border,
                    }
                  ]}
                  onPress={() => {
                    triggerHaptic();
                    setSugarUnit(unit);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.unitText, 
                    { color: isSelected ? theme.primary : theme.text },
                    isSelected && { fontWeight: '700' }
                  ]}>
                    {unit}
                  </Text>
                  {unit === 'mg/dL' && <Text style={[styles.standardTag, { color: theme.textSecondary }]}>Pakistan/US Standard</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={[styles.conversionHint, { color: theme.textSecondary }]}>
            Sample Reading: {sugarUnit === 'mg/dL' ? '115 mg/dL (Normal fasting)' : '6.4 mmol/L (Normal fasting)'}
          </Text>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <Text style={[styles.groupLabel, { color: theme.text }]}>Weight Unit</Text>
          <View style={styles.unitRow}>
            {(['kg', 'lbs'] as const).map((unit) => {
              const isSelected = weightUnit === unit;
              return (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.unitBtn,
                    { 
                      backgroundColor: isSelected ? (isDark ? '#082F49' : '#F0F9FF') : (isDark ? '#334155' : '#F9FAFB'),
                      borderColor: isSelected ? theme.primary : theme.border,
                    }
                  ]}
                  onPress={() => {
                    triggerHaptic();
                    setWeightUnit(unit);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.unitText, 
                    { color: isSelected ? theme.primary : theme.text },
                    isSelected && { fontWeight: '700' }
                  ]}>
                    {unit === 'kg' ? 'Kilograms (kg)' : 'Pounds (lbs)'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={[styles.conversionHint, { color: theme.textSecondary }]}>
            Sample Weight: {weightUnit === 'kg' ? '72 kg' : '158.7 lbs'}
          </Text>
        </Card>

        {/* Accessibility & Voice */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Accessibility Assistance</Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>
                {isUrdu ? 'آواز کی رہنمائی (Spoken Alerts)' : 'Spoken Alert Guidance'}
              </Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>
                {isUrdu ? 'اہم الرٹس اور ہدایات اونچی آواز میں پڑھ کر سنائیں' : 'Read out loud critical alerts and dose names'}
              </Text>
            </View>
            <Switch
              value={voiceGuidance}
              onValueChange={(val) => {
                triggerHaptic();
                setVoiceGuidance(val);
                if (val) {
                  Speech.speak(isUrdu ? 'آواز کی رہنمائی فعال کر دی گئی۔' : 'Spoken alert guidance activated.', {
                    language: isUrdu ? 'ur-PK' : 'en-US',
                    rate: 0.9,
                  });
                } else {
                  Speech.stop();
                  setIsSpeaking(false);
                }
              }}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={voiceGuidance ? theme.primary : '#9CA3AF'}
            />
          </View>

          {voiceGuidance && (
            <View style={styles.testVoiceContainer}>
              <TouchableOpacity 
                style={[
                  styles.testVoiceBtn, 
                  { 
                    backgroundColor: isSpeaking ? (isDark ? '#7F1D1D' : '#FEF2F2') : (isDark ? '#082F49' : '#F0F9FF'),
                    borderColor: isSpeaking ? '#EF4444' : theme.primary 
                  }
                ]}
                onPress={toggleTestSpokenGuide}
                activeOpacity={0.8}
              >
                <Feather 
                  name={isSpeaking ? "volume-x" : "volume-2"} 
                  size={20} 
                  color={isSpeaking ? '#EF4444' : theme.primary} 
                  style={{ marginRight: 8 }} 
                />
                <Text style={[styles.testVoiceBtnText, { color: isSpeaking ? '#EF4444' : theme.primary }]}>
                  {isSpeaking 
                    ? (isUrdu ? 'آواز بند کریں (Stop Voice)' : 'Stop Voice Test') 
                    : (isUrdu ? 'آواز سنیں (Test Spoken Voice)' : 'Test Spoken Alert Voice')}
                </Text>
              </TouchableOpacity>
              <Text style={[styles.testVoiceHint, { color: theme.textSecondary }]}>
                {isUrdu 
                  ? 'اس بٹن کو دبا کر تصدیق کریں کہ آپ کے فون کی آواز درست طور پر سنائی دے رہی ہے۔'
                  : 'Tap to hear a sample and verify that your phone speaker & speech audio are working.'}
              </Text>
            </View>
          )}

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Haptic Tap Feedback</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>Light vibration when pressing buttons</Text>
            </View>
            <Switch
              value={vibrateOnTouch}
              onValueChange={(val) => {
                if (val) Vibration.vibrate(80);
                setVibrateOnTouch(val);
              }}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={vibrateOnTouch ? theme.primary : '#9CA3AF'}
            />
          </View>
        </Card>

        {/* Save Button */}
        <Button 
          title={savedSuccess ? 'Saving...' : 'Save Preferences'} 
          onPress={handleSave} 
          style={{ marginTop: Spacing.sm }} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: 60 },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginLeft: 4
  },
  card: {
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1
  },
  highContrastCardLight: {
    borderWidth: 2,
    borderColor: '#111827',
  },
  highContrastCardDark: {
    borderWidth: 2,
    borderColor: '#38BDF8',
  },
  groupLabel: {
    fontSize: 15,
    fontWeight: '600',
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pillHelper: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: Spacing.sm
  },

  previewBox: {
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  previewTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  previewTitle: {
    fontWeight: '700',
    marginBottom: 2
  },
  previewSub: {
    lineHeight: 20
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
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unitText: {
    fontSize: 15,
    fontWeight: '600',
  },
  standardTag: {
    fontSize: 10,
    marginTop: 2
  },
  conversionHint: {
    fontSize: 12,
    marginTop: 6,
    fontStyle: 'italic'
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
    marginBottom: 2
  },
  rowSubtitle: {
    fontSize: 13,
    lineHeight: 18
  },
  divider: {
    height: 1,
    marginVertical: Spacing.md
  },
  testVoiceContainer: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
    paddingTop: Spacing.xs,
  },
  testVoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  testVoiceBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  testVoiceHint: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 16,
  }
});

