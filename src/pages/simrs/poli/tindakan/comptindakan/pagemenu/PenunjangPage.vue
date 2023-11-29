<template>
  <div
    class="column full-height q-ma-sm"
    style="overflow: hidden;"
  >
    <div class="column full-height">
      <div class="col-auto bg-red">
        <q-tabs
          v-model="store.tab"
          no-caps
          inline-label
          class="bg-primary text-white shadow-2"
          align="left"
          dense
          active-color="yellow"
          active-bg-color="dark"
          @update:model-value="cekPanel"
        >
          <q-tab
            v-for="(item, i) in store.tabs"
            :key="i"
            :name="item.page"
            :label="item.name"
          />
        </q-tabs>
      </div>
      <div class="col-grow bg-yellow">
        <q-tab-panels
          v-model="store.tab"
          animated
          class="full-height"
        >
          <q-tab-panel
            v-for="(panel, n) in store.tabs"
            :key="n"
            :name="panel.page"
            class="full-height q-pa-none"
          >
            <!-- <q-tab-panel
            name="Laborat"
            class="full-height q-pa-none"
          > -->
            <component
              :is="cekPanel()"
              :key="props.pasien"
              :pasien="props.pasien"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { findWithAttr } from 'src/modules/utils'
import { useLaboratPoli } from 'src/stores/simrs/pelayanan/poli/laborat'
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'
// import PageLaborat from './comppenunjang/PageLaborat.vue'

import { defineAsyncComponent, onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePenunjangPoli() // untuk tab
const lab = useLaboratPoli()

const comp = [
  { nama: 'Laborat', page: defineAsyncComponent(() => import('./comppenunjang/PageLaborat.vue')) },
  { nama: 'Radiologi', page: defineAsyncComponent(() => import('./comppenunjang/PageRadiologi.vue')) },
  { nama: 'Operasi', page: defineAsyncComponent(() => import('./comppenunjang/PageOperasi.vue')) },
  { nama: 'Fisio', page: defineAsyncComponent(() => import('./comppenunjang/PageFisio.vue')) },
  { nama: 'Diet', page: defineAsyncComponent(() => import('./comppenunjang/PageDiet.vue')) },
  { nama: 'PenunjangLain', page: defineAsyncComponent(() => import('./comppenunjang/PagePenunjangLain.vue')) }
]

// console.log('comp', comp)
const cekPanel = () => {
  const val = store.tab
  const ganti = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', ganti)
  return arr >= 0 ? comp[arr].page : ''
}

onMounted(() => {
  lab.getMasterLaborat()
  lab.getNota(props.pasien)
})
</script>
