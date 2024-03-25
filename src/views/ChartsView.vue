<script setup lang="ts">
import Article from '../components/shared/Article.vue';
import Paragraph from '../components/shared/Paragraph.vue';
import CodeBlock from '../components/shared/CodeBlock.vue';
import SubTitle from '../components/shared/SubTitle.vue';
import Divider from '../components/shared/Divider.vue';
import BarChartExample from '../components/examples/BarChartExample.vue';
import ColumnChartExample from '../components/examples/ColumnChartExample.vue';
import LineChartExample from '../components/examples/LineChartExample.vue';
import AreaChartExample from '../components/examples/AreaChartExample.vue';
import PieChartExample from '../components/examples/PieChartExample.vue';
import ScatterChartExample from '../components/examples/ScatterChartExample.vue';
import PolarChartExample from '../components/examples/PolarChartExample.vue';
import FunnelChartExample from '../components/examples/FunnelChartExample.vue';
import IndicatorChartExample from '../components/examples/IndicatorChartExample.vue';
import SampleDataExample from '../components/examples/SampleDataExample.vue';
</script>

<template>
  <Article
      title="Chart Components"
      description="The following components accept measures and attributes, perform the execution, and render data as a chart, table or KPI."
    >
      <SampleDataExample />
      <Divider />
      <BarChartExample />
      <Divider />
      <ColumnChartExample />
      <Divider />
      <LineChartExample />
      <Divider />
      <AreaChartExample />
      <Divider />
      <PieChartExample />
      <Divider />
      <ScatterChartExample />
      <Divider />
      <PolarChartExample />
      <Divider />
      <FunnelChartExample />
      <Divider />
      <IndicatorChartExample />
    </Article>
</template>
