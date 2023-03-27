<template>
  <div class="q-mt-sm">
    <q-card>
      <q-card-section>
        <div class="f-12 text-weight-bold">
          Daftar Barang Depo Gizi
        </div>
        <div class="f-10">
          Daftar Barang yang bisa di distribusikan langsung
        </div>
      </q-card-section>
      <q-card-section>
        <app-table
          title="Data stok Barang Rumah sakit"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          row-no
          :ada-tambah="false"
          :ada-edit="false"
          :ada-delete="false"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @delete="store.deletesData"
        >
          <template #col-sisa_stok>
            <div>Sisa stok</div>
          </template>
          <template #col-kode>
            <div>Kode Barang</div>
          </template>
          <template #col-nama>
            <div>Nama Barang</div>
          </template>
          <template #col-toDistribute>
            <div>Akan di Distribusikan</div>
          </template>
          <template #left-acttion="{row,col}">
            <app-input
              v-model="row.toDistribute"
              label="input distribusi"
              valid
              dense
              outlined
              :loading="row.loading"
              @blur="inputBlur(row,col)"
            />
            <!-- @focus="inputFokus(row,col)" -->
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useTransaksiDistribusiLangsung } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusilangsung/distribusilangsung'

const store = useTransaksiDistribusiLangsung()
const emits = defineEmits(['simpanList'])
// function inputFokus(row, col) {
//   console.log('fokus', row, col)
//   console.log('form', store.form)
// }
function inputBlur(row, col) {
  store.setForm('kode_rs', row.kode)
  store.setForm('kode_satuan', row.kode_satuan)
  store.setForm('jumlah', row.toDistribute)
  // console.log('blur', row, col)
  emits('simpanList', col)
}
</script>
