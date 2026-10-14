import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Vibration } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import { useTheme } from '@/context/ThemeContext';

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

  window.speakVoice = function(gender) {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var msg = new SpeechSynthesisUtterance("It is time to take your medicine.");
        msg.rate = 0.88;
        var allVoices = window.speechSynthesis.getVoices() || [];
        if (gender === 'Male') {
          msg.pitch = 0.82;
          var mv = allVoices.find(function(v) {
            var n = (v.name + ' ' + (v.voiceURI || '')).toLowerCase();
            return (n.includes('male') || n.includes('daniel') || n.includes('david') || n.includes('george') || n.includes('alex') || n.includes('guy') || n.includes('fred')) && !n.includes('female');
          });
          if (mv) msg.voice = mv;
        } else {
          msg.pitch = 1.15;
          var fv = allVoices.find(function(v) {
            var n = (v.name + ' ' + (v.voiceURI || '')).toLowerCase();
            return n.includes('female') || n.includes('samantha') || n.includes('karen') || n.includes('zira') || n.includes('victoria') || n.includes('susan') || n.includes('moira');
          });
          if (fv) msg.voice = fv;
        }
        window.speechSynthesis.speak(msg);
      }
    } catch(e) {}
  };

  window.stopAll = function() {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch(e) {}
  };

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
  const { theme, isDark } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [earlyAlert, setEarlyAlert] = useState(true);
  const [persistentAlarm, setPersistentAlarm] = useState(true);
  const [caregiverEscalation, setCaregiverEscalation] = useState(true);
  const [selectedTone, setSelectedTone] = useState('Female Voice');
  const [playingTone, setPlayingTone] = useState<string | null>(null);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);

  const webViewRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  const tones = [
    { 
      id: 'Female Voice', 
      name: 'Female Voice', 
      subtitle: '“It is time to take your medicine.”',
      isVoice: true,
      gender: 'Female' as const,
    },
    { 
      id: 'Male Voice', 
      name: 'Male Voice', 
      subtitle: '“It is time to take your medicine.”',
      isVoice: true,
      gender: 'Male' as const,
    },
    { 
      id: 'Gentle Chime', 
      name: 'Gentle Chime', 
      subtitle: 'Ascending bell harmony',
      isVoice: false,
    },
    { 
      id: 'Calm Flute', 
      name: 'Calm Flute', 
      subtitle: 'Soft woodwind melody',
      isVoice: false,
    },
    { 
      id: 'Morning Harp', 
      name: 'Morning Harp', 
      subtitle: 'Gentle ascending harp strings',
      isVoice: false,
    },
    { 
      id: 'Crystal Marimba', 
      name: 'Crystal Marimba', 
      subtitle: 'Warm acoustic resonance',
      isVoice: false,
    },
    { 
      id: 'Pill Melody', 
      name: 'Pill Melody', 
      subtitle: 'Cheerful upbeat reminder chime',
      isVoice: false,
    },
    { 
      id: 'High Bell', 
      name: 'High Bell', 
      subtitle: 'Clear, high-visibility alert chime',
      isVoice: false,
    },
    { 
      id: 'Classic Ring', 
      name: 'Classic Ring', 
      subtitle: 'Traditional alarm clock chime',
      isVoice: false,
    },
    { 
      id: 'Zen Singing Bowl', 
      name: 'Zen Singing Bowl', 
      subtitle: 'Deep calming meditative tone',
      isVoice: false,
    }
  ];

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then(vList => setVoices(vList))
      .catch(() => {});

    return () => {
      Speech.stop();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const playSound = async (toneId: string) => {
    if (!soundEnabled) {
      Alert.alert(
        'Sound Is Turned Off',
        'The "Sound Alerts" toggle is switched OFF. Turn it ON above to hear alarm tones.'
      );
      return;
    }

    // Stop ongoing speech & sounds
    try {
      await Speech.stop();
    } catch (e) {}
    webViewRef.current?.injectJavaScript(`window.stopAll && window.stopAll(); true;`);

    const toneItem = tones.find(t => t.id === toneId);

    // Physical vibration patterns tailored to each tune & voice
    if (vibrationEnabled) {
      if (toneItem?.isVoice) {
        Vibration.vibrate([0, 120, 80, 140]);
      } else {
        switch (toneId) {
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
    }

    setPlayingTone(toneId);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (toneItem?.isVoice) {
      const text = 'It is time to take your medicine.';
      let voiceIdentifier: string | undefined;

      if (voices.length > 0) {
        if (toneItem.gender === 'Male') {
          const maleVoice = voices.find(v => {
            const n = (v.name + ' ' + v.identifier).toLowerCase();
            return (
              (n.includes('male') ||
                n.includes('daniel') ||
                n.includes('david') ||
                n.includes('george') ||
                n.includes('aaron') ||
                n.includes('alex') ||
                n.includes('guy') ||
                n.includes('fred')) &&
              !n.includes('female')
            );
          });
          if (maleVoice) voiceIdentifier = maleVoice.identifier;
        } else {
          const femaleVoice = voices.find(v => {
            const n = (v.name + ' ' + v.identifier).toLowerCase();
            return (
              n.includes('female') ||
              n.includes('samantha') ||
              n.includes('karen') ||
              n.includes('zira') ||
              n.includes('victoria') ||
              n.includes('susan') ||
              n.includes('moira') ||
              n.includes('tessa')
            );
          });
          if (femaleVoice) voiceIdentifier = femaleVoice.identifier;
        }
      }

      try {
        Speech.speak(text, {
          language: 'en-US',
          pitch: toneItem.gender === 'Male' ? 0.85 : 1.15,
          rate: 0.88,
          voice: voiceIdentifier,
          onDone: () => setPlayingTone(null),
          onStopped: () => setPlayingTone(null),
          onError: () => setPlayingTone(null),
        });
      } catch (err) {
        // Fallback to WebView speech synthesis
        const script = `window.speakVoice && window.speakVoice('${toneItem.gender}'); true;`;
        webViewRef.current?.injectJavaScript(script);
      }

      timeoutRef.current = setTimeout(() => {
        setPlayingTone(null);
      }, 3000);
    } else {
      // Trigger speaker sound playback via Web Audio API inside invisible engine
      const script = `window.playTone && window.playTone('${toneId}'); true;`;
      webViewRef.current?.injectJavaScript(script);

      timeoutRef.current = setTimeout(() => {
        setPlayingTone(null);
      }, 1800);
    }
  };

  const handleSave = () => {
    Alert.alert('Reminders Updated', 'Your medicine notification preferences have been saved successfully.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
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
        <View style={[styles.banner, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.bannerIcon, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
            <Feather name="bell" size={28} color={theme.primary} />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={[styles.bannerTitle, { color: theme.text }]}>Never Miss a Pill</Text>
            <Text style={[styles.bannerSubtitle, { color: theme.textSecondary }]}>
              Loud, persistent alerts designed to make sure medications are taken on time.
            </Text>
          </View>
        </View>

        {/* Alert Delivery Controls */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Alert Settings</Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Sound Alerts</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>Play audio tone at scheduled dose time</Text>
            </View>
            <Switch 
              value={soundEnabled} 
              onValueChange={setSoundEnabled}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={soundEnabled ? theme.primary : '#9CA3AF'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Vibration</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>Vibrate phone during dose alert</Text>
            </View>
            <Switch 
              value={vibrationEnabled} 
              onValueChange={setVibrationEnabled}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={vibrationEnabled ? theme.primary : '#9CA3AF'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Pre-Dose Warning (15 Min)</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>Notifies you 15 minutes before mealtime</Text>
            </View>
            <Switch 
              value={earlyAlert} 
              onValueChange={setEarlyAlert}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={earlyAlert ? theme.primary : '#9CA3AF'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Persistent Repeating Alarm</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>Repeats every 5 mins until marked &apos;Taken&apos;</Text>
            </View>
            <Switch 
              value={persistentAlarm} 
              onValueChange={setPersistentAlarm}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={persistentAlarm ? theme.primary : '#9CA3AF'}
            />
          </View>
        </Card>

        {/* Tone Selection */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Alert Tone & Spoken Voice ({tones.length} Available)</Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          {tones.map((toneItem, idx) => {
            const isSelected = selectedTone === toneItem.id;
            const isThisPlaying = playingTone === toneItem.id;
            return (
              <React.Fragment key={toneItem.id}>
                <TouchableOpacity 
                  style={[
                    styles.toneRow, 
                    isSelected && { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }
                  ]} 
                  onPress={() => {
                    setSelectedTone(toneItem.id);
                    playSound(toneItem.id);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.toneLeftCol}>
                    <View style={[
                      styles.iconCircle,
                      { backgroundColor: toneItem.isVoice ? (isDark ? '#312E81' : '#EEF2FF') : (isDark ? '#1E293B' : '#F1F5F9') }
                    ]}>
                      {toneItem.isVoice ? (
                        <MaterialCommunityIcons 
                          name="account-voice" 
                          size={20} 
                          color={toneItem.isVoice ? (isDark ? '#A5B4FC' : '#4F46E5') : theme.primary} 
                        />
                      ) : (
                        <Feather 
                          name="music" 
                          size={16} 
                          color={theme.primary} 
                        />
                      )}
                    </View>
                    <View style={styles.toneTextCol}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={[
                          styles.toneName, 
                          { color: theme.text },
                          isSelected && { color: theme.primary, fontWeight: '700' }
                        ]}>{toneItem.name}</Text>
                        {toneItem.isVoice && (
                          <View style={[styles.voiceTag, { backgroundColor: isDark ? '#312E81' : '#EEF2FF' }]}>
                            <Text style={[styles.voiceTagText, { color: isDark ? '#C7D2FE' : '#4F46E5' }]}>Spoken Voice</Text>
                          </View>
                        )}
                      </View>
                      <Text style={[
                        styles.toneSubtitle, 
                        { color: isSelected ? theme.primary : theme.textSecondary }
                      ]}>
                        {toneItem.subtitle}
                      </Text>
                      {isThisPlaying && (
                        <View style={[styles.playingBadge, { backgroundColor: isDark ? '#064E3B' : '#ECFDF5', marginTop: 4 }]}>
                          <Feather name="volume-2" size={12} color={isDark ? '#34D399' : '#059669'} />
                          <Text style={[styles.playingBadgeText, { color: isDark ? '#34D399' : '#059669' }]}>
                            {toneItem.isVoice ? 'Speaking Voice...' : 'Playing Chime...'}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={[
                    styles.radioCircle, 
                    { borderColor: isDark ? '#475569' : '#D1D5DB' },
                    isSelected && { borderColor: theme.primary }
                  ]}>
                    {isSelected && <View style={[styles.radioInner, { backgroundColor: theme.primary }]} />}
                  </View>
                </TouchableOpacity>
                {idx < tones.length - 1 && <View style={[styles.divider, { backgroundColor: theme.border }]} />}
              </React.Fragment>
            );
          })}

          <TouchableOpacity 
            style={[
              styles.testBtn, 
              { backgroundColor: isDark ? '#082F49' : '#F0F9FF', borderColor: isDark ? '#0284C7' : '#BAE6FD' },
              playingTone === selectedTone && { borderColor: '#10B981', backgroundColor: isDark ? '#064E3B' : '#ECFDF5' }
            ]} 
            onPress={() => playSound(selectedTone)} 
            activeOpacity={0.8}
          >
            <Feather 
              name={playingTone === selectedTone ? "volume-2" : "volume-1"} 
              size={18} 
              color={playingTone === selectedTone ? (isDark ? "#34D399" : "#059669") : theme.primary} 
              style={{ marginRight: 8 }} 
            />
            <Text style={[
              styles.testBtnText, 
              { color: theme.primary },
              playingTone === selectedTone && { color: isDark ? '#34D399' : '#059669' }
            ]}>
              {playingTone === selectedTone 
                ? (selectedTone.includes('Voice') ? `Speaking "${selectedTone}"...` : `Playing "${selectedTone}"...`) 
                : `Test "${selectedTone}"`}
            </Text>
          </TouchableOpacity>

          <View style={styles.unmuteHint}>
            <Feather name="volume-x" size={14} color={theme.textSecondary} style={{ marginRight: 6 }} />
            <Text style={[styles.unmuteHintText, { color: theme.textSecondary }]}>
              Ensure your iPhone physical side-switch is not set to Silent to hear the speaker.
            </Text>
          </View>
        </Card>

        {/* Safety Escalation */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Caregiver Safety Sync</Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Notify Caregiver on Missed Dose</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>Sends SMS alert to Ali Arif if dose is missed by 45 mins</Text>
            </View>
            <Switch 
              value={caregiverEscalation} 
              onValueChange={setCaregiverEscalation}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
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
    flex: 1,
    marginRight: 12
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  toneTextCol: {
    flex: 1
  },
  toneSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16
  },
  voiceTag: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6
  },
  voiceTagText: {
    fontSize: 10,
    fontWeight: '700'
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
