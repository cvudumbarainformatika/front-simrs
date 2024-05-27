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
        :custom="store.custom"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
        @refresh="store.getData"
        @set-periode="(val)=>store.setPeriodik(val)"
        @filter="store.setFilters"
        @normal="store.notCustom"
        @set-poli="(val)=> store.setPolis(val)"
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
      <ListPermintaanok
        :key="store.items"
        :items="store.items"
        :loading="store.loading"
        :loading-terima="store.loadingTerima"
        @pelayanan="bukaPelayanan"
      />
    </q-card>

    <FilterPage
      v-model="store.filters"
      @close="store.setFilters"
      @filter-data="store.filterData"
    />

    <page-pelayanan
      :key="pasien"
      v-model="store.pagePelayanan"
      :pasien="pasien"
      :loading-terima="store?.loadingTerima"
    />
    <!-- <CetakRekapBilling
      v-model="printRekap"
      :pasien="pasien"
      @tutup="actPrintRekap"
    />-->
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePermintaanOperasistore } from 'src/stores/simrs/kamaroperasi/permintaanoperasi'
// import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { ref } from 'vue'
import HeaderComp from './comp/HeaderComp.vue'
import FilterPage from './comp/FilterPage.vue'
import BottomComp from './comp/BottomComp.vue'
import ListPermintaanok from './comp/ListPermintaanok.vue'

import PagePelayanan from '../pelayanan/IndexPage.vue'

// import { useQuasar } from 'quasar'
// import { useSpeechStore } from 'src/stores/antrian/speech'
// import { useSettingsAplikasi } from 'src/stores/simrs/settings'

const style = useStyledStore()
const pasien = ref(null)
// const speech = useSpeechStore()
const store = usePermintaanOperasistore()
// const diagnosa = useLayananPoli()
// const pasien = ref(null)
// const indexVoices = ref(0)

function bukaPelayanan (val) {
  pasien.value = val
  store.pagePelayanan = true
  // store.setTerima(val)
}

</script>
