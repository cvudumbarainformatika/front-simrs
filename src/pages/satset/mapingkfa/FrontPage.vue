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
      <template #col-satset_uuid>
        <div>Sat Set UUID</div>
      </template>
      <template #cell-satset_uuid="{ row }">
        <div v-if="!row?.satset_uuid===null" class="row wrap">
          {{ row?.satset_uuid }}
        </div>
        <div v-else class="row wrap">
          <q-btn
            push
            dense
            color="teal"
            no-caps
            label="Buka Tabel KFA"
            @click="openKfa(row)"
          />
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
function openKfa (val) {
  console.log('buka kfa', val, refKfaPage.value)
  bukaKfa.value = true
  refKfaPage.value.getDataTable()
}

onMounted(() => {
  store.getDataTable()
})
</script>
