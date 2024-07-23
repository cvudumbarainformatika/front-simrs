<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-auto" style="min-width: 250px;">
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
        >
          <template v-if="rsl" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="rsl = null" class="cursor-pointer" />
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePenjualanBebasFarmasiStore } from 'src/stores/simrs/farmasi/penjualanbebas/penjualanbebas'
import { onMounted, ref } from 'vue'
const store = usePenjualanBebasFarmasiStore()
const rsl = ref(null)
const optionRs = ref([])

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
  store.setForm('kdpbf', val.kode)
}
onMounted(() => {
  store.getPihakTiga().then(() => {
    optionRs.value = store.pihakTigas
  })
})
</script>
