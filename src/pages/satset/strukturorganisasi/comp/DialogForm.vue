<template>
  <q-dialog persistent>
    <q-card style="width: 40%;">
      <q-bar>
        <q-icon name="icon-mat-add" />
        <div>Tambah Data Departemen</div>

        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-form
        ref="formRef"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-card-section class="q-gutter-sm">
          <q-input
            v-model="store.form.nama"
            placeholder="Nama"
            outlined
            standout="bg-yellow-3"
            dense
            :rules="[val => !!val || 'Harap diisi']"
            hide-bottom-space
          />
          <q-input
            v-model="store.form.phone"
            placeholder="Phone"
            outlined
            standout="bg-yellow-3"
            dense
            :rules="[val => !!val || 'Harap diisi']"
            hide-bottom-space
          />
          <q-input
            v-model="store.form.email"
            placeholder="Email"
            outlined
            standout="bg-yellow-3"
            dense
            :rules="[val => !!val || 'Harap diisi']"
            hide-bottom-space
          />
          <q-input
            v-model="store.form.website"
            placeholder="Website"
            outlined
            standout="bg-yellow-3"
            dense
            :rules="[val => !!val || 'Harap diisi']"
            hide-bottom-space
          />
        </q-card-section>
        <q-separator />
        <q-card-section
          class="q-gutter-sm"
          align="right"
        >
          <q-btn
            label="Reset"
            color="dark"
            type="reset"
          />
          <q-btn
            label="Simpan"
            color="primary"
            type="submit"
            :loading="store.loading"
            :disable="store.loading"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useOrganisasiStore } from '../../../../stores/satset/organisasi'

const store = useOrganisasiStore()
const formRef = ref()
function onSubmit() {
  console.log('ok')
  store.postData().then(resp => {
    store.dialogTambah = false
    store.getData()
  })
}

function onReset() {
  console.log(formRef.value)
  formRef.value.resetValidation()
}
</script>
