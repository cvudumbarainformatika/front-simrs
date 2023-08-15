<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Pengguna Ruang"
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
            <template #col-level_1>
              <div>Level I</div>
            </template>
            <template #col-level_2>
              <div>Level II</div>
            </template>
            <template #col-level_3>
              <div>Level III</div>
            </template>
            <template #col-level_4>
              <div>Level IV</div>
            </template>
            <template #col-jabatan>
              <div>Jabatan</div>
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
import { useMasterPenggunaForm } from 'src/stores/simrs/logistik/sigarang/master/pengguna/form'
import { useMasterPenggunaTable } from 'src/stores/simrs/logistik/sigarang/master/pengguna/table'
import formDialog from './FormDialog.vue'
const table = useMasterPenggunaTable()
const store = useMasterPenggunaForm()
table.getDataTable()
</script>
