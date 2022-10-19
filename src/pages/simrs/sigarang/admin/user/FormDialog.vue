<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form User"
      desc="Edit data User ( Berlaku Hanya di Aplikasi ini saja)"
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
                v-model="store.form.name"
                label="Nama"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.username"
                label="Username"
                outlined
                autofocus
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nip"
                label="NIP"
                readonly
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.email"
                label="Email"
                valid
                outlined
                autofocus
              />
            </div>
          </div>
          <div class="row q-col-gutter-md justify-center items-center text-center">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                v-model="store.form.role"
                outlined
                label="Level"
                :source="setting.levels"
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
import { useUserFormStore } from 'src/stores/simrs/logistik/sigarang/admin/user/form'
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import { ref } from 'vue'
const store = useUserFormStore()
const setting = useSettingsStore()
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
