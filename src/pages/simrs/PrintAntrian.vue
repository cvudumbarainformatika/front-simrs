<template>
  <div id="printMe">
    <div>
      Cobak Print Antrian
    </div>

    <q-btn
      ref="printBtn"
      v-print="printObj"
      label="print coba"
    />
  </div>
</template>

<script setup>
// import VueHtmlToPaper from 'src/boot/VueHtmlToPaper'
import { onMounted, ref } from 'vue'

const printBtn = ref()

const printObj = ref({
  id: 'printMe',
  popTitle: 'Laporan Rekap',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue) {
    // printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    // printed.value = false
    console.log('closePrint')
  }
})

onMounted(() => {
  console.log('mounted print', printBtn.value.$.appContext.app.directive)
  printBtn.value.print(printObj)
})

// async function print () {
//   // Pass the element id here
//   await this.$htmlToPaper('printMe')
// }
</script>
