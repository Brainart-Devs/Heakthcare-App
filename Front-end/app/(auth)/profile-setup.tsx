import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { Button, Header, Input, Text } from '@/components/ui';
import { Spacing, Layout } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { mockUser } from '@/constants/mockData';
import { useUser } from '@/context/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

const RELATIONS = ['Son', 'Daughter', 'Husband', 'Wife', 'Brother', 'Sister', 'Relative'];

export default function ProfileSetup() {
  const { theme, isDark } = useTheme();
  const params = useLocalSearchParams();
  const isEdit = params.edit === 'true';
  const { user, setUser } = useUser();
  
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(isEdit && user.image ? user.image : null);
  
  const [name, setName] = useState(isEdit ? user.name : '');
  const [dob, setDob] = useState(isEdit ? user.dob : '');
  const [gender, setGender] = useState(isEdit ? user.gender : '');
  const [email, setEmail] = useState(isEdit ? user.email : '');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(isEdit ? user.phone : '');
  const [bloodGroup, setBloodGroup] = useState(isEdit ? user.bloodGroup : '');
  
  const [heightFeet, setHeightFeet] = useState(isEdit ? user.heightFeet : '');
  const [heightInches, setHeightInches] = useState(isEdit ? user.heightInches : '');
  const [weight, setWeight] = useState(isEdit ? user.weight : '');
  
  const [emergencyName, setEmergencyName] = useState(isEdit ? user.emergencyName : '');
  const [emergencyPhone, setEmergencyPhone] = useState(isEdit ? user.emergencyPhone : '');
  
  const [relation, setRelation] = useState(isEdit ? user.relation : 'Son');
  const [conditions, setConditions] = useState(isEdit ? user.conditions : '');
  const [doctor, setDoctor] = useState(isEdit ? user.doctor : '');
  const [showRelationModal, setShowRelationModal] = useState(false);
  
  const [error, setError] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDobChange = (text: string) => {
    const digits = text.replace(/\D/g, '');
    const truncated = digits.slice(0, 8);
    
    let formatted = '';
    if (truncated.length > 0) {
      formatted += truncated.slice(0, 2);
    }
    if (truncated.length > 2) {
      formatted += '/' + truncated.slice(2, 4);
    }
    if (truncated.length > 4) {
      formatted += '/' + truncated.slice(4, 8);
    }
    
    if (text.length > dob.length) {
      if (truncated.length === 2 || truncated.length === 4) {
        formatted += '/';
      }
    }

    setDob(formatted);
  };

  const handleSave = () => {
    setError('');
    
    if (!name || !dob || !gender || !email || (!isEdit && !password) || !phone || !bloodGroup || !heightFeet || !heightInches || !weight || !emergencyName || !emergencyPhone) {
      setError('All fields are compulsory. Please fill in everything.');
      Alert.alert('Validation Error', 'All fields are compulsory.');
      return;
    }

    setUser({ 
      name, 
      dob, 
      gender, 
      email, 
      phone, 
      bloodGroup, 
      heightFeet, 
      heightInches, 
      weight, 
      emergencyName, 
      emergencyPhone, 
      relation, 
      conditions, 
      doctor,
      image: image || user.image || undefined
    });
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isEdit) {
        router.back();
      } else {
        router.replace('/(tabs)' as any);
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title={isEdit ? "Edit Profile" : "Create Account"} onBack={isEdit ? () => router.back() : () => router.replace('/')} />
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>
          
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={pickImage} style={[styles.avatarContainer, { backgroundColor: isDark ? '#1E293B' : '#F4F4F6', borderColor: theme.border }]}>
              {image ? (
                <Image source={{ uri: image }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Feather name="camera" size={32} color={theme.textSecondary} />
                </View>
              )}
            </TouchableOpacity>
            <Text variant="body" color={theme.primary} style={{marginTop: Spacing.sm}} onPress={pickImage}>
              Upload Photo
            </Text>
          </View>

          {error ? <Text variant="body" color="#FF3B30" style={{marginBottom: Spacing.md, textAlign: 'center'}}>{error}</Text> : null}

          {/* 1. Personal Information */}
          <Text variant="h2" style={[styles.sectionTitle, { color: theme.primary }]}>Personal Information</Text>
          <Input label="Full Name" placeholder="Your Name" value={name} onChangeText={setName} />
          <Input label="Date of Birth" placeholder="DD/MM/YYYY" keyboardType="numeric" value={dob} onChangeText={handleDobChange} maxLength={10} />
          <Input label="Gender" placeholder="Male / Female" value={gender} onChangeText={setGender} />
          <Input label="Phone Number" placeholder="03xx xxxxxxx" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          
          {/* 2. Health Details */}
          <Text variant="h2" style={[styles.sectionTitle, { color: theme.primary }]}>Health Details</Text>
          <Input label="Blood Group" placeholder="O+, A-, etc." value={bloodGroup} onChangeText={setBloodGroup} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm}}>
            <View style={{flex: 1, paddingRight: Spacing.sm}}>
              <Input label="Height (Feet)" placeholder="e.g. 5" keyboardType="numeric" value={heightFeet} onChangeText={setHeightFeet} maxLength={1} />
            </View>
            <View style={{flex: 1, paddingLeft: Spacing.sm}}>
              <Input label="Height (Inches)" placeholder="e.g. 10" keyboardType="numeric" value={heightInches} onChangeText={setHeightInches} maxLength={2} />
            </View>
          </View>
          <Input label="Weight" placeholder="e.g. 75 kg" keyboardType="numeric" value={weight} onChangeText={setWeight} />

          {/* 2b. Medical Info */}
          <Text variant="h2" style={[styles.sectionTitle, { color: theme.primary }]}>Medical Information</Text>
          <Input label="Conditions" placeholder="Diabetes, Thyroid..." value={conditions} onChangeText={setConditions} />
          <Input label="Treating Doctor" placeholder="Dr. Name" value={doctor} onChangeText={setDoctor} />

          {/* 3. Emergency Contact */}
          <Text variant="h2" style={[styles.sectionTitle, { color: theme.primary }]}>Emergency Contact</Text>
          <Input label="Contact Name" placeholder="Full Name" value={emergencyName} onChangeText={setEmergencyName} />
          <Input label="Contact Number" placeholder="03xx xxxxxxx" keyboardType="phone-pad" value={emergencyPhone} onChangeText={setEmergencyPhone} />
          
          <Text variant="label" color={theme.textSecondary} style={{marginBottom: Spacing.xs}}>Relation</Text>
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[styles.dropdownButton, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF', borderColor: theme.border }]}
            onPress={() => setShowRelationModal(true)}
          >
            <Text variant="bodyLarge" color={theme.text}>{relation}</Text>
            <Feather name="chevron-down" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
          
          {/* 4. Account Logins / Information */}
          <Text variant="h2" style={[styles.sectionTitle, { color: theme.primary }]}>Account Information</Text>
          <Input label="Email" placeholder="example@mail.com" keyboardType="email-address" value={email} onChangeText={setEmail} />
          {!isEdit && (
            <Input label="Password" placeholder="Create a password" secureTextEntry value={password} onChangeText={setPassword} />
          )}

          <Button 
            title={isEdit ? "Save Changes" : "Complete Setup"} 
            style={{marginTop: Spacing.xxl}} 
            onPress={handleSave} 
            loading={loading} 
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={showRelationModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0 }]}>
            <Text variant="h3" color={theme.text} style={{marginBottom: Spacing.md, textAlign: 'center'}}>Select Relation</Text>
            {RELATIONS.map(rel => (
              <TouchableOpacity 
                key={rel} 
                style={[styles.modalOption, { borderBottomColor: theme.border }]}
                onPress={() => {
                  setRelation(rel);
                  setShowRelationModal(false);
                }}
              >
                <Text variant="bodyLarge" color={relation === rel ? theme.primary : theme.text}>{rel}</Text>
                {relation === rel && <Feather name="check" size={20} color={theme.primary} />}
              </TouchableOpacity>
            ))}
            <Button title="Cancel" variant="outline" onPress={() => setShowRelationModal(false)} style={{marginTop: Spacing.md}} />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#FFFFFF' }, 
  content: { padding: Spacing.lg },
  avatarSection: { alignItems: 'center', marginBottom: Spacing.xl },
  avatarContainer: {
    width: 100, height: 100, borderRadius: 50, overflow: 'hidden', 
    backgroundColor: '#F4F4F6', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#E5E5EA'
  },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center' },
  avatar: { width: '100%', height: '100%' },
  sectionTitle: { 
    marginTop: Spacing.xl, 
    marginBottom: Spacing.md, 
    color: '#16449C',
    textAlign: 'center',
    fontWeight: '700'
  },
  dropdownButton: {
    backgroundColor: '#F4F4F6',
    borderColor: '#E5E5EA',
    borderWidth: 1,
    borderRadius: Layout.borderRadius.lg,
    paddingHorizontal: Spacing.md,
    minHeight: Layout.touchTarget + 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: Layout.borderRadius.lg,
    padding: Spacing.lg,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3'
  }
});
