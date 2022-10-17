<template>
  <TablePage />
</template>
<script setup>
import TablePage from './TablePage.vue'
import { routerInstance } from 'src/boot/router'
import { uniqueId } from 'src/modules/utils'
import { useTransaksiPemesananTable } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/table'
import { useTransaksiPemensananForm } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/form'
const table = useTransaksiPemesananTable()
const store = useTransaksiPemensananForm()

store.resetFORM()
const slug = 'TRP-' + uniqueId()
const oldSlug = routerInstance.currentRoute.value.params.slug
table.setParam('reff', oldSlug)
table.getDataTable().then(data => {
  console.log('resolved', data)
  if (data === 'ada') {
    console.log('oldSlug')
    routerInstance.replace({ name: 'transaksi.pemesanan', params: { slug: oldSlug } })
    table.setParam('reff', oldSlug)
  } else {
    console.log('slug')
    routerInstance.replace({ name: 'transaksi.pemesanan', params: { slug } })
    store.resetFORM()
    table.setParam('reff', slug)
  }
})
</script>
