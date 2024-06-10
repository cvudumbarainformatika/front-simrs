<template>
  <div
    class="bg-white column"
    style="height:90vh"
  >
    <!-- <div class="col-auto bg-primary text-white">
      <div class="q-pa-sm f-16">
        Input Obat Racikan
      </div>
    </div> -->
    <div class="col full-height relative-position">
      <q-scroll-area
        style="height: calc( 100% ); padding-bottom: 60px;"
      >
        <q-list
          separator
          bordered
        >
          <!-- Header nya Racikan -->
          <q-item
            class="bg-dark text-white"
          >
            <q-item-section style="width: 20%;">
              NAMA RACIKAN
            </q-item-section>
            <q-item-section
              side
              style="width:80%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class=" col-2"
                >
                  Tipe Racikan
                </div>
                <div
                  class="text-center col-2"
                >
                  Jumlah
                </div>
                <div
                  class="text-center col-2"
                >
                  Satuan (Bungkus/Kapsul/pot)
                </div>

                <div
                  class="col-2 "
                >
                  Atr Pakai
                </div>
                <div
                  class="col text-right"
                >
                  Keterangan
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- input nama Racikan -->
          <q-item
            class="q-my-sm"
          >
            <q-item-section style="width: 20%;">
              <app-input
                v-model="store.form.namaracikan"
                label="Nama Racikan"
                outlined
                readonly
              />
            </q-item-section>
            <q-item-section
              side
              style="width:80%"
            >
              <div class="row items-center q-col-gutter-sm full-width">
                <div
                  class="col-2"
                >
                  <!-- {{ store.tipeRacikan }} -->
                  <q-option-group
                    v-model="store.form.tiperacikan"
                    :options="store.tipeRacikan "
                    color="primary"
                    class="q-ml-sm"
                    dense
                    inline
                  />
                  <!-- <div class="row q-my-xs items-center">
                  </div> -->
                </div>
                <div
                  class="text-right col-2"
                >
                  <q-input
                    ref="refJmlButuh"
                    v-model="store.form.jumlahdibutuhkan"
                    label="Jumlah Racikan"
                    standout="bg-yellow-3"
                    dense
                    outlined
                    @update:model-value="setDosis($event,'jumlahdibutuhkan')"
                    @keyup.enter.stop="enterJmlButuh"
                    @focus="focusJmlButuh"
                  />
                </div>

                <div
                  class="col-2 text-right"
                >
                  <q-select
                    ref="refSat"
                    v-model="store.form.satuan_racik"
                    label="Satuan Racikan"
                    use-input
                    dense
                    clearable
                    standout="bg-yellow-3"
                    outlined
                    :rules="[satValid]"
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    hide-dropdown-icon
                    :options="store.satuanRaciks"
                    @keyup.enter.stop="enterSat"
                  />
                </div>
                <div
                  class="col-2 text-right"
                >
                  <q-select
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
                    @keyup.enter.stop="enterSigna"
                  />
                </div>
                <div
                  class="col text-right"
                >
                  <q-input
                    ref="refKet"
                    v-model="store.form.keterangan"
                    label="Keterangan"
                    outlined
                    standout="bg-yellow-3"
                    dense
                    @keyup.enter.stop="enterKet"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
          <div class="q-mt-lg f-14 bg-yellow q-pa-sm">
            Bahan Obat Racikan
          </div>
          <!-- Header nya Obat DTD-->
          <q-item
            class="bg-dark text-white"
          >
            <q-item-section style="width: 30%;">
              OBAT
            </q-item-section>
            <q-item-section
              side
              style="width:70%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div

                  class="col-2"
                >
                  Satuan
                </div>
                <div
                  v-if="store.form.tiperacikan==='DTD'"
                  class="col-2"
                >
                  Dosis obat
                </div>
                <div
                  v-if="store.form.tiperacikan==='DTD'"
                  class="col-2"
                >
                  Dosis resep
                </div>

                <div
                  class="col-2"
                >
                  Jumlah
                </div>

                <div
                  class="col text-right"
                >
                  Keterangan
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- input nya Obat DTD-->
          <q-item
            class=""
          >
            <q-item-section style="width: 30%;">
              <!-- <q-select
                ref="refObat"
                v-model="store.namaObat"
                use-input
                label="Cari Obat"
                dense
                option-label="namaobat"
                option-value="kodeobat"
                standout="bg-yellow-3"
                outlined
                clearable
                input-debounce="800"
                class="full-width"
                hide-dropdown-icon
                :rules="[obatValid]"
                lazy-rules
                hide-bottom-space
                no-error-icon
                :options="store.Obats"
                @input-value="inputObat"
                @update:model-value="obatSelected"
                @keyup.enter.stop="enterObat"
              >
                <template #prepend>
                  <q-icon name="icon-mat-search" />
                </template>
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <div
                      v-if="scope.opt.namaobat"
                    >
                      {{ scope.opt.namaobat }}
                    </div>
                    <div
                      v-if="scope.opt.kandungan"
                      class="q-ml-xs q-mr-xs text-deep-orange"
                    >
                      ({{ scope.opt.kandungan }})
                    </div>
                    <div
                      v-if="scope.opt.kekuatandosis"
                      class="q-ml-xs q-mr-xs text-green"
                    >
                      ({{ scope.opt.kekuatandosis }})
                    </div>
                    <div
                      v-if="scope.opt.alokasi"
                      class="q-ml-xs text-weight-bold tetx-green"
                    >
                      {{ scope.opt.alokasi }}
                    </div>
                    <div
                      v-if="scope.opt.satuankecil"
                      class="q-ml-xs text-primary"
                    >
                      {{ scope.opt.satuankecil }}
                    </div>
                  </q-item>
                </template>
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select> -->
              <SelectRacikan v-model="store.namaObat" @tidak-bisa-simpan="noSimp" />
            </q-item-section>
            <q-item-section
              side
              style="width:70%"
            >
              <div class="text-dark row items-center q-col-gutter-sm full-width">
                <div
                  class="col-2"
                >
                  {{ store.namaObat?.satuankecil }}
                </div>
                <div
                  v-if="store.form.tiperacikan==='DTD'"
                  class="col-2"
                >
                  <q-input
                    ref="refDosis"
                    v-model="store.form.dosisobat"
                    label="Dosis Obat"
                    outlined
                    standout="bg-yellow-3"
                    dense
                    @update:model-value="setDosis($event,'dosisobat')"
                    @keyup.enter.stop="enterDosis"
                  />
                </div>
                <div
                  v-if="store.form.tiperacikan==='DTD'"
                  class="col-2"
                >
                  <q-input
                    ref="refDosisMax"
                    v-model="store.form.dosismaksimum"
                    label="Dosis resep"
                    outlined
                    standout="bg-yellow-3"
                    dense
                    @update:model-value="setDosis($event,'dosismaksimum')"
                    @keyup.enter.stop="enterDosisMax"
                  />
                </div>
                <div
                  v-if="store.form.tiperacikan!=='DTD'"
                  class="col-2"
                >
                  <q-input
                    ref="refJumlah"
                    v-model="store.form.jumlah"
                    label="Jumlah Obat"
                    outlined
                    standout="bg-yellow-3"
                    dense
                    @update:model-value="setDosis($event,'jumlah')"
                    @keyup.enter.stop="enterJumlah"
                  />
                </div>
                <div
                  v-if="store.form.tiperacikan==='DTD'"
                  class="col-2"
                >
                  {{ store.form.jumlah }}
                </div>

                <div
                  class="col text-right"
                >
                  <q-input
                    ref="refKetx"
                    v-model="store.form.keteranganx"
                    label="Keterangan Obat"
                    outlined
                    standout="bg-yellow-3"
                    dense
                    @keyup.enter.stop="enterKetx"
                  />
                </div>
                <div
                  class="col-shrink text-right"
                >
                  <q-btn
                    color="dark"
                    dense
                    flat
                    icon="icon-mat-save"
                    :disable="store.loading || tidakBisaSimpan"
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
          <!-- <q-item>
            <q-item-section />
            <q-item-section>
              <div class="text-right q-mr-sm">
                <q-btn
                  color="dark"
                  dense
                  no-caps
                  :loading="store.loading"
                  :disable="store.loading"
                  @click="simpanObat"
                >
                  Simpan Obat
                </q-btn>
              </div>
            </q-item-section>
          </q-item> -->
          <template v-if="store?.listRincianRacikan?.length">
            <!-- <q-expansion-item
              v-for="(item, i) in store.listRacikan"
              :key="i"
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
                      {{ item?.tiperacikan }}
                    </div>
                    <div
                      class=" col-2"
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
                  </div>
                </q-item-section>
              </template>
</q-expansion-item> -->
            <q-item
              v-for="(obat, j) in store?.listRincianRacikan"
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
              </q-item-section>
              <q-item-section
                side
                style="width:50%"
              >
                <div class="row items-center q-col-gutter-sm full-width">
                  <div
                    class=" col-4"
                  >
                    {{ obat?.jumlah }}
                  </div>
                  <div
                    class="text-right col-3"
                  >
                    {{ formatDouble(obat?.harga) }}
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
                      :loading="store.loadingHapus && store.obatId === obat.id"
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
          </template>
        </q-list>
      </q-scroll-area>
      <!-- <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        ada
      </div> -->
    </div>
  </div>

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
import { Dialog } from 'quasar'
import { formatDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { ref, onMounted, defineAsyncComponent } from 'vue'

// eslint-disable-next-line no-unused-vars
const store = usePermintaanEResepStore()
const tidakBisaSimpan = ref(false)
function noSimp (val) {
  // console.log('tidakBisaSimpan', val)
  tidakBisaSimpan.value = val
}
const SelectRacikan = defineAsyncComponent(() => import('./SelectRacikan.vue'))
onMounted(() => {
  store.namaObat = null
  // store.setForm('namaracikan', 'racikan-' + store.counterRacikan)
  store.setForm('kodeobat', '')
  store.setForm('keteranganx', '-')
  store.setForm('jenisresep', 'Racikan')
  store.setForm('jumlah', 1)
  store.setForm('dosisobat', 1)
  store.setForm('dosismaksimum', 1)
  if (!store.racikanTambah) {
    store.setForm('tiperacikan', 'DTD')
    store.setForm('jumlahdibutuhkan', 1)
    store.setForm('keterangan', '-')
    store.getNomor()
  }
  else {
    const sig = store.signas.filter(s => s.signa === store?.form?.aturan)
    if (sig?.length) signa.value = sig[0]
    enterKet()
  }
  const rac = store.listRacikan.find(x => x.namaracikan === store.form.namaracikan)
  store.listRincianRacikan = rac?.rincian ?? []
  console.log('rac', rac, store.listRincianRacikan)
  console.log('form', store.form)
})
// key up ---
// header
const refJmlButuh = ref(null)
const refSigna = ref(null)
const refKet = ref(null)
const refSat = ref(null)
// isi
const refObat = ref(null)
const refKetx = ref(null)
// dtd
const refDosis = ref(null)
const refDosisMax = ref(null)
// non dtd
const refJumlah = ref(null)

// ket enter
function focusJmlButuh () {
  refJmlButuh.value.select()
}
function enterJmlButuh () {
  refSat.value.focus()
  refSat.value.showPopup()
}
function enterSat () {
  refSigna.value.focus()
  refSigna.value.showPopup()
}
function enterSigna () {
  if (!signaNewVal.value) {
    refKet.value.focus()
    refKet.value.select()
  }
}
function enterKet () {
  refObat.value.focus()
  // refObat.value.showPopup()
}
// function enterObat () {
//   if (store.form.tiperacikan === 'DTD') {
//     refDosis.value.focus()
//     refDosis.value.select()
//   }
//   else {
//     refJumlah.value.focus()
//     refJumlah.value.select()
//   }
// }

function enterDosis () {
  refDosisMax.value.focus()
  refDosisMax.value.select()
}
function enterDosisMax () {
  refKetx.value.focus()
  refKetx.value.select()
}
function enterJumlah () {
  refKetx.value.focus()
  refKetx.value.select()
}
function enterKetx () {
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

// key up end---
function setDosis (evt, key) {
  console.log('alokasi', store.form.stokalokasi)
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))

  store.setForm(key, nilai)

  if (store.form.tiperacikan === 'DTD') {
  // jumlahdibutuhkan , jumlah, dosisobat, dosismaksimum
    const jumlahDiminta = store.form?.jumlahdibutuhkan ?? 1
    const dosisObat = store.form?.dosisobat ?? 1
    const dosisResep = store.form?.dosismaksimum ?? 1
    const jumlahObat = dosisResep / dosisObat * jumlahDiminta
    store.setForm('jumlah', jumlahObat)
  }
  if ((parseFloat(store.form.jumlah) > parseFloat(store.form.stokalokasi)) && store.form.kodeobat !== '') {
    tidakBisaSimpan.value = true
    notifErrVue('Stok Alokasi tidak mencukupi silahkan cari obat alternatif')
  }
  else {
    tidakBisaSimpan.value = false
  }
}
// function myDebounce (func, timeout = 800) {
//   let timer
//   return (...arg) => {
//     clearTimeout(timer)
//     timer = setTimeout(() => { func.apply(this, arg) }, timeout)
//   }
// }
// const inputObat = myDebounce((val) => {
//   if (val !== '') store.cariObat(val)
//   if (val === '' && store.nonFilteredObat.length) store.Obats = store.nonFilteredObat
// })
// function obatSelected (val) {
//   if (val?.alokasi <= 0) {
//     store.namaObat = null
//     return notifErrVue('Stok Alokasi sudah habis, silahkan pilih obat yang lain')
//   }
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
//   console.log('laokasi ', store.form.stokalokasi, ' jumlah ', store.form.jumlah)
//   if ((parseFloat(store.form.jumlah) > parseFloat(store.form.stokalokasi)) && store.form.kodeobat !== '') {
//     tidakBisaSimpan.value = true
//     notifErrVue('Stok Alokasi tidak mencukupi silahkan cari obat alternatif')
//   }
//   else {
//     tidakBisaSimpan.value = false
//   }
// }
// function obatValid (val) {
//   return (val !== null && val !== '') || ''
// }
// Signa

const signa = ref('')
const refJmlHarSig = ref(null)
const signaNewVal = ref(false)

function signaSelected (val) {
  store.setForm('aturan', val?.signa)
  store.setForm('jumlahdosis', parseFloat(val?.jumlah))
  if (parseFloat(store.form.jumlahdibutuhkan) > 0) {
    const kons = store.form.jumlahdibutuhkan / parseFloat(val?.jumlah)
    store.setForm('konsumsi', kons)
  }
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

  console.log('signa new val', signa.value)
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
    signaSelected(resp.signa)
    refKet.value.focus()
    refKet.value.select()
  })
}
// end signa
function sigaValid (val) {
  return (val !== null && val !== '') || ''
}
function satValid (val) {
  return (val !== null && val !== '') || ''
}
// function mergeObj(from, to) {
//   const key = Object.keys(from)
//   key.forEach(a => {
//     to[a] = from[a]
//   })
// }
function simpanObat () {
  if ((parseFloat(store.form.jumlah) > parseFloat(store.form.stokalokasi)) && store.form.kodeobat !== '') {
    tidakBisaSimpan.value = true
    return notifErrVue('Stok Alokasi tidak mencukupi silahkan cari obat alternatif')
  }
  else {
    tidakBisaSimpan.value = false
  }
  // const form = []
  // mergeObj(store.form, store.form)
  // mergeObj(store.form, form)

  // console.log('simpan', form)
  console.log('form', store.form)
  // console.log('racikan', store.form)
  store.simpanObat().then(() => {
    // store.resetRacikan()
    refObat.value.focus()
    // refObat.value.showPopup()
  })
}
</script>
