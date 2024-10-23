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
    <div class="q-pa-sm">
      <app-btn
        label="Posting"
        color="warning"
        class="text-teal-9 text-weight-bold"
        :disable="store.loading"
        :loading="store.loading"
        @click="store.posting()"
      />
    </div>
  </div>

  <!-- <dialog-jurnal
    v-model="store.dialogJurnal"
  /> -->
</template>
<script setup>
import { registerJurnal } from 'src/stores/siasik/akuntansi/jurnal/regjurnal'
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, onMounted } from 'vue'

// const DialogJurnal = defineAsyncComponent(() => import('./DialogJurnal.vue'))
// import DialogJurnal from './DialogJurnal.vue'

const store = registerJurnal()

onMounted(() => {
  store.dataregisterjurnal()
})

// eslint-disable-next-line no-unused-vars
function ambilData () {
  store.getRegJurnal()
}

// function posting () {
//   // console.log('klik')
//   store.dialogJurnal = true
// }
</script>
