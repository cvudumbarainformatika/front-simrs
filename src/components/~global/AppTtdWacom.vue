<template>
  <div id="signatureDiv">
    <img
      id="signatureImage"
    >

    <div class="absolute-bottom">
      <q-btn
        icon="icon-mat-add"
        size="sm"
        round
        flat
        color="primary"
        @click="tabletDemo"
      />
    </div>
  </div>
</template>

<script setup>

import '../../modules/wacom/q.js'

function tabletDemo() {
  console.log('ok')
}

</script>

<style lang="scss" scoped>

#signatureDiv {
  width:300px;
  height:200px;
  display:block;
  margin: 0 auto;
  // border: 1px solid black;
  position: relative;
}

#signatureImage {
  width:300px;
  height:200px;

}
</style>
