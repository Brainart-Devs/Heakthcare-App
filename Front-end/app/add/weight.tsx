import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Text, Button, Header, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function AddWeightScreen() {
  const { theme, isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState('');
  
  const getInitialDate = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const getInitialTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const [date, setDate] = useState(getInitialDate);
  const [time, setTime] = useState(getInitialTime);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  
  const handleSave = () => {
    setError('');
    if (!weight) {
      setError('Please enter your weight.');
      return;
    }
    if (isNaN(Number(weight)) || Number(weight) <= 0 || Number(weight) > 300) {
      setError('Please enter a valid numeric value (kg).');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Add Weight" onBack={() => router.back()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>

          <View style={styles.bigInputContainer}>
            <Input 
              placeholder="72.5" 
              keyboardType="numeric" 
              style={{fontSize: 48, textAlign: 'center'}}
              value={weight}
              onChangeText={setWeight}
              error={error}
            />
            <Text variant="bodyLarge" secondary align="center">kg</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md}}>
            <View style={{flex: 1, paddingRight: Spacing.sm}}>
              <Input placeholder="Date" value={date} onChangeText={setDate} />
            </View>
            <View style={{flex: 1, paddingLeft: Spacing.sm}}>
              <Input placeholder="Time" value={time} onChangeText={setTime} />
            </View>
          </View>

          <Input 
            label="Notes (optional)" 
            placeholder="e.g. after breakfast" 
            multiline 
            style={{minHeight: 100}}
            value={notes}
            onChangeText={setNotes}
          />

          <Button title="Save Weight" onPress={handleSave} loading={loading} style={{marginTop: Spacing.xl}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: Spacing.lg },
  bigInputContainer: { alignItems: 'center', marginBottom: Spacing.xl, marginTop: Spacing.md },
});
