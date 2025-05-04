<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '@/layouts/default.vue';
import LineCharts from '@pages/Dashboard/Charts/LineCharts.vue';
import SelectedLanguage from '@services/LanguageService.js';

const { langDirection } = SelectedLanguage();

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    label: 'Revenue',
    data: [30, 45, 35, 60, 55, 75],
    borderColor: '#4F46E5',
    tension: 0.3
  }]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
});
</script>

<template>
  <Head title="Line Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 class="font-semibold text-slate-800 dark:text-slate-100">Line Chart</h2>
          </header>
          <LineCharts
            :chartData="chartData"
            :chartOptions="chartOptions"
          />
        </div>
      </template>
    </DefaultLayout>
  </div>
</template>
