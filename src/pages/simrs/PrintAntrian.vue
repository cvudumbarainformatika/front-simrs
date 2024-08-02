<template>
  <div>
    <div
      id="printMe"
      class="column items-center"
    >
      <div class="f-14">
        UOBK RSUD dr.Mohamad Saleh
      </div>
      <div class="q-mb-xs">
        Jl.Panjaitan No.65
      </div>
      <div class="garis" />
      <div class="garis" />
      <div class="f-14 q-mt-xs">
        NOMOR ANTRIAN ANDA :
      </div>
      <div class="text-h5 text-weight-bold q-mb-xs">
        {{ route.query?.nomor }}
      </div>
      <div class="garis" />
      <div class="garis" />
      <div class="q-mt-xs">
        Silahkan Menunggu Antrian di :
      </div>
      <div class="f-14 text-weight-bold">
        {{ route.query?.poli }}
      </div>
      <div>no.RM : {{ route.query?.norm }}</div>
      <div v-if="route.query?.tgl">
        Tanggal Periksa : {{ route.query?.tgl }}
      </div>
      <div class="f-14 text-weight-bold q-my-xs">
        TERIMAKASIH
      </div>
      <div class="text-italic f-10  q-mb-xl">
        {{ dateFullFormat(new Date()) }} : {{ formatJam(new Date()) }}
      </div>
    </div>

    <!-- <q-btn
      ref="printBtn"
      label="print coba"
    /> -->
  </div>
</template>

<script setup>
// import VueHtmlToPaper from 'src/boot/VueHtmlToPaper'
// import print from 'vue3-print-nb'
// import { usePrintAntrian } from 'src/composable/printantrian'
import { dateFullFormat, formatJam } from 'src/modules/formatter'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// defineProps({
//   namaPoli: {
//     type: String,
//     default: '-'
//   }
// })
// directives: {
//   print
// }

// const printBtn = ref()

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
  // console.log(print)
  // printBtn.value.click()
  // console.log(route)
  // setNomor('B-06')
  myPrinting()
})

function myPrinting () {
  console.log('print ')
  window.print()
  window.onafterprint = (event) => {
    // console.log('After print')
    afterPrint()
  }
  // setTimeout(function () {
  //   afterPrint()
  // }, 100)
}

// eslint-disable-next-line no-unused-vars
function afterPrint () {
  // const r = confirm('Press a button!')
  // if (r === true) {
  // router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  window.close()
  // } else {
  //   window.close()
  // }
}

// function clickMounted(vue) {
//   console.log('click mounted')
// }

// function patchInputValue(el) {
//   const event = new Event('click', printObj)
//   // el.value = value;
//   el.dispatchEvent(event)
// }

// const vPrint = {
//   mounted: (el, binding, vnode) => {
//     // binding.value -> 'some string'
//     // patchInputValue(el)
//     // el.click(() => {
//     //   binding.value
//     // })
//     // el.focus()
//     console.log('vPrint', el)
//     console.log('vPrint', binding.value)
//     console.log('vPrint', vnode.el.__vueParentComponent)
//     // el.click()
//   }
// }

// async function print () {
//   // Pass the element id here
//   console.log('print')
//   printHTML('printMe')
// }
</script>

<style lang="scss" scoped>
.garis {
  width: 90%;
  border-top: 1px dashed black;
  margin-bottom: 2px;
}
</style>
