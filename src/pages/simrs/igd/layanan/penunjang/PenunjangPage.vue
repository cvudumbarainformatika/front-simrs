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
          rounded
          class=" bg-grey-4 shadow-2 text-grey-8"
          align="left"
          dense
          active-color="yellow"
          active-bg-color="primary"
          @update:model-value="cekPanel"
        >
          <q-tab
            v-for="(item, i) in store.tabs"
            :key="i"
            :name="item.page"
            :label="item.name"
            style="border-top-left-radius: 100px;border-bottom-right-radius: 100px;width: 100%;"
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
import { useLaboratIgd } from 'src/stores/simrs/igd/laborat'
import { usePenunjangIgd } from 'src/stores/simrs/igd/penunjang'
// import PageLaborat from './comppenunjang/PageLaborat.vue'

import { defineAsyncComponent, onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePenunjangIgd() // untuk tab
const lab = useLaboratIgd()

const comp = [
  { nama: 'Laborat', page: defineAsyncComponent(() => import('./laborat/PageLaborat.vue')) },
  { nama: 'Radiologi', page: defineAsyncComponent(() => import('./radiologi/PageRadiologi.vue')) },
  { nama: 'Operasi', page: defineAsyncComponent(() => import('./ok/PageOperasi.vue')) },
  { nama: 'Fisioterapi', page: defineAsyncComponent(() => import('./fisioterapi/PageFisio.vue')) },
  { nama: 'Jenazah', page: defineAsyncComponent(() => import('./jenazah/PageJenazah.vue')) },
  { nama: 'Ambulan', page: defineAsyncComponent(() => import('./ambulan/PageAmbulan.vue')) },
  { nama: 'BankDarah', page: defineAsyncComponent(() => import('./bankdarah/PageBankDarah.vue')) },
  { nama: 'PenunjangLain', page: defineAsyncComponent(() => import('./penunjanglain/PagePenunjangLain.vue')) }
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
  lab.getNotaold(props.pasien)
})
</script>
