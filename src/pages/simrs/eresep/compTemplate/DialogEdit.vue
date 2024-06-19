<template>
  <q-card style="width:460px;" class="shadow-4 bg-grey-2">
    <q-bar class="bg-primary text-white">
      <q-icon name="icon-mat-edit" />
      <div class="f-12">
        Ganti Obat ?
      </div>

      <q-space />

      <q-btn dense flat icon="icon-mat-close" v-close-popup>
        <q-tooltip>Close</q-tooltip>
      </q-btn>
    </q-bar>
    <q-form @submit="onSubmit">
      <q-card-section class="row q-col-gutter-sm">
        <cari-obat v-model="store.namaObat" ref="compCariObat" :edited="true" @enter="obatEnter" @selected="obatSelected" />
        <div v-if="!racikan">
          <q-input
            ref="refQty"
            v-model="store.form.jumlah_diminta"
            label="Jumlah"
            dense
            :rules="[numberValidationRule]"
            lazy-rules
            no-error-icon
            hide-bottom-space
            standout="bg-yellow-3"
            outlined
          />
        </div>
        <div v-else>
          <q-input
            ref="refQtyRacikan"
            v-model="store.formRacik.dosis"
            label="Jumlah"
            dense
            :rules="[numberValidationRule]"
            lazy-rules
            no-error-icon
            hide-bottom-space
            standout="bg-yellow-3"
            outlined
            @focus="showTooltipDosis = true"
            @blur="showTooltipDosis = false"
            @update:model-value="updateDosis"
            :hint="`Dosis : ${dosisNonDtd() ?? '-'}`"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" type="submit" dense class="q-px-md">
          Simpan Perubahan
        </q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'

import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'

const store = useTemplateEResepStore()
const CariObat = defineAsyncComponent(() => import('../compTemplate/CariObat.vue'))

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  indexItem: {
    type: Number,
    default: -1
  },
  racikan: {
    type: Boolean,
    default: false
  }
})
// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['close'])
const compCariObat = ref(null)
const refQty = ref(null)
const refQtyRacikan = ref(null)

onMounted(() => {
  // console.log('onMounted', props.item)
  initShow()
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

const initShow = () => {
  // console.log('init form', store.form)
  store.namaObat = null
}

const obatEnter = () => {
  console.log('obat enter')
  if (!props.racikan) {
    refQty.value?.focus()
    refQty.value?.select()
  }
  else {
    refQtyRacikan.value?.focus()
    refQtyRacikan.value?.select()
  }
}

const obatSelected = (val) => {
  if (!props.racikan) {
    store.form.kodeobat = val?.kd_obat
    store.form.namaobat = val?.namaobat
    store.form.satuan_kcl = val?.satuankecil
    store.form.fornas = val?.fornas
    store.form.forkit = val?.forkit
    store.form.generik = val?.generik
    store.form.kronis = val?.kronis
    store.form.prb = val?.prb
    store.form.psikotropika = val?.psikotropika
    store.form.kandungan = val?.kandungan
    store.form.kekuatandosis = val?.kekuatandosis
    store.form.kode108 = val?.kode108
    store.form.kode50 = val?.kode50
    store.form.signa = props.item?.row?.signa
    console.log('obat selected', store.form)
  }
  else {
    console.log('form racikan', val)
    store.formRacik.kodeobat = val?.kd_obat
    store.formRacik.namaobat = val?.namaobat
    store.formRacik.satuan_kcl = val?.satuankecil
    store.formRacik.fornas = val?.fornas
    store.formRacik.forkit = val?.forkit
    store.formRacik.generik = val?.generik
    store.formRacik.kronis = val?.kronis
    store.formRacik.prb = val?.prb
    store.formRacik.psikotropika = val?.psikotropika
    store.formRacik.kandungan = val?.kandungan
    store.formRacik.kekuatandosis = val?.kekuatandosis
    store.formRacik.kode108 = val?.kode108
    store.formRacik.kode50 = val?.kode50
    store.form.signa = props.item?.row?.signa
  }
}

function dosisNonDtd () {
  console.log('dosis non dtd', store.items[props.indexItem].satuan_kcl)
  const hitung = parseFloat(store.items[props.indexItem].jumlah_diminta) * parseFloat(store.formRacik?.dosis)
  const input = (store.items[props.indexItem].jumlah_diminta) + ' x ' + (store.formRacik?.dosis ?? '') + ' = ' + (hitung ?? '0') + ' ' + (store.formRacik?.satuan_kcl ?? '')
  return input
}

function updateDosis () {
  const hitung = parseFloat(store.items[props.indexItem].jumlah_diminta) * parseFloat(store.formRacik?.dosis)
  store.formRacik.jumlah_diminta = hitung
}

function onSubmit () {
  // console.log('saveform', store.form)
  if (!props.racikan) {
    for (const [key, value] of Object.entries(store.form)) {
      store.items[props.item.rowIndex][key] = value
    }
  }
  else {
    for (const [key, value] of Object.entries(store.formRacik)) {
      // console.log('racikan', store.items[props.indexItem].rincian[props.item.rowIndex][key])
      store.items[props.indexItem].rincian[props.item.rowIndex][key] = value
    }
  }

  store.updateListItems()
    .then(() => {
      emits('close')
    })
}
</script>
