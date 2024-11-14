<template>
  <q-dialog maximized persistent @show="show()">
    <div class="bg-white" ref="refPage">
      <q-bar class="bg-primary" ref="refBar">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="emits('close')"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <div class="row items-center q-my-sm" ref="refMiddle">
        <div class="col-12 text-weight-bold">
          <div class="row justify-center f-16">
            {{ store.data?.nama_obat }}
          </div>
          <div class="row justify-center text-italic ">
            {{ store.data?.kd_obat }}
          </div>
        </div>
      </div>

      <q-tabs
        ref="refTabs"
        v-model="tab"
        dense
        no-caps
        inline-label
        narrow-indicator
        indicator-color="transparent"
        align="left"
        class=" bg-transparent text-grey-8"
        active-color="white"
        :active-bg-color="menu?.reference ? 'dark' : 'primary'"
      >
        <q-tab v-for="tb in tabs" :key="tb.name" :ripple="true" :name="tb?.name" content-class="tab-classes">
          <template #default>
            <div class="row q-gutter-x-xs items-center q-px-sm" style="border-radius: 10px;">
              <div><strong>{{ tb?.label }}</strong></div>
            </div>
          </template>
        </q-tab>
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        class="q-pa-md"
        animated
      >
        <q-tab-panel :name="menu?.name" class="q-pa-none">
          <q-scroll-area :style="`height: ${he}px;`">
            <component
              :is="menu?.comp"
              :data="store.data"
              @ubahharga="(val) => {
                // console.log('ubahharga',val);
                store.simpanPerbaikanHarga(val)
              }"
            />
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-dialog>
</template>
<script setup>
import { usePerbaikanHargaFarmasiStore } from 'src/stores/simrs/farmasi/perbaikanharga/perbaikanharga'
import { ref, defineAsyncComponent, computed, shallowRef } from 'vue'

const emits = defineEmits(['close'])
const store = usePerbaikanHargaFarmasiStore()

const tab = ref('stok')
const tabs = ref([
  {
    label: 'Stok',
    name: 'stok',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanStok.vue')))
  },
  {
    label: 'Stok Opname',
    name: 'stokopname',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanStokOpname.vue')))
  },
  {
    label: 'Mutasi Masuk',
    name: 'mutasi',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanMutasi.vue')))
  },
  {
    label: 'Resep',
    name: 'resep',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanResep.vue')))
  },
  {
    label: 'Resep Racikan',
    name: 'resepracikan',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanResepRacikan.vue')))
  },
  {
    label: 'Retur Penjualan',
    name: 'retur',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanRetur.vue')))
  },
  {
    label: 'Mutasi Keluar',
    name: 'mutasikeluar',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanMutasiKeluar.vue')))
  },
  {
    label: 'Penerimaan',
    name: 'penerimaan',
    reference: true,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PenerimaanPage.vue')))
  },
  {
    label: 'Saldo Awal Mei',
    name: 'awal',
    reference: true,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/StokAwalPage.vue')))
  }
])
const menu = computed(() => {
  const by = tab.value
  return tabs.value.find(i => i.name === by)
})
const refPage = ref(null)
const refBar = ref(null)
const refMiddle = ref(null)
const refTabs = ref(null)
const he = ref(500)
function show () {
  const page = refPage.value.clientHeight ?? 0
  const bar = refBar.value.clientHeight ?? 50
  const mid = refMiddle.value.clientHeight ?? 0
  const tab = refTabs.value.clientHeight ?? 36
  he.value = page - bar - mid - tab - 50
  // console.log('page', page, refPage.value.clientHeight)
  // console.log('bar', bar, refBar.value.clientHeight)
  // console.log('mid', mid, refMiddle.value.clientHeight)
  // console.log('tab', tab, refTabs.value.clientHeight)
  // console.log('he', he.value)
}
</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}
</style>
