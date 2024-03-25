<script setup lang="ts">
import { ref } from 'vue'
import { Chart } from '@sisense/sdk-ui-vue';
import { filterFactory, measureFactory, type Filter } from '@sisense/sdk-data'
import * as DM from './sample-ecommerce'

const topRankFilter = ref<Filter>(
  filterFactory.topRanking(DM.Category.Category, measureFactory.sum(DM.Commerce.Revenue), 10)
)
const shouldApplyFilter = ref(false)
</script>

<template>
  <div>
    <input type="checkbox" :checked="shouldApplyFilter" @change="() => shouldApplyFilter = !shouldApplyFilter" />
    <span className="p-2">Top 10 Categories by Revenue</span>
  </div>
  <Chart
    chartType="bar"
    :dataSet="DM.DataSource"
    :dataOptions="{
      category: [DM.Category.Category],
      value: [{ column: measureFactory.sum(DM.Commerce.Revenue, 'Revenue'), sortType: 'sortDesc' }],
      breakBy: []
    }"
    :filters="shouldApplyFilter ? [topRankFilter] : []"
  />
</template>
