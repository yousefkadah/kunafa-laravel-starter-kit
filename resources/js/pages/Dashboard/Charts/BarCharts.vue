<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false
    })
  }
})

const chartCanvas = ref(null)
let chart = null

onMounted(() => {
  if (chartCanvas.value) {
    chart = new ChartJS(chartCanvas.value, {
      type: 'bar',
      data: props.chartData,
      options: props.chartOptions
    })
  }
})

watch(() => props.chartData, (newData) => {
  if (chart) {
    chart.data = newData
    chart.update()
  }
}, { deep: true })
</script>

<template>
  <div class="w-full h-80">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
