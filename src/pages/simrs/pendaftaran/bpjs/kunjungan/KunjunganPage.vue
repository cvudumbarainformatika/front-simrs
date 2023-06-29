<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1"
    >
      <HeaderComp />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:60px"
    >
      <ListKunjungan />
    </div>
    <div class="fixed-bottom">
      <BottomComp />
    </div>
  </div>
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import ListKunjungan from './comp/ListKunjungan.vue'
import BottomComp from './comp/BottomComp.vue'
</script>
