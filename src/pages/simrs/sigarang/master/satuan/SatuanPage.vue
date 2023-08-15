<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Satuan"
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
            <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
            <template #col-kecil>
              <div>Satuan Kecil</div>
            </template>
            <template #col-nama>
              <div>Satuan Besar</div>
            </template>
          </app-table>
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <formDialog v-model="store.isOpen" />
  </q-page>
</template>
<script setup>
import { useMasterSatuanForm } from 'src/stores/simrs/logistik/sigarang/master/satuan/form'
import { useMasterSatuanTable } from 'src/stores/simrs/logistik/sigarang/master/satuan/table'
import formDialog from './FormDialog.vue'
const table = useMasterSatuanTable()
const store = useMasterSatuanForm()
table.getDataTable()
</script>
