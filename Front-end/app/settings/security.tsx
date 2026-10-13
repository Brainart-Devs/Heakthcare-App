import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Text, Header, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PrivacySecurityScreen() {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(true);
  const [caregiverAuditLogs, setCaregiverAuditLogs] = useState(true);

  const handleChangePin = () => {
    Alert.alert('Change App PIN', 'Enter your current 4-digit security PIN to update it.');
  };

  const handleExportData = () => {
    Alert.alert('Export Medical History', 'A secure ZIP archive of all your glucose, BP readings, and prescription logs has been generated.', [
      { text: 'Download ZIP' },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleDeleteAccount = () => {
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
    <SafeAreaView style={styles.container}>
      <Header title="Privacy & Security" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Security Shield Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <MaterialCommunityIcons name="shield-check" size={32} color="#10B981" />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>HIPAA & Patient Privacy</Text>
            <Text style={styles.bannerSubtitle}>
              Your sensitive health records are stored encrypted on-device with medical-grade security.
            </Text>
          </View>
        </View>

        {/* Access Control */}
        <Text style={styles.sectionTitle}>App Lock & Biometrics</Text>
        <Card style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Face ID / Fingerprint</Text>
              <Text style={styles.rowSubtitle}>Require biometric scan upon opening app</Text>
            </View>
            <Switch
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={biometricsEnabled ? '#0EADF1' : '#9CA3AF'}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionItem} onPress={handleChangePin} activeOpacity={0.7}>
            <View style={styles.actionIcon}>
              <Feather name="lock" size={18} color="#0EADF1" />
            </View>
            <View style={styles.actionMeta}>
              <Text style={styles.actionTitle}>Change 4-Digit Security PIN</Text>
              <Text style={styles.actionSubtitle}>PIN required if biometric sensor fails</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </Card>

        {/* Data Protection */}
        <Text style={styles.sectionTitle}>Data Control & Backups</Text>
        <Card style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Encrypted Cloud Sync</Text>
              <Text style={styles.rowSubtitle}>AES-256 encrypted backups in patient cloud</Text>
            </View>
            <Switch
              value={cloudSyncEnabled}
              onValueChange={setCloudSyncEnabled}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={cloudSyncEnabled ? '#10B981' : '#9CA3AF'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.rowTitle}>Caregiver Audit Logs</Text>
              <Text style={styles.rowSubtitle}>Notify you whenever a caregiver views your data</Text>
            </View>
            <Switch
              value={caregiverAuditLogs}
              onValueChange={setCaregiverAuditLogs}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={caregiverAuditLogs ? '#0EADF1' : '#9CA3AF'}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionItem} onPress={handleExportData} activeOpacity={0.7}>
            <View style={styles.actionIcon}>
              <Feather name="download" size={18} color="#0EADF1" />
            </View>
            <View style={styles.actionMeta}>
              <Text style={styles.actionTitle}>Download Complete Health File</Text>
              <Text style={styles.actionSubtitle}>Export all records into a single file</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </Card>

        {/* Destructive Zone */}
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <TouchableOpacity style={styles.deleteCard} onPress={handleDeleteAccount} activeOpacity={0.8}>
          <View style={styles.deleteIconBox}>
            <Feather name="trash-2" size={20} color="#EF4444" />
          </View>
          <View style={styles.deleteMeta}>
            <Text style={styles.deleteTitle}>Delete Account & Health Data</Text>
            <Text style={styles.deleteSubtitle}>Permanently wipe all records from this device</Text>
          </View>
        </TouchableOpacity>

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
  }
});
