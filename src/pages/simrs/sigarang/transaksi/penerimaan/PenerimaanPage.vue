<template>
  <div>
    <PenerimaanForm />
  </div>
</template>
<script setup>
import { routerInstance } from 'src/boot/router'
import { uniqueId } from 'src/modules/utils'
import { useTransaksiPenerimaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/penerimaan/form'
import PenerimaanForm from './PenerimaanForm.vue'

// const oldSlug = routerInstance.currentRoute.value.params.slug
const store = useTransaksiPenerimaanForm()
store.searchPemesanan()
const slug = 'TRM-' + uniqueId()
store.setForm('reff', slug)
routerInstance.replace({ name: 'sigarang.transaksi.penerimaan', params: { slug } })
// store.getDataPenerimaan().then(data => {
//   console.log('data', data)
//   if (data !== undefined) {
//     routerInstance.replace({ name: 'transaksi.penerimaan', params: { slug: oldSlug } })
//     store.setForm('reff', oldSlug)
//   } else {
//   }
// })
</script>
