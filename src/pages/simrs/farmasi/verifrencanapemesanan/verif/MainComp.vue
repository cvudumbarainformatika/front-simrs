<template>
  <div
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header">
      <HeaderComp
        ada-per-page
        ada-refresh
        use-full
        :search="store.params.q"
        :flag="store.params.flag"
        :per-page="store.params.per_page"
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
        style="height:calc( 100% - 86px);"
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
  </div>
  <app-fullscreen-blue
    v-model="store.isOpen"
    title="Verifikasi Rencana Pemesanan"
    @hide="store.delRencanan"
  >
    <template #default>
      <DialogComp />
    </template>
  </app-fullscreen-blue>
</template>
<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useVerifikasiRencanaPesanStore } from 'src/stores/simrs/farmasi/verifikasiperencanaanpemesanan/verifrencana'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()
const store = useVerifikasiRencanaPesanStore()

const HeaderComp = defineAsyncComponent(() => import('./HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./BottomComp.vue'))
const ListPage = defineAsyncComponent(() => import('./ListComp.vue'))
const DialogComp = defineAsyncComponent(() => import('./DialogComp.vue'))

onMounted(() => {
  store.getDataTable()
})
</script>
