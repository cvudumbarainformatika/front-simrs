<template>
  <q-select
    ref="refAutocomplete"
    outlined
    dense
    use-input
    hide-selected
    fill-input
    input-debounce="200"
    :rules="[obatValid]"
    :options="options"
    @filter="filterFn"
    placeholder="Min 2 character untuk pencarian diagnosa"
    :option-label="opt => Object(opt) === opt && 'icd' in opt ? opt.icd + ' - ' + opt.keterangan : '- Null -'"
    option-value="icd"
    autocomplete="keterangan"
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
        <div> {{ scope.opt?.icd + ' - '+scope.opt?.keterangan }}</div>
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
// import { notifErrVue } from 'src/modules/utils'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'

import { ref } from 'vue'

const store = usePermintaanEResepStore()
// ngisi form
const refAutocomplete = ref(null)
function obatSelected (val) {
  console.log('selected', val)
}
function obatValid (val) {
  return true
  // return (val !== null && val !== '') || ''
}
const options = ref([])
async function filterFn (val, update, abort) {
  if (val.length < 2) {
    abort()
    return
  }

  const params = {
    q: val
  }

  const param = { params }

  const resp = await api.get('v1/simrs/master/diagnosa-autocomplete', param)
  console.log('resp', resp.data)
  const data = resp.data

  update(() => {
    // const needle = val?.toLowerCase()
    // options.value = data.length ? data?.filter(v => v?.namaobat.toLowerCase().indexOf(needle) > -1) : []
    options.value = data
  })
}

// eslint-disable-next-line no-unused-vars
function highlightSearchTerm (label) {
  const regex = new RegExp(store.namaObat, 'gi')
  return label?.replace(regex, '<span class="txt-highlight">$&</span>')
}

</script>
