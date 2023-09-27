<template>
  <q-dialog
    ref="refDialog"
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card flat>
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
            @toggle-left-drawer="drawer = !drawer"
          />
        </q-header>
        <!-- LEFT DRAWER ======================================================================================-->
        <q-drawer
          v-model="drawer"
          elevated
          bordered
          show-if-above
          :width="220"
          :breakpoint="400"
        >
          <LeftDrawer
            :key="pasien"
            :pasien="pasien"
            :menus="menus"
            :menu="menu"
            @click-menu="(val)=> menu = val"
          />
        </q-drawer>

        <!-- CONTAINER ============================================================================================-->
        <q-page-container>
          <q-page class="contain bg-grey-3">
            <component
              :is="menu.comp"
              :key="pasien"
              :pasien="pasien"
            />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script setup>
import LeftDrawer from './complayout/LeftDrawer.vue'
import HeaderLayout from './complayout/HeaderLayout.vue'
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { useInacbgPoli } from 'src/stores/simrs/pelayanan/poli/inacbg'

const drawer = ref(false)
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const menus = ref([
  {
    name: 'AnamnesisPage',
    label: 'Anamnesis',
    icon: 'icon-mat-medical_information',
    comp: shallowRef(defineAsyncComponent(() => import('./comptindakan/pagemenu/AnamnesisPage.vue')))
  },
  {
    name: 'PemeriksaanPage',
    label: 'Pemeriksaan Fisik',
    icon: 'icon-my-stethoscope',
    comp: shallowRef(defineAsyncComponent(() => import('./comptindakan/pagemenu/PemeriksaanPage.vue')))
  },
  {
    name: 'LayananPage',
    label: 'Layanan',
    icon: 'icon-mat-analytics',
    comp: shallowRef(defineAsyncComponent(() => import('./comptindakan/pagemenu/LayananPage.vue')))
  },
  {
    name: 'penunjang-page',
    label: 'Penunjang',
    icon: 'icon-my-local_hospital',
    comp: shallowRef(defineAsyncComponent(() => import('./comptindakan/pagemenu/PenunjangPage.vue')))
  },
  {
    name: 'perencanaan-page',
    label: 'Plann',
    icon: 'icon-mat-style',
    comp: shallowRef(defineAsyncComponent(() => import('./comptindakan/pagemenu/PerencanaanPage.vue')))
  }
])
const menu = ref(menus.value[0])

const inacbg = useInacbgPoli()
onMounted(() => {
  menu.value = menus.value[0]
  inacbg.getDataIna(props.pasien)
  inacbg.setTotalTindakan(props.pasien)
  inacbg.setTotalLaborat(props.pasien)
})

onBeforeUnmount(() => {
  console.log('beforeunmount')
  menu.value = menus.value[0]
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
