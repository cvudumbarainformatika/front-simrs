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
        class="col-grow"
        style="overflow: hidden;"
      >
        <q-tab-panels
          v-model="store.tab"
          animated
          class="full-height"
        >
          <q-tab-panel
            name="Diagnosa"
            class="full-height q-pa-none"
          >
            <DiagnosaPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel
            name="Tindakan"
            class="full-height q-pa-none"
          >
            <TindakanPage />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import DiagnosaPage from '../pagemenu/complayanan/DiagnosaPage.vue'
import TindakanPage from './complayanan/TindakanPage.vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useLayananPoli()
</script>
