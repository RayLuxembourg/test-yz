<script setup lang="ts">
import Divider from '../components/shared/Divider.vue';
import DashboardExample from '../components/examples/DashboardExample.vue'
</script>

<template>
  <div className="w-full bg-white p-2 md:p-4 shadow-xl rounded-lg min-h-[100vh]">
    <article className="prose mt-2 ml-0 2xl:mx-auto">
      <header>
        <h1 className="text-5xl font-bold">Dashboard</h1>
        <p className="whitespace my-4"></p>
      </header>
      <Divider />
      <DashboardExample />
    </article>
  </div>
</template>
