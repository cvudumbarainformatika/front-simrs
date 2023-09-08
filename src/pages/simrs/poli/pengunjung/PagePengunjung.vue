<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header bg-primary text-white">
      <HeaderComp
        class="q-pa-xs"
        :tanggal="store.params.tgl"
        :search="store.params.q"
        :per-page="store.params.per_page"
        :full="style.componentfull"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
        @refresh="store.getData"
        @set-periode="(val)=>store.setPeriodik(val)"
        @filter="store.setFilters"
      />
    </div>
    <div class="footer absolute-bottom bg-primary text-white z-top">
      <!-- <FooterComp :items="store.items" /> -->
      <BottomComp
        v-if="store.meta !==null"
        :key="store.meta"
        :meta="store.meta"
        @go-to="store.setPage"
      />
    </div>
    <q-card
      flat
      no-shadow
      class="my-flex-1 scroll"
    >
      <list-pengunjung
        :key="store.items"
        :items="store.items"
        :loading="store.loading"
        @tindakan="bukaTindakan"
      />
    </q-card>

    <FilterPage
      v-model="store.filters"

      @close="store.setFilters"
      @filter-data="store.filterData"
    />

    <page-tindakan
      :key="pasien"
      v-model="store.pageTindakan"
      :pasien="pasien"
    />
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { onMounted, ref } from 'vue'
import HeaderComp from './comp/HeaderComp.vue'
// import FooterComp from './comp/FooterComp.vue'
import FilterPage from './comp/FilterPage.vue'
import BottomComp from './comp/BottomComp.vue'
import ListPengunjung from './comp/ListPengunjung.vue'
// import PageTindakan from './comp/PageTindakan.vue'
import PageTindakan from '../tindakan/IndexPage.vue'

const style = useStyledStore()
const store = usePengunjungPoliStore()
const diagnosa = useLayananPoli()
const pasien = ref(null)

// const txt = ref('SEMUA')
// const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])
onMounted(() => {
  store.getData()
  diagnosa.getDiagnosaDropdown()
  diagnosa.getTindakanDropdown()
})

function bukaTindakan(val) {
  pasien.value = val
  store.togglePageTindakan()
  console.log('pasien', pasien.value)
}
</script>
