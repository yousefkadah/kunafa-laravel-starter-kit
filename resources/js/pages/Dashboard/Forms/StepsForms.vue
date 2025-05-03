<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the forms component dynamically
const StepsFormsComponent = () => import('../../../dashboard/views/pages/forms/StepsForms.vue');
</script>

<template>
  <Head title="Steps Forms" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the steps forms component -->
        <component :is="StepsFormsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>