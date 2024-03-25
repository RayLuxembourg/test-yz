<script setup lang="ts">
import Paragraph from '../shared/Paragraph.vue';
import CodeBlock from '../shared/CodeBlock.vue';
import SubTitle from '../shared/SubTitle.vue';
import Header from '../shared/Header.vue';
import ButtonGroup from '../shared/ButtonGroup.vue';
import AreaChartSnippet from '../snippets/AreaChartSnippet.vue';
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
const codeSnippet = useGetRawFile('/src/components/snippets/AreaChartSnippet.vue');
</script>

<template>
  <article className="my-8 w-full" id="area">
    <Header>
      <div className="flex flex-col mr-4 flex-1">
        <SubTitle id="area">Area chart</SubTitle>
        <Paragraph>
          An area chart is a line chart with the area between the line and
          the x-axis filled with color. It is used to represent accumulated
          totals using numbers or percentages over time. This example specifies
          a color for each measure and uses the subtype style option to stack
          the two areas.
        </Paragraph>
      </div>
      <ButtonGroup
        :selected="viewNavigator.selectedView.value"
        :labels="viewNavigator.views"
        :onChange="viewNavigator.selectView"
      />
    </Header>
    <div v-if="viewNavigator.selectedView.value === Views.PREVIEW" style="height: 400px;">
      <AreaChartSnippet />
    </div>
    <CodeBlock
      language="html"
      :showLineNumber="true"
      v-if="viewNavigator.selectedView.value === Views.VUE">
      {{codeSnippet}}
    </CodeBlock>
  </article>
</template>


