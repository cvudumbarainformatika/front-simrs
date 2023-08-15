<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Kode Belanja"
      desc="Input data Kode Belanja"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kode108"
                valid
                label="Kode 108"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.uraian108"
                valid
                label="Uraian 108"
                outlined
                autofocus
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kode50"
                valid
                label="Kode 50"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.uraian50"
                valid
                label="Uraian 50"
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
import { useMasterKodeBelanjaForm } from 'src/stores/simrs/master/farmasi/kodeBelanja/form'
import { ref } from 'vue'
const store = useMasterKodeBelanjaForm()
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
