<template>
  <DefaultLayout>
    <Head :title="t('dashboard.title')" />

    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
      <div class="p-6 text-gray-900 dark:text-gray-100">
        {{ t('dashboard.welcome_message') }}
      </div>
    </div>

    <!-- Dashboard Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ t('dashboard.statistics') }}
        </h3>
        <div class="text-3xl font-bold text-primary-600">
          {{ t('dashboard.dashboard_stats') }}
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ t('dashboard.recent_activity') }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('dashboard.activity_description') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ t('dashboard.quick_actions') }}
        </h3>
        <div class="space-y-2">
          <button class="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            {{ t('dashboard.action_one') }}
          </button>
          <button class="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            {{ t('dashboard.action_two') }}
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import DefaultLayout from '@/layouts/default.vue';
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

interface PageProps {
  user: User;
}

defineProps<PageProps>();

const { t } = useI18n();
</script>