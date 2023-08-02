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
          :ada-list="false"
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
              <!-- <app-btn
                class="q-ml-xl"
                label="test qt"
                :loading="loading"
                :disable="loading"
                @click="qrtest()"
              /> -->
            </div>
          </q-card-actions>
        </q-card>
        <!-- <DialogListRujukan
          v-model="regis.tampilRujukan"
          @kode-poli="setKodepoli"
        />
        <DialogListKontrol
          v-model="regis.tampilKontrol"
          @kode-poli="setKodepoli"
          @validasi-surat-kontrol="validasiSuratKontrol"
          @jenis-kunjungan="jenisKunjungan"
          @assign-surat="assignSurat"
        /> -->
        <DialogListSuplesi
          v-model="regis.tampilSuplesi"
        />
      </div>
    </template>
  </app-fullscreen>
  <app-dialog-not-full
    v-model="dialogQr"
    @on-ok="closeQr()"
  >
    <template #default>
      <div style="width:25vw ">
        <figure
          class="qrcode full-width q-pa-sm"
        >
          <vue-qrcode
            :value="nokaQr"
            tag="svg"
            :options="{
              errorCorrectionLevel: 'Q',
              color: {
                dark: '#000000',
                light: '#ffffff',
              },
              margin:2
            }"
          />
        </figure>
      </div>
    </template>
  </app-dialog-not-full>
</template>

<script setup>
import DialogListSuplesi from 'src/pages/simrs/pendaftaran/bpjs/form/bpjs/DialogListSuplesi.vue'
// import DialogListKontrol from 'src/pages/simrs/pendaftaran/bpjs/form/bpjs/DialogListKontrol.vue'
// import DialogListRujukan from 'src/pages/simrs/pendaftaran/bpjs/form/bpjs/DialogListRujukan.vue'
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import FormRegistrasi from 'src/pages/simrs/pendaftaran/bpjs/form/bpjs/FormRegistrasi.vue'
import HeaderComp from './comp/HeaderComp.vue'
import ListKunjungan from './comp/ListKunjungan.vue'
import BottomComp from './comp/BottomComp.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useListBpjsAntrianStore } from 'src/stores/simrs/pendaftaran/mjkn/lists'
import { onMounted, onUnmounted, ref } from 'vue'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
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

function clearAllRegistrasi() {
  regis.clearForm()
  refDataPasien.value.clearForm()
}
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
    if (resp.metadata.code === '200') {
      pilihRujukanPCare(resp.result.rujukan)
    }
    if (resp.result === 'Tidak ditemukan') {
      regis.cekRujukanRs(param).then(resp => {
        console.log('yang di Rujukan rs ', resp)
        if (resp.metadata.code === '200') {
          console.log('Rujukan rs result ', resp.result)
          pilihRujukanRS(resp.result.rujukan)
        }

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

  // metani kode2 dan alamat -- start --
  // agama
  const indexAgama = findWithAttr(store.agamas, 'keterangan', val.agama)
  if (indexAgama >= 0) {
    store.display.kode = store.agamas[indexAgama].kode
    if (!val.kodemapagama) {
      store.setForm('kodemapagama', store.agamas[indexAgama].kodemapping)
    }
  } else {
    store.display.kode = '8'
  }
  // pekerjaan
  const indexpekerjaan = findWithAttr(store.pekerjaans, 'pekerjaan', val.pekerjaan)
  if (indexpekerjaan >= 0) {
    store.display.pekerjaan = store.pekerjaans[indexpekerjaan].pekerjaan
  }
  // kelamin
  if (!val.kodekelamin) {
    if (!val.kd_kelamin) {
      const indexkelamin = findWithAttr(store.kelamins, 'kelamin', val.kelamin)
      if (indexkelamin >= 0) {
        store.setForm('kodekelamin', store.kelamins[indexkelamin].kode)
      }
    } else {
      store.setForm('kodekelamin', val.kd_kelamin)
    }
  }
  // negara
  if (val.negara) {
    store.negaraSelected(val.negara)
    store.getProvinces().then(() => {
      if (val.kodepropinsi) {
        store.propinsiSelected(val.kodepropinsi)
        store.getKota().then(() => {
          if (val.kodekabupatenkota) {
            store.kabupatenSelected(val.kodekabupatenkota)
            store.getKec().then(() => {
              if (val.kodekecamatan) {
                store.kecamatanSelected(val.kodekecamatan)
                store.getKels().then(() => {
                  if (val.kodekelurahan) {
                    store.kelurahanSelected(val.kodekelurahan)
                  }
                })
              }
            })
          }
        })
      }
    })
  }
  if (val.negaradomisili && !store.alamataDomisiliSama) {
    store.negaraDomisiliSelected(val.negaradomisili)
    store.getProvincesDomisili().then(() => {
      if (val.propinsidomisili) {
        store.propinsiDomisiliSelected(val.propinsidomisili)
        store.getKotaDomisili().then(() => {
          store.kabupatenDomisiliSelected(val.kabupatenkotadomisili)
          store.getKecDomisili().then(() => {
            if (val.kecamatandomisili) {
              store.kecamatanDomisiliSelected(val.kecamatandomisili)
              store.getKelsDomisili().then(() => {
                if (val.kelurahandomisili) {
                  store.kelurahanDomisiliSelected(val.kelurahandomisili)
                }
              })
            }
          })
        })
      }
    })
  }
  // metani kode2 dan alamat -- end --
  // routerInstance.push({
  //   path: '/pendaftaran/bpjs/form',
  //   replace: true
  // })
}
function pilihRujukan(val, jenis) {
  console.log('karcis', regis.jenisKarcises)
  console.log('rujukan p care', val)

  // regis.setForm('asalrujukan', 'AR9999')
  const index = findWithAttr(regis.polis, 'kodemapingbpjs', val.poliRujukan.kode)
  if (index >= 0) {
    console.log('index', index, regis.polis[index])
    regis.paramKarcis.kd_poli = regis.polis[index].kodepoli
    regis.form.dpjp = ''
    if (regis.jenisKarcises.length) {
      regis.form.jeniskarcis = regis.jenisKarcises[0].jeniskarcis
      regis.paramKarcis.flag = regis.jenisKarcises[0].jeniskarcis
    }
    if (regis.paramKarcis.flag) {
      if (regis.paramKarcis.flag !== '') {
        regis.getKarcisPoli().then(() => {
          regis.display.hargakarcis = regis.kasrcispoli.tarif
          regis.form.karcis = regis.kasrcispoli.tarif
        })
      }
    }
    regis.paramDpjp.kdmappolbpjs = regis.polis[index].kodemapingbpjs
    // emits('kodePoli', regis.polis[index].kodepoli)
    // regis.setForm('kodepoli', regis.polis[index].kodepoli)
    setKodepoli(regis.polis[index].kodepoli)
    regis.getDokterDpjp()
  } else {
    notifErrVue('Poli tidak ditemukan')
  }
  // sistaem bayar start
  if (regis.form.sistembayar) { delete regis.form.sistembayar }
  if (regis.display.rs2) { delete regis.display.rs2 }
  regis.display.bayar.kode = '1'
  const indexbyr = findWithAttr(regis.sistembayars1, 'kode', '1')
  if (indexbyr >= 0) {
    regis.setForm('jkn', regis.sistembayars1[indexbyr].groupsistembayar)
  }
  regis.getSistemBayar2(1)

  // sistaem bayar end
  regis.diagnosaAwals.push(val.diagnosa)
  regis.ppkRujukans.push(val.provPerujuk)
  regis.display.diagnosa.kode = val.diagnosa.kode
  regis.setForm('kodediagnosa', val.diagnosa.kode)
  regis.display.diagnosa.nama = val.diagnosa.nama
  regis.setForm('namadiagnosa', val.diagnosa.nama)
  regis.setForm('norujukan', val.noKunjungan)
  // ppk rujukan
  regis.display.kode = val.provPerujuk.kode
  regis.setForm('ppkRujukan', val.provPerujuk.kode)
  regis.setForm('namappkRujukan', val.provPerujuk.nama)
  regis.setForm('tglrujukan', val.tglKunjungan)
  regis.setForm('jnspelayanan', val.pelayanan.kode)
  regis.display.tanggal.rujukan = date.formatDate(val.tglKunjungan, 'DD MMMM YYYY')

  regis.setForm('flagprocedure', '')
  regis.setForm('kdPenunjang', '')
}
// rujukan p care ketemu
function pilihRujukanPCare(val) {
  const param = {
    jenisrujukan: 1,
    norujukan: val.noKunjungan

  }
  regis.getJumlahSep(param).then(resp => {
    console.log('jumlah sep p care', resp)
    if (parseInt(resp.jumlahSEP) >= 1) {
      notifErrVue('Jumlah SEP Rujukan pernah Dibuat. silahkan isi surat kontrol')
    }
    // regis.jumlahSEP = parseInt(resp.jumlahSEP) >= 0 ? parseInt(resp.jumlahSEP) : 0
  })
  pilihRujukan(val)
  regis.setForm('asalRujukan', '1')
  regis.setForm('id_kunjungan', 1)
  regis.setForm('jenis_kunjungan', 'Rujukan FKTP')
  const idexKun = findWithAttr(regis.jenisKunjungans, 'id', 1)
  regis.display.jeniskunjungan = regis.jenisKunjungans[idexKun].nilai
  // emits('jenisKunjungan', regis.jenisKunjungans[idexKun].nilai)
  jenisKunjungan(regis.jenisKunjungans[idexKun].nilai)
}

// rujukan RS
function pilihRujukanRS(val) {
  const param = {
    jenisrujukan: 2,
    norujukan: val.noKunjungan
  }
  regis.getJumlahSep(param).then(resp => {
    console.log('jumlah sep Rs', resp)
    if (parseInt(resp.jumlahSEP) >= 1) {
      notifErrVue('Jumlah SEP Rujukan pernah Dibuat. silahkan isi surat kontrol')
    }
    // regis.jumlahSEP = parseInt(resp.jumlahSEP) >= 0 ? parseInt(resp.jumlahSEP) : 0
  })
  pilihRujukan(val)
  regis.setForm('asalRujukan', '2')
  regis.setForm('id_kunjungan', 4)
  regis.setForm('jenis_kunjungan', 'Rujukan Antar RS')
  const idexKun = findWithAttr(regis.jenisKunjungans, 'id', 4)
  regis.display.jeniskunjungan = regis.jenisKunjungans[idexKun].nilai
  // emits('jenisKunjungan', regis.jenisKunjungans[idexKun].nilai)
  jenisKunjungan(regis.jenisKunjungans[idexKun].nilai)
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
    if (resp.metadata.code === '200') {
      dialogQr.value = true
    }
    // dialogCetak()
  })
  // if (dataPasien.save && dataRegis.save) {
  // }
}
const nokaQr = ref('')

// function qrtest() {
//   nokaQr.value = pasien.form.noka
//   dialogQr.value = true
// }
function closeQr() {
  dialogQr.value = false
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
  const form = { noka: pasien.form.noka, tglsep: regis.form.tglsep }
  if (dataPasien.save && dataRegis.save) {
    nokaQr.value = pasien.form.noka
    if (regis.form.kodepoli === 'POL008') {
      toSimpan(dataPasien)
    } else {
      pasien.cekPesertaFinger(form).then(resp => {
        const finger = resp.result.kode
        console.log('finger', finger)
        if (finger === '1') {
          toSimpan(dataPasien)
        } else if (finger === '0') {
          pasien.alert = true
          pasien.alertMsg = resp.result
        }
      })
    }
  }
}

function toSimpan(dataPasien) {
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

const dialogQr = ref(false)
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

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin: 0;
  position: relative;
}

</style>
