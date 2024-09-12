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
import { useInacbgIgd } from 'src/stores/simrs/igd/inacbg'
import { usePermintaanCathLab } from 'src/stores/simrs/penunjang/cathlab/permintaan'
const store = usePermintaanCathLab()

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

// console.log('qwer', pasien)

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
    name: 'CathlabPage',
    label: 'Cathlab',
    icon: 'icon-mat-medical_information',
    comp: shallowRef(defineAsyncComponent(() => import('./layanan/CathlabPage.vue')))
  }
])
const menu = ref(menus.value[0])

const inacbg = useInacbgIgd()

function menuDiganti (val) {
  menu.value = val
}

watchEffect(() => {
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
