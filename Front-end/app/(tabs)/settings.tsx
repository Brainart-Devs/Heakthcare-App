import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { Text, Header, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const MenuItem = ({ icon, title, subtitle, onPress, color = '#4A6583', isDanger = false }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconBox, { backgroundColor: isDanger ? '#FEF2F2' : '#F0F9FF' }]}>
        <Feather name={icon} size={20} color={isDanger ? '#EF4444' : '#0EADF1'} />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={[styles.menuTitle, isDanger && { color: '#EF4444' }]}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <Feather name="chevron-right" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

export default function SettingsScreen() {
  const { user } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Menu" onBack={() => router.push('/')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity style={styles.profileBox} onPress={() => router.push('/profile-setup?edit=true')} activeOpacity={0.8}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editBadge}
            onPress={() => router.push('/profile-setup?edit=true')}
          >
            <Feather name="edit-2" size={14} color="#0EADF1" />
          </TouchableOpacity>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Account</Text>
        <View style={styles.menuSection}>
          <MenuItem icon="user" title="My Profile" subtitle="Personal and health details" onPress={() => router.push('/profile')} />
          <MenuItem icon="users" title="Caregiver Access" subtitle="Manage who can see your data" onPress={() => router.push('/settings/caregiver')} />
          <MenuItem icon="activity" title="Doctor Information" subtitle="Primary care physician details" onPress={() => router.push('/settings/doctor' as any)} />
        </View>

        <Text style={styles.sectionHeader}>Preferences</Text>
        <View style={styles.menuSection}>
          <MenuItem icon="bell" title="Medicine Reminders" subtitle="Configure alert sounds and times" onPress={() => router.push('/settings/reminders' as any)} />
          <MenuItem icon="settings" title="App Preferences" subtitle="Theme, units, and layout" onPress={() => router.push('/settings/preferences' as any)} />
          <MenuItem icon="globe" title="Language" subtitle="English / اردو" onPress={() => router.push('/settings/language' as any)} />
        </View>

        <Text style={styles.sectionHeader}>Support & Security</Text>
        <View style={styles.menuSection}>
          <MenuItem icon="shield" title="Privacy & Security" subtitle="Biometrics and data control" onPress={() => router.push('/settings/security' as any)} />
          <MenuItem icon="help-circle" title="Help & Support" subtitle="FAQs and contact us" onPress={() => router.push('/settings/support' as any)} />
        </View>

        <TouchableOpacity 
          style={styles.signOutBtn}
          onPress={() => setShowLogoutModal(true)}
        >
          <Feather name="log-out" size={20} color="#EF4444" style={{marginRight: 8}} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    
      {/* Logout Modal */}
      <Modal transparent visible={showLogoutModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Feather name="log-out" size={28} color="#111827" />
            </View>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalLogoutBtn} onPress={() => {
                setShowLogoutModal(false);
                router.replace('/');
              }}>
                <Text style={styles.modalLogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 40 },
  
  // Profile Header
  profileBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  avatar: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: '#0EADF1', 
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700'
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93'
  },
  editBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BAE6FD'
  },

  // Sections
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginLeft: 4,
    marginTop: Spacing.md
  },
  menuSection: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1
  },
  menuItem: { 
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F3',
    backgroundColor: '#FFFFFF'
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md
  },
  menuTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#8E8E93'
  },
  
  // Sign Out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 16,
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: '#FEE2E2'
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700'
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#F8FAFC', // Very light cool gray/blue matching mockup
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0', // Slightly darker circle background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 32,
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    color: '#0EADF1',
    fontSize: 16,
    fontWeight: '600',
  },
  modalLogoutBtn: {
    flex: 1,
    backgroundColor: '#0EADF1', // Primary blue
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  modalLogoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  }
});
