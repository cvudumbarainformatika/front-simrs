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
      :menus="setting.menus"
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
      :menus="setting.menus"
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
const store = useAuthStore()
const setting = useSettingsStore()
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const $q = useQuasar()
const mobile = $q.screen.lt.md
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
// const menus = ref([
//   { id: 1, name: 'Dashboard', icon: 'icon-mat-dashboard', link: 'dashboard' },
//   { id: 2, name: 'Master', icon: 'icon-mat-dataset', link: 'master' },
//   { id: 3, name: 'Admin', icon: 'icon-mat-account_circle', link: 'admin' },
//   { id: 4, name: 'Transaksi', icon: 'icon-mat-sync_alt', link: 'transaksi' },
//   { id: 4, name: 'History', icon: 'icon-mat-history', link: 'history' },
//   // { id: 4, name: 'laporan', icon: 'icon-mat-description', link: 'laporan' },
//   { id: 5, name: 'Setting', icon: 'icon-mat-settings', link: 'setting' }
// ])
onMounted(() => {
  store.getUser()
  setting.getAllData()
})
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
</script>
