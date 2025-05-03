<script setup lang="ts">
import { computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import KunafaLogo from '@/components/layouts/components/KunafaLogo.vue';
import Sidebar from '@/components/layouts/components/Sidebar.vue';
import Header from '@/components/layouts/components/Header.vue';

interface Props {
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
});

const { t } = useI18n();

const pageTitle = computed(() => props.title || t('dashboard.title'));
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-white dark:bg-slate-900">
    <Head :title="pageTitle" />

    <!-- Sidebar -->
    <Sidebar />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <Header />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-2xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
