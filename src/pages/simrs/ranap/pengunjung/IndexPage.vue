<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header bg-primary text-white">
      <header-page />
    </div>

    <q-card
      flat
      no-shadow
      square
      class="my-flex-1"
      style="overflow: hidden;"
    >
      <q-scroll-area style="height: calc(100% - 1px);">
        <list-loading v-if="store.loading" />
        <list-pengunjung v-else />
      </q-scroll-area>
      <div class=" absolute-bottom bg-primary text-white z-top">
        <footer-page />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import ListLoading from './ListLoading.vue'
import ListPengunjung from './ListPengunjung.vue'
import HeaderPage from './HeaderPage.vue'
import FooterPage from './FooterPage.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
const style = useStyledStore()
const store = usePengunjungRanapStore()
</script>
