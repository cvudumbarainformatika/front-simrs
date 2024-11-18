<template>
  <div
    class="column q-ma-sm fit"
    style="overflow: hidden;"
  >
    <div class="column fit">
      <div class="col-auto bg-grey-4 shadow-2 text-grey-8 ">
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
          class="full-height scroll"
        >
          <q-tab-panel
            v-for="(panel, n) in store.tabs"
            :key="n"
            :name="panel.page"
          >
            <component
              :is="cekPanel()"
              :key="props.pasien"
              :pasien="props.pasien"
              :triage="storeTriage.items"
              class="full-height scroll q-pa-none"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>

import { defineAsyncComponent, onMounted } from 'vue'
import { findWithAttr } from 'src/modules/utils'
import { usePenilaianAnamnesisIgd } from 'src/stores/simrs/igd/penilaiananamnesis'
import { useTriageIgd } from 'src/stores/simrs/igd/triage'
import { usePemeriksaanfisikStore } from 'src/stores/simrs/igd/pemeriksaanfisik'

const store = usePemeriksaanfisikStore()
const storepenilaian = usePenilaianAnamnesisIgd()
const storeTriage = useTriageIgd()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

const comp = [
  { nama: 'PemeriksaanFisik', page: defineAsyncComponent(() => import('../pemeriksaanfisik/compemeriksaanfisik/PemeriksaanFisik.vue')) },
  { nama: 'Anatomi', page: defineAsyncComponent(() => import('../pemeriksaanfisik/compemeriksaanfisik/AnatomiPage.vue')) }
]

const cekPanel = () => {
  const val = store.tab
  const ganti = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', ganti)
  return arr >= 0 ? comp[arr].page : ''
}

onMounted(() => {
  storepenilaian.masterpenilaian()
  storepenilaian.usia = props.pasien.usia
  storeTriage.getDataTriage(props.pasien.noreg)
})
</script>
