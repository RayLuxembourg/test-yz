<script setup lang="ts">
import {
  SisenseContextProvider,
} from "@sisense/sdk-ui-vue";
import HamburgerIcon from './components/icons/Hamburger.vue';
import SidebarNavigation from './components/layout/SidebarNavigation.vue';
import { useState } from './hooks/useState';

const [isOpen, setIsOpen] = useState(false);

const sisenseContextProviderArgs = () => {
  const baseOptions = {
    url: import.meta.env.VITE_APP_SISENSE_URL,
    defaultDataSource: "Sample ECommerce",
  }
  const wat = import.meta.env.VITE_APP_SISENSE_WAT;
  const token = import.meta.env.VITE_APP_SISENSE_API_TOKEN;
  const ssoEnabled = import.meta.env.VITE_APP_SISENSE_SSO_ENABLED;

  if (ssoEnabled) {
    return { ...baseOptions, ssoEnabled: ssoEnabled?.toLowerCase() === 'true' };
  } else if (wat) {
    return { ...baseOptions, wat }
  } else if (token) {
    return { ...baseOptions, token }
  } else {
    return baseOptions;
  }
};
</script>

<template>
  <SisenseContextProvider v-bind="sisenseContextProviderArgs()">
    <div className="bg-black">
      <header></header>
      <div className="flex overflow-hidden max-h-[100vh] w-full">
        <aside>
          <SidebarNavigation :isOpen="isOpen" :onClose="() => setIsOpen(false)"/>
        </aside>
        <main class="p-1 md:p-4 overflow-auto w-full relative">
          <div
            @click="setIsOpen(!isOpen)"
            class="md:hidden fixed z-10 top-4 right-4 cursor-pointer"
          >
            <HamburgerIcon />
          </div>
          <RouterView />
        </main>
      </div>
    </div>
  </SisenseContextProvider>
</template>
