import React, { createContext, useContext, useState, useMemo } from 'react';
import { translations, SupportedLanguage } from '@/constants/translations';

export { SupportedLanguage };

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, defaultText?: string) => string;
  isUrdu: boolean;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string, defaultText?: string) => defaultText || key,
  isUrdu: false,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  const t = useMemo(() => {
    return (key: string, defaultText?: string): string => {
      const item = translations[key];
      if (item && item[language]) {
        return item[language];
      }
      return defaultText || key;
    };
  }, [language]);

  const isUrdu = language === 'ur';
  const isRTL = language === 'ur';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isUrdu, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
