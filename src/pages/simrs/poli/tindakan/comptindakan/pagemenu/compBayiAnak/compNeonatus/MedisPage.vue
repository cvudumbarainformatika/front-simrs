<template>
  <div class="fit row">
    <div class="col-8 full-height">
      <q-form
        class="full-height"
        @submit="onSubmit"
      >
        <div class="full-height q-pa-xs scroll">
          <FormMedis />
        </div>
        <div class="absolute-bottom bg-primary q-pa-md">
          <div class="text-right">
            <q-btn
              label="Simpan Data"
              class="bg-white text-dark"
              type="submit"
            />
          </div>
        </div>
      </q-form>
    </div>
    <div class="col-4 full-height bg-grey-4">
      sdfsd
    </div>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue'
import FormMedis from './compMedis/FormMedis.vue'

import { useNeonatusMedisStore } from 'src/stores/simrs/pelayanan/poli/neonatusmedis'
// eslint-disable-next-line no-unused-vars
const store = useNeonatusMedisStore()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function onSubmit() {
  store.saveData(props.pasien)
}
</script>
