<template>
  <q-dialog id="endas" maximized>
    <div class="bg-white batang">
      <div
        id="printGueeee"
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
          <span class="text-weight-bolder f-14">{{ item?.noresep }}</span> ({{ item?.sistembayar?.rs2 }}) / {{ dateFull(item?.tgl_kirim) }}
        </div>
        <div class="f-12">
          {{ item?.norm }}  -  {{ item?.datapasien?.noka??'tidak ada no BPJs' }}  -  {{ item?.datapasien?.nama }}
        </div>
        <div class="f-12">
          {{ item?.sep?.rs8 ?? '-' }}
        </div>
        <div class="text-italic f-10">
          {{ item?.datapasien?.usia }}
        </div>
        <div class="text-italic f-10">
          {{ item?.datapasien?.alamat }}
        </div>
        <div class="row ">
          <div class="col-shrink q-mr-xs">
            {{ item?.dokter?.nama }}
          </div>
          <div
            v-if="item?.poli"
            class="col-shrink "
          >
            - {{ item?.poli?.rs2 }}
          </div>
          <div
            v-if="item?.ruanganranap"
            class="col-shrink "
          >
            - {{ item?.ruanganranap?.rs2 }}
          </div>
          <div
            v-if="item?.kunjunganranap"
            class="col-shrink"
          >
            - {{ item?.kunjunganranap?.rs6 }}
          </div>
        </div>
        <div
          v-if="item?.diagnosaigd && !head"
          class="row q-mb-xs"
        >
          <div class="col-shrink q-mr-xs">
            diagnosa IGD :
          </div>
          <div class="col-grow">
            {{ item?.diagnosaigd }}
          </div>
        </div>
        <div
          v-if="item?.diagnosa && !head"
          class="row q-mb-xs"
        >
          <div class="col-shrink q-mr-xs">
            diagnosa :
          </div>
          <div class="col-grow">
            {{ item?.diagnosa }}
          </div>
        </div>
        <div class="garis" />
        <div class="garis" />
        <div
          v-if="item?.permintaanresep?.length && !head"
          class="q-mt-sm full-width"
        >
          <div class="">
            <div v-for="(rinc,i) in item?.permintaanresep" :key="i">
              <div v-if="(item?.flag==='3' && rinc?.done) || parseInt(item?.flag)<=2">
                <div class="row justify-between q-mb-xs">
                  <div class="col-shrink">
                    {{ i+1 }}
                  </div>
                  <div class="col-5 ">
                    {{ rinc?.mobat?.nama_obat }}
                  </div>
                  <div class="col-2">
                    <i>{{ rinc?.aturan }}  </i>
                  </div>
                  <div class="col-2">
                    <i>{{ rinc?.jumlah }}  {{ rinc?.mobat?.satuan_k }}</i>
                  </div>
                  <div class="col-2 text-right">
                    <i>{{ formatDouble(rinc?.harga,2) }}</i>
                  </div>
                </div>
                <!-- <div class="row q-ml-lg ">
                  <div>* <i>{{ rinc?.aturan }}  </i></div>
                </div> -->
                <!-- <div class="row q-ml-lg justify-between">
                  <div>* <i>{{ rinc?.jumlah }}  {{ rinc?.mobat?.satuan_k }}</i></div>
                  <div> <i>{{ formatDouble(rinc?.harga,2) }}</i></div>
                </div> -->
              </div>

              <!-- <q-separator class="q-ml-lg q-my-xs" /> -->
            </div>
          </div>
        </div>

        <div
          v-if="item?.listRacikan?.length && !head"
          class="full-width"
        >
          <div
            v-for="(lirac,i) in item?.listRacikan"
            :key="i"
            class="full-width q-mb-xs"
          >
            <!-- <div v-if="lirac?.done"> -->
            <div class="row items-center justify-between ">
              <div class="col-shrink ">
                {{ item?.permintaanresep?.length+i+1 }}
              </div>
              <div class="col-5 ">
                {{ lirac?.namaracikan }}
              </div>
              <div class="col-2 ">
                <i>{{ lirac?.aturan }}  </i>
              </div>
              <div class="col-2 ">
                <i>{{ lirac?.jumlahdibutuhkan }}  {{ lirac?.satuan_racik }}</i>
              </div>
              <div class="col-2 text-right">
                <i>{{ formatDouble(lirac?.harga,2) }}</i>
              </div>
            </div>
            <!-- <div v-if="parseInt(item?.flag)<=2" class="row q-ml-lg f-8">
              <div>*  <i>{{ lirac?.aturan }}  </i></div>
            </div> -->
            <!-- <div class="row q-ml-lg justify-between">
              <div>* <i>{{ lirac?.jumlahdibutuhkan }}  {{ lirac?.satuan_racik }}</i></div>
              <div> <i>{{ formatDouble(lirac?.harga,2) }}</i></div>
            </div> -->
            <div v-for="(rac,n) in lirac?.rincian" :key="n">
              <div class="row q-ml-lg f-12 items-end">
                <div>* <i>{{ rac?.mobat?.nama_obat }} - <span v-if="parseInt(lirac?.flag)<=2" class="">(rsp : {{ rac?.jumlahresep }}) - </span> <span class="">{{ rac?.jumlahobat }} ({{ rac?.mobat?.satuan_k }})</span></i></div>
              </div>
            </div>
            <!-- </div> -->
            <q-separator class="q-ml-lg q-my-xs" />
          </div>
        </div>

        <div class="garis q-mt-xs" v-if="!head" />
        <div class="garis" v-if="!head" />
        <div v-if="!head" class="row justify-between  text-weight-bold">
          <div>Subtotal</div>
          <div>{{ formatDouble(item?.subtotal,2) }}</div>
        </div>
        <div v-if="!head" class="garis q-mt-xs" />
        <div v-if="!head" class="garis" />
        <div v-if="!head" class="row justify-between q-my-sm">
          <div class="ttd-pasien">
            <div>Penerima Resep</div>
          </div>
          <div class="ttd-petugas">
            <div>{{ dateFullFormat(new Date()) }} : {{ formatJam(new Date()) }}</div>
            <div>
              <vue-qrcode
                :value="qrUrl"
                tag="svg"
                :options="{
                  errorCorrectionLevel: 'Q',
                  color: {
                    dark: '#000000',
                    light: '#ffffff',
                  },
                  margin:2
                }"
              />
            </div>
            <div class="text-center">
              Petugas RS
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat, formatJam, dateFull, formatDouble } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { computed, onMounted } from 'vue'
const emits = defineEmits(['close'])
const props = defineProps({
  item: { type: Object, default: () => {} },
  head: { type: Boolean, default: false }
})
const qrUrl = computed(() => {
  const noreg = props?.item?.noresep// noresep
  const dok = 'E-RESEP.png'
  const asal = 'E-RESEP'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

// onMounted(() => {
//   myPrinting()
// })
// eslint-disable-next-line no-unused-vars
// const cont = document.getElementById('endas')?.innerHTML
function printPage () {
  // console.log('print ')
  // setTimeout(function () {
  //   // const printContents = document.getElementById('printGueeee')?.innerHTML
  //   // const originalContents = document.body.innerHTML

  //   // document.body.innerHTML = printContents

  // }, 200)
  window.print()
  setTimeout(function () {
    afterPrint()
  }, 500)
}

function afterPrint () {
  window.onafterprint = (event) => {
    console.log('After print', event)
  }
  // const originalContents = document.body.innerHTML

  // document.body.innerHTML = cont
  emits('close')
  // const r = confirm('Press a button!')
  // if (r === true) {
  // router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  // window.close()
  // } else {
  //   window.close()
  // }
}
defineExpose({ printPage })
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
