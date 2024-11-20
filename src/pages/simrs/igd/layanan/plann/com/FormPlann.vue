<template>
  <div class="fit column absolute">
    <div class="col full-height ">
      <q-card
        flat
        bordered
        square
        class="full-height "
        style="overflow: hidden;"
      >
        <q-form
          ref="refForm"
          @submit="onSubmit"
          class="column full-height"
        >
          <q-card-section class="q-px-md q-py-xs bg-primary text-white col-auto full-width">
            <div class="row items-center justify-between">
              <div class="f-12 text-weight-bold">
                Form Plann
              </div>
              <div>
                <q-btn
                  flat
                  dense
                  size="md"
                  icon="icon-mat-history"
                >
                  <q-tooltip class="bg-dark text-white">
                    {{ tooltip }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col full-height scroll">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-bold">Plann</span>
                <q-option-group
                  v-model="store.form.panel"
                  inline
                  @update:model-value="kosongkanpanel"
                  :options="[
                    { label: 'Rawat Inap', value: 'Rawat Inap' },
                    { label: 'Rujuk Ke Rumah Sakit Lain', value: 'Rujuk Ke Rumah Sakit Lain' },
                    { label: 'Pulang', value: 'Pulang' }
                  ]"
                />
              </div>
              <div class="col-12">
                <q-tab-panels v-model="store.form.panel" animated class="shadow-2 rounded-borders">
                  <q-tab-panel name="Rawat Inap">
                    <div class="row q-col-gutter-sm">
                      <div class="col-6">
                        <q-select
                          v-model="store.form.operasi"
                          label="Operasi"
                          :options="optionoperasi"
                          dense
                          outlined
                          standout="bg-yellow-3"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          @update:model-value="resetklutidak"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                        />
                      </div>
                      <div class="col-6" v-if="store.form.operasi === 'Ya'">
                        <q-select
                          v-model="store.form.jenisoperasi"
                          label="Jenis Operasi"
                          :options="optionjenisoperasi"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                        />
                      </div>
                      <div class="col-6" v-if="store.form.operasi === 'Ya'">
                        <app-input-date
                          :model="store.form.tgloperasi"
                          mask="date"
                          outlined
                          standout="bg-yellow-3"
                          label="Tanggal Operasi"
                          @set-model="val=>store.form.tgloperasi=val"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                        >
                          <template #append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </app-input-date>
                      </div>
                      <div class="col-6">
                        <q-select
                          v-model="store.form.ruangtujuan"
                          label="Ruang Tujuan"
                          :options="props.ruangranap"
                          map-options
                          option-label="rs2"
                          option-value="rs1"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          emit-value
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="store.form.keterangan"
                          outlined
                          standout="bg-yellow-3"
                          label="Keterangan"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                        />
                      </div>
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="Rujuk Ke Rumah Sakit Lain">
                    <div class="row q-col-gutter-sm">
                      <div class="col-6">
                        <q-select
                          v-model="store.form.atasdasar"
                          label="Atas Dasar"
                          :options="atasdasar"
                          dense
                          outlined
                          standout="bg-yellow-3"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          v-model="store.form.jenispelayanan"
                          label="Jenis Pelayanan"
                          :options="optionjenispelayanan"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-6">
                        <app-input-date
                          :model="store.form.tglrujukan"
                          mask="date"
                          outlined
                          standout="bg-yellow-3"
                          label="Tanggal Rujukan"
                          @set-model="val=>store.form.tglrujukan=val"
                        >
                          <template #append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </app-input-date>
                      </div>
                      <div class="col-6">
                        <app-input-date
                          :model="store.form.tglrencanakunjungan"
                          mask="date"
                          outlined
                          standout="bg-yellow-3"
                          label="Tanggal Rencana Kunjungan"
                          @set-model="val=>store.form.tglrencanakunjungan=val"
                        >
                          <template #append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </app-input-date>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="store.form.typefaskes"
                          label="Type Faskes"
                          :options="optiontypefaskes"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          emit-value
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-10">
                        <q-select
                          v-model="store.form.dirujukkers"
                          label="di rujuk Ke"
                          dense
                          outlined
                          standout="bg-yellow-3"
                          use-input
                          input-debounce="800"
                          map-options
                          :options="optionsFaskes2"
                          option-value="kode"
                          option-label="nama"
                          hide-bottom-space
                          clearable
                          @filter="onFilterTest"
                          @update:model-value="(val) => carinama(val)"
                        />
                      </div>
                      <div class="-4">
                        <q-select
                          v-model="store.form.polirujukan"
                          label="Poli Rujukan"
                          dense
                          outlined
                          standout="bg-yellow-3"
                          use-input
                          input-debounce="800"
                          :options="optionsPoli"
                          option-value="kode"
                          option-label="nama"
                          map-options
                          hide-bottom-space
                          @filter="filterPoli"
                          @update:model-value="(val) => caripoli(val)"
                        />
                      </div>
                      <div class="col-8">
                        <q-input v-model="store.form.keteranganrujuk" dense outlined standout="bg-yellow-3" label="Keterangan" />
                      </div>
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="Pulang">
                    <div class="row q-col-gutter-sm">
                      <div class="col-6">
                        <q-select
                          v-model="store.form.atasdasarpulang"
                          label="Atas Dasar"
                          :options="optionpulangs"
                          dense
                          outlined
                          standout="bg-yellow-3"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                          @update:model-value="(val) => cekpulang(val)"
                        />
                      </div>
                      <div class="col-3" v-if="store.form.atasdasarpulang === 'Meninggal'">
                        <app-input-date
                          :model="store.form.tglmeninggal"
                          mask="date"
                          outlined
                          standout="bg-yellow-3"
                          label="Tanggal Meninggal"
                          @set-model="val=>store.form.tglmeninggal=val"
                          :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                        >
                          <template #append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </app-input-date>
                      </div>
                      <div class="col-3" v-if="store.form.atasdasarpulang === 'Meninggal'">
                        <app-input-date
                          :model="store.form.jammeninggal"
                          :type-date="false"
                          outlined
                          standout="bg-yellow-3"
                          label="Jam Meninggal"
                          @set-model="val=>store.form.jammeninggal=val"
                        >
                          <template #append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </app-input-date>
                      </div>
                      <div class="col-12" v-if="store.form.atasdasarpulang === 'Meninggal'">
                        <q-input v-model="store.form.alasanmeninggal" dense outlined standout="bg-yellow-3" label="Alasan Meninggal" />
                      </div>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
              <div class="col-12">
                <div
                  class="text-right"
                  style="margin-bottom: 50px;"
                >
                  <app-btn
                    color="primary"
                    label="Simpan"
                    tooltip="Simpan Data"
                    type="submit"
                    tip
                    :loading="store.loadingSavePlann"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { usePlannStore } from 'src/stores/simrs/igd/plann'
import { ref } from 'vue'

const store = usePlannStore()
const refForm = ref()
const optionoperasi = ref(['Ya', 'Tidak'])
const optionjenisoperasi = ref(['Eleftif', 'Cito'])
const atasdasar = ref(['Tempat Penuh', 'Permintaan Pasien', 'Penanganan Lebih Lanjut'])
const optionjenispelayanan = ref(['Rawat Inap', 'Rawat Jalan'])
const optiontypefaskes = ref(['Penuh', 'Partial'])
const optionsFaskes2 = ref([])
const optionsPoli = ref([])
const optionpulangs = ref(['Sembuh', 'Paksa', 'Meninggal'])

// function updateModelPpk (val) {
//   store.formRsLain.ppkdirujuk = val.kode
//   store.formRsLain.ppkdirujukx = val.nama
//   store.formRsLain.namappkdirujuk = val.nama
//   // console.log('poli ', val)
// }

const onFilterTest = async (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }
  const params = {
    params: {
      namafaskes: val,
      jnsfaskes: 2
    }
  }
  const response = await api.get('v1/simrs/pelayanan/faskes', params)
  const code = response?.data?.metadata?.code

  if (code === '200') {
    update(() => {
      optionsFaskes2.value = response?.data?.result?.faskes
    })
  }
}

const filterPoli = async (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }
  const params = {
    params: {
      namapoli: val
    }
  }
  const response = await api.get('v1/simrs/pelayanan/polibpjs', params)
  // console.log(response)
  const code = response?.data?.metadata?.code
  if (code === '200') {
    update(() => {
      optionsPoli.value = response?.data?.result?.poli
    })
  }
}

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  ruangranap: {
    type: Object,
    default: null
  },
  triage: {
    type: Object,
    default: null
  },
  tooltip: {
    type: String,
    default: 'History Pasien'
  }
})

function onSubmit () {
  store.savePlan(props.pasien).then(() => {
    console.log('s')
    refForm.value.resetValidation()
  })
}

function resetklutidak (val) {
  if (val === 'Tidak') {
    store.form.jenisoperasi = ''
    store.form.tgloperasi = ''
  }
  else {
    store.formattanggal()
  }
}

function kosongkanpanel (val) {
  if (val === 'Rujuk Ke Rumah Sakit Lain') {
    kosongkantabrawatinap()
    kosongkanpulang()
  }
  else if (val === 'Pulang') {
    kosongkantabrawatinap()
    kosongkanrujukanRSlain()
  }
  else if (val === 'Rawat Inap') {
    kosongkanrujukanRSlain()
    kosongkanpulang()
  }
}

function kosongkantabrawatinap () {
  store.form.operasi = ''
  store.form.jenisoperasi = ''
  store.form.tgloperasi = ''
  store.form.ruangtujuan = ''
  store.form.keterangan = ''
}

function kosongkanrujukanRSlain () {
  store.form.atasdasar = ''
  store.form.jenispelayanan = ''
  store.form.tglrujukan = ''
  store.form.tglrencanakunjungan = ''
  store.form.typefaskes = ''
  store.form.dirujukkers = ''
  store.form.polirujukan = ''
  store.form.keteranganrujuk = ''
}

function kosongkanpulang () {
  store.form.atasdasarpulang = ''
  store.form.tglmeninggal = ''
  store.form.jammeninggal = ''
  store.form.keteranganrujuk = ''
}

function carinama (val) {
  store.form.koders = val?.kode
  store.form.dirujukkers = val?.nama
}

function caripoli (val) {
  store.form.kodepoli = val?.kode
  store.form.polirujukan = val?.nama
}

function cekpulang (val) {
  if (val === 'Meninggal') {
    const sekarang = Date.now()
    store.form.tglmeninggal = date.formatDate(sekarang, 'YYYY-MM-DD')
    store.form.jammeninggal = date.formatDate(sekarang, 'H:m')
  }
  else {
    store.form.tglmeninggal = ''
    store.form.jammeninggal = ''
    store.form.keteranganrujuk = ''
  }
}

store.formattanggal()

</script>
