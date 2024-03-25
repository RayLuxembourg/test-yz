<script setup lang="ts">
import { computed } from 'vue'
import { type Cell, filterFactory } from '@sisense/sdk-data'
import { useExecuteQuery } from '@sisense/sdk-ui-vue'
import { type CellData, type ColumnIndexMap, processResult } from './common'
import BinWaferMap from './BinWaferMap.vue';
import * as Semi from '../../../data/semiconductor-data'

const props = defineProps<{
  cellDataColumns: ColumnIndexMap
  cellData: Cell[]
  cellSize: { height: number; width: number }
  onClick: (cellData: CellData) => void
}>()

const lotNumber = props.cellData[props.cellDataColumns.LOT].data
const waferNumber = props.cellData[props.cellDataColumns.WAFER].data
const waferYield = props.cellData[props.cellDataColumns.YIELD].data
const zonalIssue = props.cellData[props.cellDataColumns.ZONAL_ISSUES].data

const { data, isSuccess } = useExecuteQuery({
  dataSource: 'Semiconductor Data',
  dimensions: [
    Semi.wafer_sort_bin_data.X_COORD,
    Semi.wafer_sort_bin_data.Y_COORD,
    Semi.wafer_sort_bin_data.BIN_NUMBER,
    Semi.wafer_sort_bin_data.LOT,
    Semi.wafer_sort_bin_data.WAFER,
    Semi.wafer_sort_bin_data.DEVICE,
    Semi.wafer_sort_yield_summary.YIELD,
    Semi.wafer_sort_bin_data.SERIAL
  ],
  filters: [
    filterFactory.members(Semi.wafer_sort_bin_data.LOT, [`${lotNumber}`]),
    filterFactory.members(Semi.wafer_sort_bin_data.WAFER, [`${waferNumber}`])
  ]
});

const waferBinData = computed(() => processResult(data.value));

function onCellClick() {
  props.onClick({ columns: props.cellDataColumns, cells: props.cellData })
}
</script>

<template>
  <div @click="onCellClick">
    <BinWaferMap
      v-if="isSuccess"
      :key="`binmap-${lotNumber}-${waferNumber}-d3`"
      :title="`Wafer ${lotNumber}-${waferNumber}: ${waferYield}% ${zonalIssue}`"
      :waferBinData="waferBinData"
      :height="cellSize.height"
      :width="cellSize.width"
    />
  </div>
</template>
