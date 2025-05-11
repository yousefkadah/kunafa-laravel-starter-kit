<template>
  <div>
    <button
      class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
      @click="toggleMode"
    >
      <span class="sr-only">Switch Theme</span>
      <Icon 
        v-if="isDarkMode" 
        icon="fluent:dark-theme-20-filled"
        class="text-slate-500 dark:text-slate-400"
      />
      <Icon 
        v-else 
        icon="ph:sun-light"
        class="text-slate-500 dark:text-slate-400"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

// Simple dark mode state
const isDarkMode = ref(document.documentElement.classList.contains('dark'))

// Simple toggle function that uses the global toggleTheme function
function toggleMode() {
  if (window.toggleTheme) {
    // The global function handles everything and returns the new state
    isDarkMode.value = window.toggleTheme();
  }
}

// Update component when theme changes from elsewhere
function onThemeChange(event) {
  if (event && event.detail) {
    isDarkMode.value = event.detail.isDark;
  }
}

onMounted(() => {
  // Set initial state
  isDarkMode.value = document.documentElement.classList.contains('dark');
  
  // Listen for theme change events
  window.addEventListener('theme-changed', onThemeChange);
  
  // Also set up direct DOM observation as a fallback
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'class') {
        isDarkMode.value = document.documentElement.classList.contains('dark');
      }
    }
  });
  
  observer.observe(document.documentElement, { attributes: true });
  
  // Store for cleanup
  window._themeObserver = observer;
})

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener('theme-changed', onThemeChange);
  
  // Clean up observer
  if (window._themeObserver) {
    window._themeObserver.disconnect();
  }
})
</script>
