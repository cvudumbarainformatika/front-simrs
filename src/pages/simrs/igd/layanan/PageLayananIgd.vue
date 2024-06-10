<template>
  <q-dialog
    ref="refDialog"
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
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
            :loading-save-dpjp="store.loadingSaveGantiDpjp"
            @toggle-left-drawer="()=> drawer = !drawer"
            @gantidpjp="(val)=>store.gantiDpjp(val, pasien)"
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
                <component
                  :is="menu.comp"
                  :key="pasien"
                  :pasien="pasien"
                  :loadingaja="loadingaja"
                  depo="igd"
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
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent, ref, shallowRef, watchEffect } from 'vue'
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung'
import { useInacbgIgd } from 'src/stores/simrs/igd/inacbg'
const store = usePengunjungIgdStore()

const HeaderLayout = defineAsyncComponent(() => import('./layoutcomp/HeaderLayout.vue'))
const LeftDrawer = defineAsyncComponent(() => import('./layoutcomp/LeftDrawer.vue'))
const drawer = ref(false)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

// defineProps({
//   pasien: {
//     type: Object,
//     default: null
//   },
//   loadingaja: {
//     type: Boolean,
//     default: false
//   }
// })

const menus = ref([
  {
    name: 'AnamnesisPage',
    label: 'Anamnesis',
    icon: 'icon-mat-medical_information',
    comp: shallowRef(defineAsyncComponent(() => import('../layanan/anamnesis/AnamnesisPage.vue')))
  },
  {
    name: 'AssesmentPage',
    label: 'Assesment',
    icon: 'icon-mat-analytics',
    comp: shallowRef(defineAsyncComponent(() => import('../layanan/assesment/AssesmentPage.vue')))
  },
  {
    name: 'penunjang-page',
    label: 'Penunjang',
    icon: 'icon-my-local_hospital',
    comp: shallowRef(defineAsyncComponent(() => import('../layanan/penunjang/PenunjangPage.vue')))
  },
  {
    name: 'e-resep-page',
    label: 'EResep',
    icon: 'icon-mat-receipt',
    comp: shallowRef(defineAsyncComponent(() => import('../../eresep/EresepPage.vue')))
  }
])
const menu = ref(menus.value[0])

const inacbg = useInacbgIgd()

function menuDiganti (val) {
  menu.value = val
}

watchEffect(() => {
  // console.log('watch effect', store.loadingTerima)
  if (store.loadingTerima === false) {
    inacbg.getDataIna(props.pasien)
    inacbg.setTotalTindakan(props.pasien)
    inacbg.setTotalLaborat(props.pasien)
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
