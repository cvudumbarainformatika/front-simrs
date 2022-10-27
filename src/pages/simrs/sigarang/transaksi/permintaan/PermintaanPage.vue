<template>
  <div class="full-width">
    <div class="row q-mb-sm">
      <div class="col-12">
        <FormPermintaan />
      </div>
    </div>
    <div class="row q-mb-sm">
      <!-- <div class="col-12">
        <TabelPermintaan />
      </div> -->
      <div
        v-for="(apem,i) in table.mapGudang"
        :key="i"
        class="col-12"
      >
        <TabelTujuanPermintaan :map="apem" />
      </div>
    </div>
  </div>
</template>
<script setup>
import FormPermintaan from './FormPermintaan.vue'
import { routerInstance } from 'src/boot/router'
import { uniqueId } from 'src/modules/utils'
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'
// import TabelPermintaan from './TabelPermintaan.vue'
import TabelTujuanPermintaan from './TabelTujuanPermintaan.vue'
import { useTransaksiPermintaanTable } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/permintaan'
// import { onMounted } from 'vue'

const store = useTransaksiPermintaanForm()
const table = useTransaksiPermintaanTable()

table.getDepo()
store.getPenggunas()
store.getPenanggungJawabs()
store.getPenggunaRuang()
store.setNoPermintaan()
table.getRuang()
table.getMapingDepo()

const slug = 'TPN-' + uniqueId()
const oldSlug = routerInstance.currentRoute.value.params.slug
table.setParam('reff', oldSlug)
table.getDataTable().then(data => {
  console.log('Pemesanan resolved', data)
  if (data === 'ada') {
    store.setForm('reff', oldSlug)
    console.log('oldSlug')
    routerInstance.replace({ name: 'sigarang.transaksi.permintaan', params: { slug: oldSlug } })
    table.setParam('reff', oldSlug)
  } else {
    store.setForm('reff', slug)
    console.log('slug')
    routerInstance.replace({ name: 'sigarang.transaksi.permintaan', params: { slug } })
    table.setParam('reff', slug)
  }
})
</script>
