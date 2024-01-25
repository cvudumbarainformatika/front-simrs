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
        :flag="store.params.flag"
        @cari="store.setSearch"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
        @set-flag="store.setFlag"
        @set-periode="(val)=>store.setPeriodik(val)"
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
        <ListComp />
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
    <app-fullscreen-blue
      v-model="store.isOpen"
      @close="store.setClose"
    >
      <template #default>
        <DialogPage />
      </template>
    </app-fullscreen-blue>
  </q-page>
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useStyledStore } from 'src/stores/app/styled'
import { useReturDepoStore } from 'src/stores/simrs/farmasi/retur/depo/returdepo'
import { defineAsyncComponent, onMounted, watch } from 'vue'

const style = useStyledStore()
const store = useReturDepoStore()
const apps = useAplikasiStore()

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const ListComp = defineAsyncComponent(() => import('./comp/ListComp.vue'))
const DialogPage = defineAsyncComponent(() => import('./comp/DialogPage.vue'))

onMounted(() => {
  const depo = apps.depos.filter(a => a.value === apps?.user?.kdruangansim)
  if (depo.length) {
    store.setParams('kddepo', apps?.user?.kdruangansim)
    store.getDataTable()
  }
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setParams('kddepo', obj)
  const depo = apps.depos.filter(a => a.value === obj)
  if (depo.length) store.getDataTable()
  else {
    store.items = []
    store.meta = {}
  }
})
</script>

<style></style>
