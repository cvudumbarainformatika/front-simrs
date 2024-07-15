<template>
  <q-table
    class="my-sticky-header"
    flat
    title="Treats"
    :rows="store.saldobluds"
    :columns="columns"
    row-key="name"
    @request="store.onRequest"
    v-model:pagination="store.params"
    :filter="store.params.q"
    :loading="store.loading"
    :rows-per-page-options="[10,20,50,100,500,1000]"
  >
    <template #top-left>
      <div class="flex q-qutter-sm z-top">
        <div>
          <q-input outlined color="white" dark dense debounce="300" v-model="store.params.q" placeholder="Cari Saldo Rekening">
            <template #append>
              <q-icon name="icon-mat-search" />
            </template>
          </q-input>
        </div>
        <div class="q-mx-sm">
          <q-select
            v-model="store.params.tahun"
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
      <q-btn
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
      </q-btn>
      <!-- <q-btn
        flat
        icon="icon-my-file-excel"
        size="sm"
        padding="sm"
        round
        no-caps
        @click="exportTable"
      >
        <q-tooltip>Export Ke Excel</q-tooltip>
      </q-btn> -->
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
          {{ props.row.noregister }}
        </q-td>
        <q-td key="tanggal" :props="props">
          {{ props.row.tanggal }}
        </q-td>
        <q-td key="rekening" :props="props">
          {{ props.row.rekening }}
        </q-td>
        <q-td key="namaRek" :props="props">
          {{ props.row.namaRek }}
        </q-td>
        <q-td key="nilaisaldo" :props="props">
          {{ formattanpaRp(props.row.nilaisaldo) }}
        </q-td>
      </q-tr>
    </template>
    <formInput v-model="table.isOpen" />
  </q-table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSaldoAwalStore } from 'src/stores/siasik/transaksi/saldo/saldoawal/saldoawal'
import { formattanpaRp } from 'src/modules/formatter'
import formInput from './FormInputSaldo.vue'
import { useFormSaldo } from 'src/stores/siasik/transaksi/saldo/saldoawal/formsaldo'

const table = useFormSaldo()
const store = useSaldoAwalStore()
const tahuns = ref([])
const columnsx = [
  {
    name: 'noregister',
    label: 'Nomer Transaksi',
    align: 'left',
    sortable: false,
    field: 'noregister'
  },
  {
    name: 'tanggal',
    label: 'Tanggal',
    align: 'left',
    field: 'tanggal'
    // field: (row) => store.getSaldoBlud(row?.noregister),
  },
  {
    name: 'rekening',
    label: 'Rekening',
    align: 'left',
    field: 'rekening'
    // field: (row) => (
    //   hitungPenerimaan(row?.penerimaanrinci) + hitungMutasiMasuk(row?.mutasimasuk) + returResep(row?.resepkeluar, row.kd_obat) +
    //   hitungPenyesuaianMasuk(row?.stok) + hitungReturDistribusi(row?.distribusipersiapan)
    // )
  },
  {
    name: 'namaRek',
    label: 'Nama Rekening',
    align: 'left',
    field: 'namaRek'
    // field: (row) => (hitungMutasiKeluar(row?.mutasikeluar) + hitungResepKeluar(row?.resepkeluar, row?.distribusipersiapan) +
    //   hitungResepRacikanKeluar(row?.resepkeluarracikan) + hitungPenyesuaianKeluar(row?.stok) + hitungDistribusi(row?.distribusipersiapan)
    // )
  },
  {
    name: 'nilaisaldo',
    label: 'Nilai Saldo',
    align: 'right',
    field: 'nilaisaldo'
    // field: (row) => hitungTotal(row),
  }
]
onMounted(() => {
  init()
})
const columns = ref(columnsx)
function init () {
  const d = new Date()
  // store.setTahun(d.getFullYear())
  store.params.tahun = d.getFullYear()
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
</script>

<style lang="scss">
.my-sticky-header {
  /* height or max-height is important */
  height: 100%;

  div.q-table__top ,.q-table__bottom, tr:first-child th {
    background-color: $primary;
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
