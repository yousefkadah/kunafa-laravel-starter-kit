<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../dashboard/layouts/default.vue';
import SelectedLanguage from '../../../dashboard/services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();

// Sample data for the table
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Editor' },
]);
</script>

<template>
  <Head title="Basic Datatables" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <h1 class="text-2xl font-bold text-slate-800 mb-4">Basic Data Tables</h1>
          
          <div class="bg-white shadow-lg rounded-sm border border-slate-200 p-6">
            <div class="overflow-x-auto">
              <table class="table-auto w-full">
                <thead class="text-xs font-semibold uppercase text-slate-500 bg-slate-50">
                  <tr>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">ID</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Name</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Email</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Role</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-sm divide-y divide-slate-100">
                  <tr v-for="user in users" :key="user.id">
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left">{{ user.id }}</div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="font-medium text-slate-800">{{ user.name }}</div>
                      </div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left">{{ user.email }}</div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left">{{ user.role }}</div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-center space-x-2">
                        <button class="text-blue-600 hover:text-blue-900">Edit</button>
                        <button class="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </DefaultLayout>
  </div>
</template>