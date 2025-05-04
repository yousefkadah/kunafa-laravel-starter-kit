<template>
  <div>
    <button
      class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
      @click="handleToggleTheme"
      :disabled="isToggling"
    >
      <span class="sr-only">Switch Theme</span>
      <Icon 
        v-if="isDark" 
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
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// Track dark mode state
const isDark = ref(false)
const isToggling = ref(false)

// Function to check current theme state
const checkDarkMode = () => {
  return document.documentElement.classList.contains('dark')
}

// Function to handle theme toggle with improved reliability
function handleToggleTheme() {
  if (isToggling.value || window.isTogglingTheme) return;
  
  isToggling.value = true;
  
  if (window.toggleTheme) {
    // Call the global toggle function
    isDark.value = window.toggleTheme()
  } else {
    // Fallback implementation if global function not available
    const currentIsDark = checkDarkMode()
    document.documentElement.classList.toggle('dark', !currentIsDark)
    document.body.classList.toggle('dark', !currentIsDark)
    localStorage.setItem('appearance', !currentIsDark ? 'dark' : 'light')
    isDark.value = !currentIsDark
  }
  
  // Allow clicks again after a short delay
  setTimeout(() => {
    isToggling.value = false;
  }, 200);
}

onMounted(() => {
  // Initialize dark mode state based on HTML class
  isDark.value = checkDarkMode()
  
  // Listen for theme changes from other components
  document.documentElement.addEventListener('themechange', (event) => {
    isDark.value = event.detail.theme === 'dark'
  })
  
  // Also listen for class changes directly on the HTML element
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        isDark.value = checkDarkMode()
      }
    })
  })
  
  observer.observe(document.documentElement, { attributes: true })
})
</script>
