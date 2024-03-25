<script setup lang="ts">

const props = defineProps<{
  labels: string[],
  selected: string,
  onChange: (selected: string) => void
}>()
</script>

<template>
  <div 
    class="inline-flex items-center flex-wrap gap-1 sm:gap-0">
    <button
      v-for="(label, index) in props.labels"
      v-bind:key="index"
      @click="() => props.onChange(label)"
      :class="`text-[#3a4356] transition ease-out hover:!bg-[#ffcb05] rounded-none text-sm bg-white hover:bg-slate-100 border border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center 
        ${
          index === 0 ? 'sm:rounded-l-lg' : ''
        }
        ${
          index === props.labels.length - 1 ? 'sm:rounded-r-lg' : 'rounded-r-none'
        } 
        ${ label === props.selected ? 'outline-4 !bg-[#ffcb05] bg-slate-100' : 'text-slate-800' }
      `"
      >
      {{label}}
    </button>
  </div>
</template>