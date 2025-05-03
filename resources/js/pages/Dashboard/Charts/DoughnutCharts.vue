<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the charts component dynamically
const DoughnutChartsComponent = () => import('../../../dashboard/views/pages/charts/DoughnutCharts.vue');
</script>

<template>
  <Head title="Doughnut Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the doughnut charts component -->
        <component :is="DoughnutChartsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>