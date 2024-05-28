<template>
  <q-list
    separator
  >
    <template v-if="store.loading">
      <q-item
        v-for="n in 30"
        :key="n"
      >
        <q-item-section style="width:40%">
          <q-skeleton type="text" />
        </q-item-section>
        <q-item-section
          style="width:60%"
          side
        >
          <div class="row items-center full-width q-col-gutter-xs">
            <div class="col-3">
              <div
                style="display: flex; justify-content: end;"
                class="full-width"
              >
                <q-skeleton
                  type="text"
                  width="100px"
                />
              </div>
            </div>
            <div class="col-3 row justify-end">
              <q-skeleton
                type="text"
                width="100px"
              />
            </div>
            <div class="col-3 row justify-end">
              <q-skeleton
                type="text"
                width="100px"
              />
            </div>
            <div class="col-3 row justify-end">
              <q-skeleton
                type="text"
                width="100px"
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </template>
    <template v-else>
      <q-item
        v-for="(item, i) in store.items"
        :key="i"
        clickable
        @click="store.setItem(item)"
      >
        <q-item-section style="width:40%">
          <div class="row">
            <div>{{ item?.nama_obat }}</div> <div class="text-negative f-10 q-ml-lg">
              {{ item?.kd_obat }}
            </div>
          </div>
        </q-item-section>
        <q-item-section
          style="width:60%"
          side
        >
          <div class="row items-center full-width q-col-gutter-xs">
            <div class="col-3 text-right">
              {{ hitungSaldoAwal(item?.saldoawal) ?? 0 }}
            </div>
            <div class="col-3 text-right text-primary">
              {{ hitungPenerimaan(item?.penerimaanrinci) ?? 0 }}
            </div>
            <div class="col-3 text-right text-negative">
              {{ hitungMutasi(item?.mutasi) ?? 0 }}
            </div>
            <div class="col-3 text-right text-teal text-weight-bold">
              {{ hitungSaldoAwal(item?.saldoawal) + hitungPenerimaan(item?.penerimaanrinci) - hitungMutasi(item?.mutasi) }}
            </div>
          </div>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script setup>
import { useKartuStokFarmasiStore } from '../../../../../../../stores/simrs/farmasi/katustok'

const store = useKartuStokFarmasiStore()

function hitungSaldoAwal (arr) {
  return arr.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)
}

function hitungPenerimaan (arr) {
  return arr.reduce((x, y) => parseFloat(x) + parseFloat(y.jml_terima_k), 0)
}

function hitungMutasi (arr) {
  return arr.reduce((x, y) => parseFloat(x) + parseFloat(y.jml), 0)
}
</script>
