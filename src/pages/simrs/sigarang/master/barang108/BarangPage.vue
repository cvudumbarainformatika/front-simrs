<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Barang 108"
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
            <template #col-uraian>
              <div>Uraian</div>
            </template>
            <template #col-maping>
              <div>Maping 50</div>
            </template>
            <template #cell-maping="{row}">
              <div class="row">
                <div class="q-mr-sm">
                  {{ row?.maping?.kode50 }}
                </div>
                <div class="q-mr-sm">
                  {{ row?.maping?.uraian50 }}
                </div>
              </div>
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
import { useMasterBarang108Form } from 'src/stores/simrs/logistik/sigarang/master/barang108/form'
import { useMasterBarang108Table } from 'src/stores/simrs/logistik/sigarang/master/barang108/table'
import formDialog from './FormDialog.vue'
const table = useMasterBarang108Table()
const store = useMasterBarang108Form()
table.getDataTable()
</script>
