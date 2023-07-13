<template>
  <div>
    <DataPasien
      ref="refDataPasien"
      bpjs
      :nik="registrasi.form.nik"
      :noka="registrasi.form.noka"
      :tglsep="registrasi.form.tglsep"
      :full="style.componentfull"
      @ganti-pasien="clearFormRegistrasi"
      @full-screen="style.setComponentFull"
    />
    <!-- @bisa-simpan="bisaSimpan" -->
    <!-- @surat="bisaCekSurat" -->
    <!-- @bisa-simpan="simpanRegistrasi" -->
    <FormRegistrasi
      ref="refRegistrasi"
      @get-list-surat-kontrol="getListSuratKontrol"
      @get-list-rujukan="getListRujukan"
      @cek-suplesi="cekSuplesi"
    />
    <q-card
      class="full-width q-pb-xl"
      flat
    >
      <q-card-actions>
        <div class="">
          <app-btn
            label="Simpan Form"
            :loading="loading"
            :disable="loading"
            @click="simpanData"
          />
        </div>
      </q-card-actions>
    </q-card>
    <DialogListRujukan v-model="registrasi.tampilRujukan" />
    <DialogListKontrol
      v-model="registrasi.tampilKontrol"
      @kode-poli="setKodepoli"
    />
    <DialogListSuplesi
      v-model="registrasi.tampilSuplesi"
    />
  </div>
</template>
<script setup>
import DialogListSuplesi from './DialogListSuplesi.vue'
import DialogListKontrol from './DialogListKontrol.vue'
import DialogListRujukan from './DialogListRujukan.vue'
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import FormRegistrasi from './FormRegistrasi.vue'
import { ref } from 'vue'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'
import { date, Dialog } from 'quasar'
import { useStyledStore } from 'src/stores/app/styled'

const registrasi = useRegistrasiPasienBPJSStore()
const loading = ref(false)
const refDataPasien = ref(null)
const refRegistrasi = ref(null)

const style = useStyledStore()

function clearFormRegistrasi() {
  registrasi.clearForm()
}
function simpanData() {
  // refDataPasien.value.set()
  // refRegistrasi.value.set()
  const dataPasien = refDataPasien.value.set()
  const dataRegis = refRegistrasi.value.set()
  console.log('pasien', dataPasien,
    'regis', dataRegis
  )
  if (dataPasien.save && dataRegis.save) {
    const keys = Object.keys(dataPasien.form)
    if (keys.length) {
      keys.forEach(key => {
        registrasi.setForm(key, dataPasien.form[key])
      })
    }
    console.log('form registrasi ', registrasi.form)
    registrasi.simpanRegistrasi().then(resp => {
      console.log('resp bpjs', resp)
      dialogCetak()
    })
  }
}
// data nik, norm, noka pasien
// let dataPasien = null
// function bisaCekSurat(val) {
//   dataPasien = val
//   // console.log('bisa cek Surat kontrol', val)
// }

// cek surat Kontrol
function getListSuratKontrol() {
  const data = refDataPasien.value.validateNokaAndNorm()
  data.bulan = date.formatDate(registrasi.form.tglsep, 'MM')
  data.tahun = date.formatDate(registrasi.form.tglsep, 'YYYY')
  registrasi.listSuratKontrols = []
  registrasi.listRencanaKontrols = []
  if (data) {
    console.log('cek Surat kontrol', data)
    registrasi.getListSuratKontrol(data)
    registrasi.getListRencanaKontrol(data)
    registrasi.tampilKontrol = true
  }
}
// cek supplesi
function cekSuplesi() {
  const data = refDataPasien.value.validateNoka()
  if (data) {
    data.tglsep = registrasi.form.tglKecelakaan
    console.log('noka', data)
    registrasi.getListSuplesi(data)
  }
}
// setkodePoli
function setKodepoli(val) {
  console.log('poli ditemukan', val, refRegistrasi.value)
  registrasi.form.kodepoli = val
  refRegistrasi.value.setPoliTujuan(val)
}
// cek list rujukan
function getListRujukan() {
  console.log('validasi ', refDataPasien.value.validateNokaAndNorm())
  const data = refDataPasien.value.validateNokaAndNorm()

  registrasi.listRujukanPcare = []
  registrasi.listRujukanRs = []
  registrasi.listRujukanSepMrs = []

  if (data) {
    if (Object.keys(data).length) {
      console.log('cek list rujukan', data)
      registrasi.getListRujukanPCare(data)
      registrasi.getListRujukanRs(data)
      registrasi.getListSepMrs(data)
      registrasi.tampilRujukan = true
    }
  }
}

function dialogCetak() {
  Dialog.create({
    title: 'Konfirmasi.',
    message: 'Buat SEP?',
    persistent: true,
    ok: {
      push: true,
      'no-caps': true,
      label: 'Cetak',
      color: 'green'
    },
    cancel: {
      'no-caps': true,
      push: true,
      color: 'dark'
    }
  }).onOk(() => {
    console.log('Cetak')
  }).onCancel(() => {
    console.log('tidak Cetak')
  })
}
</script>
