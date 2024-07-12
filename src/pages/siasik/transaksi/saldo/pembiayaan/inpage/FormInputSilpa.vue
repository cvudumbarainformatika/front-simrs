<template>
  <q-dialog>
    <app-card
      style="width: 900px; max-width: 80vw"
      title="Form Data SILPA"
      desc="Input SILPA"
    >
      <template #content>
        <q-form ref="formReff" @submit="onSubmit" @reset="onReset">
          <div class="row justify-center q-col-gutter-md q-my-xs">
            <div class="col-3">
              <div class="q-pb-xs">
                Nomor Transaksi
              </div>
              <app-input
                v-model="store.form.notrans"
                label="Notrans"
                disable
                outlined
              />
            </div>
            <div class="col-3">
              <div class="q-pb-xs">
                Tanggal Transaksi
              </div>
              <app-input-date
                :model="store.form.tanggal"
                ref="refTanggalSurat"
                icon="icon-mat-event"
                outlined
                label="Tanggal"
                @set-model="pilihTanggal"
              />
            </div>
            <div class="col-3">
              <div class="q-pb-xs">
                Tahun
              </div>
              <app-input v-model="store.form.tahun" label="Tahun" outlined />
            </div>

            <div class="col-3">
              <div class="q-pb-xs">
                Nilai SILPA
              </div>
              <app-input
                v-model="store.form.nominal"
                label="Nominal"
                outlined
              />
            </div>

            <div class="col-2">
              <div class="q-pb-xs invisible">
                .
              </div>
              <app-btn
                label="Simpan"
                :disable="store.loading"
                :loading="store.loading"
                @click="onSimpan()"
              />
            </div>
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { useFormSilpa } from 'src/stores/siasik/transaksi/saldo/pembiayaan/formsilpa'

import { ref } from 'vue'
const store = useFormSilpa()
const formReff = ref(null)
function onSimpan () {
  // console.log('simpan')
  store.simpanSilpa().then(() => {
    store.emptyForm()
  })
}
const pilihTanggal = (val) => {
  store.setForm('tanggal', val)
}
const onSubmit = () => {
  store.simpanSilpa().then(() => {
    if (formReff.value != null) {
      formReff.value.resetValidation()
    }
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
