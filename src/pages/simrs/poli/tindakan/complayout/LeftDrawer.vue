<template>
  <q-scroll-area :style="`height: calc(100% - ${tinggiDetailPas}px); margin-top: ${tinggiDetailPas}px; border-right: 1px solid #ddd`">
    <q-separator />
    <ListMenu
      :key="menu"
      :menus="menus"
      :menu="menu"
      @menu-click="(val) => emits('clickMenu', val)"
    />
  </q-scroll-area>

  <div
    class="absolute-top bg-dark text-white"
    :style=" `height: ${tinggiDetailPas}px`"
  >
    <div class="absolute-top-right">
      <div class="q-pa-sm">
        <q-btn
          outline
          round
          style="color: goldenrod;"
          label="id"
        />
      </div>
    </div>
    <div class="absolute-bottom">
      <div class="q-pa-md">
        <app-avatar-pasien
          :key="pasien"
          :pasien="pasien"
        />
        <div class="text-weight-bold f-12 q-mt-sm">
          {{ pasien ? pasien.nama : '-' }}
        </div>
        <div class="text-weight-bold">
          {{ pasien ? pasien.norm : '-' }}
        </div>
        <div>REG : {{ pasien ? pasien.noreg : '-' }}</div>
      </div>
      <q-bar>
        <q-space />
        <q-btn
          dense
          flat
          icon="icon-mat-menu_book"
          class="gt-xs"
        >
          <q-tooltip class="bg-dark text-white">
            Rekam Medis Pasien
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          icon="icon-mat-history"
          class="gt-xs"
        >
          <q-tooltip class="bg-dark text-white">
            History Pasien
          </q-tooltip>
        </q-btn>
      </q-bar>
    </div>
  </div>
</template>

<script setup>
import ListMenu from './ListMenu.vue'
import { ref } from 'vue'
const tinggiDetailPas = ref(180)
const emits = defineEmits(['clickMenu'])
defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menus: {
    type: Array,
    default: () => []
  },
  menu: {
    type: Object,
    default: null
  }
})
</script>
