<template>
  <div id="pdfDoc" class="q-pa-lg bg-white f-12">
    <!-- page 1 -->
    <div class="page-1">
      <!-- KOP SURAT -->
      <div class="col-grow ba-black">
        <div class="row items-center">
          <div class="col-9 br-black">
            <div class="row items-center q-pa-sm">
              <div class="col-auto">
                <img
                  src="~assets/images/logo-kota-grey.png"
                  width="60"
                >
              </div>
              <div class="col flex-wrap q-px-md">
                <div class="text-center">
                  <div class="text-weight-bold f-12">
                    PEMERINTAH KOTA PROBOLINGGO
                  </div>
                  <!-- <div class="text-weight-bold f-10">
                    DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA
                  </div> -->
                  <div class="text-weight-bold f-16">
                    RSUD DOKTER MOHAMAD SALEH
                  </div>
                  <div class="f-10">
                    <div>Jl. Mayjend Panjaitan No.65 Telp: (0335)433119 Fax.(0335)432702</div>
                    <div>email: rsudprob@probolinggokota.go.id</div>
                    <div>PROBOLINGGO – 67219</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="text-center text-bold">
              PERSETUJUAN
              {{ menu?.title }}
            </div>
            <!-- <div class="text-center text-bold">
              OPERASI / TINDAKAN INVASIF
            </div> -->
          </div>
        </div>
      </div>

      <!-- section-1 -->
      <div class="ba-black f-12 q-mt-xs">
        <div class="q-pa-sm">
          Saya Dokter pelaksana tindakan Colonoscopy menyatakan bahwa telah menerangkan hal yang berkaitan dengan
          tindakan Colonoscopy secara benar dan jelas, dan sudah memberi kesempatan pada pasien / keluarga untuk
          bertanya dan berdiskus
        </div>

        <div class="section-2">
          <q-markup-table dense separator="cell" flat bordered wrap-cells>
            <thead>
              <tr>
                <th colspan="2" class="text-left f-12" width="30%">
                  JENIS INFORMASI
                </th>
                <th class="text-left f-12">
                  ISI INFORMASI
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left f-12 f-12">
                  1
                </td>
                <td class="text-left f-12 f-12">
                  Pengertian
                </td>
                <td class="text-left f-12 f-12">
                  <div class="flex">
                    <div v-html="getNewLine(item?.indikasi)" />
                  </div>

                  <!-- <div v-for="diag in item?.diagnosis" :key="diag" class="flex">
                    <div>- {{ diag }} </div>
                    <div class="q-ml-sm">
                      {{ pasien?.diagnosamedis?.find(x => x?.rs3 === diag)?.masterdiagnosa?.rs4 ?? '-' }}
                    </div>
                  </div> -->
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  2
                </td>
                <td class="text-left f-12">
                  Tujuan
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.tujuanLain)" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  3
                </td>
                <td class="text-left f-12">
                  Resiko
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.resikoLain)" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  4
                </td>
                <td class="text-left f-12">
                  Komplikasi
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.komplikasi)" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>

      <div class="section-3 ba-black">
        <!-- section-3 -->
        <div class="q-pa-sm">
          <div>Saya yang bertanda tangan dibawah ini :</div>

          <div>
            <div class="row q-mt-xs">
              <div class="col-4">
                Nama
              </div>
              <div class="col-8">
                <div class="flex justify-between">
                  <div>: {{ item?.nama }} <span class="q-ml-lg">({{ item?.lp === 'Perempuan' ? 'P' : 'L' }})*</span></div>
                  <div class="self-end">
                    Tanggal Lahir : {{ item?.tglLahir }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                No KTP / SIM / PASPOR
              </div>
              <div class="col-8">
                <div class="flex">
                  : {{ item?.noKtp }}
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                Alamat
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-auto q-mr-xs">
                    :
                  </div>
                  <div class="col full-width">
                    {{ item?.alamat }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                Hubungan Dengan Pasien
              </div>
              <div class="col-8">
                <div class="flex q-gutter-sm">
                  <!-- : {{ item?.hubunganDgPasien }} <span v-if="item?.hubunganDgPasien === 'Keluarga'"> {{ item?.keluarga }}</span> -->
                  <div v-for="n in store.hubunganDgPasiens" :key="n">
                    <div class="flex">
                      <div class="ba-black relative-position" style="width: 15px; height: 15px;">
                        <q-icon v-if="n === item?.hubunganDgPasien" name="icon-mat-check" class="absolute-center" size="sm" />
                      </div> <div class="q-ml-sm">
                        {{ n }} <span v-if="n==='Keluarga'">..................................</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="q-mt-lg">
            Dengan ini menyatakan sesungguhnya bahwa saya telah menerima informasi yang diberikan oleh dokter sebagai
            mana diatas dan telah memahaminya. Untuk itu saya memberikan <b>PERSETUJUAN</b> untuk melaksanakan tindakan
            Colonoscopy terhadap :
          </div>

          <div class="q-mt-lg">
            <div class="row q-mt-xs">
              <div class="col-4">
                Nama
              </div>
              <div class="col-8">
                <div class="flex justify-between">
                  <div>: {{ pasien?.nama }} <span class="q-ml-lg">({{ pasien?.kelamin === 'Perempuan' ? 'P' : 'L' }})*</span></div>
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                No KTP / SIM / PASPOR
              </div>
              <div class="col-8">
                <div class="flex">
                  : {{ pasien?.nktp }}
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                Alamat
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-auto q-mr-xs">
                    :
                  </div>
                  <div class="col full-width">
                    {{ pasien?.alamat }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                RM
              </div>
              <div class="col-8">
                <div class="flex">
                  : {{ pasien?.norm }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="q-mt-lg q-pa-sm">
          Saya memahami perlunya tindakan Colonoscopy termasuk resiko dan komplikasi yang akan timbul akibat
          tindakan Colonoscopy. Saya akan bertanggung jawab secara penuh atas segala akibat yang mungkin terjadi dan
          tidak akan menyalahkan pihak manapun.
        </div>

        <!-- end section-3 -->

        <div class="section-3 q-mt-lg">
          <div class="text-right f-12 q-mb-lg q-mr-sm">
            Probolinggo, {{ humanDate(item?.tanggal) }}, pukul : {{ jamTnpDetik(item?.tanggal) }}
          </div>
          <q-markup-table dense separator="cell" flat bordered wrap-cells>
            <thead>
              <tr>
                <th class="text-left f-12" width="20%" />
                <th class="text-center f-12" width="20%">
                  Dokter
                </th>
                <th class="text-center f-12" width="20%">
                  Saksi RS
                </th>
                <th class="text-center" width="20%">
                  Saksi Pasien
                </th>
                <th class="text-center" width="20%">
                  Yang Menyatakan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left f-12">
                  Nama Jelas
                </td>
                <td class="text-center f-12">
                  {{ item?.pelaksana }}
                </td>
                <td class="text-center f-12">
                  {{ item?.pengedukasi }}
                </td>
                <td class="text-center">
                  {{ item?.saksiPasien }}
                </td>
                <td class="text-center">
                  {{ item?.nama }}
                </td>
              </tr>
              <tr>
                <td class="text-left f-12">
                  Tanda Tangan
                </td>
                <td class="text-center f-12">
                  <img :src="item?.ttd_dokter" alt="ttd dokter" width="70">
                </td>
                <td class="text-center f-12">
                  <img :src="item?.ttd_petugas" alt="ttd-petugas" width="70">
                </td>
                <td class="text-center">
                  <img :src="item?.ttd_saksi_pasien" alt="ttd-saksi-pasien" width="70">
                </td>
                <td class="text-center">
                  <img :src="item?.ttd_yg_menyatakan" alt="ttd-yg-menyatakan" width="70">
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { pathImg } from 'src/boot/axios'
import html2pdf from 'html2pdf.js'
import { pathImg } from 'src/boot/axios'
import { humanDate, jamTnpDetik } from 'src/modules/formatter'
import { imageToBase64 } from 'src/modules/imgBase64'
import { useConcernOperasiInvasifRanapStore } from 'src/stores/simrs/ranap/concernoperasiinvasif'
import { onMounted, ref } from 'vue'
const store = useConcernOperasiInvasifRanapStore()

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  },
  pasien: {
    type: Object,
    default: null
  },
  coba: {
    type: String,
    default: null
  }
})

onMounted(() => {
  hubDgPas()
  initImage(props.item)
})

function initImage (item) {
  const ttdPetugas = pathImg + item?.ttdPetugas
  const ttdDokter = pathImg + item?.ttdDokter
  const ttdSaksiPasien = pathImg + item?.ttdSaksiPasien
  const ttdYgMenyatakan = pathImg + item?.ttdYgMenyatakan

  Promise.all([
    imageToBase64(ttdPetugas, (base64Image) => {
      // document.getElementsByClassName('ttd-petugas')[0].src = base64Image
      // document.getElementsByClassName('ttd-petugas')[1].src = base64Image
      item.ttd_petugas = base64Image ?? ''
    }),
    imageToBase64(ttdDokter, (base64Image) => {
      // document.getElementsByClassName('ttd-dokter')[0].src = base64Image
      item.ttd_dokter = base64Image ?? ''
    }),
    imageToBase64(ttdSaksiPasien, (base64Image) => {
      // document.getElementsByClassName('ttd-saksi-pasien')[0].src = base64Image
      item.ttd_saksi_pasien = base64Image ?? ''
    }),
    imageToBase64(ttdYgMenyatakan, (base64Image) => {
      // document.getElementsByClassName('ttd-yg-menyatakan')[0].src = base64Image
      // document.getElementsByClassName('ttd-yg-menyatakan')[1].src = base64Image
      item.ttd_yg_menyatakan = base64Image ?? ''
    })
  ])
}

const modP = ref([])

function hubDgPas () {
  const a = []
  a.push(props.item?.hubunganDgPasien)
  modP.value = a
}

function getNewLine (text) {
  // console.log('text', text)

  return text?.replace(/\n/g, '<br/>')
}

const exportPdf = () => {
  const concern = document.getElementById('pdfDoc')

  const pdfConfig = {
    margin: 0,
    filename: 'inform-consent-' + props?.item?.jenis + '.pdf',
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
