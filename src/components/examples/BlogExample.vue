<script setup lang="ts">
import { computed } from 'vue'
import { filterFactory, measureFactory, type Filter } from '@sisense/sdk-data'
import { Chart, MemberFilterTile } from '@sisense/sdk-ui-vue'
import { type DataPoint } from '@sisense/sdk-ui'
import { useState } from '../../hooks/useState';
import * as DM from '../snippets/sample-ecommerce'

const [yearFilter, setYearFilter] = useState<Filter | null>(
  filterFactory.members(DM.Commerce.Date.Years, [])
)
const [genderFilter, setGenderFilter] = useState<Filter | null>(
  filterFactory.members(DM.Commerce.Gender, [])
)
const activeFilters = computed<Filter[]>(() => [
  yearFilter.value!,
  genderFilter.value!,
  filterFactory.greaterThan(DM.Commerce.Revenue, 0)
])

function onDataPointClick(point: DataPoint) {
  const yearValue = `${point.categoryValue}`
  if (yearValue) {
    setYearFilter(filterFactory.members(DM.Commerce.Date.Years, [yearValue]))
  }
}
</script>

<template>
  <div class="blog" style="background: white">
    <article>
      <h1 style="text-align: center; margin: 2rem 0 1.5rem; font-size: 3rem; font-weight: bold">
        Data Analysis Article
      </h1>
      <p>
        This is article demonstration of how the Data Analysis components can contribute to the
        content. It includes a variety of charts and graphs that are used to visualize data, with a
        narrative that provides interpretation of the data.
      </p>
      <section style="margin: 2rem 0">
        <h2>Quantity by Year based on gender</h2>
        <Chart
          chartType="bar"
          :dataSet="DM.DataSource"
          :dataOptions="{
            category: [DM.Commerce.Date.Years],
            value: [measureFactory.sum(DM.Commerce.Quantity)],
            breakBy: [DM.Commerce.Gender]
          }"
        />
        <p>
          The bar chart above illustrates the quantity by year generated based on gender. It clearly
          shows the distribution of quantity among different years and genders
        </p>
      </section>
      <section style="margin: 2rem 0">
        <h2>Revenue broken by Gender</h2>
        <Chart
          chartType="line"
          :dataSet="DM.DataSource"
          :dataOptions="{
            category: [DM.Commerce.Date.Years],
            value: [measureFactory.sum(DM.Commerce.Revenue)],
            breakBy: [DM.Commerce.Gender]
          }"
        />
        <p>
          The line chart above represents the revenue generated over the years. It demonstrates the
          growth trend, with revenue steadily increasing from 2021 to 2023. This data indicates a
          positive business trajectory and potential for future growth.
        </p>
      </section>
      <section style="margin: 2rem 0">
        <h2>Revenue by Year and Gender with filtering</h2>
        <div style="display: flex">
          <div style="margin-right: 16px">
            <MemberFilterTile
              title="Filter by year"
              :attribute="DM.Commerce.Date.Years"
              :filter="yearFilter"
              :onChange="setYearFilter"
            />
          </div>
          <div>
            <MemberFilterTile
              title="Gender"
              :attribute="DM.Commerce.Gender"
              :filter="genderFilter"
              :onChange="setGenderFilter"
            />
          </div>
        </div>
        <hr style="margin: 16px" />
        <Chart
          chartType="column"
          :dataSet="DM.DataSource"
          :filters="activeFilters"
          :dataOptions="{
            category: [DM.Commerce.Date.Years],
            value: [measureFactory.sum(DM.Commerce.Revenue)],
            breakBy: [DM.Commerce.AgeRange]
          }"
          :onDataPointClick="onDataPointClick"
        />
        <p>
          The column chart above showcases the revenue generated based on different year and gender.
          It helps visualize how revenue is distributed across specific gender. This data can be
          used to identify profitable year and gender and tailor marketing strategies accordingly
          with the possibility to filter the data.
        </p>
      </section>
    </article>
  </div>
</template>

<style scoped>
.blog article {
  padding: 2rem;
  width: 764px;
  max-width: 100%;
  margin: 0 auto;
  font-family: source-serif-pro, Georgia, Cambria, 'Times New Roman', Times, serif;
}
.blog p {
  margin: 1rem 0;
}

.blog h2 {
  margin: 2rem 0 1rem;
  font-size: 2rem;
}
</style>
