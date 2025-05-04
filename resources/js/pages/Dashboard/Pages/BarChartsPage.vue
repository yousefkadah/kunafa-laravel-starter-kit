<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DefaultLayout from '@/layouts/default.vue';
import BarCharts from '@pages/Dashboard/Charts/BarCharts.vue';
import SelectedLanguage from '@services/LanguageService.js';

const { langDirection } = SelectedLanguage();

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    label: 'Sales',
    data: [65, 59, 80, 81, 56, 55],
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
    borderWidth: 1
  }]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
});
</script>

<template>
  <Head title="Bar Charts" />
  
  <div :dir="langDirection">
    <DefaultLayout>
      <template #content>
        <div class="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 class="font-semibold text-slate-800 dark:text-slate-100">Bar Chart</h2>
          </header>
          <div class="p-4">
            <BarCharts
              :chartData="chartData"
              :chartOptions="chartOptions"
            />
          </div>
        </div>
      </template>
    </DefaultLayout>
  </div>
</template>
