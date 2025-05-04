<template>
    <div class="w-full p-4 md:p-6 justify-center">
      <WelcomeGreeting />
      
      <div class="grid grid-cols-12 gap-4 md:gap-6 mb-8">
        <div class="col-span-12 xl:col-span-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <BarChartWidget />
            <LineChartWidget />
          </div>
        </div>
        
        <div class="col-span-12 xl:col-span-4">
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
            <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Dashboard Overview</h2>
            <p class="text-slate-600 dark:text-slate-300 mb-4">
              Welcome to your new dashboard. This is a starting point for your application.
            </p>
            <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg mb-2">
              <span class="font-medium">Total Users</span>
              <span class="font-bold">1,234</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg mb-2">
              <span class="font-medium">New Orders</span>
              <span class="font-bold">56</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <span class="font-medium">Revenue</span>
              <span class="font-bold">$12,345</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <div v-for="(stat, index) in stats" :key="index" 
             class="bg-white dark:bg-slate-800 shadow-lg rounded-2xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col">
          <h3 class="font-medium text-slate-500 dark:text-slate-400 mb-1">{{ stat.title }}</h3>
          <p class="text-2xl font-bold text-slate-800 dark:text-slate-100">{{ stat.value }}</p>
          <div class="flex items-center mt-2">
            <span :class="stat.change > 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-medium">
              {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
            </span>
            <span class="text-xs text-slate-500 ml-2">vs last month</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import WelcomeGreeting from '@pages/Dashboard/WelcomeGreeting.vue'
import BarChartWidget from '@pages/Dashboard/BarChartWidget.vue'
import LineChartWidget from '@pages/Dashboard/LineChartWidget.vue'

export default {
  name: 'MainDashboard',
  components: {
    WelcomeGreeting,
    BarChartWidget,
    LineChartWidget,
  },
  setup() {
    const sidebarOpen = ref(false)

    const menuOptions = [
      { text: 'Option 1', classes: 'font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3' },
      { text: 'Option 2', classes: 'font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3' },
      { text: 'Remove', classes: 'font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3' }
    ]
    
    // Sample statistics data
    const stats = ref([
      { title: 'Total Visits', value: '24,780', change: 12.5 },
      { title: 'Bounce Rate', value: '33.3%', change: -5.7 },
      { title: 'Average Time', value: '2m 56s', change: 8.2 },
      { title: 'Conversion Rate', value: '3.24%', change: 1.2 },
    ])

    return {
      sidebarOpen,
      menuOptions,
      stats
    }
  }
}
</script>
