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
          <div class="inner-top-page">
            <!-- INI TEMPAT CONTENYA -->
            <router-view />
          </div>

          <bgAnimation />
        </div>
        <div class="bot column flex-center" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

import BgAnimation from './comp/BgAnimation.vue'
import BoxAnimation from './comp/BoxAnimation.vue'
const $q = useQuasar()
const dark = computed(() => {
  return $q.dark.isActive
})

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
      height:85vh;
      margin:0;
      padding: 0;
    }

}

.bot {
  position: absolute;
  width: 100%;
  height: 5vh;
  bottom: 0;
  background-color: #fff  ;
}
</style>
