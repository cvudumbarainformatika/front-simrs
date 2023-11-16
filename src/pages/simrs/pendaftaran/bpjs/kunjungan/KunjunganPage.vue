<template>
  <div class="column full-height">
    <!-- <app-loading-bpjs /> -->
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
        @refresh="store.getLists"
        @filter="store.setFilters"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:60px"
    >
      <ListKunjungan
        :key="store.items"
        :items="store.items"
        :loading="store.loading"
        :loading-h="store.loadingH"
        @hapus="store.hapusPasien"
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
    <!-- right -->
    <FilterPage
      v-model="store.filters"

      @close="store.setFilters"
      @filter-data="store.filterData"
    />
  </div>
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import ListKunjungan from './comp/ListKunjungan.vue'
import BottomComp from './comp/BottomComp.vue'
import FilterPage from './comp/FilterPage.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useListKunjunganBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/lists'
import { onMounted, onUnmounted } from 'vue'
// import { loadingBlock } from 'src/modules/utils'

const style = useStyledStore()
const store = useListKunjunganBpjsStore()

onMounted(() => {
  // loadingBlock('show')
  store.getLists()
})

onUnmounted(() => {
  // store.setTglAwal()
})
</script>
