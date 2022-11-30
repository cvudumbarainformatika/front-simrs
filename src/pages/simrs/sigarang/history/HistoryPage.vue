<template>
  <q-page class="q-mb-lg q-pb-lg">
    <div class="row q-col-gutter-sm">
      <!-- <div class="col-2">
        <MenuHistory />
      </div> -->
      <div class="col-12">
        <TablePage />
      </div>
    </div>
  </q-page>
</template>
<script setup>
// import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'
// import MenuHistory from './MenuHistory.vue'
import TablePage from './TablePage.vue'
// const table = useHistoryTable()
// table.pilihTransaksi({ id: 2, name: 'Pemesanan', value: 'Pemesanan', icon: 'icon-mat-inventory_2' })
</script>
