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

          <app-btn
            class="q-ml-xl"
            label="SEP"
            :loading="loading"
            :disable="loading"
            @click="buatSEP"
          />

          <app-btn
            class="q-ml-xl"
            label="Bersihkan Form"
            :loading="loading"
            :disable="loading"
            @click="clearAllRegistrasi"
          />
        </div>
      </q-card-actions>
    </q-card>
    <DialogListRujukan
      v-model="registrasi.tampilRujukan"
      @kode-poli="setKodepoli"
      @jenis-kunjungan="jenisKunjungan"
    />
    <DialogListKontrol
      v-model="registrasi.tampilKontrol"
      @kode-poli="setKodepoli"
      @validasi-surat-kontrol="validasiSuratKontrol"
      @jenis-kunjungan="jenisKunjungan"
      @assign-surat="assignSurat"
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
import { onBeforeUnmount, ref } from 'vue'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'
import { date, Dialog } from 'quasar'
import { useStyledStore } from 'src/stores/app/styled'
import { useRouter } from 'vue-router'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'

const registrasi = useRegistrasiPasienBPJSStore()
const pasien = usePendaftaranPasienStore()
const loading = ref(false)
const refDataPasien = ref(null)
const refRegistrasi = ref(null)

const style = useStyledStore()

function clearAllRegistrasi() {
  registrasi.clearForm()
  refDataPasien.value.clearForm()
}
function clearFormRegistrasi() {
  registrasi.clearForm()
}
function assignSurat(val) {
  refRegistrasi.value.assignSuratKontrol(val)
}
function buatSEP() {
  const dataPasien = refDataPasien.value.set()
  refRegistrasi.value.set()
  // console.log('pasien', dataPasien,
  //   'regis', dataRegis
  // )
  const keys = Object.keys(dataPasien.form)
  if (keys.length) {
    keys.forEach(key => {
      registrasi.setForm(key, dataPasien.form[key])
    })
  }
  console.log('form registrasi ', registrasi.form)
  registrasi.buatSep().then(resp => {
    console.log('resp bpjs', resp)
    // dialogCetak()
  })
  // if (dataPasien.save && dataRegis.save) {
  // }
}

const router = useRouter()
function simpanData() {
  // refDataPasien.value.set()
  // refRegistrasi.value.set()
  const dataPasien = refDataPasien.value.set()
  const dataRegis = refRegistrasi.value.set()
  const form = { noka: pasien.form.noka, tglsep: registrasi.form.tglsep }
  pasien.cekPesertaFinger(form).then(resp => {
    // refDataPasien.value.cekBpjs()
    console.log('pasien', dataPasien,
      'regis', dataRegis
    )
    const finger = resp.result.kode
    console.log('finger', finger)

    if (dataPasien.save && dataRegis.save && finger === '1') {
      const keys = Object.keys(dataPasien.form)
      if (keys.length) {
        keys.forEach(key => {
          registrasi.setForm(key, dataPasien.form[key])
        })
      }
      console.log('form registrasi ', registrasi.form)
      registrasi.simpanRegistrasi().then(resp => {
        console.log('resp bpjs', resp)
        const antrian = resp.antrian.data
        const nomor = antrian ? antrian.nomor : '-'
        const poli = antrian ? antrian.nama_layanan : '-'
        const norm = antrian ? antrian.id_member : '-'
        console.log('Antrian ', antrian)
        const routeData = router.resolve({ path: '/print/antrian', query: { nomor, poli, norm } })
        window.open(routeData.href, '_blank')
        dialogCetak()
      })
    }
    if (finger === '0') {
      pasien.alert = true
      pasien.alertMsg = resp.result
    }
  })
}
function validasiSuratKontrol() {
  console.log('validasi surat kontrol')
  refRegistrasi.value.validasiSuratKontrol()
}
function jenisKunjungan(val) {
  console.log('jenis kunjungan ', val)
  refRegistrasi.value.setJenisKunjungan(val)
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
  registrasi.jumlahSEP = 0
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
      label: 'Buat SEP',
      color: 'green'
    },
    cancel: {
      'no-caps': true,
      push: true,
      color: 'dark'
    }
  }).onOk(() => {
    console.log('Cetak')
    registrasi.buatSep()
  }).onCancel(() => {
    console.log('tidak Cetak')
  })
}

onBeforeUnmount(() => {
  refDataPasien.value.clearForm()
  registrasi.clearForm()
  console.log('unmounted', refDataPasien.value.clearForm())
})
</script>
