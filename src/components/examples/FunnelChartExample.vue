<script setup lang="ts">
import Paragraph from '../shared/Paragraph.vue';
import CodeBlock from '../shared/CodeBlock.vue';
import SubTitle from '../shared/SubTitle.vue';
import Header from '../shared/Header.vue';
import ButtonGroup from '../shared/ButtonGroup.vue';
import FunnelChartSnippet from '../snippets/FunnelChartSnippet.vue';
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
const codeSnippet = useGetRawFile('/src/components/snippets/FunnelChartSnippet.vue');
</script>

<template>
  <article className="my-8 w-full" id="funnel">
    <Header>
      <div className="flex flex-col mr-4 flex-1">
        <SubTitle id="funnel">Funnel chart</SubTitle>
        <Paragraph>
          Funnel charts are used to visualize a progressive reduction of
          data as it passes from one phase to another. The chart is
          organized into segments that represent stages in a process.
        </Paragraph>
      </div>
      <ButtonGroup
        :selected="viewNavigator.selectedView.value"
        :labels="viewNavigator.views"
        :onChange="viewNavigator.selectView"
      />
    </Header>
    <div v-if="viewNavigator.selectedView.value === Views.PREVIEW" style="height: 400px;">
      <FunnelChartSnippet />
    </div>
    <CodeBlock
      language="html"
      :showLineNumber="true"
      v-if="viewNavigator.selectedView.value === Views.VUE">
      {{codeSnippet}}
    </CodeBlock>
  </article>
</template>


