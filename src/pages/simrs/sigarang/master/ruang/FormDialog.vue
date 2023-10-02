<template>
  <q-dialog>
    <app-card
      style="width:900px"
      title="Form Ruang"
      desc="Input data Ruang"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-3 col-xs-12">
              <!-- <app-input v-model="store.form.gedung" valid label="Gedung*" outlined autofocus /> -->
              <app-autocomplete
                v-model="store.form.gedung"
                outlined
                label="cari gedung*"
                autocomplete="nama"
                option-value="nomor"
                option-label="nama"
                :loading="store.loading"
                :source="store.gedungs"
                autofocus
                @on-select="gedungSelected"
                @clear="clearGedung"
                @set-model="setModel"
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.lantai"
                valid
                label="Lantai*"
                outlined
                autofocus
                :readonly="!store.form.gedung"
              />
              <!-- <app-autocomplete :model="store.form.lantai" outlined label="cari lantai*" autocomplete="nama"
                option-value="id" :loading="store.loading" option-label="nama" :source="store.lantais"
                @on-select="lantaiSelected" @clear="clearLantai" autofocus :readonly="!store.form.gedung" /> -->
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.ruang"
                valid
                label="Ruang*"
                outlined
                autofocus
                :readonly="!store.form.gedung"
              />
            </div>
            <div class="col-md-5 col-xs-12">
              <app-input
                v-model="store.form.uraian"
                label="Uraian*"
                outlined
                autofocus
              />
            </div>
          </div>
          <div class="row q-col-gutter-md" />
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { useMasterRuangForm } from 'src/stores/simrs/logistik/sigarang/master/ruang/form'
import { ref } from 'vue'
const store = useMasterRuangForm()
const formReff = ref(null)

const gedungSelected = val => {
  console.log('selected', val)
  store.setForm('gedung', val)
}
const setModel = val => { console.log('model', val) }
const clearGedung = val => {
  console.log('clear', val)
  store.setForm('gedung', null)
}
// const lantaiSelected = val => {
//   console.log('lantai', val)
//   store.setForm('lantai', val)
// }
// const clearLantai = val => {
//   console.log('clear', val)
//   store.setForm('lantai', null)
// }

const onSubmit = () => {
  store.saveForm().then(() => {
    if (formReff.value != null) { formReff.value.resetValidation() }
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
