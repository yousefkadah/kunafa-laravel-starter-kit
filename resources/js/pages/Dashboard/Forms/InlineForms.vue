<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the forms component dynamically
const InlineFormsComponent = () => import('../../../dashboard/views/pages/forms/InlineForms.vue');
</script>

<template>
  <Head title="Inline Forms" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the inline forms component -->
        <component :is="InlineFormsComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>