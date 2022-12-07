<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card
        title="Data Min Max Stok"
        desc="Data Min Max Stok Depo"
      >
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
            <template #col-gedung>
              <div>Gedung</div>
            </template>
            <template #col-gudang>
              <div>Gudang</div>
            </template>
            <!-- <template #cell-gedung="{row}">
              <div>{{row.namagedung.nama}}</div>
            </template> -->
            <template #col-depo>
              <div>Depo</div>
            </template>
            <template #col-lantai>
              <div>Lantai</div>
            </template>
            <template #col-nama>
              <div>Nama</div>
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
import { useMinMaxStokForm } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/form'
import { useMinMaxStokTable } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/table'
import formDialog from './FormDialog.vue'
const table = useMinMaxStokTable()
const store = useMinMaxStokForm()
table.getInitialData()
</script>
