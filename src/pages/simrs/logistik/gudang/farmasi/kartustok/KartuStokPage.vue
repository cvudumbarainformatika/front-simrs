<template>
  <q-page
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs relative-position'"
  >
    <div class="header">
      <HeaderComp />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
      <q-scroll-area style="height:calc( 100% - 40px)">
        <ListObat />
      </q-scroll-area>
      <div class="absolute-bottom bg-primary text-white">
        <BottomComp />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import ListObat from './comp/ListObat.vue'
import BottomComp from './comp/BottomCompPage.vue'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()

</script>
