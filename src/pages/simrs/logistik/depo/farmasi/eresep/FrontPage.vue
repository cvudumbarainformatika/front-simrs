<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header">
      <HeaderComp
        ada-per-page
        ada-refresh
        use-full
        :search="store.params.q"
        :per-page="store.params.per_page"
        @cari="store.setSearch"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
      />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
      <q-scroll-area
        style="height:calc( 100% - 40px)"
      >
        <ListPage />
      </q-scroll-area>
      <div
        v-if="Object.keys(store.meta).length"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          :meta="store.meta"
          @go-to="store.setPage"
        />
      </div>
    </q-card>

    <!-- dialogPage -->
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { defineAsyncComponent, watch, onMounted } from 'vue'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/ListPage.vue'))

const style = useStyledStore()
const store = useEResepDepoFarmasiStore()
const apps = useAplikasiStore()

onMounted(() => {
  const depo = store.depos.filter(a => a.value === apps?.user?.kdruangansim)
  if (depo.length) {
    store.setParams('kddepo', apps?.user?.kdruangansim)
    store.getDataTable()
  }
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setParams('kddepo', obj)
  const depo = store.depos.filter(a => a.value === obj)
  if (depo.length) store.getDataTable()
})
</script>
