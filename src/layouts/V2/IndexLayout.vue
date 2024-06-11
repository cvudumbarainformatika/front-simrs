<template>
  <q-layout
    :key="tanggal"
    view="hhr LpR lfr"
    :class="dark?'':'page-light'"
  >
    <!-- hHr lpR fFr || hhh LpR lFr-->
    <HeaderComp
      v-if="!style.componentfull"
      :dark="dark"
      :mobile="mobile"
      :user="apps.user"
      :gudangs="apps.gudangs"
      :polis="apps.polis"
      :ruangs="apps.ruangs"
      @go-to-sso="goToSSO"
      @set-gudang="apps.setUserKey('kdruangansim',$event)"
    />
    <LeftDrawer
      :tampil="!style.componentfull"
    />

    <!-- <q-drawer
      v-model="style.rightDrawer"
      side="right"
      overlay
      behavior="desktop"
      bordered
    >
      <v-slot />
    </q-drawer> -->

    <!-- menu bottom mobile -->
    <!-- <adm-footer-menu
      v-if="mobile"
      :dark="dark"
    /> -->
    <q-scroll-area
      style="height: 100vh; width: 100%;"
      :bar-style="{
        width: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        opacity: 0.2
      }"
      :thumb-style="{
        borderRadius: '2px',
        backgroundColor: '#027be3',
        width: '3px',
        opacity: 0.8,
      }"
    >
      <q-page-container>
        <!-- <div
          v-if="apps?.user?.nama==='Programer'"
          :key="angka"
        >
          {{ angka }}
        </div> -->
        <router-view
          v-slot="{ Component }"
          class="transition"
        >
          <transition
            :name="transition.pageTransition.name"
            :mode="transition.pageTransition.mode"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>
    </q-scroll-area>
    <q-page-sticky
      v-if="!style.componentfull"
      position="bottom-right"
      :offset="[5, 5]"
    >
      <q-fab
        size="xs"
        padding="xs"
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
import { date, useQuasar } from 'quasar'
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'

import LeftDrawer from './comp/LeftDrawer.vue'
// import AdmHeader from './AdmHeader.vue'
// import AdmFooterMenu from './AdmFooterMenu.vue'
import HeaderComp from './comp/HeaderComp.vue'
import { useAuthStore } from 'src/stores/auth'
import { useTransitionStore } from 'src/stores/app/transition'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useRouter } from 'vue-router'
import { useStyledStore } from 'src/stores/app/styled'
import * as storage from 'src/modules/storage'
import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { qchannel } from 'src/modules/newsockets'

const tanggal = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'))
const router = useRouter()
const transition = useTransitionStore()
const store = useAuthStore()
const style = useStyledStore()
const apps = useAplikasiStore()
function goToSSO () {
  router.push({ path: '/admin/sso', replace: true })
  // setTimeout(() => {
  // window.location.reload()
  // }, 200)
}
const setting = useSettingsAplikasi()
if (!apps.gudangs?.length) setting.getGudang().then(resp => { apps.setGudang(setting?.gudangs) })
if (!apps.polis?.length) setting.getPoli().then(resp => { apps.setPoli(setting?.polis) })
if (!apps.ruangs?.length) setting.getRuanganSim().then(resp => { apps.setRuang(setting?.ruangansims) })
if (!Object.keys(apps.user)?.length) store.getUserNew()
// console.log('apps user', apps.user, !Object.keys(apps.user)?.length)

// const rightDrawerOpen = ref(false)
// const leftDrawerOpen = ref(false)
const $q = useQuasar()
const mobile = $q.screen.lt.md

const dark = computed(() => {
  return $q.dark.isActive
})

function setDark (val) {
  const x = !val
  $q.dark.set(x)
}
// http://localhost:9000/gudang/farmasi/verifpermintaandepo/verifpermintaan
// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }

// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
// ----- timer start -----
const angka = ref(0)
document.addEventListener('keypress', intrupt)
document.addEventListener('mouseover', intrupt)
function intrupt () {
  localStorage.setItem('activeTime', new Date())
  // console.log('interup')
}
function timer () {
  const lgTime = storage.getActiveTime()
  const skr = new Date()
  angka.value = date.getDateDiff(skr, lgTime, 'minutes')
  if (angka.value >= 60) {
    store.logout()
  }
}
const setTimer = setInterval(timer, 1000)
onBeforeUnmount(() => {
  clearInterval(setTimer)
})
// ----- timer end -----
onMounted(() => {
  // subscribedPrivateChannel()
})
onBeforeMount(() => {
  // console.log('layout user', store.currentUser)
  // console.log('router before', router?.currentRoute.value)
  // setTimer
})

// function subscribedPrivateChannel() {
//   const channel = laravelEcho.private('private.notif.1')
//   channel.subscribed(() => {
//     console.log('subscribed notif channel!!!')
//   })
//     .listen('.notif-message', (e) => {
//       console.log('listen private notif', e)
//     })
// }

const gambar = computed(() => {
  return new URL('../../assets/images/mad_saleh_minum.png', import.meta.url).href
})

qchannel.subscribed(() => {
  console.log('subscribed qchannel!!!')
}).listen('.playground', (e) => {
  console.log('listen', e)
  if (e.message.menu === 'refresh-page') {
    $q.notify({
      type: 'my-notif',
      avatar: gambar,
      message: e?.message?.data,
      multiLine: true,
      caption: 'Klik Refresh Untuk Memuat Ulang Halaman Ini',
      color: 'primary',
      position: 'bottom-right',
      timeout: 0,
      actions: [
        { label: 'Refresh', color: 'yellow', handler: () => { window.location.reload() } }
      ]

    })
  }
})

</script>

<style lang="scss" scoped>
</style>
