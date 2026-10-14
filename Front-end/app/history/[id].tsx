import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Header, Badge, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useLocalSearchParams, router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function HistoryDetailScreen() {
  const { theme, isDark } = useTheme();
  const { id } = useLocalSearchParams();
  const { history, user, deleteHistoryRecord } = useUser();
  
  const record = history.find(r => r.id === id);

  const handleDelete = () => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this reading?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            if (typeof id === 'string') {
              deleteHistoryRecord(id);
              router.back();
            }
          }
        }
      ]
    );
  };

  if (!record) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Reading Details" onBack={() => router.back()} />
        <View style={styles.center}>
          <Text variant="bodyLarge">Reading not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isSugar = record.type === 'Sugar';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Reading Details" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.heroSection}>
          <View style={[styles.iconCircle, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
            <MaterialCommunityIcons 
              name={isSugar ? "water" : "heart-pulse"} 
              size={36} 
              color={isSugar ? "#FF4B4B" : theme.primary} 
            />
          </View>
          <Text variant="h2" color={theme.text} style={{ marginVertical: Spacing.sm }}>
            {isSugar ? 'Blood Sugar' : 'Blood Pressure'}
          </Text>
          <Text variant="body" color={theme.textSecondary} style={{ marginBottom: Spacing.md }}>
            {record.date} • {record.time}
          </Text>
        </View>

        <Card style={[styles.mainCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.hugeMetric, { color: theme.text }]}>
              {record.value}
              {isSugar && <Text variant="bodyLarge" color={theme.textSecondary}> mg/dL</Text>}
            </Text>
            <View style={{ marginTop: Spacing.sm }}>
              <Badge 
                label={record.label} 
                status={record.label === 'Normal' || record.label === 'Good' ? 'success' : 'danger'} 
              />
            </View>
          </View>
        </Card>

        <Card style={[styles.detailsCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
          <View style={styles.row}>
            <Text variant="body" color={theme.textSecondary} style={{ flex: 1 }}>Patient</Text>
            <Text variant="bodyLarge" color={theme.text} style={{ fontWeight: '600' }}>{user.name}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.row}>
            <Text variant="body" color={theme.textSecondary} style={{ flex: 1 }}>Period</Text>
            <Text variant="bodyLarge" color={theme.text} style={{ fontWeight: '600' }}>{record.period || 'N/A'}</Text>
          </View>

          {!isSugar && (
            <>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <View style={styles.row}>
                <Text variant="body" color={theme.textSecondary} style={{ flex: 1 }}>Systolic</Text>
                <Text variant="bodyLarge" color={theme.text} style={{ fontWeight: '600' }}>{record.value.split('/')[0]} mmHg</Text>
              </View>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <View style={styles.row}>
                <Text variant="body" color={theme.textSecondary} style={{ flex: 1 }}>Diastolic</Text>
                <Text variant="bodyLarge" color={theme.text} style={{ fontWeight: '600' }}>{record.value.split('/')[1]} mmHg</Text>
              </View>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <View style={styles.row}>
                <Text variant="body" color={theme.textSecondary} style={{ flex: 1 }}>Pulse</Text>
                <Text variant="bodyLarge" color={theme.text} style={{ fontWeight: '600' }}>{record.pulse || '--'} bpm</Text>
              </View>
            </>
          )}

          {record.symptoms && record.symptoms.length > 0 && (
            <>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <View style={styles.rowTop}>
                <Text variant="body" color={theme.textSecondary} style={{ flex: 1 }}>Symptoms</Text>
                <Text variant="bodyLarge" color={theme.text} style={{ flex: 2, textAlign: 'right', fontWeight: '500' }}>
                  {record.symptoms.join(', ')}
                </Text>
              </View>
            </>
          )}

          {record.notes ? (
            <>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <View style={styles.rowTop}>
                <Text variant="body" color={theme.textSecondary} style={{ flex: 1 }}>Notes</Text>
                <Text variant="bodyLarge" color={theme.text} style={{ flex: 2, textAlign: 'right' }}>{record.notes}</Text>
              </View>
            </>
          ) : null}
        </Card>

        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Spacing.xl }}
          onPress={handleDelete}
        >
          <Feather name="trash-2" size={20} color="#FF3B30" />
          <Text variant="bodyLarge" style={{ color: '#FF3B30', fontWeight: '600', marginLeft: Spacing.sm }}>
            Delete Reading
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 60 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  heroSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },
  
  mainCard: {
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.xxl
  },
  hugeMetric: {
    fontSize: 48,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 56
  },

  detailsCard: {
    paddingVertical: Spacing.md
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F3',
    marginHorizontal: Spacing.sm
  }
});
