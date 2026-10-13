import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Vibration } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const AUDIO_ENGINE_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<script>
  var ctx = null;
  function getContext() {
    if (!ctx) {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  // Pre-unlock audio
  document.addEventListener('touchstart', function() { getContext(); }, false);
  document.addEventListener('click', function() { getContext(); }, false);

  window.playTone = function(toneName) {
    try {
      var audioCtx = getContext();
      if (!audioCtx) return;
      var now = audioCtx.currentTime;

      if (toneName === 'Gentle Chime') {
        var notes = [659.25, 830.61, 987.77, 1318.51];
        notes.forEach(function(freq, idx) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.15);
          gain.gain.setValueAtTime(0.4, now + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 1.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.15);
          osc.stop(now + idx * 0.15 + 1.2);
        });
      } else if (toneName === 'Calm Flute') {
        var notes = [523.25, 659.25, 783.99];
        notes.forEach(function(freq, idx) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.35);
          gain.gain.setValueAtTime(0.45, now + idx * 0.35);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.35 + 0.6);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.35);
          osc.stop(now + idx * 0.35 + 0.6);
        });
      } else if (toneName === 'Morning Harp') {
        var notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach(function(freq, idx) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.4, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 1.1);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 1.1);
        });
      } else if (toneName === 'Crystal Marimba') {
        var notes = [783.99, 987.77, 1174.66];
        notes.forEach(function(freq, idx) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.18);
          gain.gain.setValueAtTime(0.48, now + idx * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.6);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.18);
          osc.stop(now + idx * 0.18 + 0.6);
        });
      } else if (toneName === 'Pill Melody') {
        var notes = [523.25, 783.99, 659.25, 1046.50];
        notes.forEach(function(freq, idx) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.18);
          gain.gain.setValueAtTime(0.42, now + idx * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.85);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.18);
          osc.stop(now + idx * 0.18 + 0.85);
        });
      } else if (toneName === 'High Bell') {
        var osc = audioCtx.createOscillator();
        var osc2 = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.5, now);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(2093.0, now);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc2.start(now);
        osc.stop(now + 1.5);
        osc2.stop(now + 1.5);
      } else if (toneName === 'Classic Ring') {
        [0, 0.35].forEach(function(delay) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now + delay);
          gain.gain.setValueAtTime(0.45, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.28);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.28);
        });
      } else if (toneName === 'Zen Singing Bowl') {
        var freqs = [432, 864, 1296];
        freqs.forEach(function(freq, idx) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          var vol = idx === 0 ? 0.45 : (0.18 / (idx + 1));
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(vol, now + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 2.0);
        });
      }
    } catch (e) {}
  };
</script>
</body>
</html>
`;

export default function MedicineRemindersScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [earlyAlert, setEarlyAlert] = useState(true);
  const [persistentAlarm, setPersistentAlarm] = useState(true);
  const [caregiverEscalation, setCaregiverEscalation] = useState(true);
  const [selectedTone, setSelectedTone] = useState('Gentle Chime');
  const [playingTone, setPlayingTone] = useState<string | null>(null);

  const webViewRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  const tones = [
    'Gentle Chime',
    'Calm Flute',
    'Morning Harp',
    'Crystal Marimba',
    'Pill Melody',
    'High Bell',
    'Classic Ring',
    'Zen Singing Bowl'
  ];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const playSound = (toneName: string) => {
    if (!soundEnabled) {
      Alert.alert(
        'Sound Is Turned Off',
        'The "Sound Alerts" toggle is switched OFF. Turn it ON above to hear alarm tones.'
      );
      return;
    }

    // Physical vibration patterns tailored to each tune
    if (vibrationEnabled) {
      switch (toneName) {
        case 'Gentle Chime':
          Vibration.vibrate([0, 60, 80, 60]);
          break;
        case 'Calm Flute':
          Vibration.vibrate([0, 100, 100, 150]);
          break;
        case 'Morning Harp':
          Vibration.vibrate([0, 50, 50, 50, 50, 50]);
          break;
        case 'Crystal Marimba':
          Vibration.vibrate([0, 80, 80, 80]);
          break;
        case 'Pill Melody':
          Vibration.vibrate([0, 70, 60, 70, 60, 100]);
          break;
        case 'High Bell':
          Vibration.vibrate([0, 180]);
          break;
        case 'Classic Ring':
          Vibration.vibrate([0, 120, 60, 120, 60, 120]);
          break;
        case 'Zen Singing Bowl':
          Vibration.vibrate([0, 250]);
          break;
        default:
          Vibration.vibrate(100);
      }
    }

    setPlayingTone(toneName);

    // Trigger speaker sound playback via Web Audio API inside invisible engine
    const script = `window.playTone && window.playTone('${toneName}'); true;`;
    webViewRef.current?.injectJavaScript(script);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setPlayingTone(null);
    }, 1800);
  };

  const handleSave = () => {
    Alert.alert('Reminders Updated', 'Your medicine notification preferences have been saved successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Medicine Reminders" onBack={() => router.back()} />
      
      {/* Invisible speaker audio engine */}
      <View style={{ width: 1, height: 1, opacity: 0, position: 'absolute' }}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: AUDIO_ENGINE_HTML }}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
        />
      </View>

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
        <Text style={styles.sectionTitle}>Alert Tone ({tones.length} Available)</Text>
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
                        <Text style={styles.playingBadgeText}>Playing...</Text>
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

          <View style={styles.unmuteHint}>
            <Feather name="volume-x" size={14} color="#8E8E93" style={{ marginRight: 6 }} />
            <Text style={styles.unmuteHintText}>
              Ensure your iPhone physical side-switch is not set to Silent to hear the speaker.
            </Text>
          </View>
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
  },

  unmuteHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  unmuteHintText: {
    fontSize: 12,
    color: '#8E8E93',
    flex: 1,
    lineHeight: 16
  }
});
