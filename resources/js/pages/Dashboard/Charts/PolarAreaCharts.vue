<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the charts component dynamically
const PolarAreaChartsComponent = () => import('../../../dashboard/views/pages/charts/PolarAreaCharts.vue');
</script>

<template>
  <Head title="Polar Area Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the polar area charts component -->
        <component :is="PolarAreaChartsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>