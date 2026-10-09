import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Header, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Create Account" onBack={() => router.back()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}><ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>
        <Input placeholder="Full Name" label="Full Name" />
        <Input placeholder="Email or Phone" label="Email or Phone" />
        <Input placeholder="Password" label="Password" secureTextEntry />
        <Button title="Sign Up" style={{marginTop: Spacing.lg}} onPress={() => router.push('/(auth)/profile-setup')} />
      </ScrollView></KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFFFFF' }, content: { padding: Spacing.lg } });
