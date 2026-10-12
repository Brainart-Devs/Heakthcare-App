import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Button, Header, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';

export default function AddBPScreen() {
  const { addHistoryRecord } = useUser();
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('Morning');
  
  const [systolic, setSystolic] = useState('136');
  const [diastolic, setDiastolic] = useState('82');
  const [pulse, setPulse] = useState('76');
  
  const [date, setDate] = useState('01 Oct 2024');
  const [time, setTime] = useState('08:00 AM');
  
  const [symptoms, setSymptoms] = useState<string[]>(['No Symptoms']);
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());
  
  const handleSave = () => {
    setLoading(true);
    
    // Evaluate BP logic (simple heuristic for prototype)
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);
    let label = 'Normal';
    if (sys > 140 || dia > 90) label = 'High';
    else if (sys < 90 || dia < 60) label = 'Low';
    else if (sys > 120 && sys <= 140) label = 'Good';

    setTimeout(() => {
      addHistoryRecord({
        type: 'BP',
        date,
        time,
        value: `${systolic}/${diastolic}`,
        label,
        pulse,
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
  const symptomOptions = ['Headache', 'Dizziness', 'No Symptoms', 'Others'];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Blood Pressure" onBack={() => router.back()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          
          {/* Period Selector */}
          <View style={styles.periodRow}>
            {periods.map(p => {
              const isActive = period === p;
              return (
                <TouchableOpacity 
                  key={p} 
                  style={[styles.periodBtn, isActive && styles.periodBtnActive]}
                  onPress={() => setPeriod(p)}
                >
                  <Text variant="body" style={[styles.periodText, isActive && styles.periodTextActive]}>{p}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Blood Pressure Inputs */}
          <View style={styles.row}>
            <View style={styles.halfCol}>
              <Text variant="body" color="#4A6583" style={styles.label}>Systolic (mmHg)</Text>
              <TextInput 
                style={styles.inputBox}
                value={systolic}
                onChangeText={setSystolic}
                keyboardType="numeric"
                placeholderTextColor="#A0AAB5"
              />
            </View>
            <View style={styles.halfCol}>
              <Text variant="body" color="#4A6583" style={styles.label}>Diastolic (mmHg)</Text>
              <TextInput 
                style={styles.inputBox}
                value={diastolic}
                onChangeText={setDiastolic}
                keyboardType="numeric"
                placeholderTextColor="#A0AAB5"
              />
            </View>
          </View>

          <View style={{ marginBottom: Spacing.xl }}>
            <Text variant="body" color="#4A6583" style={styles.label}>Pulse (bpm)</Text>
            <TextInput 
              style={styles.inputBox}
              value={pulse}
              onChangeText={setPulse}
              keyboardType="numeric"
              placeholderTextColor="#A0AAB5"
            />
          </View>

          {/* Date and Time */}
          <View style={[styles.row, { marginBottom: Spacing.xl }]}>
            <TouchableOpacity style={styles.dateTimeBtn} onPress={() => setShowDatePicker(true)}>
              <Feather name="calendar" size={18} color="#4A6583" style={{ marginRight: 8 }} />
              <Text variant="body" color="#111827" style={{ fontWeight: '500' }}>{date}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateTimeBtn} onPress={() => setShowTimePicker(true)}>
              <Feather name="clock" size={18} color="#4A6583" style={{ marginRight: 8 }} />
              <Text variant="body" color="#111827" style={{ fontWeight: '500' }}>{time}</Text>
            </TouchableOpacity>
          </View>

          {/* Symptoms */}
          <View style={{ marginBottom: Spacing.xl }}>
            <Text variant="body" color="#4A6583" style={styles.label}>Symptoms (optional)</Text>
            <View style={styles.symptomsWrapper}>
              {symptomOptions.map(sym => {
                const isActive = symptoms.includes(sym);
                return (
                  <TouchableOpacity 
                    key={sym} 
                    style={[styles.symptomBtn, isActive && styles.symptomBtnActive]}
                    onPress={() => toggleSymptom(sym)}
                  >
                    <Text variant="body" style={[styles.symptomText, isActive && styles.symptomTextActive]}>{sym}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Notes */}
          <View style={{ marginBottom: Spacing.xxl }}>
            <Text variant="body" color="#4A6583" style={styles.label}>Notes (optional)</Text>
            <TextInput 
              style={[styles.inputBox, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="e.g. feeling better today"
              placeholderTextColor="#A0AAB5"
              multiline
              textAlignVertical="top"
            />
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
                  current={dateObj ? `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}` : undefined}
                  markedDates={dateObj ? {
                    [`${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`]: { selected: true, selectedColor: '#0EADF1', textColor: '#ffffff' }
                  } : {}}
                  onDayPress={(day: any) => {
                    const selectedDate = new Date(day.year, day.month - 1, day.day);
                    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
                    setDate(selectedDate.toLocaleDateString('en-GB', options)); 
                    setDateObj(selectedDate);
                    setShowDatePicker(false);
                  }}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#0EADF1',
                    selectedDayTextColor: '#ffffff',
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

          {showTimePicker && Platform.OS === 'ios' ? (
            <Modal transparent animationType="fade" visible={showTimePicker}>
              <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: '#fff', paddingBottom: 40, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                      <Text variant="bodyLarge" style={{ color: '#0EADF1', fontWeight: 'bold' }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={dateObj}
                    mode="time"
                    display="spinner"
                    textColor="#000000"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setDateObj(selectedDate);
                        const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
                        setTime(selectedDate.toLocaleTimeString('en-US', options));
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
                }
              }}
            />
          )}

          {/* Save Button */}
          <Button 
            title="Save Reading" 
            onPress={handleSave} 
            loading={loading} 
            style={{ marginBottom: 40 }}
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
    backgroundColor: '#0EADF1',
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
  halfCol: { flex: 1 },
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
    backgroundColor: '#0EADF1'
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
