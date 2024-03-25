<script setup lang="ts">
import { computed, type Ref } from 'vue'
import { type QueryResultData, type Filter, filterFactory, measureFactory } from '@sisense/sdk-data'
import {
  type StackableStyleOptions,
  type LineStyleOptions,
  type NumberFormatConfig
} from '@sisense/sdk-ui'
import { useExecuteQuery, BarChart, LineChart } from '@sisense/sdk-ui-vue'
import * as Semi from '../../../data/semiconductor-data'
import { type CellData, getColumnIndexMap, processResult } from './common'
import BinWaferMap from './BinWaferMap.vue'
import InfoComponent from './InfoComponent.vue'

const props = defineProps<{
  cellData: CellData
}>()

const seriesToColorMap = {
  '1': '#00FF00',
  '2': '#A3FD86',
  '3': '#54B989',
  '4': '#610F59',
  '5': '#8F8436',
  '6': '#6C57A0',
  '7': '#23F4D8',
  '8': '#157441',
  '9': '#A8F6FA',
  '10': '#42415E',
  '11': '#B4CF17',
  '12': '#0A2C38',
  '13': '#D56E47',
  '14': '#9A9A09',
  '15': '#08FA69',
  '16': '#1562A3',
  '17': '#EBEB98',
  '18': '#7119C9',
  '19': '#427631',
  '20': '#962C31',
  '21': '#DB7242',
  '22': '#C15251',
  '23': '#1E1AF9',
  '24': '#4B4A08',
  '25': '#56DDE5',
  '26': '#FFFF00'
}

const defaultNumberFormat: NumberFormatConfig = {
  name: 'Numbers',
  decimalScale: 'auto',
  trillion: true,
  billion: true,
  million: true,
  kilo: true,
  thousandSeparator: true,
  prefix: true,
  symbol: '$'
}

const binParetChartStyle: StackableStyleOptions = {
  xAxis: {
    title: {
      text: 'Fail Bin Qty',
      enabled: true
    }
  },
  legend: {
    enabled: false
  }
}

const xCoordLineChartStyle: LineStyleOptions = {
  xAxis: {
    title: {
      text: 'X Coordinate',
      enabled: true
    }
  },
  yAxis: {
    title: {
      text: 'Yield',
      enabled: true
    }
  },
  legend: {
    enabled: false
  },
  navigator: {
    enabled: false
  }
}

const yCoordLineChartStyle: LineStyleOptions = {
  xAxis: {
    title: {
      text: 'Y Coordinate',
      enabled: true
    }
  },
  yAxis: {
    title: {
      text: 'Yield',
      enabled: true
    }
  },
  legend: {
    enabled: false
  }
}

const passFailMeasure = measureFactory.average(Semi.wafer_sort_bin_data.PASS_FAIL, 'PASS_FAIL')
const countMeasure = measureFactory.count(Semi.wafer_sort_bin_data.SERIAL, 'SERIAL')

const lotNumber = computed(() => props.cellData.cells[props.cellData.columns.LOT].data)
const waferNumber = computed(() => props.cellData.cells[props.cellData.columns.WAFER].data)
const filters = computed(() => [
    filterFactory.members(Semi.wafer_sort_bin_data.LOT, [`${lotNumber.value}`]),
    filterFactory.members(Semi.wafer_sort_bin_data.WAFER, [`${waferNumber.value}`])
]) as Ref<Filter[]>

const { data, isSuccess } = useExecuteQuery({
  dataSource: Semi.DataSource,
  dimensions: [
    Semi.wafer_sort_bin_data.DEVICE,
    Semi.wafer_sort_bin_data.LOT,
    Semi.wafer_sort_bin_data.WAFER,
    Semi.wafer_sort_yield_summary.YIELD,
    Semi.wafer_sort_yield_summary.ZONAL_ISSUES,
    Semi.wafer_sort_bin_data.X_COORD,
    Semi.wafer_sort_bin_data.Y_COORD,
    Semi.wafer_sort_bin_data.BIN_NUMBER,
    Semi.sort_bins.BIN_NAME,
    Semi.wafer_sort_bin_data.SERIAL,
    Semi.wafer_sort_bin_data.PASS_FAIL,
    Semi.wafer_sort_bin_data.SERIAL
  ],
  filters
})

function adjustBarChartOptions(options: any) {
  if (options.plotOptions?.series) {
    options.plotOptions.series.groupPadding = 0
    options.plotOptions.series.pointPadding = 0
    options.plotOptions.series.grouping = false
  }
  return options
}

const infoData = computed(() => data.value && { ...data.value, rows: [data.value.rows[0]?.slice(0, 5)] })
const dataColumns = computed(() => data.value && getColumnIndexMap(data.value))
const actualLotNumber = computed(() => data.value && data.value.rows[0]?.[dataColumns.value.LOT].data)
const actualWaferNumber = computed(() => data.value && data.value.rows[0]?.[dataColumns.value.WAFER].data)
const waferYield = computed(() => data.value && data.value.rows[0]?.[dataColumns.value.YIELD].data)
const waferBinData = computed(() => data.value && processResult(data.value))
const barDataSet = computed(() => ({
  ...data.value,
  rows: data.value.rows.filter((row: QueryResultData['rows'][number]) => row[dataColumns.value.BIN_NUMBER].data !== 1)
}))
</script>

<template>
  <div style="height: 1371px">
    <div
      :style="{
        display: 'flex-inline',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'clip'
      }"
      v-if="isSuccess"
    >
      <div
        :style="{
          display: 'flex-inline',
          flexDirection: 'row',
          alignItems: 'stretch',
          overflow: 'clip'
        }"
      >
        <div
          :style="{
            display: 'inline-block',
            width: '25%'
          }"
        >
          <InfoComponent :data="infoData" :style="{ paddingTop: '20px', paddingLeft: '50px' }" />
          <BarChart
            :dataSet="barDataSet"
            :dataOptions="{
              category: [Semi.sort_bins.BIN_NAME],
              value: [{ column: countMeasure, sortType: 'sortDesc' }],
              breakBy: [Semi.wafer_sort_bin_data.BIN_NUMBER],
              seriesToColorMap
            }"
            :styleOptions="binParetChartStyle"
            :onBeforeRender="adjustBarChartOptions"
          />
        </div>
        <div
          :style="{
            alignItems: 'center',
            paddingLeft: '100px',
            width: '70%',
            display: 'inline-block',
            position: 'absolute',
            top: '140px',
            overflow: 'clip'
          }"
        >
          <BinWaferMap
            :title="`Wafer ${actualLotNumber}-${actualWaferNumber}: ${waferYield}%`"
            :waferBinData="waferBinData"
            :height="500"
            :width="500"
          />
        </div>
      </div>
      <div
        :style="{
          width: '80%',
          margin: 'auto',
          padding: '10px'
        }"
      >
        <LineChart
          :dataSet="data"
          :dataOptions="{
            category: [Semi.wafer_sort_bin_data.X_COORD],
            value: [
              {
                column: passFailMeasure,
                numberFormatConfig: {
                  ...defaultNumberFormat,
                  name: 'Percent'
                }
              }
            ],
            breakBy: []
          }"
          :styleOptions="xCoordLineChartStyle"
        />
      </div>
      <div
        :style="{
          width: '80%',
          margin: 'auto',
          padding: '10px'
        }"
      >
        <LineChart
          :dataSet="data"
          :dataOptions="{
            category: [Semi.wafer_sort_bin_data.Y_COORD],
            value: [
              {
                column: passFailMeasure,
                numberFormatConfig: {
                  ...defaultNumberFormat,
                  name: 'Percent'
                }
              }
            ],
            breakBy: []
          }"
          :styleOptions="yCoordLineChartStyle"
        />
      </div>
    </div>
  </div>
</template>
