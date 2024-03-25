<script setup lang="ts">
import { ref } from 'vue';
import { IndicatorChart } from '@sisense/sdk-ui-vue';

const indicatorData = ref({
  columns: [
    {
      name: "Total Cost",
      type: "number",
    },
    {
      name: "Total Revenue",
      type: "number",
    },
    {
      name: "min",
      type: "number",
    },
    {
      name: "max",
      type: "number",
    },
  ],
  rows: [[107.27, 38.76, 0, 255]],
});

const indicatorDataOptions = ref({
  value: [
    {
      name: "Total Cost",
      aggregation: "sum",
    },
  ],
  secondary: [
    {
      name: "Total Revenue",
      aggregation: "sum",
    },
  ],
  min: [{ name: "min" }],
  max: [{ name: "max" }],
});

const indicatorComponents = {
  title: {
    shouldBeShown: true,
    text: "Total Cost",
  },
  secondaryTitle: {
    text: "Total Revenue",
  },
  ticks: {
    shouldBeShown: true,
  },
  labels: {
    shouldBeShown: true,
  },
};

const numericSimpleIndicatorStyleOptions = ref({
  subtype: "indicator/numeric",
  skin: "horizontal",
  numericSubtype: "numericSimple",
  indicatorComponents,
});

const numericBarIndicatorStyleOptions = ref({
  subtype: "indicator/numeric",
  numericSubtype: "numericBar",
  indicatorComponents
});

const gaugeIndicatorStyleOptions = ref({
  subtype: "indicator/gauge",
  skin: 1,
  indicatorComponents
});
</script>

<template>
  <div style="height: 250px">
    <IndicatorChart
      :dataSet="indicatorData"
      :dataOptions="indicatorDataOptions"
      :styleOptions="numericSimpleIndicatorStyleOptions"
    />
  </div>
  <div style="height: 250px">
    <IndicatorChart
      :dataSet="indicatorData"
      :dataOptions="indicatorDataOptions"
      :styleOptions="numericBarIndicatorStyleOptions"
    />
  </div>
  <div style="height: 350px">
    <IndicatorChart
      :dataSet="indicatorData"
      :dataOptions="indicatorDataOptions"
      :styleOptions="gaugeIndicatorStyleOptions"
    />
  </div>
</template>


