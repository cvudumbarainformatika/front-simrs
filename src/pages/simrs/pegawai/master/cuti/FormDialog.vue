<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Input"
      desc="Input Master Cuti"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-sm-4 col-xs-12">
              <app-autocomplete-new
                :model="store.form.jenispegawai_id"
                label="Pilih jenis pegawai"
                outlined
                autofocus
                option-label="jenispegawai"
                option-value="id"
                autocomplete="jenispegawai"
                :source="store.jenisPegawaies"
                @on-select="store.jenisPegawaiSelected"
                @clear="store.jenisPegawaiCleared"
              />
            </div>
            <div class="col-sm-4 col-xs-12">
              <app-input
                v-model="store.form.nama"
                label="Nama Cuti"
                valid
                outlined
              />
            </div>
            <div class="col-sm-4 col-xs-12">
              <app-input
                v-model="store.form.jumlah"
                label="Jumlah Cuti"
                type="number"
                valid
                outlined
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
import { useMasterCutiPegawaiStore } from 'src/stores/simrs/pegawai/master/cuti/mastercuti'
import { ref } from 'vue'
const store = useMasterCutiPegawaiStore()
const formReff = ref(null)
const onSubmit = () => {
  store.saveForm().then(() => {
    if (formReff.value != null) { formReff.value.resetValidation() }

    store.setOpen()
  }).catch(() => {
    store.setOpen()
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
