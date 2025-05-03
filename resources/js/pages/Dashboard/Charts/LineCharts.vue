<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the charts component dynamically
const LineChartsComponent = () => import('../../../dashboard/views/pages/charts/LineCharts.vue');
</script>

<template>
  <Head title="Line Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the line charts component -->
        <component :is="LineChartsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>