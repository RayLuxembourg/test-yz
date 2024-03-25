<script setup lang="ts">
import { onMounted, ref } from "vue";
import Prism from "prismjs";

const props = defineProps<{
  language: 'html' | 'tsx' | 'ts' | 'bash';
  showLineNumber?: boolean;
  forceDynamicHighlight?: boolean;
}>()
const codeElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (codeElement.value) {
    Prism.highlightElement(codeElement.value);
  }
})
</script>

<template>
  <div class="rounded overflow-hidden mt-4 shadow my-4 bg-[#f5f2f0]">
    <pre :class="props.showLineNumber ? 'line-numbers' : ''">
      <code ref="codeElement" :class="`language-${props.language}`">
        <slot></slot>
      </code>
    </pre>
  </div>
</template>