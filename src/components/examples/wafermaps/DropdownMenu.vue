<script setup lang="ts">
const props = defineProps<{
  label: string;
  options: { value: string; text: string }[];
  onChange: (value: string) => void;
}>()

function onChangeHandler(e: any) {
  props.onChange(e.target.value)
} 
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'row'
    }"
  >
    <div
      :style="{
        display: 'inline-block',
        marginLeft: '10px',
        paddingTop: '5px',
        paddingRight: '10px'
      }"
    >
      {{ `${label}:` }}
    </div>

    <select
      :style="{
        width: '180px',
        height: '30px',
        border: '1px solid #999',
        fontSize: '14px',
        color: 'black',
        backgroundColor: '#eee',
        borderRadius: '5px'
      }"
      :onChange="onChangeHandler"
    >
      <option v-for="option in options" :key="`${option.value}`" :value="`${option.value}`">
        {{ `${option.text}` }}
      </option>
    </select>
  </div>
</template>
