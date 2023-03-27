<template>
  <div class="full-width">
    <!-- timer {{ tanggal.hour }} :{{ tanggal.minute }}: {{ tanggal.second }} -->
    <!-- <div class="row q-mb-sm">
      <div class="col-12">
        <app-no-selected-page
          text="Permintaan ditutup untuk sementara karena ada Stok Opname, dibuka kembali awal bulan depan"
          color="primary"
        />
      </div>
    </div>-->
    <!-- <div class="row q-mb-sm">
      <div class="col-12">
        <app-no-selected-page
          text="Permintaan ditutup untuk hari ini"
          color="primary"
        />
      </div>
    </div> -->
    <div class="row q-mb-sm">
      <div class="col-12">
        <FormPermintaan />
      </div>
    </div>
    <div class="row q-mb-sm">
      <!-- <div class="col-12">
        <TabelPermintaan />
      </div> -->
      <div v-if="table.loadingTable">
        <app-loading />
      </div>
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
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import { onBeforeRouteLeave } from 'vue-router'
// import { onMounted } from 'vue'
const setting = useSettingsStore()
const store = useTransaksiPermintaanForm()
const table = useTransaksiPermintaanTable()

table.getDepo()
store.getPenggunas()
store.getPenanggungJawabs()
store.getPenggunaRuang()
store.setNoPermintaan()
table.getRuang()
table.getMapingDepo()
table.getCurrentStok()
// table.getMinMaxPengguna()
const slug = 'TPN-' + uniqueId()
const oldSlug = routerInstance.currentRoute.value.params.slug
table.setParam('reff', oldSlug)
setting.transaksiLoading = true
table.getDataTable().then(data => {
  setting.transaksiLoading = false
  // console.log('Pemesanan resolved', data)
  if (data === 'ada') {
    store.setForm('reff', oldSlug)
    // console.log('oldSlug')
    routerInstance.replace({ name: 'sigarang.transaksi.permintaan', params: { slug: oldSlug } })
    table.setParam('reff', oldSlug)
  } else {
    store.setForm('reff', slug)
    // console.log('slug')
    routerInstance.replace({ name: 'sigarang.transaksi.permintaan', params: { slug } })
    table.setParam('reff', slug)
  }
})
onBeforeRouteLeave((to, from) => {
  table.resetAllData()
})
</script>
