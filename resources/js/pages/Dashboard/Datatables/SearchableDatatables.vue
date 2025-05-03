<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Import the datatables component dynamically
const SearchableDatatablesComponent = () => import('../../../dashboard/views/pages/datatables/SearchableDatatables.vue');
</script>

<template>
  <Head title="Searchable Datatables" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the searchable datatables component -->
        <component :is="SearchableDatatablesComponent" />
      </template>
    </DefaultLayout>
  </div>
</template>