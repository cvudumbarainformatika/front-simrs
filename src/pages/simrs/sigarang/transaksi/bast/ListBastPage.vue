<template>
  <div>
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.param.per_page"
      :loading="store.loading"
      :to-search="store.param.nopemesanan"
      :click-able="true"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
      <template #col-nomor>
        <div>Nomor</div>
      </template>
      <template #cell-nomor="{ row }">
        <div>{{ row.tgl_pemesanan ? dateFullFormat(row.tgl_pemesanan) : '-' }}</div>
      </template>
      <template #expand="{ row }">
        {{ row }}
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { useListBastPenerimaanStore } from 'src/stores/simrs/logistik/sigarang/transaksi/bast/listbast'

const store = useListBastPenerimaanStore()
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
store.getInitialData()
</script>
