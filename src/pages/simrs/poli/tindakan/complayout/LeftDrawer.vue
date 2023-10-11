<template>
  <q-scroll-area :style="`height: calc(100% - ${tinggiDetailPas * 2}px); margin-top: ${tinggiDetailPas}px; border-right: 1px solid #ddd`">
    <q-separator />
    <ListMenu
      :key="menu"
      :menus="menus"
      :menu="menu"
      @menu-click="(val) => emits('clickMenu', val)"
    />
  </q-scroll-area>

  <div
    class="absolute-bottom"
    :style="`height: ${tinggiDetailPas}px`"
  >
    <SimulasiPageTwo :pasien="pasien" />
  </div>

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
    <div class="absolute-top">
      <div class="q-pa-sm">
        <q-badge
          outline
          color="orange"
          :label="`${pasien?.kodesistembayar?? '-'}`"
        />
      </div>
    </div>
    <div class="absolute-bottom">
      <div class="q-pa-md">
        <app-avatar-pasien
          :key="pasien"
          :pasien="pasien"
          width="50px"
        />
        <div class="text-weight-bold f-12 q-mt-sm">
          {{ pasien ? pasien.nama : '-' }}
        </div>
        <!-- <div class="text-weight-bold">
          {{ pasien ? pasien.norm : '-' }}
        </div> -->
        <div class="text-teal">
          {{ pasien ? pasien.noreg : '-' }} || {{ pasien?.norm??'-' }}
        </div>
        <!-- <div> {{ pasien?.kodesistembayar?? '-' }}</div> -->
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
          @click="emits('historyPasien')"
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
import SimulasiPageTwo from '../comptindakan/pagemenu/complayanan/SimulasiPageTwo.vue'
import ListMenu from './ListMenu.vue'
import { ref } from 'vue'
const tinggiDetailPas = ref(180)
// const tinggiBot = ref(180)
const emits = defineEmits(['clickMenu', 'historyPasien'])
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
