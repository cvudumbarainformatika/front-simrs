<template>
  <q-layout
    view="lHh LpR lFr"
    :class="dark?'':'page-light'"
  >
    <AdmHeader
      :dark="dark"
      :mobile="mobile"
      @toggle-left="toggleLeftDrawer"
    />
    <LeftDrawer
      v-if="!mobile"
      v-model="leftDrawerOpen"
      :dark="dark"
      :menus="menus"
    />
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="desktop"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <!-- menu bottom mobile -->
    <adm-footer-menu
      v-if="mobile"
      :dark="dark"
      :menus="menus"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-fab
        size="sm"
        padding="sm"
        icon="icon-mat-display_settings"
        color="primary"
        direction="up"
      >
        <q-fab-action
          :color="dark?'warning':'dark'"
          icon="icon-mat-tungsten"
          @click="setDark(dark)"
        />
      </q-fab>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import LeftDrawer from './LeftDrawer.vue'
import AdmHeader from './AdmHeader.vue'
import AdmFooterMenu from './AdmFooterMenu.vue'
import { useAuthStore } from 'src/stores/auth'
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
// import { usePegawaiApplicationStore } from 'src/stores/simrs/pegawai/pegawai'
const store = useAuthStore()
const setting = useSettingsStore()
// const pegawai = usePegawaiApplicationStore()
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const $q = useQuasar()
const mobile = $q.screen.lt.sm

// const menus = computed(() => {
//   const apem = store.aplications.filter(app => {
//     return app.aplikasi === 'antrian'
//   })
//   if (apem.length) {
//     return apem[0].menus
//   } else {
//     return []
//   }
// })

const menus = ref([
  { icon: 'icon-mat-dataset', link: 'antrian/dashboard', nama: 'Dashboard', name: 'antrian.dashboard', submenus: [] },
  {
    icon: 'icon-mat-dataset',
    link: 'antrian/master',
    nama: 'Master',
    name: 'antrian.master',
    submenus: [
      // { nama: 'Master Unit', name: 'antrian.master.poli', icon: null, link: 'antrian/master/poli' },
      { nama: 'Unit Antrean', name: 'antrian.master.unit_antrian', icon: null, link: 'antrian/master/unit_antrian' },
      { nama: 'Layanan', name: 'antrian.master.layanan', icon: null, link: 'antrian/master/layanan' },
      { nama: 'Display', name: 'antrian.master.display', icon: null, link: 'antrian/master/display' },
      { nama: 'Video', name: 'antrian.master.video', icon: null, link: 'antrian/master/video' }
    ]
  }
])
const dark = computed(() => {
  return $q.dark.isActive
})
function setDark (val) {
  const x = !val
  $q.dark.set(x)
  setting.dark = x
}
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
onMounted(() => {
  store.getUser()
  // setting.getAllData()
})
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
</script>
