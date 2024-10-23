<template>
  <q-layout
    view="lHh LpR lFr"
    :class="dark?'':'page-light'"
  >
    <q-page-container>
      <!-- <router-view /> -->
      <q-page class="fullscreen">
        <div class="top-page">
          <BoxAnimation class="absolute" />
          <BgAnimation class="z--" />
          <div class="inner-top-page column flex-center">
            <!-- INI TEMPAT CONTENYA -->
            <router-view />
          </div>
        </div>
        <!-- <div class="bot column flex-center" /> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { useQuasar, date } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { computed, onBeforeUnmount, ref } from 'vue'
import * as storage from 'src/modules/storage'

import BgAnimation from './comp/BgAnimation.vue'
import BoxAnimation from './comp/BoxAnimation.vue'
const $q = useQuasar()
const dark = computed(() => {
  return $q.dark.isActive
})

const store = useAuthStore()
// ----- timer start -----
const angka = ref(0)
document.addEventListener('keypress', intrupt)
document.addEventListener('mouseover', intrupt)
function intrupt () {
  localStorage.setItem('activeTime', new Date())
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
</script>

<style lang="scss" scoped>
$grad:#187DC1;

* {
  margin:0;
  padding:0;
}

.top-page {
  position: relative;
  // text-align: ;
  background: linear-gradient(60deg, $secondary 0%, $primary 100%);

  .inner-top-page {
      width: 100%;
      height:100vh;
      margin:0;
      padding: 0;
      z-index: 1;
    }

}

.bot {
  position: absolute;
  width: 100%;
  height: 5vh;
  bottom: 0;
  background-color: #fff  ;
}

.z-- {
  z-index: 0;
}
</style>
