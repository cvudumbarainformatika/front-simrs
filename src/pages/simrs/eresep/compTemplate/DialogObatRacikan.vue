<template>
  <q-dialog
    persistent backdrop-filter="blur(4px)"
    @before-show="initShow" @hide="initShow"
  >
    <q-card style="width:460px;">
      <q-bar>
        <q-icon name="icon-mat-add" />
        <div>Racik Obat {{ store.form.tiperacikan }}</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-weight-bold q-mb-sm">
            <em>Bahan Obat </em>{{ store.form.jumlah_diminta }} {{ store.form.satuan_kcl }} Racikan
          </div>
          <cari-obat v-model="store.namaObat" ref="compCariObat" @enter="obatEnter" @selected="obatSelected" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-sm items-center">
            <div v-if="store.form.tiperacikan === 'DTD'" class="col-6">
              <q-input
                ref="refJml"
                v-model="store.formRacik.dosis"
                label="Dosis Obat"
                standout="bg-yellow-3"
                dense
                outlined
                :rules="[dosisValid]"
                @focus="showTooltipDosis = true"
                @blur="showTooltipDosis = false"
                @update:model-value="updateDosis"
                :hint="`Dosis : ${dosisNonDtd() ?? '-'}`"
              >
                <app-tooltip v-model="showTooltipDosis" no-parent-event arrow="top" anchor="bottom middle" self="top middle">
                  <div><strong>Masukkan Jumlah Obat yang diinginkan</strong></div>
                  <!-- <div><em>Kekuatan Dosis Obat adalah <strong>{{ store?.formRacik?.kekuatandosis }}</strong></em></div> -->
                  <div>jumlah obat boleh <strong>bilangan bulat</strong> atau <strong>desimal</strong></div>
                  <div>Misal : <strong>1 </strong> atau <strong>1.5</strong> atau <strong>0.25</strong></div>
                </app-tooltip>
              </q-input>
            </div>
            <div class="col-6">
              <q-input
                ref="refDiminta"
                v-model="store.formRacik.jumlah_diminta"
                label="Jumlah Obat"
                standout="bg-yellow-3"
                :rules="[numberValidationRule]"
                dense
                outlined
                @focus="showTooltipJumlah = true"
                @blur="showTooltipJumlah = false"
                :readonly="store.formRacik?.tiperacikan === 'non-DTD'"
                :hint="`Satuan : ${store.formRacik?.satuan_kcl ?? '-'}`"
              >
                <app-tooltip v-model="showTooltipJumlah" no-parent-event arrow="top" anchor="bottom middle" self="top middle">
                  <div><strong>Masukkan Jumlah Obat</strong></div>
                  <div><strong>untuk {{ store.form.jumlah_diminta }} {{ store.form.satuan_kcl }}</strong> Obat Racikan</div>
                  <div><em>Masukkan Bilangan BULAT atau DESIMAL</em></div>
                  <div>Misal : <strong>1 </strong> atau <strong>1.5</strong> atau <strong>0.25</strong></div>
                </app-tooltip>
              </q-input>
            </div>
            <div class="col-12">
              <!-- <div v-if="store.formRacik.dosis">
                Dosis : <em>{{ dosisNonDtd() }}</em>
              </div> -->
              <q-input
                ref="refKet"
                v-model="store.formRacik.keterangan"
                label="Keterangan Tambahan"
                standout="bg-yellow-3"
                dense
                outlined
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn color="dark" flat v-close-popup>
            Cancel
          </q-btn>
          <q-btn color="primary" type="submit">
            Simpan
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'

const CariObat = defineAsyncComponent(() => import('../compTemplate/CariObat.vue'))
const store = useTemplateEResepStore()

const compCariObat = ref(null)
const refJml = ref(null)
const refDiminta = ref(null)
const showTooltipDosis = ref(false)
const showTooltipJumlah = ref(false)

const emits = defineEmits(['simpan'])

function obatSelected (val) {
  console.log(val)
  store.formRacik = {
    dosis: val?.dosis ?? null,
    forkit: val?.forkit ?? null,
    fornas: val?.fornas ?? null,
    generik: val?.generik ?? null,
    kronis: val?.kronis ?? null,
    kekuatandosis: val?.kekuatandosis ?? null,
    jumlah_diminta: val?.jumlah_diminta ?? null,
    kodeobat: val?.kd_obat ?? null,
    namaobat: val?.namaobat ?? null,
    satuan_kcl: val?.satuankecil ?? null,
    kode108: val?.kode108 ?? null,
    kode50: val?.kode50 ?? null,
    keterangan: val?.keterangan ?? null
  }
  // store.formRacik.dosis = null
}

function obatEnter () {
  console.log('obat enter')
  if (store.form.tiperacikan === 'DTD') {
    refJml.value.focus()
    refJml.value.select()
  }
  else {
    refDiminta.value.focus()
    refDiminta.value.select()
  }
}

function initShow () {
  showTooltipDosis.value = false
  store.formRacik = {
    dosis: null,
    forkit: null,
    fornas: null,
    generik: null,
    kronis: null,
    jumlah_diminta: null,
    kodeobat: null,
    namaobat: null,
    kode108: null,
    kode50: null,
    satuan_kcl: null,
    keterangan: null
  }

  store.namaObat = null
}

function dosisNonDtd () {
  // console.log('dosis non dtd')
  const hitung = parseFloat(store.form?.jumlah_diminta) * parseFloat(store.formRacik?.dosis)
  const input = (store.form?.jumlah_diminta) + ' x ' + (store.formRacik?.dosis ?? '') + ' = ' + (hitung ?? '0') + ' ' + (store.formRacik?.satuan_kcl ?? '')
  return input
}

function updateDosis () {
  const hitung = parseFloat(store.form?.jumlah_diminta) * parseFloat(store.formRacik?.dosis)
  store.formRacik.jumlah_diminta = hitung
}

function dosisValid (val) {
  return (val !== null && val !== '') || ''
}

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

function onSubmit () {
  console.log('simpan', store.formRacik)
  emits('simpan', store.formRacik)
}
</script>
