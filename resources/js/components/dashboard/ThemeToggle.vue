<template>
  <div>
    <button
      class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
      @click="toggleTheme"
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
import { ref, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'

// Use reactive state for dark mode
const isDark = ref(false)

// Update the isDark state when the component mounts
onMounted(() => {
  // Initialize based on HTML class
  isDark.value = document.documentElement.classList.contains('dark')
  
  // Listen for changes to the HTML class
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        isDark.value = document.documentElement.classList.contains('dark')
      }
    })
  })
  
  // Start observing
  observer.observe(document.documentElement, { attributes: true })
})

// Function to toggle the theme
function toggleTheme() {
  // Call the global toggle function we added to app.ts
  if (window.toggleTheme) {
    isDark.value = window.toggleTheme()
  }
}
</script>
