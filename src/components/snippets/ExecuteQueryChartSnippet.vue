<script setup lang="ts">
import { ref } from 'vue';
import { useExecuteQuery, BarChart } from '@sisense/sdk-ui-vue';
import { measureFactory } from '@sisense/sdk-data';
import * as DM from './sample-ecommerce';

const dataOptions = ref({
  category: [DM.Commerce.Date.Years],
  value: [measureFactory.sum(DM.Commerce.Quantity, 'Total Quantity')],
  breakBy: []
});

const { data } = useExecuteQuery({
  dataSource: DM.DataSource,
  dimensions: [DM.Commerce.Date.Years],
  measures: [measureFactory.sum(DM.Commerce.Quantity, 'Total Quantity')]
});
</script>

<template>
  <BarChart v-if="data" :dataOptions="dataOptions" :dataSet="data" />
</template>
