import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Vibration } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const SOUND_FILES: Record<string, any> = {
  'Gentle Chime': require('@/assets/sounds/chime.wav'),
  'Calm Flute': require('@/assets/sounds/flute.wav'),
  'High Bell': require('@/assets/sounds/bell.wav'),
  'Classic Ring': require('@/assets/sounds/ring.wav'),
};

export default function MedicineRemindersScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [earlyAlert, setEarlyAlert] = useState(true);
  const [persistentAlarm, setPersistentAlarm] = useState(true);
  const [caregiverEscalation, setCaregiverEscalation] = useState(true);
  const [selectedTone, setSelectedTone] = useState('Gentle Chime');
  const [playingTone, setPlayingTone] = useState<string | null>(null);

  const soundRef = useRef<Audio.Sound | null>(null);

  const tones = ['Gentle Chime', 'Calm Flute', 'High Bell', 'Classic Ring'];

  useEffect(() => {
    // Configure audio mode for iOS and Android
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    }).catch(() => {});

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
      }
    };
  }, []);

  const playSound = async (toneName: string) => {
    try {
      if (vibrationEnabled) {
        Vibration.vibrate(100);
      }

      if (!soundEnabled) {
        Alert.alert(
          'Sound Is Turned Off',
          'The "Sound Alerts" toggle is switched OFF. Turn it ON above to hear alarm tones.'
        );
        return;
      }

      setPlayingTone(toneName);

      if (soundRef.current) {
        await soundRef.current.stopAsync().catch(() => {});
        await soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }

      const soundSource = SOUND_FILES[toneName];
      if (soundSource) {
        const { sound } = await Audio.Sound.createAsync(
          soundSource,
          { shouldPlay: true, volume: 1.0 }
        );
        soundRef.current = sound;
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setPlayingTone(null);
          }
        });
      } else {
        setPlayingTone(null);
      }
    } catch {
      setPlayingTone(null);
      Alert.alert('Alert Tone', `Playing tone "${toneName}" 🔔`);
    }
  };

  const handleSave = () => {
    Alert.alert('Reminders Updated', 'Your medicine notification preferences have been saved successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Medicine Reminders" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Top Info Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Feather name="bell" size={28} color="#0EADF1" />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>Never Miss a Pill</Text>
            <Text style={styles.bannerSubtitle}>
              Loud, persistent alerts designed to make sure medications are taken on time.
            </Text>
          </View>
        </View>

        {/* Alert Delivery Controls */}
        <Text style={styles.sectionTitle}>Alert Settings</Text>
        <Card style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Sound Alerts</Text>
              <Text style={styles.rowSubtitle}>Play audio tone at scheduled dose time</Text>
            </View>
            <Switch 
              value={soundEnabled} 
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={soundEnabled ? '#0EADF1' : '#9CA3AF'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Vibration</Text>
              <Text style={styles.rowSubtitle}>Vibrate phone during dose alert</Text>
            </View>
            <Switch 
              value={vibrationEnabled} 
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={vibrationEnabled ? '#0EADF1' : '#9CA3AF'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Pre-Dose Warning (15 Min)</Text>
              <Text style={styles.rowSubtitle}>Notifies you 15 minutes before mealtime</Text>
            </View>
            <Switch 
              value={earlyAlert} 
              onValueChange={setEarlyAlert}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={earlyAlert ? '#0EADF1' : '#9CA3AF'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Persistent Repeating Alarm</Text>
              <Text style={styles.rowSubtitle}>Repeats every 5 mins until marked &apos;Taken&apos;</Text>
            </View>
            <Switch 
              value={persistentAlarm} 
              onValueChange={setPersistentAlarm}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={persistentAlarm ? '#0EADF1' : '#9CA3AF'}
            />
          </View>
        </Card>

        {/* Tone Selection */}
        <Text style={styles.sectionTitle}>Alert Tone</Text>
        <Card style={styles.card}>
          {tones.map((tone, idx) => {
            const isSelected = selectedTone === tone;
            const isThisPlaying = playingTone === tone;
            return (
              <React.Fragment key={tone}>
                <TouchableOpacity 
                  style={[styles.toneRow, isSelected && styles.toneRowSelected]} 
                  onPress={() => {
                    setSelectedTone(tone);
                    playSound(tone);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.toneLeftCol}>
                    <Text style={[styles.toneName, isSelected && styles.toneNameSelected]}>{tone}</Text>
                    {isThisPlaying && (
                      <View style={styles.playingBadge}>
                        <Feather name="volume-2" size={12} color="#059669" />
                        <Text style={styles.playingBadgeText}>Playing</Text>
                      </View>
                    )}
                  </View>
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
                {idx < tones.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}

          <TouchableOpacity 
            style={[styles.testBtn, playingTone === selectedTone && styles.testBtnPlaying]} 
            onPress={() => playSound(selectedTone)} 
            activeOpacity={0.8}
          >
            <Feather 
              name={playingTone === selectedTone ? "volume-2" : "volume-1"} 
              size={18} 
              color={playingTone === selectedTone ? "#059669" : "#0EADF1"} 
              style={{ marginRight: 8 }} 
            />
            <Text style={[styles.testBtnText, playingTone === selectedTone && { color: '#059669' }]}>
              {playingTone === selectedTone ? `Playing "${selectedTone}"...` : `Test "${selectedTone}"`}
            </Text>
          </TouchableOpacity>
        </Card>

        {/* Safety Escalation */}
        <Text style={styles.sectionTitle}>Caregiver Safety Sync</Text>
        <Card style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Notify Caregiver on Missed Dose</Text>
              <Text style={styles.rowSubtitle}>Sends SMS alert to Ali Arif if dose is missed by 45 mins</Text>
            </View>
            <Switch 
              value={caregiverEscalation} 
              onValueChange={setCaregiverEscalation}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={caregiverEscalation ? '#10B981' : '#9CA3AF'}
            />
          </View>
        </Card>

        {/* Save Button */}
        <Button 
          title="Save Reminder Settings" 
          onPress={handleSave} 
          style={{ marginTop: Spacing.md }} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 60 },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#E0F2FE'
  },
  bannerIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  bannerTextCol: { flex: 1 },
  bannerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18
  },

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
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1
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
    marginVertical: Spacing.xs
  },

  toneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 10
  },
  toneRowSelected: {
    backgroundColor: '#F0F9FF'
  },
  toneLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  toneName: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500'
  },
  toneNameSelected: {
    color: '#0EADF1',
    fontWeight: '700'
  },
  playingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4
  },
  playingBadgeText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700'
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioCircleSelected: {
    borderColor: '#0EADF1'
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0EADF1'
  },

  testBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: Spacing.sm
  },
  testBtnPlaying: {
    backgroundColor: '#ECFDF5'
  },
  testBtnText: {
    color: '#0EADF1',
    fontWeight: '700',
    fontSize: 15
  }
});
