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
            :ada-cari="false"
            :ada-delete="false"
            @goto="store.setPage"
            @set-row="store.setPerPage"
            @refresh="store.refreshTable"
            @find="store.setSearch"
            @set-order="store.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="store.deletesData"
          >
            <template #header-left-after-search>
              <div class="row fit q-col-gutter-sm">
                <div class="col">
                  <app-input
                    v-model="store.params.o"
                    outlined
                    valid
                    label="Cari Obat"
                    debounce="700"
                    @update:model-value="store.setSearch"
                  />
                </div>
                <div class="col">
                  <app-input
                    v-model="store.params.r"
                    outlined
                    valid
                    label="Cari Ruanngan"
                    debounce="700"
                    @update:model-value="store.setSearch"
                  />
                </div>
              </div>
            </template>
            <template #cell-Obat="{row}">
              <div class="row">
                {{ row.obat.namaobat }}
              </div>
              <div class="row no-wrap justify-between text-italic f-10">
                <div>satuan</div>
                <div class="text-weight-bold">
                  {{ row.obat.satuan_k }}
                </div>
              </div>
            </template>
            <template #cell-Ruangan="{row}">
              <div v-if="row.ruanganx">
                {{ row.ruanganx.namaruangan }}
              </div>
              <div v-if="row.gudang">
                {{ row.gudang.namaruangan }}
              </div>
            </template>
            <template #cell-Min="{row}">
              <div>{{ row.min }}</div>
            </template>
            <template #cell-Max="{row}">
              <div>{{ row.max }}</div>
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
