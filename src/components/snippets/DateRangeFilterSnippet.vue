<script setup lang="ts">
import { ref } from 'vue';
import { Chart, DateRangeFilterTile } from '@sisense/sdk-ui-vue';
import { filterFactory, measureFactory, type Filter } from "@sisense/sdk-data";
import * as DM from './sample-ecommerce';

const dateRangeFilter = ref(filterFactory.dateRange(DM.Commerce.Date.Days))

function updateFilter(filter: Filter) {
  dateRangeFilter.value = filter;
}
</script>

<template>
  <DateRangeFilterTile
    title="Date Range"
    :dataSource="DM.DataSource"
    :attribute="DM.Commerce.Date.Days"
    :filter="dateRangeFilter"
    :onChange="updateFilter"
  />
  <Chart
    chartType="line"
    :dataSet="DM.DataSource"
    :dataOptions="{
      category: [DM.Commerce.Date.Months],
      value: [measureFactory.sum(DM.Commerce.Revenue, 'Revenue')],
      breakBy: [DM.Commerce.Gender]
    }"
    :filters="[dateRangeFilter]"
  />
</template>


