<template>
  <div>
    <button
      class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
      @click="handleToggleTheme"
    >
      <span class="sr-only">Switch Theme</span>
      <Icon 
        v-if="darkMode" 
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

// Direct DOM manipulation for theme toggle
const darkMode = ref(false)

// Function to check if we're in dark mode
const checkDarkMode = () => {
  return document.documentElement.classList.contains('dark')
}

onMounted(() => {
  // Initialize dark mode state based on HTML class
  darkMode.value = checkDarkMode()
  
  // Also listen for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (localStorage.getItem('appearance') === 'system') {
      darkMode.value = e.matches
      updateDarkMode()
    }
  })
})

// Function to update the DOM with dark mode
const updateDarkMode = () => {
  // Update HTML class
  document.documentElement.classList.toggle('dark', darkMode.value)
  document.body.classList.toggle('dark', darkMode.value)
  
  // Force styles to recompute (may help with Tailwind)
  window.dispatchEvent(new Event('resize'))
}

const handleToggleTheme = () => {
  // Toggle the dark mode state
  darkMode.value = !darkMode.value
  
  // Apply changes to DOM
  updateDarkMode()
  
  // Store preference
  localStorage.setItem('appearance', darkMode.value ? 'dark' : 'light')
  
  // Additional method for ensuring stylesheet changes are recognized
  document.documentElement.style.colorScheme = darkMode.value ? 'dark' : 'light'
  
  console.log('Theme toggled to:', darkMode.value ? 'dark' : 'light')
  
  // Reload the page to ensure server-side rendering picks up the change
  // Comment this out if you want a smooth transition without reload
  // window.location.reload()
}
</script>
