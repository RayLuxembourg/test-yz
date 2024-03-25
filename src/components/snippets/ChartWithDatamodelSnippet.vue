<script setup lang="ts">
import { ref } from 'vue';
import { Chart } from '@sisense/sdk-ui-vue';
import { measureFactory } from '@sisense/sdk-data';
import * as DM from './sample-ecommerce';

const dataOptions = ref({
  category: [DM.Commerce.Date.Years],
  value: [measureFactory.sum(DM.Commerce.Revenue, 'Revenue')],
  breakBy: [DM.Commerce.Gender]
});
</script>

<template>
  <Chart chartType="line" :dataOptions="dataOptions" :dataSet="DM.DataSource" />
</template>
