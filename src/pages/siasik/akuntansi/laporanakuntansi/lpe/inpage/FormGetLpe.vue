<template>
  <div class="row full-width justify-center">
    <div class="q-pa-sm" style="width:25%">
      <app-input-date-human
        :model="store.reqs.tgl"
        label="dari tangal"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        @db-model="tglDari"
        @set-display="setDari"
      />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-input-date-human
        :model="store.reqs.tglx"
        label="sampai tangal"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        @db-model="tglSampai"
        @set-display="setSampai"
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
      <q-btn
        icon="icon-mat-print"
        color="orange"
        round
        size="sm"
        :disable="store.loading"
        :loading="store.loading"
        @click="cetakData()"
      >
        <q-tooltip class="bg-orange" :offset="[10, 10]">
          Cetak
        </q-tooltip>
      </q-btn>
    </div>
    <div class="q-pa-sm">
      <!-- <download-excel
      class="btn"
      :fields="store.fields"
      :fetch="store.getDataBukubesar"
      :before-generate="store.startDownload"
      :before-finish="store.finishDownload"
      :name="'Buku Besar ' + store.reqs.tahun +'.xls'"
    > -->
      <q-btn
        icon="icon-mat-download"
        color="green"
        round
        size="sm"
        push
        :disable="store.loading"
        :loading="store.loading"
        @click="store.exportExcel= !store.exportExcel"
      >
        <q-tooltip class="bg-green" :offset="[10, 10]">
          Export to Excel
        </q-tooltip>
      </q-btn>
    <!-- </download-excel> -->
    </div>
  </div>
  <cetak-lpe
    v-model="store.dialogCetak"
    :printlpe="printlpe"
  />
</template>
<script setup>
import { useQuasar } from 'quasar'
import { useLPEStore } from 'src/stores/siasik/laporan/lpe/lpe'
import { ref, defineAsyncComponent, watchEffect } from 'vue'

const CetakLpe = defineAsyncComponent(() => import('../printLPE/PrintDataLpe.vue'))
const store = useLPEStore()
const $q = useQuasar()
// Model berdasarkan ref agar tidak updte
// const berdasar = ref('')

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
  store.getDataLap()
}
const printlpe = ref(null)
function cetakData () {
  store.dialogCetak = true
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
function exportToExcel (tableId, filename) {
  // const el = document.getElementById(tableId)
  // const filenames = filename ? filename + '.xls' : 'KartuStokFarmasi.xls'
  // const columns = store.items
  // const content = [columns.map(col => wrapCsvValue(col.label))].concat(
  //   rows.map(row => columns.map(col => wrapCsvValue(
  //     typeof col.field === 'function'
  //       ? col.field(row)
  //       : row[col.field === void 0 ? col.name : col.field],
  //     col.format,
  //     row
  //   )).join(','))
  // ).join('\r\n')

  // const status = exportFile(
  //   'table-export.csv',
  //   content,
  //   'text/csv'
  // )
  // console.log('mulai export', el?.parentElement)
  $q.notify({
    message: 'Masih dibuatkan ... harap tunggu',
    color: 'negative',
    icon: 'icon-mat-warning'
  })
}

watchEffect(() => {
  if (store.exportExcel) {
    // console.log('store.exportExcel', store.exportExcel)
    exportToExcel('tableItem', 'KartuStokFarmasi')
  }
})
</script>
