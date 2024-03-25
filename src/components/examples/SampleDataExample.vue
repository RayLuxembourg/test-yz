<script setup lang="ts">
import Paragraph from '../shared/Paragraph.vue'
import CodeBlock from '../shared/CodeBlock.vue'
import SubTitle from '../shared/SubTitle.vue'
import Header from '../shared/Header.vue'
import { useGetRawFile } from '../../hooks/useGetRawFile'

const dataSample = useGetRawFile('/src/components/snippets/SampleDataSnippet.ts');
</script>

<template>
  <article class="my-8" id="bar">
    <header class="flex items-baseline">
      <div class="flex flex-col mr-4 flex-1">
        <SubTitle id="data">Sample data</SubTitle>
        <Paragraph> Through the examples, we will use the following example data </Paragraph>
      </div>
    </header>
    <CodeBlock language="ts" :showLineNumber="true">{{dataSample}}</CodeBlock>
  </article>
</template>
