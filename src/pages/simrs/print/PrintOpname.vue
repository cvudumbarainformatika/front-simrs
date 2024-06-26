<template>
  <div class="q-pa-sm">
    <div v-if="loading">
      <app-loading />
    </div>
    <div v-else>
      <div class="row justify-center text-weight-bold f-18">
        Blangko Stok Opname
      </div>
      <div class="row justify-center text-weight-bold f-16">
        {{ tempat }}
      </div>
      <div class="row justify-center text-weight-bold f-16">
        {{ keterangan }} per Tanggal {{ tanggal }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(false)
const depos = [
  { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
  { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
  { nama: 'Depo OK', value: 'Gd-04010103' },
  { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
  { nama: 'Depo IGD', value: 'Gd-02010104' },
  { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
  { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
]
const tempat = computed(() => {
  const tempt = depos.find(x => x.value === route?.query.kdruang)
  return tempt?.nama ?? 'Depo / Gudang tidak ditemukan'
})
const keterangan = ref('ket')
const tanggal = ref(null)
const items = ref([])
function getData () {
  const param = {
    params: {
      kdruang: route?.query.kdruang,
      from: route?.query.from,
      to: route?.query.to
    }
  }
  loading.value = true
  return new Promise(resolve => {
    api.get('v1/simrs/farmasinew/penerimaan/list-blangko', param)
      .then(resp => {
        loading.value = false
        console.log('data', resp?.data)
        items.value = resp?.data
        resolve(resp)
      })
      .catch(() => {
        loading.value = false
      })
  })
}
onMounted(() => {
  getData()
})
</script>
