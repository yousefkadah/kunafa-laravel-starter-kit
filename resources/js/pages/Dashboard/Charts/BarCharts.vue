<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the charts component dynamically
const BarChartsComponent = () => import('../../../dashboard/views/pages/charts/BarCharts.vue');
</script>

<template>
  <Head title="Bar Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the bar charts component -->
        <component :is="BarChartsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>