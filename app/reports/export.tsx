import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Header, Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CheckboxRow = ({ label, isChecked, onPress }: { label: string, isChecked: boolean, onPress: () => void }) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
        {isChecked && <Feather name="check" size={14} color="#FFF" />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

export default function ReportExport() {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('PDF');
  const [showCalendar, setShowCalendar] = useState<'from' | 'to' | null>(null);
  const [fromDate, setFromDate] = useState('2024-09-01');
  const [toDate, setToDate] = useState('2024-09-30');

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
      router.back();
    }, 1500);
  };

  const toggleInclude = (key: keyof typeof includes) => {
    setIncludes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Share / Export Report" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Select Date Range</Text>
        <Card style={styles.dateCard}>
          <TouchableOpacity style={styles.dateSide} onPress={() => setShowCalendar('from')}>
            <Feather name="calendar" size={24} color="#6B7280" style={{marginRight: 12}} />
            <View>
              <Text style={styles.dateLabel}>From</Text>
              <Text style={styles.dateValue}>{formatDisplayDate(fromDate)}</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.dateDivider} />
          
          <TouchableOpacity style={styles.dateSide} onPress={() => setShowCalendar('to')}>
            <Feather name="calendar" size={24} color="#6B7280" style={{marginRight: 12}} />
            <View>
              <Text style={styles.dateLabel}>To</Text>
              <Text style={styles.dateValue}>{formatDisplayDate(toDate)}</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {!!showCalendar && (
          <Modal transparent animationType="fade" visible={!!showCalendar}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12, backgroundColor: '#f8f9fa' }}>
                  <TouchableOpacity onPress={() => setShowCalendar(null)}>
                    <Text style={{ color: '#0EADF1', fontWeight: 'bold' }}>Close</Text>
                  </TouchableOpacity>
                </View>
                <Calendar
                  current={showCalendar === 'from' ? fromDate : toDate}
                  markedDates={{
                    [showCalendar === 'from' ? fromDate : toDate]: { selected: true, selectedColor: '#0EADF1' }
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
                    todayTextColor: '#0EADF1',
                    arrowColor: '#0EADF1',
                    textMonthFontWeight: 'bold',
                  }}
                />
              </View>
            </View>
          </Modal>
        )}

        <Text style={styles.sectionTitle}>Include in Report</Text>
        <Card style={styles.includeCard}>
          <CheckboxRow label="Sugar Readings" isChecked={includes.sugar} onPress={() => toggleInclude('sugar')} />
          <CheckboxRow label="Blood Pressure" isChecked={includes.bp} onPress={() => toggleInclude('bp')} />
          <CheckboxRow label="Pulse" isChecked={includes.pulse} onPress={() => toggleInclude('pulse')} />
          <CheckboxRow label="Weight" isChecked={includes.weight} onPress={() => toggleInclude('weight')} />
          <CheckboxRow label="Medicine Adherence" isChecked={includes.medicine} onPress={() => toggleInclude('medicine')} />
          <CheckboxRow label="Symptoms & Notes" isChecked={includes.symptoms} onPress={() => toggleInclude('symptoms')} />
        </Card>

        <Text style={styles.sectionTitle}>Export Format</Text>
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
        
        <Text style={styles.footerText}>
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
