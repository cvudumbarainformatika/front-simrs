<template>
  <q-form class="fit" ref="rincianNpd" @submit="onSubmit" @reset="onReset">
    <div class="row">
      <div class="q-pa-sm q-gutter-y-md" style="width: 50%">
        <app-autocomplete
          v-model="store.rinci.koderek50"
          label="Rekening Belanja"
          autocomplete="rincianbelanja"
          option-value="rek50"
          outlined
          :option-label="opt => Object(opt) === opt && 'rincianbelanja' in opt ? opt.rek50 + ' - ' + opt.rincianbelanja : 'Silahkan Dipilih'"
          :source="store.rekening50"
          @selected="(val)=>pilihRekening50(val)"
          :key="store.reqs.kodekegiatan"
          :valid="{required:true}"
        />
      </div>
      <div class="q-pa-sm q-gutter-y-md" style="width: 50%">
        <app-autocomplete
          v-model="store.rinci.itembelanja"
          label="Item Belanja"
          autocomplete="item"
          option-label="item"
          option-value="item"
          outlined
          :source="store.itembelanja"
          :valid="{required:true}"
        />
      </div>
      <app-autocomplete-new
        v-model="store.rinci.itembelanja"
        class="q-pa-sm q-gutter-y-md"
        style="width: 25%"
        label="Volume Item"
        autocomplete="volume"
        option-label="volume"
        option-value="item"
        outlined
        readonly
        :source="store.itembelanja"
        :autofocus="false"
      />
      <app-autocomplete-new
        v-model="store.rinci.itembelanja"
        class="q-pa-sm q-gutter-y-md"
        style="width: 25%"
        label="Satuan Item"
        autocomplete="satuan"
        option-label="satuan"
        option-value="item"
        outlined
        readonly
        :source="store.itembelanja"
        :autofocus="false"
      />
      <app-autocomplete-new
        v-model="store.rinci.itembelanja"
        class="q-pa-sm q-gutter-y-md"
        style="width: 25%"
        label="Harga Item"
        autocomplete="harga"
        option-label="harga"
        option-value="item"
        outlined
        readonly
        :source="store.itembelanja"
        :autofocus="false"
      />
      <app-autocomplete-new
        v-model="store.rinci.itembelanja"
        class="q-pa-sm q-gutter-y-md"
        style="width: 25%"
        label="Total Pagu Anggaran"
        autocomplete="pagu"
        option-label="pagu"
        option-value="item"
        outlined
        readonly
        :source="store.itembelanja"
        :autofocus="false"
      />
    </div>
    <div class="q-pa-xs q-gutter-y-xs">
      <app-btn
        type="button"
        label="Simpan Rincian"
        :disable="store.loading"
        :loading="store.loading"
        @click="simpanRinci()"
      />
    </div>
  </q-form>
</template>

<script setup>
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { ref } from 'vue'

const rincianNpd = ref()
const store = formNotaPermintaanDanaLS()

function simpanRinci () {
  store.form.rincians.push(store.rinci)

  console.log('rincian', store.form)
}
// function onSimpan () {
//   store.simpanNpdls()
//   // .then(() => {
//   //   store.emptyForm()
//   // })
// }
function pilihRekening50 (val) {
  const arr = store.rekening50
  const obj = arr.length ? arr.find(x => x.rek50 === val) : null
  store.rinci.koderek50 = obj?.rek50 ?? ''
  store.rinci.rincianbelanja = obj?.rincianbelanja ?? ''
  store.reqs.kodekegiatan = obj?.kodekegiatan ?? ''
}
const onSubmit = () => {
  store.simpanNpdls()
    .then(() => {
      if (rincianNpd.value != null) {
        rincianNpd.value.resetValidation()
      }
    })
}
</script>
