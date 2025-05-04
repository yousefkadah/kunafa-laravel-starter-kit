<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '../../../layouts/default.vue';
import SelectedLanguage from '../../../services/LanguageService.js';

// Get language direction from the language service
const { currentLanguage, langDirection } = SelectedLanguage();
</script>

<template>
  <Head title="Object Forms" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <h1 class="text-2xl font-bold text-slate-800 mb-4">Object Forms</h1>
          <div class="bg-white shadow-lg rounded-sm border border-slate-200 p-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="name">Name</label>
                <input id="name" class="form-input w-full" type="text" placeholder="Enter your name" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="email">Email</label>
                <input id="email" class="form-input w-full" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="message">Message</label>
                <textarea id="message" class="form-textarea w-full" rows="4" placeholder="Enter your message"></textarea>
              </div>
              <div class="flex items-center justify-end">
                <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DefaultLayout>
  </div>
</template>