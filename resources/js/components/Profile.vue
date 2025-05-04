<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <img class="w-8 h-8 rounded-full" :src="profileImage" :alt="username" />
      <div class="flex items-center truncate">
        <span class="truncate ltr:ml-2 rtl:mr-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{{ username }}</span>
        <svg class="w-3 h-3 shrink-0 ltr:ml-1 rtl:mr-1 fill-current text-slate-400" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </div>
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
        <div
          class="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700"
        >
          <div class="font-medium text-slate-800 dark:text-slate-100">{{ username }}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 italic">{{ role }}</div>
        </div>
        <ul>
          <li>
            <Link
              class="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
              href="/profile"
              as="button"
            >
              Profile & Settings
            </Link>
          </li>
          <li>
            <Link
              class="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
              :href="route('logout')"
              method="post"
              as="button"
            >
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { Link } from '@inertiajs/vue3'

export default {
  name: 'UserMenu',
  components: {
    Link
  },
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
      trigger,
      username: 'User Name', // Replace with actual user data
      role: 'Administrator', // Replace with actual role
      profileImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjEyMCIgZmlsbD0iI2U1ZTdlYiIvPjxwYXRoIGQ9Ik0xMjggNjRhNDAgNDAgMCAwIDAtNDAgNDAgNDAgNDAgMCAwIDAgNDAgNDAgNDAgNDAgMCAwIDAgNDAtNDAgNDAgNDAgMCAwIDAtNDAtNDB6bTAgMTEyYy0zMS4zNiAwLTkyIDE1LjY4LTkyIDQ4djMyaDIwOHYtMzJjMC0zMi4zMi02MC42NC00OC05Mi00OHoiIGZpbGw9IiM5Y2EzYWYiLz48L3N2Zz4=' // Base64 encoded default avatar
    }
  },
}
</script>
