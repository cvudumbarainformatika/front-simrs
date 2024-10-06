<template>
  <div class="row">
    <div class="q-pa-sm">
      <app-autocomplete
        v-model="store.reqs.bulan"
        label="Pilih Bulan"
        autocomplete="nama"
        option-label="nama"
        option-value="value"
        outlined
        :source="store.bulans"
      />
    </div>
    <div class="q-pa-sm">
      <app-input
        v-model="store.reqs.tahun"
        label="Tahun"
        outlined
      />
    </div>
    <div class="q-pa-sm">
      <app-btn
        label="Ambil Data"
        :disable="store.loading"
        :loading="store.loading"
        @click="ambilData()"
      />
    </div>
  </div>
</template>
<script setup>
import { registerJurnal } from 'src/stores/siasik/akuntansi/jurnal/regjurnal'
import { onMounted } from 'vue'

const store = registerJurnal()

onMounted(() => {
  store.serahterima()
})
// eslint-disable-next-line no-unused-vars
function ambilData () {
  store.getRegJurnal()
}
</script>
