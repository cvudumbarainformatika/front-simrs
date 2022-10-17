<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Gudang"
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
            <template #col-utama>
              <div>Gudang Utama</div>
            </template>
            <!-- <template #cell-gedung="{row}">
              <div>{{row.namagedung.nama}}</div>
            </template> -->
            <template #col-depo>
              <div>Gudang Depo</div>
            </template>
            <template #col-ruang>
              <div>Ruang Depo</div>
            </template>
            <template #col-nama>
              <div>Nama Ruang Depo</div>
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
import { useMasterGudangForm } from 'src/stores/simrs/logistik/sigarang/master/gudang/form'
import { useMasterGudangTable } from 'src/stores/simrs/logistik/sigarang/master/gudang/table'
import formDialog from './FormDialog.vue'
const table = useMasterGudangTable()
const store = useMasterGudangForm()
table.getDataTable()
</script>
