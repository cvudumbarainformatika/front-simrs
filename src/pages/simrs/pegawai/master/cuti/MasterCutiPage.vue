<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Master Cuti"
      desc="Halaman Input Master Cuti"
    >
      <template #content>
        <app-table
          title="Data Master Cuti"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <template #col-jenispegawai>
            <div>Jenis Pegawai</div>
          </template>
          <template #cell-jenispegawai="{row}">
            <div>{{ row.jenispegawai.jenispegawai }}</div>
          </template>
          <template #col-nama>
            <div>Nama Cuti</div>
          </template>
          <template #col-jumlah>
            <div>Jumlah Cuti</div>
          </template>
        </app-table>
      </template>
    </app-card>
  </div>
  <FormDialog v-model="store.isOpen" />
</template>
<script setup>
import FormDialog from './FormDialog.vue'
import { useMasterCutiPegawaiStore } from 'src/stores/simrs/pegawai/master/cuti/mastercuti'

const store = useMasterCutiPegawaiStore()
</script>
