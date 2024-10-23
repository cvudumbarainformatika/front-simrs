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
            :menus="filterredMenus"
            :menu="menu"
            @click-menu="(val)=> menuDiganti(val)"
          />
        </q-drawer>

        <!-- CONTAINER ============================================================================================-->
        <q-page-container>
          <q-page
            class="contain bg-grey-3"
          >
            <!-- <Suspense
              :key="menu.comp"
              timeout="0"
            >
              <template #default> -->
            <div class="fit" v-if="loading && !pasien?.anamnesis">
              <AppLoader />
            </div>
            <div v-else class="fit">
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
            </div>
            <!-- </template>
              <template #fallback>
                <AppLoader />
              </template>
            </Suspense> -->
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
// eslint-disable-next-line no-unused-vars
import { computed, defineAsyncComponent, onMounted, ref, shallowRef, watchEffect } from 'vue'

// import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
import useLayanan from './useLayanan'

const HeaderLayout = defineAsyncComponent(() => import('./layoutcomp/HeaderLayout.vue'))
const LeftDrawer = defineAsyncComponent(() => import('./layoutcomp/LeftDrawer.vue'))
const AppLoader = defineAsyncComponent(() => import('src/components/~global/AppLoader.vue'))

const drawer = ref(false)
const anamnesis = useAnamnesisRanapStore()

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

const { filterredMenus, menu, store, nakes, menuDiganti } = useLayanan(props?.pasien)

// const store = usePengunjungRanapStore()
// const auth = useAplikasiStore()

// const nakes = computed(() => {
//   return auth?.user?.pegawai?.kdgroupnakes
// })

// const menus = ref([
//   // {
//   //   name: 'asessment-awal-page',
//   //   label: 'Asessment Awal',
//   //   icon: 'icon-mat-medical_information',
//   //   comp: shallowRef(defineAsyncComponent(() => import('./asessmentAwal/IndexPage.vue')))
//   // },
//   {
//     name: 'AnamnesisPage',
//     label: 'Anamnesse $ Riwayat',
//     icon: 'icon-mat-medical_information',
//     nakes: ['1', '2', '3'],
//     comp: shallowRef(defineAsyncComponent(() => import('./anamnesis/IndexPage.vue')))
//   },
//   {
//     name: 'PemeriksaanPage',
//     label: 'Pemeriksaan',
//     icon: 'icon-my-stethoscope',
//     nakes: ['1', '2', '3'],
//     comp: shallowRef(defineAsyncComponent(() => import('./pemeriksaan/IndexPage.vue')))
//   },
//   {
//     name: 'DiagTindPage',
//     label: 'Diagnosa & Tindakan',
//     icon: 'icon-mat-health_and_safety',
//     nakes: ['1', '2', '3'],
//     comp: shallowRef(defineAsyncComponent(() => import('./diagnosaDanTindakan/IndexPage.vue')))
//   },
//   {
//     name: 'Penunjang',
//     label: 'Penunjang',
//     icon: 'icon-mat-post_add',
//     nakes: ['1', '2', '3'],
//     comp: shallowRef(defineAsyncComponent(() => import('./penunjang/IndexPage.vue')))
//   },
//   {
//     name: 'AsessmentUlang',
//     label: 'Asessment Ulang',
//     icon: 'icon-fa-book-medical-solid',
//     nakes: ['1', '2', '3'],
//     comp: shallowRef(defineAsyncComponent(() => import('./asessmentulang/IndexPage.vue')))
//   },
//   {
//     name: 'hais',
//     label: 'HAIs',
//     icon: 'icon-my-artboard',
//     nakes: ['2', '3'],
//     comp: shallowRef(defineAsyncComponent(() => import('./hais/IndexPage.vue')))
//   },
//   {
//     name: 'konsulspesialis',
//     label: 'Konsul Spesialis',
//     icon: 'icon-mat-textsms',
//     nakes: ['1'],
//     comp: shallowRef(defineAsyncComponent(() => import('./konsul/IndexPage.vue')))
//   },
//   {
//     name: 'e-resep-page',
//     label: 'EResep',
//     icon: 'icon-mat-receipt',
//     nakes: ['1'],
//     comp: shallowRef(defineAsyncComponent(() => import('../../eresep/EresepPage.vue')))
//   }
// ])

// const filterredMenus = computed(() => {
//   const byPass = auth.user
//   console.log('byPass', byPass)

//   return menus.value.filter(menu => menu.nakes.includes(nakes.value))
// })

// const menu = ref(null)

// onMounted(() => {
//   console.log('mounted pageLayananRanap', auth?.user?.pegawai?.nik)

//   menu.value = filterredMenus.value[0]
// })

// function menuDiganti (val) {
//   menu.value = val
// }

const onShow = () => {
  // console.log('pasien', props.pasien)
  Promise.all([
    anamnesis.getRiwayatKehamilan(props.pasien)

  ])
}

// watchEffect(() => {
//   if (!props.pasien) {
//     console.log('no pasien')

//     store.pageLayanan = false
//   }
// })
</script>

<style lang="scss">
.contain{
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
    overflow: hidden;
}
</style>
