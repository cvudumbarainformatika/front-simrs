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
import { useStyledStore } from 'src/stores/app/styled'
import { defineAsyncComponent, watch, onMounted } from 'vue'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { laravelEcho } from 'src/modules/newsockets'

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/ListPage.vue'))
const DialogPage = defineAsyncComponent(() => import('./comp/DialogPage.vue'))

const style = useStyledStore()
const store = useEResepDepoFarmasiStore()
const apps = useAplikasiStore()
function subscribedChannel() {
  const channel = laravelEcho.private('private.notif.depo-farmasi')
  channel.subscribed(() => {
    console.log('subscribed private.notif.depo-farmasi channel !!!')
  }).listen('.notif-message', (e) => {
    console.log('listen notif', e)
    if (apps?.user?.kdruangansim === e?.message?.data?.depo && e?.message?.data?.status === '1') {
      if (store.params.page === 1) store.getSatuResep(e?.message?.data)
      else store.getDataTable(true)
    }
  })
}
onMounted(() => {
  const depo = store.depos.filter(a => a.value === apps?.user?.kdruangansim)
  if (depo.length) {
    store.setParams('kddepo', apps?.user?.kdruangansim)
    store.getDataTable(true)
  }
  subscribedChannel()
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setParams('kddepo', obj)
  const depo = store.depos.filter(a => a.value === obj)
  if (depo.length) store.getDataTable()
})
</script>
