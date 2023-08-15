<template>
  <q-layout
    view="lHh LpR lFr"
    :class="dark?'':'page-light'"
  >
    <AdmHeader
      class="print-hide"
      :dark="dark"
      :mobile="mobile"
      :role="role"
      :foto="foto"
      :ruangan="ruang"
      @toggle-left="toggleLeftDrawer"
    />
    <LeftDrawer
      v-if="!mobile"
      v-model="leftDrawerOpen"
      class="print-hide"
      :dark="dark"
      :menus="menus"
    />
    <q-drawer
      v-model="rightDrawerOpen"
      class="print-hide"
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
      class="print-hide"
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
// import { deleteTempData, getTempData } from 'src/modules/storage'
// import { usePemakaianRuanganStore } from 'src/stores/simrs/logistik/sigarang/transaksi/pemakaianruangan/pemakaianruangan'
// import { routerInstance } from 'src/boot/router'

const setting = useSettingsStore()
// const pemakaianruangan = usePemakaianRuanganStore()
const store = useAuthStore()
const role = computed(() => {
  return store.role ? store.role : ''
})
const ruang = computed(() => {
  const ruangan = store.ruang ? 'Ruangan : ' + store.ruang.uraian : false
  const depo = store.depo ? 'Depo : ' + store.depo.nama : false
  if (ruangan) {
    return ruangan
  } else if (depo) {
    return depo
  } else {
    return '-'
  }
})
const foto = computed(() => {
  return store.foto !== '' ? 'http://192.168.100.100/simpeg/foto/' + store.foto : new URL('../../assets/images/user-avatar.svg', import.meta.url).href
  // if (store.foto !== '') {
  //   return 'http://192.168.100.100/simpeg/foto/' + store.foto
  // } else {
  //   return new URL('../../assets/images/user-avatar.svg', import.meta.url).href
  // }
})
const menus = computed(() => {
  const apem = store.aplications.filter(app => {
    return app.aplikasi === 'laporan'
  })
  if (apem.length) {
    return apem[0].menus
  } else {
    return []
  }
})
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
// const checkTempdata = () => {
//   const data = getTempData()
//   if (data) {
//     if (data.path === 'sigarang.transaksi.pemakaianruangan') {
//       Dialog.create({
//         title: 'Konfirmasi',
//         message: 'Anda memiliki data yang belum selesai di Transaksi Pemakaian Ruangan.\n Tekan Ambil jika ingin mengambil dan megedit data tersebut. \n Tekan Ambil jika ingin menghapus data tersebut',
//         ok: { 'no-caps': true, flat: true, label: 'Ambil' },
//         cancel: { 'no-caps': true, flat: true, color: 'negative', label: 'Hapus' }
//       }).onOk(() => {
//         pemakaianruangan.tempData = data.form
//         routerInstance.replace({ name: data.path })
//       }).onCancel(() => {
//         deleteTempData()
//       })
//     }
//   }
// }
onMounted(() => {
  store.getUser()
  setting.getAllData()
  // checkTempdata()
})
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
</script>
