import React, { useState, useMemo } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, Header, Card, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { HistoryRecord } from '@/context/UserContext';
import { Calendar } from 'react-native-calendars';

export default function HistoryScreen() {
  const { history } = useUser();
  const [filterPeriod, setFilterPeriod] = useState<string>('All');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDateStr, setStartDateStr] = useState<string>('');
  const [endDateStr, setEndDateStr] = useState<string>('');

  const periods = ['All', 'Morning', 'Afternoon', 'Evening', 'Night'];

  const clearDateFilter = () => {
    setStartDateStr('');
    setEndDateStr('');
  };

  const getFilterDateText = () => {
    if (!startDateStr) return 'All Dates';
    const startObj = new Date(startDateStr);
    const startFmt = startObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    if (!endDateStr || startDateStr === endDateStr) return startFmt;
    
    const endObj = new Date(endDateStr);
    const endFmt = endObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `${startFmt} - ${endFmt}`;
  };

  const filteredHistory = useMemo(() => {
    return history.filter(record => {
      const matchPeriod = filterPeriod === 'All' || record.period === filterPeriod;
      
      let matchDate = true;
      if (startDateStr) {
        const recordDateObj = new Date(record.date);
        const recordTime = recordDateObj.getTime();
        
        // Ensure accurate comparison by resetting time portion
        const startObj = new Date(startDateStr);
        // Date strings from calendar are YYYY-MM-DD, creating them in local timezone:
        // Wait, new Date("YYYY-MM-DD") creates UTC midnight. 
        // Let's compare just the YYYY-MM-DD string!
        const recordDateString = `${recordDateObj.getFullYear()}-${('0'+(recordDateObj.getMonth()+1)).slice(-2)}-${('0'+recordDateObj.getDate()).slice(-2)}`;
        
        if (endDateStr) {
          matchDate = recordDateString >= startDateStr && recordDateString <= endDateStr;
        } else {
          matchDate = recordDateString === startDateStr;
        }
      }
      
      return matchPeriod && matchDate;
    });
  }, [history, filterPeriod, startDateStr, endDateStr]);

  const markedDates = useMemo(() => {
    const marks: any = {};
    if (startDateStr) {
      marks[startDateStr] = { startingDay: true, color: '#0EADF1', textColor: 'white' };
      if (!endDateStr || startDateStr === endDateStr) {
        marks[startDateStr].endingDay = true;
      }
    }
    if (startDateStr && endDateStr && startDateStr !== endDateStr) {
      marks[endDateStr] = { endingDay: true, color: '#0EADF1', textColor: 'white' };
      
      let curr = new Date(startDateStr);
      curr.setDate(curr.getDate() + 1);
      const end = new Date(endDateStr);
      
      while (curr < end) {
        const dStr = curr.toISOString().split('T')[0];
        marks[dStr] = { color: '#E5F6FD', textColor: '#4A6583' };
        curr.setDate(curr.getDate() + 1);
      }
    }
    return marks;
  }, [startDateStr, endDateStr]);

  const onDayPress = (day: any) => {
    const selectedDateStr = day.dateString;
    if (!startDateStr || (startDateStr && endDateStr)) {
      setStartDateStr(selectedDateStr);
      setEndDateStr('');
    } else if (startDateStr && !endDateStr) {
      if (selectedDateStr < startDateStr) {
        setEndDateStr(startDateStr);
        setStartDateStr(selectedDateStr);
      } else {
        setEndDateStr(selectedDateStr);
      }
      setTimeout(() => setShowDatePicker(false), 400);
    }
  };

  const groupedHistory = filteredHistory.reduce((acc, record) => {
    if (!acc[record.date]) acc[record.date] = [];
    acc[record.date].push(record);
    return acc;
  }, {} as Record<string, HistoryRecord[]>);

  const uniqueDates = Array.from(new Set(filteredHistory.map(r => r.date)));

  return (
    <SafeAreaView style={styles.container}>
      <Header title="History" onBack={() => router.push('/')} />
      
      <View style={styles.filtersContainer}>
        <View style={styles.dateFilterRow}>
          <TouchableOpacity 
            style={styles.dateBtn} 
            onPress={() => setShowDatePicker(true)}
          >
            <Feather name="calendar" size={16} color="#0EADF1" style={{ marginRight: 6 }} />
            <Text variant="body" style={{ color: '#0EADF1', fontWeight: '600' }}>
              {getFilterDateText()}
            </Text>
          </TouchableOpacity>
          
          {startDateStr !== '' && (
            <TouchableOpacity onPress={clearDateFilter} style={styles.clearBtn}>
              <Feather name="x-circle" size={18} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>

        {showDatePicker && (
          <Modal transparent animationType="fade" visible={showDatePicker}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12, backgroundColor: '#f8f9fa' }}>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Text variant="bodyLarge" style={{ color: '#0EADF1', fontWeight: 'bold' }}>Close</Text>
                  </TouchableOpacity>
                </View>
                <Calendar
                  markingType={'period'}
                  current={startDateStr || undefined}
                  markedDates={markedDates}
                  onDayPress={onDayPress}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    todayTextColor: '#0EADF1',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    arrowColor: '#0EADF1',
                    monthTextColor: '#16449C',
                    indicatorColor: '#0EADF1',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '500'
                  }}
                />
              </View>
            </View>
          </Modal>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
          {periods.map(p => {
            const isActive = filterPeriod === p;
            return (
              <TouchableOpacity 
                key={p}
                onPress={() => setFilterPeriod(p)}
                style={[styles.pillBtn, isActive && styles.pillBtnActive]}
              >
                <Text variant="caption" style={[styles.pillText, isActive && styles.pillTextActive]}>
                  {p}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredHistory.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={64} color="#D1D5DB" />
            <Text variant="bodyLarge" color="#8E8E93" style={{ marginTop: Spacing.md }}>No matching readings</Text>
          </View>
        ) : (
          uniqueDates.map(date => (
            <View key={date} style={{ marginBottom: Spacing.xl }}>
              <Text variant="h3" color="#111827" style={{ marginBottom: Spacing.md, marginLeft: Spacing.xs }}>
                {date}
              </Text>
              
              {groupedHistory[date].map(record => (
                <TouchableOpacity key={record.id} onPress={() => router.push(`/history/${record.id}` as any)}>
                  <Card style={styles.card}>
                    <View style={styles.row}>
                      <View style={{ flex: 1 }}>
                        <Text variant="bodyLarge" style={{ fontWeight: '600', color: '#111827' }}>
                          {record.type === 'Sugar' ? 'Sugar Reading' : 'Blood Pressure'}
                        </Text>
                        <Text variant="caption" color="#8E8E93" style={{ marginTop: 2 }}>
                          {record.time} • {record.period}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text variant="h3" color="#111827">
                          {record.value}{' '}
                          {record.type === 'Sugar' && <Text variant="caption">mg/dL</Text>}
                        </Text>
                        <View style={{ marginTop: 4 }}>
                          <Badge 
                            label={record.label} 
                            status={record.label === 'Normal' || record.label === 'Good' ? 'success' : 'danger'} 
                          />
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 100 },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
    zIndex: 10 
  },
  dateFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5FAFA',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: 8
  },
  clearBtn: {
    padding: Spacing.sm,
    marginLeft: Spacing.xs
  },
  periodScroll: {
    flexDirection: 'row'
  },
  pillBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F4F4F6',
    marginRight: 8
  },
  pillBtnActive: {
    backgroundColor: '#16449C'
  },
  pillText: {
    color: '#8E8E93',
    fontWeight: '600'
  },
  pillTextActive: {
    color: '#FFFFFF'
  },
  card: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' }
});
