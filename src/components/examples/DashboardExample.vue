<script setup lang="ts">
import Paragraph from '../shared/Paragraph.vue';
import CodeBlock from '../shared/CodeBlock.vue';
import SubTitle from '../shared/SubTitle.vue';
import Header from '../shared/Header.vue';
import ButtonGroup from '../shared/ButtonGroup.vue';
import DashboardSnippet from '../snippets/DashboardSnippet.vue';
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
const codeSnippet = useGetRawFile('/src/components/snippets/DashboardSnippet.vue');
</script>

<template>
  <article className="w-full" id="dashboard">
    <Header>
      <div className="flex flex-col mr-4 flex-1">
        <SubTitle id="dashboard">Create dashboard using code</SubTitle>
      </div>
      <ButtonGroup
        :selected="viewNavigator.selectedView.value"
        :labels="viewNavigator.views"
        :onChange="viewNavigator.selectView"
      />
    </Header>
    <div v-if="viewNavigator.selectedView.value === Views.PREVIEW">
      <DashboardSnippet />
    </div>
    <CodeBlock
      language="html"
      :showLineNumber="true"
      v-if="viewNavigator.selectedView.value === Views.VUE">
      {{codeSnippet}}
    </CodeBlock>
  </article>
</template>


