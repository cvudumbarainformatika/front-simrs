<template>
  <q-dialog>
    <q-card style="min-width:75vw;">
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Surat Kontrol
        </div>
        <div class="title-desc q-mb-md">
          Daftar Surat kontrol
        </div>
        <div v-if="!store.listSuratKontrols.length">
          <app-loading v-if="store.loadingListRujukan" />
          <app-no-data v-else />
        </div>
        <div v-if="store.listSuratKontrols.length">
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
          Rencana kontrol
        </div>
        <div class="title-desc q-mb-md">
          Daftar Rencana kontrol
        </div>
        <div v-if="!store.listRujukanRs.length">
          <app-loading v-if="store.loadingListRujukanRS" />
          <app-no-data v-else />
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
                @click="pilihRujukanPCare(list)"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="f-14 text-weight-bold q-mt-md">
          NO SEP Waktu MRS
        </div>
        <div class="title-desc q-mb-md">
          Daftar No SEP Waktu MRS
        </div>
        <div v-if="!store.listRujukanSepMrs.length">
          <app-loading v-if="store.loadingListRujukanMrs" />
          <app-no-data v-else />
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
      <q-separator />
    </q-card>
  </q-dialog>
</template>
<script setup>
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'

const store = useRegistrasiPasienBPJSStore()
// pilih rujukan p care
function pilihRujukanPCare(val) {
  console.log('karcis', store.jenisKarcises)
  console.log('rujukan p care', val, store.polis)

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

  store.tampilRujukan = false
}
// pilih rujukan p care
function pilihRujukanMrs(val) {
  console.log('rujukan Mrs', val)
  store.setForm('norujukan', val.rs8)
  store.tampilRujukan = false
}
</script>
