<template>
  <q-dialog maximized>
    <div class="bg-white garis-luar">
      <div class="column ">
        <div class="col text-center">
          <div class="row no-wrap justify-center content-center q-pt-xs">
            <div
              class="col-auto q-mr-sm"
              style="min-width: 1cm;"
            >
              <div class="q-mt-xs">
                <q-img
                  src="~assets/logos/logo-rsud.png"
                  spinner-color="white"
                  style="height: 0.9cm; max-width: 0.9cm"
                />
              </div>
            </div>
            <div class="col-auto ">
              <div class="row f-12">
                Instalasi Farmasi
              </div>
              <div class="row">
                RSUD dr.Moh Saleh
              </div>
              <div class="row f-8">
                (0335) 433478,433119,421118
              </div>
              <div class="row f-8 q-mb-xs">
                Fax. (0335) 432702
              </div>
            </div>
          </div>
        </div>
        <q-separator
          class="garis-atas"
          color="dark"
          size="1px"
        />
        <div class="col text-center">
          {{ resep?.datapasien?.rs1 }} / {{ resep?.datapasien?.nama }}
        </div>
        <div class="col text-center">
          {{ dateFullFormat(resep?.tgl_permintaan) }} / {{ resep?.noresep }}
        </div>
        <q-separator
          class="garis-atas"
          color="dark"
          size="1px"
        />
        <div class="col text-center f-10 q-mt-sm">
          {{ rinci?.mobat?.nama_obat??rinci?.namaracikan }}
        </div>
        <div class="col text-center text-weight-bold">
          {{ rinci?.aturan }}
        </div>
        <div class="col text-center">
          {{ rinci?.keterangan }}
        </div>
        <div class="col text-center f-10 text-weight-bold text-italic q-mt-md">
          -. Semoga lekas sembuh .-
        </div>
        <!-- {{ rinci }} -->
      </div>
    </div>
    <!-- <div class="bg-white q-pa-lg">
      {{ rinci }}
    </div> -->
  </q-dialog>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
const emits = defineEmits(['close'])
defineProps({
  rinci: { type: Object, default: () => {} },
  resep: { type: Object, default: () => {} }
})
function printPage () {
  console.log('print ')
  window.print()
  setTimeout(function () {
    afterPrint()
  }, 100)
}

function afterPrint () {
  // const r = confirm('Press a button!')
  // if (r === true) {
  // router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  window.close()
  emits('close')
  // } else {
  //   window.close()
  // }
}
defineExpose({ printPage })
</script>

<style lang="scss" scoped>
.garis-luar{
  border: 1px solid black;
  // padding: 1px;
  margin: 3px;
}

.garis-atas{
  border-top: 1px solid black;
  width: 100%;
}
.garis {
  width: 90%;
  border-top: 1px dashed black;
  margin-bottom: 2px;
}

.garis2 {
  width: 90%;
}
</style>
