<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-auto" style="min-width: 50%;">
        <q-select
          v-model="karyawan"
          outlined
          dense
          use-input
          fill-input
          input-debounce="200"
          label="Cari Karyawan"
          option-label="nama"
          option-value="nik"
          :options="optionKaryawans"
          hide-dropdown-icon
          hide-selected
          @filter="filterRsLain"
          @update:model-value="rsSelected"
          @clear="clearSl"
        >
          <template v-if="karyawan" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="karyawan = null" class="cursor-pointer" @click="clearSl" />
          </template>
        </q-select>
      </div>
    </div>

    <div class="row q-py-sm">
      <forminput tipe="kar" />
    </div>
    <div class="row q-py-sm">
      <listbelum tipe="kar" />
    </div>
  </div>
</template>
<script setup>
import { usePenjualanBebasFarmasiStore } from 'src/stores/simrs/farmasi/penjualanbebas/penjualanbebas'
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'
const store = usePenjualanBebasFarmasiStore()
const karyawan = ref(null)
const optionKaryawans = ref([])

const forminput = shallowRef(defineAsyncComponent(() => import('./FormInputObat.vue')))
const listbelum = shallowRef(defineAsyncComponent(() => import('./ListObatBelum.vue')))

function filterRsLain (val, update) {
  console.log(val)
  const ada = store.karyawans.filter(f => f?.nama?.toLowerCase()?.includes(val?.toLowerCase()))
  if (ada.length > 3) update(() => { optionKaryawans.value = ada })
  else {
    store.getKaryawan(val).then(() => {
      optionKaryawans.value = store.karyawans
      update(() => {
        optionKaryawans.value = store.karyawans
      })
    })
  }
}
function rsSelected (val) {
  console.log('selected', val, karyawan.value)
  store.setForm('kode_identitas', val.nik)
  store.setForm('nama', val.nama)
}
function clearSl (val) {
  console.log('clear', val)
  store.setForm('kode_identitas', null)
  store.setForm('nama', null)
  karyawan.value = null
}

onMounted(() => {
  store.getKaryawan().then(() => {
    optionKaryawans.value = store.karyawans
  })
})
</script>
