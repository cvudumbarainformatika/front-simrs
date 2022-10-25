<template>
  <div class="full-width">
    <div class="row q-mb-sm">
      <div class="col-12">
        <FormPermintaan />
      </div>
    </div>
    <div class="row q-mb-sm">
      <div class="col-12">
        <TabelPermintaan />
      </div>
    </div>
  </div>
</template>
<script setup>
import FormPermintaan from './FormPermintaan.vue'
import { routerInstance } from 'src/boot/router'
import { uniqueId } from 'src/modules/utils'
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'
import TabelPermintaan from './TabelPermintaan.vue'
import { useTransaksiPermintaanTable } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/permintaan'

const store = useTransaksiPermintaanForm()
const table = useTransaksiPermintaanTable()

store.getPenggunas()
store.getPenanggungJawabs()
store.getPenggunaRuang()
table.getDepo()
table.getRuang()
table.getMapingDepo()

const slug = 'TPN-' + uniqueId()
store.setForm('reff', slug)
routerInstance.replace({ name: 'sigarang.transaksi.permintaan', params: { slug } })
</script>
