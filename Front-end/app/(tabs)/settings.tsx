import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import { Text, Header, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const MenuItem = ({ icon, title, subtitle, onPress, color = '#4A6583', isDanger = false, theme, isDark }: any) => (
  <TouchableOpacity 
    style={[
      styles.menuItem, 
      { 
        backgroundColor: theme.card, 
        borderBottomColor: theme.border 
      }
    ]} 
    onPress={onPress} 
    activeOpacity={0.7}
  >
    <View style={[
      styles.iconBox, 
      { 
        backgroundColor: isDanger 
          ? (isDark ? '#7F1D1D' : '#FEF2F2') 
          : (isDark ? '#082F49' : '#F0F9FF') 
      }
    ]}>
      <Feather name={icon} size={20} color={isDanger ? '#EF4444' : '#0EADF1'} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={[styles.menuTitle, { color: isDanger ? '#EF4444' : theme.text }]}>{title}</Text>
      {subtitle && <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
    </View>
    <Feather name="chevron-right" size={20} color={theme.textSecondary} />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const { user } = useUser();
  const { theme, isDark } = useTheme();
  const { t } = useLanguage();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title={t('menu', 'Menu')} onBack={() => router.push('/')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity 
          style={[styles.profileBox, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]} 
          onPress={() => router.push('/profile-setup?edit=true')} 
          activeOpacity={0.8}
        >
          <View style={styles.avatar}>
            {user.image ? (
              <Image source={{ uri: user.image }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            )}
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.profileName, { color: theme.text }]}>{user.name}</Text>
            <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>{user.email}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.editBadge, { backgroundColor: isDark ? '#082F49' : '#F0F9FF', borderColor: isDark ? '#0284C7' : '#BAE6FD' }]}
            onPress={() => router.push('/profile-setup?edit=true')}
          >
            <Feather name="edit-2" size={14} color="#0EADF1" />
          </TouchableOpacity>
        </TouchableOpacity>

        <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>{t('account', 'Account')}</Text>
        <View style={[styles.menuSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <MenuItem 
            icon="user" 
            title={t('myProfile', 'My Profile')} 
            subtitle={t('myProfileSubtitle', 'Personal and health details')} 
            onPress={() => router.push('/profile')} 
            theme={theme} 
            isDark={isDark} 
          />
          <MenuItem 
            icon="users" 
            title={t('caregiverAccess', 'Caregiver Access')} 
            subtitle={t('caregiverSubtitle', 'Manage who can see your data')} 
            onPress={() => router.push('/settings/caregiver')} 
            theme={theme} 
            isDark={isDark} 
          />
          <MenuItem 
            icon="activity" 
            title={t('doctorInformation', 'Doctor Information')} 
            subtitle={t('doctorSubtitle', 'Primary care physician details')} 
            onPress={() => router.push('/settings/doctor' as any)} 
            theme={theme} 
            isDark={isDark} 
          />
        </View>

        <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>{t('preferences', 'Preferences')}</Text>
        <View style={[styles.menuSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <MenuItem 
            icon="bell" 
            title={t('medicineReminders', 'Medicine Reminders')} 
            subtitle={t('remindersSubtitle', 'Configure alert sounds and times')} 
            onPress={() => router.push('/settings/reminders' as any)} 
            theme={theme} 
            isDark={isDark} 
          />
          <MenuItem 
            icon="settings" 
            title={t('appPreferences', 'App Preferences')} 
            subtitle={t('preferencesSubtitle', 'Theme, units, and layout')} 
            onPress={() => router.push('/settings/preferences' as any)} 
            theme={theme} 
            isDark={isDark} 
          />
          <MenuItem 
            icon="globe" 
            title={t('language', 'Language')} 
            subtitle={t('languageSubtitle', 'English / اردو')} 
            onPress={() => router.push('/settings/language' as any)} 
            theme={theme} 
            isDark={isDark} 
          />
        </View>

        <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>{t('supportSecurity', 'Support & Security')}</Text>
        <View style={[styles.menuSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <MenuItem 
            icon="shield" 
            title={t('privacySecurity', 'Privacy & Security')} 
            subtitle={t('securitySubtitle', 'Biometrics and data control')} 
            onPress={() => router.push('/settings/security' as any)} 
            theme={theme} 
            isDark={isDark} 
          />
          <MenuItem 
            icon="help-circle" 
            title={t('helpSupport', 'Help & Support')} 
            subtitle={t('supportSubtitle', 'FAQs and contact us')} 
            onPress={() => router.push('/settings/support' as any)} 
            theme={theme} 
            isDark={isDark} 
          />
        </View>

        <TouchableOpacity 
          style={[styles.signOutBtn, { backgroundColor: isDark ? '#450a0a' : '#FEF2F2', borderColor: isDark ? '#7F1D1D' : '#FEE2E2' }]}
          onPress={() => setShowLogoutModal(true)}
        >
          <Feather name="log-out" size={20} color="#EF4444" style={{marginRight: 8}} />
          <Text style={styles.signOutText}>{t('signOut', 'Sign Out')}</Text>
        </TouchableOpacity>

      </ScrollView>
    
      {/* Logout Modal */}
      <Modal transparent visible={showLogoutModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
            <View style={[styles.modalIconContainer, { backgroundColor: isDark ? '#334155' : '#E2E8F0' }]}>
              <Feather name="log-out" size={28} color={theme.text} />
            </View>
            <Text style={[styles.modalTitle, { color: theme.text }]}>{t('signOut', 'Sign Out')}</Text>
            <Text style={[styles.modalMessage, { color: theme.textSecondary }]}>
              {t('signOutConfirm', 'Are you sure you want to sign out?')}
            </Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.modalCancelText}>{t('cancel', 'Cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalLogoutBtn} onPress={() => {
                setShowLogoutModal(false);
                router.replace('/');
              }}>
                <Text style={styles.modalLogoutText}>{t('signOut', 'Sign Out')}</Text>
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
    justifyContent: 'center',
    overflow: 'hidden'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  avatarText: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  profileName: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 2 },
  profileEmail: { fontSize: 14, color: '#4A6583' },
  editBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },

  // Sections
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginLeft: 4
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md
  },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 2 },
  menuSubtitle: { fontSize: 12, color: '#4A6583' },

  // Sign out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl
  },
  signOutText: { color: '#EF4444', fontWeight: '700', fontSize: 16 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: Spacing.xs,
  },
  modalMessage: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  modalLogoutBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLogoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
