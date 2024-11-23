<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormDiagnosa
          ref="refForm"
          :pasien="props.pasien"
          :tipekhasusdiagnosa="props.tipekhasusdiagnosa"
          @save-pemeriksaan="savePemeriksaan"
        />
      </q-card>
      <div class="col-6 full-height ">
        <div class="column full-height">
          <div class="col-6">
            <DiagnosaTable :pasien="props.pasien" />
          </div>
          <!-- <div class="col-6">
            <SimulasiPage />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FormDiagnosa from './comp/FormDiagnosa.vue'
import DiagnosaTable from './comp/DiagnosaTable.vue'
// import SimulasiPage from './SimulasiPage.vue'
import { ref } from 'vue'
import { useDiagnosaDokter } from 'src/stores/simrs/igd/diagnosadokter'

const store = useDiagnosaDokter()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  tipekhasusdiagnosa: {
    type: Array,
    default: () => []
  }
})

const refForm = ref()
function savePemeriksaan () {
  store.simpanDiagnosa(props.pasien).then(() => {
    // console.log(refForm.value)
    // refForm.value.resetValidation()
  })
}

// console.log('diagnosa page', props.pasien)
</script>
