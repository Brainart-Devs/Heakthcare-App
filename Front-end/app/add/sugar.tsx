import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Button, Header, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

export default function AddSugarScreen() {
  const { addHistoryRecord } = useUser();
  const { theme, isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const getTimePeriod = (d: Date = new Date()): string => {
    const hours = d.getHours();
    if (hours >= 5 && hours < 12) return 'Morning';
    if (hours >= 12 && hours < 17) return 'Afternoon';
    if (hours >= 17 && hours < 21) return 'Evening';
    return 'Night';
  };

  const getInitialDate = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const getInitialTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const [dateObj, setDateObj] = useState(() => new Date());
  const [date, setDate] = useState(getInitialDate);
  const [time, setTime] = useState(getInitialTime);
  const [period, setPeriod] = useState<string>(() => getTimePeriod(new Date()));
  
  const [value, setValue] = useState('128');
  
  const [symptoms, setSymptoms] = useState<string[]>(['No Symptoms']);
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    
    const v = parseInt(value);
    let label = 'Normal';
    if (period === 'Morning') {
      if (v > 125) label = 'High';
      else if (v < 70) label = 'Low';
    } else {
      if (v > 200) label = 'High';
      else if (v < 70) label = 'Low';
    }

    setTimeout(() => {
      addHistoryRecord({
        type: 'Sugar',
        date,
        time,
        value: value,
        label,
        symptoms,
        period,
        notes
      });
      setLoading(false);
      router.back();
    }, 500);
  };

  const toggleSymptom = (symptom: string) => {
    if (symptom === 'No Symptoms') {
      setSymptoms(['No Symptoms']);
      return;
    }
    
    let newSymptoms = symptoms.filter(s => s !== 'No Symptoms');
    if (newSymptoms.includes(symptom)) {
      newSymptoms = newSymptoms.filter(s => s !== symptom);
    } else {
      newSymptoms.push(symptom);
    }
    
    if (newSymptoms.length === 0) {
      newSymptoms = ['No Symptoms'];
    }
    setSymptoms(newSymptoms);
  };

  const periods = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const symptomOptions = ['Dizziness', 'Sweating', 'Thirsty', 'No Symptoms', 'Others'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Add Sugar Reading" onBack={() => router.back()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          
          {/* Period Selector */}
          <View style={styles.periodRow}>
            {periods.map(p => {
              const isActive = period === p;
              return (
                <TouchableOpacity 
                  key={p} 
                  style={[
                    styles.periodBtn, 
                    { backgroundColor: isDark ? '#334155' : '#F4F4F6' },
                    isActive && styles.periodBtnActive
                  ]}
                  onPress={() => setPeriod(p)}
                >
                  <Text variant="body" style={[
                    styles.periodText, 
                    { color: isDark ? '#94A3B8' : '#8E8E93' },
                    isActive && styles.periodTextActive
                  ]}>{p}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Value Input */}
          <View style={{ marginBottom: Spacing.xl }}>
            <Text variant="body" color={theme.textSecondary} style={styles.label}>Blood Sugar (mg/dL)</Text>
            <TextInput 
              style={[
                styles.inputBox, 
                { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }
              ]}
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          {/* Date and Time */}
          <View style={[styles.row, { marginBottom: Spacing.xl }]}>
            <TouchableOpacity 
              style={[
                styles.dateTimeBtn, 
                { backgroundColor: theme.card, borderColor: theme.border }
              ]} 
              onPress={() => setShowDatePicker(true)}
            >
              <Feather name="calendar" size={18} color={theme.primary} style={{ marginRight: 8 }} />
              <Text variant="body" color={theme.text} style={{ fontWeight: '500' }}>{date}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.dateTimeBtn, 
                { backgroundColor: theme.card, borderColor: theme.border }
              ]} 
              onPress={() => setShowTimePicker(true)}
            >
              <Feather name="clock" size={18} color={theme.primary} style={{ marginRight: 8 }} />
              <Text variant="body" color={theme.text} style={{ fontWeight: '500' }}>{time}</Text>
            </TouchableOpacity>
          </View>

          {/* Symptoms */}
          <View style={{ marginBottom: Spacing.xl }}>
            <Text variant="body" color={theme.textSecondary} style={styles.label}>Symptoms (optional)</Text>
            <View style={styles.symptomsWrapper}>
              {symptomOptions.map(sym => {
                const isActive = symptoms.includes(sym);
                return (
                  <TouchableOpacity 
                    key={sym} 
                    style={[
                      styles.symptomBtn, 
                      { backgroundColor: isDark ? '#334155' : '#F4F4F6' },
                      isActive && styles.symptomBtnActive
                    ]}
                    onPress={() => toggleSymptom(sym)}
                  >
                    <Text variant="body" style={[
                      styles.symptomText, 
                      { color: isDark ? '#94A3B8' : '#4A6583' },
                      isActive && styles.symptomTextActive
                    ]}>{sym}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Notes */}
          <View style={{ marginBottom: Spacing.xxl }}>
            <Text variant="body" color={theme.textSecondary} style={styles.label}>Notes (optional)</Text>
            <TextInput 
              style={[
                styles.inputBox, 
                styles.textArea,
                { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }
              ]}
              value={notes}
              onChangeText={setNotes}
              placeholder="e.g. feeling better today"
              placeholderTextColor={theme.textSecondary}
              multiline
              textAlignVertical="top"
            />
          </View>

          {showDatePicker && (
            <Modal transparent animationType="fade" visible={showDatePicker}>
              <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 }}>
                <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: theme.border }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12, backgroundColor: isDark ? '#1E293B' : '#f8f9fa' }}>
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text variant="bodyLarge" style={{ color: theme.primary, fontWeight: 'bold' }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                  <Calendar
                  current={dateObj ? `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}` : undefined}
                  markedDates={dateObj ? {
                    [`${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`]: { selected: true, selectedColor: theme.primary, textColor: '#ffffff' }
                  } : {}}
                  onDayPress={(day: any) => {
                    const [y, m, d] = day.dateString.split('-').map(Number);
                    const newDate = new Date(dateObj);
                    newDate.setFullYear(y, m - 1, d);
                    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
                    setDate(newDate.toLocaleDateString('en-GB', options)); 
                    setDateObj(newDate);
                    setShowDatePicker(false);
                  }}
                  theme={{
                    backgroundColor: theme.card,
                    calendarBackground: theme.card,
                    textSectionTitleColor: theme.textSecondary,
                    selectedDayBackgroundColor: theme.primary,
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: theme.primary,
                    dayTextColor: theme.text,
                    textDisabledColor: isDark ? '#475569' : '#d9e1e8',
                    arrowColor: theme.primary,
                    monthTextColor: theme.primary,
                    indicatorColor: theme.primary,
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '500'
                  }}
                />
                </View>
              </View>
            </Modal>
          )}

          {showTimePicker && Platform.OS === 'ios' ? (
            <Modal transparent animationType="fade" visible={showTimePicker}>
              <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: theme.card, paddingBottom: 40, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
                    <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                      <Text variant="bodyLarge" style={{ color: theme.primary, fontWeight: 'bold' }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={dateObj}
                    mode="time"
                    display="spinner"
                    textColor={isDark ? '#FFFFFF' : '#000000'}
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setDateObj(selectedDate);
                        const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
                        setTime(selectedDate.toLocaleTimeString('en-US', options));
                        setPeriod(getTimePeriod(selectedDate));
                      }
                    }}
                  />
                </View>
              </View>
            </Modal>
          ) : showTimePicker && (
            <DateTimePicker
              value={dateObj}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                setShowTimePicker(false);
                if (selectedDate) {
                  setDateObj(selectedDate);
                  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
                  setTime(selectedDate.toLocaleTimeString('en-US', options));
                  setPeriod(getTimePeriod(selectedDate));
                }
              }}
            />
          )}

          {/* Save Button */}
          <Button 
            title="Save Reading" 
            onPress={handleSave} 
            loading={loading} 
            style={{ marginBottom: 40, backgroundColor: '#FF4B4B' }}
          />
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: Spacing.lg },
  
  // Period Row
  periodRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: Spacing.sm,
    marginBottom: Spacing.xl 
  },
  periodBtn: {
    flex: 1,
    backgroundColor: '#F4F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  periodBtnActive: {
    backgroundColor: '#FF4B4B',
  },
  periodText: {
    color: '#8E8E93',
    fontWeight: '500'
  },
  periodTextActive: {
    color: '#FFFFFF',
    fontWeight: '600'
  },

  // Inputs
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: Spacing.md,
    marginBottom: Spacing.lg 
  },
  label: {
    fontWeight: '500',
    marginBottom: Spacing.xs
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    backgroundColor: '#FFFFFF'
  },
  textArea: {
    fontSize: 16,
    fontWeight: '400',
    height: 60,
    paddingVertical: Spacing.md
  },

  // Date / Time Buttons
  dateTimeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF'
  },

  // Symptoms
  symptomsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: Spacing.xs
  },
  symptomBtn: {
    backgroundColor: '#F4F4F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20
  },
  symptomBtnActive: {
    backgroundColor: '#FF4B4B'
  },
  symptomText: {
    color: '#4A6583',
    fontWeight: '500'
  },
  symptomTextActive: {
    color: '#FFFFFF',
    fontWeight: '600'
  }
});
