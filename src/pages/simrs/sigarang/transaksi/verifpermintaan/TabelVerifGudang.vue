<template>
  <app-card>
    <template #content>
      <app-table-input
        :title="`${map.gudang}`"
        :columns="store.columns"
        :column-hide="store.columnHide"
        :items="map.items"
        :meta="store.meta"
        :per-page="store.params.per_page"
        :order-by="store.params.order_by"

        :sort="store.params.sort"
        :loading="store.loading"
        :to-search="store.params.q"
        :bisa-edit="false"
        :bisa-delete="false"
        @goto="store.setPage"
        @set-row="store.setPerPage"
        @refresh="store.refreshTable"
        @find="store.setSearch"
        @set-order="store.setOder"
        @new-data="store.newData"
        @edit-data="store.editData"
        @delete="store.deletesData"
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
</template>
<script setup>
import { useVerifPermintaanRuangan } from 'src/stores/simrs/logistik/sigarang/transaksi/verifpermintaan/form'

const store = useVerifPermintaanRuangan()
defineProps({
  map: { type: Object, default: () => {} }
})
</script>
