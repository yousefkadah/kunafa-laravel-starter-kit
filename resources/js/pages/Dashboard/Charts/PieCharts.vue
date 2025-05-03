<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the charts component dynamically
const PieChartsComponent = () => import('../../../dashboard/views/pages/charts/PieCharts.vue');
</script>

<template>
  <Head title="Pie Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the pie charts component -->
        <component :is="PieChartsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>