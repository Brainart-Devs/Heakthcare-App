import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, Header, Input, Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTheme } from '@/context/ThemeContext';

export default function AddMedicineScreen() {
  const { theme, isDark } = useTheme();
  const { addMedicine } = useUser();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [timing, setTiming] = useState('With Meal');
  
  const [timeObj, setTimeObj] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const [days, setDays] = useState('Everyday');
  const [error, setError] = useState('');
  
  const [permission, requestPermission] = useCameraPermissions();
  const [showScanner, setShowScanner] = useState(false);
  
  const handleOpenScanner = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Permission Required", "Camera permission is required to scan QR codes.");
        return;
      }
    }
    setShowScanner(true);
  };

  const handleBarcodeScanned = ({ type, data }: any) => {
    setShowScanner(false);
    
    // If it's a standard commercial barcode (mostly numbers)
    if (/^\d+$/.test(data) || type.includes('ean') || type.includes('upc')) {
      setName('Looking up barcode...');
      
      // Simulate calling a medical barcode API (like OpenFDA or UPC database)
      setTimeout(() => {
        // In Phase 2, this will be a real API call using the 'data' (barcode number)
        setName('Panadol Extra'); // Mock API response
        setDose('500 mg');
        Alert.alert(
          "Barcode Recognized", 
          `Successfully looked up barcode: ${data}\n\n(Note: This is simulated for the prototype. In production, this will query a real pharmacy database!)`
        );
      }, 1200);
      return;
    }

    // Smart QR Code Parsing
    try {
      const parsed = JSON.parse(data);
      if (parsed.name) setName(parsed.name);
      if (parsed.dose) setDose(parsed.dose);
      if (parsed.timing) setTiming(parsed.timing);
    } catch (e) {
      setName(data); // Fallback to raw string
    }
  };
  
  const handleSave = () => {
    setError('');
    if (!name || !dose) {
      setError('Please fill out all required fields.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const colors = ['#10B981', '#F59E0B', '#EC4899', '#3B82F6', '#EF4444', '#8B5CF6'];
      const icons = ['pill', 'bottle-tonic-plus', 'pill-multiple', 'medical-bag'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const iconType = icons[Math.floor(Math.random() * icons.length)];
      
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      const timeStr = timeObj.toLocaleTimeString('en-US', options);

      addMedicine({
        name,
        dose,
        timing,
        time: timeStr,
        days,
        iconType,
        color
      });
      
      setLoading(false);
      router.back();
    }, 1000);
  };

  const timings = ['Before Breakfast', 'With Breakfast', 'After Breakfast', 'With Meal', 'Before Dinner', 'After Dinner'];

  const timeStr = timeObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Add Medicine" onBack={() => router.back()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>
        
          <Input 
            label="Medicine Name" 
            placeholder="e.g. Thyroxine" 
            value={name} 
            onChangeText={setName} 
            error={error ? ' ' : undefined} 
            rightIcon={
              <TouchableOpacity onPress={handleOpenScanner} style={[styles.qrBtn, { backgroundColor: isDark ? '#082F49' : '#E5FAFA' }]}>
                <MaterialCommunityIcons name="qrcode-scan" size={20} color={theme.primary} />
              </TouchableOpacity>
            }
          />
          <Input label="Dose" placeholder="e.g. 50 mcg or 1 Tablet" value={dose} onChangeText={setDose} error={error ? ' ' : undefined} />
          
          <Text variant="bodyLarge" color={theme.text} style={{marginTop: Spacing.md, marginBottom: Spacing.sm}}>Instruction / Meal Relation</Text>
          <View style={styles.segmentedControl}>
            {timings.map(t => (
               <TouchableOpacity key={t} onPress={() => setTiming(t)}>
                 <Badge label={t} status={timing === t ? 'info' : 'default'} />
               </TouchableOpacity>
            ))}
          </View>

          <Text variant="bodyLarge" color={theme.text} style={{marginTop: Spacing.xl, marginBottom: Spacing.sm}}>Schedule Time</Text>
          <TouchableOpacity 
            style={[styles.timeInput, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF', borderColor: theme.border }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text variant="body" color={theme.text}>{timeStr}</Text>
          </TouchableOpacity>

          <Input label="Days" placeholder="e.g. Everyday, Monday" value={days} onChangeText={setDays} style={{marginTop: Spacing.md}} />
          
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
                    value={timeObj}
                    mode="time"
                    display="spinner"
                    textColor={isDark ? '#FFFFFF' : '#000000'}
                    onChange={(event, selectedDate) => {
                      if (selectedDate) setTimeObj(selectedDate);
                    }}
                  />
                </View>
              </View>
            </Modal>
          ) : showTimePicker && (
            <DateTimePicker
              value={timeObj}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                setShowTimePicker(false);
                if (selectedDate) setTimeObj(selectedDate);
              }}
            />
          )}

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.xxl}}>
            <Button title="Cancel" variant="outline" style={{flex: 1, marginRight: Spacing.sm}} onPress={() => router.back()} />
            <Button title="Save" onPress={handleSave} loading={loading} style={{flex: 1, marginLeft: Spacing.sm}} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* QR Scanner Modal */}
      {showScanner && (
        <Modal animationType="slide" visible={showScanner}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
              <Text variant="h2" style={{ color: '#FFF' }}>Scan QR Code</Text>
              <TouchableOpacity onPress={() => setShowScanner(false)}>
                <Feather name="x" size={32} color="#FFF" />
              </TouchableOpacity>
            </View>
            
            <View style={{ flex: 1, overflow: 'hidden', borderRadius: 24, margin: 16 }}>
              <CameraView 
                style={StyleSheet.absoluteFill}
                facing="back"
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{
                  barcodeTypes: [
                    "qr",
                    "pdf417",
                    "ean13",
                    "ean8",
                    "upc_e",
                    "upc_a",
                    "datamatrix",
                    "code39",
                    "code93",
                    "code128",
                    "itf14",
                    "aztec"
                  ],
                }}
              />
              {/* Scanner Overlay Frame */}
              <View style={styles.scannerOverlay}>
                <View style={styles.scannerFrame} />
                <Text style={{color: '#FFF', marginTop: 24}}>Align QR code within the frame</Text>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: Spacing.lg },
  segmentedControl: { flexDirection: 'row', gap: 10, marginBottom: Spacing.md, flexWrap: 'wrap' },
  timeInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: Spacing.md,
    backgroundColor: '#F9FAFB'
  },
  qrBtn: {
    padding: 8,
    backgroundColor: '#E5FAFA',
    borderRadius: 8,
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#0EADF1',
    borderRadius: 16,
    backgroundColor: 'transparent'
  }
});
