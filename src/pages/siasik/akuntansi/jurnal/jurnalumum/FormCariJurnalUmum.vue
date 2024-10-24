<template>
  <div class="row">
    <div class="q-pa-sm">
      <q-select
        v-model="store.params.tahuncari"
        outlined
        standout="bg-yellow-3"
        style="width: 200px;"
        dense
        transition-show="flip-up"
        transition-hide="flip-down"
        label="Tahun"
        :options="tahun"
      />
    </div>
    <div class="q-pa-sm">
      <app-btn
        color="primary"
        label="Ambil Data"
        tooltip="Ambil Dataa"
        type="submit"
        tip
        :loading="store.loading"
        @click="store.getJurnalUmum()"
      />
    </div>
    <div class="q-pa-sm">
      <app-btn label="Tambah" color="primary" @click="tambahjurnal()" />
    </div>
  </div>
  <form-jurnal-umum />
</template>
<script setup>
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
import FormJurnalUmum from './FormJurnalUmum.vue'
import { onMounted, ref } from 'vue'

const store = usejurnalumummanual()
const tahun = ref([])

function tambahjurnal () {
  store.dialog = true
  store.form.nobukti = ''
  store.form.keterangan = ''
  store.transall = ''
}

onMounted(() => {
  const max = new Date().getFullYear()
  const min = max - 2
  // eslint-disable-next-line no-unused-vars
  const years = []

  for (let i = max; i >= min; i--) {
    tahun.value.push(i)
  }
})
</script>
