<template>
  <q-layout
    view="hhh LpR lFr"
    :class="dark?'':'page-light'"
  >
    <HeaderComp
      :dark="dark"
      :mobile="mobile"
      @go-to-sso="()=>{router.push({path:'/admin/sso'})}"
    />
    <LeftDrawer
      v-if="!mobile"
      :dark="dark"
    />
    <!--
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="desktop"
      bordered
    /> -->

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
import { computed, onMounted } from 'vue'

import LeftDrawer from './comp/LeftDrawer.vue'
// import AdmHeader from './AdmHeader.vue'
// import AdmFooterMenu from './AdmFooterMenu.vue'
import HeaderComp from './comp/HeaderComp.vue'
import { useAuthStore } from 'src/stores/auth'
import { useTransitionStore } from 'src/stores/app/transition'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useRouter } from 'vue-router'

const router = useRouter()
const transition = useTransitionStore()
const store = useAuthStore()
// const apps = useAplikasiStore()
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

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }

// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
onMounted(() => {
  console.log('layout user', store.currentUser)
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
