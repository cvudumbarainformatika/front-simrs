<template>
  <div
    class="row full-height full-width bg-grey-4 shadow-1"
  >
    <div class="col-8 full-height q-pa-xs">
      <form-resep
        :pasien="props?.pasien"
        :depo="props?.depo"
      />
    </div>
    <div class="col-4 full-height q-pa-xs">
      <listpage />
    </div>
  </div>
</template>

<script setup>
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { defineAsyncComponent, shallowRef, onUnmounted } from 'vue'
import FormResep from './comp/FormResep.vue'
const props = defineProps({
  pasien: { type: Object, default: null },
  depo: { type: String, default: '' }
})

const listpage = shallowRef(defineAsyncComponent(() => import('./comp/LitsPage.vue')))

const store = usePermintaanEResepStore()
onUnmounted(() => {
  store.listRacikan = []
  store.listPemintaanSementara = []
  store.noreseps = []
  store.noresep = ''
  store.setForm('jenisresep', '')
  store.resetForm()
})
</script>
