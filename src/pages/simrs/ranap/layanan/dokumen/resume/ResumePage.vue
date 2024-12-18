<template>
  <div id="pdfDoc" class="bg-white print-page">
    <div class="page-1">
      <!-- KOP SURAT -->
      <div class="col-grow">
        <div class="row items-center">
          <div class="col-12">
            <div class="row">
              <div class="col-auto">
                <img
                  src="~assets/images/logo-kota-grey.png"
                  width="50"
                >
              </div>
              <div class="col flex-wrap q-px-lg">
                <div class="text-left">
                  <!-- <div class="text-weight-bold f-12">
                    PEMERINTAH KOTA PROBOLINGGO
                  </div> -->
                  <!-- <div class="text-weight-bold f-10">
                    DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA
                  </div> -->
                  <div class="text-weight-bold f-14">
                    UOBK RSUD DOKTER MOHAMAD SALEH
                  </div>
                  <div class="f-12">
                    <div>Jl. Mayjend Panjaitan No.65 Probolinggo Jawa Timur</div>
                    <div>Telp. (0335) 433478,433119,421118 Fax. (0335) 432702</div>
                    <!-- <div>PROBOLINGGO – 67219</div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-3">
            <div class="text-center text-bold">
              PERSETUJUAN
              TINDAKAN KEDOKTERAN
            </div>
            <div class="text-center text-bold">
              OPERASI / TINDAKAN INVASIF
            </div>
          </div> -->
        </div>
      </div>

      <hr>
      <!-- CONTENT -->
      <div class="contentx">
        <div class="f-14 text-center text-bold q-mb-lg">
          RESUME MEDIS ( MEDICAL DISCHARGE SUMMARY )
        </div>
        <div class="full-width">
          <table width="99%" cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr valign="top">
                <td>Nama</td>
                <td>:</td>
                <td>{{ props?.pasien?.nama_panggil }}</td>
                <td>No. RM</td>
                <td>:</td>
                <td>{{ pasien?.norm }}</td>
              </tr>
              <tr valign="top">
                <td>Umur&nbsp;</td>
                <td>:</td>
                <td>{{ usiaTh }} thn&nbsp;</td>
                <td>Ruangan&nbsp;</td>
                <td>:</td>
                <td>{{ pasien?.ketruangan }}&nbsp;</td>
              </tr>
              <tr valign="top">
                <td />
                <td />
                <td />
                <td>Tanggal Masuk IGD</td>
                <td>:</td>
                <td>{{ pasien?.dataigd?.tglmasuk_igd ?? '-' }}</td>
              </tr>
              <tr valign="top">
                <td>Jenis Kelamin&nbsp;</td>
                <td>:</td>
                <td>{{ pasien?.kelamin }}</td>
                <td>Tanggal Masuk&nbsp;</td>
                <td>:</td>
                <td>{{ pasien?.tglmasuk ?? '-' }}</td>
              </tr>
              <tr valign="top">
                <td>Suku Bangsa</td>
                <td>:</td>
                <td />
                <td>Tgl. Keluar</td>
                <td>:</td>
                <td>{{ pasien?.tglkeluar ?? '-' }}</td>
              </tr>
              <tr valign="top">
                <td>Agama&nbsp;</td>
                <td>:</td>
                <td>{{ pasien?.agama }}</td>
                <td>DPJP </td>
                <td>:</td>
                <td>{{ pasien?.dokter }}</td>
              </tr>
              <tr valign="top">
                <td>No.Reg</td>
                <td>:</td>
                <td>{{ pasien?.noreg }}</td>
                <td>Status Covid 19</td>
                <td>:</td>
                <td>{{ pasien?.statuscovid?.length ? pasien?.statuscovid[0]?.flagcovid ?? '-' : '-' }}</td>
              </tr>
            </tbody>
          </table>

          <hr>
          <template v-for="(res, i) in resume" :key="i">
            <div class="row q-col-gutter-x-sm contentx">
              <div class="col-auto">
                <div class="flex q-gutter-md">
                  <div>{{ i + 1 }} . </div><div>{{ res?.title }}</div> <div>:</div>
                </div>
              </div>
              <div v-if="res?.type==='1'" class="col full-width flex wrap">
                <div v-html="res?.isian" />
              </div>
              <div v-else-if="res?.type==='1Array'" class="col full-width flex wrap">
                <template v-for="(isi, j) in res?.isian" :key="j">
                  <span v-html="isi" />
                </template>
              </div>
              <div v-else-if="res?.type==='penunjang'" class="col full-width">
                <div v-for="(item, n) in res?.isian" :key="n" class="column full-width">
                  <div class="row q-col-gutter-x-sm">
                    <div class="col-auto">
                      - {{ item?.label }} :
                    </div>
                    <div v-if="item?.data?.length" class="col full-width">
                      <template v-for="(pen, m) in item?.data" :key="m">
                        <!-- <span v-if="pen">{{ pen?.nama }} : <b>{{ pen?.hasil }}</b>, &nbsp; </span> -->
                        <span v-if="pen" v-html="pen" />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </template>

          <!-- 1 -->
          <!-- <div class="row q-col-gutter-x-sm">
            <div class="col-auto">
              <div class="flex q-gutter-lg">
                <div>1 . </div><div>ALASAN PASIEN DIRAWAT IGD</div> <div>:</div>
              </div>
            </div>
            <div class="col full-width">
              <div v-if="data?.anamnesis_igd?.length">
                <div v-for="(ku, n) in data?.anamnesis_igd" :key="n">
                  {{ ku?.keluhanUtama }},
                </div>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 2 -->
          <!-- <div class="row q-col-gutter-x-md">
            <div class="col-auto">
              <div class="flex q-gutter-lg">
                <div>2 . </div><div>ANAMNESE AWAL IGD</div> <div>:</div>
              </div>
            </div>
            <div class="col full-width">
              <div v-if="data?.anamnesis_igd?.length">
                - Riwayat Penyakit Sekarang : {{ data?.anamnesis_igd[0]?.riwayatpenyakitsekarang }}<br>
                - Riwayat Penyakit Dahulu : {{ data?.anamnesis_igd[0]?.riwayatpenyakit }}<br>
                - Riwayat Pengobatan : {{ data?.anamnesis_igd[0]?.riwayatpengobatan }}<br>
                - Riwayat Penyakit Keluarga : {{ data?.anamnesis_igd[0]?.riwayatpenyakitkeluarga }}<br>
                - Riwayat Pekerjaan Yang Berhubungan Dengan Zat Berbahaya : {{ data?.anamnesis_igd[0].riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya }}<br>
                - Riwayat Alergi : {{ data?.anamnesis_igd[0]?.riwayatalergi }}<br>
                - Keterangan Alergi  : {{ data?.anamnesis_igd[0]?.keteranganalergi }}<br>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 3 -->
          <!-- <div class="row q-col-gutter-x-md">
            <div class="col-auto">
              <div class="flex q-gutter-lg">
                <div>3 . </div><div>PEMERIKSAAN FISIK IGD</div> <div>:</div>
              </div>
            </div>
            <div class="col full-width">
              <div v-if="data?.pemeriksaan_igd?.length" class="column">
                - Bagian Kepala : {{ data?.pemeriksaan_igd[0]?.rs5 }}.  <br>
                - Bagian Leher : {{ data?.pemeriksaan_igd[0]?.rs6 }}.<br>
                - Bagian Dada : {{ data?.pemeriksaan_igd[0]?.rs7 }}<br>
                - Bagian Punggung : {{ data?.pemeriksaan_igd[0]?.rs8 }}<br>
                - Bagian Perut : {{ data?.pemeriksaan_igd[0]?.rs9 }}<br>
                - Tangan : {{ data?.pemeriksaan_igd[0]?.rs10 }}<br>
                - Kaki : {{ data?.pemeriksaan_igd[0]?.rs11 }}<br>
                - Status Neurologis : {{ data?.pemeriksaan_igd[0]?.rs12 }}<br>
                - Genital : {{ data?.pemeriksaan_igd[0]?.rs13 }}<br>
                <br>

                - Sax : {{ data?.pemeriksaan_igd[0]?.sax }} Celcius | - Srec : {{ data?.pemeriksaan_igd[0]?.srec }} Celcius <br>
                - Pernapasan  : {{ data?.pemeriksaan_igd[0]?.pernapasanigd }} /mnt | - Nadi : {{ data?.pemeriksaan_igd[0]?.nadiigd }} x/mnt <br>
                - Tensi  : {{ data?.pemeriksaan_igd[0]?.tensiigd }} mmHg | - BB : {{ data?.pemeriksaan_igd[0]?.beratbadan }} Kg <br>
                - Tinggi Badan  : {{ data?.pemeriksaan_igd[0]?.tinggibadan }} Cm
              </div>
            </div>
          </div>
          <hr> -->

          <!-- 4 -->
          <!-- <div class="row q-col-gutter-x-md">
            <div class="col-auto">
              <div class="flex q-gutter-lg">
                <div>4 . </div><div>ANAMNESE RAWAT INAP</div> <div>:</div>
              </div>
            </div>
            <div class="col full-width">
              <div v-if="data?.anamnesis?.length" class="column">
                - Keluhan Utama : {{ data?.anamnesis[0]?.keluhanUtama }}<br>
                - Riwayat Penyakit Sekarang : {{ data?.anamnesis[0]?.riwayatpenyakitsekarang }}<br>
                - Riwayat Penyakit Dahulu : {{ data?.anamnesis[0]?.riwayatpenyakit }}<br>
                - Riwayat Pengobatan : {{ data?.anamnesis[0]?.riwayatpengobatan }}<br>
                - Riwayat Penyakit Keluarga : {{ data?.anamnesis[0]?.riwayatpenyakitkeluarga }}<br>
                - Riwayat Pekerjaan Yang Berhubungan Dengan Zat Berbahaya : {{ data?.anamnesis[0].riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya }}<br>
                - Riwayat Alergi : <span v-for="al in data?.anamnesis[0].riwayatalergi" :key="al">
                  {{ al }} ,
                </span> <br>
                - Keterangan Alergi  : {{ data?.anamnesis[0]?.keteranganalergi }}<br>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 5 -->
          <!-- <div class="row q-col-gutter-x-md">
            <div class="col-auto">
              <div class="flex q-gutter-lg">
                <div>5 . </div><div>PEMERIKSAAN FISIK RAWAT INAP</div> <div>:</div>
              </div>
            </div>
            <div class="col full-width">
              <div v-if="data?.pemeriksaan?.length" class="column">
                - Keadaan Umum : {{ data?.pemeriksaan[0]?.keadaanUmum }}<br>
                - Tingkat Kesadaran : {{ data?.pemeriksaan[0]?.tkKesadaran }}<br>
                - Berat Badan : {{ data?.pemeriksaan[0]?.bb }}<br>
                - Tinggi Badan : {{ data?.pemeriksaan[0]?.tb }}<br>
                - Suhu Tubuh : {{ data?.pemeriksaan[0]?.suhu }}<br>
                - Pernapasan : {{ data?.pemeriksaan[0].pernapasan }}<br>
                - SPo2 :  {{ data?.pemeriksaan[0].spo }}<br>
                - Nadi  : {{ data?.anamnesis[0]?.nadi }}<br>
                - Sistole  : {{ data?.anamnesis[0]?.sistole }}<br>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 6 -->
          <!-- <div class="row q-col-gutter-x-md">
            <div class="col-auto">
              <div class="flex q-gutter-lg">
                <div>6 . </div><div>PEMERIKSAAN PENUNJANG</div> <div>:</div>
              </div>
            </div>
            <div class="col full-width">
              <div class="">
                - LABORAT :
                <div v-if="data?.laborats?.length" class="q-ml-xl">
                  <div v-for="lab in data?.laborats" :key="lab" class="column">
                    <div class="flex" v-if="lab?.rs27 !== '' && lab?.rs27 !== 'N'">
                      {{ lab?.pemeriksaanlab?.rs2 }} : {{ lab?.rs21 }} ({{ lab?.rs27 }})
                    </div>
                  </div>
                </div>
              </div>
              <div>
                - RADIOLOGI :
                <div v-if="pasien?.hasilradiologi?.length" class="q-ml-xl">
                  <div v-for="rad in pasien?.hasilradiologi" :key="rad" class="column">
                    <div class="flex">
                      {{ rad?.rs3 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr> -->

          <!-- 7 -->
          <!-- <div class="row q-col-gutter-x-md">
            <div class="col-auto">
              <div class="flex q-gutter-lg">
                <div>7 . </div><div>DIAGNOSIS</div> <div>:</div>
              </div>
            </div>
            <div class="col full-width">
              <div class="column">
                <div class="flex q-gutter-md">
                  <div>
                    - DIAGNOSIS DPJP
                  </div>
                  <div>: {{ pasien?.memodiagnosa }}</div>
                </div>
                <div class="flex q-gutter-md">
                  <div>
                    - DIAGNOSIS Utama
                  </div>
                  <div v-if="data?.diagnosis?.length">
                    : {{ data?.diagnosis?.find(x=>x.tipe==='Primer')?.name }}
                  </div>
                </div>
                <div class="flex q-gutter-md">
                  <div>
                    - DIAGNOSIS Sekunder
                  </div>
                  <div v-if="data?.diagnosis?.length">
                    : <span v-for="diag in data?.diagnosis?.filter(x=>x.tipe==='Sekunder')" :key="diag">
                      {{ diag?.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 8 -->
          <!-- <div class="row q-col-gutter-x-md">
            <div class="col-auto">
              <div class="flex q-gutter-lg">
                <div>8 . </div><div>PENGOBATAN</div> <div>:</div>
              </div>
            </div>
            <div class="col full-width">
              <div class="flex">
                -
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 9 -->
          <!-- <div class="">
            <div class="">
              <div class="flex q-gutter-lg">
                <div>9 . </div><div>TINDAKAN</div> <div>:</div>
              </div>
            </div>
            <div class="full-width">
              <div class="flex q-ml-md">
                - OPERATIF : <span>-</span>
                - NON OPERATIF : <span>-</span>
                - KETERANGAN : <span>-</span>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 10 -->
          <!-- <div class="">
            <div class="">
              <div class="flex q-gutter-lg">
                <div>10 . </div><div>KEADAAN WAKTU KRS </div> <div>:</div>
              </div>
            </div>
            <div class="full-width">
              <div class="flex q-ml-md">
                - a : <span>-</span>
                - a : <span>-</span>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 11 -->
          <!-- <div class="">
            <div class="">
              <div class="flex q-gutter-lg">
                <div>11 . </div><div>PROGNOSIS </div> <div>:  <span> -</span></div>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 12 -->
          <!-- <div class="">
            <div class="">
              <div class="flex q-gutter-lg">
                <div>12 . </div><div>SEBAB MENINGGAL </div> <div>:  <span> -</span></div>
              </div>
            </div>
          </div>
          <hr> -->
          <!-- 13 -->
          <!-- <div class="">
            <div class="">
              <div class="flex q-gutter-lg">
                <div>13 . </div><div>TINDAK LANJUT</div> <div>:  <span> -</span></div>
              </div>
            </div>
          </div>
          <hr> -->

          <div class="row q-pa-xl justify-between items-center">
            <div class="kiri text-center">
              <div><b>Pasien / Keluarga</b></div>
              <div style="margin-top:100px">
                <b>(................)</b>
              </div>
            </div>
            <div class="kanan text-center">
              <div><b>Probolinggo, {{ pasien?.tanggalkeluar }}</b></div>
              <div><b>Dokter Penanggung Jawab Pelayanan</b></div>
              <div class="column flex-center">
                <div style="width: 100px;">
                  <vue-qrcode
                    :value="qrUrl"
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
                </div>
              </div>

              <div>
                <b>{{ pasien?.dokter }}</b>
              </div>
            </div>
          </div>

          <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useResume from './useResume'
import html2pdf from 'html2pdf.js'
// eslint-disable-next-line no-unused-vars
import { getNewLine } from 'src/modules/formatter'

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

const { usiaTh, resume } = useResume(props?.pasien)
// console.log('resume', data)

const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'RESUME-MEDIS.png'
  const asal = 'RANAP'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

const exportPdf = () => {
  const concern = document.getElementById('pdfDoc')

  const pdfConfig = {
    margin: 0,
    filename: 'resume-medis-' + props?.pasien?.noreg + '.pdf',
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      logging: true,
      dpi: 192,
      letterRendering: true
    },
    jsPDF: {
      unit: 'mm', // mm | pt | in
      format: 'a4', // a4 | letter
      orientation: 'portrait' // landscape | portrait
    }
  }

  html2pdf().set(pdfConfig).from(concern).save()
}
defineExpose({ exportPdf })

</script>

<style lang="scss" scoped>
table, tr, td {
  border: none !important;
}
td {

  text-align: left;
}

.print-page {
  // width: 100%;
  // height: 100%;
  background-color: #ffffff;
  padding: 20px !important;
}

@media print {
  .print-page{
    padding: 0px !important;
  }

  @page {
    // size: 8.5in 9in;
    size: letter;
    // margin-top: 4in !important;
    // margin-left: 4in !important;
    // margin-right: 4in !important;

    // page-break-inside: auto;
    page-break-inside: avoid;
    @bottom-right {
      content: "Hal " counter(page) "-- dari " counter(pages) " hal";
    }
    // @top-right {
    //   content: "Page " counter(pageNumber);
    // }
  }

  .contentx {
    page-break-after: auto;
    // break-after: page;
  }
  // hr {
  //   page-break-before: auto;
  //   page-break-after: auto;
  // }

  // /* Menargetkan semua halaman bernomor genap */
  // @page :left {
  //   // margin-top: 4in !important;
  //   // margin-bottom: 4in !important;
  // }
  // @page :right {
  //   // margin-top: 4in !important;
  //   // margin-bottom: 4in !important;
  // }
  // /* Menargetkan semua halaman bernomor ganjil */
  // @page :right {
  //   size: 11in;
  //   margin-top: 4in;
  // }

  /* Targets all selectors with `page: wide;` set */
  // @page wide {
  //   size: a4 landscape;
  // }

  // @page {
  //   /* margin box at top right showing page number */
  //   @top-right {
  //     content: "Page " counter(pageNumber);
  //   }
  // }

}

</style>
