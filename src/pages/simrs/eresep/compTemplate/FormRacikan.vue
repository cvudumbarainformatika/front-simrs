<template>
  <div class="column fit">
    <div class="col-auto row q-pa-md q-col-gutter-sm relative-position">
      <div
        class="col-12 flex items-center q-mb-sm"
      >
        Tipe Racikan:
        <q-option-group
          v-model="store.form.tiperacikan"
          :options="store.tipeRacikan"
          color="primary"
          class="q-ml-sm"
          size="xs"
          dense
          inline
          :disabled="store.form.rincian.length"
        />
      </div>

      <div class="col-3">
        <q-input
          ref="refJmlRacik"
          v-model="store.form.jumlahracikan"
          label="Jml Racik"
          standout="bg-yellow-3"
          dense
          outlined
        />
      </div>
      <div class="col-4">
        <q-select
          ref="refSat"
          v-model="store.form.satuan_racik"
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
        />
      </div>
      <div class="col-5">
        <autocomplete-input v-model="store.signa" @done="signaEnter" ref="compSigna" />
      </div>
      <div class="col-12">
        <q-input
          ref="refKet"
          v-model="store.form.keterangan"
          label="Keterangan Tambahan"
          outlined
          standout="bg-yellow-3"
          dense
        />
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
        <q-card-section class="q-px-md q-py-sm">
          <div>{{ item?.namaobat }}</div>
          <div class="text-grey">
            {{ item?.jumlah_diminta }} {{ item?.satuan_kcl }}
          </div>
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
import { defineAsyncComponent, onMounted, ref } from 'vue'

const AutocompleteInput = defineAsyncComponent(() => import('../compTemplate/AutocompleteInput.vue'))
const DialogObatRacikan = defineAsyncComponent(() => import('../compTemplate/DialogObatRacikan.vue'))

const store = useTemplateEResepStore()

const compSigna = ref(null)
const refKet = ref(null)
const refSat = ref(null)
const refJmlRacik = ref(null)

const dialogOpen = ref(false)
defineExpose({ compSigna })
onMounted(() => {
  initRacikan()
})

function initRacikan () {
  store.form = {
    racikan: true,
    tiperacikan: 'non-DTD',
    jumlahracikan: 1,
    satuan_racik: null,
    signa: null,
    namaobat: null,
    rincian: []
  }

  store.signa = null
  store.namaObat = null
}

function openDialog () {
  if (store.form.jumlahracikan < 1) {
    refJmlRacik.value.focus()
    refJmlRacik.value.select()
    return
  }

  if (store.form.satuan_racik === null) {
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

function signaEnter () {
  // refKonsumsi.value.focus()
  // refKonsumsi.value.select()
}

function simpanRincian (val) {
  store.form.rincian.push(val)
  dialogOpen.value = false
}
</script>
