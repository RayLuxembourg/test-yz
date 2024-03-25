<script setup lang="ts">
import ReferenceLink from './ReferenceLink.vue';
const props = defineProps<{
  id: string
}>()
</script>

<template>
  <div className="flex items-center">
    <h2 :id="props.id" className="text-3xl font-bold ">
      <slot></slot>
      <ReferenceLink :id="props.id" />
    </h2>
  </div>
</template>