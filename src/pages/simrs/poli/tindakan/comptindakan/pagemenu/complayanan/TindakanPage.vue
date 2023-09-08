<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <div class="column full-height">
          <div class="col-12">
            <FormTindakan
              ref="reffForm"
            />
          </div>
        </div>
      </q-card>
      <div class="col-6 full-height ">
        <div class="column full-height">
          <div class="col">
            <TindakanTable />
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
import FormTindakan from './FormTindakan.vue'
import TindakanTable from './TindakanTable.vue'
import SimulasiPage from './SimulasiPage.vue'
import { ref } from 'vue'
// import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'

// const store = useLayananPoli()

const reffForm = ref()
</script>
