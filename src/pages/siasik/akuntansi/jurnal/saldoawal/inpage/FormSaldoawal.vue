<template>
  <q-form class="fit" ref="refsaldo" @submit="onSubmit" @reset="onReset">
    <div class="row">
      <div class="q-pa-sm q-gutter-y-md" style="width:50%">
        <!-- <app-autocomplete
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
        /> -->
        <q-select
          v-model="store.form.kodepsap13"
          label="Akun Rekening"
          use-input
          outlined
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          clearable
          autocomplete="uraian"
          option-value="kodeall3"
          :disable="store.loading"
          :loading="store.loading"
          :option-label="opt => Object(opt) === opt && 'kodeall3' in opt ? opt.kodeall3 + ' - ' + opt.uraian : ''"
          input-debounce="0"
          :options="options"
          @filter="filterFn"
          @clear="store.setFormSaldo('kodepsap13', null)"
          @update:model-value="(val)=>{
            const arr = store.akuns
            const cari = arr.find(x => x.kodeall3 === val)
            store.form.uraianpsap13 = cari.uraian
          }"
        >
          <template
            v-if="store.form.kodepsap13"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="store.setFormSaldo('kodepsap13', null)"
            />
          </template>
          <template v-else #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
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
        type="submit"
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
const options = ref([])

onMounted(() => {
  options.value = store.akuns
  store.getRekening()
  // store.getDataTable()
})
function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = store.akuns
    })
    return
  }
  // if (val === null) {
  //   update(() => {
  //     options.value = store.akuns
  //   })
  //   return
  // }
  update(() => {
    const needle = val.toLowerCase()

    options.value = store.akuns.filter(
      (v) => v.uraian.toLowerCase().indexOf(needle) > -1 || v.kodeall3.toLowerCase().indexOf(needle) > -1
    )
  })

  // update(() => {
  //   const filter = ['kodeall3', 'uraian']
  //   const needle = val.toLowerCase()
  //   const multiFilter = (data = [], filterKeys = [], value = '') =>
  //     data.filter((item) => filterKeys.some(
  //       (key) =>
  //         item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
  //           item[key]
  //     )
  //     )
  //   let filteredData = multiFilter(store.akuns, filter, needle)
  //   if (!filteredData.length) {
  //     if (val !== '') {
  //       store.getRekening(val).then(() => {
  //         filteredData = multiFilter(store.options, filter, needle)
  //         options.value = filteredData
  //       })
  //     }
  //     else {
  //       store.loading = false
  //       // options.value = filteredData
  //     }
  //   }
  //   else {
  //     options.value = filteredData
  //   }

  //   options.value = filteredData
  // })
}
// const formReff = ref(null)
// function onSimpan () {
//   store.saveSaldo().then(() => {
//     if (formReff.value != null) {
//       formReff.value.resetValidation()
//     }
//     store.emptyForm()
//     store.refreshTable()
//   })
// }
const onSubmit = () => {
  console.log('form', store.form)
  store.saveSaldo().then(() => {
    // if (refsaldo.value != null) {
    //   refsaldo.value.resetValidation()
    // }
    console.log('empty')
    store.emptyForm()

    store.refreshTable()
  })
}
const onReset = () => {
  refsaldo.value.resetValidation()
  // store.setOpen()
}
</script>
