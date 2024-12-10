<template>
  <div class="row q-pa-sm bg-primary text-white f-18 text-weight-bold">
    Form Pengeluaran Pengembalian Barang Pinjaman
  </div>
  <div ref="refActions">
    <div class="row items-center q-py-sm">
      <div class="col-2">
        <app-autocomplete
          v-model="store.params.kdpbf"
          label="Pilih Penyedia"
          :source="store.penyedias"
          option-label="nama"
          option-value="kode"
          :loading="store.loading"
          :disable="store.loading || store.loadingNoper"
          outlined
          clearable
          @selected="pbfSelected"
        />
      </div>
      <div class="col-2">
        <app-autocomplete
          v-model="store.params.nopenerimaan"
          label="Pilih Nomor Penerimaan"
          :source="store.nopenerimaans"
          option-label="nopenerimaan"
          option-value="nopenerimaan"
          :loading="store.loadingNoper"
          :disable="store.loading || store.loadingNoper"
          outlined
          :valid="!store.params.kdpbf || store.params.nopenerimaan"
          clearable
          @selected="penerimaanSelected"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePengembalianPinjamanStore } from 'src/stores/simrs/farmasi/pengembalian/pengembalianpinjaman'
const store = usePengembalianPinjamanStore()
function pbfSelected (val) {
  store.setParams('kdpbf', val)
  store.setForm('kdpbf', val)
  if (val) store.getNopenerimaans()
  else {
    store.nopenerimaans = []
    store.setForm('nopenerimaan', null)
  }
}
function penerimaanSelected (val) {
  console.log(val)
  store.setForm('nopenerimaan', val)
}
</script>
