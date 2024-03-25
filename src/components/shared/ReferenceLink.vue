<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { LinkIcon } from "@heroicons/vue/24/solid";
const props = defineProps<{
  id: string
}>()
</script>

<template>
  <RouterLink
    :to="`#${props.id}`"
    aria-label="Link for Reference"
    title="Link for Reference"
    class="mdx-header-anchor inline-block ml-2 !text-[#ffcb05]"
  >
    <LinkIcon class="h-4 w-4" />
  </RouterLink>
</template>