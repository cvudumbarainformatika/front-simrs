<template>
  <div class="q-pt-sm q-pb-lg-xl">
    <app-card :is-header="false">
      <template #content>
        <app-table-input
          title="Input Permintaan"
          :columns="table.columns"
          :column-hide="table.columnHide"
          :items="table.items"
          :meta="table.meta"
          :per-page="table.params.per_page"
          :order-by="table.params.order_by"

          :sort="table.params.sort"
          :loading="table.loadingTable"
          :to-search="table.params.q"
          :add-input="store.isOpen"
          @goto="table.setPage"
          @set-row="table.setPerPage"
          @refresh="table.refreshTable"
          @find="table.setSearch"
          @set-order="table.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="table.deletesData"
        >
          <template #cell-barangrs="{row}">
            <div>{{ row.barangrs?row.barangrs.nama:'-' }}</div>
          </template>
          <template #cell-satuan="{row}">
            <div>{{ row.satuan?row.satuan.nama:'-' }}</div>
          </template>
          <template #cell-gudang="{row}">
            <div>{{ row.gudang?row.gudang.nama:'-' }}</div>
          </template>
          <template #cell-ruang="{row}">
            <div>{{ row.ruang?row.ruang.uraian:'-' }}</div>
          </template>
          <template #col-gudang>
            <div>dari</div>
          </template>
          <template #col-ruang>
            <div>tujuan</div>
          </template>
          <template #col-kode_rs>
            <div>kode rs</div>
          </template>
        </app-table-input>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'
import { useTransaksiPermintaanTable } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/permintaan'

const table = useTransaksiPermintaanTable()
const store = useTransaksiPermintaanForm()

// const depoSelected = val => {
//   table.setForm('dari', val)
// }
// const cleardepo = () => {
//   table.setForm('dari', null)
// }
// const depoSet = val => {
//   console.log(val)
// }
// const ruangSelected = val => {
//   table.setForm('tujuan', val)
// }
// const clearRuang = () => {
//   table.setForm('tujuan', null)
// }
</script>
