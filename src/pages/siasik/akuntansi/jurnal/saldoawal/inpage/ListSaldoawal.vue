<template>
  <template v-if="store.reqs.simpanform">
    <div class="q-pa-md full-width">
      <q-table
        class="my-sticky-table"
        wrap-cells
        title="Data Saldo Awal"
        :rows="store.datasaldo"
        :columns="columns"
        row-key="name"
        :filter="store.reqs.q"
        :loading="store.loading"
        :rows-per-page-options="[0]"
        :rows-number="[0]"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="kode" :props="props">
              {{ props.row?.kodepsap13 }}
            </q-td>
            <q-td key="uraian" :props="props">
              {{ props.row?.uraianpsap13 }}
            </q-td>
            <q-td key="debit" :props="props">
              {{ parseFloat(props.row?.debit) }}
            </q-td>
            <q-td key="kredit" :props="props">
              {{ parseFloat(props.row?.kredit) }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </template>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { saldoawalJurnal } from 'src/stores/siasik/akuntansi/jurnal/saldoawal'

const store = saldoawalJurnal()
onMounted(() => {
  store.getSaldoAwal()
  // store.getDataTable()
})
const listSaldo = [
  {
    label: 'Kode Rekening',
    name: 'kode',
    field: 'kodepsap13'
  },
  {
    label: 'Uraian',
    name: 'uraian',
    field: 'uraianpsap13',
    align: 'left'
  },
  {
    label: 'Debit',
    name: 'debit',
    field: 'debit'
  },
  {
    label: 'Kredit',
    name: 'kredit',
    field: 'kredit'
  }
]
const columns = ref(listSaldo)
// const init = () => {

//   store.getDataTable()
// }
</script>
<style lang="scss">
.my-sticky-table{
  height: 510px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th{
    background-color: #000000;
    color: $white;

  }

  thead tr th{
    position: sticky;
    z-index: 1;
    font-weight: bold;
  }

  /* this will be the loading indicator */
  thead tr:last-child th{
    top: 48px;

  }
    /* height of all previous header rows */

  thead tr:first-child th{
    top: 0;
  }
  .q-td{
    font-size: 3mm;
  }
  /* prevent scrolling behind sticky top row on focus */
  tbody{
    scroll-margin-top: 48px;
    font-size: 1mm;
  }
  .q-table__bottom .q-field__native,
  .q-table__bottom .q-field__inner .q-field__control .q-anchor--skip,
  i.q-icon
   {
    color: $dark;
  }
}
</style>
