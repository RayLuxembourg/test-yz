<script setup lang="ts">
import { computed } from 'vue'
import { type QueryResultData, type Cell } from '@sisense/sdk-data'
import { sortOptions, getColumnIndexMap, type CellData, type ColumnIndexMap } from './common'
import { useState } from '../../../hooks/useState'
import GalleryCell from './GalleryCell.vue'
import Toolbar from './Toolbar.vue'
import DropdownMenu from './DropdownMenu.vue'

const props = defineProps<{
  data: QueryResultData
  onClick: (cellData: CellData) => void
  sortOptions: { value: string; text: string }[]
  sortCellsFn: (dataColumns: ColumnIndexMap, data: QueryResultData, sortBy: string) => Cell[][]
}>()

const [applyLimitFilter, setApplyLimitFilter] = useState(false)
const [applyEdgeFilter, setApplyEdgeFilter] = useState(false)
const [applyCenterFilter, setApplyCenterFilter] = useState(false)
const [applyRandomFilter, setApplyRandomFilter] = useState(false)
const [cellSize] = useState({ height: 210, width: 200 })
const [sortBy, setSortBy] = useState<string>(sortOptions[0].value)

const dataWithRowId = {
  columns: [...props.data.columns, { name: '$cellId', type: 'string' }],
  rows: props.data.rows.map((row, index) => [...row, { data: `${index}` }])
}

const dataColumns = getColumnIndexMap(dataWithRowId)
const yieldIndex = 3
const zoneIndex = 4

const sortedData = computed(() => {
  const data = props
    .sortCellsFn(dataColumns, dataWithRowId, sortBy.value)
    .filter((row) => !applyLimitFilter.value || row[yieldIndex].data < 83.0);
    
  if (applyEdgeFilter.value || applyCenterFilter.value || applyRandomFilter.value) {
    return data.filter((row) => {
      const edge = applyEdgeFilter.value && row[zoneIndex].data === 'Edge'
      const center = applyCenterFilter.value && row[zoneIndex].data === 'Center'
      const random = applyRandomFilter.value && row[zoneIndex].data === 'Random'

      return edge || center || random;
    });
  }

  return data;
})
</script>

<template>
  <div>
    <Toolbar>
      <DropdownMenu label="Sort by" :onChange="setSortBy" :options="sortOptions" />
      <div :style="{ paddingLeft: '20px', paddingTop: '5px' }">
        <input
          type="checkbox"
          :checked="applyLimitFilter"
          :onChange="() => setApplyLimitFilter(!applyLimitFilter)"
        />
        <span class="p-2">Below 83.0% Hold Limit</span>
      </div>
      <div :style="{ paddingLeft: '20px', paddingTop: '5px', cursor: 'pointer' }">
        <input
          type="checkbox"
          :checked="applyEdgeFilter"
          :onChange="() => setApplyEdgeFilter(!applyEdgeFilter)"
        />
        <span class="p-2">Edge Issues</span>
      </div>
      <div :style="{ paddingLeft: '20px', paddingTop: '5px', cursor: 'pointer' }">
        <input
          type="checkbox"
          :checked="applyCenterFilter"
          :onChange="() => setApplyCenterFilter(!applyCenterFilter)"
        />
        <span class="p-2">Center Issues</span>
      </div>
      <div :style="{ paddingLeft: '20px', paddingTop: '5px', cursor: 'pointer' }">
        <input
          type="checkbox"
          :checked="applyRandomFilter"
          :onChange="() => setApplyRandomFilter(!applyRandomFilter)"
        />
        <span class="p-2">Random Issues</span>
      </div>
      <div
        :style="{ paddingLeft: '20px', paddingTop: '5px', color: 'blue', cursor: 'pointer' }"
        :onClick="
          () => {
            setApplyRandomFilter(false)
            setApplyCenterFilter(false)
            setApplyEdgeFilter(false)
            setApplyLimitFilter(false)
          }
        "
      >
        <span class="p-2">Clear</span>
      </div>
    </Toolbar>
    <div
      :style="{
        display: 'flex',
        flexFlow: 'row wrap'
      }"
    >
      <div
        v-for="cellData in sortedData"
        :id="`cellframe-${cellData[dataColumns.$cellId].data}`"
        :key="`cellframe-${cellData[dataColumns.$cellId].data}`"
        :style="{
          height: `${cellSize.height + 2}px`,
          width: `${cellSize.width + 2}px`
        }"
      >
        <GalleryCell
          :key="`cell${cellData[dataColumns.$cellId].data}`"
          :cellDataColumns="dataColumns"
          :cellData="cellData"
          :cellSize="cellSize"
          :onClick="onClick"
        />
      </div>
    </div>
  </div>
</template>
