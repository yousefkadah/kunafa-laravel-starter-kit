<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the datatables component dynamically
const SortableDatatablesComponent = () => import('../../../dashboard/views/pages/datatables/SortableDatatables.vue');
</script>

<template>
  <Head title="Sortable Datatables" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the sortable datatables component -->
        <component :is="SortableDatatablesComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>