<script setup lang="ts">
import { ref, computed } from 'vue'
import { measureFactory, filterFactory, type Filter } from '@sisense/sdk-data'
import { IndicatorChart, ChartWidget, MemberFilterTile } from '@sisense/sdk-ui-vue'
import {
  type NumberFormatConfig,
  type IndicatorStyleOptions,
  type StackableStyleOptions,
  type ScatterStyleOptions,
  type LineStyleOptions
} from '@sisense/sdk-ui'
import * as DM from './sample-ecommerce'

const numberFormat: NumberFormatConfig = {
  name: 'Numbers',
  decimalScale: 2,
  trillion: true,
  billion: true,
  million: true,
  kilo: true,
  thousandSeparator: true,
  prefix: false,
  symbol: '$'
}

const seriesToColorMap = {
  Female: '#00cee6',
  Male: '#9b9bd7',
  Unspecified: '#6eda55'
}

const getIndicatorStyleOptions = (title: string, secondaryTitle = ''): IndicatorStyleOptions => {
  return {
    indicatorComponents: {
      title: {
        shouldBeShown: true,
        text: title
      },
      secondaryTitle: {
        text: secondaryTitle
      },
      ticks: {
        shouldBeShown: true
      },
      labels: {
        shouldBeShown: true
      }
    },
    subtype: 'indicator/gauge',
    skin: 1
  }
}

const barStyleOptions: StackableStyleOptions = {
  subtype: 'bar/stacked'
}

const scatterStyleOptions: ScatterStyleOptions = {
  xAxis: {
    logarithmic: true
  },
  yAxis: {
    logarithmic: true
  }
}

const lineChartStyleOptions: LineStyleOptions = {
  subtype: 'line/spline',
  lineWidth: { width: 'bold' },
  yAxis: {
    title: { enabled: true, text: 'SALES' }
  },
  y2Axis: {
    enabled: true,
    title: { enabled: true, text: 'QUANTITY' }
  },
  markers: {
    enabled: true,
    fill: 'hollow'
  }
}

const drilldownOptions = {
  drilldownCategories: [DM.Commerce.AgeRange, DM.Commerce.Gender, DM.Commerce.Condition]
}

const yearFilter = ref<null | Filter>(
  filterFactory.members(DM.Commerce.Date.Years, ['2013-01-01T00:00:00'])
)
const countryFilter = ref<null | Filter>(null)

const activeFilters = computed<Filter[]>(() => {
  return [yearFilter, countryFilter].map((f) => f.value).filter((f) => !!f) as Filter[]
})

const barActiveFilters = computed<Filter[]>(() => {
  return [
    ...activeFilters.value,
    filterFactory.topRanking(DM.Category.Category, DM.Measures.SumRevenue, 3)
  ].filter((f) => !!f)
})

const pieActiveFilters = computed<Filter[]>(() => {
  return [
    ...activeFilters.value,
    filterFactory.members(DM.Commerce.Gender, ['Male', 'Female'])
  ].filter((f) => !!f)
})

const scatterActiveFilters = computed<Filter[]>(() => {
  return [
    ...activeFilters.value,
    filterFactory.members(DM.Commerce.Gender, ['Male', 'Female']),
    filterFactory.topRanking(DM.Category.Category, DM.Measures.SumRevenue, 10)
  ].filter((f) => !!f)
})

function updateYearFilter(filter: Filter | null) {
  yearFilter.value = filter
}

function updateCountryFilter(filter: Filter | null) {
  countryFilter.value = filter
}
</script>

<template>
  <div className="xl:grid xl:grid-cols-dashboard xl:grid-rows-dashboard my-4 p-2  shadow-2xl">
    <div
      id="filters"
      className="border-b-2 xl:col-start-10 xl:col-end-10 xl:row-span-4 py-2 px-3 xl:border-2"
    >
      <h2 className="text-xl mb-2">Filters</h2>
      <div className="grid justify-center xl:grid-cols-1 gap-2">
        <MemberFilterTile
          :onChange="updateCountryFilter"
          title="Countries"
          :filter="countryFilter"
          :attribute="DM.Country.Country"
        />
        <MemberFilterTile
          :onChange="updateYearFilter"
          title="Years"
          :filter="yearFilter"
          :attribute="DM.Commerce.Date.Years"
        />
      </div>
    </div>
    <div
      className="border-b-2  indicators xl:col-span-1 xl:row-start-1 xl:row-span-4 xl:w-[200px] xl:border-2"
    >
      <div className="h-[200px] w-full border-b-2">
        <IndicatorChart
          :dataOptions="{
            value: [
              {
                column: DM.Measures.SumRevenue,
                numberFormatConfig: numberFormat
              }
            ],
            secondary: [],
            min: [measureFactory.constant(0)],
            max: [measureFactory.constant(125000000)]
          }"
          :filters="activeFilters"
          :styleOptions="getIndicatorStyleOptions('Total Revenue')"
        />
      </div>
      <div className="h-[200px] border-b-2">
        <IndicatorChart
          :dataOptions="{
            value: [DM.Measures.Quantity],
            secondary: [],
            min: [measureFactory.constant(0)],
            max: [measureFactory.constant(250000)]
          }"
          :filters="activeFilters"
          :styleOptions="getIndicatorStyleOptions('Total Units Sold')"
        />
      </div>
      <div className="h-[200px] border-b-2">
        <IndicatorChart
          :dataOptions="{
            value: [measureFactory.countDistinct(DM.Commerce.VisitID)],
            secondary: [],
            min: [measureFactory.constant(0)],
            max: [measureFactory.constant(100000)]
          }"
          :filters="activeFilters"
          :styleOptions="getIndicatorStyleOptions('Total Sales')"
        />
      </div>
      <div className="h-[200px]">
        <IndicatorChart
          :dataOptions="{
            value: [measureFactory.countDistinct(DM.Brand.BrandID)],
            secondary: [],
            min: [measureFactory.constant(0)],
            max: [measureFactory.constant(2500)]
          }"
          :filters="activeFilters"
          :styleOptions="getIndicatorStyleOptions('Total Brands')"
        />
      </div>
    </div>
    <div
      className="border-b-2 c4 xl:col-start-2 xl:col-end-6 xl:row-start-1 xl:row-span-2 xl:border-2"
    >
      <ChartWidget
        title="REVENUE vs.UNITS SOLD"
        :dataSource="DM.DataSource"
        chartType="line"
        :filters="activeFilters"
        :dataOptions="{
          category: [
            {
              column: DM.Commerce.Date.Months,
              dateFormat: 'yy-MM'
            }
          ],
          value: [
            DM.Measures.SumRevenue,
            {
              column: DM.Measures.Quantity,
              showOnRightAxis: true,
              chartType: 'column'
            }
          ],
          breakBy: []
        }"
        :styleOptions="lineChartStyleOptions"
        :drilldownOptions="drilldownOptions"
      />
    </div>
    <div
      className="border-b-2  c5 xl:col-start-6 xl:col-end-10 xl:row-start-1 xl:row-span-2 xl:border-2"
    >
      <ChartWidget
        title="TOP CATEGORIES BY REVENUE, UNITS SOLD AND GENDER"
        chartType="scatter"
        :dataSource="DM.DataSource"
        :filters="scatterActiveFilters"
        :dataOptions="{
          x: DM.Measures.SumRevenue,
          y: DM.Measures.Quantity,
          breakByPoint: DM.Category.Category,
          breakByColor: DM.Commerce.Gender,
          size: DM.Measures.SumCost,
          seriesToColorMap
        }"
        :styleOptions="scatterStyleOptions"
      />
    </div>
    <div
      className="border-b-2  c3 xl:col-start-6 xl:col-end-10 xl:row-start-3 xl:row-span-2 xl:border-2"
    >
      <ChartWidget
        title="TOP 3 CATEGORIES BY REVENUE AND AGE"
        chartType="bar"
        :dataSource="DM.DataSource"
        :filters="barActiveFilters"
        :dataOptions="{
          category: [DM.Commerce.AgeRange],
          value: [DM.Measures.SumRevenue],
          breakBy: [DM.Category.Category]
        }"
        :styleOptions="barStyleOptions"
        :drilldownOptions="drilldownOptions"
      />
    </div>
    <div
      className="border-b-2  c1 xl:col-start-2 xl:col-end-4 xl:row-start-3 xl:row-span-2 xl:border-2"
    >
      <ChartWidget
        title="GENDER BREAKDOWN"
        chartType="pie"
        :dataSource="DM.DataSource"
        :filters="pieActiveFilters"
        :dataOptions="{
          category: [DM.Commerce.Gender],
          value: [DM.Measures.SumRevenue]
        }"
        :styleOptions="scatterStyleOptions"
      />
    </div>

    <div
      className="border-b-2  c2 xl:col-start-4 xl:col-end-6 xl:row-start-3 xl:row-span-2 xl:border-2"
    >
      <ChartWidget
        title="AGE RANGE BREAKDOWN"
        chartType="pie"
        :dataSource="DM.DataSource"
        :filters="pieActiveFilters"
        :dataOptions="{
          category: [DM.Commerce.AgeRange],
          value: [DM.Measures.SumRevenue]
        }"
        :styleOptions="scatterStyleOptions"
      />
    </div>
  </div>
</template>
