import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Platform, Image } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Button, Card, Badge } from '@/components/ui';
import { Spacing, Layout } from '@/constants/theme';
import { mockReadings } from '@/constants/mockData';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeDashboard() {
  const { user, medicines, toggleMedicineTaken } = useUser();
  const { theme, isDark } = useTheme();
  const { language, t } = useLanguage();
  
  const todayStr = new Date().toISOString().split('T')[0];

  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    let hours = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return hours * 60 + mins;
  };

  const upcomingMedicine = medicines
    .filter(m => !m.takenStatus[todayStr])
    .sort((a, b) => parseTime(a.time) - parseTime(b.time))[0];
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning', 'Good Morning');
    if (hour < 17) return t('goodAfternoon', 'Good Afternoon');
    if (hour < 21) return t('goodEvening', 'Good Evening');
    return t('goodNight', 'Good Night');
  };

  const getFormattedDate = () => {
    const locale = language === 'ur' ? 'ur-PK' : 'en-US';
    try {
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
      return new Date().toLocaleDateString(locale, options);
    } catch {
      return new Date().toLocaleDateString('en-US');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* Background Gradient scrolling WITH content */}
        <LinearGradient 
          colors={isDark ? ['#0284C7', '#0F172A'] : ['#0EADF1', '#0E748A']} 
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.headerGradient} 
        />
        
        <SafeAreaView style={styles.safeAreaWrapper}>
          <View style={styles.innerContent}>
            
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <TouchableOpacity 
                  onPress={() => router.push('/profile' as any)} 
                  style={[styles.avatarContainer, { borderColor: isDark ? '#38BDF8' : '#FFFFFF' }]}
                  activeOpacity={0.8}
                >
                  {user.image ? (
                    <Image source={{ uri: user.image }} style={styles.avatarImage} />
                  ) : (
                    <Feather name="user" size={24} color="#0E748A" />
                  )}
                </TouchableOpacity>
                <View style={styles.headerText}>
                  <Text variant="body" style={{color: 'rgba(255,255,255,0.9)'}}>{getGreeting()}</Text>
                  <Text variant="h2" style={{color: '#FFFFFF', marginVertical: 2}}>{user.name}</Text>
                  <Text variant="caption" style={{color: 'rgba(255,255,255,0.8)'}}>{getFormattedDate()}</Text>
                </View>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => router.push('/notifications')} style={styles.iconButton}>
                  <Feather name="bell" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/safety-alert')} style={[styles.iconButton, {marginLeft: Spacing.sm}]}>
                  <Feather name="alert-triangle" size={24} color="#FFFFFF" />
                  <View style={styles.redDot} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Top Row Cards */}
            <View style={[styles.row, {gap: 0, justifyContent: 'space-between'}]}>
              <Card style={styles.halfCard}>
                <Text variant="bodyLarge" color={theme.textSecondary} style={{fontWeight: '500'}}>{t('fastingSugar', 'Fasting Sugar')}</Text>
                <Text style={[styles.metricBig, { color: theme.text }]}>{mockReadings.sugar.value}</Text>
                <View style={{alignSelf: 'flex-start'}}>
                  <Badge label={t('normal', 'Normal')} status="success" />
                </View>
              </Card>
              <Card style={styles.halfCard}>
                <Text variant="bodyLarge" color={theme.textSecondary} style={{fontWeight: '500'}}>{t('bloodPressure', 'Blood Pressure')}</Text>
                <Text style={[styles.metricBig, { color: theme.text }]}>{mockReadings.bp.systolic}/{mockReadings.bp.diastolic}</Text>
                <View style={{alignSelf: 'flex-start'}}>
                  <Badge label={t('good', 'Good')} status="success" />
                </View>
              </Card>
            </View>

            {/* Middle Row Cards */}
            <View style={[styles.row, {gap: 0, justifyContent: 'space-between'}]}>
              <Card style={[styles.thirdCard, {alignItems: 'center', justifyContent: 'center'}]}>
                <Text variant="body" color={theme.textSecondary} style={{fontWeight: '500'}}>{t('pulse', 'Pulse')}</Text>
                <Text style={[styles.metricMedium, { color: theme.text }]}>{mockReadings.bp.pulse}</Text>
                <Text variant="caption" color={theme.textSecondary}>bpm</Text>
              </Card>
              <Card style={[styles.thirdCard, {alignItems: 'center', justifyContent: 'center'}]}>
                <Text variant="body" color={theme.textSecondary} style={{fontWeight: '500'}}>{t('weight', 'Weight')}</Text>
                <Text style={[styles.metricMedium, { color: theme.text }]}>{user.weight}</Text>
                <Text variant="caption" color={theme.textSecondary}>kg</Text>
              </Card>
              <Card style={styles.fortyCard}>
                <Text variant="body" color={theme.textSecondary} style={{fontWeight: '500'}} numberOfLines={1} adjustsFontSizeToFit>{t('todaysMedicines', "Today's Medicines")}</Text>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginTop: 4}}>
                  <View>
                    <Text style={[styles.metricMedium, { color: theme.text }]}>3 of 5</Text>
                    <Text variant="body" color="#34A853" style={{fontWeight: '600'}}>{t('taken', 'Taken')}</Text>
                  </View>
                  <View style={[styles.pillIconCircle, { backgroundColor: isDark ? '#334155' : '#E8E3F2' }]}>
                    <MaterialCommunityIcons name="pill" size={20} color={theme.primary} />
                  </View>
                </View>
              </Card>
            </View>

            {/* Action Buttons */}
            <View style={[styles.row, {marginTop: Spacing.sm, marginBottom: Spacing.xl, gap: Spacing.md}]}>
              <TouchableOpacity 
                style={[styles.actionBtn, {backgroundColor: '#EF4444'}]}
                onPress={() => router.push('/add/sugar')}
              >
                <MaterialCommunityIcons name="water" size={20} color="#FFF" />
                <Text variant="bodyLarge" style={styles.actionBtnText}>{t('addSugar', 'Add Sugar')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionBtn, {backgroundColor: '#0EADF1'}]}
                onPress={() => router.push('/add/bp')}
              >
                <MaterialCommunityIcons name="heart-pulse" size={20} color="#FFF" />
                <Text variant="bodyLarge" style={styles.actionBtnText}>{t('addBP', 'Add BP')}</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Links */}
            <View style={styles.quickLinksRow}>
              <TouchableOpacity style={styles.quickLinkItem} onPress={() => router.push('/medicines')}>
                <View style={[styles.quickLinkCircle, {backgroundColor: isDark ? '#064E3B' : '#E6F4EA', borderWidth: 1, borderColor: isDark ? '#059669' : '#A7F3D0'}]}>
                  <MaterialCommunityIcons name="pill" size={28} color={isDark ? '#34D399' : '#10B981'} />
                </View>
                <Text variant="caption" style={[styles.quickLinkText, { color: theme.textSecondary }]}>{t('myMedicines', 'Medicines')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickLinkItem} onPress={() => router.push('/ai/insights')}>
                <View style={[styles.quickLinkCircle, {backgroundColor: isDark ? '#1E1B4B' : '#E8E3F2', borderWidth: 1, borderColor: isDark ? '#6366F1' : '#C7D2FE'}]}>
                  <MaterialCommunityIcons name="robot-outline" size={28} color={isDark ? '#818CF8' : '#4F46E5'} />
                </View>
                <Text variant="caption" style={[styles.quickLinkText, { color: theme.textSecondary }]}>{t('ai', 'AI Assistant')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickLinkItem} onPress={() => router.push('/reports')}>
                <View style={[styles.quickLinkCircle, {backgroundColor: isDark ? '#082F49' : '#E5FAFA', borderWidth: 1, borderColor: isDark ? '#0284C7' : '#BAE6FD'}]}>
                  <MaterialCommunityIcons name="clipboard-text-outline" size={28} color={isDark ? '#38BDF8' : '#05C2C4'} />
                </View>
                <Text variant="caption" style={[styles.quickLinkText, { color: theme.textSecondary }]}>{t('reports', 'Reports')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickLinkItem} onPress={() => router.push('/(tabs)/settings')}>
                <View style={[styles.quickLinkCircle, {backgroundColor: isDark ? '#431407' : '#FFF0E6', borderWidth: 1, borderColor: isDark ? '#EA580C' : '#FED7AA'}]}>
                  <MaterialCommunityIcons name="dots-grid" size={28} color={isDark ? '#FB923C' : '#EA580C'} />
                </View>
                <Text variant="caption" style={[styles.quickLinkText, { color: theme.textSecondary }]}>{t('more', 'More')}</Text>
              </TouchableOpacity>
            </View>

            {/* Upcoming Medicine Card */}
            {upcomingMedicine && (
              <Card style={{backgroundColor: isDark ? '#1E293B' : '#F0F9FF', borderColor: isDark ? '#38BDF8' : '#BAE6FD', borderWidth: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                    <View style={[styles.pillIconCircle, {backgroundColor: upcomingMedicine.color + '20', marginRight: 12}]}>
                      <MaterialCommunityIcons name={upcomingMedicine.iconType as any} size={24} color={upcomingMedicine.color} />
                    </View>
                    <View style={{flex: 1, paddingRight: 8}}>
                      <Text style={{fontSize: 12, color: theme.primary, fontWeight: '700', marginBottom: 2}}>{t('upcomingMedicineHeader', 'UPCOMING MEDICINE')}</Text>
                      <Text style={{fontSize: 18, color: theme.text, fontWeight: 'bold'}} numberOfLines={1} adjustsFontSizeToFit>{upcomingMedicine.name}</Text>
                      <Text style={{fontSize: 13, color: theme.textSecondary}}>{upcomingMedicine.dose} • {upcomingMedicine.time}</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={{backgroundColor: '#10B981', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => toggleMedicineTaken(upcomingMedicine.id, todayStr)}
                  >
                    <Feather name="check" size={16} color="#FFF" style={{marginRight: 4}} />
                    <Text style={{color: '#FFF', fontWeight: '700', fontSize: 14}}>{t('take', 'Take')}</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            )}

          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 240 : 220,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  safeAreaWrapper: {
    flex: 1,
  },
  innerContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'android' ? Spacing.xl : Spacing.md,
  },
  
  // Header
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: Spacing.xl 
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8E3F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28
  },
  headerText: { justifyContent: 'center' },
  headerRight: { flexDirection: 'row' },
  iconButton: { padding: 4, position: 'relative' },
  redDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#0E748A'
  },

  // Cards with Gap
  row: { 
    flexDirection: 'row', 
    marginBottom: Spacing.md, 
    alignItems: 'stretch' 
  },
  halfCard: { 
    width: '48%', 
    padding: Spacing.lg, 
    borderRadius: 20 
  },
  thirdCard: { 
    width: '28%', 
    padding: Spacing.md, 
    borderRadius: 20 
  },
  fortyCard: {
    width: '40%',
    padding: Spacing.md,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  flexCard: { 
    flex: 1, 
    padding: Spacing.lg, 
    borderRadius: 20 
  },
  
  metricBig: { fontSize: 32, fontWeight: '800', color: '#111827', marginVertical: Spacing.xs, lineHeight: 38 },
  metricMedium: { fontSize: 24, fontWeight: '800', color: '#111827', marginVertical: 4, lineHeight: 30 },

  pillIconCircle: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#E8E3F2', 
    justifyContent: 'center', alignItems: 'center'
  },

  // Action Row
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  actionBtnText: { color: '#FFFFFF', fontWeight: '700', marginLeft: 8 },

  // Quick Links
  quickLinksRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xl, paddingHorizontal: Spacing.sm },
  quickLinkItem: { alignItems: 'center' },
  quickLinkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs
  },
  quickLinkText: { fontWeight: '500', color: '#4A6583' },

  // Next Medicine
  nextMedicineCard: { padding: Spacing.lg, borderRadius: 20, marginBottom: Spacing.lg },
  timeBadge: {
    backgroundColor: '#E5FAFA',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: Spacing.sm
  },
  markTakenBtn: {
    backgroundColor: '#0EADF1',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: 8
  }
});
