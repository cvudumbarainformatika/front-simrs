<template>
  <q-dialog maximized>
    <q-card>
      <q-bar dense class="bg-grey text-white">
        <q-space />
        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <app-table-extend
          id="printMe"
          :columns="columns"
          :items="items"
          :meta="meta"
          :per-page="params.per_page"
          :loading="loading"
          :to-search="params.q"
          :default-btn="false"
          :ada-tambah="false"
          :ada-filter="false"
          row-no
          text-cari="Cari ..."
          @find="setSearch"
          @goto="setPage"
          @set-row="setPerPage"
          @refresh="refreshTable"
        >
          <template #col-kd_obat>
            <div>Kode Obat</div>
          </template>
          <template #col-nama_obat>
            <div>Nama Obat</div>
          </template>
          <template #col-satset_uuid>
            <div>Sat Set UUID</div>
          </template>
          <template #cell-satset_uuid="{ row }">
            <div v-if="!row?.satset_uuid===null" class="row wrap">
              {{ row?.satset_uuid }}
            </div>
            <div v-else class="row wrap">
              input
            </div>
          </template>
        </app-table-extend>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'

const items = ref([])
const meta = ref({})
const params = ref({
  q: '',
  page: 1,
  per_page: 10
})
const loading = ref(false)
const columns = ref(['kd_obat', 'nama_obat', 'satset_uuid'])
function setParams (key, val) {
  params.value[key] = val
}
function setSearch (val) {
  setParams('q', val)
  setParams('page', 1)
  getDataTable()
}
function setPerPage (val) {
  setParams('per_page', val)
  setParams('page', 1)
  getDataTable()
}
function setPage (val) {
  setParams('page', val)
  getDataTable()
}
function refreshTable () {
  getDataTable()
}
function getDataTable () {
  loading.value = true
  const param = { params: params.value }
  return new Promise(resolve => {
    api.get('v1/satusehat/mapingkfa/get-kfa', param)
      .then(resp => {
        loading.value = false
        console.log('master maping', resp?.data)
        items.value = resp?.data?.data ?? resp?.data
        meta.value = resp?.data?.meta ?? resp?.data
        resolve(resp)
      })
      .catch(() => { loading.value = false })
  })
}

defineExpose({
  getDataTable
})
</script>
