<script setup lang="ts">
import { ref } from 'vue';
import { Chart, MemberFilterTile } from '@sisense/sdk-ui-vue';
import { filterFactory, measureFactory, type Filter } from "@sisense/sdk-data";
import * as DM from './sample-ecommerce';

const categoryFilter = ref<Filter | null>(filterFactory.dateRange(DM.Commerce.Date.Days))

function updateFilter(filter: Filter | null) {
  categoryFilter.value = filter;
}
</script>

<template>
  <MemberFilterTile
    title="Category"
    :dataSource="DM.DataSource"
    :attribute="DM.Category.Category"
    :filter="categoryFilter"
    :onChange="updateFilter"
  />
  <Chart
    chartType="line"
    :dataSet="DM.DataSource"
    :dataOptions="{
      category: [DM.Category.Category],
      value: [measureFactory.sum(DM.Commerce.Revenue, 'Revenue')],
      breakBy: []
    }"
    :filters="categoryFilter ? [categoryFilter] : []"
  />
</template>


