<template>
  <div id="pdfDoc" class="bg-white print-page">
    <div class="page-1">
      <!-- KOP SURAT -->
      <div class="col-grow">
        <div class="row items-center">
          <div class="col-12">
            <div class="flex justify-center">
              <div class="">
                <img
                  src="~assets/logos/logo-rsud.png"
                  width="50"
                >
              </div>
              <div class="q-px-md">
                <div class="text-center">
                  <div class="text-weight-bold f-14">
                    UOBK RSUD DOKTER MOHAMAD SALEH
                  </div>
                  <div class="f-12">
                    <div>Jl. Mayjend Panjaitan No.65 Probolinggo Jawa Timur</div>
                    <div>Telp. (0335) 433478,433119,421118 Fax. (0335) 432702</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-3">
            <div class="flex justify-end items-center">
              RM.
            </div>
            <div class="flex justify-end items-center">
              <div v-for="n in NORM" :key="n" class="q-pa-sm f-14 text-bold" style="border: 1px solid black;">
                {{ n }}
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <hr>
      <div class="contentx">
        <div class=" text-center text-bold q-mb-xs" style="text-decoration: underline; text-underline-offset: 5px;">
          {{ menu?.desc }}
        </div>
        <div class=" text-center text-bold q-mb-sm">
          <em>{{ menu?.title }}</em>
        </div>
        <div class="full-width">
          <!-- biodata -->
          <div class="row kotak q-pa-sm">
            <div class="col-6">
              <table class="model-1">
                <tbody>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        Nama
                      </div>
                      <!-- <i>Patient Name</i> -->
                    </td>
                    <td class="">
                      : {{ pasien?.nama_panggil }}
                    </td>
                  </tr>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        NO.RM
                      </div>
                      <!-- <i>Medical Record Number</i> -->
                    </td>
                    <td>: {{ pasien?.norm }}</td>
                  </tr>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        NO.REG
                      </div>
                      <!-- <i>Registration Number</i> -->
                    </td>
                    <td>: {{ pasien?.noreg }}</td>
                  </tr>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        KELAMIN
                      </div>
                      <!-- <i>Sex</i> -->
                    </td>
                    <td>
                      :
                      {{ pasien?.kelamin }}
                      <!-- <i>{{ pasien?.kelamin === 'Perempuan' ? 'Female' : 'Male' }}</i> -->
                    </td>
                  </tr>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        USIA
                      </div>
                      <!-- <i>Sex</i> -->
                    </td>
                    <td>
                      :
                      {{ pasien?.usia }}
                      <!-- <i>{{ pasien?.kelamin === 'Perempuan' ? 'Female' : 'Male' }}</i> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-6">
              <table>
                <tbody>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        Tanggal Masuk RS
                      </div>
                      <!-- <i>Admitted</i> -->
                    </td>
                    <td>: {{ humanDate(pasien?.tglmasuk) }} <b> Jam : </b> {{ jamTnpDetik(pasien?.tglmasuk) }}</td>
                  </tr>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        Tanggal Keluar RS
                      </div>
                      <!-- <i>Date of Discharge</i> -->
                    </td>
                    <td>: {{ humanDate(pasien?.tglkeluar) }} <b> Jam : </b> {{ jamTnpDetik(pasien?.tglkeluar) }}</td>
                  </tr>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        Ruangan / Kelas
                      </div>
                      <!-- <i>Room / Class</i> -->
                    </td>
                    <td>: {{ pasien?.ruangan }}</td>
                  </tr>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        DPJP
                      </div>
                      <!-- <i>Room / Class</i> -->
                    </td>
                    <td>: {{ pasien?.dokter }}</td>
                  </tr>
                  <tr valign="top">
                    <td>
                      <div style="text-decoration: underline;">
                        Sistem Bayar
                      </div>
                      <!-- <i>Room / Class</i> -->
                    </td>
                    <td>: {{ pasien?.sistembayar }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12">
              <table>
                <tbody>
                  <tr valign="top">
                    <td width="6%">
                      <div style="text-decoration: underline;">
                        Alamat
                      </div>
                      <!-- <i>Address</i> -->
                    </td>
                    <td>
                      <div class="flex flex-wrap">
                        {{ pasien?.alamat }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- CONTENT -->
          <div class="column kotak q-mt-sm q-pa-sm">
            <table class="model-2">
              <tbody>
                <tr>
                  <td width="35%">
                    <div class="text-weight-bold">
                      DIAGNOSA MEDIS
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div class="flex">
                        :
                      </div>
                      <div class="flex">
                        {{ pasien?.memodiagnosa }}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-weight-bold">
                      PRMRJ
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div class="flex flex-wrap">
                        {{ PRMRJ }}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      DIAGNOSA KEPERAWATAN
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div class="flex flex-wrap">
                        {{ DIAG_KEP }}
                      </div>
                    </div>
                  </td>
                </tr>

                <tr v-if="SUMMARY?.operasi" valign="top">
                  <td>
                    <div class="text-weight-bold">
                      JENIS OPERASI
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div v-html="getNewLine(SUMMARY?.operasi)" />
                    </div>
                  </td>
                </tr>
                <tr v-if="SUMMARY?.operasi" valign="top">
                  <td>
                    <div class="text-weight-bold">
                      TGL OPERASI
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div>{{ SUMMARY?.tglOperasi }}</div>
                    </div>
                  </td>
                </tr>

                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      DIPULANGKAN DARI RS DENGAN KEADAAN
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div v-if="KRS" class="">
                        <div> {{ KRS?.anamnesis?.keluhanUtama }}</div>
                        <div class="text-weight-italic">
                          - Nadi : {{ KRS?.pemeriksaan?.nadi ?? '-' }} |
                          RR : {{ KRS?.pemeriksaan?.pernapasan ?? '-' }} |
                          Sis/Dias : {{ KRS?.pemeriksaan?.sistole ?? '-' }} / {{ KRS?.pemeriksaan?.diastole ?? '-' }} |
                          Spo2 : {{ KRS?.pemeriksaan?.spo ?? '-' }} |
                          Suhu : {{ KRS?.pemeriksaan?.suhu ?? '-' }}
                        </div>
                        <!-- <div> - {{ KRS?.instruksi ?? '-' }}</div> -->
                      </div>
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      KONTROL
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div>
                        {{ pasien?.tindaklanjut }}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      LANJUTAN PERAWATAN DI RUMAH
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div v-html="getNewLine(SUMMARY?.rs4)" />
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      ATURAN DIET/NUTRISI
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div v-html="getNewLine(SUMMARY?.rs5)" />
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      OBAT-OBATAN YANG DIBAWA PULANG, JUMLAH DAN DOSIS
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div v-html="getNewLine(SUMMARY?.rs6)" />
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      RENCANA AKTIFITAS
                    </div>
                  </td>
                  <td>
                    <div class="flex q-gutter-md">
                      <div>:</div>
                      <div v-html="getNewLine(SUMMARY?.rs7)" />
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      ISTIRAHAT
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div v-html="getNewLine(SUMMARY?.rs8)" />
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      HASIL PEMERIKSAAN YANG DIBAWA PULANG
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div v-html="getNewLine(SUMMARY?.rs9)" />
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div class="text-weight-bold">
                      INFORMASI DAN EDUKASI YANG DIBERIKAN
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-md">
                      <div>:</div>
                      <div v-html="getNewLine(SUMMARY?.rs10)" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex justify-around q-mt-lg">
            <div class="column flex-center">
              <div>Pasien / Keluarga</div>
              <div v-if="ttdPasien" class="flex-center relative-position" style="width: 60px;">
                <vue-qrcode
                  :value="qrPasien"
                  tag="svg"
                  :options="{
                    errorCorrectionLevel: 'Q',
                    width: 60,
                    color: {
                      dark: '#000000',
                      light: '#ffffff',
                    },
                    margin:0
                  }"
                />
                <img
                  class="qrcode__image"
                  src="~assets/logos/logo-rsud.png"
                  alt="RSUD DOKTER MOHAMAD SALEH"
                >
              </div>
              <div v-else class="column flex-center" style="height: 60px;">
                ttd
              </div>
              <div class="f-10">
                {{ pasien?.nama_panggil }}
              </div>
            </div>
            <div class="column flex-center">
              <div>Perawat</div>
              <div class="flex-center relative-position" style="width: 60px;">
                <vue-qrcode
                  :value="qrPerawat"
                  tag="svg"
                  :options="{
                    errorCorrectionLevel: 'Q',
                    color: {
                      dark: '#000000',
                      light: '#ffffff',
                    },
                    margin:0
                  }"
                />
                <img
                  class="qrcode__image"
                  src="~assets/logos/logo-rsud.png"
                  alt="RSUD DOKTER MOHAMAD SALEH"
                >
              </div>
              <div class="f-10">
                {{ perawat }}
              </div>
            </div>
            <div class="column flex-center">
              <div>Dokter</div>
              <div class="flex-center relative-position" style="width: 60px;">
                <vue-qrcode
                  :value="qrDokter"
                  tag="svg"
                  :options="{
                    errorCorrectionLevel: 'Q',
                    color: {
                      dark: '#000000',
                      light: '#ffffff',
                    },
                    margin:0
                  }"
                />
                <img
                  class="qrcode__image"
                  src="~assets/logos/logo-rsud.png"
                  alt="RSUD DOKTER MOHAMAD SALEH"
                >
              </div>
              <div class="f-10">
                {{ pasien?.dokter }}
              </div>
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { humanDate, jamTnpDetik, getNewLine } from 'src/modules/formatter.js'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// import { pathImg } from 'src/boot/axios'
// import { imageToBase64 } from 'src/modules/imgBase64'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const pengunjung = usePengunjungRanapStore()
const ttdPasien = ref(null)

onMounted(() => {
  const summ = props?.pasien?.summarydischargeplannings?.length ? props?.pasien?.summarydischargeplannings[0] : null
  ttdPasien.value = summ?.ttdPasien
  // initTtd(summ)
})

const PRMRJ = computed(() => {
  const xx = props?.pasien?.skriningdischargeplannings?.length ? props?.pasien?.skriningdischargeplannings[0] : null
  const no9 = xx?.rs12 ?? null
  const no10 = xx?.rs13 ?? null
  let ket = 'Tidak'
  if (no9 === 'Ya' || no10 === 'Ya') {
    ket = 'Ya'
  }
  return ket
})

// const NORM = computed(() => {
//   const norm = props?.pasien?.norm
//   return [...norm]
// })
const DIAG_KEP = computed(() => {
  const diag = props?.pasien?.diagnosakeperawatan?.map((item) => item.nama)?.join(', ')
  return diag
})
const SUMMARY = computed(() => {
  const diag = props?.pasien?.summarydischargeplannings.length ? props?.pasien?.summarydischargeplannings[0] : null
  return diag
})

const perawat = computed(() => {
  const diag = props?.pasien?.summarydischargeplannings.length ? props?.pasien?.summarydischargeplannings[0] : null
  const petugas = diag?.user_input ?? null
  // console.log('petugas', petugas, pengunjung?.nakes?.find(x => x?.kdpegsimrs === petugas)?.nama ?? null)

  let nama = null
  if (petugas) {
    nama = pengunjung?.nakes?.find(x => x?.kdpegsimrs === petugas)?.nama ?? null
  }
  return nama
})

const KRS = computed(() => {
  const diag = props?.pasien?.cppt?.length ? props?.pasien?.cppt[0] : null
  // console.log('KRS', diag)

  return diag
})

// function initTtd (item) {
//   const ttdPas = pathImg + item?.ttdPasien

//   Promise.all([
//     imageToBase64(ttdPas, (base64Image) => {
//       ttdPasien.value = base64Image ?? null
//     })

//   ])

//   console.log('ttdPasien', ttdPasien.value, ttdPas)
// }

const qrPasien = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'SUMMARY.png'
  const asal = 'RANAP'
  const pasien = SUMMARY?.value?.noreg ?? null
  const enc = btoa(`${noreg}|${dok}|${asal}|${pasien}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

const qrPerawat = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'SUMMARY.png'
  const asal = 'RANAP'
  const petugas = SUMMARY?.value?.user_input ?? null
  const enc = btoa(`${noreg}|${dok}|${asal}|${petugas}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})
const qrDokter = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'SUMMARY.png'
  const asal = 'RANAP'
  const petugas = props?.pasien?.kddokter ?? null
  const enc = btoa(`${noreg}|${dok}|${asal}|${petugas}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})
</script>

<style lang="scss" scoped>

.qrcode__image {
  // background-color: #fff;
  border: 0.1rem solid #fff;
  border-radius: 0.25rem;
  // box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 30%;
  width: 30%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.model-1 {
  tr, td {
    padding-bottom: -5px !important;
  }
}
.model-2 {
  tr, td {
    padding-bottom: 5px !important;
    border-bottom: 1px solid rgb(139, 139, 139);
  }
}

table, tr, td {
  border: none ;
}
td {
  text-align: left;
}

.kotak {
  border: 1px solid black;
}

.print-page {
  // width: 100%;
  // height: 100%;
  background-color: #ffffff;
  padding: 20px !important;
  font-size: 12px;
}

@media print {
  .print-page{
    padding: 0px !important;
  }

  @page {
    // size: 8.5in 9in;
    size: letter;
    page-break-inside: avoid;
    @bottom-right {
      content: "Dokumen Sah dari RSUD MOH SALEH KOTA PROBOLINGGO | Hal Ke-" counter(page);
    }
  }

  .contentx {
    page-break-after: auto;
    // break-after: page;
  }

}

</style>
