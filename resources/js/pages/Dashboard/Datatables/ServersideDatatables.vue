<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// This serverData would come from the Laravel backend
const props = defineProps({
  serverData: Array
});

// Import the datatables component dynamically
const ServerSideDatatablesComponent = () => import('../../../dashboard/views/pages/datatables/ServerSideDatatables.vue');
</script>

<template>
  <Head title="Server Side Datatables" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <!-- Load the server-side datatables component with the server data -->
        <component :is="ServerSideDatatablesComponent" :serverData="serverData" />
      </template>
    </DefaultLayout>
  </div>
</template>