<template>
  <q-page>
    <q-scroll-area
      class="absolute-top fit"
      @scroll="onScroll"
    >
      <!-- header -->
      <!-- <header-web /> -->
      <!-- carousel -->
      <carousel-web />
      <!-- section -->
      <section-one />
      <section-two class="q-pb-lg" />
      <section-three class="q-pb-lg" />
      <section-four class="q-pb-lg" />
      <app-footer />
    </q-scroll-area>
  </q-page>
</template>

<script setup>
// import { scroll } from 'quasar'
// const { getScrollTarget, setVerticalScrollPosition } = scroll
// import HeaderWeb from './HeaderWeb.vue'
import CarouselWeb from 'src/components/~web/CarouselWeb.vue'
import SectionOne from 'src/components/~web/SectionOne.vue'
import SectionTwo from 'src/components/~web/SectionTwo.vue'
import SectionThree from 'src/components/~web//SectionThree.vue'
import SectionFour from './SectionFour.vue'
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
