<template>
  <div class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-auto" style="min-width: 50%;">
        <q-select
          v-model="modelKu"
          outlined
          dense
          use-input
          fill-input
          input-debounce="200"
          label="Cari NIK / Nama (Daftar Kunjungan Penjualan)"
          option-label="nama"
          option-value="nik"
          :options="optionModelKunjs"
          hide-dropdown-icon
          hide-selected
          :disable="store.form.details.length>0"
          @filter="filterKunj"
          @update:model-value="modelKunjSelected"
          @clear="clearModelKunj"
        >
          <template v-if="modelKu" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="modelKu = null" class="cursor-pointer" @click="clearModelKunj" />
          </template>
        </q-select>
      </div>
      <div class="col-auto" style="min-width: 50%;">
        <q-select
          v-model="model"
          outlined
          dense
          use-input
          fill-input
          input-debounce="200"
          label="Cari NIK / RM / Nama (Daftar Pasien)"
          option-label="nama"
          option-value="nik"
          :options="optionModels"
          hide-dropdown-icon
          hide-selected
          :disable="store.form.details.length>0"
          @filter="filterRsLain"
          @update:model-value="modelSelected"
          @clear="clearModel"
        >
          <template v-if="model" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="model = null" class="cursor-pointer" @click="clearModel" />
          </template>
        </q-select>
      </div>
    </div>
    <div class="row q-mt-xs q-col-gutter-sm">
      <div class="col-4">
        <app-input
          v-model="store.form.kode_identitas"
          label="Kode Identitas (NIK)"
          :disable="store.form.details.length>0"
          outlined
        />
      </div>
      <div class="col-4">
        <app-input
          v-if="inputNama"
          v-model="store.form.nama"
          :disable="store.form.details.length>0"
          label="Nama"
          @update:model-value="ketikNama"
          outlined
        />
      </div>
      <div class="col-1">
        <app-btn
          v-if="!inputNama"
          label="Input Nama"
          :disable="store.form.details.length>0"
          @click="inputNama=true"
        />
        <app-btn
          v-if="inputNama"
          label="Tutup"
          :disable="store.form.details.length>0"
          @click="inputNama=false"
        />
      </div>
    </div>

    <div class="row q-py-sm">
      <forminput tipe="umum" @simpan="afterSimpan" />
    </div>
    <div class="row q-py-sm">
      <listbelum tipe="umum" />
    </div>
  </div>
</template>
<script setup>
import { usePenjualanBebasFarmasiStore } from 'src/stores/simrs/farmasi/penjualanbebas/penjualanbebas'
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'
const store = usePenjualanBebasFarmasiStore()

const forminput = shallowRef(defineAsyncComponent(() => import('./FormInputObat.vue')))
const listbelum = shallowRef(defineAsyncComponent(() => import('./ListObatBelum.vue')))

const inputNama = ref(false)

const model = ref(null)
const optionModels = ref([])

function filterRsLain (val, update) {
  store.setForm('kode_identitas', null)

  console.log(val)
  const ada = store.pasiens.filter(f => f?.nama?.toLowerCase()?.includes(val?.toLowerCase()))
  if (ada.length > 3) update(() => { optionModels.value = ada })
  else {
    store.getPasien(val).then(() => {
      optionModels.value = store.pasiens
      update(() => {
        optionModels.value = store.pasiens
      })
    })
  }
}

function modelSelected (val) {
  console.log('selected', val, model.value)
  store.setForm('kode_identitas', val.nik)
  store.setForm('nama', val.nama)
  modelKu.value = null
}
function clearModel (val) {
  console.log('clear', val)
  store.setForm('kode_identitas', null)
  store.setForm('nama', null)
  model.value = null
}

const modelKu = ref(null)
const optionModelKunjs = ref([])
function filterKunj (val, update) {
  store.setForm('kode_identitas', null)
  console.log(val)
  const ada = store.kunjungans.filter(f => f?.nama?.toLowerCase()?.includes(val?.toLowerCase()))
  if (ada.length > 3) update(() => { optionModelKunjs.value = ada })
  else {
    store.getKunjungan(val).then(() => {
      optionModelKunjs.value = store.kunjungans
      update(() => {
        optionModelKunjs.value = store.kunjungans
      })
    })
  }
}

function modelKunjSelected (val) {
  model.value = null
  store.setForm('kode_identitas', val.kode_identitas)
  store.setForm('nama', val.nama)
}
function clearModelKunj (val) {
  console.log('clear', val)
  store.setForm('kode_identitas', null)
  store.setForm('nama', null)
  modelKu.value = null
}

function ketikNama (val) {
  console.log('ketik nama', val)
  model.value = null
  modelKu.value = null
}
function afterSimpan () {
  store.setForm('kode_identitas', null)
  store.setForm('nama', null)
  model.value = null
  modelKu.value = null
}
onMounted(() => {
  store.setForm('kode_identitas', null)
  store.getPasien().then(() => {
    optionModels.value = store.pasiens
  })
  store.getKunjungan().then(() => {
    optionModelKunjs.value = store.kunjungans
  })
})
</script>
