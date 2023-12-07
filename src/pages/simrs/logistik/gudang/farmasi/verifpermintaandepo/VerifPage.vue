<template>
  <div class="q-pa-xs bg-white column">
    <div
      class="col-auto fixed-top"
      style="z-index:2 ;"
    >
      <div
        class="row bg-primary text-white q-pa-xs"
      >
        <div class="f-16 text-weight-bold">
          Halaman Verifikasi Permintaan Depo
        </div>
      </div>
      <HeaderComp
        :search="store.params.q"
        :per-page="store.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
        @set-periode="store.setPeriodik"
        @refresh="store.getPermintaanDepo"
        @filter="store.setFilters"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:30px"
    >
      <ListComp />
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
// import { dateFullFormat } from 'src/modules/formatter'
import { useStyledStore } from 'src/stores/app/styled'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useVerifPermintaanDepoStore } from 'src/stores/simrs/farmasi/verifpermintaandepo/verifdepo'
import { defineAsyncComponent } from 'vue'
const store = useVerifPermintaanDepoStore()
const style = useStyledStore()

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const ListComp = defineAsyncComponent(() => import('./comp/ListComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))

store.getInitialData()

</script>

<style>
.box {
  white-space: normal !important;
  inline-size: 170px;
  overflow-wrap: break-word;
}

</style>
