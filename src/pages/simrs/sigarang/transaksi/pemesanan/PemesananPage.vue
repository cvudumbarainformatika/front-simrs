<template>
  <TablePage />
</template>
<script setup>
import TablePage from './TablePage.vue'
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
  console.log('Pemesanan resolved', data)
  if (data === 'ada') {
    console.log('oldSlug')
    routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug: oldSlug } })
    table.setParam('reff', oldSlug)
  } else {
    console.log('slug')
    routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug } })
    store.resetFORM()
    table.setParam('reff', slug)
  }
})
</script>
