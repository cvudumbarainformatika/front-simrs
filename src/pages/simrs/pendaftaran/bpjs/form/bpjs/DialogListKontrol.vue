<template>
  <q-dialog>
    <q-card style="min-width:75vw;">
      <!--
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Rekom DPJP
        </div>
        <div class="title-desc q-mb-md">
          Daftar Rekom DPJP
        </div>
        <div v-if="!store.listSuratKontrols.length">
          <app-loading v-if="store.loadingSuratKontrol" />
          <app-no-data-small v-else />
        </div>
        <div v-if="store.listSuratKontrols.length">
          <div class="row no-wrap justify-center items-center q-col-gutter-sm text-weight-bold q-mb-sm">
            <div class="col-1">
              <div class="row q-col-gutter-sm">
                <div class="col-3">
                  No
                </div>
                <div class="col-9">
                  No Surat Kontrol
                </div>
              </div>
            </div>
            <div class="col-2">
              No. Reg
            </div>
            <div class="col-2">
              Tgl Kunjungan
            </div>
            <div class="col-2">
              Poli Asal
            </div>
            <div class="col-2">
              Tgl Kontrol
            </div>
            <div class="col-2">
              Masa Aktif
            </div>
            <div class="col-1">
              aksi
            </div>
          </div>
          <div
            v-for="(list,i) in store.listSuratKontrols"
            :key="i"
            class="row no-wrap justify-center items-center q-col-gutter-sm q-mb-xs"
          >
            <div class="col-1">
              <div class="row q-col-gutter-sm">
                <div class="col-3">
                  {{ i+1 }}
                </div>
                <div class="col-9">
                  {{ list.noDpjp?list.noDpjp:'-' }}
                </div>
              </div>
            </div>
            <div class="col-2">
              {{ list.noreg }}
            </div>
            <div class="col-2">
              {{ list.relkunjunganpoli?dateFullFormat(list.relkunjunganpoli.rs3):(list.relkunjunganranap?dateFullFormat(list.relkunjunganranap.rs3):'-') }}
            </div>
            <div class="col-2">
              {{ list.relkunjunganpoli?(list.relkunjunganpoli.relmpoli?list.relkunjunganpoli.relmpoli.rs2:'-'):(list.relkunjunganranap.ruangan?list.relkunjunganranap.ruangan.rs2:'-') }}
            </div>
            <div class="col-2">
              {{ list.tglKontrol?dateFullFormat(list.tglKontrol):'-' }}
            </div>
            <div class="col-2">
              {{ list.tglMasaAktif?dateFullFormat(list.tglMasaAktif):'-' }}
            </div>
            <div class="col-1">
              <app-btn
                label="pilih"
                @click="pilihSuratKontrol(list)"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      -->

      <q-separator />

      <q-card-section>
        <div class="f-14 text-weight-bold q-mt-md">
          Surat kontrol
        </div>
        <div class="title-desc q-mb-md">
          Daftar Surat kontrol
        </div>
        <div v-if="!store.listRencanaKontrols.length">
          <app-loading v-if="store.loadingRencanaKontrol" />
          <app-no-data-small v-else />
        </div>
        <div v-if="store.listRencanaKontrols.length">
          <div class="row no-wrap justify-center items-center q-col-gutter-sm text-weight-bold q-mb-sm">
            <div class="col-1">
              No
            </div>
            <div class="col-2">
              No Surat Kontrol
            </div>
            <div class="col-1">
              Dokter
            </div>
            <div class="col-2">
              Tgl Rencana Kontrol
            </div>
            <div class="col-1">
              Tgl Terbit
            </div>
            <div class="col-2">
              Poli Tujuan
            </div>
            <div class="col-2">
              Jenis Kontrol
            </div>
            <div class="col-1">
              aksi
            </div>
          </div>
          <div
            v-for="(list,i) in store.listRencanaKontrols"
            :key="i"
            class="row no-wrap justify-center items-center q-col-gutter-sm q-mb-xs"
          >
            <div class="col-1">
              {{ i+1 }}
            </div>
            <div class="col-2">
              {{ list.noSuratKontrol?list.noSuratKontrol:'-' }}
            </div>
            <div class="col-1">
              {{ list.namaDokter }}
            </div>
            <div class="col-2">
              {{ list.tglRencanaKontrol?dateFullFormat(list.tglRencanaKontrol):'-' }}
            </div>
            <div class="col-1">
              {{ list.tglTerbitKontrol?dateFullFormat(list.tglTerbitKontrol):'-' }}
            </div>
            <div class="col-2">
              {{ list.namaPoliTujuan?list.namaPoliTujuan:'-' }}
            </div>
            <div class="col-2">
              {{ list.namaJnsKontrol?list.namaJnsKontrol:'-' }}
            </div>
            <div class="col-1">
              <app-btn
                label="pilih"
                @click="pilihRencanaKontrol(list)"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-separator />
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { findWithAttr } from 'src/modules/utils'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'

const store = useRegistrasiPasienBPJSStore()
const emits = defineEmits(['kodePoli'])
// surat kontrol

// function pilihSuratKontrol(val) {
//   const findpoli = val.relkunjunganpoli ? (val.relkunjunganpoli.relmpoli ? val.relkunjunganpoli.relmpoli.rs1 : val.relkunjunganpoli.rs8) : ''
//   const indPoli = findpoli !== '' ? findWithAttr(store.polis, 'kodepoli', findpoli) : -1
//   const poli = indPoli >= 0 ? store.polis[indPoli] : false

//   // const findruangan = val.relkunjunganranap ? (val.relkunjunganranap.ruangan ? val.relkunjunganranap.ruangan.rs1 : val.relkunjunganranap.rs5) : ''
//   // const indRuangan = findruangan !== '' ? findWithAttr(store.polis, 'kodepoli', findpoli) : -1
//   // const ruangan = indRuangan >= 0 ? store.polis[indRuangan] : false

//   let datapoli = {}
//   if (indPoli < 0) {
//     if (!poli) {
//       if (val.relkunjunganpoli.relmpoli) {
//         datapoli = {
//           kodepoli: val.relkunjunganpoli.relmpoli.rs1,
//           polirs: val.relkunjunganpoli.relmpoli.rs2,
//           jenispoli: val.relkunjunganpoli.relmpoli.rs3,
//           jenisruangan: val.relkunjunganpoli.relmpoli.rs4,
//           statukeaktifan: val.relkunjunganpoli.relmpoli.rs5,
//           kodemapingbpjs: val.relkunjunganpoli.relmpoli.rs6,
//           polimapingbpjs: val.relkunjunganpoli.relmpoli.rs7
//         }
//         store.polis.push(datapoli)
//       }
//     }
//   }

//   if (poli || Object.keys(datapoli).length) emits('kodePoli', findpoli)
//   store.form.nosuratkontrol = val.noDpjp
//   store.tampilKontrol = false
//   // console.log(' surat kontrol ', val, store.polis)
//   // console.log(' find ', findpoli, findruangan)
//   // console.log(' index ', indPoli, indRuangan)
//   // console.log(' poli ', poli, ruangan)
// }

// rencana kontrol
function pilihRencanaKontrol(val) {
  store.form.nosuratkontrol = val.noSuratKontrol
  const findpoli = val.poliTujuan ? val.poliTujuan : ''
  const indPoli = findpoli !== '' ? findWithAttr(store.polis, 'kodemapingbpjs', findpoli) : -1
  const poli = indPoli >= 0 ? store.polis[indPoli] : false
  store.dpjpSuratKontrol = val.kodeDokter
  store.form.tglsep = val.tglSEP
  store.form.tglrujukan = val.tglTerbitKontrol

  const param = {
    search: val.noSuratKontrol
  }
  store.cekSuratKontrol(param)

  store.setForm('id_kunjungan', 3)
  store.setForm('jenis_kunjungan', 'Kontrol')
  const idexKun = findWithAttr(store.jenisKunjungans, 'id', 3)
  store.display.jeniskunjungan = store.jenisKunjungans[idexKun].nilai

  if (poli) emits('kodePoli', store.polis[indPoli].kodepoli)

  store.tampilKontrol = false
  console.log(' rencana kontrol ', val, poli, store.form)
}
</script>
