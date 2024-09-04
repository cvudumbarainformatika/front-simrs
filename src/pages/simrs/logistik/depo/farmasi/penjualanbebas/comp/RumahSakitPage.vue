<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-auto" style="min-width: 50%;">
        <q-select
          v-model="rsl"
          outlined
          dense
          use-input
          fill-input
          input-debounce="200"
          label="Cari Rumah Sakit"
          option-label="nama"
          option-value="kode"
          :options="optionRs"
          hide-dropdown-icon
          @filter="filterRsLain"
          @update:model-value="rsSelected"
          @clear="clearSl"
        >
          <template v-if="rsl" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="rsl = null" class="cursor-pointer" @click="clearSl" />
          </template>
        </q-select>
      </div>
    </div>
    <div class="row q-py-sm">
      <forminput tipe="rs" />
    </div>
    <div class="row q-py-sm">
      <listbelum tipe="rs" />
    </div>
  </div>
</template>
<script setup>
import { usePenjualanBebasFarmasiStore } from 'src/stores/simrs/farmasi/penjualanbebas/penjualanbebas'
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'
const store = usePenjualanBebasFarmasiStore()
const rsl = ref(null)
const optionRs = ref([])
const forminput = shallowRef(defineAsyncComponent(() => import('./FormInputObat.vue')))
const listbelum = shallowRef(defineAsyncComponent(() => import('./ListObatBelum.vue')))
function filterRsLain (val, update) {
  console.log(val)
  const ada = store.pihakTigas.filter(f => f?.nama?.toLowerCase()?.includes(val?.toLowerCase()))
  if (ada.length > 3) update(() => { optionRs.value = ada })
  else {
    store.getPihakTiga(val).then(() => {
      optionRs.value = store.pihakTigas
      update(() => {
        optionRs.value = store.pihakTigas
      })
    })
  }
}
function rsSelected (val) {
  console.log(val)
  store.setForm('kode_identitas', val.kode)
  store.setForm('nama', val.nama)
}
function clearSl (val) {
  console.log('clear', val)
  store.setForm('kode_identitas', null)
  store.setForm('nama', null)
}
onMounted(() => {
  store.getPihakTiga().then(() => {
    optionRs.value = store.pihakTigas
  })
})
</script>
