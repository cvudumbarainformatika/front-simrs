<template>
  <div class="page-A4 f-12">
    <div class="contentx">
      <!-- kop -->
      <my-kop-surat />
      <!-- content -->
      <div class="b-a q-mt-sm q-pa-sm">
        <div class="q-mb-sm">
          <div class="q-mb-sm">
            Saya yang bertanda tangan dibawah ini :
          </div>
          <div class="row">
            <div class="col-auto q-mr-sm">
              <div>Nama</div>
              <div>Alamat</div>
              <div>No. Telp</div>
              <div>Hubungan dengan Pasien</div>
            </div>
            <div class="col-grow">
              <div>: {{ pasien.nama? pasien.nama:defaultForm }}</div>
              <div>: {{ pasien.nama? pasien.alamat:defaultForm }}</div>
              <div>: {{ pasien.nohp?pasien.nohap:defaultForm }}</div>
              <div>: {{ pasien.hub?pasien.hub:defaultForm }}</div>
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
            <div>Nama</div>
          </div>
          <div class="col text-center">
            <div>Probolinggo, tanggal pukul: 000</div>
            <div class="q-mt-md">
              Pasien / Keluarga
            </div>
            <div
              style="min-height: 50px;"
              class="column flex-center"
            >
              Ttd
            </div>
            <div>Nama</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-xl" />
</template>

<script setup>
import { useContent } from './content'
const { isi, pasien, defaultForm, changeIsi } = useContent()

const saveWork = () => {
  changeIsi('irja')
}

defineProps({ editableMaster: { type: Boolean, default: false } })
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
