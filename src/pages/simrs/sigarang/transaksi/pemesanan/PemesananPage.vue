<template>
  <div>
    <div v-if="!store.kontrakOpen">
      <KontrakTable />
    </div>
    <div v-if="store.kontrakOpen">
      <TablePage />
    </div>
    <!-- <div><TablePage /></div> -->
  </div>
</template>
<script setup>
// import TablePage from './unused/TablePage.vue'
import TablePage from './newPemesanan/TablePage.vue'
import KontrakTable from './newPemesanan/KontrakTable.vue'
import { routerInstance } from 'src/boot/router'
import { uniqueId } from 'src/modules/utils'
import { useTransaksiPemesananTable } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/table'
import { useTransaksiPemensananForm } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/form'
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
const table = useTransaksiPemesananTable()
const store = useTransaksiPemensananForm()

const setting = useSettingsStore()
store.resetFORM()
const slug = 'TRP-' + uniqueId()
const oldSlug = routerInstance.currentRoute.value.params.slug
table.setParam('reff', oldSlug)
setting.transaksiLoading = true
table.getDataTable().then(data => {
  setting.transaksiLoading = false
  // console.log('Pemesanan resolved', data)
  // console.log('Pemesanan resolved kontrak', store.kontrakOpen)
  if (data === 'ada') {
    // console.log('oldSlug')
    routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug: oldSlug } })
    table.setParam('reff', oldSlug)
    // store.kontrakOpen = true
    // console.log('Pemesanan resolved kontrak if', store.kontrakOpen)
  } else {
    // console.log('slug')
    // console.log('Pemesanan resolved kontrak else', store.kontrakOpen)
    routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug } })
    store.resetFORM()
    table.setParam('reff', slug)
  }
})
</script>
