<template>
  <div
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header bg-primary text-white">
      <HeaderComp
        class="q-pa-xs"
        :fullscreen="style.componentfull"
        @set-fullscreen="style.setComponentFull"
      />
    </div>
    <div class="my-flex-1 q-card q-card--flat no-shadow no-border-radius scroll">
      <ListContent />
    </div>
    <div class="absolute-bottom bg-primary">
      sadas
    </div>
  </div>
</template>

<script setup>
import ListContent from './comp/ListContent.vue'
import HeaderComp from './comp/HeaderComp.vue'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()
</script>

<style lang="scss" scoped>
</style>
