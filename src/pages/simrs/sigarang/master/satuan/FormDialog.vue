<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Satuan"
      desc="Input data Satuan"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.kode"
                valid
                label="Kode*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.nama"
                label="Nama Satuan*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.isi"
                label="Isi*"
                type="number"
                outlined
                autofocus
              />
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                isi dari satuan kecil ke satuan besar
              </q-tooltip>
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.kecil"
                label="Nama Satuan Kecil*"
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
import { useMasterSatuanForm } from 'src/stores/simrs/logistik/sigarang/master/satuan/form'
import { ref } from 'vue'
const store = useMasterSatuanForm()
const formReff = ref(null)
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
