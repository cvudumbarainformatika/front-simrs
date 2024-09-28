<template>
  <div class="print-hide row middle q-pt-md q-px-md q-gutter-md">
    <app-input-date-human
      :model="store.params.tgl"
      label="dari tangal"
      outlined
      :disable="store.loading"
      :loading="store.loading"
      @db-model="tglDari"
      @set-display="setDari"
    />
    <app-input-date-human
      :model="store.params.tglx"
      label="sampai tangal"
      outlined
      :disable="store.loading"
      :loading="store.loading"
      @db-model="tglSampai"
      @set-display="setSampai"
    />
    <app-autocomplete
      v-model="berdasar"
      label="Berdasarkan"
      autocomplete="nama"
      option-value="value"
      option-label="nama"
      outlined
      :source="store.level"
    />
    <div>
      <app-btn
        label="Ambil Data"
        :disable="store.loading"
        :loading="store.loading"
        @click="ambilData()"
      />
    </div>
    <div>
      <q-btn
        ref="refPrint"
        v-print="printObj"
        unelevated
        color="dark"
        round
        size="sm"
        icon="icon-mat-print"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Print
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script setup>
import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { ref } from 'vue'

const store = useLaporanLraLaprealisasianggaranStore()

// Model berdasarkan ref agar tidak updte
const berdasar = ref('')

function tglDari (val) {
  store.setParameter('tgl', val)
}
function setDari (val) {
  store.display.dari = val
}
function tglSampai (val) {
  store.setParameter('tglx', val)
}
function setSampai (val) {
  store.display.sampai = val
}
function ambilData () {
  // store.hitungharidalamBulan();
  store.params.levels = berdasar.value
  store.getDataRealisasi().then(() => {
    store.emptyForm()
  })
}

// const jenisData = (val) => {
//   console.log('jenisData', val)
//   if (val === '1') {
//     return store.kodeakun
//   }
//   else if (val === '2') {
//     console.log('kode2', store.kodekelompok)
//     return store.kodekelompok
//   }
//   else if (val === '3') {
//     console.log('kode3', store.kodejenis)
//     return store.kodejenis
//   }
// }
const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Realisasi Anggaran',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    printed.value = false
    console.log('closePrint')
  }
}

</script>
