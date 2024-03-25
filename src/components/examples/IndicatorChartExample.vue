<script setup lang="ts">
import Paragraph from '../shared/Paragraph.vue';
import CodeBlock from '../shared/CodeBlock.vue';
import SubTitle from '../shared/SubTitle.vue';
import Header from '../shared/Header.vue';
import ButtonGroup from '../shared/ButtonGroup.vue';
import IndicatorChartSnippet from '../snippets/IndicatorChartSnippet.vue';
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
const codeSnippet = useGetRawFile('/src/components/snippets/IndicatorChartSnippet.vue');
</script>

<template>
  <article className="my-8 w-full" id="indicator">
    <Header>
      <div className="flex flex-col mr-4 flex-1">
        <SubTitle id="indicator">Indicator chart</SubTitle>
        <Paragraph>
          The Indicator chart is a simple chart that displays a single value
          and a secondary value. It can be used to display a KPI or a
          comparison between two values.

          In order for the Indicator chart to render properly, the parent should contain height.
        </Paragraph>
      </div>
      <ButtonGroup
        :selected="viewNavigator.selectedView.value"
        :labels="viewNavigator.views"
        :onChange="viewNavigator.selectView"
      />
    </Header>
    <div v-if="viewNavigator.selectedView.value === Views.PREVIEW">
      <IndicatorChartSnippet />
    </div>
    <CodeBlock
      language="html"
      :showLineNumber="true"
      v-if="viewNavigator.selectedView.value === Views.VUE">
      {{codeSnippet}}
    </CodeBlock>
  </article>
</template>


