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
// import { onMounted } from 'vue'

// import * as Q from '../../modules/wacom/q.js'
// import WacomGSS from '../../modules/wacom/sdkstu.js'

// let retry = 0
// const MAXRETRIES = 20
// const TIMEOUT_LONG = 1000

// onMounted(() => {
//   setTimeout(checkForSigCaptX, 500)
// })

// function checkForSigCaptX() {
//   retry = retry + 1
//   if (WacomGSS.STU.isServiceReady()) {
//     retry = 0
//     console.log('SigCaptX Web Service: ready')
//   } else {
//     console.log('SigCaptX Web Service: not connected')
//     if (retry < MAXRETRIES) {
//       setTimeout(checkForSigCaptX, TIMEOUT_LONG)
//     } else {
//       alert('Unable to establish connection to SigCaptX')
//     }
//   }
// }

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
