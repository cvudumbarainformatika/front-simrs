<template>
  <q-page class="q-pa-sm q-mb-xl">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Kandungan / Nama Generik"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            :ada-edit="false"
            :ada-paginasi="false"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @new-data="store.newData"
            @delete="table.deletesData"
          >
            <!-- @edit-data="store.editData" -->
            <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
            <template #col-jenisproduk>
              <div>Jenis Produk</div>
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
import { useMasterJenisProdukForm } from 'src/stores/simrs/master/farmasi/jenisproduk/form'
import { useMasterJenisProdukTable } from 'src/stores/simrs/master/farmasi/jenisproduk/table'
import formDialog from './FormDialog.vue'
const table = useMasterJenisProdukTable()
const store = useMasterJenisProdukForm()
table.getDataTable()
</script>
