<template>
  <div class="q-pt-sm q-pb-lg-xl">
    <app-card :is-header="false">
      <template #content>
        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-4">
            Tanggal Permintaan
          </div>
          <div class="col-8">
            {{ store.tanggal }}
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-md-4 col-xs-12">
            Nomor Permintaan
          </div>
          <div class="col-md-8 col-xs-12">
            {{ map.header.no_permintaan }}
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-md-4 col-xs-12">
            Penanggung jawab
          </div>
          <div class="col-md-8 col-xs-12">
            {{ store.nama.penanggungjawab }}
          </div>
        </div>
        <app-table-input
          :title="`${map.gudang}`"
          :columns="table.columns"
          :column-hide="table.columnHide"
          :items="map.items"
          :meta="table.meta"
          :per-page="table.params.per_page"
          :order-by="table.params.order_by"

          :sort="table.params.sort"
          :loading="table.loading"
          :to-search="table.params.q"
          :bisa-edit="false"
          @goto="table.setPage"
          @set-row="table.setPerPage"
          @refresh="table.refreshTable"
          @find="table.setSearch"
          @set-order="table.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="table.deletesDetail"
        >
          <!-- :bisa-delete="false" -->
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
// import { computed } from 'vue'
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'
import { useTransaksiPermintaanTable } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/permintaan'

const table = useTransaksiPermintaanTable()
const store = useTransaksiPermintaanForm()

defineProps({
  map: { type: Object, default: () => {} }
})

</script>
