<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1"
    >
      <HeaderComp
        :search="store.params.q"
        :per-page="store.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
        @set-periode="store.setPeriodik"
        @refresh="store.getData"
        @filter="store.setFilters"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:60px"
    >
      <ListSharing
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
import { useStyledStore } from 'src/stores/app/styled'
import { usePasienSharingStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sharing'
import HeaderComp from './comp/HeaderComp.vue'
import ListSharing from './comp/ListSharing.vue'
import BottomComp from './comp/BottomComp.vue'

const style = useStyledStore()
const store = usePasienSharingStore()
store.getInitialData()
</script>
