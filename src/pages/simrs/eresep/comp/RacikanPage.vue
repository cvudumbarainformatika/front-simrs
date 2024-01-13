<template>
  <div
    class="bg-white column"
    style="height:90vh"
  >
    <div class="col-auto bg-primary text-white">
      <div class="q-pa-sm f-16">
        Input Obat Racikan
      </div>
    </div>
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
                  Jumlah (Bungkus/Kapsul/pot)
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
                  <q-option-group
                    v-model="store.form.jenisracikan"
                    :options="store.tipeRacikan"
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
                  <app-input
                    v-model="store.form.jumlahdibutuhkan"
                    label="Jumlah Racikan"
                    outlined
                    @update:model-value="setDosis($event,'jumlahdibutuhkan')"
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
                    standout="bg-yellow-3"
                    option-label="signa"
                    outlined
                    :rules="[sigaValid]"
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    hide-dropdown-icon
                    :options="store.signas"
                    @update:model-value="signaSelected"
                  />
                </div>
                <div
                  class="col text-right"
                >
                  <app-input
                    v-model="store.form.keterangan"
                    label="Keterangan"
                    outlined
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
                  v-if="store.form.jenisracikan==='DTD'"
                  class="col-2"
                >
                  Dosis obat
                </div>
                <div
                  v-if="store.form.jenisracikan==='DTD'"
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
              </q-select>
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
                  v-if="store.form.jenisracikan==='DTD'"
                  class="col-2"
                >
                  <app-input
                    v-model="store.form.dosisobat"
                    label="Dosis Obat"
                    outlined
                    @update:model-value="setDosis($event,'dosisobat')"
                  />
                </div>
                <div
                  v-if="store.form.jenisracikan==='DTD'"
                  class="col-2"
                >
                  <app-input
                    v-model="store.form.dosismaksimum"
                    label="Dosis resep"
                    outlined
                    @update:model-value="setDosis($event,'dosismaksimum')"
                  />
                </div>
                <div
                  v-if="store.form.jenisracikan!=='DTD'"
                  class="col-2"
                >
                  <app-input
                    v-model="store.form.jumlah"
                    label="Jumlah Obat"
                    outlined
                    @update:model-value="setDosis($event,'jumlah')"
                  />
                </div>
                <div
                  v-if="store.form.jenisracikan==='DTD'"
                  class="col-2"
                >
                  {{ store.form.jumlah }}
                </div>

                <div
                  class="col text-right"
                >
                  <app-input
                    v-model="store.form.keteranganx"
                    label="Keterangan Obat"
                    outlined
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-item>
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
          </q-item>
          <template v-if="store.listRacikan.length">
            <q-expansion-item
              v-for="(item, i) in store.listRacikan"
              :key="i"
            >
              <template #header>
                <q-item-section style="width: 50%;">
                  <div class="row">
                    {{ item?.nama }}
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
                  </div>
                </q-item-section>
              </template>

              <q-item
                v-for="(obat, j) in item?.rician"
                :key="j"
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
                  </div>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </template>
        </q-list>
      </q-scroll-area>
      <!-- <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        ada
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { ref, onMounted } from 'vue'

// eslint-disable-next-line no-unused-vars
const store = usePermintaanEResepStore()
onMounted(() => {
  // store.setForm('namaracikan', 'racikan-' + store.counterRacikan)
  store.setForm('jenisresep', 'Racikan')
  store.setForm('keteranganx', '-')
  store.setForm('jumlah', 1)
  store.setForm('jenisracikan', 'DTD')
  store.setForm('dosisobat', 1)
  store.setForm('dosismaksimum', 1)
  if (!store.racikanTambah) store.getNomor()
})

function setDosis(evt, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  store.setForm(key, nilai)

  if (store.form.jenisracikan === 'DTD') {
  // jumlahdibutuhkan , jumlah, dosisobat, dosismaksimum
    const jumlahDiminta = store.form?.jumlahdibutuhkan ?? 1
    const dosisObat = store.form?.dosisobat ?? 1
    const dosisResep = store.form?.dosismaksimum ?? 1
    const jumlahObat = dosisResep / dosisObat * jumlahDiminta
    store.setForm('jumlah', jumlahObat)
  }
}
function inputObat(val) {
  if (val !== '') store.cariObat(val)
  if (val === '' && store.nonFilteredObat.length) store.Obats = store.nonFilteredObat
}
function obatSelected(val) {
  if (val?.alokasi <= 0) {
    store.namaObat = null
    return notifErrVue('Stok Alokasi sudah habis, silahkan pilih obat yang lain')
  }
  // console.log('obat selected', val)
  store.setForm('satuan_kcl', val?.satuankecil ?? '-')
  store.setForm('kodeobat', val?.kdobat ?? '-')
  store.setForm('kandungan', val?.kandungan ?? '-')
  store.setForm('fornas', val?.fornas ?? '-')
  store.setForm('forkit', val?.forkit ?? '-')
  store.setForm('generik', val?.generik ?? '-')
  store.setForm('kode108', val?.kode108 ?? '-')
  store.setForm('uraian108', val?.uraian108 ?? '-')
  store.setForm('kode50', val?.kode50 ?? '-')
  store.setForm('uraian50', val?.uraian50 ?? '-')
  store.setForm('stokalokasi', val?.alokasi ?? '-')
  store.setForm('kodedepo', store.dpPar)
  // console.log('form', store.form)
}
function obatValid (val) {
  return (val !== null && val !== '') || 'Harap diisi'
}
const signa = ref('')
function signaSelected(val) {
  store.setForm('aturan', val?.signa)
  store.setForm('jumlahdosis', parseFloat(val?.jumlah))
  if (parseFloat(store.form.jumlahdibutuhkan) > 0) {
    const kons = store.form.jumlahdibutuhkan / parseFloat(val?.jumlah)
    store.setForm('konsumsi', kons)
  }
}
function sigaValid (val) {
  return (val !== null && val !== '') || 'Harap diisi'
}
function mergeObj(from, to) {
  const key = Object.keys(from)
  key.forEach(a => {
    to[a] = from[a]
  })
}
function simpanObat() {
  // const form = []
  mergeObj(store.form, store.form)
  // mergeObj(store.form, form)

  // console.log('simpan', form)
  console.log('form', store.form)
  // console.log('racikan', store.form)
  store.simpanObat().then(() => {
    store.resetRacikan()
  })
}
</script>
