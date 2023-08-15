<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-5">
        <ListKelengkapan />
      </div>
      <div class="col-7">
        <FormKelengkapan />
      </div>
    </div>
  </div>
</template>
<script setup>
import ListKelengkapan from './ListKelengkapan.vue'
import FormKelengkapan from './FormKelengkapan.vue'
// import { useKelengkapanSuratPenerimaan } from 'src/stores/simrs/logistik/sigarang/transaksi/penerimaan/kelengkapan'

// const kelengkapan = useKelengkapanSuratPenerimaan()
</script>
