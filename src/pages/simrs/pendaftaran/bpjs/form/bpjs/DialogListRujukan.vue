<template>
  <q-dialog>
    <q-card style="min-width:80vw;">
      <div>
        <q-bar>
          <q-icon name="icon-mat-dvr" />
          <div class="f-12">
            Daftar Rujukan Pasien JKN
          </div>

          <q-space />
          <q-btn
            v-close-popup
            dense
            flat
            icon="icon-mat-close"
          >
            <q-tooltip>Tutup</q-tooltip>
          </q-btn>
        </q-bar>
      </div>
      <q-card-section
        style="max-height: 80vh"
        horizontal
        class="scroll"
      >
        <q-card-section
          class="col-6 scroll"
          style="max-height: 80vh"
        >
          <p
            v-for="n in 15"
            :key="n"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
          </p>
        </q-card-section>

        <q-separator vertical />

        <q-card-section
          class="col-6 scroll"
          style="max-height: 80vh"
        >
          lorem
        </q-card-section>
      </q-card-section>
      <!-- <q-card-section>
        <div class="f-14 text-weight-bold">
          Rujukan P Care oyee
        </div>
        <div class="title-desc q-mb-md">
          Daftar Rujukan P Care
        </div>
        <div v-if="!store.listRujukanPcare.length">
          <app-loading v-if="store.loadingListRujukan" />
          <app-no-data-small v-else />
        </div>
        <div v-if="store.listRujukanPcare.length">
          <div class="row no-wrap justify-center items-center q-col-gutter-sm text-weight-bold q-mb-sm">
            <div class="col-1">
              <div class="row">
                <div class="col-5">
                  No
                </div>
                <div class="col-7">
                  ICD
                </div>
              </div>
            </div>
            <div class="col-2">
              Diagnosa
            </div>
            <div class="col-2">
              No. Kunjungan
            </div>
            <div class="col-1">
              Pelayanan
            </div>
            <div class="col-2">
              Poli Rujukan
            </div>
            <div class="col-1">
              Kode faskes
            </div>
            <div class="col-1">
              Nama faskes
            </div>
            <div class="col-1">
              tanggal Kunjungan
            </div>
            <div class="col-1">
              aksi
            </div>
          </div>
          <div
            v-for="(list,i) in store.listRujukanPcare"
            :key="i"
            class="row no-wrap justify-center items-center q-col-gutter-sm q-mb-xs"
          >
            <div class="col-1">
              <div class="row">
                <div class="col-5">
                  {{ i+1 }}
                </div>
                <div class="col-7">
                  {{ list.diagnosa?list.diagnosa.kode:'-' }}
                </div>
              </div>
            </div>
            <div class="col-2">
              {{ list.diagnosa?list.diagnosa.nama:'-' }}
            </div>
            <div class="col-2">
              {{ list.noKunjungan }}
            </div>
            <div class="col-1">
              {{ list.pelayanan?list.pelayanan.nama:'-' }}
            </div>
            <div class="col-2">
              {{ list.poliRujukan?list.poliRujukan.nama:'-' }}
            </div>
            <div class="col-1">
              {{ list.provPerujuk?list.provPerujuk.kode:'-' }}
            </div>
            <div class="col-1">
              {{ list.provPerujuk?list.provPerujuk.nama:'-' }}
            </div>
            <div class="col-1">
              {{ list.tglKunjungan }}
            </div>
            <div class="col-1">
              <app-btn
                label="pilih"
                @click="pilihRujukanPCare(list)"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="f-14 text-weight-bold q-mt-md">
          Rujukan RS
        </div>
        <div class="title-desc q-mb-md">
          Daftar Rujukan Rumah Sakit
        </div>
        <div v-if="!store.listRujukanRs.length">
          <app-loading v-if="store.loadingListRujukanRS" />
          <app-no-data-small v-else />
        </div>
        <div v-if="store.listRujukanRs.length">
          <div class="row no-wrap justify-center items-center q-col-gutter-sm text-weight-bold q-mb-sm">
            <div class="col-1">
              <div class="row">
                <div class="col-5">
                  No
                </div>
                <div class="col-7">
                  ICD
                </div>
              </div>
            </div>
            <div class="col-2">
              Diagnosa
            </div>
            <div class="col-2">
              No. Kunjungan
            </div>
            <div class="col-1">
              Pelayanan
            </div>
            <div class="col-2">
              Poli Rujukan
            </div>
            <div class="col-1">
              Kode faskes
            </div>
            <div class="col-1">
              Nama faskes
            </div>
            <div class="col-1">
              tanggal Kunjungan
            </div>
            <div class="col-1">
              aksi
            </div>
          </div>
          <div
            v-for="(list,i) in store.listRujukanRs"
            :key="i"
            class="row no-wrap justify-center items-center q-col-gutter-sm q-mb-xs"
          >
            <div class="col-1">
              <div class="row">
                <div class="col-5">
                  {{ i+1 }}
                </div>
                <div class="col-7">
                  {{ list.diagnosa?list.diagnosa.kode:'-' }}
                </div>
              </div>
            </div>
            <div class="col-2">
              {{ list.diagnosa?list.diagnosa.nama:'-' }}
            </div>
            <div class="col-2">
              {{ list.noKunjungan }}
            </div>
            <div class="col-1">
              {{ list.pelayanan?list.pelayanan.nama:'-' }}
            </div>
            <div class="col-2">
              {{ list.poliRujukan?list.poliRujukan.nama:'-' }}
            </div>
            <div class="col-1">
              {{ list.provPerujuk?list.provPerujuk.kode:'-' }}
            </div>
            <div class="col-1">
              {{ list.provPerujuk?list.provPerujuk.nama:'-' }}
            </div>
            <div class="col-1">
              {{ list.tglKunjungan }}
            </div>
            <div class="col-1">
              <app-btn
                label="pilih"
                @click="pilihRujukanRS(list)"
              />
            </div>
          </div>
        </div>
      </q-card-section> -->
      <!-- <q-separator /> -->
      <!--
      <q-card-section>
        <div class="f-14 text-weight-bold q-mt-md">
          NO SEP Waktu MRS
        </div>
        <div class="title-desc q-mb-md">
          Daftar No SEP Waktu MRS
        </div>
        <div v-if="!store.listRujukanSepMrs.length">
          <app-loading v-if="store.loadingListRujukanMrs" />
          <app-no-data-small v-else />
        </div>
        <div v-if="store.listRujukanSepMrs.length">
          <div class="row no-wrap justify-center items-center q-col-gutter-sm text-weight-bold q-mb-sm">
            <div class="col-1">
              No
            </div>
            <div class="col-3">
              No SEP
            </div>
            <div class="col-2">
              Noka
            </div>
            <div class="col-2">
              Noreg
            </div>
            <div class="col-1">
              Norm
            </div>
            <div class="col-2">
              Tanggal SEP
            </div>
            <div class="col-1">
              aksi
            </div>
          </div>
          <div
            v-for="(list,i) in store.listRujukanSepMrs"
            :key="i"
            class="row no-wrap justify-center items-center q-col-gutter-sm q-mb-xs"
          >
            <div class="col-1">
              {{ i+1 }}
            </div>
            <div class="col-3">
              {{ list.rs8 }}
            </div>
            <div class="col-2">
              {{ list.rs13 }}
            </div>
            <div class="col-2">
              {{ list.rs1 }}
            </div>
            <div class="col-1">
              {{ list.rs2 }}
            </div>
            <div class="col-2">
              {{ list.rs6 }}
            </div>
            <div class="col-1">
              <app-btn
                label="pilih"
                @click="pilihRujukanMrs(list)"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      -->
      <!-- <q-separator /> -->
    </q-card>
  </q-dialog>
</template>
<script setup>
import { date } from 'quasar'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'

const store = useRegistrasiPasienBPJSStore()
// pilih rujukan p care
function pilihRujukan(val, jenis) {
  console.log('karcis', store.jenisKarcises)
  console.log('rujukan p care', val)

  const index = findWithAttr(store.polis, 'kodemapingbpjs', val.poliRujukan.kode)
  if (index >= 0) {
    console.log('index', index, store.polis[index])
    store.paramKarcis.kd_poli = store.polis[index].kodepoli
    store.form.dpjp = ''
    if (store.jenisKarcises.length) {
      store.form.jeniskarcis = store.jenisKarcises[0].jeniskarcis
      store.paramKarcis.flag = store.jenisKarcises[0].jeniskarcis
    }
    if (store.paramKarcis.flag) {
      if (store.paramKarcis.flag !== '') {
        store.getKarcisPoli().then(() => {
          store.display.hargakarcis = store.kasrcispoli.tarif
          store.form.karcis = store.kasrcispoli.tarif
        })
      }
    }
    store.paramDpjp.kdmappolbpjs = store.polis[index].kodemapingbpjs
    store.setForm('kodepoli', store.polis[index].kodepoli)
    store.getDokterDpjp()
  } else {
    notifErrVue('Poli tidak ditemukan')
  }
  // sistaem bayar start
  if (store.form.sistembayar) { delete store.form.sistembayar }
  if (store.display.rs2) { delete store.display.rs2 }
  store.display.bayar.kode = '1'
  const indexbyr = findWithAttr(store.sistembayars1, 'kode', '1')
  if (indexbyr >= 0) {
    store.setForm('jkn', store.sistembayars1[indexbyr].groupsistembayar)
  }
  store.getSistemBayar2(1)

  // sistaem bayar end
  store.diagnosaAwals.push(val.diagnosa)
  store.ppkRujukans.push(val.provPerujuk)
  store.display.diagnosa.kode = val.diagnosa.kode
  store.setForm('kodediagnosa', val.diagnosa.kode)
  store.display.diagnosa.nama = val.diagnosa.nama
  store.setForm('namadiagnosa', val.diagnosa.nama)
  store.setForm('norujukan', val.noKunjungan)
  // ppk rujukan
  store.display.kode = val.provPerujuk.kode
  store.setForm('ppkRujukan', val.provPerujuk.kode)
  store.setForm('tglrujukan', val.tglKunjungan)
  store.setForm('jnspelayanan', val.pelayanan.kode)
  store.display.tanggal.rujukan = date.formatDate(val.tglKunjungan, 'DD MMMM YYYY')

  store.setForm('flagProcedure', '')
  store.setForm('kdPenunjang', '')

  store.tampilRujukan = false
}
// eslint-disable-next-line no-unused-vars
function pilihRujukanRS(val) {
  const param = {
    jenisrujukan: 2,
    norujukan: val.noKunjungan
  }
  store.getJumlahSep(param).then(resp => {
    console.log('jumlah sep Rs', resp)
    // store.jumlahSEP = parseInt(resp.jumlahSEP) >= 0 ? parseInt(resp.jumlahSEP) : 0
  })
  pilihRujukan(val)
  store.setForm('id_kunjungan', 4)
  store.setForm('jenis_kunjungan', 'Rujukan Antar RS')
  const idexKun = findWithAttr(store.jenisKunjungans, 'id', 4)
  store.display.jeniskunjungan = store.jenisKunjungans[idexKun].nilai
}
// eslint-disable-next-line no-unused-vars
function pilihRujukanPCare(val) {
  const param = {
    jenisrujukan: 2,
    norujukan: val.noKunjungan

  }
  store.getJumlahSep(param).then(resp => {
    console.log('jumlah sep p care', resp)
    // store.jumlahSEP = parseInt(resp.jumlahSEP) >= 0 ? parseInt(resp.jumlahSEP) : 0
  })
  pilihRujukan(val)
  store.setForm('id_kunjungan', 1)
  store.setForm('jenis_kunjungan', 'Rujukan FKTP')
  const idexKun = findWithAttr(store.jenisKunjungans, 'id', 1)
  store.display.jeniskunjungan = store.jenisKunjungans[idexKun].nilai
}
// pilih rujukan p care
// function pilihRujukanMrs(val) {
//   console.log('rujukan Mrs', val)
//   store.setForm('norujukan', val.rs8)
//   store.tampilRujukan = false
// }
</script>
