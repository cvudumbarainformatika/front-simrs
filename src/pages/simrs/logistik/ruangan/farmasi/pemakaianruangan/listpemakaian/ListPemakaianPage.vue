<template>
  <div
    class=""
    :class="style.componentfull?'':'q-pa-xs'"
    :style="`max-height: ${!style.componentfull ? h : h + 105}px; overflow:scroll`"
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
        @hapus="hapus"
        @selesai="selesai"
      />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
      :style="`height: calc( 100vh - ${ style.componentfull ? 61 : 172}px);`"
    >
      <!-- style="`height:{props.tinggi}px`" -->
      <q-scroll-area
        style="height: calc(100%);"
      >
        <ListPage :style="`margin-bottom:  ${ pakai ? 95 : 55}px;`" />
      </q-scroll-area>

      <div
        class="absolute-bottom "
      >
        <BottomComp
          v-if="Object.keys(store.meta).length"
          style="z-index: 5;"
          class="bg-primary text-white"
          :meta="store.meta"
          @go-to="store.setPage"
        />
      </div>
    </q-card>
    <DialogPrintPage
      ref="dialogPrint"
      v-model="store.isOpen"
      :item="store.dataToPrint"
    />
    <TandaTanganPage v-model="tandatangan.isOpen" />
  </div>
</template>

<script setup>
import { notifCenterVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useStyledStore } from 'src/stores/app/styled'
import { useListPemakaianRuanganStore } from 'src/stores/simrs/farmasi/pemakaianruangan/listpemakaian'
import { useTandaTanganStore } from 'src/stores/simrs/logistik/sigarang/tantatangan/tandatangan'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const h = ref(582)
const style = useStyledStore()
const store = useListPemakaianRuanganStore()
const apps = useAplikasiStore()
const tandatangan = useTandaTanganStore()

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/TableComp.vue'))

const DialogPrintPage = defineAsyncComponent(() => import('./comp/DialogPrintPage.vue'))
const TandaTanganPage = defineAsyncComponent(() => import('src/pages/simrs/sigarang/tandatangan/TandaTanganPage.vue'))

const pakai = computed(() => {
  const ada = store.items.filter(a => a.checked === true)
  if (ada.length) return true
  else return false
})
function hapus(val) {
  console.log('hapus', val)

  // store.simpanPemakaian()
}
function selesai(val) {
  console.log('selesai')
  store.selesaiPemakaian(val)
}
onMounted(() => {
  // console.log('ref', pageRef.value.$el.clientHeight);
  if (apps?.user?.kdruangansim) {
    store.setParam('kdruang', apps?.user?.kdruangansim)
    // store.setForm('kdruang', apps?.user?.kdruangansim)
  } else {
    const adaRu = apps?.user?.pegawai?.kdruangansim.split('|')
    const ruNya = adaRu.filter(x => x.includes('R-'))
    if (ruNya.length > 1) notifCenterVue('ada lebih dari satu akses ruangan')
    else {
      store.setParam('kdruang', ruNya[0])
      // store.setForm('kdruang', ruNya[0])
    }
  }
  store.getInitialData()
})
</script>

<style></style>
