<template>
  <div class="q-pa-sm">
    <div class=" q-mt-md">
      <div v-if="depo==='rjl'" class="q-px-xs">
        <div
          class="row q-my-xs items-center"
        >
          Tipe Resep:
          <q-option-group
            v-model="store.form.tiperesep"
            :options="store.tipeReseps"
            color="primary"
            class="q-ml-sm"
            size="xs"
            dense
            inline
            :disable="store.items.length>0"
            @update:model-value="setTipe"
          />
        </div>
        <!-- <div
          class="row q-my-xs items-center"
        >
          Tipe Resep: {{ store.form.tiperesep.charAt(0).toUpperCase() + store.form.tiperesep.slice(1) }}
        </div> -->
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
    </div>

    <q-separator class="q-my-sm" />

    <cari-obat v-model="store.namaObat" ref="compCariObat" @enter="obatEnter" @selected="obatSelected" />
    <div class="row q-my-xs q-col-gutter-sm">
      <div class="col-4">
        <q-input
          ref="refQty"
          v-model="store.form.jumlah_diminta"
          :label="`QTY / ${store.form.satuan_kcl}`"
          dense
          :rules="[numberValidationRule]"
          lazy-rules
          no-error-icon
          hide-bottom-space
          standout="bg-yellow-3"
          outlined
          @update:model-value="setJumlah"
          @keyup.enter="qtyEnter"
        />
      </div>
      <div class="col-8">
        <autocomplete-input v-model="store.signa" @done="signaEnter" ref="compSigna" />
      </div>
      <div class="col-12">
        <q-input
          ref="refKonsumsi"
          v-model="store.form.konsumsi"
          label="Dikonsumsi selama (hari)"
          dense
          :rules="[numberValidationRule]"
          lazy-rules
          no-error-icon
          hide-bottom-space
          standout="bg-yellow-3"
          outlined
          @keyup.enter="konsumsiEnter"
        />
      </div>
      <div class="col-12">
        <q-input
          ref="refKet"
          v-model="store.form.keterangan"
          label="Keterangan"
          dense
          standout="bg-yellow-3"
          outlined
          class="full-width"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { defineAsyncComponent, onMounted, ref, shallowRef, watchEffect } from 'vue'

const store = useTemplateEResepStore()
const permintaan = useResepPermintaanOperasiStore()

const compCariObat = ref(null)
const refQty = ref(null)
const compSigna = ref(null)
const refKet = ref(null)
const refKonsumsi = ref(null)

const CariObat = defineAsyncComponent(() => import('../compTemplate/CariObat.vue'))
const AutocompleteInput = defineAsyncComponent(() => import('../compTemplate/AutocompleteInput.vue'))

defineExpose({ compSigna })
const emits = defineEmits(['resetDone'])

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

function numberValidationRule (val) {
  if (val === '' || val === null) {
    return 'Harap diisi'
  }
  if (isNaN(val)) {
    return 'Input must be a valid number.'
  }

  if (val <= 0) {
    return 'Input must be a positive number.'
  }
  return true
}

function setTipe (val) {
  console.log('tipe resep', val)
  store.cariObat('')
}

function obatSelected (val) {
  store.setForm('racikan', val?.racikan ?? false)

  store.setForm('satuan_kcl', val?.satuankecil ?? null)
  store.setForm('kodeobat', val?.kd_obat ?? null)
  store.setForm('namaobat', val?.namaobat ?? null)
  store.setForm('kandungan', val?.kandungan ?? null)
  store.setForm('kekuatandosis', val?.kekuatandosis ?? null)
  store.setForm('fornas', val?.fornas ?? null)
  store.setForm('forkit', val?.forkit ?? null)
  store.setForm('generik', val?.generik ?? null)
  store.setForm('kode108', val?.kode108 ?? null)
  store.setForm('kode50', val?.kode50 ?? null)
  store.setForm('jenis_perbekalan', val?.jenis_perbekalan ?? null) // pembatasan
  store.setForm('kodedepo', store.dpPar)
  // refQty.value?.focus()
  // refQty.value?.select()
}

function obatEnter (val) {
  refQty.value?.focus()
  refQty.value?.select()
}

function qtyEnter () {
  // if (parseFloat(store.form.jumlah_diminta) > 1)
  compSigna?.value?.refSigna.value.focus()
  // compSigna?.value?.refSigna.value.showPopup()
}

function signaEnter () {
  refKonsumsi.value.focus()
  // refKonsumsi.value.select()
}

function konsumsiEnter () {
  refKet.value.focus()
  // refKet.value.select()
}

// eslint-disable-next-line no-unused-vars
const persiapan = shallowRef(defineAsyncComponent(() => import('../comp/PersiapanOperasi.vue')))
function openPersiapanOperasi () {
  permintaan.isOpen = true
  permintaan.setPasien(props.pasien)
  // console.log('props pasien', props.pasien)
}

const setJumlah = (val) => {
  console.log('setJumlah', val)
}

onMounted(() => {
  resetChild()
  compCariObat?.value?.refObat?.value?.focus()
  // store.cariObat()
})

function resetChild () {
  store.form = {
    racikan: false,
    tiperacikan: null,
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
    kodedepo: store.dpPar
  }
  store.namaObat = null
  store.signa = null

  setTimeout(() => {
    resetValidation()
  }, 100)
}

function resetValidation () {
  compSigna?.value?.refSigna?.reset()
  compCariObat?.value?.refObat?.reset()
  compSigna?.value?.refSigna?.resetValidation()
  compCariObat?.value?.refObat?.resetValidation()
  compSigna?.value?.refSigna?.resetValidation()
  compCariObat?.value?.refObat?.resetValidation()
  // console.log('is-reset', compSigna.value.refSigna)
  compCariObat?.value?.refObat?.focus()
  emits('resetDone')
}

watchEffect(() => {
  // store.pasien = props?.pasien
  store.depo = props?.depo
  // console.log('pasi', props.pasien)
  if (props.isReset) {
    resetChild()
    // resetValidation()
  }
})
</script>
