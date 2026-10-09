const fs = require('fs');
let content = fs.readFileSync('app/(tabs)/settings.tsx', 'utf8');

// Add Modal import and useState
if (!content.includes('import { Modal }')) {
  content = content.replace("import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';", "import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';");
}
if (!content.includes('import React, { useState }')) {
  content = content.replace("import React from 'react';", "import React, { useState } from 'react';");
}

// Add state inside SettingsScreen
if (!content.includes('const [showLogoutModal')) {
  content = content.replace('const { user } = useUser();', 'const { user } = useUser();\n  const [showLogoutModal, setShowLogoutModal] = useState(false);');
}

// Replace Sign Out button onPress
content = content.replace(
  "onPress={() => router.replace('/')}",
  "onPress={() => setShowLogoutModal(true)}"
);

// Add the Modal JSX right before the closing SafeAreaView
const modalJSX = `
      {/* Logout Modal */}
      <Modal transparent visible={showLogoutModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Feather name="log-out" size={28} color="#111827" />
            </View>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalLogoutBtn} onPress={() => {
                setShowLogoutModal(false);
                router.replace('/');
              }}>
                <Text style={styles.modalLogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>`;

content = content.replace('</SafeAreaView>', modalJSX);

// Add modal styles
const modalStyles = `
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#F8FAFC', // Very light cool gray/blue matching mockup
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0', // Slightly darker circle background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 32,
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    color: '#0EADF1',
    fontSize: 16,
    fontWeight: '600',
  },
  modalLogoutBtn: {
    flex: 1,
    backgroundColor: '#0EADF1', // Primary blue
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  modalLogoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  }
});`;

content = content.replace('});', modalStyles);

fs.writeFileSync('app/(tabs)/settings.tsx', content);
console.log('Added custom logout modal');
