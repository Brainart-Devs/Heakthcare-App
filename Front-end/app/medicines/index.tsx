import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Header } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useUser, Medicine } from '@/context/UserContext';
import { Calendar } from 'react-native-calendars';
import { Modal } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function MedicinesList() {
  const { medicines, toggleMedicineTaken } = useUser();
  const { theme, isDark } = useTheme();

  const isMedicineMissed = (medTimeStr: string, currentSelectedDate: Date) => {
    const now = new Date();
    const selectedStart = new Date(currentSelectedDate.getFullYear(), currentSelectedDate.getMonth(), currentSelectedDate.getDate());
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (selectedStart.getTime() < todayStart.getTime()) return true;
    if (selectedStart.getTime() > todayStart.getTime()) return false;

    const match = medTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return false;
    
    let hours = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    const medDate = new Date(todayStart);
    medDate.setHours(hours, mins, 0, 0);
    
    return now.getTime() > medDate.getTime();
  };
  const [activeTab, setActiveTab] = useState('Today');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const tabs = ['Today', 'All Medicines', 'Schedule'];

  const goBackDate = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const goForwardDate = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const dateStr = currentDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }); // e.g. "Tue, 01 Oct 2024"

  const recordDateStr = currentDate.toISOString().split('T')[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color={theme.text} />
          <Text variant="h2" style={[styles.headerTitle, { color: theme.text }]}>My Medicines</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/add/medicine' as any)}>
          <Feather name="plus" size={18} color="#fff" style={{marginRight: 4}} />
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity 
            key={tab} 
            style={[
              styles.tab, 
              { backgroundColor: isDark ? '#334155' : '#F4F4F6' },
              activeTab === tab && styles.tabActive
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText, 
              { color: isDark ? '#94A3B8' : '#8E8E93' },
              activeTab === tab && styles.tabTextActive
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.dateNavigator}>
        <TouchableOpacity onPress={goBackDate} style={[styles.dateArrow, { backgroundColor: isDark ? '#1E293B' : '#F8F9FA' }]}>
          <Feather name="chevron-left" size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={[styles.dateText, { color: theme.text }]}>{dateStr}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goForwardDate} style={[styles.dateArrow, { backgroundColor: isDark ? '#1E293B' : '#F8F9FA' }]}>
          <Feather name="chevron-right" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <Modal transparent animationType="fade" visible={showDatePicker}>
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 }}>
            <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: theme.border }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12, backgroundColor: isDark ? '#1E293B' : '#f8f9fa' }}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
              </View>
              <Calendar
                current={recordDateStr}
                markedDates={{ [recordDateStr]: { selected: true, selectedColor: theme.primary } }}
                onDayPress={(day: any) => {
                  const [y, m, d] = day.dateString.split('-').map(Number);
                  const selectedDate = new Date(y, m - 1, d);
                  setCurrentDate(selectedDate);
                  setShowDatePicker(false);
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
      <ScrollView contentContainerStyle={styles.listContent}>
        {medicines.map((med: Medicine) => {
          const isTaken = !!med.takenStatus[recordDateStr];
          const isMissed = !isTaken && isMedicineMissed(med.time, currentDate);
          
          const btnStyle = isTaken 
            ? styles.actionBtnTaken 
            : (isMissed ? styles.actionBtnMissed : [styles.actionBtnMark, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF', borderColor: theme.border }]);
          const txtStyle = isTaken 
            ? styles.actionTextTaken 
            : (isMissed ? styles.actionTextMissed : [styles.actionTextMark, { color: theme.text }]);
          const btnText = isTaken ? 'Taken' : (isMissed ? 'Missed' : 'Mark');

          return (
            <View key={med.id} style={[styles.medCard, { borderBottomColor: theme.border }]}>
              <View style={[styles.iconBox, { backgroundColor: med.color + '20' }]}>
                <MaterialCommunityIcons name={med.iconType as any} size={24} color={med.color} />
              </View>

              <View style={styles.medInfo}>
                <Text style={[styles.medName, { color: theme.text }]}>{med.name}</Text>
                <Text style={[styles.medDetail, { color: theme.textSecondary }]}>{med.dose}</Text>
                <Text style={[styles.medDetail, { color: theme.textSecondary }]}>{med.timing}</Text>
                <Text style={[styles.medTime, { color: theme.primary }]}>{med.time}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.actionBtn, btnStyle]}
                onPress={() => toggleMedicineTaken(med.id, recordDateStr)}
              >
                {isTaken && <Feather name="check" size={14} color="#fff" style={{marginRight: 4}} />}
                {!isTaken && isMissed && <Feather name="alert-circle" size={14} color="#EF4444" style={{marginRight: 4}} />}
                <Text style={[styles.actionText, txtStyle]}>
                  {btnText}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 8,
    fontWeight: '700',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0EADF1', // or whatever blue matches the mockup (mockup has bright blue)
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: Spacing.sm,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F4F4F6',
  },
  tabActive: {
    backgroundColor: '#0EADF1',
  },
  tabText: {
    color: '#8E8E93',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  dateNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
  },
  dateArrow: {
    padding: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
  },
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  medDetail: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  medTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A6583',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionBtnMark: {
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  actionBtnMissed: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  actionTextMissed: {
    color: '#EF4444',
  },
  actionBtnTaken: {
    borderColor: '#10B981',
    backgroundColor: '#10B981',
  },
  actionText: {
    fontWeight: '600',
  },
  actionTextMark: {
    color: '#4A6583',
  },
  actionTextTaken: {
    color: '#FFFFFF',
  }
});
