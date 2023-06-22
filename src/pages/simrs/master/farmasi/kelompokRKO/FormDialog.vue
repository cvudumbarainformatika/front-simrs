<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Kelompok RKO"
      desc="Input data Kelompok RKO"
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
                v-model="store.form.kode"
                valid
                label="Kode"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.namaobat"
                valid
                label="Nama Obat"
                outlined
                autofocus
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.satuan"
                valid
                label="Satuan"
                outlined
                autofocus
              />
            </div>
            <!-- <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.namaobat"
                valid
                label="Nama Obat"
                outlined
                autofocus
              />
            </div> -->
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
import { useMasterKelompokRKOForm } from 'src/stores/simrs/master/farmasi/kelompokRKO/form'
import { ref } from 'vue'
const store = useMasterKelompokRKOForm()
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
