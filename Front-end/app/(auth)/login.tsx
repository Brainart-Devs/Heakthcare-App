import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Text, Button, Input } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/context/ThemeContext';

export const GoogleLogo = () => (
  <Svg width="20" height="20" viewBox="0 0 48 48">
    <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </Svg>
);

export const AppleLogo = ({ color = '#000000' }: { color?: string }) => (
  <Svg width="20" height="20" viewBox="0 0 384 512">
    <Path fill={color} d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </Svg>
);

export default function LoginScreen() {
  const { theme, isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          
          <View style={styles.headerSection}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            <View style={styles.titleRow}>
              <Text variant="h1" color={theme.primary} style={{letterSpacing: -1}}>HealthTrack </Text>
              <Text variant="h1" color={theme.info} style={{letterSpacing: -1}}>AI</Text>
            </View>
            <Text variant="bodyLarge" color={theme.textSecondary} style={{marginTop: Spacing.sm}}>
              Sign in to your account
            </Text>
          </View>

          <View style={styles.formSection}>
            <Input 
              placeholder="Email or Phone" 
              leftIcon={<Feather name="mail" size={20} color={theme.textSecondary} />}
            />
            
            <Input 
              placeholder="Password" 
              secureTextEntry={!showPassword}
              leftIcon={<Feather name="lock" size={20} color={theme.textSecondary} />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye-off" : "eye"} size={20} color={theme.textSecondary} />
                </TouchableOpacity>
              }
            />
            
            <View style={{alignItems: 'flex-end', marginBottom: Spacing.xl, marginTop: -Spacing.sm}}>
              <Text variant="bodyLarge" color={theme.primary} style={{fontWeight: '600'}} onPress={() => router.push('/(auth)/forgot-password')}>
                Forgot Password?
              </Text>
            </View>

            <Button title="Sign In" onPress={() => router.replace('/(tabs)' as any)} />
          </View>

          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            <Text variant="body" color={theme.textSecondary} style={{paddingHorizontal: Spacing.sm}}>or continue with</Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
          </View>

          <View style={styles.socialButtons}>
            <Button 
              title="Google" 
              variant="outline" 
              style={{flex: 1, marginRight: Spacing.sm, borderColor: theme.border}} 
              icon={<GoogleLogo />} 
            />
            <Button 
              title="Apple" 
              variant="outline" 
              style={{flex: 1, marginLeft: Spacing.sm, borderColor: theme.border}} 
              icon={<AppleLogo color={isDark ? '#FFFFFF' : '#000000'} />} 
            />
          </View>

          <View style={styles.footerSection}>
            <Text variant="bodyLarge" color={theme.textSecondary}>Don&apos;t have an account? </Text>
            <Text variant="bodyLarge" color={theme.primary} style={{fontWeight: '600'}} onPress={() => router.push('/(auth)/profile-setup')}>
              Sign Up
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { 
    flexGrow: 1,
    padding: Spacing.lg,
    justifyContent: 'center'
  },
  headerSection: { 
    alignItems: 'center', 
    marginBottom: Spacing.xxl,
    marginTop: Spacing.xxl
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: -10
  },
  titleRow: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    width: '100%'
  },
  dividerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: Spacing.xl 
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA'
  },
  socialButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: Spacing.xl
  }
});
