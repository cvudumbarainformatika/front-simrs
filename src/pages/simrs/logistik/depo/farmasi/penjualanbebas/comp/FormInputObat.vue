<template>
  <div class="row no-wrap q-col-gutter-xs items-center">
    <div class="col-auto">
      <selectObat
        v-model="obat"
        :depo="depo"
        @form="setObat"
      />
    </div>
    <div class="col-auto">
      <app-input
        v-model="store.form.jumlah"
        label="Jumlah"
        outlined
        @update:model-value="setJumlah($event,'jumlah')"
      />
    </div>
    <div class="col-auto">
      <q-select
        ref="refSigna"
        v-model="signa"
        label="Aturan Pakai"
        use-input
        fill-input
        hide-selected
        dense
        clearable
        standout="bg-yellow-3"
        option-label="signa"

        outlined
        :rules="[sigaValid]"
        lazy-rules
        no-error-icon
        hide-bottom-space
        hide-dropdown-icon
        @filter="store.getSigna"
        :options="store.signas"
        @new-value="signaCreateValue"
        @update:model-value="signaSelected"
        @keyup.enter.stop="signaEnter"
      />
    </div>
    <div class="col-auto">
      {{ isNaN(formatDouble(store.form?.harga_jual))?0:formatDouble(store.form?.harga_jual) }}
    </div>
  </div>
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePenjualanBebasFarmasiStore } from 'src/stores/simrs/farmasi/penjualanbebas/penjualanbebas'
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'

const props = defineProps({
  tipe: { type: String, default: '' }
})
const apps = useAplikasiStore()
const obat = ref(null)
const selectObat = shallowRef(defineAsyncComponent(() => import('./SelectObat.vue')))
const store = usePenjualanBebasFarmasiStore()
const depo = computed(() => {
  const kode = apps?.user?.kdruangansim
  console.log('p', kode)
  return kode
})
function setObat (val) {
  const keys = Object.keys(val)
  keys.forEach(k => {
    store.setForm(k, val[k])
  })
  console.log('form', store.form)
}
function setJumlah (evt, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 2)) ? evt : parseFloat(evt))
  store.setForm(key, nilai)
  // if(store.form?.harga_beli>0 && store.form?.margin>0) store.setForm(harga_jual,(nilai*()))
  console.log('set jumlah', nilai)
}
// signa start ----
const signa = ref('')
const signaNewVal = ref(false)
const refSigna = ref(null)

function sigaValid (val) {
  return (val !== null && val !== '') || ''
}
function signaCreateValue (val, done) {
  signaNewVal.value = true
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
  done(store.fromSigna)

  // console.log('signa new val', signa.value)
}
function signaSelected (val) {
  // console.log('signa', val)
  store.setForm('aturan', val?.signa)
  // const sign = store.signas.filter(sig => sig.signa === val?.signa)
  // if (sign.length) {
  store.setForm('jumlahdosis', parseFloat(val?.jumlah))
  if (parseFloat(store.form.jumlah_diminta) > 0) {
    const kons = store.form.jumlah_diminta / parseFloat(val?.jumlah)
    store.setForm('konsumsi', kons)
  }
  refSigna.value.validate()
  // }
}
function signaEnter () {
  if (!signaNewVal.value) {
    // refKet.value.focus()
    // refKet.value.select()
    // console.log('signa enter')
  }
}
onMounted(() => {
  if (props.tipe === 'rs') store.setForm('margin', 20)
  console.log('props', props.tipe)
})
// signa end ----
</script>
