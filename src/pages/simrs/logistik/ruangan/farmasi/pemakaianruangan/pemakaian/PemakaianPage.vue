<template>
  <q-btn
    color="primary"
    label="reload"
    :loading="store.loading"
    @click="clicked()"
  />
  <app-maintenance text="Sedang Dalam Proses Pembuatan" />
</template>

<script setup>
import { notifCenterVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useFarmasiPemakaianRuanganStore } from 'src/stores/simrs/farmasi/pemakaianruangan/pemakaianruangan'
import { onMounted } from 'vue'
const store = useFarmasiPemakaianRuanganStore()
const apps = useAplikasiStore()

function clicked() {
  store.getStokRuangan()
}
onMounted(() => {
  if (apps?.user?.kdruangansim) store.setParam('kdruang', apps?.user?.kdruangansim)
  else {
    const adaRu = apps?.user?.pegawai?.kdruangansim.split('|')
    const ruNya = adaRu.filter(x => x.includes('R-'))
    if (ruNya.length > 1) notifCenterVue('ada lebih dari satu akses ruangan')
    else store.setParam('kdruang', ruNya[0])
  }
  store.getInitialData()
})
</script>

<style></style>
