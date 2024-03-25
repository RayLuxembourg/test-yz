<script setup lang="ts">
import Divider from './Divider.vue';

const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="w-full bg-white p-4 shadow-xl rounded-lg min-h-[100vh]">
    <article class="prose mt-2 max-w-4xl ml-0 2xl:mx-auto pl-5">
      <header class="mt-5">
        <h1 class="text-5xl font-bold">{{props.title}}</h1>
        <p class="whitespace my-4">{{props.description}}</p>
      </header>
      <Divider />
      <slot></slot>
    </article>
  </div>
</template>