<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the datatables component dynamically
const BasicDatatablesComponent = () => import('../../../dashboard/views/pages/datatables/BasicDatatables.vue');
</script>

<template>
  <Head title="Basic Datatables" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the basic datatables component -->
        <component :is="BasicDatatablesComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>