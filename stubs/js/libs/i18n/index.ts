import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ar from './locales/ar.json';

// Type for our translation messages
type MessageSchema = typeof en;

// Create i18n instance
export const i18n = createI18n<[MessageSchema], 'en' | 'ar'>({
  legacy: false,
  locale: localStorage.getItem('kunafa-locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ar
  },
  globalInjection: true,
  pluralizationRules: {
    // Add any custom pluralization rules for Arabic or other languages
    ar: (choice, choicesLength) => {
      // Arabic has 6 plural forms
      if (choice === 0) return 0;
      if (choice === 1) return 1;
      if (choice === 2) return 2;
      if (choice >= 3 && choice <= 10) return 3;
      if (choice >= 11 && choice <= 99) return 4;
      return 5;
    }
  }
});

/**
 * Change the current locale
 * @param locale - The locale to change to ('en' or 'ar')
 */
export function changeLocale(locale: 'en' | 'ar'): void {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('kunafa-locale', locale);
}

/**
 * Get the current locale
 * @returns The current locale
 */
export function getCurrentLocale(): 'en' | 'ar' {
  return i18n.global.locale.value as 'en' | 'ar';
}

/**
 * Check if the current locale is RTL
 * @returns True if the current locale is RTL
 */
export function isRTL(): boolean {
  return getCurrentLocale() === 'ar';
}

// Initialize locale direction on first load
document.documentElement.dir = getCurrentLocale() === 'ar' ? 'rtl' : 'ltr';