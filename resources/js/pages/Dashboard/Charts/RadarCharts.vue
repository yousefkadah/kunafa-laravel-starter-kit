<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the charts component dynamically
const RadarChartsComponent = () => import('../../../dashboard/views/pages/charts/RadarCharts.vue');
</script>

<template>
  <Head title="Radar Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the radar charts component -->
        <component :is="RadarChartsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>