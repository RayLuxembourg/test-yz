<script setup lang="ts">
import { useState } from '../../hooks/useState'
import Toolbar from './wafermaps/Toolbar.vue';
import WaferMapGalleryConnected from './wafermaps/WaferMapGalleryConnected.vue';
import DetailWaferMapPanel from './wafermaps/DetailWaferMapPanel.vue';
import type { CellData } from './wafermaps/common';

const [currentCell, setCurrentCell] = useState<CellData | null>(null);
</script>

<template>
      <div class="rounded-lg overflow-hidden p-4" ref="pageRef" style="background: white; font-size: smaller">
      <b>
        <h1>
          Wafer Map Gallery
        </h1>
      </b>
      <div v-if="currentCell">
        <Toolbar :onClose="() => setCurrentCell(null)" />
        <DetailWaferMapPanel :cellData="currentCell" />
      </div>
      <WaferMapGalleryConnected :onClick="setCurrentCell" />
    </div>
</template>
