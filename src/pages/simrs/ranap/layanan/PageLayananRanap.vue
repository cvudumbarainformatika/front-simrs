<template>
  <q-dialog
    ref="refDialog"
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
    @show="onShow"
  >
    <q-card
      square
      flat
      class="container-no-header"
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
            @toggle-left-drawer="()=> drawer = !drawer"
            @update:jeniskasus="(val)=> store.gantiJenisKasus(val, pasien)"
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
                <div
                  v-else-if="pasien?.kd_jeniskasus==='' || pasien?.kd_jeniskasus === null"
                  class="column full-height flex-center absolute-center z-top full-width"
                  style="background-color: black; opacity: .9;"
                >
                  <div class="text-white">
                    MAAF, HARAP TENTUKAN DAHULU JENIS KASUS PASIEN
                  </div>
                </div>
                <component
                  v-else
                  :is="menu.comp"
                  :key="pasien"
                  :pasien="pasien"
                  :kasus="store?.jnsKasusPasien"
                  :nakes="nakes"
                  depo="rnp"
                />
              </template>
              <template #fallback>
                <AppLoader />
              </template>
            </Suspense>
          </q-page>
          <!-- <q-page v-else>
            <AppLoader />
          </q-page> -->
        </q-page-container>
      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref, shallowRef, watchEffect } from 'vue'
// import HeaderLayout from './layoutcomp/HeaderLayout.vue'
// import LeftDrawer from './layoutcomp/LeftDrawer.vue'
// import AppLoader from 'src/components/~global/AppLoader.vue'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// import { usePenilaianRanapStore } from 'src/stores/simrs/ranap/penilaian'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
// import { useDiagnosaStore } from 'src/stores/simrs/ranap/diagnosa'

const HeaderLayout = defineAsyncComponent(() => import('./layoutcomp/HeaderLayout.vue'))
const LeftDrawer = defineAsyncComponent(() => import('./layoutcomp/LeftDrawer.vue'))
const AppLoader = defineAsyncComponent(() => import('src/components/~global/AppLoader.vue'))

const drawer = ref(false)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const store = usePengunjungRanapStore()
const auth = useAplikasiStore()
const anamnesis = useAnamnesisRanapStore()

const nakes = computed(() => {
  return auth?.user?.pegawai?.kdgroupnakes
})

const menus = ref([
  // {
  //   name: 'asessment-awal-page',
  //   label: 'Asessment Awal',
  //   icon: 'icon-mat-medical_information',
  //   comp: shallowRef(defineAsyncComponent(() => import('./asessmentAwal/IndexPage.vue')))
  // },
  {
    name: 'AnamnesisPage',
    label: 'Anamnesse $ Riwayat',
    icon: 'icon-mat-medical_information',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./anamnesis/IndexPage.vue')))
  },
  {
    name: 'PemeriksaanPage',
    label: 'Pemeriksaan',
    icon: 'icon-my-stethoscope',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./pemeriksaan/IndexPage.vue')))
  },
  {
    name: 'DiagTindPage',
    label: 'Diagnosa & Tindakan',
    icon: 'icon-mat-health_and_safety',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./diagnosaDanTindakan/IndexPage.vue')))
  },
  {
    name: 'AsessmentUlang',
    label: 'Asessment Ulang',
    icon: 'icon-fa-book-medical-solid',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./asessmentulang/IndexPage.vue')))
  },
  {
    name: 'e-resep-page',
    label: 'EResep',
    icon: 'icon-mat-receipt',
    nakes: ['1'],
    comp: shallowRef(defineAsyncComponent(() => import('../../eresep/EresepPage.vue')))
  }
])

const menu = ref(menus.value[0])

onMounted(() => {
  // console.log('nakes', nakes.value)

  menu.value = menus.value[0]
})

function menuDiganti (val) {
  menu.value = val
}

const onShow = () => {
  Promise.all([
    anamnesis.getRiwayatKehamilan(props.pasien)
  ])
}

watchEffect(() => {
  if (!props.pasien) {
    console.log('no pasien')

    store.pageLayanan = false
  }
})
</script>

<style lang="scss">
.contain{
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
    overflow: hidden;
}
</style>
