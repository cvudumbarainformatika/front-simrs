<template>
  <div class="row full-width justify-center">
    <div class="q-pa-sm" style="width:50%">
      <q-input
        v-model="store.reqs.q"
        outlined
        color="warning"
        dense
        placeholder="Cari Transaksi..."
        debounce="0"
        style="min-width: 300px;"
        @keyup.enter.stop="store.getDataBukubesar()"
        @update:model-value="cariData"
      >
        <template
          v-if="store.reqs.q"
          #append
        >
          <q-icon
            name="icon-mat-close"
            size="xs"
            class="cursor-pointer"
            @click.stop.prevent="clearSearch"
          />
        </template>
        <template #prepend>
          <q-icon
            size="sm"
            name="icon-mat-search"
          />
        </template>
      </q-input>
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
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete
        v-model="jenisapa"
        label="Pilih Jenis Buku Besar"
        autocomplete="nama"
        option-value="value"
        option-label="nama"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        :source="store.jenis"
        @update:model-value="(val)=>{
          store.hasilmapsLevel1 = []
          store.hasilmapsLevel5 = []
          store.hasilmapsLevel6 = []
          store.hasilRinci6 = []
          store.hasilRinci5 = []
          store.hasilRinci4 = []
          store.hasilRinci3 = []
          store.hasilRinci2 = []
          store.hasilRinci1 = []
          berdasarrekap = ''
          berdasarrinci = ''
          store.form.kode = ''
          store.reqs.jenisbukubesar = parseInt(val)
        }"
      />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete
        v-model="berdasarrekap"
        label="Pilih Jenis Akun"
        autocomplete="nama"
        option-value="value"
        option-label="nama"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        v-if="store.reqs.jenisbukubesar < 2"
        :source="store.level"
        @update:model-value="(val)=>{
          store.reqs.levelberapa = parseInt(val)
          const arrBaru = store.alllevel?.filter(x=> x?.kodeall3?.length === parseInt(val))
          store.optionrekening = arrBaru
          console.log('arrBaru', store.optionrekening)
        }"
      />
      <app-autocomplete
        v-model="berdasarrinci"
        label="Pilih Jenis Akun"
        autocomplete="nama"
        option-value="value"
        option-label="nama"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        v-if="store.reqs.jenisbukubesar === 2"
        :source="store.levelrinci"
        @update:model-value="(val)=>{
          store.reqs.levelberapa = parseInt(val)
          const arrBaru = store.alllevel?.filter(x=> x?.kodeall3?.length === parseInt(val))
          store.optionrekening = arrBaru
          console.log('arrBaru', store.optionrekening)
        }"
      />
    </div>
    <div class="q-pa-sm" style="width:50%">
      <q-select
        v-model="store.form.kode"
        label="Pilih Rekening"
        autocomplete="uraian"
        option-value="kodeall3"
        standout="bg-yellow-3"
        class="ellipsis-2-lines"
        use-input
        outlined
        dense
        emit-value
        map-options
        input-debounce="0"
        :option-label="opt => Object(opt) === opt && 'kodeall3' in opt ? opt.kodeall3 + ' - ' + opt.uraian : ''"
        :disable="store.loading || !store.optionrekening.length && store.reqs.jenisbukubesar === 1"
        :loading="store.loading"
        :options="store.optionrekening"
        @filter="filterFn"
        @clear="store.setFormRekening('kode', null)"
        @update:model-value="(val)=>{
          store.reqs.rekenings = val
          const arr = store.optionrekening
          const cari = arr.find(x => x.kodeall3 === val)
          store.form.uraian = cari.uraian
          console.log('cari xxx', store.form.uraian)
        }"
      >
        <template
          v-if="store.form.kode"
          #append
        >
          <q-icon
            name="icon-mat-cancel"
            class="cursor-pointer"
            @click.stop.prevent="store.setFormRekening('kode', null)"
          />
        </template>
        <template v-else #no-option>
          <q-item>
            <q-item-section class="text-grey">
              Tidak ditemukan
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
  <div class="row full-width justify-center">
    <div class="row q-pa-sm">
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
  <cetak-bukubesar
    v-model="store.dialogCetak"
    :printbb="printbb"
  />
</template>
<script setup>
import { useQuasar } from 'quasar'
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, onMounted, ref, watchEffect } from 'vue'

const CetakBukubesar = defineAsyncComponent(() => import('../printbukubesar/PrintBukubesar.vue'))
// eslint-disable-next-line no-unused-vars
const $q = useQuasar()
const store = useBukubesarStore()
const berdasarrekap = ref('')
const berdasarrinci = ref('')
const jenisapa = ref('')
const options = ref([])
// const inpRek = ref(null)
// const emits = defineEmits(['onClick', 'newData', 'editData', 'goto', 'deleteIds', 'setRow', 'setColumns', 'setOrder', 'find', 'search', 'delete', 'refresh'])
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

function cariData (val) {
  // console.log('ada Hasil Cari', val)
  store.reqs.q = val
  if (!store.loading) store.getDataBukubesar(val)
}
const clearSearch = () => {
  store.reqs.q = ''
  store.getDataBukubesar()
}
function ambilData () {
  store.getDataBukubesar()
  // store.hasillevel()
}

const printbb = ref(null)
function cetakData () {
  store.dialogCetak = true
}
onMounted(() => {
  Promise.all([
    options.value = store.optionrekening,
    store.getAkun()
    // store.getDataBukubesar()
  ])
})

function filterFn (val, update) {
  console.log('val filter', val)
  if (val === '') {
    update(() => {
      options.value = store.optionrekening
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()

    options.value = store.optionrekening.filter(
      (v) => v.uraian.toLowerCase().indexOf(needle) > -1 || v.kodeall3.toLowerCase().indexOf(needle) > -1
    )
  })
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
