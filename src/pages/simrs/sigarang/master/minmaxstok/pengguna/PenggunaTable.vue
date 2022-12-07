<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card
        title="Data Min Max Stok"
        desc="Data Min Max Stok Pengguna"
      >
        <template #content>
          buatkan fungsi cari depo dan cari nama barang
          <app-table
            title="Data Gudang"
            :columns="store.columns"
            :column-hide="store.columnHide"
            :items="store.items"
            :meta="store.meta"
            :per-page="store.params.per_page"
            :order-by="store.params.order_by"
            :sort="store.params.sort"
            :loading="store.loading"
            :to-search="store.params.q"
            :ada-cari="false"
            @goto="store.setPage"
            @set-row="store.setPerPage"
            @refresh="store.refreshTable"
            @find="store.setSearch"
            @set-order="store.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="store.deletesData"
          >
            <template #col-kode_rs>
              <div>Kode Barang</div>
            </template>

            <template #col-barang>
              <div>Nama Barang</div>
            </template>
            <template #cell-barang="{row}">
              <div>{{ row.barang.nama }}</div>
            </template>

            <template #col-depo>
              <div>Depo</div>
            </template>
            <template #cell-depo="{row}">
              <div>{{ row.depo?row.depo.nama:'-' }}</div>
            </template>

            <template #col-pengguna>
              <div>Pengguna</div>
            </template>
            <template #cell-pengguna="{row}">
              <div>{{ row.pengguna?row.pengguna.jabatan:'-' }}</div>
            </template>

            <template #col-min_stok>
              <div>Stok Minimun</div>
            </template>
            <template #col-max_stok>
              <div>Stok Maksimum</div>
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
import { useMinMaxPenggunaStockStore } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/pengguna/pengguna'
import formDialog from './FormDialog.vue'
const store = useMinMaxPenggunaStockStore()
store.getDataTable()
</script>
