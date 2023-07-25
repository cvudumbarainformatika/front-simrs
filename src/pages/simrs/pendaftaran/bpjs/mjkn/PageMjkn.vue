<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1"
    >
      <HeaderComp
        :tanggal="store.params.tgl"
        :search="store.params.q"
        :per-page="store.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:60px"
    >
      <ListKunjungan
        :key="store.items"
        :items="store.items"
        :loading="store.loading"
        :loading-send="store.loadingSend"
        :rm="Rm"
        @kirim-poli="kirimPoli"
      />
    </div>
    <div class="fixed-bottom">
      <BottomComp
        v-if="store.meta !==null"
        :key="store.meta"
        :meta="store.meta"
        @go-to="store.setPage"
      />
    </div>
  </div>
  <app-fullscreen
    v-model="store.dialog"
    @close="clearFormRegistrasi"
  >
    <template #default>
      <div>
        <div
          class="row items-center justify-between bg-grey q-pa-sm"
        >
          <div class="f-14 text-weight-bold">
            Form Identitas Pasien I.1
          </div>
          <div>
            <q-checkbox
              v-model="pasien.edit"
              label="Edit Form "
              dense
            />
          </div>
        </div>
        <DataPasien
          ref="refDataPasien"
          bpjs
          :bisa-full="false"
          :not-edit="false"
          :nik="regis.form.nik"
          :noka="regis.form.noka"
          :tglsep="regis.form.tglsep"
          @ganti-pasien="clearFormRegistrasi"
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
            </div>
          </q-card-actions>
        </q-card>
        <DialogListRujukan
          v-model="regis.tampilRujukan"
          @kode-poli="setKodepoli"
        />
        <DialogListKontrol
          v-model="regis.tampilKontrol"
          @kode-poli="setKodepoli"
          @validasi-surat-kontrol="validasiSuratKontrol"
          @jenis-kunjungan="jenisKunjungan"
          @assign-surat="assignSurat"
        />
        <DialogListSuplesi
          v-model="regis.tampilSuplesi"
        />
      </div>
    </template>
  </app-fullscreen>
</template>

<script setup>
import DialogListSuplesi from 'src/pages/simrs/pendaftaran/bpjs/form/bpjs/DialogListSuplesi.vue'
import DialogListKontrol from 'src/pages/simrs/pendaftaran/bpjs/form/bpjs/DialogListKontrol.vue'
import DialogListRujukan from 'src/pages/simrs/pendaftaran/bpjs/form/bpjs/DialogListRujukan.vue'
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import FormRegistrasi from 'src/pages/simrs/pendaftaran/bpjs/form/bpjs/FormRegistrasi.vue'
import HeaderComp from './comp/HeaderComp.vue'
import ListKunjungan from './comp/ListKunjungan.vue'
import BottomComp from './comp/BottomComp.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useListBpjsAntrianStore } from 'src/stores/simrs/pendaftaran/mjkn/lists'
import { onMounted, onUnmounted, ref } from 'vue'
import { findWithAttr } from 'src/modules/utils'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'
import { date, Dialog } from 'quasar'
// import { routerInstance } from 'src/boot/router'

const style = useStyledStore()
const store = useListBpjsAntrianStore()
const pasien = usePendaftaranPasienStore()
const regis = useRegistrasiPasienBPJSStore()

const refDataPasien = ref(null)
const refRegistrasi = ref(null)
const loading = ref(false)

const Rm = ref('')
function kirimPoli(val) {
  // val.noreg = ''
  // console.log('kirim poli ', val)
  if (!val.noreg) {
    Rm.value = val.norm
    // console.log('kirim poli ', val)
    store.getPasien(val.norm).then(resp => {
      if (resp.length === 1) {
        pilihPasienIni(resp[0], val)
      } else {
        const index = findWithAttr(resp, 'norm', val.norm)
        if (index >= 0) {
          pilihPasienIni(resp[index], val)
        }
      }
    })
  }
}
// eslint-disable-next-line no-unused-vars
function pilihPasienIni(val, jkn) {
  if (val === '' || val === null || val === undefined || !val) return
  val.noka = val.nokabpjs
  pasien.form = val
  if (pasien.alamataDomisiliSama) {
    if ((!pasien.form.alamatdomisili ? true : pasien.form.alamatdomisili === '') && pasien.form.alamat) pasien.setForm('alamatdomisili', pasien.form.alamat)
    if ((!pasien.form.rtdomisili ? true : pasien.form.rtdomisili === '') && pasien.form.rt) pasien.setForm('rtdomisili', pasien.form.rt)
    if ((!pasien.form.rwdomisili ? true : pasien.form.rwdomisili === '') && pasien.form.rw) pasien.setForm('rwdomisili', pasien.form.rw)
    if ((!pasien.form.kodeposdomisili ? true : pasien.form.kodeposdomisili === '') && pasien.form.kodepos) pasien.setForm('kodeposdomisili', pasien.form.kodepos)
    if ((!pasien.form.negaradomisili ? true : pasien.form.negaradomisili === '') && pasien.form.negara) pasien.setForm('negaradomisili', pasien.form.negara)
    if ((!pasien.form.propinsidomisili ? true : pasien.form.propinsidomisili === '') && pasien.form.propinsi) pasien.setForm('propinsidomisili', pasien.form.propinsi)
    if ((!pasien.form.kodepropinsidomisili ? true : pasien.form.kodepropinsidomisili === '') && pasien.form.kodepropinsi) pasien.setForm('kodepropinsidomisili', pasien.form.kodepropinsi)
    if ((!pasien.form.kabupatenkotadomisili ? true : pasien.form.kabupatenkotadomisili === '') && pasien.form.kabupatenkota) pasien.setForm('kabupatenkotadomisili', pasien.form.kabupatenkota)
    if ((!pasien.form.kodekabupatenkotadomisili ? true : pasien.form.kodekabupatenkotadomisili === '') && pasien.form.kodekabupatenkota) pasien.setForm('kodekabupatenkotadomisili', pasien.form.kodekabupatenkota)
    if ((!pasien.form.kecamatandomisili ? true : pasien.form.kecamatandomisili === '') && pasien.form.kecamatan) pasien.setForm('kecamatandomisili', pasien.form.kecamatan)
    if ((!pasien.form.kodekecamatandomisili ? true : pasien.form.kodekecamatandomisili === '') && pasien.form.kodekecamatan) pasien.setForm('kodekecamatandomisili', pasien.form.kodekecamatan)
    if ((!pasien.form.kelurahandomisili ? true : pasien.form.kelurahandomisili === '') && pasien.form.kelurahan) pasien.setForm('kelurahandomisili', pasien.form.kelurahan)
    if ((!pasien.form.kodekelurahandomisili ? true : pasien.form.kodekelurahandomisili === '') && pasien.form.kodekelurahan) pasien.setForm('kodekelurahandomisili', pasien.form.kodekelurahan)
  }
  // if (val.nik !== '') {
  //   const form = { nik: val.nik, tglsep: regis.form.tglsep }
  //   pasien.cekPesertaByNik(form).then(resp => {
  //     if (Object.keys(resp.provUmum).length) {
  //       const rujukan = {
  //         kode: resp.provUmum.kdProvider,
  //         nama: resp.provUmum.nmProvider
  //       }
  //       regis.ppkRujukans.push(rujukan)
  //       regis.display.kode = rujukan.kode
  //       regis.setForm('ppkRujukan', rujukan.kode)
  //     }
  //   })
  // } else
  if (val.noka !== '') {
    console.log('noka', val.noka === undefined)
    const form = { noka: val.noka, tglsep: regis.form.tglsep }
    pasien.cekPesertaByNoka(form).then(resp => {
      pasien.alert = true
      pasien.alertMsg = resp
      console.log('cek noka', resp)
      if (resp.peserta.provUmum) {
        const rujukan = {
          kode: resp.peserta.provUmum.kdProvider,
          nama: resp.peserta.provUmum.nmProvider
        }
        regis.ppkRujukans.push(rujukan)
        regis.display.kode = rujukan.kode
        regis.setForm('ppkRujukan', rujukan.kode)
      }
    })
  }

  pasien.setForm('noantrian', jkn.nomorantrean)
  const tglLahir = val.tgllahir.split('-')
  pasien.setForm('barulama', 'lama')
  if (tglLahir.length) {
    pasien.tanggal.tahun = tglLahir[0]
    pasien.tanggal.bulan = tglLahir[1]
    pasien.tanggal.hari = tglLahir[2]
    pasien.setTanggalLahir()
  }
  const param = {
    search: jkn.nomorreferensi
  }
  store.setDialog()
  regis.cekRujukanPcare(param).then(resp => {
    console.log('yang di P care', resp)
    if (resp.result === 'Tidak ditemukan') {
      regis.cekRujukanRs(param).then(resp => {
        console.log('yang di Rujukan rs ', resp)
        if (resp.result === 'Tidak ditemukan') {
          console.log('mau cek Surat kontrol ')
          regis.cekSuratKontrol(param).then(resp => {
            // console.log('yang Surat kontrol ', resp)
            if (resp.metadata.code === '200') {
              console.log('ada Surat kontrol ', resp.result)
              console.log('referensi ', jkn.nomorreferensi)
              regis.setForm('nosuratkontrol', jkn.nomorreferensi)
              assignSurat(resp.result)
              validasiSuratKontrol()
            }
          })
        } else {
          console.log('tidak cek Surat kontrol ')
        }
      })
    } else {
      console.log('tidak cek Rujukan rs ')
    }
  })
  console.log('pasien terpilih', val, jkn)
  // routerInstance.push({
  //   path: '/pendaftaran/bpjs/form',
  //   replace: true
  // })
}
// pasien
// registrasi
function clearFormRegistrasi() {
  regis.clearForm()
  store.setDialog()
}
// cek surat Kontrol
function getListSuratKontrol() {
  const data = refDataPasien.value.validateNokaAndNorm()
  data.bulan = date.formatDate(regis.form.tglsep, 'MM')
  data.tahun = date.formatDate(regis.form.tglsep, 'YYYY')
  regis.listSuratKontrols = []
  regis.listRencanaKontrols = []
  if (data) {
    console.log('cek Surat kontrol', data)
    regis.getListSuratKontrol(data)
    regis.getListRencanaKontrol(data)
    regis.tampilKontrol = true
  }
}

// cek list rujukan
function getListRujukan() {
  console.log('validasi ', refDataPasien.value.validateNokaAndNorm())
  const data = refDataPasien.value.validateNokaAndNorm()

  regis.listRujukanPcare = []
  regis.listRujukanRs = []
  regis.listRujukanSepMrs = []
  regis.jumlahSEP = 0
  if (data) {
    if (Object.keys(data).length) {
      console.log('cek list rujukan', data)
      regis.getListRujukanPCare(data)
      regis.getListRujukanRs(data)
      regis.getListSepMrs(data)
      regis.tampilRujukan = true
    }
  }
}

// cek supplesi
function cekSuplesi() {
  const data = refDataPasien.value.validateNoka()
  if (data) {
    console.log('noka', data)
    regis.getListSuplesi(data)
  }
}

// setkodePoli
function setKodepoli(val) {
  console.log('poli ditemukan', val, refRegistrasi.value)
  regis.form.kodepoli = val
  refRegistrasi.value.setPoliTujuan(val)
}

// validasi surat kontrol
function validasiSuratKontrol() {
  console.log('validasi surat kontrol')
  refRegistrasi.value.validasiSuratKontrol()
}

// jenis konjungan
function jenisKunjungan(val) {
  console.log('jenis kunjungan ', val)
  refRegistrasi.value.setJenisKunjungan(val)
}

// assign surat kontrol
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
      regis.setForm(key, dataPasien.form[key])
    })
  }
  console.log('form registrasi ', regis.form)
  regis.buatSep().then(resp => {
    console.log('resp bpjs', resp)
    // dialogCetak()
  })
  // if (dataPasien.save && dataRegis.save) {
  // }
}
function simpanData() {
  // refDataPasien.value.set()
  // refRegis.value.set()
  const dataPasien = refDataPasien.value.set()
  const dataRegis = refRegistrasi.value.set()
  // refDataPasien.value.cekBpjs()
  console.log('pasien', dataPasien,
    'regis', dataRegis
  )
  if (dataPasien.save && dataRegis.save) {
    const keys = Object.keys(dataPasien.form)
    if (keys.length) {
      keys.forEach(key => {
        regis.setForm(key, dataPasien.form[key])
      })
    }
    console.log('form registrasi ', regis.form)
    regis.simpanRegistrasi().then(resp => {
      console.log('resp bpjs', resp)
      dialogCetak()
    })
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
    regis.buatSep()
  }).onCancel(() => {
    console.log('tidak Cetak')
  })
}
onMounted(() => {
  store.getLists()
})

onUnmounted(() => {
  store.setTglAwal()
})
</script>
