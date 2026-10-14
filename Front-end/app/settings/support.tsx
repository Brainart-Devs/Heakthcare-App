import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Header, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function HelpSupportScreen() {
  const { theme, isDark } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I log a medicine by scanning the box?',
      answer: 'Go to the Home screen, tap "Add Medicine", then tap the blue Barcode icon next to the medicine name box. Point your camera at the barcode on the medicine box to automatically scan the medicine name and dosage!'
    },
    {
      id: '2',
      question: 'How can my son or caregiver view my readings?',
      answer: 'From the Menu tab, tap "Caregiver Access". Enter your caregiver’s email or phone number and tap "Send Invitation". Once they accept, they can view your vitals and receive alerts if you miss a dose.'
    },
    {
      id: '3',
      question: 'What should I do if a Red Critical Alert appears?',
      answer: 'A Critical Alert means a recorded sugar or blood pressure reading is dangerously outside safe limits. Tap the "Call Doctor" or "Call Caregiver" button on the alert screen immediately, or seek urgent emergency care.'
    },
    {
      id: '4',
      question: 'Can I print or share my monthly reports with my clinic?',
      answer: 'Yes! Go to the Reports tab, tap "Share / Export Report", select your date range, choose PDF or Excel, and tap "Generate Report" to send it directly via WhatsApp, email, or print.'
    }
  ];

  const handleCallEmergency = () => {
    Alert.alert('Emergency Assistance', 'Dialing Emergency Medical Services (1122)...', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call 1122 Now', style: 'destructive', onPress: () => {} }
    ]);
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Email support team at support@healthtrack.ai or call helpline +92 800 432584.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Help & Support" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Emergency Helpline Banner */}
        <TouchableOpacity style={styles.emergencyCard} onPress={handleCallEmergency} activeOpacity={0.8}>
          <View style={styles.emergencyIconCircle}>
            <Feather name="phone-call" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.emergencyMeta}>
            <Text style={styles.emergencyTitle}>Medical Emergency (1122)</Text>
            <Text style={styles.emergencySubtitle}>Tap for immediate 24/7 emergency ambulance</Text>
          </View>
          <Feather name="chevron-right" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Support Channels */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Get in Touch</Text>
        <Card style={[styles.channelsCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
          <TouchableOpacity style={styles.channelRow} onPress={handleContactSupport} activeOpacity={0.7}>
            <View style={[styles.channelIcon, { backgroundColor: isDark ? '#082F49' : '#E5FAFA' }]}>
              <Feather name="headphones" size={20} color={theme.primary} />
            </View>
            <View style={styles.channelMeta}>
              <Text style={[styles.channelTitle, { color: theme.text }]}>Live Customer Support</Text>
              <Text style={[styles.channelSubtitle, { color: theme.textSecondary }]}>Mon–Sat, 09:00 AM – 06:00 PM</Text>
            </View>
            <Feather name="chevron-right" size={18} color={theme.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity style={styles.channelRow} onPress={handleContactSupport} activeOpacity={0.7}>
            <View style={[styles.channelIcon, { backgroundColor: isDark ? '#082F49' : '#E5FAFA' }]}>
              <Feather name="mail" size={20} color={theme.primary} />
            </View>
            <View style={styles.channelMeta}>
              <Text style={[styles.channelTitle, { color: theme.text }]}>Email Us</Text>
              <Text style={[styles.channelSubtitle, { color: theme.textSecondary }]}>support@healthtrack.ai</Text>
            </View>
            <Feather name="chevron-right" size={18} color={theme.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* FAQs */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Frequently Asked Questions</Text>
        <View style={styles.faqList}>
          {faqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <Card key={faq.id} style={[styles.faqCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
                <TouchableOpacity 
                  style={styles.faqHeader} 
                  onPress={() => setExpandedId(isExpanded ? null : faq.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.faqQuestion, { color: theme.text }]}>{faq.question}</Text>
                  <Feather 
                    name={isExpanded ? 'chevron-up' : 'chevron-down'} 
                    size={20} 
                    color={theme.primary} 
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.faqBody}>
                    <Text style={[styles.faqAnswer, { color: theme.textSecondary }]}>{faq.answer}</Text>
                  </View>
                )}
              </Card>
            );
          })}
        </View>

        {/* App Version Info */}
        <View style={styles.versionFooter}>
          <Text style={[styles.versionText, { color: theme.text }]}>HealthTrack AI</Text>
          <Text style={[styles.versionSubtext, { color: theme.textSecondary }]}>Version 1.0.4 • Designed with Care for Older Adults</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 60 },

  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.xl,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3
  },
  emergencyIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  emergencyMeta: { flex: 1 },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#FEE2E2',
    lineHeight: 16
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginLeft: 4
  },
  channelsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.sm,
    marginBottom: Spacing.xl,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md
  },
  channelIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md
  },
  channelMeta: { flex: 1 },
  channelTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2
  },
  channelSubtitle: {
    fontSize: 12,
    color: '#8E8E93'
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: Spacing.sm
  },

  faqList: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    paddingRight: Spacing.sm
  },
  faqBody: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6'
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563'
  },

  versionFooter: {
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.md
  },
  versionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280'
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2
  }
});
