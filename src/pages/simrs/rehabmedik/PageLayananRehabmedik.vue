<template>
  <q-dialog
    ref="refDialog"
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
    @hide="emits('tutup')"
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
                <!-- <div
                  v-if="pasien?.dokter==='' || pasien?.dokter === null"
                  class="column full-height flex-center absolute-center z-top full-width"
                  style="background-color: black; opacity: .9;"
                >
                  <div class="text-white">
                    Maaf, DPJP Pasien Ini Belum Ada ... Harap Input DPJP Terlebih dahulu
                  </div>
                </div> -->
                <component
                  :is="menu.comp"
                  :key="pasien"
                  :pasien="pasien"
                  :depo="pasien?.flagdepo"
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
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'
import HeaderLayout from './layoutcomp/HeaderLayout.vue'
import LeftDrawer from './layoutcomp/LeftDrawer.vue'

const drawer = ref(false)
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  console.log('pasien', props.pasien)
})

const emits = defineEmits(['tutup'])

const menus = ref([
  {
    name: 'e-resep-page',
    label: 'EResep',
    icon: 'icon-mat-receipt',
    comp: shallowRef(defineAsyncComponent(() => import('src/pages/simrs/eresep/EresepPage.vue')))
  }
])
const menu = ref(menus.value[0])

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
