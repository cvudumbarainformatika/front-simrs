<template>
  <div class="q-pa-sm">
    <div
      class="row bg-grey-4 q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Penerimaan Simperda Rinci
      </div>
    </div>
    tabel
  </div>
</template>
<script setup>
import { useSimrsLaporanSigarangPenerimaanSimperdaRinciStore } from 'src/stores/simrs/laporan/sigarang/penerimaansimperdarinci/penerimaan'

const store = useSimrsLaporanSigarangPenerimaanSimperdaRinciStore()

store.getInitialData()
</script>
