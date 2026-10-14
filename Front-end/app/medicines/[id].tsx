import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Text, Header, Card } from '@/components/ui';
import { Spacing, Layout } from '@/constants/theme';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

export default function MedicineDetails() {
  const { theme, isDark } = useTheme();
  const { id } = useLocalSearchParams();
  const { medicines, deleteMedicine } = useUser();
  const med = medicines.find(m => m.id === id);

  if (!med) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Medicine Details" onBack={() => router.back()} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text variant="bodyLarge">Medicine not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Medicine",
      "Are you sure you want to delete this medicine?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            deleteMedicine(med.id);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Medicine Details" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Top Header Card */}
        <Card style={[styles.topCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
          <View style={[styles.iconBox, {backgroundColor: med.color + '20'}]}>
            <MaterialCommunityIcons name={med.iconType as any} size={36} color={med.color} />
          </View>
          <Text variant="h1" color={theme.text} style={{marginLeft: Spacing.md, flex: 1}} numberOfLines={2}>{med.name}</Text>
        </Card>
        
        <View style={[styles.detailsContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
          <View style={[styles.row, { borderBottomColor: theme.border }]}>
            <Text variant="bodyLarge" color={theme.textSecondary} style={styles.label}>Type</Text>
            <Text variant="bodyLarge" color={theme.text} style={styles.value}>Tablet</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: theme.border }]}>
            <Text variant="bodyLarge" color={theme.textSecondary} style={styles.label}>Dose</Text>
            <Text variant="bodyLarge" color={theme.text} style={styles.value}>{med.dose}</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: theme.border }]}>
            <Text variant="bodyLarge" color={theme.textSecondary} style={styles.label}>Timing</Text>
            <Text variant="bodyLarge" color={theme.text} style={styles.value}>{med.timing}</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: theme.border }]}>
            <Text variant="bodyLarge" color={theme.textSecondary} style={styles.label}>Frequency</Text>
            <Text variant="bodyLarge" color={theme.text} style={styles.value}>{med.days}</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: theme.border }]}>
            <Text variant="bodyLarge" color={theme.textSecondary} style={styles.label}>Start Date</Text>
            <Text variant="bodyLarge" color={theme.text} style={styles.value}>15 Aug 2024</Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text variant="bodyLarge" color={theme.textSecondary} style={styles.label}>Prescribed By</Text>
            <Text variant="bodyLarge" color={theme.text} style={styles.value}>Dr. Ahmad</Text>
          </View>
        </View>

        <View style={[styles.instructionsContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0, borderRadius: 16, padding: Spacing.md }]}>
          <Text variant="bodyLarge" color={theme.textSecondary} style={{fontWeight: '600', marginBottom: Spacing.sm}}>Instructions</Text>
          <Text variant="bodyLarge" color={theme.text} style={{lineHeight: 24}}>
            Take with food. Do not skip doses. If stomach upset occurs, inform doctor.
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.editBtn, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF', borderColor: theme.primary }]}>
            <Text style={[styles.editBtnText, { color: theme.primary }]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.deleteBtn, { backgroundColor: isDark ? '#450A0A' : '#FEF2F2' }]} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: Spacing.lg },
  topCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: Spacing.xl,
    padding: Spacing.md,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: Layout.borderRadius.lg,
    paddingHorizontal: Spacing.md,
  },
  row: { 
    flexDirection: 'row', 
    paddingVertical: Spacing.md, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F3',
    alignItems: 'flex-start'
  },
  label: { 
    width: 130, 
    color: '#8E8E93' 
  },
  value: {
    flex: 1,
    color: '#111827',
    fontWeight: '500'
  },
  instructionsContainer: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 40,
    paddingHorizontal: Spacing.md
  },
  editBtn: {
    flex: 1,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: '#0EADF1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  editBtnText: {
    color: '#0EADF1',
    fontWeight: '700',
    fontSize: 16
  },
  deleteBtn: {
    flex: 1,
    marginLeft: Spacing.sm,
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FEF2F2'
  },
  deleteBtnText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 16
  }
});
