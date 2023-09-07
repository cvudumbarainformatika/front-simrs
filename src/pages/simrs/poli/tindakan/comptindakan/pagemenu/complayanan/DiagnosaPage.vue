<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormDiagnosa @save-pemeriksaan="store.simpanDiagnosa(pasien)" />
      </q-card>
      <div class="col-6 full-height ">
        <div class="column full-height">
          <div class="col-6">
            <DiagnosaTable />
          </div>
          <div class="col-6">
            <SimulasiPage />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FormDiagnosa from './FormDiagnosa.vue'
import DiagnosaTable from './DiagnosaTable.vue'
import SimulasiPage from './SimulasiPage.vue'
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'

const store = useLayananPoli()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

console.log('diagnosa page', props.pasien)
</script>
