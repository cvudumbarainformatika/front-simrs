<template>
  <div>
    <div id="printMe">
      Cobak Print Antrian
    </div>

    <q-btn
      ref="printBtn"
      label="print coba"
    />
  </div>
</template>

<script setup>
// import VueHtmlToPaper from 'src/boot/VueHtmlToPaper'
import { onMounted, ref } from 'vue'

const printBtn = ref()

// const printObj = ref({
//   id: 'printMe',
//   popTitle: 'Laporan Rekap',
//   beforeOpenCallback(vue) {
//     // printed.value = true
//     console.log('wait...')
//   },
//   openCallback (vue) {
//     console.log('opened')
//   },
//   closeCallback (vue) {
//     // printed.value = false
//     console.log('closePrint')
//   }
// })

onMounted(() => {
  // console.log('mounted print', printBtn.value.$.appContext.app.directive)
  // printBtn.value.print(printObj)
  // vPrint.mounted.c
})

// function patchInputValue(el, value) {
//   var event = new Event('print', printObj);
//   el.value = value;
//   el.dispatchEvent(event);
// }

// const vPrint = {
//   mounted: (el, binding, vnode) => {
//     // binding.value -> 'some string'
//     // patchInputValue(el, 'new value');
//     console.log('vPrint', el)
//     console.log('vPrint', binding.value)
//     console.log('vPrint', vnode)
//     return binding.value
//     // el.click()
//   }
// }

// async function print () {
//   // Pass the element id here
//   await this.$htmlToPaper('printMe')
// }
</script>
