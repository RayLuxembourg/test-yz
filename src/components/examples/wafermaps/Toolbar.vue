<script setup lang="ts">
import {
  XMarkIcon,
} from "@heroicons/vue/24/solid";
const props = defineProps<{
  onClose?: () => void;
}>()
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '40px',
      backgroundColor: '#eeeeee',
      fontSize: '14px',
      paddingTop: '5px'
    }"
  >
    <slot></slot>
    <div
      :style="{
        display: 'inline-block',
        flexGrow: '1'
      }"
    ></div>
    <div
      v-if="onClose"
      :onClick="onClose"
      :style="{
        display: 'inline-block',
        right: '40px',
        paddingRight: '20px',
        color: '#555555',
        fontSize: '30px'
      }"
    >
      <XMarkIcon style="width: 24px;" :width="24" :height="24" />
    </div>
  </div>
</template>
