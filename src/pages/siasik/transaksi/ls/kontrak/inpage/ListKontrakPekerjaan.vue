<template>
  <q-list
    separator
  >
    <q-table
      class="my-sticky-header"
      flat
      title="Treats"
      :rows="store.kontraks"
      :columns="columns"
      row-key="name"
      @request="store.onRequest"
      v-model:pagination="store.reqs"
      :filter="store.reqs.q"
      :loading="store.loading"
      :rows-per-page-options="[10,20,50,100,500,1000]"
    >
      <template #top-left>
        <div class="flex q-qutter-sm z-top">
          <div>
            <q-input
              v-model="store.reqs.q"
              outlined
              dark
              color="white"
              dense
              placeholder="Cari Obat ..."
              debounce="500"
              style="min-width: 200px;"
              @keyup.enter="store.goToPage(1)"
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
          <div class="q-mx-sm">
            <q-select
              v-model="store.reqs.tahun"
              :options="tahuns"
              outlined
              dark
              dense
              color="white"
              style="width:100px"
            />
          </div>
        </div>
      </template>
      <template #top-right>
        <!-- <q-btn
        class="q-ml-sm"
        unelevated
        round
        color="light"
        size="sm"
        icon="icon-mat-add"
        @click="table.newData(!isOpen)"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Data Baru
        </q-tooltip>
      </q-btn> -->
        <q-btn
          flat
          icon="icon-my-file-excel"
          size="sm"
          padding="sm"
          round
          no-caps
          @click="store.exportExcel= !store.exportExcel"
        >
          <q-tooltip>Export Ke Excel</q-tooltip>
        </q-btn>
      </template>
      <template #no-data="{ message, filter }">
        <div class="absolute-top fit row flex-center bg-transparent items-center text-dark">
          <div class="row items-center q-gutter-sm">
            <q-icon size="2em" name="icon-mat-eye" />
            <div>
              Data tidak ditemukan... {{ message }}
            </div>
            <div class="text-h4">
              {{ filter? '🏷️': '🏷️' }}
            </div>
          </div>
        <!-- <q-icon size="2em" :name="filter ? 'icon-mat-list' : icon" /> -->
        </div>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td key="noregister" :props="props">
            {{ props.row.nokontrak }}
          </q-td>
          <q-td key="namaperusahaan" :props="props">
            {{ props.row.namaperusahaan }}
          </q-td>
          <q-td key="tgltrans" :props="props">
            {{ props.row.nokontrakx }}
          </q-td>
          <q-td key="tgltrans" :props="props">
            {{ props.row.tgltrans }}
          </q-td>
          <q-td key="kegiatanblud" :props="props">
            {{ props.row.kegiatanblud }}
          </q-td>
          <q-td key="namapptk" :props="props">
            {{ props.row.namapptk }}
          </q-td>
          <q-td key="nilaikontrak" :props="props">
            {{ formattanpaRp(props.row.nilaikontrak) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-list>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { uselistKontrakPekerjaan } from 'src/stores/siasik/transaksi/ls/kontrak/listkontrak'
import { onMounted, ref, watchEffect } from 'vue'
import { formattanpaRp } from 'src/modules/formatter'
const store = uselistKontrakPekerjaan()
const tahuns = ref([])
const $q = useQuasar()
const columnsx = [
  {
    name: 'noregister',
    label: 'Nomer Kontrak',
    align: 'left',
    field: 'noregister'
  },
  {
    name: 'namaperusahaan',
    label: 'Nama',
    align: 'left',
    field: 'namaperusahaan'
  },
  {
    name: 'nokontrakx',
    label: 'Kontrak',
    align: 'left',
    field: 'nokontrakx'
  },
  {
    name: 'tgltrans',
    label: 'Tanggal',
    align: 'left',
    field: 'tgltrans'
  },
  {
    name: 'kegiatanblud',
    label: 'KegiatanBLUD',
    align: 'left',
    field: 'kegiatanblud'
  },
  {
    name: 'namapptk',
    label: 'Pejabat Teknis',
    align: 'left',
    field: 'namapptk'
  },
  {
    name: 'nilaikontrak',
    label: 'Nilai',
    align: 'right',
    field: 'nilaikontrak'
  }
]
const columns = ref(columnsx)
onMounted(() => {
  init()
  store.getInitialData()
})
function init () {
  const d = new Date()
  // store.setTahun(d.getFullYear())
  store.reqs.tahun = d.getFullYear()
  generateArrayOfYears()
}
function generateArrayOfYears () {
  const max = new Date().getFullYear()
  const min = max - 5
  const years = []

  for (let i = max; i >= min; i--) {
    years.push(i)
  }
  tahuns.value = years
}
const clearSearch = () => {
  store.reqs.q = ''
  store.goToPage(1)
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

<style lang="scss">
.my-sticky-header {
  /* height or max-height is important */
  height: 100%;

  div.q-table__top ,.q-table__bottom, tr:first-child th {
    background-color: $dark;
    color: $white;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    // border-width: 0;
  }

  tr:first-child th {
    // border-top: 1px solid $white;
    background-color: $grey-4;
    color: $dark;
  }

  //   /* bg color is important for th; just specify one */

  thead tr th{
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th{
    top: 0;
  }

  // /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th{
    /* height of all previous header rows */
    top: 48px
  }
  // /* prevent scrolling behind sticky top row on focus */
  tbody{
    /* height of all previous header rows */
    scroll-margin-top: 100px !important;
  }

  .q-table__bottom .q-field__native,
  .q-table__bottom .q-field__inner .q-field__control .q-anchor--skip,
  i.q-icon
   {
    color: $grey-4;
  }

}
</style>
