<template>
  <div class="page-A4 f-12 bg-white">
    <div class="contentx">
      <!-- kop -->
      <my-kop-surat />
      <!-- content -->
      <div class="b-a q-mt-sm q-pa-sm">
        <div class="q-mb-sm">
          <div class="q-mb-sm">
            Saya yang bertanda tangan dibawah ini :
          </div>
          <div class="column">
            <div class="row">
              <div class="col-2">
                Nama
              </div>
              <div class="col-auto">
                :
              </div>
              <div class="col-shrink q-ml-xs">
                {{ pasien?.nama? pasien?.nama:defaultForm }}
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
                {{ pasien?.kelamin? pasien?.kelamin:defaultForm }}
              </div>
            </div>

            <div
              class="row no-wrap"
              style="margin-top:-10px;"
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
                : {{ pasien?.tgllahir? pasien?.tgllahir:defaultForm }}
              </div>
            </div>
          </div>
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
            <div class="q-mt-md">
              Petugas Tpp Rawat Jalan
            </div>
            <div
              style="min-height: 50px;"
              class="column flex-center"
            >
              Ttd
            </div>
            <div>{{ app?.user?.pegawai?.nama || 'Nama' }}</div>
          </div>
          <div class="col text-center">
            <div>Probolinggo, {{ pasien?.tgl_kunjungan ? humanDate(pasien?.tgl_kunjungan) : defaultForm }}</div>
            <div class="q-mt-md">
              Pasien / Keluarga
            </div>
            <div
              style="min-height: 50px;"
              class="column flex-center"
            >
              Ttd
            </div>
            <div>{{ pasien?.nama ?? 'Nama' }}</div>
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

const app = useAplikasiStore()

const saveWork = () => {
  changeIsi('irja')
}

const props = defineProps({
  editableMaster: { type: Boolean, default: false },
  isiPasien: { type: Object, default: null }
})
const { isi, pasien, defaultForm, changeIsi } = useContent(props?.isiPasien)

</script>

<style lang="scss" scoped>
.page-A4{
  // background: white;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  padding-bottom: 5vh;
  // margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
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
</style>
