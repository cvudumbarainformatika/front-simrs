<template>
  <q-page class="q-pa-sm q-mb-xl">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Mapping Pengguna Ruang"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="table.deletesData"
          >
            <template #col-ruang>
              <div>Ruang</div>
            </template>
            <template #col-penanggungjawab>
              <div>Penanggung Jawab</div>
            </template>
            <template #col-pengguna>
              <div>Penguna</div>
            </template>
            <template #col-kode>
              <div>Kode</div>
            </template>
            <template #cell-pengguna="{row}">
              <div>{{ row.pengguna?row.pengguna.jabatan:'-' }}</div>
            </template>
            <template #cell-penanggungjawab="{row}">
              <div>{{ row.penanggungjawab?row.penanggungjawab.jabatan:'-' }}</div>
            </template>
            <template #cell-ruang="{row}">
              <div>{{ row.ruang?row.ruang.uraian:'-' }}</div>
            </template>
          </app-table>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <formDialog v-model="store.isOpen" />
  </q-page>
</template>
<script setup>
import { useMasterPenggunaRuangForm } from 'src/stores/simrs/logistik/sigarang/master/penggunaruang/form'
import { useMasterPenggunaRuangTable } from 'src/stores/simrs/logistik/sigarang/master/penggunaruang/table'
import formDialog from './FormDialog.vue'
const table = useMasterPenggunaRuangTable()
const store = useMasterPenggunaRuangForm()
table.getDataTable()
store.getDataPenggunas()
store.getDataRuangs()
</script>
