<script setup lang="ts">
import Paragraph from '../shared/Paragraph.vue';
import CodeBlock from '../shared/CodeBlock.vue';
import SubTitle from '../shared/SubTitle.vue';
import Header from '../shared/Header.vue';
import ButtonGroup from '../shared/ButtonGroup.vue';
import LineChartSnippet from '../snippets/LineChartSnippet.vue';
import { useViewNavigator } from '../../hooks/useViewNavigator';
import { useGetRawFile } from '../../hooks/useGetRawFile';

enum Views {
  PREVIEW = 'Preview',
  VUE = 'Vue'
}
const viewNavigator = useViewNavigator({
  selectedView: Views.PREVIEW,
  views: [Views.PREVIEW, Views.VUE]
})
const codeSnippet = useGetRawFile('/src/components/snippets/LineChartSnippet.vue');
</script>

<template>
  <article className="my-8 w-full" id="line">
    <Header>
      <div className="flex flex-col mr-4 flex-1">
        <SubTitle id="line">Line chart</SubTitle>
        <Paragraph>
          A line chart is a type of chart that displays information as a
          series of data points connected by straight line segments. It is
          similar to a scatter plot except that the measurement points are
          ordered (typically by their x-axis value) and joined with straight
          line segments. A line chart is often used to visualize a trend
          over a period of time, a relationship between two variables, or to
          show the correlation between two variables.
        </Paragraph>
      </div>
      <ButtonGroup
        :selected="viewNavigator.selectedView.value"
        :labels="viewNavigator.views"
        :onChange="viewNavigator.selectView"
      />
    </Header>
    <div v-if="viewNavigator.selectedView.value === Views.PREVIEW" style="height: 400px;">
      <LineChartSnippet />
    </div>
    <CodeBlock
      language="html"
      :showLineNumber="true"
      v-if="viewNavigator.selectedView.value === Views.VUE">
      {{codeSnippet}}
    </CodeBlock>
  </article>
</template>


