<template>
  <q-dialog>
    <app-card
      style="width:900px"
      title="Form Ruang"
      desc="Input data Ruang"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.utama"
                valid
                label="Gudang Utama*"
                outlined
                autofocus
              />
              <!-- <app-autocomplete :model="store.form.gedung" outlined label="cari gedung*" autocomplete="nama"
                option-value="nomor" :loading="store.loading" option-label="nama" :source="store.gedungs"
                @on-select="gedungSelected" @clear="clearGedung" @set-model="setModel" autofocus /> -->
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.depo"
                valid
                label="Gudang Depo*"
                outlined
                autofocus
                :readonly="!store.form.utama"
              />
            </div>
            <div class="col-md-2 col-xs-12">
              <app-input
                v-model="store.form.ruang"
                valid
                label="Ruang Depo*"
                outlined
                autofocus
                :readonly="!store.form.utama"
              />
            </div>
            <div class="col-md-5 col-xs-12">
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
import { useStokMaksForm } from 'src/stores/simrs/logistik/sigarang/master/stokmaks/form'
import { ref } from 'vue'
const store = useStokMaksForm()
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
