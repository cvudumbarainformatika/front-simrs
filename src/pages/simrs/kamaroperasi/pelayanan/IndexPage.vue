<template>
  <q-dialog
    ref="refDialog"
    persistent
    :maximized="true"
    transition-hide="slide-right"
  >
    <q-card
      v-if="pasien?.dokter !== '' || pasien?.dokter !== null"
      flat
    >
      <q-layout
        view="lHr Lpr lFf"
        container
        class="shadow-2 rounded-borders z-top"
      >
        <q-header
          elevated
          class="bg-primary"
        >
          <HeaderLayout
            :pasien="pasien"
            :loading-save-dpjp="store.loadingSaveGantiDpjp"
            :loading-finish="store.loadingTerima"
            @toggle-left-drawer="drawer = !drawer"
            @gantidpjp="(val)=>store.gantiDpjp(val, pasien)"
            @layanan-selesai="store.setLayananSelesai(pasien)"
          />
        </q-header>
        <!-- LEFT DRAWER ======================================================================================-->
        <q-drawer
          v-model="drawer"
          elevated
          bordered
          show-if-above
          :width="230"
          :breakpoint="400"
        >
          <LeftDrawer
            :key="pasien"
            :pasien="pasien"
            :menus="menus"
            :menu="menu"
            @click-menu="(val)=> menuDiganti(val)"
            @history-pasien="historyPasien"
            @print-rekap="emits('printRekapBill')"
            @icare="getIcare"
            @show-profile="profile = !profile"
          />
        </q-drawer>

        <!-- RIGHT DRAWER ======================================================================================-->
        <q-drawer
          v-model="drawerRight"
          side="right"
          show-if-above
          overlay
          bordered
          :width="700"
          :breakpoint="500"
        >
          <RightDrawer
            :key="pasien"
            :pasien="pasien"
            @close="drawerRight = false"
          />
        </q-drawer>

        <!-- CONTAINER ============================================================================================-->
        <q-page-container>
          <q-page
            class="contain bg-grey-3"
          >
            <Suspense
              :key="menu.comp"
              timeout="0"
            >
              <template #default>
                <div
                  v-if="pasien?.dokter==='' || pasien?.dokter === null"
                  class="column full-height flex-center absolute-center z-top full-width"
                  style="background-color: black; opacity: .9;"
                >
                  <div class="text-white">
                    Maaf, DPJP Pasien Ini Belum Ada ... Harap Input DPJP Terlebih dahulu
                  </div>
                </div>
                <component
                  :is="menu.comp"
                  v-else
                  :key="pasien"
                  :pasien="pasien"
                  :loading-terima="store.loadingTerima"
                  depo="ok"
                />
              </template>
              <template #fallback>
                <AppLoader />
              </template>
            </Suspense>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-card>

    <!-- dialogProfile -->
    <DialogProfile
      :key="pasien"
      v-model="profile"
      :pasien="pasien"
    />
  </q-dialog>
</template>

<script setup>
import LeftDrawer from '../pelayanan/complayout/LeftDrawer.vue'
import RightDrawer from '../pelayanan/complayout/RightDrawer.vue'
import HeaderLayout from '../pelayanan/complayout/HeaderLayout.vue'
import DialogProfile from './DialogProfile.vue'
// import LoaderPage from './LoaderPage.vue'
import { useInacbgPoli } from 'src/stores/simrs/pelayanan/poli/inacbg'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { useMasterPemeriksaanFisik } from 'src/stores/simrs/master/poliklinik/pemeriksaanfisik'
import { defineAsyncComponent, onBeforeUnmount, onMounted, onUnmounted, ref, shallowRef } from 'vue'
// import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'

const store = usePengunjungPoliStore()
const master = useMasterPemeriksaanFisik()
const fisik = usePemeriksaanFisik()
const drawer = ref(false)
const drawerRight = ref(false)
const profile = ref(false)
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const emits = defineEmits(['printRekapBill'])

const menus = ref([
  {
    name: 'PersiapanoperasiPage',
    label: 'Persiapan Operasi',
    icon: 'icon-mat-medical_information',
    comp: shallowRef(defineAsyncComponent(() => import('./comppelayanan/pagemenu/PersiapanoperasiPage.vue')))
  },
  {
    name: 'e-resep-page',
    label: 'EResep',
    icon: 'icon-mat-receipt',
    comp: shallowRef(defineAsyncComponent(() => import('../../eresep/EresepPage.vue')))
    // comp: shallowRef(defineAsyncComponent(() => import('./comptindakan/pagemenu/EResepPage.vue')))
  }
])
const menu = ref(menus.value[0])

const inacbg = useInacbgPoli()
onMounted(() => {
  // console.log('pasien', props?.pasien)
  menu.value = menus.value[0]
  inacbg.getDataIna(props.pasien)
  inacbg.setTotalTindakan(props.pasien)
  inacbg.setTotalLaborat(props.pasien)
  master.getData()
  fisik.initReset(false, props?.pasien)
})

onBeforeUnmount(() => {
  // console.log('beforeunmount')
  menu.value = menus.value[0]
  fisik.setFullCanvasFalse()
  // fisik.initReset(true)
})

onUnmounted(() => {
  // console.log('pasien', props.pasien)
  menu.value = menus.value[0]
  fisik.setFullCanvasFalse()
})

function historyPasien () {
  drawerRight.value = !drawerRight.value
}
function getIcare () {
  store.getDataIcare(props.pasien).then(resp => {
    if (resp) {
      console.log('anu', resp?.response?.url)
      window.open(resp?.response?.url, '_blank')
    }
  })
}

function menuDiganti (val) {
  menu.value = val
}

</script>

<style lang="scss">
.contain{
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
    overflow: hidden;
}
</style>
