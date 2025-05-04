<template>
  <div class="flex h-screen overflow-hidden bg-background text-foreground" :class="{ 'dark': isDarkMode }">

    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="p-6 m-2">
        <slot name="content" />
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue';
import Sidebar from '../components/dashboard/Sidebar.vue'
import Header from '../components/dashboard/Header.vue'
import { useAppearance } from '../composables/useAppearance'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    Header,
  },
  setup() {
    const sidebarOpen = ref(false)
    const { isDarkMode } = useAppearance()

    return {
      sidebarOpen,
      isDarkMode
    }
  }
}
</script>
