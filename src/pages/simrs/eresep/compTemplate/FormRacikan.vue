<template>
  <div class="column fit">
    <div class="col-auto row q-pa-md q-col-gutter-sm relative-position">
      <div
        class="col-12 flex items-center q-mb-sm"
      >
        <strong>Tipe Racikan Hanya Tersedia NON DTD</strong>
        <!-- <q-option-group
          v-model="store.form.tiperacikan"
          :options="store.tipeRacikan"
          color="primary"
          class="q-ml-sm"
          size="xs"
          dense
          inline
          :disable="store.form?.rincian?.length>0"
        /> -->
      </div>
      <q-separator class="col-12" />
      <div v-if="store.form?.rincian?.length" class="col-12">
        <div class="row">
          <div class="col-12">
            Jumlah Racik : {{ store.form?.jumlah_diminta }}   {{ store.form.satuan_kcl }}
          </div>
          <div class="col-12">
            Aturan Pakai : {{ store.form?.signa }} selama {{ store.form.konsumsi }} Hari
          </div>
          <div class="col-12">
            Keterangan Tambahan : {{ store.form?.keterangan }}
          </div>
        </div>
      </div>
      <div v-else class="row q-col-gutter-sm">
        <div class="col-4">
          <q-input
            ref="refJmlRacik"
            v-model="store.form.jumlah_diminta"
            label="Jml Racik"
            standout="bg-yellow-3"
            dense
            outlined
            :disable="store.form?.rincian?.length>0"
            @keydown.enter="jmlRacikEnter"
          />
        </div>
        <div class="col-8">
          <q-select
            ref="refSat"
            v-model="store.form.satuan_kcl"
            label="Kemasan"
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
            :disable="store.form?.rincian?.length>0"
          />
        </div>
        <div class="col-6">
          <autocomplete-input v-model="store.signa" @done="signaEnter" ref="compSigna" />
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
            :disable="store.form?.rincian?.length>0"
            @keyup.enter="konsumsiEnter"
          />
        </div>
        <div class="col-12">
          <q-input
            ref="refKet"
            v-model="store.form.keterangan"
            label="Keterangan Tambahan"
            outlined
            standout="bg-yellow-3"
            :disable="store.form?.rincian?.length > 0"
            dense
          />
        </div>
      </div>
      <div class="col-12">
        <q-btn color="teal" class="full-width" @click="openDialog">
          Tambah / Pilih Obat Racikan
        </q-btn>
      </div>
      <!-- <div class="absolute-bottom full-width bg-dark text-white">
        <div class="q-pa-xs">
          Rincian Bahan Obat
        </div>
      </div> -->
    </div>

    <div class="col fit bg-grey-4 scroll">
      <q-card class="q-ma-sm" v-for="(item, n) in store?.form?.rincian" :key="n">
        <q-card-section class="q-px-md q-py-sm row items-center">
          <div>
            <div>{{ item?.namaobat }}</div>
            <div class="text-grey">
              {{ item?.jumlah_diminta }} {{ item?.satuan_kcl }}
            </div>
          </div>
          <q-space />
          <q-btn flat round size="sm" icon="icon-mat-close" color="negative" @click="removeRincian(n)" />
        </q-card-section>
      </q-card>
      <div style="margin-bottom: 100px;" />
    </div>

    <!-- dialog obat -->
    <DialogObatRacikan v-model="dialogOpen" @simpan="simpanRincian" />
  </div>
</template>

<script setup>
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { defineAsyncComponent, onMounted, ref, shallowRef, watchEffect } from 'vue'

const AutocompleteInput = shallowRef(defineAsyncComponent(() => import('../compTemplate/AutocompleteInput.vue')))
const DialogObatRacikan = defineAsyncComponent(() => import('../compTemplate/DialogObatRacikan.vue'))

const store = useTemplateEResepStore()

const compSigna = ref(null)
const refKet = ref(null)
const refSat = ref(null)
const refKonsumsi = ref(null)
const refJmlRacik = ref(null)

const dialogOpen = ref(false)
const emits = defineEmits(['resetDone'])
defineExpose({ compSigna })

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  depo: {
    type: String,
    default: ''
  },
  isReset: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  // console.log(compSigna.value)
  initRacikan()
})

function initRacikan () {
  store.form = {
    racikan: true,
    tiperacikan: 'non-DTD',
    tiperesep: store.items.length ? store.items[0].tiperesep : 'normal',
    forkit: null,
    fornas: null,
    generik: null,
    jumlah_diminta: 1,
    konsumsi: null,
    kodeobat: null,
    namaobat: null,
    kandungan: null,
    kekuatandosis: null,
    keterangan: null,
    kode108: null,
    kode50: null,
    satuan_kcl: null,
    signa: null,
    kodedepo: store.dpPar,
    rincian: []
  }

  store.signa = null
  store.namaObat = null

  setTimeout(() => {
    resetValidation()
  }, 100)
}

function openDialog () {
  if (store.form.jumlah_diminta < 1) {
    refJmlRacik.value.focus()
    refJmlRacik.value.select()
    return
  }

  if (store.form.satuan_kcl === null) {
    refSat.value.focus()
    refSat.value.showPopup()
    return
  }

  if (store.form.signa === null) {
    compSigna.value?.refSigna?.focus()
    compSigna.value?.refSigna.showPopup()
    return
  }
  dialogOpen.value = true
}

function satValid (val) {
  return (val !== null && val !== '') || ''
}
const jmlRacikEnter = () => {
  console.log('oooi')
  compSigna.value?.refSigna?.value?.focus()
  // refKonsumsi.value.select()
}

function signaEnter () {
  refKonsumsi.value.focus()
  // refKonsumsi.value.select()
}

function konsumsiEnter () {
  refKet.value.focus()
  // refKet.value.select()
}

function simpanRincian (val) {
  store.form.rincian.push(val)
  dialogOpen.value = false
}

function removeRincian (n) {
  store.form?.rincian?.splice(n, 1)
}

function resetValidation () {
  compSigna?.value?.refSigna?.reset()
  // compCariObat?.value?.refObat?.reset()
  compSigna?.value?.refSigna?.resetValidation()
  // compCariObat?.value?.refObat?.resetValidation()
  compSigna?.value?.refSigna?.resetValidation()
  // compCariObat?.value?.refObat?.resetValidation()
  // console.log('is-reset', compSigna.value.refSigna)
  // compCariObat?.value?.refObat?.focus()
  refJmlRacik?.value?.focus()
  refJmlRacik?.value?.select()
  emits('resetDone')
}

watchEffect(() => {
  // store.pasien = props?.pasien
  store.depo = props?.depo
  // console.log('pasi', props.pasien)
  if (props.isReset) {
    initRacikan()
    // resetValidation()
  }
})

</script>
