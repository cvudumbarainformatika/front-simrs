<template>
  <div class="q-py-xs">
    <div v-if="!store.form?.details.length" style="width: 90vw; height: 100%;">
      <app-no-data />
    </div>
    <div v-if="store.form?.details.length" style="width: 90vw; height: 100%;">
      <div class="row no-wrap q-col-gutter-xs text-weight-bold">
        <div class="col-1">
          No
        </div>
        <div :class="tipe==='rs'?'col-6':'col-5'">
          Obat
        </div>
        <div v-if="tipe!=='rs'" class="col-1">
          Aturan
        </div>
        <div class="col-1 text-right">
          Jumlah
        </div>
        <div class="col-1 text-right">
          Satuan
        </div>

        <div class="col-1 text-right">
          Harga
        </div>
        <div class="col-1 text-right">
          Subtotal
        </div>
        <div class="col-1 text-center">
          #
        </div>
      </div>
      <div v-for="(det, i) in store.form?.details" :key="i">
        <div class="row no-wrap q-col-gutter-xs">
          <div class="col-1">
            {{ i+1 }}
          </div>
          <div :class="tipe==='rs'?'col-6':'col-5'">
            {{ det?.namaobat }}
          </div>
          <div v-if="tipe!=='rs'" class="col-1">
            {{ det?.aturan }}
          </div>
          <div class="col-1 text-right">
            {{ det?.jumlah }}
          </div>
          <div class="col-1 text-right">
            {{ det?.satuan_k }}
          </div>
          <div class="col-1 text-right">
            {{ formatDouble(det?.harga_jual,2) }}
          </div>
          <div class="col-1 text-right">
            {{ formatDouble((det?.jumlah * det?.harga_jual),2) }}
          </div>
          <div class="col-1 text-center">
            <q-btn
              flat
              color="negative"
              icon="icon-mat-delete"
              size="xs"
              @click="hapus(store.form?.details,i)"
            >
              <q-tooltip>Hapus</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'
import { usePenjualanBebasFarmasiStore } from 'src/stores/simrs/farmasi/penjualanbebas/penjualanbebas'

const store = usePenjualanBebasFarmasiStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  tipe: { type: String, default: '' }
})

function hapus (array, index) {
  array.splice(index, 1)
}
</script>
<style lang="scss" scoped>
.w5{
    width: 5%;
}
.w35{
    width: 35%;
    overflow-wrap: normal;
}
.rst{
    width: 60%/4;
}
</style>
