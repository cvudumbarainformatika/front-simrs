<template>
  <q-scroll-area :style="`height: calc(100% - ${tinggiDetailPas}px); margin-top: ${tinggiDetailPas}px; border-right: 1px solid #ddd`">
    <q-separator />
    <list-menu
      :menus="menus"
      :menu="menu"
      :pasien="pasien"
      @menu-click="(val)=> emits('clickMenu', val)"
    />
  </q-scroll-area>

  <!-- <div
    class="absolute-bottom"
    :style="`height: ${tinggiDetailPas}px`"
  >
    <SimulasiPageTwo :pasien="pasien" />
  </div> -->

  <div
    class="absolute-top bg-dark text-white"
    :style=" `height: ${tinggiDetailPas}px`"
  >
    <!-- <div class="absolute-top-right">
      <div class="q-pa-sm">
        <q-btn
          outline
          round
          style="color: goldenrod;"
          label="id"
        />
      </div>
    </div> -->
    <div class="absolute-top-right">
      <div class="q-pa-sm">
        <q-badge
          outline
          color="orange"
          :label="`${pasien?.sistembayar?? '-'}`"
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
        <div class="text-weight-bold">
          TELP. {{ pasien ? pasien.nohp : '-' }}
        </div>
        <div class="text-teal">
          {{ pasien ? pasien.noreg : '-' }} || {{ pasien?.norm??'-' }}
        </div>
        <div class="text-yellow text-italic f-10">
          {{ pasien?.usia?? '-' }}
        </div>
      </div>
      <q-bar>
        <q-space />
        <!-- <q-btn
          dense
          flat
          icon="icon-mat-attach_money"
          class="gt-xs"
          @click="bukaBill"
        >
          <q-tooltip class="bg-dark text-white">
            Billing Pasien
          </q-tooltip>
        </q-btn> -->
        <!-- <q-btn
          dense
          flat
          icon="icon-mat-menu_book"
          class="gt-xs"
          @click="emits('icare')"
        >
          <q-tooltip class="bg-dark text-white">
            i-care
          </q-tooltip>
        </q-btn> -->
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
  <!-- <CetakRekapBilling
    ref="refBilling"
    v-model="printRekap"
    :pasien="pasien"
    style="z-index: 19000;"
    @tutup="actPrintRekap"
  /> -->
</template>

<script setup>
// import SimulasiPageTwo from '../comptindakan/pagemenu/complayanan/SimulasiPageTwo.vue'
import ListMenu from './ListMenu.vue'

// import CetakRekapBilling from 'src/pages/simrs/kasir/rajal/listkunjungan/comp/CetakRekapBilling.vue'
import { ref } from 'vue'
const tinggiDetailPas = ref(180)
// const printRekap = ref(false)
// const tinggiBot = ref(180)
const emits = defineEmits(['clickMenu', 'historyPasien', 'printRekap', 'icare'])
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
// const refBilling = ref(null)
// function bukaBill() {
//   refBilling.value.openFaktur()
//   printRekap.value = true
// }
// function actPrintRekap() {
//   printRekap.value = false
// }
</script>
