<template>
  <div class="bg-white">
    <div class="q-pa-sm">
      <div class="row items-center full-width">
        <div class="col-2">
          Nomor Transaksi
        </div>
        <div class="col-10">
          <app-input v-model="store.form.notranskonsi" label="Nomor Transaksi" valid outlined readonly />
        </div>
      </div>
      <div class="row items-center full-width q-mt-sm">
        <div class="col-2">
          Penyedia
        </div>
        <div class="col-10">
          <app-autocomplete-new
            v-model="store.form.penyedia"
            outlined
            label="Pilih Penyedia"
            autocomplete="nama"
            option-label="nama"
            option-value="kode"
            :loading="store.loadingPenyedia"
            :source="store.penyedias"
            @on-select="penyediaSelected"
          />
        </div>
      </div>
      <div class="row items-center full-width q-mt-sm">
        <div class="col-2">
          Tanggal Transaksi
        </div>
        <div class="col-10">
          <app-input-date-human
            :model="store.tglTrans"
            label="Tanggal Transaksi"
            outlined
            @db-model="store.setForm('tgl',$event)"
            @set-display="(event)=>{ store.tglTrans = event}"
          />
        </div>
      </div>
      <div v-if="!store.items.length && !store.loading">
        <app-no-data />
      </div>
      <div v-if="store.items.length && !store.loading" class="q-mb-xl">
        <TableComp />
      </div>
      <div v-if="store.loading">
        <app-loading />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useListPemakaianObatKonsinyasiStore } from 'src/stores/simrs/farmasi/konsinyasi/listkonsinyasi'
const store = useListPemakaianObatKonsinyasiStore()
store.getInitialData()
const TableComp = defineAsyncComponent(() => import('./CompTable.vue'))
function penyediaSelected (val) {
  store.setForm('penyedia', val)
  store.setParams('penyedia', val)
  store.getData()
  console.log(val)
  console.log(store.form)
}
</script>

<style></style>
