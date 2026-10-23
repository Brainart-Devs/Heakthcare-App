import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { Text, Header } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AIscreen() {
  const { theme, isDark } = useTheme();
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your AI Health Assistant. I can help you understand your readings, track your progress, answer general health questions and prepare reports for your doctor." }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input.trim() }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm a prototype! I don't have a real AI connected right now, but I'll be able to help you soon." }]);
    }, 1000);
  };

  const handleSuggestion = (text: string) => {
    setMessages([...messages, { sender: 'user', text }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm a prototype! I don't have a real AI connected right now, but I'll be able to help you soon." }]);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title={t('aiAssistant', 'AI Health Assistant')} onBack={() => router.push('/')} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={{alignItems: 'center', marginBottom: Spacing.xl, marginTop: Spacing.md}}>
            <View style={[styles.botIcon, { backgroundColor: theme.primary, shadowColor: theme.primary }]}>
              <MaterialCommunityIcons name="robot-outline" size={32} color="#FFFFFF" />
            </View>
            <Text style={{color: theme.primary, fontWeight: '600', fontSize: 16, marginTop: Spacing.sm}}>Your Personal Health Companion</Text>
          </View>
          
          {messages.map((msg, i) => {
            const isUser = msg.sender === 'user';
            return (
              <View 
                key={i} 
                style={[
                  styles.bubble, 
                  isUser ? styles.bubbleUser : [styles.bubbleAI, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }],
                  isUser && { backgroundColor: theme.primary }
                ]}
              >
                <Text style={{fontSize: 16, lineHeight: 24, color: isUser ? '#FFFFFF' : theme.text}}>
                  {msg.text}
                </Text>
              </View>
            );
          })}
          
          {messages.length === 1 && (
            <View style={styles.suggestionsContainer}>
              <Text variant="caption" style={{color: theme.textSecondary, marginBottom: Spacing.sm, marginLeft: 4}}>Suggested questions</Text>
              
              <TouchableOpacity 
                style={[styles.suggestionPill, { backgroundColor: theme.card, borderColor: theme.border }]} 
                onPress={() => handleSuggestion('Explain my last 7 days sugar trend')}
              >
                <Text style={[styles.suggestionText, { color: theme.primary }]}>Explain my last 7 days sugar trend</Text>
                <Feather name="arrow-up-right" size={18} color={theme.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.suggestionPill, { backgroundColor: theme.card, borderColor: theme.border }]} 
                onPress={() => handleSuggestion('Is my blood pressure normal?')}
              >
                <Text style={[styles.suggestionText, { color: theme.primary }]}>Is my blood pressure normal?</Text>
                <Feather name="arrow-up-right" size={18} color={theme.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.suggestionPill, { backgroundColor: theme.card, borderColor: theme.border }]} 
                onPress={() => handleSuggestion('What should I eat for breakfast?')}
              >
                <Text style={[styles.suggestionText, { color: theme.primary }]}>What should I eat for breakfast?</Text>
                <Feather name="arrow-up-right" size={18} color={theme.primary} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        
        {/* Custom Chat Input Area */}
        <View style={[styles.inputContainer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
          <View style={[styles.inputWrapper, { backgroundColor: isDark ? '#334155' : '#F4F4F6' }]}>
            <TextInput
              style={[styles.textInput, { color: theme.text }]}
              placeholder="Ask anything about your health..."
              placeholderTextColor={theme.textSecondary}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={200}
            />
            <TouchableOpacity 
              style={[styles.sendBtn, !input.trim() && { backgroundColor: isDark ? '#475569' : '#E5E5EA' }]} 
              onPress={send}
              disabled={!input.trim()}
            >
              <Feather name="send" size={18} color={input.trim() ? "#FFFFFF" : theme.textSecondary} style={input.trim() ? {marginLeft: -2, marginTop: 2} : {}} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: Spacing.lg, paddingBottom: 40 },
  botIcon: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: '#16449C', 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#16449C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  bubble: { 
    padding: Spacing.lg, 
    borderRadius: 20, 
    marginBottom: Spacing.md, 
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1
  },
  bubbleAI: { 
    backgroundColor: '#FFFFFF', 
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  bubbleUser: { 
    backgroundColor: '#16449C', 
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  suggestionsContainer: { 
    marginTop: Spacing.xl,
    paddingTop: Spacing.md
  },
  suggestionPill: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E5FAFA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1
  },
  suggestionText: {
    color: '#16449C',
    fontWeight: '500',
    fontSize: 15,
    flex: 1
  },
  inputContainer: { 
    padding: Spacing.md, 
    backgroundColor: '#FFFFFF', 
    borderTopWidth: 1, 
    borderTopColor: '#F0F0F3' 
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F4F4F6',
    borderRadius: 24,
    paddingLeft: Spacing.lg,
    paddingRight: 6,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    minHeight: 36,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
    color: '#111827',
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0EADF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginBottom: 0
  }
});
