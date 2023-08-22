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

const drawer = ref(false)
defineProps({
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
  }
  // { name: 'layanan-page', label: 'Layanan', icon: 'icon-mat-analytics' },
  // { name: 'penandaan', label: 'Penandaan Gambar', icon: 'icon-mat-palette' },
  // { name: 'penunjang', label: 'Penunjang', icon: 'icon-mat-published_with_changes' },
  // { name: 'perencanaan', label: 'Perencanaan', icon: 'icon-mat-today' },
  // { name: 'resep', label: 'E-Resep', icon: 'icon-mat-receipt' },
  // { name: 'penerbitan', label: 'Penerbitan Surat', icon: 'icon-mat-description' }
])
const menu = ref(menus.value[0])
onMounted(() => {
  menu.value = menus.value[0]
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
