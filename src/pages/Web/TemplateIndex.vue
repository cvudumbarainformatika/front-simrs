<template>
  <q-page>
    <q-scroll-area
      class="absolute-top fit"
      @scroll="onScroll"
    >
      <!-- banner -->
      <app-banner-web />
      <!-- content -->
      <div
        class="container-padding"
        style="min-height:400px"
      >
        <div>
          <router-view />
        </div>
      </div>
      <!-- footer -->
      <app-footer />
    </q-scroll-area>
  </q-page>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'

const store = useAppStore()
const onScroll = (info) => {
  const moveToY = info.verticalPosition
  if (moveToY > 100) {
    store.changeVisible(true)
  } else {
    store.changeVisible(false)
  }
}

</script>
