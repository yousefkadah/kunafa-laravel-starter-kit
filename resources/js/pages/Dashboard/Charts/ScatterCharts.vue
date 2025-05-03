<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the charts component dynamically
const ScatterChartsComponent = () => import('../../../dashboard/views/pages/charts/ScatterCharts.vue');
</script>

<template>
  <Head title="Scatter Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the scatter charts component -->
        <component :is="ScatterChartsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>