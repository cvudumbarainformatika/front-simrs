<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Rekap Absensi Pegawai"
      desc="Halaman Rekap Absensi per bulan"
    >
      <template #content>
        <app-table
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          :default-btn="false"
          :ada-tambah="false"
          @goto="store.setPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <template #col-nama>
            <div>Nama</div>
          </template>
        </app-table>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useRekapAbsensiPegawaiStore } from 'src/stores/simrs/pegawai/user/rekapabsen/rekapabsen'

const store = useRekapAbsensiPegawaiStore()
store.getInitialData()
</script>
