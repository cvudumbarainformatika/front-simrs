f<template>
  <div class="bg-white full-height column">
    <div class="col-auto bg-primary text-white">
      <div class="q-pa-sm">
        Form Persiapan Operasi
      </div>
    </div>
    <div class="col full-height relative-position">
      <!-- Option tipe Resep -->
      <div class="row justify-between items-center">
        <div v-if="store?.form?.tiperesep==='iter'">
          <app-input-date
            :model="store.form.iter_expired"
            label="Iter Berlaku Sampai"
            outlined
            @set-model="store.setForm('iter_expired',$event)"
          />
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
              NAMA OBAT
            </q-item-section>
            <q-item-section
              side
              style="width:50%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="col"
                >
                  Jumlah
                </div>
                <!-- <div
                  class="col-3 text-right"
                >
                  Atr Pakai
                </div>
                <div
                  class="col text-right"
                >
                  Keterangan
                </div> -->
              </div>
            </q-item-section>
          </q-item>
          <!-- Inputan -->
          <q-item>
            <q-item-section
              style="width: 50%;"
              class="relative-position full-height"
            >
              <q-select
                ref="refObat"
                v-model="store.namaObat"
                use-input
                label="Cari Obat"
                dense
                option-label="namaobat"
                option-value="kodeobat"
                standout="bg-yellow-3"
                outlined
                input-debounce="800"
                class="full-width"
                hide-dropdown-icon
                :rules="[obatValid]"
                lazy-rules
                hide-bottom-space
                no-error-icon
                :options="store.Obats"
                @input-value="inputObat"
                @focus="inputObat"
                @update:model-value="obatSelected"
                @keyup.enter.stop="obatEnter"
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
                      v-if="scope.opt.alokasi >0"
                      class="q-ml-xs text-weight-bold text-green"
                    >
                      {{ scope.opt.alokasi }} <span class="f-8">(tersedia)</span>
                    </div>
                    <div
                      v-if="scope.opt.alokasi <=0"
                      class="q-ml-xs text-weight-bold text-negative f-14"
                    >
                      {{ scope.opt.alokasi }} <span class="f-8">(habis)</span>
                    </div>
                    <div
                      v-if="scope.opt.satuankecil"
                      class="q-ml-xs text-primary"
                    >
                      {{ scope.opt.satuankecil }}
                    </div>
                    <div
                      v-if="scope.opt.status_konsinyasi==='1'"
                      class="q-ml-xs text-italic f-10 text-weight-bold text-deep-purple"
                    >
                      ( Konsinyasi )
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
              </q-select>
            </q-item-section>
            <q-item-section
              side
              style="width:50%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col"
                >
                  <q-input
                    ref="refQty"
                    v-model="store.form.jumlah_minta"
                    label="Qty"
                    dense
                    :rules="[val=> parseFloat(val) >= 1 || '']"
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    standout="bg-yellow-3"
                    outlined
                    @update:model-value="setJumlah"
                  />
                </div>
                <!--
                <div
                  class="col-4 text-right"
                >
                  <q-select
                    ref="refSigna"
                    v-model="signa"
                    label="Aturan Pakai"
                    use-input
                    dense
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
                </div> -->
                <div
                  class="col-shrink text-right"
                >
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
          <template v-if="store.listBelum?.rinci?.length">
            <q-item
              v-for="(item, i) in store.listBelum?.rinci"
              :key="i"
            >
              <!-- {{ item }} -->
              <q-item-section style="width: 50%;">
                <div class="row">
                  {{ item?.obat?.nama_obat }}
                </div>
                <div class="row text-italic f-10">
                  {{ item?.kd_obat }}
                </div>
              </q-item-section>
              <q-item-section
                side
                style="width:50%"
              >
                <div class="row items-center q-col-gutter-sm full-width">
                  <div
                    class="text-right col-3"
                  >
                    {{ item?.jumlah_minta }}
                  </div>
                  <!-- <div
                    class="col-2 text-right"
                  >
                    {{ item?.aturan }}
                  </div> -->
                  <!-- <div
                    class="col-3 text-right"
                  >
                    {{ formatDouble( item?.harga) }}
                  </div>
                -->
                  <div
                    class="col text-right"
                  >
                    <!-- {{ item?.keterangan }} -->
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
                      >
                        <q-tooltip class="bg-white text-primary">
                          Tambah obat Racikan
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-item-section>
              </template>
              <!-- <q-item>
                <q-item-section />
                <q-item-section>
                  <div class="text-right q-mr-sm">
                    <q-btn
                      color="primary"
                      dense
                      no-caps
                      :disable="store.loading || store.loadingkirim"
                      @click="racikanTambah(item)"
                    >
                      Tambah
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item> -->
              <q-item
                v-for="(obat, j) in item?.rincian"
                :key="j"
                class="bg-white"
              >
                <!-- {{ j }} {{ obat }} -->
                <q-item-section style="width: 50%;">
                  <div class="row">
                    {{ obat?.mobat?.nama_obat }}
                  </div>
                  <div class="row text-italic f-10">
                    {{ obat?.kdobat }}
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
            </q-expansion-item>
          </template>
        </q-list>
        <div
          class="q-mt-lg"
        />
      </q-scroll-area>
      <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        <div class="q-gutter-sm">
          <!-- <q-btn color="negative">
            Reset Resep
          </q-btn> -->
        </div>
        <div>
          <q-btn
            color="primary"
            :loading="store.loadingkirim"
            :disable="store.loadingkirim"
            @click="store.selesaiResep"
          >
            Kirim Permintaan
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <app-fullscreen-blue
    v-model="store.racikanOpen"
    title="Input Obat Racikan"
    @hide="resetFormRacik"
  >
    <!-- <template #default>
      <racikanpage />
    </template> -->
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
import { onMounted, ref } from 'vue'
import { usePersiapanOperasiStore } from 'src/stores/simrs/farmasi/kamaroperasi/resepsemntara'
import { formatDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
// import { Dialog } from 'quasar'

const props = defineProps({
  pasien: { type: Object, default: null },
  depo: { type: String, default: '' }
})
const store = usePersiapanOperasiStore()

const refObat = ref(null)
const refQty = ref(null)
// const refSigna = ref(null)
const refKet = ref(null)

// function setTipe() {
//   console.log('tipe resep', 'Normal')
//   store.cariObat('')
// }
function setPasien () {
  const val = props?.pasien
  const temp = val?.diagnosa?.map(x => x?.rs3 + ' - ' + x?.masterdiagnosa?.rs4)
  // eslint-disable-next-line no-unused-vars
  const diag = temp?.length ? temp.join(', ') : '-'
  store.setPasien()

  // store.setForm('noreg', val?.rs1)
  // store.setForm('norm', val?.norm)
  // store.setForm('groupsistembayar', val?.groups)
  // store.setForm('sistembayar', val?.kodesistembayar ?? val?.kdsistembayar)
  // store.setForm('dokter', val?.kodedokter)
  // store.setForm('diagnosa', diag ?? '-')
  // store.cariSimulasi(val?.noreg)
  // if (props?.depo === 'rjl') store.getBillRajal(val)
  // if (props?.depo === 'rnp') store.getBillRanap(val)
  // if (props?.depo === 'igd') store.getBillIgd(val)
  // store.setNoreseps(props?.pasien?.newapotekrajal)
  // console.log('sasa', val)
  // store.listRacikan = []
  // store.listPemintaanSementara = []
}

function resetFormRacik () {
  store.setForm('jenisresep', '')
  store.resetForm()
}
/// / set Racikan end ------

function myDebounce (func, timeout = 800) {
  let timer
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, arg) }, timeout)
  }
}
const inputObat = myDebounce((val) => {
  // console.log('input obat', val, typeof val)
  if ((typeof val) !== 'string') val = ''
  if (val !== '') store.cariObat(val)
  if (val === '' && store.nonFilteredObat.length) store.Obats = store.nonFilteredObat
})
// function inputObat(val) {
//   if (val !== '') store.cariObat(val)
//   if (val === '' && store.nonFilteredObat.length) store.Obats = store.nonFilteredObat
// }
function obatSelected (val) {
  // console.log('select obat', val)
  if (val?.alokasi <= 0) {
    store.namaObat = null
    return notifErrVue('Stok Alokasi sudah habis, silahkan pilih obat yang lain')
  }
  // console.log('obat selected', val)
  store.setForm('satuan_kcl', val?.satuankecil ?? '-')
  store.setForm('kodeobat', val?.kdobat ?? '-')
  store.setForm('kandungan', val?.kandungan ?? '-')
  store.setForm('status_konsinyasi', val?.status_konsinyasi ?? '-')
  store.setForm('fornas', val?.fornas ?? '-')
  store.setForm('forkit', val?.forkit ?? '-')
  store.setForm('generik', val?.generik ?? '-')
  store.setForm('kode108', val?.kode108 ?? '-')
  store.setForm('uraian108', val?.uraian108 ?? '-')
  store.setForm('kode50', val?.kode50 ?? '-')
  store.setForm('uraian50', val?.uraian50 ?? '-')
  store.setForm('stokalokasi', val?.alokasi ?? '-')
  store.setForm('kodedepo', 'Gd-04010103')
}

function obatEnter () {
  refQty.value.focus()
  refQty.value.select()
}
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
  if (parseFloat(store.form.jumlah_minta) > 0) {
    const kons = store.form.jumlah_minta / parseFloat(val?.jumlah)
    store.setForm('konsumsi', kons)
  }
  // }
}
// function signaCreateValue(val, done) {
//   signaNewVal.value = true
//   let newSigna = ''
//   if (val.includes('x')) {
//     const anu = val.split('x')
//     // console.log('anu', anu)
//     if (anu?.length) {
//       const satu = anu[0]
//       const temp = anu[1].slice(0, 4).split('')
//       const num = temp.filter(a => !isNaN(parseFloat(a)))
//       store.fromSigna.jumlah = satu * num[0] ?? 1
//       // console.log('temp', temp, num, isNaN(parseFloat(temp[0])))
//       const depan = anu[0] + ' x ' + anu[1]
//       if (anu?.length === 2) {
//         newSigna = depan
//       } else {
//         const temp = anu
//         const belakang = temp.slice(2).join(' x ')
//         // console.log('dep', temp, '--->', depan, ' -- ', belakang)
//         newSigna = depan + belakang
//       }
//     }
//   } else newSigna = val
//   store.fromSigna.signa = newSigna
//   done(store.fromSigna)

//   console.log('signa new val', signa.value)
// }
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
// function signaEnter() {
//   if (!signaNewVal.value) {
//     refKet.value.focus()
//     refKet.value.select()
//     console.log('signa enter')
//   }
// }
// jumlah
function setJumlah (val) {
  console.log('jumlah', val)
  if (Object.keys(signa.value)?.length) {
    if (parseFloat(val) > 0) {
      const kons = val / parseFloat(signa.value?.jumlah)
      store.setForm('konsumsi', kons)
    }
  }
  else if (store.form?.aturan !== '') {
    const sign = store.signas.filter(sig => sig.signa === store?.form?.aturan)
    if (sign.length) {
      if (parseFloat(val) > 0) {
        const kons = val / parseFloat(signa.value?.jumlah)
        store.setForm('konsumsi', kons)
      }
    }
  }
}
// eslint-disable-next-line no-unused-vars
// function qtyEnter() {
//   // if (parseFloat(store.form.jumlah_minta) > 1)
//   refSigna.value.focus()
//   refSigna.value.showPopup()
// }
function obatValid (val) {
  return (val !== null && val !== '') || ''
}
// function sigaValid (val) {
//   return (val !== null && val !== '') || ''
// }
function validate () {
  if (store?.form?.kodeobat !== '') {
    const ob = store?.nonFilteredObat.filter(o => o.kodeobat === store?.form?.kodeobat)
    if (ob.length && !Object?.keys(store?.namaObat)?.length) store.namaObat = ob[0]
    // console.log('non', store.nonFilteredObat)
  }
  // if (store?.form?.aturan !== '') {
  //   const sign = store.signas.filter(sig => sig.signa === store?.form?.aturan)
  //   if (sign.length && !Object.keys(signa.value)?.length) signa.value = sign[0]
  //   // console.log('at', store.signas, sign)
  // }

  if (refObat.value.validate() && refQty.value.validate()) return true
  else return false
}
// function ketEnter() {
//   Dialog.create({
//     title: 'Konfirmasi',
//     message: 'Apakah Akan dilanjutkan untuk di simpan?',
//     ok: {
//       push: true,
//       label: 'Simpan',
//       color: 'primary',
//       'no-caps': true
//     },
//     cancel: {
//       push: true,
//       label: 'Batal',
//       color: 'dark',
//       'no-caps': true
//     }
//   })
//     .onOk(() => {
//       simpanObat()
//     })
// }
function simpanObat () {
  console.log('simpan', store.form)
  if (validate()) {
    store.simpanObat()
  }
}
onMounted(() => {
  console.log('depo', props.pasien)
  store.pasien = props?.pasien
  store.depo = 'ok'
  store.dpPar = 'Gd-04010103'
  // store.getSigna()
  store.cariObat()
  setPasien()
  if (props?.pasien?.permintaanobatoperasi?.length) store.setNopermintaan(props?.pasien?.permintaanobatoperasi)
  // console.log('ref Obat', refObat.value)
  refObat.value.focus()
  // refObat.value.showPopup()
})

</script>
