import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Text, Header, Input, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function CaregiverAccess() {
  const { theme, isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [invitee, setInvitee] = useState('');
  
  const handleInvite = () => {
    if (!invitee) {
      Alert.alert('Required', 'Please enter an email or phone number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInvitee('');
      Alert.alert('Invite Sent', `An invitation has been sent to ${invitee}.`);
    }, 1000);
  };

  const handleRemove = () => {
    Alert.alert('Remove Caregiver', 'Are you sure you want to remove Ali Arif? They will no longer have access to your health data.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive' }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Caregiver Access" onBack={() => router.back()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Top Banner */}
          <View style={styles.banner}>
            <View style={[styles.iconCircle, { backgroundColor: isDark ? '#082F49' : '#E5FAFA' }]}>
              <Feather name="users" size={32} color={theme.primary} />
            </View>
            <Text style={[styles.bannerTitle, { color: theme.text }]}>Share Your Health Journey</Text>
            <Text style={[styles.bannerText, { color: theme.textSecondary }]}>
              Allow trusted family members or doctors to view your reports and receive safety alerts if you miss critical medicines.
            </Text>
          </View>
          
          {/* Invite Section */}
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>Invite a Caregiver</Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
            <Input 
              placeholder="Email or Phone Number" 
              value={invitee}
              onChangeText={setInvitee}
              leftIcon={<Feather name="user-plus" size={20} color={theme.textSecondary} />}
              style={{marginBottom: Spacing.sm}}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Button 
              title="Send Invitation" 
              onPress={handleInvite} 
              loading={loading}
              style={{marginTop: Spacing.xs}}
            />
          </View>

          {/* Active Caregivers Section */}
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>Active Caregivers</Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
            <View style={styles.caregiverRow}>
              <View style={[styles.avatar, { backgroundColor: isDark ? '#064E3B' : '#E6F4EA' }]}>
                <Text style={[styles.avatarText, { color: '#10B981' }]}>AA</Text>
              </View>
              <View style={styles.caregiverInfo}>
                <Text style={[styles.caregiverName, { color: theme.text }]}>Ali Arif</Text>
                <Text style={[styles.caregiverRole, { color: theme.textSecondary }]}>Son • Full Access</Text>
              </View>
              <TouchableOpacity style={styles.removeBtn} onPress={handleRemove}>
                <Feather name="trash-2" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            
            <View style={styles.caregiverRow}>
              <View style={[styles.avatar, { backgroundColor: isDark ? '#082F49' : '#E8E3F2' }]}>
                <Text style={[styles.avatarText, { color: theme.primary }]}>Dr</Text>
              </View>
              <View style={styles.caregiverInfo}>
                <Text style={[styles.caregiverName, { color: theme.text }]}>Dr. Ahmad</Text>
                <Text style={[styles.caregiverRole, { color: theme.textSecondary }]}>Physician • Reports Only</Text>
              </View>
              <TouchableOpacity style={styles.removeBtn}>
                <Feather name="trash-2" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            You remain in full control. You can revoke access from any caregiver at any time.
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 60 },
  
  // Banner
  banner: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
    marginTop: Spacing.md
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E5FAFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: Spacing.xs
  },
  bannerText: {
    fontSize: 15,
    color: '#4A6583',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md
  },

  // Sections
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2
  },
  
  // Caregiver Rows
  caregiverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F4EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md
  },
  avatarText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 18
  },
  caregiverInfo: {
    flex: 1
  },
  caregiverName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2
  },
  caregiverRole: {
    fontSize: 13,
    color: '#8E8E93'
  },
  removeBtn: {
    padding: Spacing.sm,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    marginLeft: Spacing.sm
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F3',
    marginVertical: Spacing.sm
  },
  
  footerText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 13,
    lineHeight: 20,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg
  }
});
