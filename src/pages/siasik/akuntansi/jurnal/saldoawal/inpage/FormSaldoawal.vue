<template>
  <q-form class="fit" ref="refsaldo" @submit="onSubmit" @reset="onReset">
    <div class="row">
      <div class="q-pa-sm q-gutter-y-md" style="width:50%">
        <app-autocomplete
          v-model="store.form.kodepsap13"
          label="Akun Rekening"
          autocomplete="uraian"
          option-value="kodeall3"
          outlined
          :source="store.akuns"
          :disable="store.loading"
          :loading="store.loading"
          :option-label="opt => Object(opt) === opt && 'kodeall3' in opt ? opt.kodeall3 + ' - ' + opt.uraian : 'Silahkan Dipilih'"
          @selected="(val)=>{
            const arr = store.akuns
            const cari = arr.find(x => x.kodeall3 === val)
            store.form.uraianpsap13 = cari.uraian
          }"
        />
      </div>
      <div class="q-pa-sm q-gutter-y-md" style="width:25%">
        <app-input-simrs
          v-model="store.form.debit"
          label="Debit"
          :valid="{required:true, number:true}"
          :autofocus="false"
          @update:model-value="() => {
            if( store.form.debit > 0){
              store.form.debetkredit = 'Debet'
            }
          }"
        />
      </div>
      <div class="q-pa-sm q-gutter-y-md" style="width:25%">
        <app-input-simrs
          v-model="store.form.kredit"
          label="Kredit"
          :valid="{required:true, number:true}"
          :autofocus="false"
          @update:model-value="() => {
            if( store.form.kredit > 0){
              store.form.debetkredit = 'Kredit'
            }
          }"
        />
      </div>
    </div>
    <div class="row q-pa-sm flex-center">
      <app-btn
        label="Simpan Saldo"
        :disable="store.loading"
        :loading="store.loading"
        @click="onSimpan()"
      />
    </div>
  </q-form>
</template>
<script setup>
import { saldoawalJurnal } from 'src/stores/siasik/akuntansi/jurnal/saldoawal'
import { onMounted, ref } from 'vue'
// eslint-disable-next-line no-unused-vars
const refsaldo = ref([])
const store = saldoawalJurnal()

onMounted(() => {
  store.getRekening()
  // store.getDataTable()
})
// const formReff = ref(null)
function onSimpan () {
  store.saveSaldo().then(() => {
    store.emptyForm()
  })
}
const onSubmit = () => {
  store.saveSaldo().then(() => {
    if (refsaldo.value != null) {
      refsaldo.value.resetValidation()
    }
  })
}
const onReset = () => {
  refsaldo.value.resetValidation()
  // store.setOpen()
}
</script>
