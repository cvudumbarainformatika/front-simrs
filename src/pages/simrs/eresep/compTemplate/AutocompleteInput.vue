<template>
  <q-select
    ref="refSigna"
    label="Aturan Pakai / Signa"
    use-input
    fill-input
    hide-selected
    dense
    clearable
    standout="bg-yellow-3"
    option-label="signa"
    option-value="signa"
    autocomplete="signa"
    outlined
    no-error-icon
    input-debounce="100"
    @filter="filterFn"
    hide-bottom-space
    hide-dropdown-icon
    :rules="[signaValid]"
    :options="options"
    @new-value="signaCreateValue"
    @update:model-value="signaSelected"
    @focus="showTooltip = true"
    @blur="showTooltip = false"
  >
    <!-- <q-tooltip v-model="showTooltip" anchor="center right" self="center left" :offset="[10, 10]">
      <div class="bg-primary text-white q-pa-md">
        <div><strong>Informasi Pencarian SIGNA</strong></div>
        <div><em>Jika ... pada pencarian tidak di temukan</em></div>
        <div><strong>Tekan Enter</strong> untuk <strong>simpan data SIGNA BARU</strong></div>
        <div>setelah mengisi inputan </div>
      </div>
    </q-tooltip> -->
    <app-tooltip v-model="showTooltip" arrow="left" anchor="center right" self="center left">
      <div><strong>Informasi Pencarian SIGNA</strong></div>
      <div><em>Jika ... pada pencarian <strong>tidak</strong> di temukan</em></div>
      <div><strong>Tekan Enter</strong> untuk <strong>simpan data SIGNA BARU</strong></div>
      <div>setelah mengisi inputan </div>
    </app-tooltip>
  </q-select>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { onMounted, ref } from 'vue'

const refSigna = ref(null)
const store = useTemplateEResepStore()
const options = ref([])

const showTooltip = ref(false)

const emits = defineEmits(['done'])
defineExpose({
  refSigna
})

onMounted(async () => {
  const signas = await getSigna()
  options.value = signas
})

const signaValid = (val) => {
  return (val !== null && val !== '') || ''
}

const signaSelected = (val) => {
  // console.log('signa', val)
  store.setForm('signa', val?.signa)
  refSigna.value.validate()
  emits('done')
}

const signaCreateValue = (val, done) => {
  console.log('signa new val', val)

  // signaNewVal.value = true
  let newSigna = ''
  if (val.includes('x')) {
    const anu = val.split('x')
    // console.log('anu', anu)
    if (anu?.length) {
      const satu = anu[0]
      const temp = anu[1].slice(0, 4).split('')
      const num = temp.filter(a => !isNaN(parseFloat(a)))
      store.fromSigna.jumlah = satu * num[0] ?? 1
      // console.log('temp', temp, num, isNaN(parseFloat(temp[0])))
      const depan = anu[0] + ' x ' + anu[1]
      if (anu?.length === 2) {
        newSigna = depan
      }
      else {
        const temp = anu
        const belakang = temp.slice(2).join(' x ')
        // console.log('dep', temp, '--->', depan, ' -- ', belakang)
        newSigna = depan + belakang
      }
    }
  }
  else newSigna = val
  store.fromSigna.signa = newSigna
  store.seveSigna()
  emits('done')
  done(newSigna, 'add-unique')
}

async function filterFn (val, update, abort) {
  if (val.length < 1) {
    abort()
    return
  }

  const data = await getSigna(val)
  // console.log('resp', data)

  update(() => {
    options.value = data
  })
}

async function getSigna (val) {
  const params = {
    params: {
      q: val ?? ''
    }
  }

  const resp = await api.get('v1/simrs/master/signa/get-signa-autocomplete', params)
  return resp.data ?? []
}
</script>
