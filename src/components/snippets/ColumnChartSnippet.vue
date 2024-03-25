<script setup lang="ts">
import { ref } from 'vue'
import { ColumnChart } from '@sisense/sdk-ui-vue'
import { exampleData } from './sample-data'

const columnChartProps = ref({
  dataSet: exampleData.data,
  dataOptions: {
    category: [exampleData.years],
    value: [exampleData.quantity, { column: exampleData.units, showOnRightAxis: true }],
    breakBy: []
  },
  styleOptions: {
    legend: {
      position: 'right'
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
  <ColumnChart v-bind="columnChartProps" />
</template>
