<script setup lang="ts">
import Paragraph from '../shared/Paragraph.vue';
import CodeBlock from '../shared/CodeBlock.vue';
import SubTitle from '../shared/SubTitle.vue';
import Header from '../shared/Header.vue';
import ButtonGroup from '../shared/ButtonGroup.vue';
import ColumnChartSnippet from '../snippets/ColumnChartSnippet.vue';
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
const codeSnippet = useGetRawFile('/src/components/snippets/ColumnChartSnippet.vue');
</script>

<template>
  <article className="my-8 w-full" id="column">
    <Header>
      <div className="flex flex-col mr-4 flex-1">
        <SubTitle id="column">Column chart</SubTitle>
        <Paragraph>
          A column chart is a type of chart that uses vertical bars to
          represent data values. Similar to a bar chart, the length of each
          column corresponds to the value it represents. In this example all
          axes have been labeled and the legend has been placed on the right
          using chart style options.
        </Paragraph>
      </div>
      <ButtonGroup
        :selected="viewNavigator.selectedView.value"
        :labels="viewNavigator.views"
        :onChange="viewNavigator.selectView"
      />
    </Header>
    <div v-if="viewNavigator.selectedView.value === Views.PREVIEW" style="height: 400px;">
      <ColumnChartSnippet />
    </div>
    <CodeBlock
      language="html"
      :showLineNumber="true"
      v-if="viewNavigator.selectedView.value === Views.VUE">
      {{codeSnippet}}
    </CodeBlock>
  </article>
</template>


