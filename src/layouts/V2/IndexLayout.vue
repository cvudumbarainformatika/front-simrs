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
      @go-to-sso="()=>router.push({path:'/admin/sso', replace:true})"
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

const tanggal = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'))
const router = useRouter()
const transition = useTransitionStore()
const store = useAuthStore()
const style = useStyledStore()
const apps = useAplikasiStore()

// const rightDrawerOpen = ref(false)
// const leftDrawerOpen = ref(false)
const $q = useQuasar()
const mobile = $q.screen.lt.md

const dark = computed(() => {
  return $q.dark.isActive
})

function setDark(val) {
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
function intrupt() {
  localStorage.setItem('activeTime', new Date())
  // console.log('interup')
}
function timer() {
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
  console.log('layout user', store.currentUser)
  console.log('router', router?.currentRoute.value)
  // setTimer
})
onBeforeMount(() => {
  // console.log('layout user', store.currentUser)
  console.log('router before', router?.currentRoute.value)
  // setTimer
})

// timer
// const angka = ref(0)
// const hitung = () => {
//   angka.value = angka.value + 1
//   console.log('hitung', angka.value)
//   // if (angka.value === store.time) {
//   //   store.setTab('awal')
//   //   goTo('/')
//   // }
// }
// const updateTimeInterval = setInterval(hitung, 1000)
// onBeforeUnmount(() => {
//   clearInterval(updateTimeInterval)
// })
// onUpdated(() => {
//   angka.value = 0
//   console.log('updated', angka.value)
// })

// const afterEnter = () => {
//   window.scrollTo(0, 0)
// }
// const afterLeave = () => {
//   transition.setPageTransition('default')
// }

</script>

<style lang="scss" scoped>
</style>
