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

const onShow = () => {
  console.log('pasien pageLayananRanap', props.pasien)
  Promise.all([
    anamnesis.getRiwayatKehamilan(props.pasien)

  ])
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
