import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Header, Button } from '@/components/ui';
import { Spacing, Layout } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

const ProfileRow = ({ label, value, labelColor, valueColor }: { label: string, value: string, labelColor?: string, valueColor?: string }) => {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text variant="bodyLarge" color={labelColor || "#8E8E93"} style={styles.rowLabel}>{label}</Text>
      <Text variant="bodyLarge" color={valueColor || "#111827"} style={styles.rowValue}>{value}</Text>
    </View>
  );
};

export default function PatientProfileScreen() {
  const { user } = useUser();
  const { theme, isDark } = useTheme();

  const getAge = (dobString: string) => {
    if (!dobString) return '';
    const parts = dobString.split('/');
    if (parts.length === 3) {
      const year = parseInt(parts[2], 10);
      const currentYear = new Date().getFullYear();
      if (!isNaN(year)) return `(Age ${currentYear - year})`;
    }
    return '';
  };

  const getCm = (ft: string, inc: string) => {
    const f = parseInt(ft) || 0;
    const i = parseInt(inc) || 0;
    if (f === 0 && i === 0) return '';
    const cm = Math.round((f * 30.48) + (i * 2.54));
    return `(${cm} cm)`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Patient Profile" onBack={() => router.back()} />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Avatar Area */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: isDark ? '#1E293B' : '#F4F4F6', borderColor: theme.border }]}>
              <Feather name="user" size={40} color={theme.textSecondary} />
            </View>
            <TouchableOpacity style={[styles.cameraIcon, { backgroundColor: theme.primary, borderColor: theme.background }]}>
              <Feather name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsCard}>
          <ProfileRow label="Full Name" value={user.name} labelColor={theme.textSecondary} valueColor={theme.text} />
          <ProfileRow label="Date of Birth" value={`${user.dob} ${getAge(user.dob)}`} labelColor={theme.textSecondary} valueColor={theme.text} />
          <ProfileRow label="Gender" value={user.gender} labelColor={theme.textSecondary} valueColor={theme.text} />
          <ProfileRow 
            label="Height" 
            value={user.heightFeet ? `${user.heightFeet}'${user.heightInches}" ${getCm(user.heightFeet, user.heightInches)}` : ''} 
            labelColor={theme.textSecondary} 
            valueColor={theme.text}
          />
          <ProfileRow label="Weight" value={user.weight ? `${user.weight} kg` : ''} labelColor={theme.textSecondary} valueColor={theme.text} />
          <ProfileRow label="Conditions" value={user.conditions} labelColor={theme.textSecondary} valueColor={theme.text} />
          <ProfileRow label="Treating Doctor" value={user.doctor} labelColor={theme.textSecondary} valueColor={theme.text} />
          <ProfileRow label="Emergency Contact" value={user.emergencyPhone} labelColor={theme.textSecondary} valueColor={theme.text} />
        </View>

        {/* Edit Button */}
        <Button 
          title="Edit Profile" 
          variant="outline" 
          style={[styles.editButton, { borderColor: theme.primary }]} 
          onPress={() => router.push('/profile-setup?edit=true' as any)} 
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: Spacing.lg, paddingBottom: 60 },
  
  avatarSection: {
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.xxl
  },
  avatarContainer: {
    width: 120,
    height: 120,
    position: 'relative'
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F4F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA'
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#16449C',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF'
  },

  detailsCard: {
    marginBottom: Spacing.xxl
  },
  row: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    alignItems: 'flex-start'
  },
  rowLabel: {
    flex: 0.4,
    fontWeight: '500'
  },
  rowValue: {
    flex: 0.6,
    fontWeight: '600'
  },

  editButton: {
    marginTop: 'auto',
    borderColor: '#16449C'
  }
});
