<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the forms component dynamically
const TabsFormsComponent = () => import('../../../dashboard/views/pages/forms/TabsForms.vue');
</script>

<template>
  <Head title="Tabs Forms" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the tabs forms component -->
        <component :is="TabsFormsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>