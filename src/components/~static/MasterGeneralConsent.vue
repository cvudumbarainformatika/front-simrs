<!-- eslint-disable no-unused-vars -->
<template>
  <div
    id="pdfDoc"
    ref="rePdfDoc"
    class="page-A4 f-12 bg-white"
  >
    <div

      class="contentx"
    >
      <!-- kop -->
      <my-kop-surat />
      <!-- content -->
      <div class="b-a q-mt-sm q-pa-sm">
        <div class="q-mb-sm">
          <div class="q-mb-sm">
            Saya yang bertanda tangan dibawah ini :
          </div>
          <table style="width: 100%;">
            <tr>
              <td width="20%">
                Nama
              </td>
              <td width="1%">
                :
              </td>
              <td>  {{ pasien?.nama? pasien?.name:defaultForm }}</td>
            </tr>
            <tr>
              <td width="20%">
                Jenis Kelamin
              </td>
              <td width="1%">
                :
              </td>
              <td>  {{ pasien?.kelamin ? pasien?.kelamin:defaultForm }}</td>
            </tr>
            <tr>
              <td width="20%">
                Tanggal Lahir
              </td>
              <td width="1%">
                :
              </td>
              <td>  {{ pasien?.tgllahir? humanDate(pasien?.tgllahir):defaultForm }}</td>
            </tr>
            <tr>
              <td width="20%">
                Alamat
              </td>
              <td width="1%">
                :
              </td>
              <td>  {{ pasien?.alamat? pasien?.alamat:defaultForm }}</td>
            </tr>
            <tr>
              <td width="20%">
                No Telp / Hp
              </td>
              <td width="1%">
                :
              </td>
              <td>  {{ pasien?.nohp? pasien?.nohp:defaultForm }}</td>
            </tr>
            <tr>
              <td width="20%">
                Hubungan dg Pasien
              </td>
              <td width="1%">
                :
              </td>
              <td>
                {{ pasien?.generalcons?.hubunganpasien ?
                  pasien?.generalcons?.hubunganpasien: store.form.hubunganpasien
                }}
              </td>
            </tr>
          </table>
          <!-- <div class="column q-col-gutter-xs">
            <div class="row no-wrap">
              <div class="col-2">
                Nama
              </div>
              <div class="col-auto">
                :
              </div>
              <div class="col-shrink q-ml-xs">
                {{ pasien?.nama? pasien?.name:defaultForm }}
              </div>
            </div>

            <div
              class="row no-wrap"
            >
              <div class="col-2">
                Jenis Kelamin
              </div>
              <div class="col-auto">
                :
              </div>
              <div class="col-shrink q-ml-xs">
                {{ pasien?.kelamin ? pasien?.kelamin:defaultForm }}
              </div>
            </div>

            <div
              class="row no-wrap"
            >
              <div class="col-2">
                Tgl Lahir
              </div>
              <div class="col-auto">
                :
              </div>
              <div class="col-shrink q-ml-xs">
                {{ pasien?.tgllahir? humanDate(pasien?.tgllahir):defaultForm }}
              </div>
            </div>

            <div
              class="row no-wrap"
              style="margin-top:-10px;"
            >
              <div class="col-2">
                Alamat
              </div>
              <div class="col-auto">
                :
              </div>
              <div class="col-shrink q-ml-xs">
                {{ pasien?.alamat? pasien?.alamat:defaultForm }}
              </div>
            </div>

            <div
              class="row no-wrap"
            >
              <div class="col-2">
                No Telp / Hp
              </div>
              <div class="col-shrink">
                : {{ pasien?.nohp? pasien?.nohp:defaultForm }}
              </div>
            </div>

            <div
              class="row no-wrap"
              style="margin-top:-25px; margin-bottom: -15px;"
            >
              <div class="col-2">
                Hubungan dg Pasien
              </div>
              <div class="col-shrink">
                : {{ pasien?.generalcons?.hubunganpasien? pasien?.generalcons?.hubunganpasien:defaultForm }}
              </div>
            </div>
          </div> -->
        </div>
        <div>
          <div
            class="mirror-editor"
            v-html="isi"
          />
          <q-popup-edit
            v-if="editableMaster"
            v-model="isi"
          >
            <q-editor
              v-model="isi"
              min-height="5rem"
              paragraph-tag="div"
              placeholder="Silahkan Ketik disini .."
              :definitions="{
                save: {
                  tip: 'Save your work',
                  icon: 'icon-mat-save',
                  label: 'Save',
                  handler: saveWork
                }
              }"
              :toolbar="[
                ['save'],
                ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                ['left', 'center', 'right', 'justify'],
                ['quote', 'unordered', 'ordered', 'outdent', 'indent']
              ]"
            />
          </q-popup-edit>
        </div>
        <!-- bottom -->
        <div class="row q-mt-md">
          <div class="col text-center">
            <div>Mengetahui,</div>
            <div class="q-mt-xs">
              Petugas Tpp Rawat Jalan
            </div>
            <div
              v-if="!app?.user?.pegawai?.ttdpegawai"
              style="min-height: 50px;"
              class="column flex-center"
            >
              Ttd
            </div>
            <div v-else>
              <!-- <embed
                type="image/png"
                :src="pathImg + app?.user?.pegawai?.ttdpegawai"
                width="120"
              > -->
              <!-- <q-img
                :src="pathImg + app?.user?.pegawai?.ttdpegawai"
                width="150px"
              /> -->
              <img
                :src="app?.user?.pegawai?.ttdpegawai_url"
                alt="ttd-pegawai-rsudmohsaleh"
                width="150"
              >
              <!-- {{ pasien?.ttdpasien }} -->
            </div>
            <div>{{ app?.user?.pegawai?.nama || 'Nama' }}</div>
          </div>
          <div class="col text-center">
            <div>Probolinggo, {{ pasien?.tgl_kunjungan ? humanDate(pasien?.tgl_kunjungan) : defaultForm }}</div>
            <div class="q-mt-xs">
              Pasien / Keluarga
            </div>
            <div
              style="min-height: 50px;"
              class="column flex-center"
            >
              <div v-if="!pasien?.ttdpasien">
                Ttd
              </div>
              <div v-else>
                <!-- <q-img
                  :src="ttdPas"
                  width="150px"
                /> -->
                <!-- {{ pasien?.ttdpasien }} -->
                <img
                  :src="pasien?.generalcons?.ttdpasien_url"
                  alt="ttd-pasien-rsudmohsaleh"
                  width="150"
                >
              </div>
            </div>
            <div>{{ pasien?.name ?? 'Nama' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-xl" />
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useContent } from '../~static/generalconsent/content'
import { humanDate } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { api, pathImg } from 'src/boot/axios'
import { ref, watch } from 'vue'
// eslint-disable-next-line no-unused-vars
import { jsPDF } from 'jspdf'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'
import { useGeneralConsentStore } from 'src/stores/simrs/pendaftaran/generalconsent'
const app = useAplikasiStore()

const rePdfDoc = ref(null)
const store = useGeneralConsentStore()

const saveWork = () => {
  changeIsi('irja')
}

const props = defineProps({
  editableMaster: { type: Boolean, default: false },
  cetak: { type: Boolean, default: false },
  isiPasien: { type: Object, default: null }
})
const { isi, pasien, defaultForm, changeIsi, isOk } = useContent(props?.isiPasien)

// eslint-disable-next-line no-unused-vars
function createPdf() {
  // console.log(rePdfDoc.value.innerHTML)
  // eslint-disable-next-line new-cap
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'px',
    format: 'a4',
    hotfixes: ['px_scaling']
  })
  const source = rePdfDoc.value

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
    // doc.save(pasien?.value?.norm + '.pdf')

    const pdf = new File([doc.output('arraybuffer')], pasien?.value?.norm + '.pdf', { type: 'application/pdf' })
    simpanPdf(pdf)
  })
}

// eslint-disable-next-line no-unused-vars
// const imageUrlToBase64 = async (url) => {
//   await fetch(url, {
//     mode: 'no-cors'
//   })

//     .then(data => data.blob())
//     .then(blob => {
//       console.log('blob', blob) // log the blob and check its size;
//       const blobUrl = URL.createObjectURL(blob)
//       console.log('blobUrl', blobUrl)
//       const a = document.createElement('a')
//       console.log('a', a)
//     })
//     .catch(err => {
//       console.log('base64Err', err)
//     })
// const blob = await data.blob()
// return new Promise((resolve, reject) => {
//   const reader = new FileReader()
//   reader.readAsDataURL(blob)
//   reader.onloadend = () => {
//     const base64data = reader.result
//     console.log('base64', base64data)
//     resolve(base64data)
//   }
//   reader.onerror = reject
// })
// }

// eslint-disable-next-line no-unused-vars
function blob2file(blobData) {
  const fd = new FormData()
  fd.set('a', blobData, pasien?.value?.norm + '.pdf')
  return fd.get('a')
}

// eslint-disable-next-line no-unused-vars
async function simpanPdf(pdf) {
  const formData = new FormData()
  formData.append('pdf', pdf)
  formData.append('norm', pasien?.value?.norm)

  const resp = await api.post('/v1/simrs/pendaftaran/generalconscent/simpanpdf', formData)
  console.log('simpan pdf', resp)
}

watch(() => isOk.value, (n, old) => {
  console.log(n)
  if (n === true) {
    if (props.cetak === true) {
      setTimeout(createPdf, 1000)
    }
  }
})

</script>

<style lang="scss" scoped>
.page-A4{
  // background: white;
  display: block;
  margin-left: auto;
  margin-right: auto;
  //margin-top: 5vh;
  //padding-bottom: 5vh;
  // margin-bottom: 0.5cm;
  //box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
  // width: 21cm;
  // width: 595pt;
  // height: auto;
  width: 21cm;
  height: 29.7cm;
  // margin: 30mm 45mm
  .contentx{
    padding: 5mm 5mm
  }

  .b-a{
    border: 1px solid black;
  }
  .b-l{
    border-left: 1px solid black;
  }
  .b-r{
    border-right: 1px solid black;
  }
}

// .pt12 {
//   font-size: 12pt !important;
// }

table {
  width: 100%;
  td {
    vertical-align: top;
  }
}
</style>
