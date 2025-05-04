<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
      :class="{ 'bg-slate-200': dropdownOpen }"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="sr-only">Choose Language</span>
      <Icon 
        :icon="currentLocaleDetails.icon" 
        class="text-slate-500 dark:text-slate-400"
      />
    </button>

    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="origin-top-right z-10 absolute top-full ltr:right-0 rtl:left-0 min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1"
      >
        <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">
          Select Language
        </div>
        <ul>
          <li v-for="locale in availableLocales" :key="locale.code">
            <button
              class="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex items-center w-full py-1 px-3"
              @click="changeLanguage(locale.code)"
            >
              <Icon :icon="locale.icon" class="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              <span>{{ locale.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { detectRTL } from '../services/LanguageService.js'

export default {
  name: 'LanguageSwitcher',
  components: {
    Icon
  },
  emits: ['language-changed'],
  setup(props, { emit }) {
    const { locale } = useI18n()
    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const selectedLanguage = ref(localStorage.getItem('locale') || 'en')

    const availableLocales = [
      { code: 'en', name: 'English', icon: 'flag:gb-4x3' },
      { code: 'ar', name: 'العربية', icon: 'flag:sa-4x3' }
    ]

    const currentLocaleDetails = computed(() => {
      return availableLocales.find(l => l.code === locale.value) || availableLocales[0]
    })

    // Apply the direction based on the current language
    const applyDirection = (langCode) => {
      const isRTL = detectRTL(langCode);
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = langCode;
      return isRTL;
    };

    const changeLanguage = (lang) => {
      selectedLanguage.value = lang;
      
      // Save language in localStorage
      localStorage.setItem('locale', lang);
      
      // Apply the direction
      applyDirection(lang);
      
      // Update i18n locale
      locale.value = lang;
      
      emit('language-changed', lang);
      dropdownOpen.value = false;
    }

    // Close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || trigger.value.contains(target)) return
      dropdownOpen.value = false
    }

    // Close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    onMounted(() => {
      // Apply direction on initial load based on the saved language
      applyDirection(selectedLanguage.value);
      
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    return {
      dropdownOpen,
      trigger,
      availableLocales,
      currentLocaleDetails,
      changeLanguage
    }
  }
}
</script>
