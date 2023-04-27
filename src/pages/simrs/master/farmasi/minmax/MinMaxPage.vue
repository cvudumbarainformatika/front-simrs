<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Barang 108"
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
            <template #col-kode>
              <div>Kode</div>
            </template>
            <template #col-uraian>
              <div>Uraian</div>
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
    <formDialog v-model="store.formOpen" />
  </q-page>
</template>
<script setup>
import { useMasterFarmasiMinMaxObatStore } from 'src/stores/simrs/master/farmasi/minmax/minmax.js'
import formDialog from './FormDialog.vue'
const store = useMasterFarmasiMinMaxObatStore()
store.getDataTable()
store.getDataObat()
store.getDataRuang()
</script>
