<template>
  <q-select
    ref="refObat"
    outlined
    dense
    use-input
    fill-input
    hide-selected
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
    @keyup.enter.stop="emits('enter')"
    @focus="focused()"
    @blur="showTooltip = false"
    @input-value="inputCari"
  >
    <template #prepend>
      <q-icon name="icon-mat-search" />
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps" class="column" :style="`max-width: ${width}px`">
        <div
          class="text-weight-bold q-my-xs"
        >
          <span v-html="highlightText(scope.opt?.namaobat)" />
          <span class="text-teal q-ml-sm">{{ scope.opt.satuankecil ?? '-' }}</span>
        </div>
        <div>
          Kandungan : <span class="text-deep-orange" v-html="highlightText(scope.opt?.kandungan)" />
        </div>
        <!-- <div
          v-if="scope.opt.alokasi >0"
          class="q-ml-xs text-weight-bold text-green"
        >
          {{ scope.opt.alokasi }} <span class="f-8">(tersedia)</span>
        </div> -->
        <!-- <div
          v-if="scope.opt.alokasi <=0"
          class="q-ml-xs text-weight-bold text-negative f-14"
        >
          {{ scope.opt.alokasi }} <span class="f-8">(habis)</span>
        </div> -->
        <!-- <div
          v-if="scope.opt.satuankecil"
        >
          satuan kecil : <span class="text-teal">{{ scope.opt.satuankecil }}</span>
        </div> -->
        <div>
          category : <span class="text-primary">{{ scope.opt.forkit==='1' ? 'Forkit, ' : ' ' }}</span>
          <span class="text-teal">{{ scope.opt.fornas==='1' ? 'Fornas, ' : ' ' }}</span>
          <span class="text-deep-orange">{{ scope.opt.generik==='1' ? 'Generik, ' : ' ' }}</span>
          <span class="text-accent">{{ scope.opt.psikotropika==='1' ? 'Psikotropika, ' : ' ' }}</span>
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

    <!-- <q-tooltip v-model="showTooltip" anchor="center right" self="center left" :offset="[10, 10]">
      <div class="bg-primary text-white q-pa-md">
        <div><strong>Informasi Pencarian OBAT</strong></div>
        <div><em>pemilihan obat untuk <strong>TEMPLATE</strong> tidak berdasarkan <strong>ALOKASI STOK</strong></em></div>
        <div><em>Minimal 3 karakter untuk pencarian OBAT</em></div>
      </div>
    </q-tooltip> -->
    <app-tooltip v-model="showTooltip" no-parent-event arrow="left" anchor="center right" self="center left">
      <div><strong>Informasi Pencarian OBAT</strong></div>
      <div><em>pemilihan obat untuk <strong>TEMPLATE</strong> tidak berdasarkan <strong>ALOKASI STOK</strong></em></div>
    </app-tooltip>
  </q-select>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep.js'

import { onMounted, ref, watchEffect } from 'vue'

const store = useTemplateEResepStore()
// ngisi form
const refObat = ref(null)
const showTooltip = ref(false)
const width = ref(0)
const modVal = ref(null)

defineExpose({ refObat })

const props = defineProps({
  edited: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  console.log('ref obat', refObat.value?.$el?.clientWidth)
  width.value = refObat.value?.$el?.clientWidth
})

watchEffect(() => {
  width.value = refObat.value?.$el?.clientWidth
})

const emits = defineEmits(['enter', 'focus', 'blur', 'selected'])
function obatSelected (val) {
  refObat.value.validate()
  emits('selected', val)
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

  const depo = store.depos.filter(pa => pa.jenis === store.depo)
  // console.log('depo', store?.depo, depo)
  if (depo.length) {
    store.dpPar = depo[0]?.value
  }
  else return notifErrVue('depo tujuan tidak ditemukan')

  const param = {
    // groups: store?.pasien?.groups,
    // kdruang: store.dpPar,
    q: val,
    tiperesep: store.form.tiperesep
  }

  const params = { params: param }

  const resp = await api.get('v1/simrs/penunjang/farmasinew/templateeresep/cariobat', params)
  console.log('resp', resp)
  const data = resp.data?.dataobat ?? []

  update(() => {
    // const needle = val?.toLowerCase()
    // options.value = data.length ? data?.filter(v => v?.namaobat.toLowerCase().indexOf(needle) > -1) : []
    options.value = data
  })
}

const inputCari = (val) => {
  // console.log('input cari', val)
  if (!val) return
  modVal.value = val
}

// eslint-disable-next-line no-unused-vars
function highlightText (text) {
  // Implement your text highlighting logic here
  // For example, you can wrap the matching text in <span> with a specific style
  // console.log('text', text)
  return text.replace(new RegExp(modVal.value, 'ig'), matchedText => `<span class="bg-yellow text-dark">${matchedText}</span>`)
}

// eslint-disable-next-line no-unused-vars
function highlightSearchTerm (label) {
  const txt = modVal.value
  const regex = new RegExp(txt, 'ig')
  console.log('regex', label)
  return label?.replace(regex, '<span class="bg-yellow text-black">$&</span>')
}

function focused () {
  props.edited ? showTooltip.value = false : showTooltip.value = true
}

</script>

<style lang="scss" scoped>

</style>
