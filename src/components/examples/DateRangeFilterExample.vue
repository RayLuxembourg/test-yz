<script setup lang="ts">
import Paragraph from '../shared/Paragraph.vue';
import CodeBlock from '../shared/CodeBlock.vue';
import SubTitle from '../shared/SubTitle.vue';
import Header from '../shared/Header.vue';
import ButtonGroup from '../shared/ButtonGroup.vue';
import DateRangeFilterSnippet from '../snippets/DateRangeFilterSnippet.vue';
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
const codeSnippet = useGetRawFile('/src/components/snippets/DateRangeFilterSnippet.vue');
</script>

<template>
  <article className="my-8 w-full" id="date-range-filter">
    <Header>
      <div className="flex flex-col mr-4 flex-1">
        <SubTitle id="date-range-filter">Date Range Filter</SubTitle>
      </div>
      <ButtonGroup
        :selected="viewNavigator.selectedView.value"
        :labels="viewNavigator.views"
        :onChange="viewNavigator.selectView"
      />
    </Header>
    <div v-if="viewNavigator.selectedView.value === Views.PREVIEW" style="height: 400px;">
      <DateRangeFilterSnippet />
    </div>
    <CodeBlock
      language="html"
      :showLineNumber="true"
      v-if="viewNavigator.selectedView.value === Views.VUE">
      {{codeSnippet}}
    </CodeBlock>
  </article>
</template>


