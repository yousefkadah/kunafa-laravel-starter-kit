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
      <span class="sr-only">Notifications</span>
      <svg class="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-current text-slate-500 dark:text-slate-400" d="M6.5 0C2.91 0 0 2.91 0 6.5s2.91 6.5 6.5 6.5S13 10.09 13 6.5 10.09 0 6.5 0zM6 9V5h1v4H6zm0-6v1h1V3H6z"/>
      </svg>
      <div class="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
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
        class="origin-top-right z-10 absolute top-full ltr:right-0 rtl:left-0 -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1"
      >
        <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">Notifications</div>
        <ul>
          <li class="border-b border-slate-200 dark:border-slate-700 last:border-0">
            <a
              class="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20"
              href="#0"
              @click="dropdownOpen = false"
            >
              <span class="block text-sm mb-2">
                📣 <span class="font-medium text-slate-800 dark:text-slate-100">New version released</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
              <span class="block text-xs font-medium text-slate-400 dark:text-slate-500">Jan 24, 2024</span>
            </a>
          </li>
          <!-- Add more notification items here -->
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'DropdownNotifications',
  setup() {
    const dropdownOpen = ref(false)
    const trigger = ref(null)

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
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    return {
      dropdownOpen,
      trigger
    }
  }
}
</script>
