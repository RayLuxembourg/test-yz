<script setup lang="ts">
import { ref } from 'vue'
import { AreaChart } from '@sisense/sdk-ui-vue'
import { exampleData } from './sample-data'

const areaChartProps = ref({
  dataSet: exampleData.data,
  dataOptions: {
    category: [exampleData.years],
    value: [
      { ...exampleData.quantity, color: 'lightsteelblue' },
      { ...exampleData.units, color: 'lightslategray' }
    ],
    breakBy: []
  },
  styleOptions: {
    subtype: 'area/stacked',
    legend: {
      position: 'top'
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Year'
      }
    },
    yAxis: {
      title: {
        enabled: true,
        text: 'Quantity'
      }
    },
    y2Axis: {
      title: {
        enabled: true,
        text: 'Units'
      },
      enabled: true
    }
  }
})
</script>

<template>
  <AreaChart v-bind="areaChartProps" />
</template>
