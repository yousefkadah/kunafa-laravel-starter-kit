<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the charts component dynamically
const BubbleChartsComponent = () => import('../../../dashboard/views/pages/charts/BubbleCharts.vue');
</script>

<template>
  <Head title="Bubble Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the bubble charts component -->
        <component :is="BubbleChartsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>