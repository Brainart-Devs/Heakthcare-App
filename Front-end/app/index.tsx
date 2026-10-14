import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function SplashScreen() {
  const { theme, isDark } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background Gradient simulating the wave */}
      <LinearGradient 
        colors={isDark ? ['#0F172A', '#0F172A', '#082F49', '#0369A1'] : ['#FFFFFF', '#FFFFFF', '#E5FAFA', '#CCF5F5']} 
        style={StyleSheet.absoluteFill}
        locations={[0, 0.4, 0.7, 1]}
      />
      
      <View style={styles.content}>
        
        {/* Logo Area */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          
          <View style={styles.titleRow}>
            <Text variant="h1" color={theme.primary} style={{letterSpacing: -1}}>HealthTrack </Text>
            <Text variant="h1" color={theme.info} style={{letterSpacing: -1}}>AI</Text>
          </View>
          
          <Text variant="bodyLarge" align="center" color={theme.textSecondary} style={{marginTop: Spacing.sm}}>
            {'Track Today\nFor a Healthier Tomorrow'}
          </Text>
        </View>

        {/* 3 Circular Features */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0, shadowColor: theme.primary }]}>
              <FontAwesome5 name="pills" size={24} color={theme.primary} />
            </View>
            <Text variant="caption" align="center" color={theme.text} style={{marginTop: Spacing.sm, fontWeight: '600'}}>Track</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0, shadowColor: theme.secondary }]}>
              <MaterialCommunityIcons name="shield-check-outline" size={28} color={theme.secondary} />
            </View>
            <Text variant="caption" align="center" color={theme.text} style={{marginTop: Spacing.sm, fontWeight: '600'}}>Understand</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDark ? 1 : 0, shadowColor: theme.info }]}>
              <MaterialCommunityIcons name="robot-outline" size={28} color={theme.info} />
            </View>
            <Text variant="caption" align="center" color={theme.text} style={{marginTop: Spacing.sm, fontWeight: '600'}}>Stay on Track{'\n'}with AI</Text>
          </View>
        </View>
        
        {/* Buttons Bottom */}
        <View style={styles.bottomSection}>
          <Button 
            title="Get Started" 
            onPress={() => router.push('/(auth)/profile-setup' as any)} 
            style={{marginBottom: Spacing.md}} 
          />
          <Button 
            title="Sign In" 
            variant="outline" 
            onPress={() => router.push('/(auth)/login' as any)} 
          />
          
          <Text variant="caption" align="center" color={theme.textSecondary} style={{marginTop: Spacing.lg}}>
            Better Health for You and{'\n'}Your Family
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: 60, // Adjusted top padding
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 160, // Slightly larger
    height: 160,
    marginBottom: -20, // Negative margin to eat the transparent padding of the image
  },
  titleRow: {
    flexDirection: 'row',
    marginTop: 10, // Controlled tight spacing
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginTop: 30, // Space above features
    marginBottom: 40, // Force space below features so they don't hit the button
  },
  featureItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingHorizontal: 2,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  bottomSection: {
    width: '100%',
  },
});
