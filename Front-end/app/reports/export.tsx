import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert, Modal } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '@/context/ThemeContext';

const CheckboxRow = ({ label, isChecked, onPress, textColor, borderColor }: { label: string, isChecked: boolean, onPress: () => void, textColor?: string, borderColor?: string }) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, borderColor ? { borderColor } : null, isChecked && styles.checkboxActive]}>
        {isChecked && <Feather name="check" size={14} color="#FFF" />}
      </View>
      <Text style={[styles.checkboxLabel, textColor ? { color: textColor } : null]}>{label}</Text>
    </TouchableOpacity>
  );

export default function ReportExport() {
  const { theme, isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('PDF');
  const [showCalendar, setShowCalendar] = useState<'from' | 'to' | null>(null);

  const getInitialDates = () => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 30);
    const fmt = (d: Date) => `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
    return { from: fmt(past), to: fmt(today) };
  };

  const [fromDate, setFromDate] = useState(() => getInitialDates().from);
  const [toDate, setToDate] = useState(() => getInitialDates().to);

  const formatDisplayDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch(e) {
      return dateString;
    }
  };
  const [includes, setIncludes] = useState({
    sugar: true,
    bp: true,
    pulse: true,
    weight: true,
    medicine: true,
    symptoms: true,
  });

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Report Generated',
        `Your health report (${format}) for ${formatDisplayDate(fromDate)} to ${formatDisplayDate(toDate)} has been generated and is ready to share.`,
        [
          { text: 'Done', onPress: () => router.back() }
        ]
      );
    }, 1200);
  };

  const toggleInclude = (key: keyof typeof includes) => {
    setIncludes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Share / Export Report" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Select Date Range</Text>
        <Card style={[styles.dateCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
          <TouchableOpacity style={styles.dateSide} onPress={() => setShowCalendar('from')}>
            <Feather name="calendar" size={24} color={theme.primary} style={{marginRight: 12}} />
            <View>
              <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>From</Text>
              <Text style={[styles.dateValue, { color: theme.text }]}>{formatDisplayDate(fromDate)}</Text>
            </View>
          </TouchableOpacity>
          
          <View style={[styles.dateDivider, { backgroundColor: theme.border }]} />
          
          <TouchableOpacity style={styles.dateSide} onPress={() => setShowCalendar('to')}>
            <Feather name="calendar" size={24} color={theme.primary} style={{marginRight: 12}} />
            <View>
              <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>To</Text>
              <Text style={[styles.dateValue, { color: theme.text }]}>{formatDisplayDate(toDate)}</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {!!showCalendar && (
          <Modal transparent animationType="fade" visible={!!showCalendar}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 }}>
              <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: theme.border }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12, backgroundColor: isDark ? '#1E293B' : '#f8f9fa' }}>
                  <TouchableOpacity onPress={() => setShowCalendar(null)}>
                    <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Close</Text>
                  </TouchableOpacity>
                </View>
                <Calendar
                  current={showCalendar === 'from' ? fromDate : toDate}
                  markedDates={{
                    [showCalendar === 'from' ? fromDate : toDate]: { selected: true, selectedColor: theme.primary }
                  }}
                  onDayPress={(day: any) => {
                    if (showCalendar === 'from') {
                      setFromDate(day.dateString);
                    } else {
                      setToDate(day.dateString);
                    }
                    setShowCalendar(null);
                  }}
                  theme={{
                    backgroundColor: theme.card,
                    calendarBackground: theme.card,
                    textSectionTitleColor: theme.textSecondary,
                    todayTextColor: theme.primary,
                    dayTextColor: theme.text,
                    textDisabledColor: isDark ? '#475569' : '#d9e1e8',
                    arrowColor: theme.primary,
                    monthTextColor: theme.primary,
                    indicatorColor: theme.primary,
                    textMonthFontWeight: 'bold',
                  }}
                />
              </View>
            </View>
          </Modal>
        )}

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Include in Report</Text>
        <Card style={[styles.includeCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
          <CheckboxRow label="Sugar Readings" isChecked={includes.sugar} onPress={() => toggleInclude('sugar')} textColor={theme.text} borderColor={theme.border} />
          <CheckboxRow label="Blood Pressure" isChecked={includes.bp} onPress={() => toggleInclude('bp')} textColor={theme.text} borderColor={theme.border} />
          <CheckboxRow label="Pulse" isChecked={includes.pulse} onPress={() => toggleInclude('pulse')} textColor={theme.text} borderColor={theme.border} />
          <CheckboxRow label="Weight" isChecked={includes.weight} onPress={() => toggleInclude('weight')} textColor={theme.text} borderColor={theme.border} />
          <CheckboxRow label="Medicine Adherence" isChecked={includes.medicine} onPress={() => toggleInclude('medicine')} textColor={theme.text} borderColor={theme.border} />
          <CheckboxRow label="Symptoms & Notes" isChecked={includes.symptoms} onPress={() => toggleInclude('symptoms')} textColor={theme.text} borderColor={theme.border} />
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Export Format</Text>
        <View style={styles.formatRow}>
          <TouchableOpacity 
            style={[styles.formatBtn, { backgroundColor: '#FF4B4B', opacity: format === 'PDF' ? 1 : 0.4 }]} 
            onPress={() => setFormat('PDF')}
          >
            <MaterialCommunityIcons name="file-pdf-box" size={20} color="#FFF" style={{marginRight: 8}} />
            <Text style={styles.formatBtnText}>PDF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.formatBtn, { backgroundColor: '#059669', opacity: format === 'Excel' ? 1 : 0.4 }]} 
            onPress={() => setFormat('Excel')}
          >
            <MaterialCommunityIcons name="file-excel-box" size={20} color="#FFF" style={{marginRight: 8}} />
            <Text style={styles.formatBtnText}>Excel</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.generateBtn} onPress={handleExport}>
          <Text style={styles.generateBtnText}>
            {loading ? 'Generating...' : 'Generate Report'}
          </Text>
          {!loading && <Feather name="share" size={20} color="#FFF" style={{position: 'absolute', right: 20}} />}
        </TouchableOpacity>
        
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          You can share this report with your doctor{'\n'}or family members.
        </Text>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: Spacing.md,
    marginTop: Spacing.sm
  },
  
  // Date Range Card
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#FFFFFF',
    marginBottom: Spacing.xl,
    borderRadius: 12,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  dateSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  dateDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#F0F0F3',
  },
  dateLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2
  },
  dateValue: {
    fontSize: 15,
    color: '#4A6583',
    fontWeight: '600'
  },
  
  // Includes Card
  includeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xl,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0EADF1',
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#0EADF1',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#4A6583'
  },
  
  // Format Buttons
  formatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  formatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  formatBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16
  },
  
  // Generate Button
  generateBtn: {
    backgroundColor: '#007AFF', // Deep iOS-like blue from mockup
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: Spacing.lg
  },
  generateBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16
  },
  footerText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 20
  }
});
