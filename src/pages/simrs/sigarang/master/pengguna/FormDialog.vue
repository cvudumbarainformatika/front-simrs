<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Pengguna Gedung"
      desc="Input data Beban"
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
                v-model="store.form.level_1"
                label="Level I*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.level_2"
                valid
                label="Level II*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.level_3"
                valid
                label="Level III*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.level_4"
                valid
                label="Level IV*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.jabatan"
                label="Jabatan*"
                outlined
                autofocus
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
import { useMasterPenggunaForm } from 'src/stores/simrs/logistik/sigarang/master/pengguna/form'
import { ref } from 'vue'
const store = useMasterPenggunaForm()
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
