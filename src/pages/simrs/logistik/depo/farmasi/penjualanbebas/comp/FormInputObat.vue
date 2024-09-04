<template>
  <div class="row justify-end q-mr-md full-width q-mb-lg">
    <div class="col-auto">
      <q-btn
        push
        color="deep-orange"
        no-caps
        label="Simpan dan Selesai"
        :loading="store.loadingSimpan"
        :disable="store.loadingSimpan"
        @click="simpan"
      >
        <q-tooltip>Simpan Resep dan Selesai</q-tooltip>
      </q-btn>
    </div>
  </div>
  <div class="row no-wrap justify-bentween items-center full-width">
    <div class="col-6">
      <div class="row no-wrap q-col-gutter-xs items-center">
        <div class="col-auto">
          <selectObat
            ref="refObat"
            v-model="obat"
            :depo="depo"
            :tipe="tipe"
            @form="setObat"
          />
        </div>

        <div v-if="tipe!=='rs'" class="col-auto">
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
          <app-input
            ref="refJumlah"
            v-model="store.tempObat.jumlah"
            label="Jumlah"
            outlined
            def-err=""
            @update:model-value="setJumlah($event,'jumlah')"
            @keyup.enter.prevent="tambah"
          />
        </div>
        <div class="col-auto">
          {{ store.tempObat?.satuan_k }}
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="row no-wrap q-col-gutter-xs items-center justify-end">
        <div class="col-auto">
          {{ isNaN(formatDouble(store.form?.harga_jual))?0: 'Rp. '+formatDouble(store.form?.harga_jual,2) }}
        </div>
        <div class="col-auto">
          <q-btn
            round
            dense
            icon="icon-mat-add"
            color="primary"

            :loading="store.loadingSimpan"
            :disable="store.loadingSimpan"
            @click="tambah"
          >
            <q-tooltip>Tambah Obat</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
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

const refObat = ref(null)
const refJumlah = ref(null)

const depo = computed(() => {
  const kode = apps?.user?.kdruangansim
  console.log('p', kode)
  return kode
})
function setObat (val) {
  const keys = Object.keys(val)
  keys.forEach(k => {
    store.setTemp(k, val[k])
  })
  console.log('form', store.form)

  if (refSigna.value) refSigna.value?.focus()
  else refJumlah.value?.refInput.focus()
  refObat.value?.$refs?.refObat.blur()
}
function setJumlah (evt, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 2)) ? evt : parseFloat(evt))
  store.setTemp(key, nilai)
  if (store.tempObat?.harga_beli > 0 && store.form?.margin > 0) store.setTemp('harga_jual', ((nilai * ((store.form.margin / 100) * store.tempObat.harga_beli))))
  if (key === 'jumlah' && parseFloat(evt) > parseFloat(store.tempObat?.alokasi)) {
    store.setTemp(key, store.tempObat?.alokasi)
    return notifErrVue('maksimal jumlah adalah ' + store.tempObat?.alokasi)
  }
  if (props.tipe === 'rs') {
    store.setTemp('konsumsi', store.tempObat?.jumlah) // set default konsumsi
  }
  else {
    const konsumsi = parseFloat(store.tempObat?.konsumsiPerHari) / parseFloat(store.tempObat?.jumlah)
    store.setTemp('konsumsi', isNaN(konsumsi) ? 1 : konsumsi) // set default konsumsi
  }
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
  console.log('signa', val)
  store.setTemp('aturan', val?.signa)
  store.setTemp('konsumsiPerHari', val?.jumlah)
  // const sign = store.signas.filter(sig => sig.signa === val?.signa)
  // if (sign.length) {
  // store.setTemp('jumlahdosis', parseFloat(val?.jumlah))
  // if (parseFloat(store.tempObat.jumlah) > 0) {
  //   const kons = store.tempObat.jumlah / parseFloat(val?.jumlah)
  //   store.setTemp('konsumsi', kons)
  // }
  refSigna.value.validate()
  // }

  refSigna.value.blur()
  refJumlah.value?.refInput.focus()
}
function signaEnter () {
  if (!signaNewVal.value) {
    // refKet.value.focus()
    // refKet.value.select()
    // console.log('signa enter')
  }
}
// signa end ---
function tambah () {
  console.log('tambah', store.tempObat)
  if (parseFloat(store.tempObat?.jumlah) <= 0 || !store.tempObat?.jumlah) return
  const index = store.form.details.findIndex(f => f.kodeobat === store.tempObat.kodeobat)
  if (index >= 0)store.form.details[index] = store.tempObat
  else store.form.details.push(store.tempObat)
  store.tempObat = {}
  signa.value = null
  obat.value = null

  refJumlah.value?.refInput.blur()
  refObat.value?.$refs?.refObat.focus()

  refSigna.value?.resetValidation()
  refObat.value?.$refs?.refObat.resetValidation()
  refJumlah.value?.refInput.resetValidation()
  // store.simpan()
}

// eslint-disable-next-line no-unused-vars
function simpan () {
  if (!store.form?.kode_identitas) return notifErrVue('silahkan isi terlebih dahulu identitas pembeli')
  const kode = store.form.details.map(m => m.kodeobat)
  store.setForm('kode', kode)
  console.log('simpan')
  store.simpan()
}
onMounted(() => {
  if (props.tipe === 'rs') store.setForm('margin', 20)
  else store.setForm('margin', 10)
  console.log('props', props.tipe)
})
// signa end ----
</script>
