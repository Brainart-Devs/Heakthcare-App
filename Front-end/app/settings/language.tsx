import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  subtitle: string;
}

export default function LanguageScreen() {
  const [selectedLang, setSelectedLang] = useState('en');

  const languages: LanguageOption[] = [
    { code: 'en', name: 'English', nativeName: 'English', subtitle: 'Default app language' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', subtitle: 'بڑے اور واضح الفاظ' },
    { code: 'pa', name: 'Punjabi', nativeName: 'پنجابی / ਪੰਜਾਬੀ', subtitle: 'Regional language support' }
  ];

  const handleApply = () => {
    const lang = languages.find(l => l.code === selectedLang);
    Alert.alert(
      'Language Updated',
      `App language set to ${lang?.name} (${lang?.nativeName}). Content will translate automatically.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Language" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Feather name="globe" size={26} color="#0EADF1" />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>Choose Your Language</Text>
            <Text style={styles.bannerSubtitle}>
              Select the language you feel most comfortable reading your health reports and alerts in.
            </Text>
          </View>
        </View>

        {/* Language Options List */}
        <Text style={styles.sectionTitle}>Available Languages</Text>
        <Card style={styles.card}>
          {languages.map((lang, idx) => {
            const isSelected = selectedLang === lang.code;
            return (
              <React.Fragment key={lang.code}>
                <TouchableOpacity
                  style={[styles.langRow, isSelected && styles.langRowActive]}
                  onPress={() => setSelectedLang(lang.code)}
                  activeOpacity={0.7}
                >
                  <View style={styles.langTextCol}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.langName, isSelected && styles.langNameActive]}>{lang.name}</Text>
                      <Text style={[styles.nativeName, isSelected && styles.nativeNameActive]}>• {lang.nativeName}</Text>
                    </View>
                    <Text style={styles.langSubtitle}>{lang.subtitle}</Text>
                  </View>

                  <View style={[styles.checkCircle, isSelected && styles.checkCircleActive]}>
                    {isSelected && <Feather name="check" size={16} color="#FFFFFF" />}
                  </View>
                </TouchableOpacity>
                {idx < languages.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}
        </Card>

        {/* Notice for Older Adults */}
        <View style={styles.noticeBox}>
          <Feather name="info" size={18} color="#0E748A" style={{ marginRight: 8, marginTop: 2 }} />
          <Text style={styles.noticeText}>
            Medicine names (e.g. Panadol, Sitaglu Met) will always be clearly displayed in both English and Urdu for medical safety.
          </Text>
        </View>

        {/* Apply Button */}
        <Button 
          title="Apply Language" 
          onPress={handleApply} 
          style={{ marginTop: Spacing.xl }} 
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
    padding: Spacing.sm,
    marginBottom: Spacing.xl,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: 12
  },
  langRowActive: {
    backgroundColor: '#F0F9FF'
  },
  langTextCol: { flex: 1 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  langName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827'
  },
  langNameActive: {
    color: '#0EADF1',
    fontWeight: '700'
  },
  nativeName: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 6
  },
  nativeNameActive: {
    color: '#0E748A',
    fontWeight: '700'
  },
  langSubtitle: {
    fontSize: 13,
    color: '#8E8E93'
  },

  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md
  },
  checkCircleActive: {
    backgroundColor: '#0EADF1',
    borderColor: '#0EADF1'
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: Spacing.sm
  },

  noticeBox: {
    flexDirection: 'row',
    backgroundColor: '#E5FAFA',
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'flex-start'
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    color: '#0E748A',
    lineHeight: 18
  }
});
