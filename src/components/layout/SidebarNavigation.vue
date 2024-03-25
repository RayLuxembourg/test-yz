<script setup lang="ts">
  import {
    QuestionMarkCircleIcon,
    ChartBarIcon,
    ChartBarSquareIcon,
    FunnelIcon,
    NewspaperIcon,
    AcademicCapIcon,
    CpuChipIcon,
  } from "@heroicons/vue/24/solid";
  import ComposeSdkLogo from "../../assets/compose-sdk-logo.svg";
  import SisenseLogo from "../../assets/sisense-logo.svg";
  import DashboardIcon from "../icons/DashboardIcon.vue"
  import NavigationItem from './NavigationItem.vue';
  
  const props = defineProps<{
    isOpen?: boolean,
    onClose?: () => void;
  }>();

  function handleNavigationOnClick() {
    props.onClose?.()
  }
</script>

<template>
  <div :class="`fixed top-0 z-10 md:static md:w-64 ${isOpen ? 'w-full' : 'w-0'}`">
      <div
        @click={onClose}
        class="md:hidden absolute top-4 right-5 cursor-pointer"
      >
      </div>
      <nav class=" overflow-auto flex flex-col bg-black  h-screen  tex-gray-900">
        <div class="mt-8">
          <div class="px-3">
            <img :src="ComposeSdkLogo" class="w-131 h32" />
          </div>
          <div class="flex justify-end px-3 mt-1">
            <span
              class="bg-[#41B883] self-center text-[#34495E] text-xs font-bold me-2 px-2.5 py-0.5 rounded"
              >Vue</span
            >
            <span class="leading-3 mr-1 text-sm text-white">by</span>
            <img :src="SisenseLogo" style="width: 100px" />
          </div>
        </div>
        <div class="mt-10 mb-4 flex justify-center md:block md:justify-start">
          <ul @click="handleNavigationOnClick">
            <NavigationItem href="/" text="Getting Started">
              <template #icon>
                <QuestionMarkCircleIcon />
              </template>
            </NavigationItem>
            <NavigationItem href="/charts" text="Chart Components">
              <template #icon>
                <ChartBarIcon />
              </template>
            </NavigationItem>
            <NavigationItem href="/charts-connected" text="Connected Chart Components">
              <template #icon>
                <ChartBarSquareIcon />
              </template>
            </NavigationItem>
            <NavigationItem href="/filters" text="Filter Components">
              <template #icon>
                <FunnelIcon />
              </template>
            </NavigationItem>
            <NavigationItem href="/dashboard" text="ECommerce Dashboard">
              <template #icon>
                <DashboardIcon class="text-white" />
              </template>
            </NavigationItem>
            <NavigationItem href="/blog" text="Blog Article">
              <template #icon>
                <NewspaperIcon />
              </template>
            </NavigationItem>
            <NavigationItem href="/penguins" text="Penguins">
              <template #icon>
                <AcademicCapIcon />
              </template>
            </NavigationItem>
            <NavigationItem href="/wafermaps" text="Wafer Maps">
              <template #icon>
                <CpuChipIcon />
              </template>
            </NavigationItem>
          </ul>
        </div>
      </nav>
    </div>
</template>

<style scoped>
</style>
