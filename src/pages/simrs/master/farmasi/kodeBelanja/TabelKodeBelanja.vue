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
            <template #col-rs1>
              <div>Kode</div>
            </template>
            <template #col-rs2>
              <div>Nama Obat</div>
            </template>
            <template #cell-rs2="{row}">
              <div class="box">
                {{ row.rs2 }}
              </div>
            </template>
            <template #col-rs3>
              <div>Satuan</div>
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
import { useMasterKodeBelanjaForm } from 'src/stores/simrs/master/farmasi/kodeBelanja/form'
import { useMasterKodeBelanjaTable } from 'src/stores/simrs/master/farmasi/kodeBelanja/table'
import formDialog from './FormDialog.vue'
const table = useMasterKodeBelanjaTable()
const store = useMasterKodeBelanjaForm()
table.getDataTable()
</script>

<style scoped>
.q-table td div.box {
  white-space: normal !important;
    inline-size: 300px;
    overflow-wrap: break-word;
}
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: normal !important;
}
.print{
  position: absolute;
    right: 30px;
    top: 5px;
    z-index: 10;
}
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.border-box{
  border: 1px solid black;
}
.border-tb{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.border-left{
  border-left: 1px solid black;
}
.border-right{
  border-right: 1px solid black;
}
.border-bottom{
  border-bottom: 1px solid black;
}
</style>
