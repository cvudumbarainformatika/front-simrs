<template>
  <div>
    <div
      id="printMe"
      class="column items-center"
    >
      <div
        class="col no-wrap garis2 text-center"
      >
        <div class="row no-wrap justify-center">
          <div
            class="q-mr-sm"
            style="min-width: 1cm;"
          >
            <q-img
              src="~assets/logos/logo-rsud.png"
              spinner-color="white"
              style="height: 0.9cm; max-width: 0.9cm"
            />
          </div>
          <div class="">
            <div class="f-12">
              Instalasi Farmasi
            </div>
            <div class="">
              RSUD dr.Moh Saleh
            </div>
            <div class="f-8">
              (0335) 433478,433119,421118
            </div>
            <div class="f-8 q-mb-xs">
              Fax. (0335) 432702
            </div>
          </div>
        </div>
      </div>
      <div class="garis" />
      <div class="garis" />
      <div class="f-12 q-mt-xs">
        {{ route?.query?.norm }} - {{ route?.query?.nama }}
      </div>
      <div class="text-weight-bold q-mb-xs">
        Resep : {{ dateFullFormat(route?.query?.tglResep) }} / {{ route?.query?.noresep }}
      </div>
      <div class="garis" />
      <div class="garis" />
      <div class="f-10 q-mt-xs">
        {{ route?.query?.obat }}
      </div>
      <div class="q-mt-xs f-18">
        {{ route?.query?.aturan }}
      </div>
      <div class="f-14 text-weight-bold q-my-sm">
        {{ route?.query?.keterangan }}
      </div>
      <div class="f-10 text-italic">
        {{ dateFullFormat(new Date()) }} : {{ formatJam(new Date()) }}
      </div>
      <div class="f-10 text-weight-bold q-mb-xl text-italic">
        - Semoga Lekas Sembuh -
      </div>
    </div>
  </div>
</template>

<script setup>
import { dateFullFormat, formatJam } from 'src/modules/formatter'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  // console.log('mounted print', printBtn.value.$.appContext.app.directive)
  // printBtn.value.print(printObj)
  // vPrint.mounted.c
  // console.log(print)
  // printBtn.value.click()
  // console.log(route)
  // setNomor('B-06')
  myPrinting() //
})

function myPrinting () {
  console.log('print ')
  setTimeout(function () {
    window.print()
  }, 500)
  setTimeout(function () {
    afterPrint()
  }, 500)
}

function afterPrint () {
  // const r = confirm('Press a button!')
  // if (r === true) {
  // router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  window.close()
  // } else {
  //   window.close()
  // }
}

</script>

<style lang="scss" scoped>
.garis {
  width: 90%;
  border-top: 1px dashed black;
  margin-bottom: 2px;
}
.garis2 {
  width: 90%;
}
</style>
