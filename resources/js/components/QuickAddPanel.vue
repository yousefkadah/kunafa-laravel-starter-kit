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
      <span class="sr-only">Quick Add</span>
      <Icon icon="mdi:plus" class="text-slate-500 dark:text-slate-400" />
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
        <ul>
          <li>
            <Link
              class="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex items-center py-1 px-3"
              href="#0"
              @click="dropdownOpen = false"
            >
              <Icon icon="mdi:plus-circle" class="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              <span>New Project</span>
            </Link>
          </li>
          <li>
            <Link
              class="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex items-center py-1 px-3"
              href="#0"
              @click="dropdownOpen = false"
            >
              <Icon icon="mdi:account-plus" class="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              <span>New User</span>
            </Link>
          </li>
          <li>
            <Link
              class="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex items-center py-1 px-3"
              href="#0"
              @click="dropdownOpen = false"
            >
              <Icon icon="mdi:note-plus" class="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              <span>New Task</span>
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
import { Icon } from '@iconify/vue'

export default {
  name: 'QuickAddPanel',
  components: {
    Link,
    Icon
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
      trigger
    }
  }
}
</script>
