<script setup lang="ts">
import { ref } from 'vue'
import { ScatterChart } from '@sisense/sdk-ui-vue'
import { exampleData } from './sample-data'

const scatterChartProps = ref({
  dataSet: exampleData.data,
  dataOptions: {
    x: exampleData.units,
    y: exampleData.quantity,
    breakByPoint: exampleData.group,
    breakByColor: exampleData.years,
    size: exampleData.returns
  }
})
</script>

<template>
  <ScatterChart v-bind="scatterChartProps" />
</template>
