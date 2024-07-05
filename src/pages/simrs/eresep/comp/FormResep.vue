<template>
  <div class="bg-white full-height column">
    <div class="col-auto bg-primary text-white">
      <!-- <div class="q-pa-sm">
        <span>Form Resep Dokter</span> -->
      <!-- -> <span class="text-yellow-3 text-weight-bold">{{ depo === 'rjl' ? 'Depo Rawat Jalan' : 'Depo Rawat Inap' }}</span> -->
      <!-- </div> -->
      <div class="q-pa-sm row items-center justify-between">
        <div class="f-12" v-if="depo!=='rnp'">
          <sistem-bayar-ganti
            :pasien="pasien"
            :disabled="store.listPemintaanSementara.length > 0 || store.listRacikan.length > 0"
            :is-reset="isReset"
          />
          <!-- <div v-else>
            Form Resep Dokter
          </div> -->
        </div>
        <div>
          <q-btn
            flat
            dense
            size="md"
            icon="icon-mat-history"
            @click="historyOpen"
          >
            <q-tooltip class="bg-dark text-white">
              {{ tooltip }}
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="col full-height relative-position">
      <!-- Option tipe Resep -->
      <!-- <div class="row justify-between items-center">
        sistem bayar
      </div> -->
      <div class="row justify-between items-center q-px-xs q-py-xs">
        <div v-if="depo==='rjl'" class="q-px-xs">
          <div
            v-if="!store.listPemintaanSementara.length && !store.listRacikan.length "
            class="row q-my-xs items-center"
          >
            Tipe Resep:
            <q-option-group
              v-model="store.form.tiperesep"
              :options="store.tipeReseps"
              color="primary"
              class="q-ml-sm"
              dense
              inline
              @update:model-value="setTipe"
            />
          </div>
          <div
            v-else
            class="row q-my-xs items-center"
          >
            Tipe Resep: {{ store.form.tiperesep.charAt(0).toUpperCase() + store.form.tiperesep.slice(1) }}
          </div>
        </div>
        <div v-if="depo==='ok'">
          <!-- depo Ok -->
          <div>
            <q-btn
              push
              dense
              color="green"
              no-caps
              label="obat permintaan operasi"
              @click="openPersiapanOperasi"
            />
          </div>
        </div>
        <div v-if="store?.form?.tiperesep==='iter'">
          <!-- <app-input-date
            :model="store.form.iter_expired"
            label="Iter Berlaku Sampai"
            outlined
            @set-model="store.setForm('iter_expired',$event)"
          /> -->
          <app-input
            v-model="store.form.iter_jml"
            label="Jumlah Iter"
            outlined
            @update:model-value="setJumlahIter"
          />
        </div>
        <div v-else />
        <div class="flex items-center q-gutter-sm">
          <!-- <div>cari</div> -->
          <q-btn
            v-if="store.form?.groupsistembayarlain !== '2'"
            push
            dense
            color="dark"
            label="Cari Template"
            no-caps
            @click="emits('openCariTemplate')"
            class="q-px-md glossy"
          >
            <q-tooltip class="bg-white text-primary">
              Cari Template tersimpan
            </q-tooltip>
          </q-btn>
          <q-btn
            push
            dense
            color="deep-orange"
            label="Racikan"
            no-caps
            @click="racikan"
            class="q-px-sm"
          >
            <q-tooltip class="bg-white text-primary">
              Buka Racikan
            </q-tooltip>
          </q-btn>
        </div>
      </div>
      <q-scroll-area
        style="height: 100%; padding-bottom: 60px;"
      >
        <q-list
          separator
          bordered
        >
          <!-- Header nya -->
          <q-item
            class="bg-dark text-white"
          >
            <q-item-section style="width: 50%;">
              Input Obat
            </q-item-section>
          </q-item>
          <!-- Inputan -->
          <q-item>
            <q-item-section>
              <div class="row no-wrap items-center">
                <div class="col-11">
                  <div class="row  q-col-gutter-sm">
                    <div class="col-6">
                      <nyobak-select v-model="store.namaObat" />
                    </div>
                    <div class="col-3">
                      <q-input
                        ref="refQty"
                        v-model="store.form.jumlah_diminta"
                        label="Qty"
                        dense
                        :rules="[val=> parseFloat(val) >= 1 || '']"
                        lazy-rules
                        no-error-icon
                        hide-bottom-space
                        standout="bg-yellow-3"
                        outlined
                        @update:model-value="setJumlah"
                        @keyup.enter.stop="qtyEnter"
                        @focus="focusJumlah()"
                      />
                    </div>
                    <div class="col-3">
                      <!-- <q-select
                        ref="refSigna"
                        v-model="signa"
                        label="Aturan Pakai"
                        use-input
                        dense
                        clearable
                        standout="bg-yellow-3"
                        option-label="signa"
                        outlined
                        :rules="[sigaValid]"
                        lazy-rules
                        no-error-icon
                        hide-bottom-space
                        hide-dropdown-icon
                        :options="store.signas"
                        @new-value="signaCreateValue"
                        @update:model-value="signaSelected"
                        @keyup.enter.stop="signaEnter"
                      /> -->
                      <q-select
                        ref="refSigna"
                        v-model="signa"
                        label="Aturan Pakai"
                        use-input
                        fill-input
                        hide-selected
                        dense
                        clearable
                        standout="bg-yellow-3"
                        option-label="signa"

                        outlined
                        :rules="[sigaValid]"
                        lazy-rules
                        no-error-icon
                        hide-bottom-space
                        hide-dropdown-icon
                        @filter="store.getSigna"
                        :options="store.signas"
                        @new-value="signaCreateValue"
                        @update:model-value="signaSelected"
                        @keyup.enter.stop="signaEnter"
                      />
                    </div>
                    <div class="col-6">
                      <q-input
                        ref="refKonsumsi"
                        v-model="store.form.konsumsi"
                        label="Dikonsumsi selama (hari)"
                        dense
                        lazy-rules
                        no-error-icon
                        hide-bottom-space
                        standout="bg-yellow-3"
                        outlined
                      />
                    </div>
                    <div
                      class="col text-right"
                    >
                      <q-input
                        ref="refKet"
                        v-model="store.form.keterangan"
                        label="Keterangan"
                        dense
                        standout="bg-yellow-3"
                        outlined
                        class="full-width"
                        @keyup.enter="ketEnter"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-1 text-right">
                  <q-btn
                    color="dark"
                    dense
                    flat
                    icon="icon-mat-save"
                    :disable="store.loading || store.loadingkirim"
                    :loading="store.loading"
                    @click="simpanObat"
                  >
                    <q-tooltip class="bg-white text-primary">
                      Simpan Obat
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-item-section>
          </q-item>

          <!-- hasil Inputan -->
          <template v-if="store.listPemintaanSementara.length">
            <q-item
              v-for="(item, i) in store.listPemintaanSementara"
              :key="i"
            >
              <!-- {{ item }} -->
              <q-item-section style="width: 50%;">
                <div class="row">
                  {{ item?.mobat?.nama_obat }}
                </div>
                <div class="row text-italic f-10">
                  {{ item?.kdobat }}
                </div>
              </q-item-section>
              <q-item-section
                side
                style="width:50%"
              >
                <div class="row items-center q-col-gutter-sm full-width">
                  <div
                    class="text-right col-2"
                  >
                    {{ item?.jumlah }}
                  </div>
                  <div
                    class="col-2 text-right"
                  >
                    {{ item?.aturan }}
                  </div>
                  <div
                    class="col-3 text-right"
                  >
                    {{ formatDouble( item?.harga) }}
                  </div>
                  <div
                    class="col text-right"
                  >
                    {{ item?.keterangan }}
                  </div>
                  <div class="col-shrink text-right">
                    <q-btn
                      color="negative"
                      dense
                      flat
                      no-caps
                      size="xs"
                      icon="icon-mat-delete"
                      :disable="store.loading || store.loadingkirim"
                      :loading="store.loadingHapus && store.obatId === item.id && !store.namaRacikan"
                      @click="store.hapusObat(item)"
                    >
                      <q-tooltip class="bg-white text-primary">
                        Hapus
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </template>
          <!-- {{ store.listRacikan }} -->
          <template v-if="store.listRacikan.length">
            <q-expansion-item
              v-for="(item, i) in store.listRacikan"
              :key="i"
              dense-toggle
              class="bg-grey-4"
            >
              <template #header>
                <q-item-section style="width: 50%;">
                  <div class="row">
                    {{ item?.namaracikan }}
                  </div>
                </q-item-section>
                <q-item-section
                  side
                  style="width:50%"
                >
                  <div class="row items-center q-col-gutter-sm full-width">
                    <div
                      class="text-right col-1"
                    >
                      {{ item?.jenisracikan }}
                    </div>
                    <div
                      class="text-right col-2"
                    >
                      {{ item?.jumlahracikan }}
                    </div>
                    <div
                      class="col-2 text-right"
                    >
                      {{ item?.aturan }}
                    </div>
                    <div
                      class="col-3 text-right"
                    >
                      {{ formatDouble(item?.harga) }}
                    </div>
                    <div
                      class="col text-right"
                    >
                      {{ item?.keterangan }}
                    </div>
                    <div class="col-shrink text-right">
                      <q-btn
                        color="primary"
                        dense
                        flat
                        no-caps
                        icon="icon-mat-add_circle"
                        :disable="store.loading || store.loadingkirim"
                        @click="racikanTambah(item)"
                      >
                        <q-tooltip class="bg-white text-primary">
                          Tambah obat Racikan
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-item-section>
              </template>

              <div class="bg-white">
                <q-item
                  v-for="(obat, j) in item?.rincian"
                  :key="j"
                  style="padding:4px 16px;"
                >
                  <!-- {{ j }} {{ obat }} -->
                  <q-item-section style="width: 50%;">
                    <div class="row no-wrap">
                      <div
                        class="col-auto"
                        style="width: 5%;"
                      >
                        {{ j+1 }}
                      </div>
                      <div class="col-auto">
                        <div class="row">
                          {{ obat?.mobat?.nama_obat }}
                        </div>
                        <div class="row text-italic f-10">
                          {{ obat?.kdobat }}
                        </div>
                      </div>
                    </div>
                    <!-- <div class="row">
                      {{ obat?.mobat?.nama_obat }}
                    </div>
                    <div class="row text-italic f-10">
                      {{ obat?.kdobat }}
                    </div> -->
                  </q-item-section>
                  <q-item-section
                    side
                    style="width:45%"
                  >
                    <div class="row items-center q-col-gutter-sm full-width">
                      <div
                        class="text-right col-2"
                      >
                        {{ obat?.jumlah }}
                      </div>

                      <div
                        class="col text-right"
                      >
                        {{ obat?.keteranganx }}
                      </div>
                      <div class="col-shrink text-right">
                        <q-btn
                          color="negative"
                          dense
                          flat
                          no-caps
                          size="xs"
                          icon="icon-mat-delete"
                          :disable="store.loading || store.loadingkirim"
                          :loading="store.loadingHapus && store.obatId === obat.id && !!store.namaRacikan"
                          @click="store.hapusObat(obat)"
                        >
                          <q-tooltip class="bg-white text-primary">
                            Hapus
                          </q-tooltip>
                        </q-btn>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>
          </template>
        </q-list>
        <div
          class="q-mt-lg"
        />
      </q-scroll-area>
      <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        <div class="q-gutter-sm">
          <div v-if="store.form?.groupsistembayarlain !== '2'">
            <q-btn
              v-if="depo !== 'ok'"
              color="teal"
              @click="emits('openTemplate')"
            >
              Buat Template
            </q-btn>
          </div>
        </div>
        <div>
          <q-btn
            color="primary"
            :loading="store.loadingkirim"
            :disable="store.loadingkirim"
            @click="selesaiResep"
          >
            Kirim Resep
          </q-btn>
        </div>
      </div>
    </div>
  </div>

  <!-- racikan -->
  <app-fullscreen-blue
    v-model="store.racikanOpen"
    title="Input Obat Racikan"
    @hide="resetFormRacik"
  >
    <template #default>
      <racikanpage />
    </template>
  </app-fullscreen-blue>

  <!-- Permintaan Operasi OK -->
  <app-fullscreen-blue
    v-model="permintaan.isOpen"
    title="Copy Resep Obat Persiapan Operasi"
  >
    <template #default>
      <persiapan />
    </template>
  </app-fullscreen-blue>

  <q-dialog
    v-model="signaNewVal"
    @show="getFocus"
    @hide="lostFocus"
  >
    <q-card
      flat
      style="min-width:50vw;"
    >
      <q-bar class="bg-primary text-white">
        <div class="f-12">
          Lengkapi data Signa
        </div>
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
          @click="lostFocus"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <span class="text-weight-bold f-12">Masukkan jumlah konsumsi per hari berdasarkan aturan signa</span>
      </q-card-section>
      <q-card-section>
        <q-input
          ref="refJmlHarSig"
          v-model="store.fromSigna.jumlah"
          label="Jumlah konsumsi per hari"
          outlined
          standout="bg-yellow-3"
          dense
          @keyup.enter.stop="simpan"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Simpan"
          flat
          color="primary"
          :loading="store.loadingSaveSigna"
          :disable="store.loadingSaveSigna"
          @click="simpan"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref, shallowRef, watchEffect } from 'vue'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'
import { formatDouble } from 'src/modules/formatter'
import { notifCenterVue, notifErrVue } from 'src/modules/utils'
import { Dialog, date } from 'quasar'

const emits = defineEmits(['openHistory', 'openTemplate', 'openCariTemplate'])

const NyobakSelect = defineAsyncComponent(() => import('./NyobakSelect.vue'))
const SistemBayarGanti = defineAsyncComponent(() => import('./compFormResep/SistemBayarGanti.vue'))

const props = defineProps({
  pasien: { type: Object, default: null },
  depo: { type: String, default: '' },
  tooltip: {
    type: String,
    default: 'History EResep'
  }
})
const store = usePermintaanEResepStore()
const permintaan = useResepPermintaanOperasiStore()

// const refObat = ref(null)
const refQty = ref(null)
const refSigna = ref(null)
const refKet = ref(null)

const isReset = ref(false)

function focusJumlah () {
  console.log('focus hy')
  refQty.value.select()
}
function setTipe (val) {
  console.log('tipe resep', val)
  store.cariObat('')
}
function setJumlahIter (val) {
  const kali = parseInt(val)
  if (!kali) return
  const sekarang = Date.now()
  const exp = date.addToDate(sekarang, { month: kali })
  const endOm = new Date(exp.getFullYear(), exp.getMonth() + 1, 0)
  const hari = endOm.getDate()
  const expJadi = date.formatDate(endOm, 'YYYY-MM-') + hari
  console.log('val', expJadi)
  store.setForm('iter_expired', expJadi)
}
function setPasien () {
  const val = props?.pasien
  console.log('setPasien', val, props?.depo)
  if (!val) return
  const temp = val?.diagnosa?.map(x => x?.rs3 + ' - ' + x?.masterdiagnosa?.rs4)
  const diag = temp?.length ? temp.join(', ') : '-'

  store.setForm('noreg', val?.noreg)
  store.setForm('norm', val?.norm)
  store.setForm('groupsistembayar', val?.groups)
  store.setForm('sistembayar', val?.kodesistembayar ?? val?.kdsistembayar)
  store.setForm('dokter', val?.kodedokter)
  store.setForm('diagnosa', diag ?? '-')
  store.cariSimulasi(val?.noreg)
  if (props?.depo === 'rjl') store.getBillRajal(val)
  if (props?.depo === 'rnp') store.getBillRanap(val)
  if (props?.depo === 'igd') store.getBillIgd(val)
  if (props?.depo === 'ok') store.getBillOk(val)
  // store.getBillRajal(val)

  if (!!store?.noresep && store?.noresep !== 'BARU') {
    const resep = props?.pasien?.newapotekrajal?.find(val => val.noresep === store?.noresep)
    if (resep) {
      if (resep?.flag === '') {
        store.listPemintaanSementara = []
        store.setForm('noresep', resep?.noresep ?? '-')
        store.setForm('tiperesep', resep?.tiperesep ?? 'normal')
        if (resep?.permintaanresep?.length) store.setListArray(resep?.permintaanresep)
        if (resep?.permintaanracikan?.length) store.setListRacikanArray(resep?.permintaanracikan)

        // store.listPemintaanSementara = resep?.permintaanresep ?? []
        // store.listRacikan = resep?.permintaanracikan ?? []
      }
      else if (resep) {
        if (resep?.flag !== '') store.setListResep(resep)
      }
    }
  }
  store.setNoreseps(props?.pasien?.newapotekrajal)
  // console.log('form nya', store.form)
  if (store?.noresep === 'BARU') {
    store.listRacikan = []
    store.listPemintaanSementara = []
  }
  console.log('pasien obat', props?.pasien?.newapotekrajal)
}
/// / set Racikan ------
const racikanpage = shallowRef(defineAsyncComponent(() => import('./RacikanPage.vue')))
function racikan () {
  // console.log('ok')
  // alert('oooi')
  store.racikanOpen = true
  store.racikanTambah = false
  store.setForm('namaracikan', '')
  store.setForm('jumlahdibutuhkan', 1)
  store.setForm('keterangan', '-')
  store.tipeRacikan = [
    { label: 'DTD', value: 'DTD', disable: false },
    { label: 'non-DTD', value: 'non-DTD', disable: false }
  ]
  // store.tipeRacikan = []
}
function racikanTambah (val) {
  // console.log('ok', val)
  if (!store?.signas?.length) return notifCenterVue('mohon tunggu sebentar, masih menunggu data Signa dari server')
  // alert('oooi')
  store.racikanOpen = true
  store.racikanTambah = true
  store.setForm('namaracikan', val?.namaracikan)
  store.setForm('aturan', val?.aturan)
  store.setForm('konsumsi', val?.konsumsi)
  store.setForm('jumlahdibutuhkan', val?.jumlahracikan)
  store.setForm('tiperacikan', val?.tiperacikan)
  store.setForm('keterangan', val?.keterangan)
  store.setForm('satuan_racik', val?.satuan_racik)

  store.tipeRacikan = [
    { label: 'DTD', value: 'DTD', disable: true },
    { label: 'non-DTD', value: 'non-DTD', disable: true }
  ]
}
function resetFormRacik () {
  store.setForm('jenisresep', '')
  store.resetForm()
}
/// / set Racikan end ------
// perispan Operasi -----
const persiapan = shallowRef(defineAsyncComponent(() => import('./PersiapanOperasi.vue')))
function openPersiapanOperasi () {
  permintaan.isOpen = true
  permintaan.setPasien(props.pasien)
  // console.log('props pasien', props.pasien)
}
// perispan Operasi end -----
// function myDebounce (func, timeout = 500) {
//   let timer
//   return (...arg) => {
//     clearTimeout(timer)
//     timer = setTimeout(() => { func.apply(this, arg) }, timeout)
//   }
// }
// const inputObat = myDebounce((val) => {
//   refObat.value.showPopup()
//   // console.log('input obat', val, typeof val)
//   if ((typeof val) !== 'string') val = ''
//   if (val !== '') store.cariObat(val)
//   if (val === '' && store.nonFilteredObat.length) store.Obats = store.nonFilteredObat
// })
// function inputObat(val) {
//   if (val !== '') store.cariObat(val)
//   if (val === '' && store.nonFilteredObat.length) store.Obats = store.nonFilteredObat
// }
// function obatSelected (val) {
//   console.log('select obat', val)
//   if (val?.alokasi <= 0) {
//     store.namaObat = null
//     return notifErrVue('Stok Alokasi sudah habis, silahkan pilih obat yang lain')
//   }
//   refObat.value.validate()
//   // console.log('obat selected', val)
//   store.setForm('satuan_kcl', val?.satuankecil ?? '-')
//   store.setForm('kodeobat', val?.kdobat ?? '-')
//   store.setForm('kandungan', val?.kandungan ?? '-')
//   store.setForm('fornas', val?.fornas ?? '-')
//   store.setForm('forkit', val?.forkit ?? '-')
//   store.setForm('generik', val?.generik ?? '-')
//   store.setForm('kode108', val?.kode108 ?? '-')
//   store.setForm('uraian108', val?.uraian108 ?? '-')
//   store.setForm('kode50', val?.kode50 ?? '-')
//   store.setForm('uraian50', val?.uraian50 ?? '-')
//   store.setForm('stokalokasi', val?.alokasi ?? '-')
//   store.setForm('kodedepo', store.dpPar)
// }

// function obatEnter () {
//   refQty.value.focus()
//   refQty.value.select()
// }
// signa
const signa = ref('')
const refJmlHarSig = ref(null)
const signaNewVal = ref(false)
function signaSelected (val) {
  // console.log('signa', val)
  store.setForm('aturan', val?.signa)
  // const sign = store.signas.filter(sig => sig.signa === val?.signa)
  // if (sign.length) {
  store.setForm('jumlahdosis', parseFloat(val?.jumlah))
  if (parseFloat(store.form.jumlah_diminta) > 0) {
    const kons = store.form.jumlah_diminta / parseFloat(val?.jumlah)
    store.setForm('konsumsi', kons)
  }
  refSigna.value.validate()
  // }
}
function signaCreateValue (val, done) {
  signaNewVal.value = true
  let newSigna = ''
  if (val.includes('x')) {
    const anu = val.split('x')
    // console.log('anu', anu)
    if (anu?.length) {
      const satu = anu[0]
      const temp = anu[1].slice(0, 4).split('')
      const num = temp.filter(a => !isNaN(parseFloat(a)))
      store.fromSigna.jumlah = satu * num[0] ?? 1
      // console.log('temp', temp, num, isNaN(parseFloat(temp[0])))
      const depan = anu[0] + ' x ' + anu[1]
      if (anu?.length === 2) {
        newSigna = depan
      }
      else {
        const temp = anu
        const belakang = temp.slice(2).join(' x ')
        // console.log('dep', temp, '--->', depan, ' -- ', belakang)
        newSigna = depan + belakang
      }
    }
  }
  else newSigna = val
  store.fromSigna.signa = newSigna
  done(store.fromSigna)

  // console.log('signa new val', signa.value)
}
function getFocus () {
  refJmlHarSig.value?.focus()
  refJmlHarSig.value?.select()
}
function lostFocus () {
  signaNewVal.value = false
}
function simpan () {
  store.seveSigna().then((resp) => {
    signaNewVal.value = false
    signaSelected(resp.data)
    refKet.value.focus()
    refKet.value.select()
  })
}
function signaEnter () {
  if (!signaNewVal.value) {
    refKet.value.focus()
    refKet.value.select()
    // console.log('signa enter')
  }
}
// jumlah
function setJumlah (val) {
  let jumlah = parseFloat(val)
  console.log('jumlah', jumlah)
  console.log('alokasi', store.form.stokalokasi)
  if (jumlah > parseFloat(store.form.stokalokasi)) {
    jumlah = parseFloat(store.form.stokalokasi)
    store.setForm('jumlah_diminta', jumlah)
    notifErrVue('jumlah tidak boleh melebihi jumlah alokasi')
  }
  if (Object.keys(signa.value)?.length) {
    if (parseFloat(jumlah) > 0) {
      const kons = jumlah / parseFloat(signa.value?.jumlah)
      store.setForm('konsumsi', kons)
    }
  }
  else if (store.form?.aturan !== '') {
    const sign = store.signas.filter(sig => sig.signa === store?.form?.aturan)
    if (sign.length) {
      if (parseFloat(jumlah) > 0) {
        const kons = jumlah / parseFloat(signa.value?.jumlah)
        store.setForm('konsumsi', kons)
      }
    }
  }
}
// eslint-disable-next-line no-unused-vars
function qtyEnter () {
  // if (parseFloat(store.form.jumlah_diminta) > 1)
  refSigna.value.focus()
  refSigna.value.showPopup()
}
// function obatValid (val) {
//   return (val !== null && val !== '') || ''
// }
function sigaValid (val) {
  return (val !== null && val !== '') || ''
}
function validate () {
  if (store?.form?.kodeobat !== '') {
    const ob = store?.nonFilteredObat?.filter(o => o?.kodeobat === store?.form?.kodeobat)
    // if (ob.length && !Object.keys(store?.namaObat)?.length) store.namaObat = ob[0]
    if (ob.length) store.namaObat = ob[0]
    // console.log('non', store.nonFilteredObat)
  }
  if (store?.form?.aturan !== '') {
    const sign = store?.signas?.filter(sig => sig?.signa === store?.form?.aturan)
    // console.log('sign', sign)
    // console.log('sign', signa.value)
    // if (sign.length && !Object.keys(signa.value)?.length) signa.value = sign[0]
    if (sign.length) signa.value = sign[0]
    // console.log('at', store.signas, sign)
  }
  if (store?.form?.tiperesep === 'iter' && store?.dpPar === 'Gd-05010101') {
    if (store.form.iter_jml === '' || !store.form.iter_jml) {
      notifErrVue('Jumlah Iter belum di isi')
      return false
    }
  }

  if (refQty.value.validate() && refSigna.value.validate()) return true
  else return false
}
function ketEnter () {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakah Akan dilanjutkan untuk di simpan?',
    ok: {
      push: true,
      label: 'Simpan',
      color: 'primary',
      'no-caps': true
    },
    cancel: {
      push: true,
      label: 'Batal',
      color: 'dark',
      'no-caps': true
    }
  })
    .onOk(() => {
      simpanObat()
    })
}
function simpanObat () {
  console.log('simpan obat', store.form)
  if (validate()) {
    const form = store.form
    store.simpanObat(form)?.then(() => {
      signa.value = null
      // refObat.value.focus()
      // refObat.value.showPopup()
      // refObat.value.showPopup()
    })
  }
}

function selesaiResep () {
  store.selesaiResep()
  isReset.value = true
  setTimeout(() => {
    isReset.value = false
  }, 100)
}

// add history eresep
function historyOpen () {
  emits('openHistory')
  // store.getHistory(props.pasien?.norm)
}

// ==================================================================================khusus SISITEM BAYAR

// function onChangeSistemBayar () {
//   console.log('ok')
// }

onMounted(() => {
  // console.log('depo', props?.depo, props.pasien)
  // console.log('ref Obat', refObat.value)
  // refObat.value.showPopup()
  store.getSigna()
  store.cariObat()
  // refObat.value.focus()
  // refObat.value.showPopup()
})
watchEffect(() => {
  store.pasien = props?.pasien
  store.depo = props?.depo
  setPasien()
  // console.log('pasi', props.pasien)
})

</script>
<style scoped>
.line-through{
  text-decoration: line-through
}
</style>
