<template>
  <div>
    <DataPasien
      ref="refDataPasien"
      bpjs
      :nik="registrasi.form.nik"
      :noka="registrasi.form.noka"
      :tglsep="registrasi.form.tglsep"
      :full="style.componentfull"
      @ganti-pasien="clearAllRegistrasi()"
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
            @click="preSEP"
          />

          <app-btn
            class="q-ml-xl"
            label="Bersihkan Form"
            :loading="loading"
            :disable="loading"
            @click="clearAllRegistrasi"
          />
          <app-btn
            class="q-ml-xl"
            label="Loading"
            :loading="loading"
            :disable="loading"
            @click="loadingCek()"
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
    <app-dialog-form
      v-model="dialog"
      :title="loadingFinger?'Masih mengambil data .... ':'Alasan Finger'"
      :loading="loadingP"
      @save-form="simpanPengajuan()"
    >
      <template #default>
        <div>
          <div
            v-if="pesanBPJS!==''"
            class="row q-mb-sm"
          >
            <p>{{ pesanBPJS }}</p>
          </div>
          <div
            v-if="!loadingFinger"
            class="row"
          >
            <div class="col-12">
              <app-input
                v-model="keterangan"
                label="keterangan"
              />
            </div>
          </div>
          <div
            v-if="bisaBuatSep"
            class="row justify-end q-mr-lg q-my-lg"
          >
            <app-btn
              class="q-ml-xl"
              label="Buat SEP"
              :loading="loading"
              :disable="loading"
              @click="preSEP"
            />
          </div>
        </div>
      </template>
    </app-dialog-form>
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
import { loadingRes, notifCenterVue, notifNegativeCenterVue } from 'src/modules/utils'
import { api } from 'src/boot/axios'

const registrasi = useRegistrasiPasienBPJSStore()
const pasien = usePendaftaranPasienStore()
const loading = ref(false)
const refDataPasien = ref(null)
const refRegistrasi = ref(null)

const style = useStyledStore()

function loadingCek() {
  loadingRes('show')
}
function clearAllRegistrasi() {
  registrasi.clearForm()
  refDataPasien.value.clearForm()
}
// function clearFormRegistrasi() {
//   registrasi.clearForm()
// }
function assignSurat(val) {
  refRegistrasi.value.assignSuratKontrol(val)
}

const dialog = ref(false)
const bisaBuatSep = ref(false)
const pesanBPJS = ref('')
function preSEP() {
  // refDataPasien.value.set()
  // refRegistrasi.value.set()
  if (refDataPasien.value.set() && refRegistrasi.value.set()) {
    if (!registrasi.form.noreg) {
      notifNegativeCenterVue('Nomor Registrasi belum ada')
      dialogTidakAdaReg()
    } else {
      buatSEP()
    }
  }
}
function buatSEP() {
  console.log('form registrasi ', registrasi.form)
  registrasi.buatSep().then(resp => {
    console.log('resp bpjs', resp)
    if (resp.metadata.code === '201') {
      // notifErrVue(resp.data.metadata.message)
      pesanBPJS.value = resp.metadata.message
    }
    if (resp.metadata.code === '200') {
      dialog.value = false
      pesanBPJS.value = resp.metadata.message
      // notifSuccessVue(resp.data.metadata.message)
      // notifCenterVue('Berhasil Buat SEP')
    }
  })
}

function simpanData() {
  const router = useRouter()
  const dataPasien = refDataPasien.value.set()
  const dataRegis = refRegistrasi.value.set()
  const form = { noka: pasien.form.noka, tglsep: registrasi.form.tglsep }
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
      const antrian = resp.antrian.data
      const nomor = antrian ? antrian.nomor : '-'
      const poli = antrian ? antrian.nama_layanan : '-'
      const norm = antrian ? antrian.id_member : '-'
      console.log('Antrian ', antrian)
      const routeData = router.resolve({ path: '/print/antrian', query: { nomor, poli, norm } })
      window.open(routeData.href, '_blank')
      // dialogCetak()
      cekFingerPasien(form)
    })
  }
}
const loadingFinger = ref(false)
function cekFingerPasien(form) {
  dialog.value = true
  loadingFinger.value = true
  pesanBPJS.value = 'Mengambil Data Finger Print dari BPJS'
  pasien.cekPesertaFinger(form).then(resp => {
    loadingFinger.value = false
    // refDataPasien.value.cekBpjs()
    const finger = resp.result.kode
    console.log('finger', finger)
    if (finger === '1') {
      // toSimpan(dataPasien)
      dialogCetak()
    } else if (finger === '0') {
      // cek umur
      // jika  < 17 thn pas cetak sep, jika tidak muncul popup pengajuan
      if (registrasi.form.umurthn < 17) {
        dialogCetak()
      } else if (registrasi.form.umurthn === 17 && registrasi.form.umurbln === 0 && registrasi.form.umurhari === 0) {
        dialogCetak()
      } else {
        // pasien.alert = true
        // pasien.alertMsg = resp.result
        pesanBPJS.value = resp.result.status
      }
    }
  })
}
// penajuan sep

// const jenisPengajuans = ref([
//   { nama: 'pengajuan backdate', value: '1' },
//   { nama: 'pengajuan finger print', value: '2' }
// ])
// const jenisPengajuan = ref('2')
const keterangan = ref('')
const loadingP = ref(false)
function simpanPengajuan() {
  const data = {
    noka: registrasi.form.noka,
    jenispengajuan: '2',
    keterangan: keterangan.value
  }
  console.log(data)
  // dialog.value = false
  return new Promise(resolve => {
    loadingP.value = true
    api.post('v1/simrs/bridgingbpjs/pendaftaran/pengajuansep', data)
      .then(resp => {
        loadingP.value = false
        console.log('PEngajuan sep', resp)
        if (resp.data.message === 'OK' || resp.data.metadata.code === '200') {
          bisaBuatSep.value = true
          pesanBPJS.value = 'Respon BPJS : ' + resp.data.message
          notifCenterVue('Pengajuan SEP sudah disampaikan, tunggu konfirmasi dari penjaminan sebelum Buat SEP')
          console.log('PEngajuan sep message', resp.data.message)
        }
        if (resp.data.metadata.code === '201') {
          bisaBuatSep.value = true
          console.log('PEngajuan sep 201', resp.data.metadata)
          pesanBPJS.value = resp.data.metadata.message
        }
        // jenisPengajuan.value = '2'
        keterangan.value = ''
        resolve(resp)
      })
      .catch(() => {
        loadingP.value = false
      })
  })
}
// function simpanDataLama() {
//   // refDataPasien.value.set()
//   // refRegistrasi.value.set()
//   const dataPasien = refDataPasien.value.set()
//   const dataRegis = refRegistrasi.value.set()
//   const form = { noka: pasien.form.noka, tglsep: registrasi.form.tglsep }
//   console.log('pasien', dataPasien,
//     'regis', dataRegis
//   )
//   if (dataPasien.save && dataRegis.save) {
//     if (registrasi.form.kodepoli === 'POL008') {
//       toSimpan(dataPasien)
//     } else {
//       cekFingerPasien(form, dataPasien)
//     }
//   }
// }
// function toSimpan(dataPasien) {
//   const keys = Object.keys(dataPasien.form)
//   if (keys.length) {
//     keys.forEach(key => {
//       registrasi.setForm(key, dataPasien.form[key])
//     })
//   }
//   console.log('form registrasi ', registrasi.form)
//   registrasi.simpanRegistrasi().then(resp => {
//     console.log('resp bpjs', resp)
//     const antrian = resp.antrian.data
//     const nomor = antrian ? antrian.nomor : '-'
//     const poli = antrian ? antrian.nama_layanan : '-'
//     const norm = antrian ? antrian.id_member : '-'
//     console.log('Antrian ', antrian)
//     const routeData = router.resolve({ path: '/print/antrian', query: { nomor, poli, norm } })
//     window.open(routeData.href, '_blank')
//     dialogCetak()
//   })
// }
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
  dialog.value = false
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
    buatSEP()
  }).onCancel(() => {
    console.log('tidak Cetak')
  })
}
function dialogTidakAdaReg() {
  Dialog.create({
    title: 'Konfirmasi.',
    message: 'Nomor Registrasi tidak ada, apakah akan dilanjutkan?',
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
    buatSEP()
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
