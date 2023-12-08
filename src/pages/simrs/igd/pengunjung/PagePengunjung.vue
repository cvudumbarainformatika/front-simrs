<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header bg-primary text-white">
      Header
    </div>

    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 bg-red"
      style="overflow: hidden;"
    >
      <q-scroll-area style="height: calc(100% - 1px);">
        <div
          v-for=" n in 100"
          :key="n"
        >
          sdasdas
        </div>
      </q-scroll-area>
      <div class=" absolute-bottom bg-primary text-white z-top">
        Bottom
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
const style = useStyledStore()
</script>
