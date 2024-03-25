<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  const props = defineProps<{
    href: string,
    text: string,
  }>();
</script>

<template>
  <li class="w-full mb-2 text-gray-100 flex flex-row border-gray-300 hover:text-white hover:bg-black hover:font-bold">
    <RouterLink
      :to="props.href"
      class="flex px-4 py-2 w-full h-full hover:text-[#ffcb05] text-white"
      exactActiveClass="!text-[#ffcb05]"
    >
      <span class="icon-container h-6 w-5">
        <slot name="icon"></slot>
      </span>
      <span class="ml-2">{{props.text}}</span>
    </RouterLink>
  </li>
</template>

<style scoped>
.icon-container {
  display: inline-flex;
}
</style>
