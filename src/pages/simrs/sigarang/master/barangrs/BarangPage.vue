<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Barang RS"
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
            <template #col-kode>
              <div>Kode</div>
            </template>
            <template #col-nama>
              <div>Nama Barang RS</div>
            </template>
            <template #col-satuan>
              <div>Satuan</div>
            </template>
            <template #cell-satuan="{row}">
              <div>{{ row.satuan?row.satuan.nama:'-' }}</div>
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
import { useMasterBarangRSForm } from 'src/stores/simrs/logistik/sigarang/master/barangrs/form'
import { useMasterBarangRSTable } from 'src/stores/simrs/logistik/sigarang/master/barangrs/table'
import formDialog from './FormDialog.vue'
const table = useMasterBarangRSTable()
const store = useMasterBarangRSForm()
table.getDataTable()
</script>
