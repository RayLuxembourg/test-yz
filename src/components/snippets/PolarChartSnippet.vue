<script setup lang="ts">
import { ref } from 'vue'
import { PolarChart } from '@sisense/sdk-ui-vue'
import { exampleData } from './sample-data'

const polarChartProps = ref({
  dataSet: exampleData.data,
  dataOptions: {
    category: [exampleData.years],
    value: [exampleData.quantity, exampleData.units],
    breakBy: []
  }
})
</script>

<template>
  <PolarChart v-bind="polarChartProps" />
</template>
