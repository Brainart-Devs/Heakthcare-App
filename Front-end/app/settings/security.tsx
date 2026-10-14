import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Modal, Vibration } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function PrivacySecurityScreen() {
  const { theme, isDark } = useTheme();
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(true);
  const [caregiverAuditLogs, setCaregiverAuditLogs] = useState(true);
  
  // PIN Modal State
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [currentPin, setCurrentPin] = useState('2468');

  // Export Modal State
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Audit Log Modal State
  const [showAuditModal, setShowAuditModal] = useState(false);

  const handleKeypadPress = (digit: string) => {
    Vibration.vibrate(30);
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        setTimeout(() => {
          setCurrentPin(nextPin);
          setShowPinModal(false);
          setPin('');
          Alert.alert('Security PIN Updated', `Your new 4-digit security PIN (${nextPin}) has been saved successfully.`);
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    Vibration.vibrate(25);
    setPin(prev => prev.slice(0, -1));
  };

  const handleExportData = () => {
    Vibration.vibrate(40);
    setIsExporting(true);
    setExportProgress(20);
    setTimeout(() => setExportProgress(50), 300);
    setTimeout(() => setExportProgress(85), 600);
    setTimeout(() => {
      setExportProgress(100);
      setIsExporting(false);
      Alert.alert(
        'Export Complete',
        'Health_Records_Archive.zip (encrypted 256-bit) has been downloaded to your device storage.',
        [{ text: 'Done' }]
      );
    }, 900);
  };

  const handleDeleteAccount = () => {
    Vibration.vibrate(80);
    Alert.alert(
      'Delete All Health Records?',
      'This will permanently delete your patient profile, blood glucose history, prescription records, and revoke caregiver access. This action CANNOT be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Forever', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'All local records have been cleared.');
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Privacy & Security" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Security Shield Banner */}
        <View style={[styles.banner, { backgroundColor: isDark ? '#064E3B' : '#ECFDF5', borderColor: isDark ? '#059669' : '#D1FAE5' }]}>
          <View style={[styles.bannerIcon, { backgroundColor: isDark ? '#065F46' : '#D1FAE5' }]}>
            <MaterialCommunityIcons name="shield-check" size={32} color={isDark ? '#34D399' : '#10B981'} />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={[styles.bannerTitle, { color: isDark ? '#34D399' : '#065F46' }]}>HIPAA & Patient Privacy</Text>
            <Text style={[styles.bannerSubtitle, { color: isDark ? '#A7F3D0' : '#047857' }]}>
              Your sensitive health records are stored encrypted on-device with medical-grade security.
            </Text>
          </View>
        </View>

        {/* Access Control */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>App Lock & Biometrics</Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Face ID / Fingerprint</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>Require biometric scan upon opening app</Text>
            </View>
            <Switch
              value={biometricsEnabled}
              onValueChange={(val) => {
                Vibration.vibrate(30);
                setBiometricsEnabled(val);
              }}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={biometricsEnabled ? theme.primary : '#9CA3AF'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity 
            style={styles.actionItem} 
            onPress={() => {
              Vibration.vibrate(30);
              setPin('');
              setShowPinModal(true);
            }} 
            activeOpacity={0.7}
          >
            <View style={[styles.actionIcon, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
              <Feather name="lock" size={18} color={theme.primary} />
            </View>
            <View style={styles.actionMeta}>
              <Text style={[styles.actionTitle, { color: theme.text }]}>Change 4-Digit Security PIN</Text>
              <Text style={[styles.actionSubtitle, { color: theme.textSecondary }]}>Current PIN is active (••••)</Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Data Protection */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Data Control & Backups</Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Encrypted Cloud Sync</Text>
              <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>AES-256 encrypted backups in patient cloud</Text>
            </View>
            <Switch
              value={cloudSyncEnabled}
              onValueChange={(val) => {
                Vibration.vibrate(30);
                setCloudSyncEnabled(val);
              }}
              trackColor={{ false: isDark ? '#334155' : '#E5E7EB', true: isDark ? '#0284C7' : '#BAE6FD' }}
              thumbColor={cloudSyncEnabled ? '#10B981' : '#9CA3AF'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity 
            style={styles.actionItem} 
            onPress={() => {
              Vibration.vibrate(30);
              setShowAuditModal(true);
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.actionIcon, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
              <Feather name="eye" size={18} color={theme.primary} />
            </View>
            <View style={styles.actionMeta}>
              <Text style={[styles.actionTitle, { color: theme.text }]}>Caregiver Audit Logs</Text>
              <Text style={[styles.actionSubtitle, { color: theme.textSecondary }]}>View who has accessed your reports</Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity style={styles.actionItem} onPress={handleExportData} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
              <Feather name="download" size={18} color={theme.primary} />
            </View>
            <View style={styles.actionMeta}>
              <Text style={[styles.actionTitle, { color: theme.text }]}>Download Complete Health File</Text>
              <Text style={[styles.actionSubtitle, { color: theme.textSecondary }]}>{isExporting ? `Exporting (${exportProgress}%)...` : 'Export all records into a single file'}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Destructive Zone */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Danger Zone</Text>
        <TouchableOpacity 
          style={[styles.deleteCard, { backgroundColor: isDark ? '#450a0a' : '#FEF2F2', borderColor: isDark ? '#7F1D1D' : '#FEE2E2' }]} 
          onPress={handleDeleteAccount} 
          activeOpacity={0.8}
        >
          <View style={styles.deleteIconBox}>
            <Feather name="trash-2" size={20} color="#EF4444" />
          </View>
          <View style={styles.deleteMeta}>
            <Text style={styles.deleteTitle}>Delete Account & Health Data</Text>
            <Text style={styles.deleteSubtitle}>Permanently wipe all records from this device</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>

      {/* Interactive 4-Digit PIN Modal */}
      <Modal transparent visible={showPinModal} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.pinModalContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
            <View style={styles.pinHeader}>
              <Text style={[styles.pinModalTitle, { color: theme.text }]}>Set 4-Digit App PIN</Text>
              <TouchableOpacity onPress={() => setShowPinModal(false)}>
                <Feather name="x" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.pinModalSubtitle, { color: theme.textSecondary }]}>Enter a memorable 4-digit code to secure your app.</Text>

            {/* PIN Dots Display */}
            <View style={styles.dotsRow}>
              {[0, 1, 2, 3].map(idx => (
                <View 
                  key={idx} 
                  style={[
                    styles.dotCircle, 
                    { borderColor: isDark ? '#475569' : '#D1D5DB' },
                    idx < pin.length && [styles.dotFilled, { backgroundColor: theme.primary, borderColor: theme.primary }]
                  ]} 
                />
              ))}
            </View>

            {/* Numeric Keypad */}
            <View style={styles.keypad}>
              {[
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
                ['', '0', '⌫']
              ].map((row, rIdx) => (
                <View key={rIdx} style={styles.keypadRow}>
                  {row.map((btn, bIdx) => {
                    if (btn === '') {
                      return <View key={bIdx} style={styles.keypadEmpty} />;
                    }
                    if (btn === '⌫') {
                      return (
                        <TouchableOpacity 
                          key={bIdx} 
                          style={[styles.keypadBtn, { backgroundColor: isDark ? '#334155' : '#F3F4F6' }]} 
                          onPress={handleBackspace}
                        >
                          <Feather name="delete" size={22} color={theme.text} />
                        </TouchableOpacity>
                      );
                    }
                    return (
                      <TouchableOpacity 
                        key={bIdx} 
                        style={[styles.keypadBtn, { backgroundColor: isDark ? '#334155' : '#F3F4F6' }]} 
                        onPress={() => handleKeypadPress(btn)}
                      >
                        <Text style={[styles.keypadDigit, { color: theme.text }]}>{btn}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Caregiver Audit Logs Modal */}
      <Modal transparent visible={showAuditModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.auditModalContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
            <View style={styles.pinHeader}>
              <Text style={[styles.pinModalTitle, { color: theme.text }]}>Recent Caregiver Access</Text>
              <TouchableOpacity onPress={() => setShowAuditModal(false)}>
                <Feather name="x" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.pinModalSubtitle, { color: theme.textSecondary }]}>Real-time log of family and physician read activity.</Text>

            <View style={[styles.auditItem, { backgroundColor: isDark ? '#1E293B' : '#F8FAFC', borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 8 }]}>
              <View style={styles.auditIconBox}>
                <Feather name="check-circle" size={16} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.auditTitle, { color: theme.text }]}>Ali Arif (Son)</Text>
                <Text style={[styles.auditAction, { color: theme.textSecondary }]}>Viewed Fasting Sugar logs • Yesterday 08:30 PM</Text>
              </View>
            </View>

            <View style={[styles.auditItem, { backgroundColor: isDark ? '#1E293B' : '#F8FAFC', borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 8 }]}>
              <View style={styles.auditIconBox}>
                <Feather name="check-circle" size={16} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.auditTitle, { color: theme.text }]}>Dr. Tariq Mahmood (Doctor)</Text>
                <Text style={[styles.auditAction, { color: theme.textSecondary }]}>Downloaded Monthly BP Trend Report • Oct 10</Text>
              </View>
            </View>

            <Button title="Close" onPress={() => setShowAuditModal(false)} style={{ marginTop: Spacing.md }} />
          </View>
        </View>
      </Modal>

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
    borderColor: '#D1FAE5'
  },
  bannerIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  bannerTextCol: { flex: 1 },
  bannerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 2
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#047857',
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

  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  actionMeta: { flex: 1 },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#8E8E93'
  },

  deleteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 16,
    padding: Spacing.md
  },
  deleteIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  deleteMeta: { flex: 1 },
  deleteTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 2
  },
  deleteSubtitle: {
    fontSize: 12,
    color: '#991B1B'
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  pinModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xl,
    paddingBottom: 40
  },
  pinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  pinModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827'
  },
  pinModalSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: Spacing.lg
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: Spacing.lg
  },
  dotCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'transparent'
  },
  dotFilled: {
    backgroundColor: '#0EADF1',
    borderColor: '#0EADF1'
  },
  keypad: {
    marginTop: Spacing.md,
    gap: 12
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  keypadBtn: {
    width: 72,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadDigit: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827'
  },
  keypadEmpty: {
    width: 72,
    height: 60
  },

  // Audit Modal
  auditModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xl,
    paddingBottom: 40
  },
  auditItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: Spacing.md,
    borderRadius: 14,
    marginBottom: Spacing.md,
    gap: 12
  },
  auditIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  auditTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827'
  },
  auditAction: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2
  }
});
