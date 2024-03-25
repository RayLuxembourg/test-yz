<script setup lang="ts">
import { ref } from 'vue'
import { PieChart } from '@sisense/sdk-ui-vue'
import { exampleData } from './sample-data'

const pieChartProps = ref({
  dataSet: exampleData.data,
  dataOptions: {
    category: [exampleData.years],
    value: [exampleData.units]
  },
  styleOptions: {
    legend: {
      position: 'left'
    }
  }
})
</script>

<template>
  <PieChart v-bind="pieChartProps" />
</template>
