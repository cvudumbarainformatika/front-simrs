<template>
  <q-dialog
    persistent
    @show="getWhenShow"
  >
    <q-card
      flat
      class="full-height"
      style="min-width: 50vw;"
    >
      <div class="fit column">
        <q-bar class="col-auto bg-primary text-white q-py-sm">
          <div class="f-12">
            Form Tambah Obat
          </div>
          <q-space />

          <q-btn
            v-close-popup
            dense
            flat
            icon="icon-mat-close"
            @click="emoots('close')"
          >
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>

        <!-- isinya -->
        <div class="col fit column">
          <div class="col full-height scroll">
            <div class="row q-pa-md q-col-gutter-sm items-center">
              <div class="col-6">
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
                  :loading="store.loadingObat"
                  @input-value="inputObat"
                  @focus="inputObat"
                  @update:model-value="obatSelected"
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
              </div>
              <div class="col-6">
                <q-input
                  ref="refQty"
                  v-model="store.form.jumlah_distribusi"
                  label="Jumlah Distribusi"
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
              <div class="col-8">
                <app-autocomplete-debounce-input
                  v-model="store.form.susulan"
                  outlined
                  label="Perawat yang meminta"
                  standout="bg-yellow-3"
                  option-label="nama"
                  option-value="kdpegsimrs"
                  valid
                  clearable
                  :loading="store.loadingPegawai"
                  :options="store.pegawaies"
                />
              </div>
              <div class="col-2 text-right">
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
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { Dialog } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
import { useTambahObatDistribusiPersiapanOperasiStore } from 'src/stores/simrs/farmasi/distribusipersiapanok/tambah'
import { ref } from 'vue'

const emoots = defineEmits(['close'])
const store = useTambahObatDistribusiPersiapanOperasiStore()

function obatValid (val) {
  return (val !== null && val !== '') || ''
}

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

  console.log('input obat', store.form)
}

function setJumlah (evt) {
  // console.log('alokasi', store.form.stokalokasi)
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  const alokasi = parseFloat(store.form.stokalokasi)
  if (nilai > alokasi) {
    store.setForm('jumlah_distribusi', alokasi)
    notifErrVue('Tidak boleh lebih dari jumlah alokasi')
  }
  else {
    store.setForm('jumlah_distribusi', nilai)
  }
}
function getWhenShow () {
  store.cariObat('')
  store.getPegawai('')
}
const refObat = ref(null)
const refQty = ref(null)
function validasi () {
  const obat = refObat.value?.validate()
  const qty = refQty.value?.validate()
  console.log('validasi', obat, qty)
  if (obat && qty) return true
  else return false
}
function simpanObat () {
  console.log('form', store.form)
  if (validasi()) {
    if (!store.form.susulan || store.form?.susulan === '') {
      openDialog()
    }
    else {
      store.simpanDistribusi()
    }
  }
}
function openDialog () {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakah tidak akan dicatat Perawat yang meminta Obat?',
    ok: {
      push: true,
      'no-caps': true,
      color: 'negative',
      label: 'Tidak Perlu Dicatat'
    },
    cancel: {
      push: true,
      'no-caps': true,
      color: 'dark',
      label: 'Tutup'
    }
  })
    .onOk(() => {
      store.simpanDistribusi()
    })
}
</script>
