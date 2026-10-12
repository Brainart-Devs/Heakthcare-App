const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// 1. Add Sugar
write('app/add/sugar.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Input, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function AddSugarScreen() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('Fasting');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('01 Oct 2024');
  const [time, setTime] = useState('07:15 AM');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  
  const handleSave = () => {
    setError('');
    if (!value) {
      setError('Please enter your sugar reading.');
      return;
    }
    if (isNaN(Number(value)) || Number(value) <= 0 || Number(value) > 1000) {
      setError('Please enter a valid numeric value.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  const types = ['Fasting', 'Before Meal', '2-Hr After', 'Random'];

  return (
    <View style={styles.container}>
      <Header title="Add Sugar Reading" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.segmentedControl}>
          {types.map(t => (
            <View key={t} onTouchEnd={() => setType(t)}>
              <Badge label={t} status={type === t ? 'info' : 'default'} />
            </View>
          ))}
        </View>

        <View style={styles.bigInputContainer}>
          <Input 
            placeholder="128" 
            keyboardType="numeric" 
            style={{fontSize: 48, textAlign: 'center'}}
            value={value}
            onChangeText={setValue}
            error={error}
          />
          <Text variant="bodyLarge" secondary align="center">mg/dL</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md}}>
          <Input placeholder="Date" value={date} onChangeText={setDate} style={{flex: 1, marginRight: Spacing.sm}} />
          <Input placeholder="Time" value={time} onChangeText={setTime} style={{flex: 1, marginLeft: Spacing.sm}} />
        </View>

        <Input 
          label="Notes (optional)" 
          placeholder="e.g. feeling well, little tired etc." 
          multiline 
          style={{minHeight: 100}}
          value={notes}
          onChangeText={setNotes}
        />

        <View style={styles.targetBox}>
          <Text variant="body" color="#1B5E20">✓ Normal Fasting Range</Text>
          <Text variant="h3" color="#1B5E20">70 - 130 mg/dL</Text>
          <Text variant="caption" color="#1B5E20">(Your doctor&apos;s target may be different)</Text>
        </View>

        <Button title="Save Reading" onPress={handleSave} loading={loading} style={{marginTop: Spacing.xl}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  segmentedControl: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xl, flexWrap: 'wrap', gap: 8 },
  bigInputContainer: { alignItems: 'center', marginBottom: Spacing.xl },
  targetBox: { backgroundColor: '#E8F5E9', padding: Spacing.md, borderRadius: 12, marginTop: Spacing.md }
});
`);

// 2. Add BP
write('app/add/bp.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Header, Input, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function AddBPScreen() {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('Morning');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [date, setDate] = useState('01 Oct 2024');
  const [time, setTime] = useState('08:00 AM');
  const [notes, setNotes] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');
  
  const handleSave = () => {
    setError('');
    if (!systolic || !diastolic || !pulse) {
      setError('Systolic, Diastolic, and Pulse are required.');
      return;
    }
    if (isNaN(Number(systolic)) || isNaN(Number(diastolic)) || isNaN(Number(pulse))) {
      setError('Please enter valid numeric values.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  const periods = ['Morning', 'Evening', 'Other'];

  return (
    <View style={styles.container}>
      <Header title="Add Blood Pressure" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.segmentedControl}>
          {periods.map(p => (
             <View key={p} onTouchEnd={() => setPeriod(p)}>
               <Badge label={p} status={period === p ? 'info' : 'default'} />
             </View>
          ))}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md}}>
          <View style={{flex: 1, marginRight: Spacing.sm}}>
            <Input label="Systolic (mmHg)" placeholder="136" keyboardType="numeric" style={{fontSize: 32, textAlign: 'center'}} value={systolic} onChangeText={setSystolic} error={error ? ' ' : undefined} />
          </View>
          <View style={{flex: 1, marginLeft: Spacing.sm}}>
            <Input label="Diastolic (mmHg)" placeholder="82" keyboardType="numeric" style={{fontSize: 32, textAlign: 'center'}} value={diastolic} onChangeText={setDiastolic} error={error ? ' ' : undefined} />
          </View>
        </View>

        <Input label="Pulse (bpm)" placeholder="76" keyboardType="numeric" style={{fontSize: 32, textAlign: 'center'}} value={pulse} onChangeText={setPulse} error={error} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.md}}>
          <Input placeholder="Date" value={date} onChangeText={setDate} style={{flex: 1, marginRight: Spacing.sm}} />
          <Input placeholder="Time" value={time} onChangeText={setTime} style={{flex: 1, marginLeft: Spacing.sm}} />
        </View>

        <Input label="Symptoms" placeholder="e.g. dizzy, headache" value={symptoms} onChangeText={setSymptoms} style={{marginTop: Spacing.md}} />
        <Input label="Notes (optional)" placeholder="e.g. feeling better today" multiline style={{minHeight: 100, marginTop: Spacing.md}} value={notes} onChangeText={setNotes} />

        <Button title="Save Reading" onPress={handleSave} loading={loading} style={{marginTop: Spacing.xl}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  segmentedControl: { flexDirection: 'row', gap: 16, marginBottom: Spacing.xl },
});
`);

// 3. Add Medicine (new route)
write('app/add/medicine.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Header, Input, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function AddMedicineScreen() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [timing, setTiming] = useState('With Meal');
  const [time, setTime] = useState('');
  const [days, setDays] = useState('Everyday');
  const [error, setError] = useState('');
  
  const handleSave = () => {
    setError('');
    if (!name || !dose || !time) {
      setError('Please fill out all required fields.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  const timings = ['Before Meal', 'With Meal', 'After Meal'];

  return (
    <View style={styles.container}>
      <Header title="Add Medicine" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <Input label="Medicine Name" placeholder="e.g. Panadol" value={name} onChangeText={setName} error={error ? ' ' : undefined} />
        <Input label="Dose" placeholder="e.g. 500mg or 1 Tablet" value={dose} onChangeText={setDose} error={error ? ' ' : undefined} />
        
        <Text variant="bodyLarge" style={{marginTop: Spacing.md, marginBottom: Spacing.sm}}>Meal Relation</Text>
        <View style={styles.segmentedControl}>
          {timings.map(t => (
             <View key={t} onTouchEnd={() => setTiming(t)}>
               <Badge label={t} status={timing === t ? 'info' : 'default'} />
             </View>
          ))}
        </View>

        <Input label="Schedule Time" placeholder="e.g. 08:00 AM" value={time} onChangeText={setTime} style={{marginTop: Spacing.md}} error={error} />
        <Input label="Days" placeholder="e.g. Everyday, Monday" value={days} onChangeText={setDays} style={{marginTop: Spacing.md}} />
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.xl}}>
          <Button title="Cancel" variant="outline" style={{flex: 1, marginRight: Spacing.sm}} onPress={() => router.back()} />
          <Button title="Save" onPress={handleSave} loading={loading} style={{flex: 1, marginLeft: Spacing.sm}} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  segmentedControl: { flexDirection: 'row', gap: 16, marginBottom: Spacing.md, flexWrap: 'wrap' },
});
`);

// Connect Add Medicine to Medicines List
write('app/medicines/index.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Header, Card, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { mockMedicines } from '@/constants/mockData';
import { router } from 'expo-router';

export default function MedicinesList() {
  return (
    <View style={styles.container}>
      <Header 
        title="My Medicines" 
        onBack={() => router.back()} 
        rightElement={<Button title="+ Add" size="medium" onPress={() => router.push('/add/medicine' as any)} />}
      />
      <View style={styles.tabs}>
        <Badge label="Today" status="info" />
        <Badge label="All Medicines" status="default" />
        <Badge label="Schedule" status="default" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {mockMedicines.map(med => (
          <TouchableOpacity key={med.id} onPress={() => router.push(\`/medicines/\${med.id}\` as any)}>
            <Card style={styles.card}>
              <View style={{flex: 1}}>
                <Text variant="h3">{med.name}</Text>
                <Text variant="body">{med.dose}</Text>
                <Text variant="caption" secondary>{med.timing} • {med.time}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                {med.status === 'Taken' ? (
                  <Badge label="✓ Taken" status="success" />
                ) : (
                  <Button title="Mark" variant="outline" size="medium" onPress={() => {}} />
                )}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.md },
  tabs: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm, backgroundColor: '#F8F9FA' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md }
});
`);

// 4. Profile Setup / Edit
write('app/(auth)/profile-setup.tsx', `
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Header, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { mockUser } from '@/constants/mockData';

export default function ProfileSetup() {
  const params = useLocalSearchParams();
  const isEdit = params.edit === 'true';
  
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(isEdit ? mockUser.name : '');
  const [dob, setDob] = useState(isEdit ? '15 Aug 1958' : '');
  const [gender, setGender] = useState(isEdit ? 'Female' : '');
  const [phone, setPhone] = useState(isEdit ? '0300 1234567' : '');
  const [emergencyContact, setEmergencyContact] = useState(isEdit ? 'Ali Arif - 0300 7654321' : '');
  const [error, setError] = useState('');

  const handleSave = () => {
    setError('');
    if (!name || !dob || !phone) {
      setError('Name, Date of Birth, and Phone are required.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isEdit) {
        router.back();
      } else {
        router.replace('/(tabs)' as any);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title={isEdit ? "Edit Profile" : "Patient Profile"} onBack={isEdit ? () => router.back() : undefined} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input label="Full Name" placeholder="Your Name" value={name} onChangeText={setName} error={error ? ' ' : undefined} />
        <Input label="Date of Birth" placeholder="DD MMM YYYY" value={dob} onChangeText={setDob} error={error ? ' ' : undefined} />
        <Input label="Gender" placeholder="Male / Female" value={gender} onChangeText={setGender} />
        <Input label="Phone Number" placeholder="03xx xxxxxxx" value={phone} onChangeText={setPhone} keyboardType="phone-pad" error={error ? ' ' : undefined} />
        <Input label="Emergency Contact" placeholder="Name - Phone" value={emergencyContact} onChangeText={setEmergencyContact} style={{marginTop: Spacing.md}} error={error} />
        
        <Button title={isEdit ? "Save Changes" : "Complete Setup"} style={{marginTop: Spacing.xl}} onPress={handleSave} loading={loading} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' }, content: { padding: Spacing.lg } });
`);

// 5. Settings / Profile Routing
write('app/(tabs)/settings.tsx', `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Header, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { mockUser } from '@/constants/mockData';
import { router } from 'expo-router';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileBox}>
          <View style={styles.avatar} />
          <View>
            <Text variant="h2">{mockUser.name}</Text>
            <Text variant="bodyLarge" color="#4B2E83" onPress={() => router.push('/(auth)/profile-setup?edit=true' as any)}>Edit Profile</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <Text variant="bodyLarge" style={styles.menuItem} onPress={() => router.push('/(auth)/profile-setup?edit=true' as any)}>👤 My Profile</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>🔔 Medicine Reminders</Text>
          <Text variant="bodyLarge" style={styles.menuItem} onPress={() => router.push('/settings/caregiver' as any)}>👥 Caregiver Access</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>🩺 Doctor Information</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>⚙️ App Preferences</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>🌐 Language (English / اردو)</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>🔒 Privacy & Security</Text>
          <Text variant="bodyLarge" style={styles.menuItem}>❓ Help & Support</Text>
        </View>

        <Button title="Sign Out" variant="outline" onPress={() => router.replace('/' as any)} style={{marginTop: Spacing.xxl}} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg },
  profileBox: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E8E3F2', marginRight: Spacing.md },
  menu: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  menuItem: { padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: '#F0F0F3' }
});
`);
