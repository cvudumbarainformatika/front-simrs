<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Maping Barang RS ke 108"
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
            <template #col-kode_108>
              <div>Kode 108</div>
            </template>
            <template #col-barang108>
              <div>Uraian 108</div>
            </template>
            <template #cell-barang108="{row}">
              <div>{{ row.barang108?row.barang108.uraian:'-' }}</div>
            </template>
            <template #col-kode_rs>
              <div>Kode RS</div>
            </template>
            <template #col-barangrs>
              <div>Nama Barang RS</div>
            </template>
            <template #cell-barangrs="{row}">
              <div>{{ row.barangrs?row.barangrs.nama:'-' }}</div>
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
import { useMasterMapingBarangForm } from 'src/stores/simrs/logistik/sigarang/master/mapingbarang/form'
import { useMasterMapingBarangTable } from 'src/stores/simrs/logistik/sigarang/master/mapingbarang/table'
import formDialog from './FormDialog.vue'
const table = useMasterMapingBarangTable()
const store = useMasterMapingBarangForm()
table.getDataTable()
</script>
