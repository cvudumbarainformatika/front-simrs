<template>
  <q-dialog id="endas" maximized>
    <div class="bg-white text-center">
      <div class="row justify-end q-mr-md">
        <q-btn
          round
          class="f-10 q-mr-sm"
          color="primary"
          text-color="white"
          icon="icon-mat-download"
          @click="printPage()"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Download Resep
          </q-tooltip>
        </q-btn>
      </div>
      <div
        ref="content"
        id="printGueeee"
        class="column items-center bg-white page-x f-12 "
        style="width: 216mm;"
      >
        <div class="garis-all">
          <div
            class="col no-wrap  text-center"
          >
            <div class="row no-wrap justify-center">
              <div class="col-12">
                <div class="f-16">
                  UOBK RSUD DOKTER MOHAMAD SALEH
                </div>
                <div class="f-16">
                  KOTA PROBOLINGGO
                </div>
                <div class="f-10 q-mb-xs row no-wrap justify-center">
                  Jl. Mayjen Panjaitan No. 65 Telp. (0335) 4492119, 433119, 421118 Fax. (0335) 432702 E-mail : rsudprob@probolinggokota.go.id PROBOLINGGO-67219
                </div>
              </div>
            </div>
          </div>
          <div class="garis" />
          <div class="row text-left">
            <div class="col-8 ">
              <div class="row q-ml-xs">
                <div class="col-7">
                  <div class="row no-wrap q-my-xs">
                    <div class="col-3">
                      Nama
                    </div>
                    <div class="col-9">
                      {{ item?.datapasien?.nama }}
                    </div>
                  </div>
                  <div class="row q-my-xs">
                    <div class="col-3">
                      No. Reg
                    </div>
                    <div class="col-9">
                      {{ item?.norm }}
                    </div>
                  </div>
                  <div class="row q-my-xs">
                    <div class="col-3">
                      No. Resep
                    </div>
                    <div class="col-9">
                      {{ item?.noresep }}
                    </div>
                  </div>
                  <div class="row no-wrap q-my-xs">
                    <div class="col-3">
                      Alamat
                    </div>
                    <div class="col-9 f-10">
                      {{ item?.datapasien?.alamat }}
                    </div>
                  </div>
                  <div class="row no-wrap q-my-xs">
                    <div class="col-3">
                      Umur
                    </div>
                    <div class="col-9">
                      {{ item?.datapasien?.usia }}
                    </div>
                  </div>
                </div>
                <div class="col-5">
                  <div class="row q-my-xs">
                    <div class="col-4">
                      Tanggal
                    </div>
                    <div class="col-6">
                      {{ dateFullFormat(item?.tgl_permintaan) }}
                    </div>
                  </div>

                  <div class="row q-my-xs">
                    <div class="col-4">
                      Poli
                    </div>
                    <div class="col-6">
                      {{ item?.poli?.rs2 }}
                    </div>
                  </div>
                  <div class="row q-my-xs">
                    <div class="col-4">
                      Tipe Resep
                    </div>
                    <div class="col-6">
                      {{ item?.tiperesep }}
                    </div>
                  </div>
                  <div class="row q-my-xs">
                    <div class="col-4">
                      Dokter
                    </div>
                    <div v-if="item?.depo ==='Gd-05010101'" class="col-6">
                      {{ item?.kunjunganrajal[0]?.doktersimpeg?.nama }}
                    </div>
                    <div v-else>
                      {{ item?.dokter?.nama }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row q-ml-xs ">
                Resep Pasien <span class="text-weight-bold q-ml-sm">BPJS</span>
              </div>
              <!-- obatnya -->
              <div class=" q-ml-xs">
                <div
                  v-if="item?.permintaanresep?.length && !head"
                  class="q-mt-sm full-width"
                >
                  <div class="">
                    <div v-for="(rinc,i) in item?.permintaanresep" :key="i">
                      <div>
                        <div class="row justify-between q-mb-xs">
                          <div class="col-shrink" style="max-width: 5%;">
                            {{ i+1 }}
                          </div>
                          <div class="col-6 ">
                            {{ rinc?.mobat?.nama_obat }}
                          </div>
                          <div class="col-2">
                            <i>{{ rinc?.aturan }}  </i>
                          </div>
                          <div class="col-2">
                            <i>{{ rinc?.jumlah }}  {{ rinc?.mobat?.satuan_k }}</i>
                          </div>
                        </div>
                        <div v-if="rinc?.keterangan!=='-'" class="row justify-between f-10 text-italic q-mb-xs">
                          * Ket : {{ rinc?.keterangan }}
                        </div>
                      </div>
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
                    </div>
                    <div v-for="(rac,n) in lirac?.rincian" :key="n">
                      <div class="row q-ml-lg f-12 items-end">
                        <div>* <i>{{ rac?.mobat?.nama_obat }} - <span class="">(rsp : {{ rac?.jumlahresep }}) - </span> <span class="">{{ rac?.jumlahobat }} ({{ rac?.mobat?.satuan_k }})</span></i></div>
                      </div>
                    </div>
                    <q-separator class="q-ml-lg q-my-xs" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4 gl">
              <div class="q-mx-xs">
                <!-- alergi -->
                <div class="row gb ">
                  <div class="col-4">
                    <q-checkbox v-model="adaAlergi" dense color="negative" keep-color size="70px" />
                  </div>
                  <div class="col-8 text-center">
                    <div class=" row text-negative f-24 justify-center">
                      Alergi Obat
                    </div>
                    <div class="row text-italic f-10 justify-center">
                      (di isi Dokter)
                    </div>
                  </div>
                  <div class="row q-mb-md" style="border-bottom: 1px dotted black; width: 100%; " />
                </div>
                <!-- di isi farmasi -->
                <div class="row q-my-xs justify-end f-10 text-italic">
                  (diisi farmasi)
                </div>
                <div class="row">
                  <div class="col-4">
                    Jam Terima
                  </div>
                  <div class="col-8">
                    {{ dateFull(item?.tgl_kirim) }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    Jam Selesai
                  </div>
                  <div class="col-8">
                    {{ dateFull(item?.tgl_selesai) }}
                  </div>
                </div>
                <!-- Telaah resep -->
                <div class="row justify-center f-16 text-weight-bold q-my-xs">
                  TELAAH RESEP
                </div>
                <!-- komponen -->
                <div class="row q-my-sm">
                  <div class="col-12">
                    <div class="row text-weight-bold">
                      <div class="text-center gt gl gb" style="width: 60%;">
                        Komponen Resep
                      </div>
                      <div class="text-center gt gl gb" style="width: 20%;">
                        Ada
                      </div>
                      <div class="text-center gt gl gb gr" style="width: 20%;">
                        Tidak
                      </div>
                    </div>
                    <div v-for="kom in komponenReseps" :key="kom" class="row">
                      <div class="gl gb f-10 " style="width: 60%;">
                        {{ kom?.label }}
                      </div>
                      <div class="text-center gl gb" style="width: 20%;">
                        <q-checkbox v-model="kom.ada" size="xs" dense />
                      </div>
                      <div class="text-center gl gb gr" style="width: 20%;">
                        <q-checkbox v-model="kom.tidak" size="xs" dense />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- klnis -->
                <div class="row q-my-sm">
                  <div class="col-12">
                    <div class="row text-weight-bold">
                      <div class="text-center gt gl gb" style="width: 60%;">
                        Farmasi Klinis
                      </div>
                      <div class="text-center gt gl gb" style="width: 20%;">
                        Ada
                      </div>
                      <div class="text-center gt gl gb gr" style="width: 20%;">
                        Tidak
                      </div>
                    </div>
                    <div v-for="kom in farmasiKlinises" :key="kom" class="row">
                      <div class="gl gb" style="width: 60%;">
                        {{ kom?.label }}
                      </div>
                      <div class="text-center gl gb" style="width: 20%;">
                        <q-checkbox v-model="kom.ada" size="xs" dense />
                      </div>
                      <div class="text-center gl gb gr" style="width: 20%;">
                        <q-checkbox v-model="kom.tidak" size="xs" dense />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row q-mt-xl justify-center">
                  ( <span style="border-bottom: 1px dotted black; width: 80%;" /> )
                </div>
                <div class="row text-italic justify-center">
                  Apoteker
                </div>
                <!-- konfirmasi obat  -->
                <div class="row justify-center f-16 text-weight-bold q-my-xs">
                  KONFIRMASI OBAT
                </div>
                <div class="row q-my-sm">
                  <div class="col-12">
                    <div class="row text-weight-bold">
                      <div class="gt gl gb" style="width: 10%;">
                        R/
                      </div>
                      <div class="text-center gt gl gb" style="width: 70%;">
                        Hasil
                      </div>
                      <div class="text-center gt gl gb gr" style="width: 20%;">
                        Via/ttd
                      </div>
                    </div>
                    <div class="row text-weight-bold">
                      <div class=" gl gb" style="width: 10%; height: 2cm;" />
                      <div class="text-right  gl gb" style="width: 70%;" />
                      <div class="text-right  gl gb gr" style="width: 20%;" />
                    </div>
                  </div>
                </div>
                <!-- penyerahan -->
                <div class="row justify-center f-16 text-weight-bold q-my-xs">
                  PENYERAHAN OBAT
                </div>
                <div class="row items-center">
                  <div class="col-2">
                    <q-checkbox v-model="penyerahan" dense size="sm" />
                  </div>
                  <div class="col-8 text-center">
                    <div class=" row f-12 justify-center">
                      Pemberian edukasi obat
                    </div>
                    <div class="row text-italic f-10 justify-center">
                      (Indikasi, aturan pakai, ESO, dll)
                    </div>
                  </div>
                </div>
                <!-- ttd -->
                <div class="">
                  <div v-if="!head" class="row justify-between q-my-sm">
                    <div class="col-6 garis-all text-center">
                      <div>Penerima Resep</div>
                    </div>
                    <div class="col-6 garis-all text-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { dateFullFormat, formatJam, dateFull, formatDouble } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { jsPDF } from 'jspdf'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'
// eslint-disable-next-line no-unused-vars
import { computed, onMounted, ref } from 'vue'
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

const adaAlergi = ref(false)
const penyerahan = ref(false)
// eslint-disable-next-line no-unused-vars
const komponenReseps = ref([
  { label: 'Tgl Resep', ada: false, tidak: false },
  { label: 'No RM Pasien', ada: false, tidak: false },
  { label: 'Nama Dokter', ada: false, tidak: false },
  { label: 'Ruangan / poli', ada: false, tidak: false },
  { label: 'Nama Obat, bentuk sediaan', ada: false, tidak: false },
  { label: 'Kuantitas Obat', ada: false, tidak: false },
  { label: 'Kekuatan Sediaan / dosis', ada: false, tidak: false },
  { label: 'Aturan Pakai', ada: false, tidak: false },
  { label: 'Ttd / paraf Dokter', ada: false, tidak: false },
  { label: 'Nama Pasien', ada: false, tidak: false },
  { label: 'Umur / BB pasien', ada: false, tidak: false }
])
// eslint-disable-next-line no-unused-vars
const farmasiKlinises = ref([
  { label: 'Kontradiksi', ada: false, tidak: false },
  { label: 'Duplikasi', ada: false, tidak: false },
  { label: 'Efek Samping', ada: false, tidak: false },
  { label: 'Interaksi Obat', ada: false, tidak: false }
])
// eslint-disable-next-line no-unused-vars
const content = ref(null)
function printPage () {
  //   window.print()
  setTimeout(function () {
    console.log('cont', content.value?.innerHtml)
    // eslint-disable-next-line new-cap
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: 'legal',
      hotfixes: ['px_scaling']
    })
    const source = content.value

    // doc.html(source, {
    //   callback: function (pdf) {
    //     doc.addImage(pathImg + pasien?.value.ttdpasien, 'JPEG', 15, 40, 200, 114)
    //     // doc.output('datauri')
    //     pdf.save()
    //   }
    // })
    html2canvas(source, {
      width: doc.internal.pageSize.getWidth(),
      height: doc.internal.pageSize.getHeight(),
      logging: false,
      letterRendering: 1,
      allowTaint: false,
      useCORS: false
    }).then((canvas) => {
      const img = canvas.toDataURL('image/jpeg', 0.8)

      doc.addImage(img, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'FAST')
      doc.save('Resep ' + props?.item?.datapasien?.nama + ' (' + props?.item?.norm + ')' + '.pdf')

    //   const pdf = new File([doc.output('arraybuffer')], pasien?.value?.norm + '.pdf', { type: 'application/pdf' })
      // const pdf = new File([doc.output('arraybuffer')], pasien?.value?.norm + '.jpg', { type: 'application/jpg' })
    //   simpanPdf(pdf)
    })
    afterPrint()
  }, 100)
}

// eslint-disable-next-line no-unused-vars
function afterPrint () {
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
    border-top: 1px solid black;
    margin-bottom: 2px;
  }
  .garis2 {
    width: 90%;
  }
  .garis-all{
    border: 1px solid black;
  }
  .gb{
    border-bottom: 1px solid black;
  }
  .gl{
    border-left: 1px solid black;
  }
  .gr{
    border-right: 1px solid black;
  }
  .gt{
    border-top: 1px solid black;
  }
  </style>
