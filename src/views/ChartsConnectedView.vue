<script setup lang="ts">
import Article from '../components/shared/Article.vue';
import Divider from '../components/shared/Divider.vue';
import ExecuteQueryChartExample from '../components/examples/ExecuteQueryChartExample.vue';
import ChartWithDatamodelExample from '../components/examples/ChartWithDatamodelExample.vue';
</script>

<template>
  <Article
      title="Queried Charts"
      description="The following examples render charts using data queried from a data model. The examples cover different ways we can achieve this."
    >
      <ExecuteQueryChartExample />
      <Divider />
      <ChartWithDatamodelExample />
    </Article>
</template>
