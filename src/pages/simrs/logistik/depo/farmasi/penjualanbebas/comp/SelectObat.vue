<template>
  <q-select
    ref="refObat"
    outlined
    dense
    use-input
    hide-selected
    fill-input
    input-debounce="200"
    :rules="[obatValid]"
    :options="options"
    @filter="filterFn"
    placeholder="Min 3 character untuk pencarian obat"
    option-label="namaobat"
    option-value="kodeobat"
    autocomplete="namaobat"
    autofocus
    class="full-width"
    hide-bottom-space
    hide-dropdown-icon
    no-error-icon
    @update:model-value="obatSelected"
  >
    <template #prepend>
      <q-icon name="icon-mat-search" />
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps" class="row items-end">
        <div
          v-if="scope.opt.namaobat"
        >
          {{ scope.opt.namaobat }}
        </div>
        <div
          v-if="scope.opt.kandungan"
          :class="scope.opt.alokasi<=0?'f-10 q-ml-xs q-mr-xs':'q-ml-xs q-mr-xs text-deep-orange'"
        >
          ({{ scope.opt.kandungan }})
        </div>
        <div
          v-if="scope.opt.alokasi >0"
          class="q-ml-xs text-weight-bold text-green"
        >
          {{ scope.opt.alokasi }} <span class="f-8">(tersedia)</span>
        </div>
        <div
          v-if="scope.opt.alokasi <=0"
          class="q-ml-xs text-weight-bold text-negative f-14"
        >
          {{ scope.opt.alokasi }} <span class="f-8">(habis)</span>
        </div>
        <div
          v-if="scope.opt.satuankecil"
          :class="scope.opt.alokasi<=0?'f-10 q-ml-xs':'q-ml-xs text-primary'"
        >
          {{ scope.opt.satuankecil }}
        </div>
      </q-item>
      <q-separator />
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'

import { ref } from 'vue'
const emits = defineEmits(['form'])
const props = defineProps({
  depo: { type: String, default: '' }
})
const form = {}
function setForm (key, val) {
  form[key] = val
}
// ngisi form
const refObat = ref(null)
function obatSelected (val) {
  console.log('select obat', val)
  if (val?.alokasi <= 0) {
    notifErrVue('Stok Alokasi sudah habis, silahkan pilih obat yang lain')
  }
  refObat.value.validate()
  console.log('obat selected', val)
  setForm('satuan_kcl', val?.satuankecil ?? '-')
  setForm('kodeobat', val?.kdobat ?? '-')
  setForm('kandungan', val?.kandungan ?? '-')
  setForm('fornas', val?.fornas ?? '-')
  setForm('forkit', val?.forkit ?? '-')
  setForm('generik', val?.generik ?? '-')
  setForm('kode108', val?.kode108 ?? '-')
  setForm('uraian108', val?.uraian108 ?? '-')
  setForm('kode50', val?.kode50 ?? '-')
  setForm('uraian50', val?.uraian50 ?? '-')
  setForm('harga_beli', val?.harga_beli ?? 0)
  setForm('namaobat', val?.namaobat ?? 0)
  emits('form', form)
}
function obatValid (val) {
  return (val !== null && val !== '') || ''
}
const options = ref([])
async function filterFn (val, update, abort) {
  if (val.length < 3) {
    abort()
    return
  }

  const param = {
    kdruang: props.depo,
    q: val,
    groups: '2'
  }

  const params = { params: param }

  const resp = await api.get('v1/simrs/farmasinew/penjualanbebas/cari-obat', params)
  // console.log('resp', resp)
  const data = resp.data?.dataobat ?? []

  update(() => {
    // const needle = val?.toLowerCase()
    // options.value = data.length ? data?.filter(v => v?.namaobat.toLowerCase().indexOf(needle) > -1) : []
    options.value = data
  })
}

// eslint-disable-next-line no-unused-vars
// function highlightSearchTerm (label) {
//   const regex = new RegExp(store.namaObat, 'gi')
//   return label?.replace(regex, '<span class="txt-highlight">$&</span>')
// }

</script>
