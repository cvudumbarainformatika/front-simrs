<template>
  <div class="fullscreen bg-grey-4 column q-pa-lg q-pb-xl scroll">
    <div
      id="printMe"
      class="column items-center bg-white page-x f-10"
    >
      <div
        class="col no-wrap garis2 text-center relative-position"
      >
        <div class="row no-wrap justify-center">
          <div
            class="absolute"
            style="width: 8mm; left: 5mm; top:2mm;"
          >
            <q-img
              src="~assets/logos/logo-rsud.png"
              :ratio="1"
            />
          </div>
          <div class="ini-header-nya q-ml-lg">
            <div>
              <b>Instalasi Farmasi</b>
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
      <div class="row justify-between q-mt-xs">
        <div class="text-weight-bold">
          {{ store?.resep?.noresep }} ({{ store.resep?.sistembayar?.rs2 }})
        </div> <div>{{ dateFull(store?.resep?.tgl_kirim) }}</div>
      </div>
      <div class="row justify-between">
        <div>{{ store.resep?.norm }}</div> <div class="text-weight-bold">
          {{ store.resep?.datapasien?.nama }}
        </div>
      </div>
      <div class="q-mt-xs">
        Alamat : {{ store.resep?.datapasien?.alamat ?? '-' }}
      </div>

      <div class="garis q-py-xs" />

      <div class="row justify-between" style="margin-top: -2mm;">
        <div class="">
          {{ store?.resep?.dokter?.nama }}
        </div>
      </div>
      <div>
        <div
          v-if="store?.resep?.poli"
          class=" "
        >
          {{ store?.resep?.poli?.rs2 }}
        </div>
        <div
          v-if="store?.resep?.ruanganranap"
          class=" "
        >
          {{ store?.resep?.ruanganranap?.rs2 }}
        </div>
      </div>

      <div class="garis" />
      <div class="garis" />
      <div
        v-if="store?.resep?.permintaanresep?.length"
        class="q-mt-sm full-width"
      >
        <div class="untuk-isi-resep">
          <div v-for="(rinc,i) in store?.resep?.permintaanresep" :key="i">
            <div v-if="(store?.resep?.flag==='3'&&rinc?.done)||parseInt(store?.resep?.flag)<=2">
              <div class="row ">
                <div class="col-1 ">
                  {{ i+1 }}
                </div>
                <div class="col-11">
                  {{ rinc?.mobat?.nama_obat }}
                </div>
              </div>
              <div v-if="parseInt(store?.resep?.flag)<=2" class="row q-ml-lg f-8 ">
                <div>* <i>{{ rinc?.aturan }}  </i></div>
              </div>
              <div class="row q-ml-lg f-8 justify-between">
                <div>* <i>{{ rinc?.jumlah }}  {{ rinc?.mobat?.satuan_k }}</i></div>
                <div> <i>{{ formatDouble(rinc?.harga,2) }}</i></div>
              </div>
            </div>

            <q-separator class="q-ml-lg q-my-xs" />
          </div>
        </div>
      </div>
      <div
        v-if="store?.resep?.listRacikan?.length"
        class="full-width"
      >
        <div
          v-for="(item,i) in store?.resep?.listRacikan"
          :key="i"
          class="full-width"
        >
          <!-- <div v-if="item?.done"> -->
          <div class="row items-center">
            <div class="col-1">
              {{ store?.resep?.permintaanresep?.length+i+1 }}
            </div>
            <div class="col-11 ">
              {{ item?.namaracikan }}
            </div>
          </div>
          <div v-if="parseInt(store?.resep?.flag)<=2" class="row q-ml-lg f-8">
            <div>*  <i>{{ item?.aturan }}  </i></div>
          </div>
          <div class="row q-ml-lg f-8 justify-between">
            <div>* <i>{{ item?.jumlahdibutuhkan }}  {{ item?.satuan_racik }}</i></div>
            <div> <i>{{ formatDouble(item?.harga,2) }}</i></div>
          </div>
          <div v-for="(rac,n) in item?.rincian" :key="n">
            <div class="row f-8 q-ml-lg items-end">
              <div>* <i>{{ rac?.mobat?.nama_obat }} - <span v-if="parseInt(store?.resep?.flag)<=2" class="f-8">(rsp : {{ rac?.jumlahresep }}) - </span> <span class="f-8">{{ rac?.jumlahobat }} ({{ rac?.mobat?.satuan_k }})</span></i></div>
            </div>
          </div>
          <!-- </div> -->
          <q-separator class="q-ml-lg q-my-xs" />
        </div>
      </div>

      <div class="garis q-mt-xs" />
      <div class="garis" />
      <div class="row justify-between f-10 text-weight-bold">
        <div>Subtotal</div>
        <div>{{ formatDouble(store?.resep?.subtotal,2) }}</div>
      </div>
      <div class="garis q-mt-xs" />
      <div class="garis" />
      <div class="row justify-between q-my-sm">
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
</template>

<script setup>
import { dateFullFormat, formatJam, dateFull, formatDouble } from 'src/modules/formatter'
import { computed, onMounted } from 'vue'
import { usePrintEresepStore } from 'src/stores/simrs/farmasi/eresep/printesep'

const store = usePrintEresepStore()

const qrUrl = computed(() => {
  const noreg = store.resep?.noresep// noresep
  const dok = 'E-RESEP.png'
  const asal = 'E-RESEP'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

onMounted(() => {
  myPrinting()
})
// eslint-disable-next-line no-unused-vars
function myPrinting () {
  console.log('print ')
  setTimeout(function () {
    const printContents = document.getElementById('printMe').innerHTML
    // const originalContents = document.body.innerHTML

    document.body.innerHTML = printContents

    window.print()
  }, 500)
  setTimeout(function () {
    afterPrint()
  }, 500)
}

function afterPrint () {
  window.onafterprint = (event) => {
  console.log("After print", event)
}
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

.fnt-10{
  font-size: 10px !important;}

.page-x{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 78mm;
  height: auto;
  padding: 1mm;
  font-size: 10px !important;
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
