<template>
  <div
    class=""
    :class="style.componentfull?'':'q-pa-xs'"
    :style="`max-height: ${!style.componentfull ? h : h + 40}px; overflow:hidden`"
  >
    <div class="header">
      <HeaderComp
        ada-per-page
        ada-refresh
        use-full
        label-cari="cari obat ..."
        :search="store.params.q"
        :flag="store.params.flag"
        :per-page="store.params.per_page"
        :items="store.items"
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
      style="height: calc( 100vh - 170px);"
    >
      <!-- style="`height:{props.tinggi}px`" -->
      <q-scroll-area
        style="height: calc(100%);"
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
</template>

<script setup>
import { notifCenterVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useStyledStore } from 'src/stores/app/styled'
import { useFarmasiPemakaianRuanganStore } from 'src/stores/simrs/farmasi/pemakaianruangan/pemakaianruangan'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const h = ref(516)
const style = useStyledStore()
const store = useFarmasiPemakaianRuanganStore()
const apps = useAplikasiStore()

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/TableComp.vue'))

onMounted(() => {
  // console.log('ref', pageRef.value.$el.clientHeight);
  if (apps?.user?.kdruangansim) store.setParam('kdruang', apps?.user?.kdruangansim)
  else {
    const adaRu = apps?.user?.pegawai?.kdruangansim.split('|')
    const ruNya = adaRu.filter(x => x.includes('R-'))
    if (ruNya.length > 1) notifCenterVue('ada lebih dari satu akses ruangan')
    else store.setParam('kdruang', ruNya[0])
  }
  store.getInitialData()
})
</script>

<style></style>
