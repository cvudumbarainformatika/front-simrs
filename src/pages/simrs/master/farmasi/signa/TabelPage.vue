<template>
  <q-page class="q-pa-sm q-mb-xl">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Volume Sediaan"
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
            @delete="table.deletesData"
            @edit-data="store.editData"
          >
            <!-- @edit-data="store.editData" -->
            <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
            <template #col-signa>
              <div>Signa</div>
            </template>
            <template #col-jumlah>
              <div>Jumlah Konsumsi per hari</div>
            </template>
            <template #cell-jumlah="{row}">
              <div>{{ formatDouble(row.jumlah,2) }}</div>
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
import formDialog from './FormDialog.vue'
import { useMasterSignaTable } from 'src/stores/simrs/master/farmasi/signa/table'
import { useMasterSignaForm } from 'src/stores/simrs/master/farmasi/signa/form'
import { formatDouble } from 'src/modules/formatter'
const table = useMasterSignaTable()
const store = useMasterSignaForm()
table.getDataTable()
</script>
