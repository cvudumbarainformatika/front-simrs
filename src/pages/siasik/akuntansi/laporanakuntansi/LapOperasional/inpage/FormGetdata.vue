<template>
  <div class="row full-width">
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete
        v-model="refJenis"
        label="Pilih Jenis LRA"
        autocomplete="nama"
        option-value="value"
        option-label="nama"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        :source="store.jenis"
        @update:model-value="(val)=>{
          const valx = parseInt(val)
          store.reqs.jenislo = valx
          refData = ''
          store.reqs.levelberapa = ''
        }"
      />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete
        v-model="refData"
        label="Pilih Jenis LO"
        autocomplete="nama"
        option-value="value"
        option-label="nama"
        outlined
        :disable="store.loading || store.reqs.jenislo === 2"
        :loading="store.loading"
        :source="store.level"
        @update:model-value="(val)=>{
          const aa = parseInt(val)
          store.reqs.levelberapa = aa

          console.log('lvl', store.reqs.levelberapa)
        }"
      />
    </div>
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
    <div class="row full-width justify-center">
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
  </div>
  <cetak-lo
    v-model="store.dialogCetak"
    :printlo="printlo"
  />
</template>
<script setup>
import { useQuasar } from 'quasar'
import { useLaporanOperasionalStore } from 'src/stores/siasik/laporan/laporanoperasional/lapoperasional'
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, onMounted, ref, watchEffect } from 'vue'

const CetakLo = defineAsyncComponent(() => import('../printLO/PrintDataLo.vue'))
const $q = useQuasar()
const store = useLaporanOperasionalStore()
const refJenis = ref('')
const refData = ref('')
// onMounted(() => {
//   Promise.all([
//     store.getDataLap()
//     // store.getDataBukubesar()
//   ])
// })
function ambilData () {
  store.getDataLap().then(() => {
    if (refData.value != null) {
      refData.value.resetValidation()
    }
  })
  // store.hasillevel()
}
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
// eslint-disable-next-line no-unused-vars
const printlo = ref(null)
function cetakData () {
  store.dialogCetak = true
}
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
