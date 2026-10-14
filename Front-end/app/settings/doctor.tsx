import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Header, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function DoctorInfoScreen() {
  const { theme, isDark } = useTheme();
  const handleCallDoctor = () => {
    Alert.alert(
      'Call Doctor',
      'Calling Dr. Tariq Mahmood at +92 300 1234567...',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => {} }
      ]
    );
  };

  const handleBookAppointment = () => {
    Alert.alert('Appointment Request', 'Appointment request sent to Dr. Tariq Mahmood for confirmation.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Doctor Information" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Doctor Main Profile Card */}
        <Card style={[styles.doctorCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.doctorHeader}>
            <View style={[styles.avatarCircle, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
              <MaterialCommunityIcons name="doctor" size={44} color={theme.primary} />
            </View>
            <View style={styles.doctorMeta}>
              <Text style={[styles.doctorName, { color: theme.text }]}>Dr. Tariq Mahmood</Text>
              <Text style={[styles.doctorSpecialty, { color: theme.primary }]}>Consultant Endocrinologist</Text>
              <View style={styles.hospitalRow}>
                <Feather name="map-pin" size={14} color={theme.textSecondary} />
                <Text style={[styles.hospitalText, { color: theme.textSecondary }]}>National Hospital, DHA Phase 5</Text>
              </View>
            </View>
          </View>

          {/* Quick Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryActionBtn} onPress={handleCallDoctor} activeOpacity={0.8}>
              <Feather name="phone-call" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryActionText}>Call Doctor</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.secondaryActionBtn, { backgroundColor: isDark ? '#082F49' : '#F0F9FF', borderColor: isDark ? '#0284C7' : '#BAE6FD' }]} 
              onPress={handleBookAppointment} 
              activeOpacity={0.8}
            >
              <Feather name="calendar" size={18} color={theme.primary} style={{ marginRight: 8 }} />
              <Text style={[styles.secondaryActionText, { color: theme.primary }]}>Book Visit</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Contact & Clinic Details */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Clinic & Contact</Text>
        <Card style={[styles.detailsCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.detailItem}>
            <View style={[styles.iconSquare, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
              <Feather name="phone" size={18} color={theme.primary} />
            </View>
            <View style={styles.detailTextCol}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Direct Phone</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>+92 300 1234567</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.detailItem}>
            <View style={[styles.iconSquare, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
              <Feather name="clock" size={18} color={theme.primary} />
            </View>
            <View style={styles.detailTextCol}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Visiting Hours</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>Mon – Fri: 04:00 PM – 08:00 PM</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.detailItem}>
            <View style={[styles.iconSquare, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
              <Feather name="navigation" size={18} color={theme.primary} />
            </View>
            <View style={styles.detailTextCol}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Address</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>Suite 402, Medical Enclave, Jail Road</Text>
            </View>
          </View>
        </Card>

        {/* Next Appointment Card */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Upcoming Appointment</Text>
        <Card style={[styles.appointmentCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.appointmentHeader}>
            <View style={[styles.calBadge, { backgroundColor: isDark ? '#082F49' : '#F0F9FF', borderColor: isDark ? '#0284C7' : '#BAE6FD' }]}>
              <Text style={[styles.calMonth, { color: theme.primary }]}>OCT</Text>
              <Text style={[styles.calDay, { color: theme.text }]}>25</Text>
            </View>
            <View style={styles.appointmentMeta}>
              <Text style={[styles.appointmentTitle, { color: theme.text }]}>Routine Diabetes Review</Text>
              <Text style={[styles.appointmentTime, { color: theme.textSecondary }]}>Friday at 05:30 PM (Confirmed)</Text>
            </View>
          </View>
        </Card>

        {/* Last Appointment Card */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Last Appointment</Text>
        <Card style={[styles.pastAppointmentCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.appointmentHeader}>
            <View style={[styles.calBadge, styles.pastCalBadge, { backgroundColor: isDark ? '#334155' : '#F1F5F9', borderColor: isDark ? '#475569' : '#E2E8F0' }]}>
              <Text style={[styles.calMonth, styles.pastCalMonth, { color: theme.textSecondary }]}>OCT</Text>
              <Text style={[styles.calDay, styles.pastCalDay, { color: theme.textSecondary }]}>01</Text>
            </View>
            <View style={styles.appointmentMeta}>
              <Text style={[styles.appointmentTitle, { color: theme.text }]}>Quarterly Diabetes & BP Check</Text>
              <Text style={[styles.appointmentTimePast, { color: theme.textSecondary }]}>Tuesday at 04:30 PM • Completed</Text>
              <Text style={[styles.appointmentNotes, { color: theme.primary }]}>HbA1c: 6.8% • Dose adjusted to Sitaglu Met 50/850</Text>
            </View>
          </View>
        </Card>

        {/* Doctor's Guidance Notes */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Doctor&apos;s Clinical Notes</Text>
        <Card style={[styles.notesCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderLeftColor: theme.primary }]}>
          <View style={styles.notesHeader}>
            <Feather name="file-text" size={18} color={theme.primary} style={{ marginRight: 8 }} />
            <Text style={[styles.notesTitle, { color: theme.primary }]}>Latest Advice (Oct 1, 2024)</Text>
          </View>
          <Text style={[styles.notesBody, { color: theme.text }]}>
            {'"Keep fasting blood sugar strictly between 90–125 mg/dL. Take Sitaglu Met 50/850 with dinner. Continue morning 20-minute light walk."'}
          </Text>
        </Card>

        {/* Secondary Doctor Button */}
        <TouchableOpacity 
          style={[styles.editDoctorBtn, { backgroundColor: isDark ? '#082F49' : '#F0F9FF', borderColor: isDark ? '#0284C7' : '#BAE6FD' }]} 
          onPress={() => Alert.alert('Edit Doctor', 'Doctor details editing will synchronize with your clinic in the backend.')}
        >
          <Feather name="edit-3" size={18} color={theme.primary} style={{ marginRight: 8 }} />
          <Text style={[styles.editDoctorText, { color: theme.primary }]}>Update Doctor Details</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 60 },
  
  doctorCard: {
    padding: Spacing.lg,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: Spacing.xl,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#E8E3F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  doctorMeta: { flex: 1 },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#4B2E83',
    fontWeight: '600',
    marginBottom: 4
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hospitalText: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 4
  },
  
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm
  },
  primaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 14
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15
  },
  secondaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingVertical: 14,
    borderRadius: 14
  },
  secondaryActionText: {
    color: '#0EADF1',
    fontWeight: '700',
    fontSize: 15
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginLeft: 4
  },
  detailsCard: {
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm
  },
  iconSquare: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  detailTextCol: { flex: 1 },
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827'
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F3',
    marginVertical: Spacing.xs
  },

  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 0,
    borderLeftWidth: 4,
    borderLeftColor: '#0EADF1'
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  calBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E5FAFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  calMonth: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0E748A'
  },
  calDay: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0E748A'
  },
  appointmentMeta: { flex: 1 },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2
  },
  appointmentTime: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600'
  },
  pastAppointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 0,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981'
  },
  pastCalBadge: {
    backgroundColor: '#ECFDF5'
  },
  pastCalMonth: {
    color: '#059669'
  },
  pastCalDay: {
    color: '#059669'
  },
  appointmentTimePast: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
    marginBottom: 4
  },
  appointmentNotes: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18
  },

  notesCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16449C'
  },
  notesBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
    fontStyle: 'italic'
  },

  editDoctorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  editDoctorText: {
    color: '#16449C',
    fontWeight: '600',
    fontSize: 15
  }
});
