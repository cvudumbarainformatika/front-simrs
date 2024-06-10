<template>
  <div ref="pageRef" class="" :style="`height: calc( 100vh - ${51}px); overflow: hidden`">
    <div
      class=""
      :class="style.componentfull?'':'q-pa-xs'"
      :style="`max-height: ${style.componentfull ? h + 105 : h + 95}px; overflow:scroll`"
    >
      <div class="header">
        <HeaderComp
          ada-per-page
          ada-refresh
          use-full
          label-cari="cari pasien ..."
          :search="store.params.q"
          :dokter="store.params.dokter"
          :flag="store.params.flag"
          :per-page="store.params.per_page"
          :items="store.items"
          :role="apps?.user?.pegawai?.role_id"
          @cari="store.setSearch"
          @cari-dokter="store.setSearchDokter"
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
        :style="`height: calc( 100vh - ${ style.componentfull ? 61 : 110}px);`"
      >
        <q-scroll-area
          style="height: 100%;"
        >
          <ListPage />
        </q-scroll-area>

        <div
          class="absolute-bottom "
        >
          <BottomComp
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
  </div>
</template>

<script setup>
// import { notifCenterVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useStyledStore } from 'src/stores/app/styled'
import { useTandaTanganStore } from 'src/stores/simrs/logistik/sigarang/tantatangan/tandatangan'
import { useListResepDokterToDepoStore } from 'src/stores/simrs/pelayanan/resep/listresep'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const h = ref(0)
const pageRef = ref(null)
const style = useStyledStore()
const store = useListResepDokterToDepoStore()
const apps = useAplikasiStore()

const tandatangan = useTandaTanganStore()

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))

const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))

const ListPage = defineAsyncComponent(() => import('./comp/TableComp.vue'))

const DialogPrintPage = defineAsyncComponent(() => import('./comp/DialogPrintPage.vue'))

const TandaTanganPage = defineAsyncComponent(() => import('src/pages/simrs/sigarang/tandatangan/TandaTanganPage.vue'))

function hapus (val) {
  console.log('hapus', val)

  // store.simpanPemakaian()
}

function selesai (val) {
  console.log('selesai')
  store.selesaiPemakaian(val)
}
onMounted(() => {
  console.log('ref', pageRef.value.clientHeight)
  h.value = pageRef.value.clientHeight
  console.log('apps', apps?.user?.pegawai?.role_id)
  // if (apps?.user?.kdruangansim) {
  //   store.setParam('kdruang', apps?.user?.kdruangansim)
  //   // store.setForm('kdruang', apps?.user?.kdruangansim)
  // }
  // else {
  //   const adaRu = apps?.user?.pegawai?.kdruangansim.split('|')
  //   const ruNya = adaRu.filter(x => x.includes('R-'))
  //   if (ruNya.length > 1) notifCenterVue('ada lebih dari satu akses ruangan')
  //   else {
  //     store.setParam('kdruang', ruNya[0])
  //     // store.setForm('kdruang', ruNya[0])
  //   }
  // }
  store.getInitialData()
})
</script>

<style></style>
