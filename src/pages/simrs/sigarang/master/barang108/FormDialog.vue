<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Barang 108"
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
                v-model="store.form.akun"
                label="Akun*"
                outlined
                autofocus
                @update:model-value="store.setKode"
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.kelompok"
                label="Kelompok*"
                outlined
                autofocus
                @update:model-value="store.setKode"
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.jenis"
                label="Jenis*"
                outlined
                autofocus
                @update:model-value="store.setKode"
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.objek"
                label="Objek*"
                outlined
                autofocus
                @update:model-value="store.setKode"
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.rincian_objek"
                label="Rincian Objek*"
                outlined
                autofocus
                @update:model-value="store.setKode"
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.sub_rincian_objek"
                label="Sub Rincian Objek*"
                outlined
                autofocus
                @update:model-value="store.setKode"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.kode"
                label="Kode*"
                outlined
                readonly
              />
            </div>
            <div class="col-md-8 col-xs-12">
              <app-input
                v-model="store.form.uraian"
                label="Uraian*"
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
import { useMasterBarang108Form } from 'src/stores/simrs/logistik/sigarang/master/barang108/form'
import { ref } from 'vue'
const store = useMasterBarang108Form()
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
