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
        >
          <q-tab
            v-for="(item, i) in store.tabs"
            :key="i"
            :name="item"
            :label="item"
          />
        </q-tabs>
      </div>
      <div
        class="col full-height"
        style="overflow: hidden;"
      >
        <q-tab-panels
          v-model="store.tab"
          animated
          class="full-height"
        >
          <q-tab-panel
            name="Diagnosa Medik"
            class="full-height q-pa-none"
          >
            <DiagnosaPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel
            name="Tindakan Medik"
            class="full-height q-pa-none"
          >
            <TindakanPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel
            name="Prosedur (Icd 9)"
            class="full-height q-pa-none"
          >
            <IcdPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel
            name="Diagnosa Keperawatan"
            class="full-height q-pa-none"
          >
            <DiagnosaKeperawatanPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel
            name="Diagnosa Kebidanan"
            class="full-height q-pa-none"
          >
            <DiagnosaKebidananPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel
            name="Pra Anestesia"
            class="full-height q-pa-none"
          >
            <PraAnestesiaPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel
            name="Laporan Tindakan"
            class="full-height q-pa-none"
          >
            <LaporanTindakan
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
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
// import { useInacbgPoli } from 'src/stores/simrs/pelayanan/poli/inacbg'
import DiagnosaPage from '../pagemenu/complayanan/DiagnosaPage.vue'
import TindakanPage from './complayanan/TindakanPage.vue'
import IcdPage from './complayanan/IcdPage.vue'
import DiagnosaKeperawatanPage from './complayanan/DiagnosaKeperawatanPage.vue'
import DiagnosaKebidananPage from './complayanan/DiagnosaKebidananPage.vue'
import PraAnestesiaPage from './complayanan/PraAnestesiaPage.vue'
import LaporanTindakan from './complayanan/LaporanTindakan.vue'
import { onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useLayananPoli()

// const inacbg = useInacbgPoli()
onMounted(() => {
  // console.log('tabs', store.tabs)
  store.getNota(props.pasien)
})

</script>
