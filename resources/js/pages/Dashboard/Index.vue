<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '@/layouts/default.vue';
import SelectedLanguage from '@services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Use defineAsyncComponent for proper handling of dynamic imports
const MainDashboard = defineAsyncComponent(() => 
  import('@pages/Dashboard/MainDashboard.vue')
);

// This is where you'd typically fetch your data from Laravel backend
// For example:
// const props = defineProps({
//   stats: Object,
//   recentOrders: Array,
//   // etc...
// });
</script>

<template>
  <Head title="Dashboard" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Use the properly imported component -->
        <MainDashboard />
      </template>
    </DefaultLayout>
  </div>
</template>
