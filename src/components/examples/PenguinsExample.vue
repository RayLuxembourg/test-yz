<script setup lang="ts">
import { filterFactory, measureFactory } from '@sisense/sdk-data'
import { Chart } from '@sisense/sdk-ui-vue'
import { useState } from '../../hooks/useState'
import {
  Cell,
  Table,
  HeadRow,
  EmptyCell,
  Head,
  Row,
  RowHead,
  TableWrapper
} from './wafermaps/styledComponents'
import * as DM from '../../data/penguins'

const [showCode, setShowCode] = useState(false)
const penguinMeasures = [
  measureFactory.average(DM.penguins.BodyMass, 'Body Mass'),
  measureFactory.average(DM.penguins.FlipperLength, 'Flipper Length'),
  measureFactory.average(DM.penguins.CulmenDepth, 'Culmen Depth'),
  measureFactory.average(DM.penguins.CulmenLength, 'Culmen Length')
]
const matrix = { x: penguinMeasures.map((m) => m.name), y: penguinMeasures.map((m) => m.name) }
const activeFilters = [filterFactory.members(DM.penguins.Sex, ['MALE', 'FEMALE'])]
</script>

<template>
  <div class="rounded-lg overflow-hidden p-4" style="background: white; font-size: smaller">
    <b>
      <h1>Scatter Plot Matrix of Penguin Features</h1>
    </b>
    <input
      style="margin-right: 10px; margin-left: 10px"
      type="checkbox"
      id="showCode"
      name="showCode"
      value="Show Code"
      :checked="showCode"
      :onChange="() => setShowCode(!showCode)"
    />
    <span style="font-size: 2em">What the heck is a Culmen?</span>
    <img v-if="showCode" src="/penguin-culmen.png" />
    <TableWrapper>
      <Table>
        <tbody>
          <HeadRow>
            <EmptyCell />
            <Head v-for="name in matrix.x" columns="4" :key="name">
              {{ name }}
            </Head>
          </HeadRow>
          <Row v-for="(measureX, indexX) in matrix.x" :key="indexX">
            <RowHead :key="measureX">{{ measureX }}</RowHead>
            <Cell v-for="(measureY, indexY) in matrix.y" :key="`${measureX}_${measureY}`">
              <Chart
                chartType="scatter"
                :dataSet="DM.DataSource"
                :filters="activeFilters"
                :dataOptions="{
                  x: penguinMeasures[indexX],
                  y: penguinMeasures[indexY],
                  breakByPoint: DM.penguins.SampleNumber,
                  breakByColor: DM.penguins.Sex
                }"
              />
            </Cell>
          </Row>
        </tbody>
      </Table>
    </TableWrapper>
  </div>
</template>
