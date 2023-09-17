<template>
  Laporan penerimaan simperda 108
</template>
<script setup>
import { useSimrsLaporanSigarangPenerimaanSimperda108Store } from 'src/stores/simrs/laporan/sigarang/penerimaansimperda108/penerimaan'

const store = useSimrsLaporanSigarangPenerimaanSimperda108Store()

store.getInitialData()
</script>
