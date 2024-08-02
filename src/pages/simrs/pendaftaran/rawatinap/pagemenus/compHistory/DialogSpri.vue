<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
    @show="lihatPasien"
  >
    <q-card class="fit bg-grey-4 text-dark">
      <div class="absolute-top bg-grey-5 full-width z-top flex items-center justify-between q-px-sm">
        <div>Dokumen SPRI</div>
        <q-btn dense flat icon="icon-mat-close" :size="'md'" v-close-popup>
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </div>

      <q-card-section style="max-height: 100vh; padding-top: 50px; padding-bottom: 50px" class="fit scroll">
        <MasterSpri :editable-master="false" :pasien="pasien" />
      </q-card-section>
      <div class="absolute-bottom full-width bg-dark text-grey">
        <q-btn dense label="Ttd Pasien">
          <q-tooltip class="bg-white text-primary">
            Ttd Pasien
          </q-tooltip>
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const MasterSpri = defineAsyncComponent(() => import('src/components/callComponents/MasterSpri.vue'))
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const lihatPasien = () => {
  console.log('lihat pasien', props.pasien)
}
</script>
