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
      <template #col-kode_kfa_93>
        <div>Kode KFA 93..</div>
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
            @update:model-value="setInput($event, row)"
          />
        </div>
      </template>
      <template #cell-kode_kfa_93="{ row }">
        <div v-if="!row?.kode_kfa_93===null || !row.edit" class="row wrap">
          {{ row?.kode_kfa_93 }}
        </div>
        <div v-if="row?.kode_kfa_93===null || row.edit" class="row wrap">
          <app-input
            v-model="row.kode_kfa_93"
            label="Input Kode KFA"
            valid
            outlined
            @update:model-value="setInput($event, row)"
          />
        </div>
      </template>
      <template #custom-btn="{ row }">
        <div class="row no-wrap">
          <!-- <div v-if="row.kode_kfa" class="col-auto"> -->
          <div v-if="row.kode_kfa_93 && row?.kfa?.kode_kfa_93 !== row.kode_kfa_93" class="col-auto">
            <q-btn
              push
              dense
              color="primary"
              no-caps
              :loading="row.loadingKfa"
              :disable="row.loading || row.loadingKfa"
              :label="row?.kfa?.kode_kfa_93 !== row.kode_kfa_93 ?'simpan KFA':'update KFA'"
              @click="store.simpanKFA(row)"
            />
          </div>
          <div v-if=" !row.edit" class="col-auto">
            <q-btn
              flat
              dense
              color="dark"
              no-caps
              icon="icon-mat-edit"
              :loading="row.loading"
              :disable="row.loading || row.loadingKfa"
              @click="edit(row)"
            />
          </div>
          <div v-if=" row.edit" class="col-auto">
            <q-btn
              flat
              dense
              color="primary"
              no-caps
              :loading="row.loading"
              :disable="row.loading || row.loadingKfa"
              icon="icon-mat-save"
              @click="simpan(row)"
            />
          </div>
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { useMapingKfaStore } from 'src/stores/satset/mapingkfa'
import { onMounted } from 'vue'

const store = useMapingKfaStore()

function simpan (val) {
  if (val.edit) val.edit = false
  console.log('simpan', val)
  store.simpan(val)
  // bukaKfa.value = true
  // refKfaPage.value.getDataTable()
}
function edit (val) {
  val.edit = true
  console.log('edit', val)
}
function setInput (evt, val) {
  val.edit = true
  console.log(val)
}

onMounted(() => {
  store.getDataTable()
})
</script>
