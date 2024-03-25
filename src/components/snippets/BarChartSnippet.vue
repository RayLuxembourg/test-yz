<script setup lang="ts">
import { ref } from 'vue';
import { BarChart } from '@sisense/sdk-ui-vue';
import { exampleData } from './sample-data';

const barChartProps = ref({
  dataSet: exampleData.data,
  dataOptions: {
    category: [exampleData.years],
    value: [exampleData.quantity, exampleData.units],
    breakBy: [],
  }
});
</script>

<template>
  <BarChart v-bind="barChartProps" />
</template>


