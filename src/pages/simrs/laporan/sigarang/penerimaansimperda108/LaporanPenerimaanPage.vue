<template>
  <div class="q-pa-sm">
    <div
      class="row bg-grey-4 q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Penerimaan Simperda 108
      </div>
    </div>
    tabel
  </div>
</template>
<script setup>
import { useSimrsLaporanSigarangPenerimaanSimperda108Store } from 'src/stores/simrs/laporan/sigarang/penerimaansimperda108/penerimaan'

const store = useSimrsLaporanSigarangPenerimaanSimperda108Store()

store.getInitialData()
</script>
