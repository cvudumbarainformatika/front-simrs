<template>
  <q-page>
    <div class="q-pa-lg">
      <q-card class="my-card full-width">
        <q-card-section>
          <div class="full-width row justify-between items-center content-between">
            <div class="col-grow">
              <div
                class="flex flex-column items-center flex-center"
              >
                <div class="col text-left">
                  <div class="f-14 text-weight-bold">
                    {{ store.title }}
                  </div>
                  <div class="title-desc">
                    {{ store.subtitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <app-table
            id="printMe"
            title="Rekap Absens Pegawai"
            :columns="store.columns"
            :column-hide="store.columnHide"
            :items="store.items"
            :meta="store.meta"
            :per-page="store.params.per_page"
            :order-by="store.params.order_by"
            :sort="store.params.sort"
            :loading="store.loading"
            row-image="foto"
            :text-size="11"
            :default-btn="false"
            :ada-tambah="false"
            :to-search="store.params.q"
            @set-row="store.setPerPage"
            @goto="store.setPage"
            @search="store.enterSearch"
            @find="store.setSearch"
            @refresh="store.refreshTable"
          >
            <template #header-left-after-search>
              <div class="q-ml-sm">
                <q-select
                  v-model="flag"
                  dense
                  outlined
                  option-value="kode_jenis"
                  option-label="jenispegawai"
                  behavior="menu"
                  map-options
                  emit-value
                  :options="store.jenis_pegawai"
                  label="Jenis Pegawai"
                  style="min-width:150px"
                  @update:model-value="changeFlag"
                />
              </div>
            </template>
          </app-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useMasterPoliStore } from 'src/stores/antrian/master/poli'

const store = useMasterPoliStore()

console.log(store)
</script>
