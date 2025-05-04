<template>
  <div>
    <button
      class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
      @click="toggleTheme"
    >
      <span class="sr-only">Switch Theme</span>
      <Icon 
        v-if="isDarkMode" 
        icon="ph:sun-bold"
        class="text-slate-500 dark:text-slate-400"
      />
      <Icon 
        v-else 
        icon="ph:moon-bold"
        class="text-slate-500 dark:text-slate-400"
      />
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useAppearance } from '@/composables/useAppearance'

export default {
  name: 'ThemeToggle',
  components: {
    Icon
  },
  setup() {
    const { isDarkMode, toggleTheme } = useAppearance()

    return {
      isDarkMode,
      toggleTheme
    }
  }
}
</script>
