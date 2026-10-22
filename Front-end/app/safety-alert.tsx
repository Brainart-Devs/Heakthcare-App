import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, Linking, Vibration, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useUser } from '@/context/UserContext';

export default function SafetyAlert() {
  const { user } = useUser();
  const params = useLocalSearchParams();

  const alertTitle = typeof params.title === 'string' ? params.title : 'Critical Health Alert';
  const alertValue = typeof params.value === 'string' ? params.value : '';
  const alertMessage = typeof params.message === 'string' 
    ? params.message 
    : 'Your recorded reading was critically outside safe medical limits. Please contact your doctor or emergency services immediately.';

  useEffect(() => {
    // Medical warning vibration pattern on mount
    Vibration.vibrate([0, 250, 150, 250]);
  }, []);

  const handleCallDoctor = () => {
    const doctorName = user.doctor || 'Dr. Tariq Mahmood';
    const doctorPhone = '+92 300 1234567';
    Alert.alert(
      'Call Treating Doctor',
      `Would you like to call ${doctorName} at ${doctorPhone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          onPress: () => {
            Linking.openURL(`tel:${doctorPhone.replace(/\s+/g, '')}`).catch(() => {
              Alert.alert('Dialer Error', 'Unable to open phone dialer on this device.');
            });
          }
        }
      ]
    );
  };

  const handleCallCaregiver = () => {
    const caregiverName = user.emergencyName || 'Ali Arif';
    const caregiverPhone = user.emergencyPhone || '+92 300 7654321';
    const relationStr = user.relation ? ` (${user.relation})` : ' (Son)';
    Alert.alert(
      'Emergency Caregiver Contact',
      `Call caregiver ${caregiverName}${relationStr} at ${caregiverPhone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          onPress: () => {
            Linking.openURL(`tel:${caregiverPhone.replace(/\s+/g, '')}`).catch(() => {
              Alert.alert('Dialer Error', 'Unable to open phone dialer on this device.');
            });
          }
        }
      ]
    );
  };

  const handleCallAmbulance = () => {
    Alert.alert(
      'Emergency Ambulance (1122)',
      'Call emergency 24/7 ambulance service (1122) immediately?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call 1122 Now', 
          style: 'destructive',
          onPress: () => {
            Linking.openURL('tel:1122').catch(() => {
              Alert.alert('Dialer Error', 'Unable to open phone dialer on this device.');
            });
          }
        }
      ]
    );
  };

  const doctorName = user.doctor || 'Dr. Tariq Mahmood';
  const caregiverName = user.emergencyName || 'Ali Arif';

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Cross / Dismiss Button */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.closeCircle} 
          onPress={() => router.back()}
          activeOpacity={0.7}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          accessibilityLabel="Close alert and go back"
        >
          <Feather name="x" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Warning Pulsing Icon */}
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="alert-octagon" size={60} color="#DC2626" />
        </View>

        <Text variant="h1" align="center" color="#FFFFFF" style={styles.titleText}>
          {alertTitle}
        </Text>

        {alertValue ? (
          <View style={styles.valueBadge}>
            <Text style={styles.valueBadgeText}>{alertValue}</Text>
          </View>
        ) : null}

        <Text variant="bodyLarge" align="center" color="#FFFFFF" style={styles.messageText}>
          {alertMessage}
        </Text>

        {/* Primary Action: Call Doctor */}
        <Button 
          title={`Call Doctor (${doctorName})`} 
          variant="secondary" 
          onPress={handleCallDoctor}
          style={styles.actionBtn} 
        />

        {/* Secondary Action: Call Caregiver */}
        <Button 
          title={`Call Caregiver (${caregiverName})`} 
          variant="secondary" 
          onPress={handleCallCaregiver}
          style={styles.actionBtn} 
        />

        {/* Life-Saving Action: Call Ambulance 1122 */}
        <Button 
          title="Call Emergency Ambulance (1122)" 
          variant="secondary" 
          onPress={handleCallAmbulance}
          style={[styles.actionBtn, styles.ambulanceBtn]} 
        />

        {/* Safe Dismiss Button with Pure White Text and Border */}
        <TouchableOpacity 
          style={styles.dismissBtn} 
          onPress={() => router.back()} 
          activeOpacity={0.8}
        >
          <Text style={styles.dismissBtnText}>I Am Safe / Dismiss Alert</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#DC2626' // High-visibility medical emergency red
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    zIndex: 10,
  },
  closeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  content: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: Spacing.xl,
    paddingBottom: 40
  },
  iconCircle: { 
    width: 96, 
    height: 96, 
    borderRadius: 48, 
    backgroundColor: '#FFFFFF', 
    alignSelf: 'center', 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 16,
    elevation: 6
  },
  titleText: {
    marginTop: Spacing.lg,
    fontWeight: '800',
    fontSize: 28,
    lineHeight: 34
  },
  valueBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)'
  },
  valueBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18
  },
  messageText: {
    marginTop: Spacing.md, 
    marginBottom: Spacing.xxl, 
    opacity: 0.95,
    lineHeight: 24,
    fontSize: 16
  },
  actionBtn: {
    marginBottom: Spacing.md,
    backgroundColor: '#FFFFFF'
  },
  ambulanceBtn: {
    marginBottom: Spacing.xl,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA'
  },
  dismissBtn: {
    borderColor: '#FFFFFF', 
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginTop: Spacing.xs,
  },
  dismissBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  }
});
