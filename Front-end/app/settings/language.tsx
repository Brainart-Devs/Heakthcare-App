import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert, Vibration } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage, SupportedLanguage } from '@/context/LanguageContext';

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  subtitle: string;
  sampleGreeting: string;
  sampleMed: string;
  sampleInstruction: string;
}

export default function LanguageScreen() {
  const { theme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(language);

  const languages: LanguageOption[] = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English', 
      subtitle: 'Default app language',
      sampleGreeting: 'Good Morning, Patient',
      sampleMed: 'Sitaglu Met (50/850)',
      sampleInstruction: 'Take 1 tablet with dinner • Water'
    },
    { 
      code: 'ur', 
      name: 'Urdu', 
      nativeName: 'اردو', 
      subtitle: 'بڑے اور واضح الفاظ',
      sampleGreeting: 'صبح بخیر، مریض',
      sampleMed: 'سیٹاگلو میٹ (Sitaglu Met 50/850)',
      sampleInstruction: 'رات کے کھانے کے بعد 1 گولی • پانی کے ساتھ'
    }
  ];

  const currentLangObj = languages.find(l => l.code === selectedLang) || languages[0];

  const handleSelect = (code: SupportedLanguage) => {
    Vibration.vibrate(30);
    setSelectedLang(code);
  };

  const handleApply = () => {
    Vibration.vibrate(50);
    setLanguage(selectedLang);
    Alert.alert(
      selectedLang === 'ur' ? 'زبان تبدیل ہو گئی' : 'Language Updated',
      selectedLang === 'ur'
        ? `ایپلی کیشن کی زبان کامیابی سے ${currentLangObj.name} (${currentLangObj.nativeName}) میں تبدیل کر دی گئی ہے۔`
        : `Language has been switched to ${currentLangObj.name} (${currentLangObj.nativeName}). The application interface is updated.`,
      [{ text: selectedLang === 'ur' ? 'ٹھیک ہے' : 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title={t('language', 'Language')} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Banner */}
        <View style={[styles.banner, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.bannerIcon, { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }]}>
            <Feather name="globe" size={26} color={theme.primary} />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={[styles.bannerTitle, { color: theme.text }]}>
              {t('chooseLanguage', 'Choose Your Language')}
            </Text>
            <Text style={[styles.bannerSubtitle, { color: theme.textSecondary }]}>
              {t('chooseLanguageSubtitle', 'Select the language you feel most comfortable reading your health reports and alerts in.')}
            </Text>
          </View>
        </View>

        {/* Language Options List */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          {t('availableLanguages', 'Available Languages')}
        </Text>
        <Card style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          {languages.map((lang, idx) => {
            const isSelected = selectedLang === lang.code;
            return (
              <React.Fragment key={lang.code}>
                <TouchableOpacity
                  style={[
                    styles.langRow, 
                    isSelected && { backgroundColor: isDark ? '#082F49' : '#F0F9FF' }
                  ]}
                  onPress={() => handleSelect(lang.code)}
                  activeOpacity={0.7}
                >
                  <View style={styles.langTextCol}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.langName, { color: theme.text }, isSelected && { color: theme.primary, fontWeight: '700' }]}>{lang.name}</Text>
                      <Text style={[styles.nativeName, { color: theme.textSecondary }, isSelected && { color: theme.primary, fontWeight: '700' }]}>• {lang.nativeName}</Text>
                    </View>
                    <Text style={[styles.langSubtitle, { color: theme.textSecondary }]}>{lang.subtitle}</Text>
                  </View>

                  <View style={[
                    styles.checkCircle, 
                    { borderColor: isDark ? '#475569' : '#D1D5DB' },
                    isSelected && { backgroundColor: theme.primary, borderColor: theme.primary }
                  ]}>
                    {isSelected && <Feather name="check" size={16} color="#FFFFFF" />}
                  </View>
                </TouchableOpacity>
                {idx < languages.length - 1 && <View style={[styles.divider, { backgroundColor: theme.border }]} />}
              </React.Fragment>
            );
          })}
        </Card>

        {/* Live Translation Sample Preview Card */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          {t('livePreview', 'Live Language Preview')} ({currentLangObj.name})
        </Text>
        <Card style={[styles.previewCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderLeftColor: theme.primary }]}>
          <View style={styles.previewHeader}>
            <Feather name="book-open" size={16} color={theme.primary} style={{ marginRight: 6 }} />
            <Text style={[styles.previewGreeting, { color: theme.primary }]}>{currentLangObj.sampleGreeting}</Text>
          </View>
          <Text style={[styles.previewMed, { color: theme.text }]}>{currentLangObj.sampleMed}</Text>
          <Text style={[styles.previewInstruction, { color: theme.textSecondary }]}>{currentLangObj.sampleInstruction}</Text>
        </Card>

        {/* Notice for Older Adults */}
        <View style={[styles.noticeBox, { backgroundColor: isDark ? '#082F49' : '#E5FAFA' }]}>
          <Feather name="info" size={18} color={theme.primary} style={{ marginRight: 8, marginTop: 2 }} />
          <Text style={[styles.noticeText, { color: theme.primary }]}>
            {t('medicalSafetyNote', 'Medical Safety Note: Drug brand names (e.g. Panadol, Sitaglu Met) are always clearly displayed in English alongside regional text for clinical accuracy.')}
          </Text>
        </View>

        {/* Apply Button */}
        <Button 
          title={`${t('apply', 'Apply')} ${currentLangObj.name} (${currentLangObj.nativeName})`}
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
    padding: 0,
    borderRadius: 16,
    marginBottom: Spacing.xl,
    overflow: 'hidden'
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 18,
  },
  langTextCol: { flex: 1, paddingRight: Spacing.md },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  langName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  nativeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B5563',
    marginLeft: 6
  },
  langSubtitle: {
    fontSize: 13,
    color: '#6B7280'
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: Spacing.lg
  },

  previewCard: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: '#0EADF1'
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  previewGreeting: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0E748A'
  },
  previewMed: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4
  },
  previewInstruction: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20
  },

  noticeBox: {
    flexDirection: 'row',
    backgroundColor: '#E5FAFA',
    padding: Spacing.md,
    borderRadius: 12,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
    alignItems: 'flex-start'
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: '#0E748A',
    lineHeight: 18,
    fontWeight: '500'
  }
});
