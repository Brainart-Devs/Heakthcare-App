import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button, Header, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function ForgotPassword() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reset Password" onBack={() => router.back()} />
      <View style={styles.content}>
        <Text variant="bodyLarge" style={{marginBottom: Spacing.xl}}>Enter your email or phone number to reset your password.</Text>
        <Input placeholder="Email or Phone" />
        <Button title="Send Reset Link" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' }, content: { padding: Spacing.lg } });
