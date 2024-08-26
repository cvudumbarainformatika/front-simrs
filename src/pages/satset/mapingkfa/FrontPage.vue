<template>
  <div>
    <app-table-extend
      id="printMe"
      :columns="store.columns"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      row-no
      use-full
      text-cari="Cari ..."
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
    >
      <template #col-kd_obat>
        <div>Kode Obat</div>
      </template>
      <template #col-nama_obat>
        <div>Nama Obat</div>
      </template>
      <template #col-kode_kfa>
        <div>Kode KFA</div>
      </template>

      <template #cell-kode_kfa="{ row }">
        <div v-if="!row?.kode_kfa===null || !row.edit" class="row wrap">
          {{ row?.kode_kfa }}
        </div>
        <div v-if="row?.kode_kfa===null || row.edit" class="row wrap">
          <app-input
            v-model="row.kode_kfa"
            label="Input Kode KFA"
            valid
            outlined
          />
        </div>
      </template>
      <template #custom-btn="{ row }">
        <div v-if="row?.kode_kfa===null || row.edit" class="row no-wrap">
          <div v-if="!row?.kode_kfa===null" class="col-auto">
            <q-btn
              flat
              dense
              color="dark"
              no-caps
              icon="icon-mat-edit"
              @click="edit(row)"
            />
          </div>
          <div class="col-auto">
            <q-btn
              flat
              dense
              color="primary"
              no-caps
              icon="icon-mat-save"
              @click="simpan(row)"
            />
          </div>
        </div>
      </template>
    </app-table-extend>
  </div>
  <kfaPage ref="refKfaPage" v-model="bukaKfa" />
</template>
<script setup>
import { useMapingKfaStore } from 'src/stores/satset/mapingkfa'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const store = useMapingKfaStore()

const kfaPage = defineAsyncComponent(() => import('./comp/SatsetKfaPage.vue'))
const bukaKfa = ref(false)
const refKfaPage = ref(null)
function simpan (val) {
  console.log('simpan', val)
  // bukaKfa.value = true
  // refKfaPage.value.getDataTable()
}
function edit (val) {
  console.log('edit', val)
}

onMounted(() => {
  store.getDataTable()
})
</script>
