<script setup lang="ts">
import { ref } from 'vue'
import { FunnelChart } from '@sisense/sdk-ui-vue'

const dataSet = {
  columns: [
    { name: "Stage", type: "string" },
    { name: "Unique Users", type: "number" },
  ],
  rows: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
};

const funnelChartProps = ref({
  dataSet,
  dataOptions: {
    category: [
      {
        name: 'Stage',
        type: 'string'
      }
    ],
    value: [
      {
        name: 'Unique Users',
        aggregation: 'sum'
      }
    ]
  }
})
</script>

<template>
  <FunnelChart v-bind="funnelChartProps" />
</template>
