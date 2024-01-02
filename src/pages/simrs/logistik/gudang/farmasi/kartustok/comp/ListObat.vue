<template>
  <q-list
    separator
  >
    <q-item
      v-for="(item, i) in store.items"
      :key="i"
      clickable
    >
      <q-item-section style="width:40%">
        {{ item?.nama_obat }} <span class="text-negative f-10"> {{ item?.kd_obat }}</span>
      </q-item-section>
      <q-item-section
        style="width:60%"
        side
      >
        <div class="row items-center full-width q-col-gutter-xs">
          <div class="col-3 text-right">
            {{ hitungSaldoAwal(item?.saldoawal) ?? 0 }}
          </div>
          <div class="col-3 text-right">
            {{ hitungPenerimaan(item?.penerimaanrinci) ?? 0 }}
          </div>
          <div class="col-3 text-right">
            {{ hitungMutasi(item?.mutasi) ?? 0 }}
          </div>
          <div class="col-3 text-right">
            {{ hitungSaldoAwal(item?.saldoawal) + hitungPenerimaan(item?.penerimaanrinci) - hitungMutasi(item?.mutasi) }}
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useKartuStokFarmasiStore } from '../../../../../../../stores/simrs/farmasi/katustok'

const store = useKartuStokFarmasiStore()

function hitungSaldoAwal(arr) {
  return arr.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)
}

function hitungPenerimaan(arr) {
  return arr.reduce((x, y) => parseFloat(x) + parseFloat(y.jml_terima_k), 0)
}

function hitungMutasi(arr) {
  return arr.reduce((x, y) => parseFloat(x) + parseFloat(y.jml), 0)
}
</script>
