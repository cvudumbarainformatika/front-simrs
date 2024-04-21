<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1"
    >
      <HeaderComp
        :search="store.params.q"
        :per_page="store.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
        @set-periode="(val)=>store.setPeriodik(val)"
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
    <!-- <FilterPage /> -->
  </div>
</template>

<script setup>
import HeaderComp from 'src/pages/simrs/pendaftaran/igd/kunjungan/comp/HeaderComp.vue'
import ListKunjungan from 'src/pages/simrs/pendaftaran/igd/kunjungan/comp/ListKunjungan.vue'
import BottomComp from 'src/pages/simrs/pendaftaran/igd/kunjungan/comp/BottomComp.vue'
// eslint-disable-next-line no-unused-vars
import FilterPage from 'src/pages/simrs/pendaftaran/igd/kunjungan/comp/FilterPage.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useListKunjunganIgd } from 'src/stores/simrs/pendaftaran/kunjungan/igd/kunjungan'
import { onMounted } from 'vue'
// import KunjunganPage from 'src/pages/simrs/pendaftaran/igd/kunjungan/comp/ListKunjungan.vue';

// eslint-disable-next-line no-unused-vars
const style = useStyledStore()
const store = useListKunjunganIgd()

onMounted(() => {
  store.getLists()
})
</script>
