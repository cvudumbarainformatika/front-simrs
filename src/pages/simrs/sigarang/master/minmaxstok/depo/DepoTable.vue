<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card
        title="Data Min Max Stok"
        desc="Data Min Max Stok Depo"
      >
        <template #content>
          <div class="fit row wrap justify-start">
            <div class="q-mr-sm">
              <q-input
                v-model="store.params.depo"
                outlined
                class="search-big"
                borderless
                debounce="500"
                dense
                placeholder="Cari Depo"
                @update:model-value="store.setDepoSearch"
                @keydown.enter.prevent="store.setDepoSearch"
              >
                <template #prepend>
                  <q-icon
                    name="icon-mat-search"
                    size="20px"
                  />
                </template>
              </q-input>
            </div>
            <div class="q-mr-sm">
              <q-input
                v-model="store.params.barang"
                outlined
                class="search-big"
                borderless
                debounce="500"
                dense
                placeholder="Cari barang"
                @update:model-value="store.setBarangSearch"
                @keydown.enter.prevent="store.setBarangSearch"
              >
                <template #prepend>
                  <q-icon
                    name="icon-mat-search"
                    size="20px"
                  />
                </template>
              </q-input>
            </div>
          </div>
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
import { useMinMaxDepoStockStore } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/depo/depo'
// import { ref } from 'vue'
import formDialog from './FormDialog.vue'
const store = useMinMaxDepoStockStore()
store.getDataTable()

// const searchDepo = ref('')
// const depoEnter = () => {
//   console.log('depo', searchDepo.value)
// }
// const searchBarang = ref('')
// const barangEnter = () => {
//   console.log('depo', searchBarang.value)
// }
</script>
