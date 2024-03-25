<script setup lang="ts">
import { ref } from 'vue'
import { LineChart } from '@sisense/sdk-ui-vue'
import { exampleData } from './sample-data'

const lineChartProps = ref({
  dataSet: exampleData.data,
  dataOptions: {
    category: [exampleData.years],
    value: [exampleData.quantity, { column: exampleData.units, showOnRightAxis: true }],
    breakBy: []
  },
  styleOptions: {
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
  <LineChart v-bind="lineChartProps" />
</template>
