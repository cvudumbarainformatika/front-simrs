<template>
  <q-dialog>
    <app-card
      style="width:900px"
      title="Form Depo"
      desc="Input data Depo"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-sm-3 col-xs-12">
              <app-input
                v-model="store.form.gedung"
                valid
                label="Gedung*"
                outlined
                autofocus
              />
              <!-- <app-autocomplete :model="store.form.gedung" outlined label="cari gedung*" autocomplete="nama"
                option-value="nomor" :loading="store.loading" option-label="nama" :source="store.gedungs"
                @on-select="gedungSelected" @clear="clearGedung" @set-model="setModel" autofocus /> -->
            </div>
            <div class="col-sm-2 col-xs-12">
              <app-input
                v-model="store.form.lantai"
                valid
                label="Lantai*"
                outlined
                autofocus
                :readonly="!store.form.gedung"
              />
            </div>
            <div class="col-sm-2 col-xs-12">
              <app-input
                v-model="store.form.gudang"
                valid
                label="Gudang*"
                outlined
                autofocus
                :readonly="!store.form.gedung"
              />
            </div>
            <div class="col-sm-2 col-xs-12">
              <app-input
                v-model="store.form.depo"
                valid
                label="Depo*"
                outlined
                autofocus
                :readonly="!store.form.gedung"
              />
              <!-- <app-autocomplete :model="store.form.lantai" outlined label="cari lantai*" autocomplete="nama"
                option-value="id" :loading="store.loading" option-label="nama" :source="store.lantais"
                @on-select="lantaiSelected" @clear="clearLantai" autofocus :readonly="!store.form.utama" /> -->
            </div>

            <div class="col-sm-3 col-xs-12">
              <app-input
                v-model="store.form.nama"
                label="Nama ruang depo*"
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
import { useMasterGudangForm } from 'src/stores/simrs/logistik/sigarang/master/gudang/form'
import { ref } from 'vue'
const store = useMasterGudangForm()
const formReff = ref(null)

// const gedungSelected = val => {
//   console.log('selected', val)
//   store.setForm('gedung', val)
// }
// const setModel = val => { console.log('model', val) }
// const clearGedung = val => {
//   console.log('clear', val)
//   store.setForm('gedung', null)
// }
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
