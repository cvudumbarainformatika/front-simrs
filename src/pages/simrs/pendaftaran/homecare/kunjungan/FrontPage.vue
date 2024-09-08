<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1"
    >
      <HeaderComp
        :tanggal="store.params.tgl"
        :search="store.params.q"
        :per-page="store.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:60px"
    >
      <ListComp
        :key="store.items"
        :items="store.items"
        :loading="store.loading"
      />
    </div>
    <div class="fixed-bottom">
      <BottomComp
        v-if="store.meta !==null"
        :key="store.meta"
        :meta="store.meta"
        @go-to="store.setPage"
      />
    </div>
  </div>
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import ListComp from './comp/ListComp.vue'
import BottomComp from './comp/BottomComp.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { onMounted, onUnmounted } from 'vue'
import { useListKunjunganHomeCareStore } from 'src/stores/simrs/pendaftaran/kunjungan/homecare/list'

const style = useStyledStore()
const store = useListKunjunganHomeCareStore()

onMounted(() => {
  store.getLists()
})

onUnmounted(() => {
  store.setTglAwal()
})
</script>
