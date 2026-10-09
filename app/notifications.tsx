import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Header, Card, EmptyState } from '@/components/ui';
import { Spacing, Layout } from '@/constants/theme';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Notifications() {
  const { medicines, toggleMedicineTaken } = useUser();
  const [cleared, setCleared] = React.useState(false);
  
  const todayStr = new Date().toISOString().split('T')[0];

  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    let hours = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return hours * 60 + mins;
  };

  // Find all untaken medicines for today
  const untakenMedicines = medicines
    .filter(m => !m.takenStatus[todayStr])
    .sort((a, b) => parseTime(a.time) - parseTime(b.time));

  const hasNotifications = !cleared && (untakenMedicines.length > 0 || true); // Always show report notif unless cleared

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Notifications" 
        onBack={() => router.back()} 
        rightElement={
          hasNotifications ? (
            <TouchableOpacity onPress={() => setCleared(true)}>
              <Text style={{color: '#0EADF1', fontWeight: '600'}}>Clear All</Text>
            </TouchableOpacity>
          ) : undefined
        } 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        {!hasNotifications ? (
          <View style={{marginTop: 100}}>
            <EmptyState title="No Notifications" message="You are all caught up for today!" />
          </View>
        ) : (
          <>
            {/* Dynamic Medicine Notifications */}
            {!cleared && untakenMedicines.map(med => (
              <Card key={med.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconCircle, {backgroundColor: '#E6F4EA'}]}>
                    <MaterialCommunityIcons name="pill" size={20} color="#34A853" />
                  </View>
                  <Text style={styles.timeText}>{med.time}</Text>
                </View>
                
                <Text style={styles.notifTitle}>Time for Medicine</Text>
                <Text style={styles.notifBody}>
                  It is time to take <Text style={{fontWeight: '700'}}>{med.name}</Text> ({med.dose}).
                </Text>
                
                <TouchableOpacity 
                  style={styles.actionBtn}
                  onPress={() => toggleMedicineTaken(med.id, todayStr)}
                >
                  <Feather name="check-circle" size={18} color="#FFF" style={{marginRight: 8}} />
                  <Text style={styles.actionBtnText}>Mark Taken</Text>
                </TouchableOpacity>
              </Card>
            ))}

            {/* Static System Notification */}
            {!cleared && (
              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconCircle, {backgroundColor: '#E5FAFA'}]}>
                    <Feather name="bar-chart-2" size={20} color="#05C2C4" />
                  </View>
                  <Text style={styles.timeText}>Just now</Text>
                </View>
                
                <Text style={styles.notifTitle}>Weekly Report Ready</Text>
                <Text style={styles.notifBody}>
                  Your health summary for last week is ready to be reviewed.
                </Text>
                
                <TouchableOpacity 
                  style={[styles.actionBtn, {backgroundColor: '#0EADF1'}]}
                  onPress={() => router.push('/reports')}
                >
                  <Feather name="eye" size={18} color="#FFF" style={{marginRight: 8}} />
                  <Text style={styles.actionBtnText}>View Report</Text>
                </TouchableOpacity>
              </Card>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg },
  card: { 
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeText: {
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: '500'
  },
  notifTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4
  },
  notifBody: {
    fontSize: 15,
    color: '#4A6583',
    lineHeight: 22,
    marginBottom: Spacing.lg
  },
  actionBtn: {
    backgroundColor: '#10B981', // Green for take medicine
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Layout.borderRadius.md
  },
  actionBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16
  }
});
