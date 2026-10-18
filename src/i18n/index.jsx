import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import ru from './ru.json';
import en from './en.json';
import es from './es.json';
import zh from './zh.json';
import fr from './fr.json';
import ar from './ar.json';
import id from './id.json';

const translations = { ru, en, es, zh, fr, ar, id };

const LANGUAGES = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'id', name: 'Bahasa', flag: '🇮🇩', dir: 'ltr' },
];

/** Languages fully supported in the CRM panel */
const CRM_LANGUAGES = LANGUAGES.filter((l) =>
  ['ru', 'en', 'es', 'fr', 'zh'].includes(l.code)
);

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[1];

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = currentLang.dir;
    
    if (lang === 'ar') {
      document.body.style.fontFamily = "var(--font-arabic)";
    } else {
      document.body.style.fontFamily = "var(--font-body)";
    }
  }, [lang, currentLang.dir]);

  const t = useCallback((key, replacements = {}) => {
    const keys = key.split('.');

    const resolve = (locale) => {
      let value = translations[locale];
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k];
        } else {
          return undefined;
        }
      }
      return value;
    };

    let value = resolve(lang) ?? (lang !== 'en' ? resolve('en') : undefined);

    if (typeof value !== 'string') {
      return key;
    }

    if (Object.keys(replacements).length > 0) {
      return Object.entries(replacements).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, v),
        value
      );
    }

    return value;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, languages: LANGUAGES, currentLang, dir: currentLang.dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}

export { LANGUAGES, CRM_LANGUAGES };
