<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Barang RS"
      desc="Input data Beban"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kode"
                label="Kode*"
                outlined
                readonly
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input
                v-model="store.input_kode"
                dense
                label="Input Kode*"
                :rules="[ val => val.length <= 5 || 'Maksimal 5 karakter']"
                outlined
                autofocus
                @update:model-value="store.setKode"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                label="Nama*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                v-model="store.form.kode_satuan"
                outlined
                label="Satuan"
                autocomplete="nama"
                option-value="kode"
                option-label="nama"
                :source="store.satuans"
              />
            </div>
          </div>
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
import { useMasterBarangRSForm } from 'src/stores/simrs/logistik/sigarang/master/barangrs/form'
import { ref } from 'vue'
const store = useMasterBarangRSForm()
const formReff = ref(null)
const onSubmit = () => {
  store.saveForm().then(() => {
    // console.log('form', formReff)
    if (formReff.value != null) { formReff.value.resetValidation() }
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
