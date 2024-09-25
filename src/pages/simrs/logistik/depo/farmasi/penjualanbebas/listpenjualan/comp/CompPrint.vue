<template>
  <q-dialog
    persistent
    maximized
    transition-show="slide-left"
    transition-hide="fade"
  >
    <q-card
      flat
      class="fit"
    >
      <div class="fit column">
        <q-bar class="col-auto bg-primary text-white q-py-sm">
          <div class="f-12">
            Print Nota
          </div>
          <q-space />

          <q-btn
            v-close-popup
            dense
            flat
            icon="icon-mat-close"
            @click="emits('close')"
          >
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
        <div class="col fit column">
          <div class="col full-height scroll">
            <div class="row justify-end q-mr-sm q-mt-sm">
              <q-btn
                ref="refPrint"
                v-print="printObj"
                unelevated
                color="dark"
                round
                size="sm"
                icon="icon-mat-print"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Print
                </q-tooltip>
              </q-btn>
            </div>
            <div
              id="printMe"
              class="column items-center bg-white page-x f-12"
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
                    <div class="f-10">
                      (0335) 433478,433119,421118
                    </div>
                    <div class="f-10 q-mb-xs">
                      Fax. (0335) 432702
                    </div>
                  </div>
                </div>
              </div>
              <div class="garis" />
              <div class="garis" />
              <div class=" q-mt-xs ">
                <span class="text-weight-bolder f-14">{{ data?.nama }}</span>
              </div>
              <div class=" q-my-xs ">
                <span class="text-weight-bolder f-14">{{ data?.item?.noresep }}</span>
              </div>
              <div class="garis" />
              <div class="garis" />
              <div
                v-if="data?.item?.rincian?.length && !head"
                class="q-mt-sm full-width"
              >
                <div class="">
                  <div v-for="(rinc,i) in data?.item?.rincian" :key="i">
                    <div class="row justify-between">
                      <div class="col-shrink">
                        {{ i+1 }}
                      </div>
                      <div class="col-5 ">
                        {{ rinc?.mobat?.nama_obat }}
                      </div>
                      <div class="col-2">
                        <i>{{ rinc?.jumlah }}  {{ rinc?.mobat?.satuan_k }}</i>
                      </div>
                      <div class="col-2 text-right">
                        <i>{{ formatDouble(rinc?.harga_jual,2) }}</i>
                      </div>
                      <div class="col-2 text-right">
                        <strong>{{ formatDouble(rinc?.subtotal,2) }}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="garis" />
                  <div class="garis" />
                  <div class="row justify-between">
                    <div class="col-auto">
                      Total
                    </div>
                    <div class="col-auto text-weight-bold f-12">
                      {{ formatDouble(total(data?.item?.rincian),2) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { formatDouble } from 'src/modules/formatter'

const emits = defineEmits(['close', 'show', 'hide'])
defineProps({
  data: { type: Object, default: () => {} },
  head: { type: Boolean, default: false }
})
function total (val) {
  return val?.reduce((a, b) => parseFloat(a) + parseFloat(b.subtotal), 0) ?? 0
}
const printObj = {
  id: 'printMe',
  popTitle: 'Nota'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
window.onafterprint = (event) => {
  console.log('After print', event)
  // document.body.innerHTML = originalContents
  emits('close')
}
</script>

<style lang="scss" scoped>

.fnt-10{
  font-size: 10px !important;
  }

.page-x{
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 27.94cm;
  height: fit-content;
  padding: 1mm;
  // font-size: 10px !important;
}

.garis {
  width: 100%;
  border-top: 1px dashed black;
  margin-bottom: 2px;
}
.garis2 {
  width: 90%;
}
</style>
