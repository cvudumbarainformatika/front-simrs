<template>
  <q-dialog>
    <q-card style="min-width:60vw;">
      <div
        class="bg-primary text-white"
      >
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
        v-if="store.loadingListRujukan || store.loadingListRujukanRS || store.loadingListRujukanMrs"
        style="height: 50vh;"
        class="scroll"
      >
        <app-loading />
      </q-card-section>
      <!-- <q-card-section v-else>
        <div
          class="text-h6 text-uppercase"
        >
          List Rujukan {{ tab }}
        </div>
      </q-card-section>
      <q-separator /> -->
      <div
        v-else
      >
        <q-tabs
          v-model="tab"
          class=""
          align="left"
          active-class="bg-dark text-white"
          dense
        >
          <q-tab
            label="Rujukan PCare"
            name="pcare"
            class="text-primary"
          />
          <q-tab
            label="Rujukan RS"
            name="rs"
            class="text-orange"
          />
          <q-tab
            label="POST MRS"
            name="mrs"
            class="text-accent"
          />
        </q-tabs>
        <q-separator />

        <q-tab-panels
          v-model="tab"
          animated
        >
          <q-tab-panel
            name="pcare"
            style="padding: 0;"
          >
            <div v-if="!store.listRujukanPcare.length">
              <app-no-data-small
                style="height: 46vh;"
              />
            </div>
            <div
              v-else
              style="height: 50vh;"
              class="scroll"
            >
              <q-list separator>
                <q-item
                  v-for="(list,i) in store.listRujukanPcare"
                  :key="i"
                  v-ripple
                  clickable
                  class="q-py-md"
                >
                  <q-item-section avatar>
                    <q-avatar
                      color="primary"
                      text-color="white"
                      size="md"
                    >
                      <div class="f-12">
                        {{ i+1 }}
                      </div>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>tanggal : <span class="text-weight-bold text-primary">{{ dateFullFormat(list.tglKunjungan) }}</span></q-item-label>
                    <q-item-label>No. Kunjungan : <span class="text-weight-bold text-teal">{{ list.noKunjungan }}</span></q-item-label>
                    <q-item-label>Jns Peserta : <span class="text-weight-bold text-negative">{{ list.peserta.jenisPeserta.keterangan }}</span></q-item-label>
                    <q-item-label>Poli Tujuan : <span class="text-weight-bold text-accent">{{ list.poliRujukan?list.poliRujukan.nama:'-' }}</span></q-item-label>
                    <q-item-label>Asal Rujukan : <span class="text-weight-bold text-teal">{{ list.provPerujuk?list.provPerujuk.nama:'-' }}</span></q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                  >
                    <q-btn
                      dense
                      no-caps
                      color="primary"
                      size="sm"
                      padding="sm"
                      flat
                      @click="pilihRujukanPCare(list)"
                    >
                      <div class="text-weight-bold">
                        Pilih Rujukan
                      </div>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </div>
          </q-tab-panel>

          <q-tab-panel
            name="rs"
            style="padding: 0;"
          >
            <div v-if="!store.listRujukanRs.length">
              <app-no-data-small
                style="height: 46vh;"
              />
            </div>
            <div
              v-else
              style="height: 50vh;"
              class="scroll"
            >
              <q-list separator>
                <q-item
                  v-for="(list,i) in store.listRujukanRs"
                  :key="i"
                  v-ripple
                  clickable
                >
                  <q-item-section avatar>
                    <q-avatar
                      color="orange"
                      text-color="white"
                      size="md"
                    >
                      <div class="f-12">
                        {{ i+1 }}
                      </div>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>tanggal : <span class="text-weight-bold text-primary">{{ dateFullFormat(list.tglKunjungan) }}</span></q-item-label>
                    <q-item-label>No. Kunjungan : <span class="text-weight-bold text-teal">{{ list.noKunjungan }}</span></q-item-label>
                    <!-- <q-item-label>Poli Tujuan : <span class="text-weight-bold text-teal">{{ list.poliRujukan?list.poliRujukan.nama:'-' }}</span></q-item-label> -->
                    <q-item-label>Jns Peserta : <span class="text-weight-bold text-negative">{{ list.peserta.jenisPeserta.keterangan }}</span></q-item-label>
                    <q-item-label>Poli Tujuan : <span class="text-weight-bold text-accent">{{ list.poliRujukan?list.poliRujukan.nama:'-' }}</span></q-item-label>
                    <q-item-label>Asal Rujukan : <span class="text-weight-bold text-teal">{{ list.provPerujuk?list.provPerujuk.nama:'-' }}</span></q-item-label>
                    <!-- <q-item-label>Asal Rujukan : <span class="text-weight-bold text-teal">{{ list.provPerujuk?list.provPerujuk.nama:'-' }}</span></q-item-label> -->
                  </q-item-section>

                  <q-item-section
                    side
                  >
                    <q-btn
                      dense
                      no-caps
                      color="orange"
                      size="sm"
                      padding="sm"
                      flat
                      @click="pilihRujukanRS(list)"
                    >
                      <div class="text-weight-bold">
                        Pilih Rujukan
                      </div>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </div>
          </q-tab-panel>

          <q-tab-panel
            name="mrs"
            style="padding: 0;"
          >
            <div v-if="!store.listRujukanSepMrs.length">
              <app-no-data-small
                style="height: 46vh;"
              />
            </div>
            <div
              v-else
              style="height: 50vh;"
              class="scroll"
            >
              <q-list separator>
                <q-item
                  v-for="(list,i) in store.listRujukanSepMrs"
                  :key="i"
                  v-ripple
                  clickable
                >
                  <q-item-section avatar>
                    <q-avatar
                      color="accent"
                      text-color="white"
                      size="md"
                    >
                      <div class="f-12">
                        {{ i+1 }}
                      </div>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>tanggal : <span class="text-weight-bold text-primary">{{ dateFullFormat(list.rs6) }}</span></q-item-label>
                    <q-item-label>No. Kunjungan : <span class="text-weight-bold text-teal">{{ list.rs8 }}</span></q-item-label>
                    <q-item-label>Asal Rujukan : <span class="text-weight-bold text-negative">{{ list.rs17 }}</span></q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                  >
                    <q-btn
                      dense
                      no-caps
                      color="accent"
                      size="sm"
                      padding="sm"
                      flat
                      @click="pilihRujukanMrs(list)"
                    >
                      <div class="text-weight-bold">
                        Pilih Rujukan
                      </div>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <!-- <q-card-section
        style="max-height: 80vh; padding:0"
        horizontal
        class="scroll"
      >
        <q-card-section
          class="col-6 scroll"
          style="max-height: 80vh; padding:0"
        >
          <div v-if="!store.listRujukanPcare.length">
            <app-loading v-if="store.loadingListRujukan" />
            <app-no-data-small
              v-else
              style="height: 40vh;"
            />
          </div>
          <div v-else>
            <q-list separator>
              <q-item-section class="q-pa-md">
                <q-item-label
                  overline
                  class="text-dark text-weight-bold"
                >
                  LIST RUJUKAN PCARE
                </q-item-label>
              </q-item-section>
              <q-separator />
              <q-item
                v-for="(list,i) in store.listRujukanPcare"
                :key="i"
              >
                <q-item-section>
                  <q-item-label>tanggal : <span class="text-weight-bold text-primary">{{ list.tglKunjungan }}</span></q-item-label>
                  <q-item-label>No. Kunjungan : <span class="text-weight-bold text-teal">{{ list.noKunjungan }}</span></q-item-label>
                </q-item-section>

                <q-item-section
                  side
                  top
                >
                  <q-btn
                    dense
                    label="Pilih Rujukan"
                    no-caps
                    outline
                    color="primary"
                    size="sm"
                    @click="pilihRujukanPCare(list)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section
          class="col-6 scroll"
          style="max-height: 80vh; padding:0"
        >
          <div v-if="!store.listRujukanRs.length">
            <app-loading v-if="store.loadingListRujukanRS" />
            <app-no-data-small
              v-else
              style="height: 40vh;"
            />
          </div>
          <div v-else>
            <q-list separator>
              <q-item-section class="q-pa-md">
                <q-item-label
                  overline
                  class="text-dark text-weight-bold"
                >
                  LIST RUJUKAN RS
                </q-item-label>
              </q-item-section>
              <q-separator />
              <q-item
                v-for="(list,i) in store.listRujukanRs"
                :key="i"
              >
                <q-item-section>
                  <q-item-label>tanggal : <span class="text-weight-bold text-primary">{{ list.tglKunjungan }}</span></q-item-label>
                  <q-item-label>No. Kunjungan : <span class="text-weight-bold text-teal">{{ list.noKunjungan }}</span></q-item-label>
                </q-item-section>

                <q-item-section
                  side
                  top
                >
                  <q-btn
                    dense
                    label="Pilih Rujukan"
                    no-caps
                    outline
                    color="primary"
                    size="sm"
                    @click="pilihRujukanRS(list)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card-section> -->
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
import { dateFullFormat } from 'src/modules/formatter'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'
import { ref } from 'vue'

const tab = ref('pcare')
const store = useRegistrasiPasienBPJSStore()
// pilih rujukan p care
const emits = defineEmits([
  'kodePoli',
  'jenisKunjungan'
])
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
    emits('kodePoli', store.polis[index].kodepoli)
    // store.setForm('kodepoli', store.polis[index].kodepoli)
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
  console.log('diag ', store.diagnosaAwals, val.diagnosa)
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
  store.setForm('namappkRujukan', val.provPerujuk.nama)
  store.setForm('tglrujukan', val.tglKunjungan)
  store.setForm('jnspelayanan', val.pelayanan.kode)
  store.display.tanggal.rujukan = date.formatDate(val.tglKunjungan, 'DD MMMM YYYY')

  store.setForm('flagprocedure', '')
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
  store.setForm('asalRujukan', '2')
  store.setForm('id_kunjungan', 4)
  store.setForm('jenis_kunjungan', 'Rujukan Antar RS')
  const idexKun = findWithAttr(store.jenisKunjungans, 'id', 4)
  store.display.jeniskunjungan = store.jenisKunjungans[idexKun].nilai
  emits('jenisKunjungan', store.jenisKunjungans[idexKun].nilai)
}
// eslint-disable-next-line no-unused-vars
function pilihRujukanPCare(val) {
  const param = {
    jenisrujukan: 1,
    norujukan: val.noKunjungan

  }
  store.getJumlahSep(param).then(resp => {
    console.log('jumlah sep p care', resp)
    // store.jumlahSEP = parseInt(resp.jumlahSEP) >= 0 ? parseInt(resp.jumlahSEP) : 0
  })
  pilihRujukan(val)
  store.setForm('asalRujukan', '1')
  store.setForm('id_kunjungan', 1)
  store.setForm('jenis_kunjungan', 'Rujukan FKTP')
  const idexKun = findWithAttr(store.jenisKunjungans, 'id', 1)
  store.display.jeniskunjungan = store.jenisKunjungans[idexKun].nilai
  emits('jenisKunjungan', store.jenisKunjungans[idexKun].nilai)
}
// pilih rujukan mrs
function pilihRujukanMrs(val) {
  store.setForm('asalRujukan', '1')
  console.log('rujukan Mrs', val)
  store.setForm('norujukan', val.rs8)
  store.tampilRujukan = false
}
</script>
