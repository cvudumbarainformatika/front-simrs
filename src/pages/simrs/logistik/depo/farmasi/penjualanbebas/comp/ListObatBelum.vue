<template>
  <div class="q-py-xs">
    <div v-if="!store.form?.details.length" style="width: 90vw; height: 100%;">
      <app-no-data />
    </div>
    <div v-if="store.form?.details.length">
      <div class="row no-wrap q-col-gutter-xs">
        <div class="col-1">
          No
        </div>
        <div class="col-7">
          Obat
        </div>
        <div class="col-1 text-right">
          Jumlah
        </div>
        <div class="col-1">
          Aturan
        </div>
        <div class="col-1 text-right">
          Harga
        </div>
        <div class="col-1 text-right">
          Subtotal
        </div>
      </div>
      <div v-for="(det, i) in store.form?.details" :key="i">
        <div class="row no-wrap q-col-gutter-xs">
          <div class="col-1">
            {{ i+1 }}
          </div>
          <div class="col-7">
            {{ det }}
          </div>
          <div class="col-1 text-right">
            Jumlah
          </div>
          <div class="col-1">
            Aturan
          </div>
          <div class="col-1 text-right">
            Harga
          </div>
          <div class="col-1 text-right">
            Subtotal
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePenjualanBebasFarmasiStore } from 'src/stores/simrs/farmasi/penjualanbebas/penjualanbebas'

const store = usePenjualanBebasFarmasiStore()
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
