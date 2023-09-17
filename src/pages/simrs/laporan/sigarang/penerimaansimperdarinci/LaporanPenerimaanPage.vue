<template>
  Laporan penerimaan simperda rinci
</template>
<script setup>
import { useSimrsLaporanSigarangPenerimaanSimperdaRinciStore } from 'src/stores/simrs/laporan/sigarang/penerimaansimperdarinci/penerimaan'

const store = useSimrsLaporanSigarangPenerimaanSimperdaRinciStore()

store.getInitialData()
</script>
