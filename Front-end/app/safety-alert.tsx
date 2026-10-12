import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SafetyAlert() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="alert" size={64} color="#FF3B30" />
        </View>
        <Text variant="h1" align="center" color="#FFFFFF" style={{marginTop: Spacing.xl}}>Critical Alert</Text>
        <Text variant="bodyLarge" align="center" color="#FFFFFF" style={{marginTop: Spacing.md, marginBottom: Spacing.xxl, opacity: 0.9}}>
          Your last fasting reading was significantly higher than normal. Please contact your doctor immediately.
        </Text>
        <Button title="Call Doctor" variant="secondary" style={{marginBottom: Spacing.md}} />
        <Button title="Call Caregiver" variant="secondary" style={{marginBottom: Spacing.xl}} />
        <Button title="Dismiss" variant="outline" onPress={() => router.back()} style={{borderColor: 'transparent', opacity: 0.8}} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF3B30' },
  content: { flex: 1, justifyContent: 'center', padding: Spacing.xl },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFFFFF', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: {width:0, height:8}, shadowOpacity: 0.2, shadowRadius: 16 }
});
