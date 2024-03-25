<script setup lang="ts">
import { filterFactory } from '@sisense/sdk-data'
import * as Semi from '../../../data/semiconductor-data'
import { useExecuteQuery } from '@sisense/sdk-ui-vue'
import { type CellData, sortOptions, sortCells } from './common';
import Gallery from './Gallery.vue';

const props = defineProps<{
  lotNumber?: string
  onClick: (cellData: CellData) => void
}>()

const { data } = useExecuteQuery({
  dataSource: Semi.DataSource,
  dimensions: [
    Semi.wafer_sort_bin_data.DEVICE,
    Semi.wafer_sort_bin_data.LOT,
    Semi.wafer_sort_bin_data.WAFER,
    Semi.wafer_sort_yield_summary.YIELD,
    Semi.wafer_sort_yield_summary.ZONAL_ISSUES
  ],
  filters: props.lotNumber
    ? [filterFactory.members(Semi.wafer_sort_bin_data.LOT, [`${props.lotNumber}`])]
    : []
})
</script>

<template>
  <div v-if="data?.rows?.length === 0">No Results Found</div>
  <Gallery
    v-if="data"
    :data="data"
    :onClick="onClick"
    :sortOptions="sortOptions"
    :sortCellsFn="sortCells"
  />
</template>
